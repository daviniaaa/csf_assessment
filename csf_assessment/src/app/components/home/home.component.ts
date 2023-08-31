import { Component, OnInit } from '@angular/core';
import { Params, Router } from '@angular/router';
import { TagCount } from 'src/app/models';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  timeOptions: number[] = [ 5, 15, 30, 45, 60 ];
  noOfMins: string = '5 mins';
  minutes: number = 5;
  tagList: TagCount[] = [];

  constructor(private uploadSvc: UploadService, private router: Router) {}
  ngOnInit() {
    this.uploadSvc.getTags(this.minutes).then( data => {
      console.log("tag rseults >> " + data);
      this.tagList = [...data];
    })
  }

  onChange(newValue: string) {
    console.log("no of minutes >> "+ this.noOfMins);
    this.noOfMins = newValue;
    console.log("no of minutes >> "+ this.noOfMins);
    this.minutes = parseInt(this.noOfMins.slice(0, this.noOfMins.length - 5));

    this.uploadSvc.getTags(this.minutes).then( data => {
      console.log("tag rseults >> " + data);
      this.tagList = [...data];
    })
  }

  tagDetails(tag: string) {
    const queryParams: Params = {
      tag: tag,
      minutes: this.minutes
    }
    this.router.navigate(["/details"], { queryParams });
  }

}
