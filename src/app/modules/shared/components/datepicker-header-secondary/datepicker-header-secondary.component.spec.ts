import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatepickerHeaderSecondaryComponent } from './datepicker-header-secondary.component';

describe('DatepickerHeaderSecondaryComponent', () => {
  let component: DatepickerHeaderSecondaryComponent;
  let fixture: ComponentFixture<DatepickerHeaderSecondaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatepickerHeaderSecondaryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DatepickerHeaderSecondaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
