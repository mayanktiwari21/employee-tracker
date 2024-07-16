import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BottomSheetOptionsComponent } from './bottom-sheet-options.component';

describe('BottomSheetOptionsComponent', () => {
  let component: BottomSheetOptionsComponent;
  let fixture: ComponentFixture<BottomSheetOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BottomSheetOptionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BottomSheetOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
