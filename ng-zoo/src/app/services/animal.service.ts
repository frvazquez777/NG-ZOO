import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';
import { Animal } from '../models/animal';

@Injectable()
export class AnimalService {

  public url: string;

  constructor(
    private http: HttpClient
  ) {
    this.url = GLOBAL.url;
  }

  addAnimal(token: string, animal: Animal): Observable<any> {
    let params = JSON.stringify(animal);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token
    });

    return this.http.post(this.url + '/animal', params, { headers: headers });
  }

  getAnimals(): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.get(this.url + '/animals', { headers: headers });
  }

  getAnimal(id): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.get(this.url + '/animal/' + id, { headers: headers });
  }

  editAnimal(token: string, id: string, animal: Animal): Observable<any> {
    let params = JSON.stringify(animal);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token
    });
    return this.http.put(this.url + '/animal/' + id, params, { headers: headers });
  }

  deleteAnimal(token: string, id: string): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token
    });
    return this.http.delete(this.url + '/animal/' + id, { headers: headers });
  }

}
