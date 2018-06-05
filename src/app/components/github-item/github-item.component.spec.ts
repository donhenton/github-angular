import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GithubItemComponent } from './github-item.component';
import { CommaPipe } from '../comma-pipe/comma.pipe';

describe('GithubItemComponent', () => {
  let component: GithubItemComponent;
  let fixture: ComponentFixture<GithubItemComponent>;

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
});
