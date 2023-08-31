import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { News } from 'src/app/models';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  tag: string = '';
  minutes: number = 0;
  newsList: News[] = [];

  constructor(private activatedRoute: ActivatedRoute, private uploadSvc: UploadService) {}


  ngOnInit() {
    this.tag = this.activatedRoute.snapshot.queryParams['tag'];
    this.minutes = this.activatedRoute.snapshot.queryParams['minutes'];

    this.uploadSvc.getDetails(this.tag, this.minutes).then( data => {
      console.log("news rseults >> " + data);
      this.newsList = [...data];
    })
  }


}
