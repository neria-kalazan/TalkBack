import { Component, Input, OnInit } from '@angular/core';
import { IRoom } from 'src/app/models';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.sass']
})
export class ContactListComponent implements OnInit {

  @Input() rooms: Array<IRoom> = [];

  constructor() { }

  ngOnInit(): void {
  }

}
