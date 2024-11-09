import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { ReactiveFormsModule } from '@angular/forms';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzGridModule } from 'ng-zorro-antd/grid';


interface Leave {
  enrollmentNumber: number;
  studentName: string;
  class: string;
  section: string;
  reason: string;
  leaveDate: string;
  status: string;
}
@Component({
  selector: 'app-student-leaves',
  standalone: true,
  imports: [FormsModule,
    MatTableModule,
    NzModalModule,
    NzFormModule,
    NzSelectModule,
    ReactiveFormsModule,
    NzDatePickerModule,
    NzRadioModule,
    NzGridModule
  ],
  templateUrl: './student-leaves.component.html',
  styleUrl: './student-leaves.component.scss'
})
export class StudentLeavesComponent {
  academicYear: string = '2022-2023';
  searchQuery: string = '';
  leaves: Leave[] = [
    { enrollmentNumber: 25143, studentName: 'Rajdeep Dutt', class: 'XII', section: 'C', reason: 'Fever', leaveDate: '21/09 to 12.10', status: 'Active' },
    { enrollmentNumber: 25144, studentName: 'Wali Dutt', class: 'XII', section: 'C', reason: 'Fever', leaveDate: '21/09 to 12.10', status: 'Active' },
    { enrollmentNumber: 25145, studentName: 'Asad Dutt', class: 'XII', section: 'C', reason: 'Fever', leaveDate: '21/09 to 12.10', status: 'Active' },
    { enrollmentNumber: 25146, studentName: 'Adil Dutt', class: 'XII', section: 'C', reason: 'Fever', leaveDate: '21/09 to 12.10', status: 'Active' },
    { enrollmentNumber: 25147, studentName: 'Rajdeep Dutt', class: 'XII', section: 'C', reason: 'Fever', leaveDate: '21/09 to 12.10', status: 'Active' },
    { enrollmentNumber: 25148, studentName: 'Rajdeep Dutt', class: 'XII', section: 'C', reason: 'Fever', leaveDate: '21/09 to 12.10', status: 'Active' },
    { enrollmentNumber: 25149, studentName: 'Rajdeep Dutt', class: 'XII', section: 'C', reason: 'Fever', leaveDate: '21/09 to 12.10', status: 'Active' },
    // Add more leave data here
  ];
  filteredLeaves: Leave[] = [];
  isVisibleMiddle = false;
  students = ['Student A', 'Student B', 'Student C'];
  classes = ['Class 1', 'Class 2', 'Class 3'];
  sections = ['Section A', 'Section B', 'Section C'];

  public addLeaveForm!: FormGroup;

  constructor(private modal: NzModalService,private fb: FormBuilder) { }

  ngOnInit(): void {
    this.filteredLeaves = this.leaves; // Initialize filteredLeaves with all leaves
    this.addLeaveForm = this.fb.group({
      student: ['', Validators.required],
      class: ['', Validators.required],
      section: ['', Validators.required],
      leaveType: ['single', Validators.required],
      startDate: [new Date(), Validators.required],
      endDate: [new Date()],
      reason: ['', Validators.required],
      status: ['unapproved', Validators.required]
    });

    // Update endDate validation based on leaveType
 
    const endDateControl = this.addLeaveForm.get('endDate');
    if (this.addLeaveForm.value.leaveType === 'multiple') {
      endDateControl?.setValidators(Validators.required);
    } else {
      endDateControl?.clearValidators();
    }
    endDateControl?.updateValueAndValidity();
  }

  onSearch(): void {
    const query = this.searchQuery.toLowerCase();
    this.filteredLeaves = this.leaves.filter(leave =>
      leave.studentName.toLowerCase().includes(query) ||
      leave.enrollmentNumber.toString().includes(query) ||
      leave.class.toLowerCase().includes(query) ||
      leave.section.toLowerCase().includes(query) ||
      leave.reason.toLowerCase().includes(query) ||
      leave.status.toLowerCase().includes(query)
    );
  }

  addNewLeave(): void {
    console.log(this.addLeaveForm);
    
    this.isVisibleMiddle = true;

  }

  
  handleOkTop(): void {
    this.isVisibleMiddle = false;
  }

  handleCancel(): void {
    this.isVisibleMiddle = false;
  }

  
}
