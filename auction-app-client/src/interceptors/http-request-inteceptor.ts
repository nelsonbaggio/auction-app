import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';

export class HttpRequestInterceptor implements HttpInterceptor {

    private URL: string = "http://localhost:3000";

    constructor() {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler, ): Observable<HttpEvent<any>> {
        const user: { login: string, password: string } = JSON.parse(window.localStorage.getItem('user'));
        const token = btoa(`${user.login}:${user.password}`);
        console.log(`${this.URL}${req.url}`);
        const clone = req.clone({
            headers: req.headers.set('Authorization', `Basic ${token}`),
            url: `${this.URL}${req.url}`
        });
        return next.handle(clone);
    }

}