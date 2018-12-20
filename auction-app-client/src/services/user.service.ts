import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { User } from 'src/app/user/user';

@Injectable()
export class UserService {

    private URL: string = '/user';

    constructor(private http: HttpClient) {

    }

    getUser(id?: string) {
        if (id) {
            return this.http.get(`${this.URL}/${id}`);
        }
        return this.http.get(this.URL);
    }

    deleteUser(id: string): Observable<any> {
        return this.http.delete(`${this.URL}/${id}`);
    }

    saveUser(user: User) {
        return this.http.put(`${this.URL}`, user);
    }

}