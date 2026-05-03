import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { LoaderService } from '../../../core/services/common/loader.service';
@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  isCollapsed: boolean = false;
  loaderService: LoaderService = inject(LoaderService);
  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }
}
