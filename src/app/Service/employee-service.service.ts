import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../Model/Employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeServiceService {

  constructor(private http:HttpClient) { }
  private apiUrl="https://localhost:7079/api/Employee"

  getAllEmployee():Observable<Employee[]>
  {
    return this.http.get<Employee[]>(this.apiUrl)
  }
  addEmployee(data:Employee):Observable<Employee>
  {
    return this.http.post<Employee>(this.apiUrl,data)
  }
  updateEmployee(employee:Employee)
  {
    return this.http.put(`${this.apiUrl}/${employee.id}`,employee)
  }
  deleteEmployee(id:string)
  {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
