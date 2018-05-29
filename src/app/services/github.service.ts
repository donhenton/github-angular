import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/mergeMap'; // this puts mergeMap onto observable
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs/Rx'; // NOT from 'rxjs/Rx/Observable
import { GithubPage, GithubResult } from './github.interfaces';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';


@Injectable()
export class GithubService {


  private readonly URL_BASE = environment.githubAPIURL; // search/entries/dates
  constructor(private _http: Http) {


   }


  public getEntriesByDate(start, end, pageOffset): Observable<GithubPage> {

    const me = this;
    const queryString = `?start=${start}&end=${end}&pageOffset=${pageOffset}`;
    return this._http.get(this.URL_BASE + '/search/entries/dates' + queryString, this.createRequestOpts())
      .map(res => res.json());

  }

  private createRequestOpts(): RequestOptions {
    const headers = new Headers();
    headers.append('Access-Control-Allow-Headers', 'Content-Type');
    headers.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    headers.append('Access-Control-Allow-Origin', '*');
    return new RequestOptions({ headers: headers });
  }
}
