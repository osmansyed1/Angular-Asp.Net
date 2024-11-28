import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Employee } from '../Model/Employee';
import { AuthServiceService } from '../Auth/auth-service.service';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class EmployeeServiceService {
  

  
  private apiUrl =environment.APIUrl+"/api/Employee";

  constructor(private http: HttpClient,private authService:AuthServiceService) { }

  getAllEmployee(): Observable<Employee[]> {
    console.log(this.apiUrl)
    return this.http.get<Employee[]>(this.apiUrl);
  }
 
  

  addEmployee(data: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.apiUrl, { ...data, id: undefined });
  }

  updateEmployee(employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.apiUrl}/${employee.id}`, employee);
  }

  deleteEmployee(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // private apiUrl = "https://localhost:7079/api/Employee";
  //https://localhost:44311/api/Employee


 // getAllEmployee(): Observable<Employee[]> {
  //   return this.http.get<Employee[]>(this.apiUrl).pipe(
  //     catchError((error) => {
  //       console.error('Error fetching employees:', error);
  //       return throwError(error); // Rethrow the error
  //     })
  //   );
  // }

  // getAllEmployee(): Observable<Employee[]> {
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getToken()}`);
  //   return this.http.get<Employee[]>(this.apiUrl, { headers });
  // }

  // addEmployee(data: Employee): Observable<Employee> {
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getToken()}`);
  //   // return this.http.post<Employee>(this.apiUrl, data, { headers });
  //   return this.http.post<Employee>(this.apiUrl, { ...data, id: undefined }, { headers });
  // }

  // updateEmployee(employee: Employee) {
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getToken()}`);
  //   return this.http.put(`${this.apiUrl}/${employee.id}`, employee, { headers });
  // }

  // deleteEmployee(id: string) {
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getToken()}`);
  //   return this.http.delete(`${this.apiUrl}/${id}`, { headers });
  // }

  // getAllEmployee():Observable<Employee[]>
  // {
  //   return this.http.get<Employee[]>(this.apiUrl)
  // }
  // addEmployee(data:Employee):Observable<Employee>
  // {
  //   return this.http.post<Employee>(this.apiUrl,data)
  // }
  // updateEmployee(employee:Employee)
  // {
  //   return this.http.put(`${this.apiUrl}/${employee.id}`,employee)
  // }
  // deleteEmployee(id:string)
  // {
  //   return this.http.delete(`${this.apiUrl}/${id}`);
  // }
}
