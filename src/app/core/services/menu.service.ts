import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MenuModel } from '../../shared/models/menu.model';


@Injectable({
  providedIn: 'root'
})
export class MenuService {
  public menuSubject = new BehaviorSubject<MenuModel[]>(this.getInitialMenus());

  private getInitialMenus(): MenuModel[] {
    const menus = sessionStorage.getItem('user_menus');
    return menus ? this.buildMenuTree(JSON.parse(menus)) : [];
  }

  updateMenuState(rawMenus: MenuModel[]): void {
    debugger;
    console.log(rawMenus);
    
    const structuralTree = this.buildMenuTree(rawMenus);
    this.menuSubject.next(structuralTree); 
    console.log(structuralTree);
    
  }

  private buildMenuTree(data: MenuModel[]): MenuModel[] {
   const map = new Map<number, MenuModel>();
    const menu: MenuModel[] = [];
    data.forEach((item) => map.set(item.menuId, { ...item, children: [] }));
    map.forEach(item => {
      if (item.parentMenuId) {
        map.get(item.parentMenuId)?.children?.push(item);
      } else {
        menu.push(item);
      }
    });
    return menu;
  }
}
