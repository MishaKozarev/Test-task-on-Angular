import { isDevMode, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TooltipComponent } from './components/tooltip/tooltip.component';
import { StoreModule } from '@ngrx/store';
import { profileReducer } from '../store/reducers/profile.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ReducerKey } from '../store/constants/reducer-key.enum';
import { alertReducer } from '../store/reducers/tooltip.reducers';
import { TooltipsContainerComponent } from './components/tooltips-container/tooltips-container.component';
import { HttpInterceptorService } from '../auth/interceptors/http-interceptor.service';
import { SvgIconComponent } from './components/svg-icon/svg-icon.component';

@NgModule({
  declarations: [
    TooltipComponent,
    TooltipsContainerComponent,
    SvgIconComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    StoreModule.forRoot({}),
    StoreModule.forFeature(ReducerKey.profileState, profileReducer),
    StoreModule.forFeature(ReducerKey.tooltipState, alertReducer),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() })
  ],
  exports: [
    TooltipComponent,
    TooltipsContainerComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    }
  ],
})
export class CoreModule { }
