export interface MenuModel {
  menuId: number;
  tenantId: number;
  parentMenuId: number | null;
  menuTitle: string;
  routePath: string;
  menuKey: string;
  iconClass: string | null;
  sortOrder: number;
  children?: MenuModel[];
  isOpen?: boolean;
}

// export const FLAT_MENU: MenuModel[] = [
//   { id: 1, parentId: null, title: 'Dashboard', link: '/dashboard', icon: 'fas fa-home' },
//   { id: 2, parentId: null, title: 'Patients', icon: 'fas fa-user-friends' },
//   { id: 3, parentId: 2, title: 'Registration', link: '/new-patient', icon: 'fas fa-user-plus' },
//   { id: 4, parentId: 2, title: 'Patient List', link: '/list/patient', icon: 'fas fa-users' },
//   { id: 5, parentId: null, title: 'Tests', link: '/test-list', icon: 'fas fa-flask' },
//   { id: 6, parentId: null, title: 'Analytics', link: '/analytics', icon: 'fas fa-chart-line' },
//   { id: 7, parentId: null, title: 'Settings', link: '/settings', icon: 'fas fa-cog' },
// ];