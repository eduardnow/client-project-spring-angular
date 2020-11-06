import { ClientService } from './../client.service';
import { Client } from './../client';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  title = 'Create Client';

  client: Client = new Client();

  constructor(private service: ClientService, private route: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getClient();
  }

  getClient() {
    this.activatedRoute.params.subscribe(params => {
      const id = params.id;

      if (id) {
        this.service.findById(id).subscribe(
          client => {
            this.client = client;
          },
          error => console.error(error)
        );
      }
    });
  }

  create(): void {
    this.service.create(this.client).subscribe(
      client => {
        this.route.navigate(['/clients']);
        Swal.fire('New Client', `Cliente ${client.firstName} created`, 'success');
      },
      error => console.error(error)
    );
  }

}
