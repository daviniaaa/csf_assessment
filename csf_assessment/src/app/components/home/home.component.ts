import { State } from './../../models';
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
  noOfMins: string = '';
  minutes: number = 5;
  tagList: TagCount[] = [];

  constructor(private uploadSvc: UploadService, private router: Router) {}
  ngOnInit() {
    if (this.uploadSvc.doNotLoad) {
      const s: State = this.uploadSvc.loadState();
      console.log(s); console.log(s.minutes);
      this.minutes = s.minutes;
      this.tagList = s.tagList;
    } else {
      this.uploadSvc.getTags(this.minutes).then( data => {
        console.log("tag rseults >> " + data);
        this.tagList = [...data];
      })
    }
    this.noOfMins = this.minutes + " mins";
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
    this.uploadSvc.saveState(this.minutes, this.tagList);

    this.router.navigate(["/details"], { queryParams });
  }

}
