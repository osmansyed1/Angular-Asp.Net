import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginResponse } from '../Model/LoginResponse';
// import { environment } from '../../environments/environment';

import { AuthenticationResult } from "@azure/msal-browser"
import { MsalService } from '@azure/msal-angular';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment.development';
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  // private apiUrl = 'https://localhost:7079/api/Auth';

  private apiUrl = environment.APIUrl+"/api/Auth";
  private tokenKey = 'jwt_token';
  

  constructor(private http: HttpClient,private msalService: MsalService,private router:Router) { }

 


  loginWithAzureAd(): Observable<AuthenticationResult> {
    return new Observable(observer => {
      this.msalService.loginPopup({
        scopes: [environment.scopeUri] //  the scope here
      }).subscribe({
        next: (response: AuthenticationResult) => {
          // Successful login, save the access token
          
          this.saveToken(response.accessToken);
     
         observer.next(response);


          //  observer.complete(); // Mark the observable as completed
          !this.router.navigate(['/emp']);//whetrher add here or add in login.ts
        },
        error: (error) => {
          console.error('Azure AD login error:', error);
          observer.error(error); // Emit the error to the subscriber
        }
      });
    });
  }
  
  login(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, { username, password });
  }


LoginWithFacebook(accessToken: string): Observable<any> {
  const headers = new HttpHeaders().set('Content-Type', 'application/json');
  return this.http.post(`${this.apiUrl}/LoginWithFacebook`, JSON.stringify({ accessToken }), { headers });
}

  register(email: string, username: string, password: string,role:string): Observable<any> {
    const payload = { email, username, password, role }; // Include role in the payload
    return this.http.post(`${this.apiUrl}/register`, payload);
  }
  saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    const toke= localStorage.getItem(this.tokenKey);
    console.log(toke);
    return toke
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

  // logout(): void {
  //   localStorage.removeItem(this.tokenKey);
  // }
  
  logout(): void {
    // Remove the token from localStorage
    localStorage.removeItem(this.tokenKey);
  
    // Log out from Azure AD using msalService
    this.msalService.logoutPopup().subscribe({
      next: () => {
        console.log('Logged out from Azure AD');
      },
      error: (error) => {
        console.error('Azure AD logout failed', error);
      }
    });
  }
  
}
