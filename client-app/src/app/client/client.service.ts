import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from './client';

@Injectable()
export class ClientService {

  private endpoint = 'http://localhost:8080/api/clients';

  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient) { }

  all(): Observable<Client[]> {
    return this.http.get<Client[]>(this.endpoint);
  }

  create(client: Client): Observable<Client> {
    return this.http.post<Client>(this.endpoint, client, {
      headers: this.headers
    });
  }

  findById(id: number): Observable<Client> {
    return this.http.get<Client>(`${this.endpoint}/${id}`);
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
