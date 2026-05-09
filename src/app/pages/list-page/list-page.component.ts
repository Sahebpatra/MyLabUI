import { Component, inject, OnInit } from '@angular/core';
import { DynamicTableComponent } from '../../shared/components/dynamic-table/dynamic-table.component';
import { NotificationService } from '../../core/services/common/notification.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonHttpService } from '../../core/services/common/common-http.service';
import { CommonService } from '../../core/services/common/common.service';
import { DynamicTableConfig } from '../../shared/models/dynamic-table.model';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-list-page',
  standalone: true,
  imports: [DynamicTableComponent, NgIf],
  templateUrl: './list-page.component.html',
  styleUrl: './list-page.component.css',
})
export class ListPageComponent implements OnInit {
  private commonService = inject(CommonService);
  private notify = inject(NotificationService);
  private router = inject(Router);
  private activeRoute = inject(ActivatedRoute);
  config!: DynamicTableConfig;
  listData: any[] = [];

  ngOnInit() {
    this.activeRoute.params.subscribe(data => {
      const menuName = data['menuName'] || 'patients';
      this.listConfig(menuName);
      this.getlist(menuName);
    });
  }

  listConfig(menuName: string) {
    this.config = {
      title: `${menuName.charAt(0).toUpperCase() + menuName.slice(1)} List`,
      primaryKey: 'Id',
      buttonPlacement: 'top',
      excludeColumns: ['Id', 'id', 'createdAt', 'updatedAt'],
      AddNewButton: {
        ButtonText: `New ${menuName.charAt(0).toUpperCase() + menuName.slice(1)}`,
        icon: 'fa fa-user-plus',
        class: 'btn-outline-secondary',
        redirectTo: `/admin/new-${menuName}`,
      },
      actions: [
        {
          actionKey: 'view',
          label: 'View',
          icon: 'fa fa-eye',
          class: 'text-success',
          redirectTo: `/admin/view-${menuName}`,
        },
        {
          actionKey: 'edit',
          label: 'Edit',
          icon: 'far fa-edit',
          class: 'text-primary',
          redirectTo: `/admin/edit-${menuName}`,
        },
        {
          actionKey: 'delete',
          label: 'Delete',
          icon: 'fa fa-trash-alt',
          class: 'text-danger',
        },
      ],
    };
  }

  getlist(menuName: string) {
    this.commonService.getListPage(menuName).subscribe({
      next: (res: any) => {
        if (res.success) {
          this.listData =
            typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
        }
      },
      error: (err) => {
        this.listData = [];
        this.notify.showError('Internal error fetching list');
      },
    });
  }
  handleAction(event: { type: string; row?: any }) {
    const { type, row } = event;
    const id = row ? row[this.config.primaryKey] : null;

    if (type === 'add') {
      this.router.navigate([this.config.AddNewButton?.redirectTo]);
      return;
    }

    const actionDef = this.config.actions.find((a) => a.actionKey === type);
    if (actionDef?.redirectTo && id) {
      this.router.navigate([actionDef.redirectTo, id]);
    } else if (type === 'delete') {
      this.notify.showInfo('Delete logic for ID: ' + id);
    }
  }
}
