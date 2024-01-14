import { isDevMode, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TooltipComponent } from './components/tooltip/tooltip.component';
import { StoreModule } from '@ngrx/store';
import { profileReducer } from '../store/reducers/profile.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ReducerKey } from '../store/constants/reducer-key.enum';

@NgModule({
  declarations: [
    TooltipComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    StoreModule.forRoot({}),
    StoreModule.forFeature(ReducerKey.profileState, profileReducer),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() })
  ],
  exports: [
    TooltipComponent
  ]
})
export class CoreModule { }
