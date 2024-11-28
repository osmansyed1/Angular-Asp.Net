import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthServiceService } from '../../Auth/auth-service.service';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CardModule,
    InputTextModule,
    ButtonModule,
    RouterLink,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  selectedRole: string | null = null; // Track selected role
  constructor(private router:Router,private authService:AuthServiceService){}
  fb=inject(FormBuilder)
  regForm:FormGroup;
  ngOnInit(): void {
    this.regForm=this.fb.group({

      email: ['', [Validators.required, Validators.email]], 
      username:['',Validators.required],
  
      password:['',Validators.required],
      role: ['', Validators.required] // Add role control

    })
      
  }
 



  get email() {
    return this.regForm.controls['email'];
  }


  setRole(role: string) {
    this.selectedRole = role;
    this.regForm.controls['role'].setValue(role); // Set role in the form
  }

  regSubmit(){
    if (!this.selectedRole) {
      return; // Prevent submission if no role is selected
    }
    console.log(this.regForm)
    const { email, username, password } = this.regForm.value;
    this.authService.register(email, username, password,this.selectedRole).subscribe({
      next: () => {
        // Optionally navigate to login page or show a success message
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Registration failed', err);
        // Optionally show an error message to the user
      }
    });
  }
}
