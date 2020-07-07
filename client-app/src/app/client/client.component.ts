import { Component, OnInit } from '@angular/core';
import { Client } from './client';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  clients: Client[];

  constructor() { }

  ngOnInit(): void {

    this.clients = [
      {id: 1, firstname: 'John', lastname: 'Doe', email:'john.doe@example.com', createdAt:'2020-06-24'}
    ];

  }

}
