import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
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

  constructor(private activatedRoute: ActivatedRoute, private uploadSvc: UploadService,
    private router: Router) {}


  ngOnInit() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.tag = this.activatedRoute.snapshot.queryParams['tag'];
    this.minutes = this.activatedRoute.snapshot.queryParams['minutes'];

    this.uploadSvc.getDetails(this.tag, this.minutes).then( data => {
      console.log("news rseults >> " + data);
      this.newsList = [...data];
    })
  }

  loadState() {
    this.uploadSvc.doNotLoad = true;
  }

  goToTag(tag: string) {
    console.log("goToTag() clicked !!")
    const queryParams: Params = {
      tag: tag,
      minutes: this.minutes
    }

    this.router.navigate(["/details"], { queryParams });

  }

}
