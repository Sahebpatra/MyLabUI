import {
  Component,
  EventEmitter,
  Output,
  Input,
  inject,
  OnInit,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, NgbDropdownModule],
  templateUrl: './app-header.component.html',
  styleUrl: './app-header.component.css',
})
export class HeaderComponent implements OnInit {
  @Input() isCollapsed = false;
  @Output() toggle = new EventEmitter<void>();
  userName: string = '';
  private router = inject(Router);

  ngOnInit(): void {
    this.userName = localStorage.getItem('user_details') as string;
  }
  onLogout() {
    //console.log('Logging out...');
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_details');
    sessionStorage.removeItem('user_menus');
    this.router.navigateByUrl('auth/login');
  }
}
