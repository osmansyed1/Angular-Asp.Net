import { Routes } from '@angular/router';
import { EmployeeComponent } from './Components/employee/employee.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { authGuard } from './gurds/auth.guard';
import { MsalGuard } from '@azure/msal-angular';

export const routes: Routes = [
    {
        path:"",
        redirectTo:'/login',
        pathMatch:'full'
       
    },
    {
        path:"emp",
        component:EmployeeComponent,
         //canActivate:[authGuard],
         canActivate: [MsalGuard],
    
    },
    {
        path:"login",
        component:LoginComponent
    },
    {
        path:"reg",
        component:RegisterComponent
    }
   
];
