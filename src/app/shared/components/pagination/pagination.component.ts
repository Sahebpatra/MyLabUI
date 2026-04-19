import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (totalPages > 1) {
      <nav>
        <ul class="pagination justify-content-end">
          <li class="page-item" [class.disabled]="currentPage === 1">
            <a class="page-link" (click)="changePage(currentPage - 1)" style="cursor:pointer">Previous</a>
          </li>
          
          @for(p of pages; track p) {
            <li class="page-item" [class.active]="currentPage === p">
              <a class="page-link" (click)="changePage(p)" style="cursor:pointer">{{p}}</a>
            </li>
          }

          <li class="page-item" [class.disabled]="currentPage === totalPages">
            <a class="page-link" (click)="changePage(currentPage + 1)" style="cursor:pointer">Next</a>
          </li>
        </ul>
      </nav>
    }
  `
})
export class PaginationComponent implements OnChanges {
  @Input() totalItems: number = 0;
  @Input() pageSize: number = 10;
  @Input() currentPage: number = 1;
  @Output() pageChange = new EventEmitter<number>();

  pages: number[] = [];
  totalPages: number = 0;

  ngOnChanges() {
    this.totalPages = Math.ceil(this.totalItems / this.pageSize);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
      this.pageChange.emit(page);
    }
  }
}