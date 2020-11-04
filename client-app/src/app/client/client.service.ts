import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from './client';

@Injectable()
export class ClientService {

  private endpoint = 'http://localhost:8080/api/clients';

  constructor(private http: HttpClient) { }

  all() : Observable<Client[]> {
    return this.http.get<Client[]>(this.endpoint);
  }

}
