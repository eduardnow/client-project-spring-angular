import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import { Client } from './client';
import {catchError} from 'rxjs/operators';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';

@Injectable()
export class ClientService {

  private endpoint = 'http://localhost:8080/api/clients/';

  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient, private router: Router) { }

  all(): Observable<Client[]> {
    return this.http.get<Client[]>(this.endpoint);
  }

  create(client: Client): Observable<Client> {
    return this.http.post<Client>(this.endpoint, client, {
      headers: this.headers
    });
  }

  findById(id: number): Observable<Client> {
    return this.http.get<Client>(`${this.endpoint}/${id}`).pipe(catchError(err => {
      this.router.navigate(['/clients']);
      Swal.fire('Error', err.message, 'error');
      return throwError(err);
    }));
  }

  update(client: Client): Observable<Client> {
    return this.http.put<Client>(`${this.endpoint}/${client.id}`, client, {
      headers: this.headers
    });
  }

  delete(id: number) {
    return this.http.delete<Client>(`${this.endpoint}/${id}`, {
      headers: this.headers
    });
  }

}
