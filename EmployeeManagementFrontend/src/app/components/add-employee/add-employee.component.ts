import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Employee } from '../../models/employee';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent {
  employee: Employee = {
    firstName: '',
    lastName: '',
    email: '',
    position: '',
    department: '',
    salary: 0,
    dateOfJoining: new Date().toISOString().split('T')[0]
  };

  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  onSubmit(): void {
    this.employeeService.createEmployee(this.employee).subscribe(() => {
      this.router.navigate(['/employees']);
    });
  }

  cancel(): void {
    this.router.navigate(['/employees']);
  }
}