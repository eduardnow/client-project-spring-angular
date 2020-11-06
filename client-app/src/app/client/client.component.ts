import { Component, OnInit } from '@angular/core';
import { Client } from './client';
import { ClientService } from './client.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  clients: Client[];

  constructor(private service: ClientService) { }

  ngOnInit(): void {
    this.service.all().subscribe(response => this.clients = response);
  }


  delete(client: Client): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    });

    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {

        this.service.delete(client.id).subscribe(response => {
          this.clients = this.clients.filter(data => data.id !== client.id);
          swalWithBootstrapButtons.fire(
            'Deleted!',
            'Client has been deleted.',
            'success'
          );
        },
          error => console.error(error)
        );
      }
    });
  }

}
