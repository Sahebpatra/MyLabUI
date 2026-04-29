import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';
import { PatientService } from '../../../core/services/patient.service';
import { PatientModel } from '../../../core/models/patient.model';
import { NotificationService } from '../../../core/services/common/notification.service';

@Component({
  selector: 'app-patient-list',
  standalone: true,
  imports: [RouterLink, PaginationComponent],
  templateUrl: './patient-list.component.html',
  styleUrl: './patient-list.component.css',
})
export class PatientListComponent {
  private patientService = inject(PatientService);
  private notify: NotificationService = inject(NotificationService);
  currentPage = 1;
  pageSize = 10;
  SearchTerm: string = '';
  IsActive: number = 1;
  patientList: PatientModel[] = [];

  ngOnInit() {
    this.getAllPatients();
  }

  getAllPatients() {
    this.patientService
      .getAllPatients()
      .subscribe({
        next: (res) => {
          if (res.success) {
            this.patientList = res.data || [];
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
  //Pagination logic
  get displayList() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.patientList.slice(start, start + this.pageSize);
  }
  onPageChange(page: number) {
    this.currentPage = page;
  }
}
