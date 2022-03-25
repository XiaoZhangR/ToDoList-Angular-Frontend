import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface ThingsToDo {
  id:number;
  item: string;
  status: boolean
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'ToDoList';
  displayedColumns: string[] = ['id', 'item', 'status', 'edit', 'delete'];
  dataSource: any = [];

  dataset: any = {
    id: null,
    item: '',
    status: null
  };

  constructor(private https: HttpClient){
    
   }
  
  // sendEmail() {
  //   this.https.get(`http://localhost:8080/api/email/${this.dataset.item}/${this.dataset.status}`).subscribe(
  //     res => {
  //       console.log(res);
  //     }
  //   )
  // }

  onSubmit() {

    this.https.put<any>('http://localhost:8080/api/thingstodo', this.dataset).subscribe(
      res=>{
        // console.log(res);
        this.dataset.item = '';
        this.dataset.status = null;
      }
    )
  }

  ngOnInit() {
    this.https.get('http://localhost:8080/api/thingstodo').subscribe(res => {
        // console.log(res[0].id);
        this.dataSource = res;
      })
  }

  deleteItem(key: number) {
    // console.log(key);
    this.https.delete(`http://localhost:8080/api/thingstodo/${key}`).subscribe(() => {
        console.log('deleted');
    })
  }

  editItem(key: number) {
    this.https.get(`http://localhost:8080/api/thingstodo/${key}`).subscribe(
      res => {
        this.dataset = res;
      }
    )
  }

}
