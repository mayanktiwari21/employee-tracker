import { Component, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-bottom-sheet-options',
  templateUrl: './bottom-sheet-options.component.html',
  styleUrl: './bottom-sheet-options.component.scss',
})
export class BottomSheetOptionsComponent {
  options: Array<string> = [];
  constructor(
    private _bottomSheetRef: MatBottomSheetRef<BottomSheetOptionsComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) private data: { options: string[]; selectionCallback: (option: string) => void }
  ) {}

  handleSelection(option: string) {
    this.data.selectionCallback(option);
    this._bottomSheetRef.dismiss();
  }

  ngOnInit() {
    this.options = this.data.options;
  }
}
