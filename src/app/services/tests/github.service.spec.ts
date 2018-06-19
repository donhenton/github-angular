import { ErrorService } from './../error.service';
import { ApiError, ErrorPayload, GithubPage, GithubResult } from '../github.interfaces';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { GithubService } from '../github.service';
import { TestBed, async, inject } from '@angular/core/testing';
import { environment } from '../../../environments/environment';
import { suggestions } from './../../../../testing/testSuggestions';
import { BrowserModule } from '@angular/platform-browser';
import { ActivatedRouteSnapshot } from '@angular/router';

const URL_BASE = environment.githubAPIURL;
let githubService: GithubService;

describe('GithubService Tests', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [

                HttpClientModule,
                HttpClientTestingModule,
                BrowserModule,

            ],
            providers: [GithubService]

        });

    }));

    beforeEach(inject([GithubService], s => {
        githubService = s;
    }));

    it(`testGetEntriesByDate`,
        async(inject([HttpTestingController],
            (backend: HttpTestingController) => {

                const retPage = new GithubPage();
                retPage.totalCount = 1000;


                ///////////////////////////////////////////

                const start = '2011-01-01';
                const end = '2014-01-01';
                const pageOffset = 12;
                const queryString = `?start=${start}&end=${end}&pageOffset=${pageOffset}`;
                const stringMatch = URL_BASE + '/search/entries/dates' + queryString;

                githubService.getEntriesByDate(start, end, pageOffset).subscribe(data => {

                    expect(data.totalCount).toEqual(1000);

                });

                // prep the backend
                backend.expectOne(stringMatch).flush(retPage, { status: 200, statusText: 'Ok' });



            }
        ))

    );


    it(`testGraphData`,
        async(inject([HttpTestingController],
            (backend: HttpTestingController) => {

                const retDataForks = {
                    'bucketData': [
                        {
                            'count': 100,
                            'interval': '0.00'
                        },
                        {
                            'count': 200,
                            'interval': '0.20'
                        },
                    ],
                    'totalHits': 2
                };

                const retDataStars = {
                    'bucketData': [
                        {
                            'count': 5,
                            'interval': '0.00'
                        },
                        {
                            'count': 19,
                            'interval': '0.20'
                        },
                    ],
                    'totalHits': 2
                };

                ///////////////////////////////////////////

                const start = '2011-01-01';
                const end = '2014-01-01';
                const pageOffset = 12;
                const stringMatchForks = URL_BASE + '/search/field/histogram?field=forks';
                const stringMatchStars = URL_BASE + '/search/field/histogram?field=stars';

                githubService.getGraphData().subscribe(data => {

                    // console.log(JSON.stringify(data));
                    const starData = data['stars'].values;
                    expect(starData.length).toEqual(2);


                });

                // prep the backend
                backend.expectOne(stringMatchForks).flush(retDataForks, { status: 200, statusText: 'Ok' });
                backend.expectOne(stringMatchStars).flush(retDataStars, { status: 200, statusText: 'Ok' });



            }
        ))

    );



    it(`testResolve for terms`,
        async(inject([HttpTestingController],
            (backend: HttpTestingController) => {

                const aS: ActivatedRouteSnapshot = new ActivatedRouteSnapshot();
                aS.data = { dataType: 'terms' };

                githubService.resolve(aS, null).subscribe(data => {

                    expect(githubService.getTermsData).toHaveBeenCalled();


                });

            }
        ))

    );
    it(`testResolve for graph`,
        async(inject([HttpTestingController],
            (backend: HttpTestingController) => {

                const aS: ActivatedRouteSnapshot = new ActivatedRouteSnapshot();
                aS.data = { dataType: 'graph' };

                githubService.resolve(aS, null).subscribe(data => {

                    expect(githubService.getGraphData).toHaveBeenCalled();


                });

            }
        ))

    );

    it(`testGetEntriesByTerms`,
    async(inject([HttpTestingController],
        (backend: HttpTestingController) => {
            const queryType = 'topics';
            const param = 'java';
            const pageOffset = 0;
            const urlString =  URL_BASE + '/search/entries/' + queryType;
            const queryString = `?${queryType}=${param}&pageOffset=${pageOffset}`;
            const stringMatch = urlString + queryString;
            const retData = {'fred': 100};

            githubService.getEntriesByTerms(param, queryType, pageOffset).subscribe(data => {

                expect(data['fred']).toEqual(100);


            });

            backend.expectOne(stringMatch).flush(retData, { status: 200, statusText: 'Ok' });

        }
    ))

);




});
