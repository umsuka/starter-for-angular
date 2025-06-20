import { Component, OnInit } from '@angular/core';
import { account, ID } from '../../lib/appwrite';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LoadingService } from '../Services/loading.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [FormsModule, CommonModule], // Fixed: Remove quotes around FormsModule
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loggedInUser: any = null;
  email: string = '';
  password: string = '';
  name: string = '';
  showRegister: boolean = false;
  showLogin: boolean = true;
  showLogout: boolean = false;

    constructor(private router : Router,private loadingService: LoadingService) { }

  ngOnInit() {
    this.checkAuthStatus();
  }

  async checkAuthStatus() {
    try {
      this.loadingService.show();
      this.loggedInUser = await account.get();
      console.log('User is logged in:', this.loggedInUser);
      if(this.loggedInUser) {
      this.router.navigate(['/home'], {
        state: { user: this.loggedInUser }
      });
      console.log('Login successful:', this.loggedInUser);  
      }
      setTimeout(() => {
      this.loadingService.hide();
    }, 2000);
    } catch (error) {
      this.loggedInUser = null;
    }
  }

  async login() { // Removed parameters since we're using template binding
    try {
      await account.createEmailPasswordSession(this.email, this.password);
      this.loggedInUser = await account.get();
      this.resetForms();
    } catch (error) {
      console.error('Login failed:', error);
      // Handle error (show message to user)
    }
  }

  async register() { // Removed parameters since we're using template binding
    try {
      await account.create(ID.unique(), this.email, this.password, this.name);
      await this.login();
    } catch (error) {
      console.error('Registration failed:', error);
      // Handle error (show message to user)
    }
  }

  async logout() {
    try {
      await account.deleteSession('current');
      this.loggedInUser = null;
      this.resetForms();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }

  private resetForms() {
    this.email = '';
    this.password = '';
    this.name = '';
  }

  toggleForms() {
    this.showRegister = !this.showRegister;
    this.showLogin = !this.showLogin;
    this.resetForms();
  }
}
