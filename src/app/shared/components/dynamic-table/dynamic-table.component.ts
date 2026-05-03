import {
  Input,
  Component,
  OnChanges,
  OnInit,
  Output,
  EventEmitter,
  inject,
} from '@angular/core';
import { CommonService } from '../../../core/services/common/common.service';
import { NgbPagination, NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { NgIf, NgFor, TitleCasePipe } from '@angular/common';

interface AddNewButtonInterface {
  required: boolean;
  ButtonText: string | null;
  icon: string | null;
}

@Component({
  selector: 'app-dynamic-table',
  standalone: true,
  // Added NgFor for the columns and rows
  imports: [NgbPagination, FormsModule, NgIf, NgbTooltip, TitleCasePipe],
  templateUrl: './dynamic-table.component.html',
  styleUrl: './dynamic-table.component.css',
})
export class DynamicTableComponent implements OnInit, OnChanges {
  private commonService = inject(CommonService);

  @Input() tableData: any[] = [];
  @Input() title: string | null = null;
  @Input() isActionbutton: boolean = true;
  @Input() isEditable: boolean = true;
  @Input() isDeletable: boolean = true;
  @Input() isViewbutton: boolean = false;
  @Input() excludeColumns: string[] = ["Id", "id", "createdAt", "updatedAt"];
  @Input() AddNewButton: AddNewButtonInterface = {
    required: true,
    ButtonText: 'Add Patient',
    icon: 'fa fa-user-plus',
  };

  @Output() onEdit = new EventEmitter<any>();
  @Output() onDelete = new EventEmitter<any>();
  @Output() onView = new EventEmitter<any>();
  @Output() onAddNew = new EventEmitter<void>();

  pageSizeOptions = [5, 10, 20, 50];
  page = 1;
  pageSize = 10;
  collectionSize = 0;
  displayList: any[] = [];
  columns: string[] = [];

  ngOnInit() {
    this.updateTable();
  }

  ngOnChanges() {
    this.updateTable();
  }

  updateTable() {
    this.collectionSize = this.tableData?.length || 0;
    this.getColumns();
    this.refreshData();
  }

  getColumns() {
    if (this.tableData && this.tableData.length > 0) {
      // Fix: Reset columns array to prevent duplicates on change
      const allKeys = Object.keys(this.tableData[0]);
      this.columns = allKeys.filter(key => !this.excludeColumns.includes(key));
    }
  }

  refreshData() {
    this.displayList = this.tableData
      .map((data, i) => ({ slno: i + 1, ...data }))
      .slice(
        (this.page - 1) * this.pageSize,
        (this.page - 1) * this.pageSize + this.pageSize
      );
  }

  // Event Handlers
  onEditClick(item: any) { this.onEdit.emit(item); }
  onDeleteClick(item: any) { this.onDelete.emit(item); }
  onViewClick(item: any) { this.onView.emit(item); }
  onAddNewClick() { this.onAddNew.emit(); }

  // Helper to format table headers from camelCase
  formatHeader(val: string) {
    return val.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
  }
}
