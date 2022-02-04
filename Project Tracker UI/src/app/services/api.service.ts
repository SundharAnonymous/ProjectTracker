import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { EnvironmentUrlService } from './environment-url.service';
import { Observable, throwError } from 'rxjs';
import { retry } from 'rxjs/operators';
import { IServerResponse } from '../model/server-response.model';

export interface IApiService {
    get(path: string, params?: HttpParams): Observable<any>;
    put(path: string, body: Object): Observable<any>;
    excelDownload(path: string, body: Object): Observable<HttpResponse<Blob>>;
    post(path: string, body: Object): Observable<any>;
    delete(path: string): Observable<any>;
}

@Injectable()
export class ApiService implements IApiService {

    constructor(
        private http: HttpClient,
        private envUrl: EnvironmentUrlService

    ) { }

    private formatErrors(error: any) {
        return throwError(error.error);
    }

    public get<T>(path = '', params = new HttpParams()): Observable<IServerResponse<T>> {
        return this.http
            .get<IServerResponse<T>>(`${this.envUrl.baseUrl}${path}`, {
                params: params,
                headers: this.generateHeaders().headers
            })
            .pipe(retry(1));
    }

    // public getSap<T>(path = '', params = new HttpParams()): Observable<IServerResponse<T>> {
    //     return this.http
    //         .get<IServerResponse<T>>(`${this.envUrl.baseSapUrl}${path}`, {
    //             params: params,
    //             headers: this.generateHeaders().headers
    //         })
    //         .pipe(retry(1));
    // }
   
    public put<T>(path = '', body = {}): Observable<IServerResponse<T>> {
        debugger
        return this.http
            .put<IServerResponse<T>>(`${this.envUrl.baseUrl}${path}`,
                JSON.stringify(body),
                this.generateHeaders())
            .pipe(retry(1));
    }

    public deletebyid(path = '',id:any){
        return this.http.delete(`${this.envUrl.baseUrl}${path}`, {
          params: id})
        .pipe(retry(3));
    }

    public getbyid(path = '',id:any){
        return this.http.get(`${this.envUrl.baseUrl}${path}`, {
            params: id})
            .pipe(retry(3));
    }

    public getPOByprojectID<T>(path = '', params = new HttpParams()): Observable<IServerResponse<T>> {
        return this.http
            .get<IServerResponse<T>>(`${this.envUrl.baseUrl}${path}`, {
                params: params,
                headers: this.generateHeaders().headers
            })
            .pipe(retry(1));
    }
    
    
    // public post<T>(path = '', body = {}): Observable<IServerResponse<T>> {
    //  debugger;
    //  var headers=   {
    //         headers: new HttpHeaders({
    //             'Content-Type': 'application/json',
    //             'Accept': 'application/json',
    //             // 'Access-Control-Allow-Methods': '*',
    //             // 'Access-Control-Allow-Origin': '*',
    //             // 'timeout': '30000',
    //         })
    //     };

    //     return this.http
    //         .post<IServerResponse<T>>(`${this.envUrl.baseUrl}${path}`,
    //             body,
    //             headers,
    //             )
    //         .pipe(retry(1));
    // }

    
        public post<T>(path = '', body = {}): Observable<IServerResponse<T>> {  
              return this.http.post<IServerResponse<T>>(`${this.envUrl.baseUrl}${path}`,body,{    
       headers: this.getHeaders(),params: body }) .pipe(retry(1));    }   
        private getHeaders(): HttpHeaders {return new HttpHeaders({        'Content-Type': 'application/json',        'Accept': 'application/json',        });        }
    
    



    public excelDownload(path = '', body = {}): Observable<HttpResponse<Blob>> {
        return this.http
            .post(`${this.envUrl.baseUrl}${path}`,
                JSON.stringify(body),                
                { observe: 'response', responseType: 'blob', headers: this.generateHeaders().headers }
            )
            .pipe(retry(1));
    }

    public pdfGenerate<T>(path = '', body = {}): Observable<IServerResponse<T>> {
        return this.http
            .post<IServerResponse<T>>(`${this.envUrl.baseUrl}${path}`,body,
            //JSON.stringify("atul"),
                this.generateHeaders())
            .pipe(retry(1));
    }

    public delete<T>(path = ''): Observable<IServerResponse<T>> {
        return this.http
            .delete<IServerResponse<T>>(`${this.envUrl.baseUrl}${path}`)
            .pipe(retry(3));
    }

    public options<T>(path = ''): Observable<IServerResponse<T>> {
        return this.http
            .options<IServerResponse<T>>(`${this.envUrl.baseUrl}${path}`)
            .pipe(retry(3));
    }
    private generateHeaders() {
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Methods': '*',
                'Access-Control-Allow-Origin': '*' 
            })
        };
    }

    public pdfDownload(path = ''): Promise<Blob> {
        var file=  this.http
            .get<Blob>(`${this.envUrl.baseUrl}${path}`,
                { responseType: 'blob' as 'json'}
            ).toPromise();
            return file;
     }
    //  public getSignalRAPI<T>(path = '', params = new HttpParams()): Observable<T> {
    //     return this.http
    //         .get<T>(`${this.envUrl.signalRUrl}${path}`, {
    //             params: params,
    //             headers: this.generateHeaders().headers
    //         })
    //         .pipe(retry(1));
    // }

}

