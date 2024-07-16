import { MatSnackBarConfig } from "@angular/material/snack-bar";

export const NULL_STATE_IMAGE = '/assets/images/no-data.png';
export const NO_EMPLOYEES = 'No employee records found';
export const ROLES = ['Product Designer', 'Flutter Developer', 'QA Tester', 'Product Owner'];
export const DATE_FORMAT = 'D MMM, YYYY';
export const DELETE_MSG = 'Employee data has been deleted';
export const UNDO_TXT = 'Undo';
export const SNACKBAR_CONFIG: MatSnackBarConfig<any> = {
  duration: 3000,
  horizontalPosition: 'center',
  verticalPosition: 'bottom',
};
