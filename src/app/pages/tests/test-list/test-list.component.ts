import { Component, inject, OnInit } from '@angular/core';
import { LabTestService } from '../../../core/services/lab-test.service';
import { TestModelClass } from '../../../core/models/TestModel';
import { NotificationService } from '../../../core/services/common/notification.service';
import { RouterLink } from '@angular/router';
import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';

@Component({
  selector: 'app-test-list',
  standalone: true,
  imports: [RouterLink, PaginationComponent],
  templateUrl: './test-list.component.html',
  styleUrl: './test-list.component.css',
})
export class TestListComponent implements OnInit {
  private testService = inject(LabTestService);
  private notify: NotificationService = inject(NotificationService);
  testList: TestModelClass[] = [];

  currentPage = 1;
  pageSize = 10;
  ngOnInit(): void {
    this.getTestList();
  }

  getTestList() {
    this.testService.getAllTests().subscribe({
      next: (res) => {
        console.log(res);
        if (res.success) {
          this.testList = res.data;
        }
      },
      error: (err) => {
        this.testList = [];
        console.error('Error fetching test list:', err);
        this.notify.showError(
          'Failed to fetch test list. Please try again later.',
        );
      },
    });
  }
//Pagination logic
  get displayList() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.testList.slice(start, start + this.pageSize);
  }
  onPageChange(page: number) {
    this.currentPage = page;
  }
}
