import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GithubItemComponent } from './github-item.component';
import { CommaPipe } from '../comma-pipe/comma.pipe';
import { GithubResult } from '../../services/github.interfaces';
import { SafeHtml } from '@angular/platform-browser';

describe('GithubItemComponent', () => {
  let component: GithubItemComponent;
  let fixture: ComponentFixture<GithubItemComponent>;
  let gResult: GithubResult ;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GithubItemComponent, CommaPipe, ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GithubItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });



  describe('DescriptionText Tests', () => {

    beforeEach(() => {
       gResult = new GithubResult();
       gResult.description = 'Geta job';
       gResult.highlightText = '<span>fred</span> gets a job';
    });





    it('test no sanitize', () => {
     const text: SafeHtml =  component.getDescriptionText(gResult);
     gResult.highlightText = null;
     text.toString();
       expect(text.toString()).toEqual(gResult.description);

    });

  });


});
