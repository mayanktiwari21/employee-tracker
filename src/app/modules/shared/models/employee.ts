export class Employee {
  id!: string;
  name!: string;
  role!: string;
  startDate!: string;
  endDate?: string;

  constructor(id: string, name: string, role: string, startDate: string, endDate: string = '') {
    this.id = id;
    this.name = name;
    this.role = role;
    this.startDate = startDate;
    this.endDate = endDate;
  }
}
