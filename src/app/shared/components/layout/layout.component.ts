import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { LoaderService } from '../../../core/services/common/loader.service';
import { SideBarComponent } from './side-bar/side-bar.component';
import { HeaderComponent } from './header/app-header.component';
@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet,
    HeaderComponent, SideBarComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
 isCollapsed = false;
  loaderService = inject(LoaderService);
}
