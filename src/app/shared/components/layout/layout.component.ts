import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

interface MenuItem {
  label: string;
  icon: string;
  route?: string;
  permission: boolean;   // 👈 add this
  children?: MenuItem[];
}

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})


export class LayoutComponent {
  isCollapsed: boolean = false;
  menuItems: MenuItem[] = [
    {
      label: 'Dashboard',
      icon: 'fas fa-home',
      permission: true,
      route: '/dashboard'
    },
    {
      label: 'Tests',
      icon: 'fas fa-flask',
      permission: true,
      children: [
        {
          label: 'New Test',
          icon: 'fas fa-add',
          route: '/admin/new-test',
          permission: true
        },
        {
          label: 'Test List',
          icon: 'fas fa-list',
          route: '/admin/test-list',
          permission: true
        },
        {
          label: 'Reports',
          icon: 'fas fa-file-alt',
          route: '/admin/reports',
          permission: true
        }
      ]
    },
    {
      label: 'Analytics',
      icon: 'fas fa-chart-line',
      permission: true,
       children: [
        {
          label: 'Overview',
          icon: 'fas fa-chart-pie',
          route: '/admin/overview',
          permission: true
        },
        {
          label: 'Performance Metrics',
          icon: 'fas fa-tachometer-alt',
          route: '/admin/performance',
          permission: true
        },
        {
          label: 'Segmentation',
          icon: 'fas fa-project-diagram',
          route: '/admin/segmentation',
          permission: true
        }
      ]
    },
    {
      label: 'Users',
      icon: 'fas fa-users',
      permission: true,
      route: '/users'
    },
    {
      label: 'Settings',
      icon: 'fas fa-cog',
      permission: true,
      route: '/settings'
    }
  ];


  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  openMenu: string | null = null;

  toggleMenu(label: string) {
    this.openMenu = this.openMenu === label ? null : label;
  }

  menuOpen = false;

  toggleIcon() {
    this.menuOpen = !this.menuOpen;
  }
}
