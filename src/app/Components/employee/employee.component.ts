import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { Employee } from '../../Model/Employee';
import { DialogModule } from 'primeng/dialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { CheckboxModule } from 'primeng/checkbox';
import { EmployeeServiceService } from '../../Service/employee-service.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CommonModule } from '@angular/common';
import { AuthServiceService } from '../../Auth/auth-service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [
    ButtonModule,
    TableModule,
    DialogModule,
    InputTextareaModule,
    InputNumberModule,
    InputTextModule,
    FloatLabelModule,
    FormsModule,
    CheckboxModule,
    ReactiveFormsModule,
    ToastModule,
    ConfirmDialogModule,
    CommonModule

    
  ],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit {

  employeeList:Employee[]=[]
  visible: boolean = false;
  checked: boolean = false;
  empForm:FormGroup;
  editMode: boolean = false;
  selectedUserId: string | null = null;
  formValue:any;

constructor(private fb:FormBuilder,
  private empService:EmployeeServiceService,
  private messageService: MessageService,
  private confirmationService: ConfirmationService,
  private authService:AuthServiceService,
  private router:Router
){

   this.empForm=this.fb.group({
    department:['',[Validators.required]],
    name:["",Validators.required],
    mobile:['',Validators.required],
    email:['',[Validators.required,Validators.email]],
    gender:[''],
    city:['',Validators.required],
    address:['',Validators.required],
    salary:[null],
    status:[false]
   })  
}
get department(){
  return this.empForm.controls['department']
}
get name()
{
  return this.empForm.controls['name']
}
get mobile()
{
  return this.empForm.controls['mobile']
}

get email()
{
  return this.empForm.controls['email']
}
get gender()
{
  return this.empForm.controls['gender']
}
get city()
{
  return this.empForm.controls['city']
}

get address()
{
  return this.empForm.controls['address']
}
get salary()
{
  return this.empForm.controls['salary']
}
  showDialog(Emp?:Employee)

  {
    this.editMode = !!Emp;
    // So, in your example, this.editMode = !!Emp; sets this.editMode to true if Emp is a truthy value (exists), and false if Emp is falsy (does not exist).
    if (Emp) {
      this.empForm.patchValue(Emp);
      this.selectedUserId = Emp.id;
    } else {
      this.empForm.reset();
      this.selectedUserId = null;
    }
    this.visible = true;
  }
  ngOnInit(): void {
    const log=this.authService.isLoggedIn()
    console.log(log)
    if (this.authService.isLoggedIn()) {
      this.getEmployee();
    } else {
      this.router.navigate(['/login']); // Redirect if not logged in
    }
  }
  hideDialog()
  {
    this.visible=false
  }
  onSubmit()
  {
    if (this.editMode) {
      this.updateEmp();
    } else  {
      this.addEmployee();
    }
  }
    
  resetForm() {
    this.empForm.reset();
  }

  getEmployee()
  {
    console.log("hello")
    this.empService.getAllEmployee().subscribe(res=>{

      this.employeeList=res
    })
  }

  // addUser() {
    
  //   this.empService.addUser(this.userForm.value).subscribe(
  //     () => {
  //       this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User Added Successfully' });
  //       this.hideDialog();
  //       this.getUserList();
  //     },
  //     () => {
  //       this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to Add User' });
  //     }
  //   );
  // }

  addEmployee()
  {
    this.formValue=this.empForm.value;
    this.empService.addEmployee(this.formValue).subscribe(
      () => {
              this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User Added Successfully' });
            
              this.getEmployee();
              this.resetForm()
              this.hideDialog();

            },
            () => {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to Add User' });
            }
          );
        }
        confirmDelete(userId: string) {
          this.confirmationService.confirm({
            message: 'Are you sure you want to delete this user?',
            header: 'Confirm Delete',
            icon: 'pi pi-info-circle',
            acceptLabel: 'Delete',
            rejectLabel: 'Cancel',
            acceptButtonStyleClass: 'p-button-danger',
            rejectButtonStyleClass: 'p-button-secondary',
            accept: () => {
              this.deleteEmp  (userId);
            }
          });
        }
        
        deleteEmp(id:string)
        {
          this.empService.deleteEmployee(id).subscribe(
            () => {
              this.messageService.add({ severity: 'success', summary: 'Success', detail: ' Deleted Successfully' });
              this.getEmployee(); 
            },
            () => {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Delete failed' });
            }
          )
        }

        updateEmp() {
          if (this.selectedUserId !== null) {
            const updatedUser = { ...this.empForm.value, id: this.selectedUserId }; //here I am destructring object
            console.log(updatedUser)
            this.empService.updateEmployee(updatedUser).subscribe(
              () => {
                this.messageService.add({ severity: 'success', summary: 'Success', detail: ' Updated Successfully' });
                this.hideDialog();
                this.getEmployee();
              },
              () => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to Update ' });
              }
            );
        
          }
        }
        logout() {
          this.authService.logout(); // Call your logout method from AuthService
          this.router.navigate(['/login']); // Redirect to the login page
        }

  


}
