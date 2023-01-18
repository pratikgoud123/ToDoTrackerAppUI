import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Task } from 'src/app/model/Task';
import { User } from 'src/app/model/User';
import { UserTaskService } from 'src/app/services/user-task.service';
import { ViewTasksComponent } from '../view-tasks/view-tasks.component';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.css'],
})
export class UpdateTaskComponent implements OnInit {
  task = new Task();
  addCount: number = 0;
  user: any = this.data.emailId;
  task1: any = this.data.task;

  constructor(
    private formBuilder: FormBuilder,
    private taskService: UserTaskService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: { emailId: any; task: any },
    public dialogRef: MatDialogRef<ViewTasksComponent>
  ) {}

  ngOnInit(): void {
    this.taskService
      .getTaskByTaskId(this.user, this.task1)
      .subscribe((res) => (this.task = res));
    console.log(this.task1);
    console.log('user details id ==' + this.user);
  }

  function1() {
    this.addCount = this.addCount + 1;
    this.taskService.notifycount.next(this.addCount);
    this.taskService.updateTask(this.user, this.task).subscribe();

    console.log(this.task);
   
    this.dialogRef.close()
   
  }
}
