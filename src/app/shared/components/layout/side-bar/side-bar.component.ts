import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { Input } from '@angular/core';
import { MenuModel } from '../../../models/menu.model';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { MenuService } from '../../../../core/services/menu.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css',
})
export class SideBarComponent implements OnInit, OnDestroy {
  @Input() isCollapsed = false;
  menuItems: MenuModel[] = [];
  
  private menuService = inject(MenuService);
  private menuSubscription!: Subscription;

  ngOnInit() {
    this.menuSubscription = this.menuService.menuSubject.subscribe({
      next: (structuredTree: MenuModel[]) => {
        this.menuItems = structuredTree;
        console.log(this.menuItems);
      }
    });
    console.log(this.menuItems);
    
  }

  toggleSubMenu(item: MenuModel) {
    item.isOpen = !item.isOpen;
  }

  ngOnDestroy() {
    if (this.menuSubscription) {
      this.menuSubscription.unsubscribe();
    }
  }
}
