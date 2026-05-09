import {
  Input,
  Component,
  OnChanges,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { NgbPagination, NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { NgIf, TitleCasePipe } from '@angular/common';
import { DynamicTableConfig } from '../../models/dynamic-table.model';

@Component({
  selector: 'app-dynamic-table',
  standalone: true,
  // Added NgFor for the columns and rows
  imports: [NgbPagination, FormsModule, NgIf, NgbTooltip, TitleCasePipe],
  templateUrl: './dynamic-table.component.html',
  styleUrl: './dynamic-table.component.css',
})
export class DynamicTableComponent implements OnInit, OnChanges {
  @Input() config!: DynamicTableConfig; 
  @Input() tableData: any[] = [];
  @Output() onAction = new EventEmitter<{ type: string, row?: any }>();

  pageSizeOptions = [5, 10, 20, 50];
  page = 1;
  pageSize = 10;
  collectionSize = 0;
  displayList: any[] = [];
  columns: string[] = [];

  ngOnInit() { this.updateTable(); }
  ngOnChanges() { this.updateTable(); }

  updateTable() {
    this.collectionSize = this.tableData?.length || 0;
    this.getColumns();
    this.refreshData();
  }

  getColumns() {
    if (this.tableData && this.tableData.length > 0) {
      const allKeys = Object.keys(this.tableData[0]);
      const exclude = this.config?.excludeColumns || ["Id", "id", "createdAt", "updatedAt"];
      this.columns = allKeys.filter(key => !exclude.includes(key));
    }
  }

  refreshData() {
    this.displayList = this.tableData.slice(
      (this.page - 1) * this.pageSize,
      (this.page - 1) * this.pageSize + this.pageSize
    );
  }

  formatHeader(val: string) {
    return val.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
  }

  // onActionClick(type: string, row?: any) {
  //   this.onAction.emit({ type, row });
  // }
}

