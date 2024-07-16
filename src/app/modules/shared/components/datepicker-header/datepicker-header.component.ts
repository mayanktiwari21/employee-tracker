import { Component, Inject } from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS, MatDateFormats } from '@angular/material/core';
import { MatCalendar, MatCalendarUserEvent, MatDatepicker } from '@angular/material/datepicker';

@Component({
  selector: 'app-datepicker-header',
  templateUrl: './datepicker-header.component.html',
  styleUrl: './datepicker-header.component.scss',
})
export class DatepickerHeaderComponent<D> {
  constructor(
    private _calendar: MatCalendar<D>,
    private _dateAdapter: DateAdapter<D>,
    private _datePicker: MatDatepicker<D | null>,
    @Inject(MAT_DATE_FORMATS) private _dateFormats: MatDateFormats
  ) {}

  get periodLabel() {
    return this._dateAdapter.format(this._calendar.activeDate, this._dateFormats.display.monthYearA11yLabel);
  }

  previousClicked() {
    this._calendar.activeDate = this._dateAdapter.addCalendarMonths(this._calendar.activeDate, -1);
    this.handleCalendarDateChange(this._calendar.activeDate);
  }

  nextClicked() {
    this._calendar.activeDate = this._dateAdapter.addCalendarMonths(this._calendar.activeDate, 1);
    this.handleCalendarDateChange(this._calendar.activeDate);
  }

  next(mode?: 'monday' | 'tuesday' | 'week') {
    let activeDate;
    let daysToAdd;
    const currentSelectedDay = this._dateAdapter.getDayOfWeek(this._calendar.activeDate);
    switch (mode) {
      case 'monday':
        daysToAdd = currentSelectedDay === 1 ? 7 : (8 - currentSelectedDay) % 7;
        activeDate = this._dateAdapter.addCalendarDays(this._calendar.activeDate, daysToAdd);
        this._datePicker.select(activeDate);
        this._datePicker.close();
        break;
      case 'tuesday':
        daysToAdd = currentSelectedDay === 2 ? 7 : ((8 - currentSelectedDay) % 7) + 1;
        activeDate = this._dateAdapter.addCalendarDays(this._calendar.activeDate, daysToAdd);
        this.handleCalendarDateChange(activeDate);
        break;
      case 'week':
        activeDate = this._dateAdapter.addCalendarDays(this._calendar.activeDate, 7);
        this.handleCalendarDateChange(activeDate);
        break;
      default:
        activeDate = this._dateAdapter.addCalendarDays(this._dateAdapter.today(), 0);
        this.handleCalendarDateChange(activeDate);
        break;
    }
  }

  /**
   * This function ensures that the selected date from custom header buttons is reflected properly in calendar instance
   * @param date selected date
   */
  handleCalendarDateChange(date: D) {
    this._calendar.activeDate = date;
    this._calendar.selected = date;
    const event: MatCalendarUserEvent<D> = { value: date, event: new Event('') };
    this._calendar._dateSelected(event);
  }
}
