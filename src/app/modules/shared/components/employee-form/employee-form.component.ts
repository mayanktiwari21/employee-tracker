import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

import * as _moment from 'moment';
import { default as _rollupMoment } from 'moment';
import { v4 as uuidv4 } from 'uuid';

import { DatepickerHeaderComponent } from '@shared/components/datepicker-header/datepicker-header.component';
import { BottomSheetOptionsComponent } from '@shared/components/bottom-sheet-options/bottom-sheet-options.component';
import { DatepickerHeaderSecondaryComponent } from '@shared/components/datepicker-header-secondary/datepicker-header-secondary.component';
import { Employee } from '@shared/models/employee';
import { ROLES, DATE_FORMAT } from '@constants';

const moment = _rollupMoment || _moment;

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.scss',
})
export class EmployeeFormComponent {
  @Input() employee?: Employee | null;
  @Output() save = new EventEmitter<Employee>();
  @Output() cancel = new EventEmitter<void>();

  employeeForm = new FormGroup({
    name: new FormControl('', Validators.required),
    role: new FormControl('', Validators.required),
    startDate: new FormControl(moment(), Validators.required),
    endDate: new FormControl(),
  });

  readonly DATEPICKER_HEADER = DatepickerHeaderComponent;
  readonly DATEPICKER_SECONDARY_HEADER = DatepickerHeaderSecondaryComponent;
  readonly DATE_FORMAT = DATE_FORMAT;

  constructor(private _bottomSheet: MatBottomSheet) {}

  openBottomSheet(): void {
    this._bottomSheet.open(BottomSheetOptionsComponent, {
      data: { options: ROLES, selectionCallback: this.saveRole.bind(this) },
      panelClass: 'custom-bottom-sheet',
    });
  }

  onCancel() {
    this.cancel.emit();
  }

  saveRole(role: string) {
    this.employeeForm.controls.role.setValue(role);
    this.employeeForm.controls.role.markAsDirty();
  }

  onSave() {
    const { name, role, startDate, endDate } = this.employeeForm.value;
    if (name?.trim() && role?.trim() && startDate) {
      const id = this.employee?.id || uuidv4();
      const employee = new Employee(id, name, role, startDate.format(DATE_FORMAT), endDate?.format(DATE_FORMAT));
      this.save.emit(employee);
    }
  }

  ngOnInit() {
    if (this.employee) {
      this.employeeForm.controls.name.setValue(this.employee.name);
      this.employeeForm.controls.role.setValue(this.employee.role);
      this.employeeForm.controls.startDate.setValue(moment(this.employee.startDate, DATE_FORMAT));
      if (this.employee.endDate) {
        this.employeeForm.controls.endDate.setValue(moment(this.employee.endDate, DATE_FORMAT));
      }
    }
  }
}
