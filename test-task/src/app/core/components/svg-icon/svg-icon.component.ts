import { Component, Input, OnInit } from '@angular/core';
import { TooltipData } from '../../models/tooltip.models';

@Component({
  selector: 'app-svg-icon',
  templateUrl: './svg-icon.component.html',
  styleUrls: ['./svg-icon.component.scss']
})
export class SvgIconComponent implements OnInit {
  @Input() public tooltipData!: TooltipData;

  ngOnInit(): void {}

}
