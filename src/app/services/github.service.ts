import { Injectable, SecurityContext } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEvent, HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/mergeMap'; // this puts mergeMap onto observable
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs/Rx'; // NOT from 'rxjs/Rx/Observable
import { GithubPage, GithubResult } from './github.interfaces';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Injectable()
export class GithubService implements Resolve<any> {


  private readonly URL_BASE = environment.githubAPIURL; // search/entries/dates
  constructor(private _http: HttpClient, private sanitizer: DomSanitizer) {


  }

  private cleanUp(text) {
      return encodeURIComponent(this.sanitizer.sanitize(SecurityContext.HTML, text));
    // return new DOMParser().parseFromString(text, 'text/html').documentElement.textContent; this takes &gt; to '>'
  }


  public getEntriesByDate(start, end, pageOffset): Observable<GithubPage> {

    const me = this;
    const httpParams = new HttpParams()
        .set('start', start)
        .set('end', end)
        .set('pageOffset', pageOffset);


    return this._http.get<GithubPage>(this.URL_BASE + 'search/entries/dates' , this.createRequestOpts(httpParams));


  }

  public getDescriptionSearch(searchTerm: string, pageOffset ): Observable<GithubPage> {
    const httpParams = new HttpParams()
    .set('searchTerm', searchTerm)
    .set('pageOffset', pageOffset);

    return this._http.get<GithubPage>(this.URL_BASE + 'search/description' , this.createRequestOpts(httpParams));

  }

  // http://localhost:9000/github/search/entries/topics?topics=java&pageOffset=0
  public getEntriesByTerms(param, queryType, pageOffset) {
    param = this.cleanUp(param);
    const me = this;
    const urlString = this.URL_BASE + 'search/entries/' + queryType;
    const httpParams = new HttpParams()
    .set(queryType, param)
    .set('pageOffset', pageOffset);


    return this._http.get(urlString , this.createRequestOpts(httpParams));
  }

  public getTermsData(): Observable<any> {

    return this._http.get <any>(this.URL_BASE + 'search/uniqueterms', this.createRequestOpts());
  }


  public getSuggestion(suggestion): Observable<any> {
    const me = this;
    suggestion = this.cleanUp(suggestion);
    const urlString = this.URL_BASE + 'search/suggestion';
    const httpParams = new HttpParams()
    .set('entryText', suggestion);

    return this._http.get(urlString, this.createRequestOpts(httpParams));
  }


  public getGraphData(): Observable<{}> {
    const urlBase = this.URL_BASE + 'search/field/histogram'; // forks or stars
    const httpParamsForks = new HttpParams()
    .set('field', 'forks');
    const httpParamsStars = new HttpParams()
    .set('field', 'stars');
    const forksQuery = this._http.get(urlBase , this.createRequestOpts(httpParamsForks));
    const starsQuery = this._http.get(urlBase , this.createRequestOpts(httpParamsStars));

    const keys = ['forks', 'stars'];
    return Observable.forkJoin(forksQuery, starsQuery )
     .map((e)  => {
          const newStuff = {};

          for (let k = 0; k < 2; k++) {

            const bucketData = e[k]['bucketData'];
            const graphData = {};
            graphData['key'] = keys[k] + ' Graph';
            graphData['values'] = bucketData.map(b => {
              return {label: b.interval , value: b.count};
            });



           // newStuff[keys[k]] = e[k]['bucketData'];
            newStuff[keys[k]] = graphData;

          }

          return newStuff;
     });


  }

  private createRequestOpts(params= new HttpParams()):   {headers: HttpHeaders, params: HttpParams} {
    const headers = new HttpHeaders({
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS',
      'Access-Control-Allow-Origin': '*'
    });
    const ret = { headers: headers, params: params };
    return   ret;
  }



  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {

    const dataType: string = route.data['dataType']; // read passed in parameter and use it in an if statement
    // for multiple page resolves;
    // return Observable.of({});
    console.log(`datatype ${dataType}`);
    switch (dataType) {
      case 'terms':
        return this.getTermsData();
      case 'graph':
        return this.getGraphData();
      default:
    }



  }
}
