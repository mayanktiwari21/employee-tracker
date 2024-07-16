import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
import { MatDateFormats } from '@angular/material/core';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatListModule } from '@angular/material/list';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { NgxIndexedDBModule, DBConfig } from 'ngx-indexed-db';

import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { ListComponent } from './components/list/list.component';
import { NullStateComponent } from './components/null-state/null-state.component';
import { EmployeeFormComponent } from './components/employee-form/employee-form.component';
import { BottomSheetOptionsComponent } from './components/bottom-sheet-options/bottom-sheet-options.component';
import { DatepickerHeaderComponent } from './components/datepicker-header/datepicker-header.component';
import { DatepickerHeaderSecondaryComponent } from './components/datepicker-header-secondary/datepicker-header-secondary.component';

export const MY_FORMATS: MatDateFormats = {
  parse: {
    dateInput: 'D MMM YYYY',
  },
  display: {
    dateInput: 'D MMM YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'D MMM YYYY',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

const dbConfig: DBConfig = {
  name: 'employee',
  version: 1,
  objectStoresMeta: [
    {
      store: 'employee',
      storeConfig: { keyPath: 'id', autoIncrement: false, options: { unique: true } },
      storeSchema: [
        { name: 'id', keypath: 'id', options: { unique: true } },
        { name: 'name', keypath: 'name', options: { unique: false } },
        { name: 'role', keypath: 'role', options: { unique: false } },
        { name: 'startDate', keypath: 'startDate', options: { unique: false } },
        { name: 'endDate', keypath: 'endDate', options: { unique: false } },
      ],
    },
  ],
};

@NgModule({
  declarations: [
    EmployeeListComponent,
    ListComponent,
    NullStateComponent,
    EmployeeFormComponent,
    BottomSheetOptionsComponent,
    DatepickerHeaderComponent,
    DatepickerHeaderSecondaryComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatInputModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    MatBottomSheetModule,
    MatListModule,
    DragDropModule,
    MatTooltipModule,
    MatSnackBarModule,
    NgxIndexedDBModule.forRoot(dbConfig),
  ],
  exports: [
    EmployeeListComponent,
    ListComponent,
    NullStateComponent,
    EmployeeFormComponent,
    BottomSheetOptionsComponent,
    DatepickerHeaderComponent,
    DatepickerHeaderSecondaryComponent,
  ],
  providers: [provideMomentDateAdapter(MY_FORMATS)],
})
export class SharedModule {}
