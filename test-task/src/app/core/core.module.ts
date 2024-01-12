import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TooltipComponent } from './components/tooltip/tooltip.component';




@NgModule({
  declarations: [
    TooltipComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [
    TooltipComponent
  ]
})
export class CoreModule { }
