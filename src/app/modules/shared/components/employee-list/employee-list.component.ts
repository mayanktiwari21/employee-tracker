import { Component, OnInit, WritableSignal, signal } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { NgxIndexedDBService } from 'ngx-indexed-db';
import { EMPTY, catchError, take } from 'rxjs';

import { Employee } from '@shared/models/employee';
import { NULL_STATE_IMAGE, NO_EMPLOYEES, DELETE_MSG, UNDO_TXT, SNACKBAR_CONFIG } from '@constants';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
})
export class EmployeeListComponent implements OnInit {
  currentEmployeesList: WritableSignal<Employee[]> = signal([]);
  previousEmployeesList: WritableSignal<Employee[]> = signal([]);
  addingEmployee = false;
  editingEmployee = false;
  employeeBeingEdited!: Employee | null;

  readonly NULL_STATE_IMAGE = NULL_STATE_IMAGE;
  readonly NO_EMPLOYEES = NO_EMPLOYEES;

  constructor(private _snackBar: MatSnackBar, private _dbService: NgxIndexedDBService) {}

  addEmployee(): void {
    this.addingEmployee = true;
  }

  editEmployee(employee: Employee): void {
    this.editingEmployee = true;
    this.employeeBeingEdited = employee;
  }

  deleteEmployee(employee?: Employee): void {
    const employeeToDelete = employee || this.employeeBeingEdited;
    if (employeeToDelete) {
      const indexInPrevEmp = this.previousEmployeesList().findIndex((emp) => emp.id === employeeToDelete.id);
      const indexInCurrEmp = this.currentEmployeesList().findIndex((emp) => emp.id === employeeToDelete.id);
      const tempCurrEmp = [...this.currentEmployeesList()];
      const tempPrevEmp = [...this.previousEmployeesList()];
      let undoDelete = false;
      // Delete data locally for now
      if (indexInCurrEmp !== -1) {
        this.currentEmployeesList.set(this.currentEmployeesList().filter((emp) => emp.id !== employeeToDelete?.id));
      } else if (indexInPrevEmp !== -1) {
        this.previousEmployeesList.set(this.previousEmployeesList().filter((emp) => emp.id !== employeeToDelete?.id));
      }
      const snackbar = this._snackBar.open(DELETE_MSG, UNDO_TXT, SNACKBAR_CONFIG);
      // If undo is clicked, revert the local change
      snackbar
        .onAction()
        .pipe(take(1))
        .subscribe(() => {
          if (indexInCurrEmp !== -1) {
            this.currentEmployeesList.set(tempCurrEmp);
          } else if (indexInPrevEmp !== -1) {
            this.previousEmployeesList.set(tempPrevEmp);
          }
          undoDelete = true;
        });
      // If undo is not clicked delete data from IndexedDB as well
      snackbar
        .afterDismissed()
        .pipe(take(1))
        .subscribe(() => {
          if (!undoDelete) {
            this._dbService
              .delete('employee', employeeToDelete.id)
              .pipe(
                take(1),
                catchError((error) => {
                  console.error(error);
                  return EMPTY;
                })
              )
              .subscribe();
          }
        });
    }
    this.onClose();
  }

  onClose(): void {
    this.addingEmployee = false;
    this.editingEmployee = false;
    this.employeeBeingEdited = null;
  }

  /**
   * This function adds or removes data from current & previous employees based on end date
   * @param employee Employee data being added or edited
   */
  onSave(employee: Employee): void {
    if (this.addingEmployee) {
      // Adding employee to IndexedDB
      this._dbService
        .add('employee', employee)
        .pipe(
          take(1),
          catchError((error) => {
            console.error(error);
            return EMPTY;
          })
        )
        .subscribe(() => {
          this.updateLocalData(employee);
        });
    } else if (this.editingEmployee) {
      // Updating employee in IndexedDB
      this._dbService
        .update('employee', employee)
        .pipe(
          take(1),
          catchError((error) => {
            console.error(error);
            return EMPTY;
          })
        )
        .subscribe(() => {
          this.updateLocalData(employee);
        });
    }
  }

  updateLocalData(employee: Employee): void {
    const indexInPrevEmp = this.previousEmployeesList().findIndex((emp) => emp.id === employee.id);
    const indexInCurrEmp = this.currentEmployeesList().findIndex((emp) => emp.id === employee.id);
    if (employee.endDate) {
      // Filter employee from current employees list
      if (indexInCurrEmp !== -1) {
        this.currentEmployeesList.set(this.currentEmployeesList().filter((emp) => emp.id !== employee.id));
      }
      // Push or update employee in previous employees list
      if (indexInPrevEmp === -1) {
        this.previousEmployeesList.set([employee, ...this.previousEmployeesList()]);
      } else {
        const temp = [...this.previousEmployeesList()];
        temp[indexInPrevEmp] = employee;
        this.previousEmployeesList.set(temp);
      }
    } else {
      // Filter previous employees list
      if (indexInPrevEmp !== -1) {
        this.previousEmployeesList.set(this.previousEmployeesList().filter((emp) => emp.id !== employee.id));
      }
      // Push or update employee in current employees list
      if (indexInCurrEmp === -1) {
        this.currentEmployeesList.set([employee, ...this.currentEmployeesList()]);
      } else {
        const temp = [...this.currentEmployeesList()];
        temp[indexInCurrEmp] = employee;
        this.currentEmployeesList.set(temp);
      }
    }
    this.onClose();
  }

  ngOnInit(): void {
    this._dbService
      .getAll('employee')
      .pipe(
        take(1),
        catchError((error) => {
          console.error(error);
          return [];
        })
      )
      .subscribe((employees) => {
        const currentEmployees: Employee[] = [];
        const previousEmployees: Employee[] = [];
        (employees as Array<Employee>).forEach((employee) => {
          if ((employee as Employee).endDate) {
            previousEmployees.unshift(employee);
          } else {
            currentEmployees.unshift(employee);
          }
        });
        this.previousEmployeesList.set(previousEmployees);
        this.currentEmployeesList.set(currentEmployees);
      });
  }
}
