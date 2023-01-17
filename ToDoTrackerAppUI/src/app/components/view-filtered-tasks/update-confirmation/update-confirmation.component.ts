import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Task } from 'src/app/model/Task';
import { TaskArchiveService } from 'src/app/services/task-archive.service';
import { UserTaskService } from 'src/app/services/user-task.service';
import { ViewCompletedTaskComponent } from '../view-completed-task/view-completed-task.component';

@Component({
  selector: 'app-update-confirmation',
  templateUrl: './update-confirmation.component.html',
  styleUrls: ['./update-confirmation.component.css']
})
export class UpdateConfirmationComponent {

  task = new Task()
 
  user: any = this.data.emailId;
  task1 :any =this.data.task;



  constructor(
     private taskService: UserTaskService,
     private router: Router,@Inject(MAT_DIALOG_DATA) public data :{ emailId: any ,task:any},
     private taskarc: TaskArchiveService,public dialogRef: MatDialogRef<ViewCompletedTaskComponent>,private _snackBar: MatSnackBar) { }
 
 


  ngOnInit(): void {

    this.taskService.getTaskByTaskId(this.user,this.task1).subscribe(res => this.task = res)
    console.log(this.task1);
    console.log("user details"+this.user);

  }

 update() {
    this.taskService.updateTask(this.user,this.task).subscribe()
    if(this.task.taskCompleted){
      
      this._snackBar.open('Mark', 'ok', {
        duration: 5000,
        panelClass: ['mat-toolbar', 'mat-primary']
      });
    }else{
      this._snackBar.open('Mark', 'ok', {
        duration: 5000,
        panelClass: ['mat-toolbar', 'mat-primary']
      });
    }
      this.dialogRef.close();
  }


  
  cancel(){
    this.dialogRef.close()
  }


}