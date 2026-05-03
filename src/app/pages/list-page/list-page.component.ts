import { Component, inject } from '@angular/core';
import { DynamicTableComponent } from '../../shared/components/dynamic-table/dynamic-table.component';
import { NotificationService } from '../../core/services/common/notification.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonHttpService } from '../../core/services/common/common-http.service';
import { CommonService } from '../../core/services/common/common.service';

@Component({
  selector: 'app-list-page',
  standalone: true,
  imports: [DynamicTableComponent],
  templateUrl: './list-page.component.html',
  styleUrl: './list-page.component.css'
})
export class ListPageComponent {
private commonService = inject(CommonService);
  private notify: NotificationService = inject(NotificationService);
  private router = inject(Router);
  private activeRoute = inject(ActivatedRoute);

   pagetitle: string = '';

  AddNewButton = {
    required: true,
    ButtonText: 'New patient',
    icon: 'fa fa-user-plus',
  };
  currentPage = 1;
  pageSize = 10;
  SearchTerm: string = '';
  IsActive: number = 1;
  listData: any[] = [];

  ngOnInit() {
    this.activeRoute.data.subscribe(data => {
      const menuName = data['menuName'] || 'patients';
      this.getlist(menuName);
    });
  }

  getlist(menuName: string = 'patients') {
    this.commonService.getListPage(menuName).subscribe({
      next: (res : any) => {
        if (res.success) {
          this.listData = JSON.parse(res.data) || [];
        } else {
          console.error('API Error:', res.message);
        }
      },
      error: (err) => {
        console.error('API Error:', err);
        this.listData = [];
        this.notify.showError(
          'Getting internal error while fetching patient list',
        );
      },
    });
  }
  onHandleAddNew() {
    this.router.navigate(['/admin/new-patient']);
  }
  onHandleEdit(Patient: any) {
    const patientId = Patient.Id;
    if (patientId) {
      this.router.navigate(['/admin/edit-patient', patientId]);
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
