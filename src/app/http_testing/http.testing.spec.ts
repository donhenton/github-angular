import { async, inject, TestBed, ComponentFixture } from '@angular/core/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpTestingController, HttpClientTestingModule, TestRequest } from '@angular/common/http/testing';
import { SuggestPageComponent } from '../pages/suggest-page/suggest-page.component';
import { ErrorService } from './../services/error.service';
import { GithubService } from './../services/github.service';
import { CommaPipe } from '../components/comma-pipe/comma.pipe';
import { TruncatePipe } from '../components/truncate-pipe/truncate.pipe';
import { ErrorDisplayComponent } from '../components/error-display/error-display.component';
import { GithubItemComponent } from '../components/github-item/github-item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from '../../environments/environment';
import { suggestions } from './../../../testing/testSuggestions';

// https://medium.com/spektrakel-blog/angular-testing-snippets-httpclient-d1dc2f035eb8
// https://codecraft.tv/courses/angular/unit-testing/asynchronous/

describe('Http Testing Samples', () => {
    let component: SuggestPageComponent;
    let fixture: ComponentFixture<SuggestPageComponent>;
    let errorServiceRef = null;
    let githubServiceRef = null;
    const URL_BASE = environment.githubAPIURL;

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            imports: [
                FormsModule,
                HttpClientModule,
                HttpClientTestingModule,
                ReactiveFormsModule,
                BrowserModule,
            ],
            providers: [GithubService, ErrorService],
            declarations:
                [SuggestPageComponent,
                    CommaPipe,
                    TruncatePipe,
                    ErrorDisplayComponent,
                    GithubItemComponent],
        }).compileComponents();

    }));


    beforeEach(() => {
        fixture = TestBed.createComponent(SuggestPageComponent);
        component = fixture.componentInstance;
        errorServiceRef = fixture.debugElement.injector.get(ErrorService);
        githubServiceRef = fixture.debugElement.injector.get(GithubService);
        fixture.detectChanges();
    });


    it(`should respond with fake data`,
        async(inject([HttpClient, HttpTestingController],
            (http: HttpClient, backend: HttpTestingController) => {

                ///////////////////////////////////////////
                http.get('/foo/bar').subscribe((next) => {
                    expect(next).toEqual({ baz: '123' });
                });

                backend.match({
                    url: '/foo/bar',
                    method: 'GET'
                })[0].flush({ baz: '123' });
                ///////////////////////////////////////////

            }
        ))

    );


// https://github.com/angular/angular/issues/19974
// must use a function for matching when only one parameter
// its a bug, Jim


    it(`should fake data for component`,
        async(inject([GithubService, HttpTestingController],
            (githubService: GithubService, backend: HttpTestingController) => {


                const t = JSON.parse(JSON.stringify(suggestions.suggestions[1]));
                t.created = new Date();
                const entry = { suggestions: [t] };
                component.suggestForm.patchValue({ suggestion: 'fred' });
                component.loading = false;

                ///////////////////////////////////////////

                component.formChange(null);
                backend.expectOne((req) => {

                    const mVal =   req.method === 'GET' && req.url === (URL_BASE + 'search/suggestion');
                    console.log(`match ${mVal} ${req.url}`)     ;
                   return mVal;
                })
                .flush(entry, { status: 200, statusText: 'Ok' });

                fixture.whenStable().then(() => {

                    fixture.detectChanges();
                    console.log('peforming expectation ');
                    expect(component.entries.length).toEqual(1);
                    expect(component.entries[0].name).toEqual('rome');

                });


                ///////////////////////////////////////////

            }
        ))

    );




});
