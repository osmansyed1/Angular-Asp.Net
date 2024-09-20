import { Routes } from '@angular/router';
import { EmployeeComponent } from './Components/employee/employee.component';

export const routes: Routes = [
    {
        path:"",
        component:EmployeeComponent
    },
    {
        path:"emp",
        component:EmployeeComponent
    }
];
