import { Component } from '@angular/core';
import { account } from '../../../lib/appwrite';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  user: any;

  constructor(private router: Router) {
    // Get the navigation state
    const navigation = this.router.getCurrentNavigation();
    this.user = navigation?.extras.state?.['user'];
    
    // Alternative if page is refreshed
    if (!this.user) {
      this.user = history.state.user;
    }
  }
    
    async logout() {
      try {
        await account.deleteSession('current');
        this.user = null;
        console.log('Logout successful');
        // Optionally, redirect to login or home page
        this.router.navigate(['/login']);
        // Optionally, reset forms or state
        // this.resetForms();
      } catch (error) {
        console.error('Logout failed:', error);
      }
    }
}
