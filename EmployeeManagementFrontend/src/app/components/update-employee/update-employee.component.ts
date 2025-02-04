import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Employee } from '../../models/employee';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-update-employee',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit {
  employee: Employee | undefined;

  constructor(
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('employeeId'));
    this.employeeService.getEmployee(id).subscribe(employee => {
      if (employee) {
        // Ensure dateOfJoining is properly formatted
        employee.dateOfJoining = employee.dateOfJoining
          ? new Date(employee.dateOfJoining).toISOString().split('T')[0]
          : '';
        
        this.employee = employee;
      }
    });
  }

  onSubmit(): void {
    if (this.employee && this.employee.employeeId) {
      this.employeeService.updateEmployee(this.employee.employeeId, this.employee).subscribe(() => {
        this.router.navigate(['/employees']);
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/employees']);
  }
}
