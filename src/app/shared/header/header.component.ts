import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  usuario: string = '';

  constructor(private router: Router) {
    const usuario = localStorage.getItem('usuario');
    this.usuario = usuario ?? '';
  }

  get showLogout(): boolean {
    return this.router.url !== '/auth/login' && this.router.url !== '/auth/register';
  }



  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/auth/login']);
  }
}
