import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private apiUrl = 'https://api.github.com/users/Alessandra-Nastassja';

  constructor(private http: HttpClient) { }

  getHome(): Observable<any>{
    return this.http.get<{ url: string }>(this.apiUrl);
  }
}
