import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.scss']
})
export class NotificationListComponent implements OnInit {
  items = [1, 2];
  metaData;
  isloading = false;
  constructor() { }

  ngOnInit() {
  }

}
