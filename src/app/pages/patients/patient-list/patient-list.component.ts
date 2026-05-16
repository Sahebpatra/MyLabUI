import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { PatientService } from '../../../core/services/patient.service';
import { NotificationService } from '../../../core/services/common/notification.service';
import { DynamicTableComponent } from '../../../shared/components/dynamic-table/dynamic-table.component';

@Component({
  selector: 'app-patient-list',
  standalone: true,
  imports: [DynamicTableComponent],
  templateUrl: './patient-list.component.html',
  styleUrl: './patient-list.component.css',
})
export class PatientListComponent {
  private patientService = inject(PatientService);
  private notify: NotificationService = inject(NotificationService);
  private router = inject(Router);

  pagetitle = 'Patient List';
  AddNewButton = {
    required: true,
    ButtonText: 'New patient',
    icon: 'fa fa-user-plus',
  };
  currentPage = 1;
  pageSize = 10;
  SearchTerm: string = '';
  IsActive: number = 1;
  patientList: any[] = [];

  ngOnInit() {
    this.getAllPatients();
  }

  getAllPatients() {
    this.patientService.getAllDynamicallyPatients().subscribe({
      next: (res) => {
        if (res.success) {
          this.patientList = JSON.parse(res.data) || [];
        } else {
          console.error('API Error:', res.message);
        }
      },
      error: (err) => {
        console.error('API Error:', err);
        this.patientList = [];
        this.notify.showError(
          'Getting internal error while fetching patient list',
        );
      },
    });
  }
  onHandleAddNew() {
    this.router.navigate(['/new-patient']);
  }
  onHandleEdit(Patient: any) {
    const patientId = Patient.Id;
    if (patientId) {
      this.router.navigate(['/edit-patient', patientId]);
    } else {
      this.notify.showError('Invalid patient ID');
    }
  }
  onHandleDelete(Patient: any) {
    // Implement delete logic here, e.g., call a service method to delete the patient
    // After deletion, refresh the patient list
    this.notify.showInfo('Delete functionality is not implemented yet.');
  }
  onHandleView(Patient: any) {
    // Implement view logic here, e.g., navigate to a patient details page
    this.notify.showInfo('View functionality is not implemented yet.');
  }
}
