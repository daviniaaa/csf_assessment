import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  tag: string = '';
  minutes: number = 0;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.tag = this.activatedRoute.snapshot.queryParams['tag'];
    this.minutes = this.activatedRoute.snapshot.queryParams['minutes'];
  }

}
