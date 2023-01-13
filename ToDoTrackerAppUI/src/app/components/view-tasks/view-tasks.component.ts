import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from 'src/app/model/Task';
import { TaskArchiveService } from 'src/app/services/task-archive.service';
import { UserTaskService } from 'src/app/services/user-task.service';
import { AddTaskComponent } from '../add-task/add-task.component';
import { UpdateTaskComponent } from '../update-task/update-task.component';


@Component({
  selector: 'app-view-tasks',
  templateUrl: './view-tasks.component.html',
  styleUrls: ['./view-tasks.component.css']
})
export class ViewTasksComponent implements OnInit {

  notes: Task[] = [];
  task:any;
  userId: any;

  

  constructor(private taskService: UserTaskService, private router: Router,
    public dialog: MatDialog, private actRoute: ActivatedRoute, private taskArc : TaskArchiveService) { }
  

  add() {
    const dialogRef = this.dialog.open(AddTaskComponent, {
      data: { userId: this.userId },
      width: "700px",
      height: "850px"
    })
  }
  update(taskId: any) {
    const dialogRef = this.dialog.open(UpdateTaskComponent, {
      data: { userId: this.userId, task: taskId },
      width: "700px",
      height: "900px"
    })
  }
  delete(taskId: any) {
    this.taskService.getTaskByTaskId(this.userId,taskId).subscribe(data =>{
      this.task =data
      this.taskArc.addTaskInArchive(this.userId,this.task).subscribe(data=>{
        console.log(data);});
     console.log(this.task);} )
  
     this.taskService.deleteTaskByTaskId(this.userId, taskId).subscribe({ next() { alert("successfully deleted ") }, error() { alert("error from server side ") } })
     window.location.reload();
  }

  ngOnInit(): void {

    this.userId = this.actRoute.snapshot.paramMap.get('userId');
    this.taskArc.currentUserId = this.userId
    this.taskService.getAllTasksOfUser(this.userId).subscribe(response => {
      this.notes = response
      console.log(response);
      console.log(this.userId);
    })
  }


  search(searchText: string) {
      this.notes = this.notes.filter((task) => {
      return task.taskName?.startsWith(searchText);
    })
  }
}



