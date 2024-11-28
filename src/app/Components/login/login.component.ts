import { Component, inject, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupName, ReactiveFormsModule, Validators } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthServiceService } from '../../Auth/auth-service.service';
import { environment } from '../../../environments/environment';
import { MsalService } from '@azure/msal-angular';
// import { MsalService } from '@azure/msal-angular';

declare const FB:any;
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CardModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    RouterLink,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  fb=inject(FormBuilder)
  constructor(private authService:AuthServiceService,private router:Router,
    
 
    private _ngZone:NgZone){}
  loginForm:FormGroup;



  ngOnInit(): void {
   this.loginForm=this.fb.group({
      username:['',Validators.required],
      password:['',Validators.required]
    })
  
 
  }
  
  loginSubmit() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.authService.login(username, password).subscribe({
        next: (response) => {
          this.authService.saveToken(response.token); // Save the token
          // Redirect to another page or show success message
          console.log(response.token)
        this.router.navigate(['/emp']);
          
        },
        error: (err) => {
          console.error('Login failed', err);
        }
      });
    }

  
  }
 // Azure AD login

  loginWithAzureAd(): void {
    this.authService.loginWithAzureAd().subscribe({
      next: (response) => {
        console.log('Azure AD login successful:', response);
        //  this.router.navigate(['/emp']); // Redirect to employee page
      },
      error: (error) => {
        console.error('Azure AD login failed:', error);
      }
    });
  }

  async Login() {
    FB.login(async (result: any) => {
      if (result.authResponse) {
        const accessToken = result.authResponse.accessToken;
        await this.authService.LoginWithFacebook(accessToken).subscribe(
          (response: any) => {
            this._ngZone.run(() => {
              // Handle successful login, e.g., save token, redirect
              this.authService.saveToken(response.token); // Assuming your API returns a token
              this.router.navigate(['/emp']);
            });
          },
          (error: any) => {
            console.error('Facebook login failed', error);
          }
        );
      } else {
        console.log('User cancelled login or did not fully authorize.');
      }
    });
  }





//   async Login()
//  {
//   FB.login(async (result:any)=>{
//     await this.authService.LoginWithFacebook(result.authResponse.accessToken).subscribe(
//       (x:any)=>{
//         this._ngZone.run(()=>{
//           this.router.navigate(['/emp'])
//         })
//       },
//       (error:any)=>{
//         console.log(error)
//       }
//     )
//   })
//  }

// async loginWithMicrosoft() {
//   const loginRequest = {
//     scopes: ['openid', 'profile', 'api://becc05fa-09d5-43df-aaef-d5b147658cc6/readaccess']
//   };

//   try {
//     const response = await this.msalService.loginPopup(loginRequest).toPromise();
//     this._ngZone.run(() => {
//       this.authService.saveToken(response.accessToken);
//       this.router.navigate(['/emp']);
//     });
//   } catch (error) {
//     console.error('Microsoft login failed', error);
//   }
// }






 //we added needed Information inside index.html script tag 

}
