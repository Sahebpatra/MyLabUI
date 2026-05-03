import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonService } from '../../../core/services/common/common.service';
import { PatientModel } from '../../../core/models/patient.model';
import { FormConfigService } from '../../../core/services/common/form-config.service';
import { DynamicFormConfig } from '../../../shared/models/dynamic-form.model';
import { Observable } from 'rxjs';
import { DynamicFormComponent } from '../../../shared/components/dynamic-form/dynamic-form.component';
import { PatientService } from '../../../core/services/patient.service';
import { NotificationService } from '../../../core/services/common/notification.service';
import { ApiResponse } from '../../../shared/models/api-response.model';

@Component({
  selector: 'app-patient-registration',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DynamicFormComponent],
  templateUrl: './patient-registration.component.html',
  styleUrl: './patient-registration.component.css',
})
export class PatientRegistrationComponent {
  private configService = inject(FormConfigService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private notify = inject(NotificationService);
  masterService = inject(CommonService);
  patientService = inject(PatientService);

  config$!: Observable<DynamicFormConfig>;
  // gender$ = this.masterService.gender$;
  isEditMode = false;

  //patientForm!: FormGroup;
  patientData: PatientModel | null = null;
  ngOnInit(): void {
    this.config$ = this.configService.getFormConfiguration('PATIENT_REG');
    //Check for ID for Edit Mode
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEditMode = true;
      this.loadPatientData(id);
    }
  }
  loadPatientData(id: number): void {
    this.patientService.getPatientById(id).subscribe({
      next: (res: ApiResponse<PatientModel>) => {
        this.patientData = res.data;
        console.log('Edit Data Loaded:', this.patientData);
      },
      error: (err) => {
        console.error('Error fetching patient data', err);
        this.notify.showError('Getting internal error while fetching details');
      },
    });
  }
  onPatientSave(formData: any) {
    console.log('Final Patient Data Object:', formData);
    // 2. Fix the ID: Convert "" to null or 0
    const patientData = {
      ...formData,
      id: formData.id || 0,
      collectionDate: formData.collectionDate
        ? new Date(
            formData.collectionDate.year,
            formData.collectionDate.month - 1,
            formData.collectionDate.day,
          ).toISOString()
        : null,
      collectionTime: formData.collectionTime
        ? new Date(`1970-01-01T${formData.collectionTime}`).toISOString()
        : null,
    };
    this.patientService.submitPatient(patientData).subscribe({
      next: (res) => {
        if (res.success) {
          this.notify.showSuccess(
            `Patient ${this.isEditMode ? 'updated' : 'saved'} successfully`,
          );
          this.router.navigate(['/admin/list/patients']);
        } else {
          this.notify.showError('Failed to save patient');
        }
      },
      complete: () => {
        this.isEditMode = false;
      },
      error: (err) => {
        console.error('API Error:', err);
        this.notify.showError('Getting internal error while saving patient');
      },
    });
  }

  onBack() {
    this.router.navigate(['/admin/list/patients']);
  }
}
