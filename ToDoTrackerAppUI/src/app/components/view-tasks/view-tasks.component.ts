import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from 'src/app/model/Task';
import { TaskArchiveService } from 'src/app/services/task-archive.service';
import { UserTaskService } from 'src/app/services/user-task.service';
import { AddTaskComponent } from '../add-task/add-task.component';
import { UpdateTaskComponent } from '../update-task/update-task.component';
import { UpdateConfirmationComponent } from '../view-filtered-tasks/update-confirmation/update-confirmation.component';


@Component({
  selector: 'app-view-tasks',
  templateUrl: './view-tasks.component.html',
  styleUrls: ['./view-tasks.component.css']
})
export class ViewTasksComponent implements OnInit {

  notes: Task[] = [];
  searchResult: Task[] = [];
  emailId: any;

  

  constructor(private taskService: UserTaskService, private router: Router,
    public dialog: MatDialog, private actRoute: ActivatedRoute, private taskArc : TaskArchiveService,private _snackBar: MatSnackBar) { }
  

  add() {
    const dialogRef = this.dialog.open(AddTaskComponent, {
      data: { emailId: this.emailId },
      width: "700px",
      height: "650px"
    })
  }
  update(taskName: any) {
    const dialogRef = this.dialog.open(UpdateTaskComponent, {
      data: { emailId: this.emailId, task: taskName },
      width: "700px",
      height: "750px" })
  }


  update1(taskName: any) {
    const dialogRef = this.dialog.open(UpdateConfirmationComponent, {
      data: { emailId: this.emailId, task: taskName },
      width: "300px",
      height: "200px" })
  }
 

  delete(task: any) {
    this.taskService.deleteTaskByTaskId(this.emailId, task.taskName).subscribe(()=>alert("successfully deleted"))
    window.location.reload();
  }

  ngOnInit(): void {
      this.emailId = this.taskService.getEmailId()
      console.log(this.emailId);
      this.taskService.getAllTasksOfUser(this.emailId).subscribe(response => {
      this.notes = response
      this.searchResult=this.notes
      })
     
    }

    refresh(text:any){
      
      window.location.reload()
      // this._snackBar.open('This is '+text+' task', 'ok', {
      //   duration: 5000,
      //   panelClass: ['mat-toolbar', 'mat-primary']
      // });
    }


  

  search(searchText: string) {
      
      //  if (searchText === " " || !searchText)
      //     this.notes = this.searchResult;
      //   else {
      //     console.log(this.notes);
      //      console.log(this.searchResult);
            
      //   this.notes = this.searchResult.filter(c => c.taskName?.startsWith(searchText));
      //   console.log(searchText);
      //   console.log(this.notes);
      //  }
      }
}



















// this.userId = this.actRoute.snapshot.paramMap.get('userId');