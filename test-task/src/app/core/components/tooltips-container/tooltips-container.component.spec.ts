import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TooltipsContainerComponent } from './tooltips-container.component';

describe('TooltipsContainerComponent', () => {
  let component: TooltipsContainerComponent;
  let fixture: ComponentFixture<TooltipsContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TooltipsContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TooltipsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
