import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { HomeComponent } from './home-page.component';
import {RouterTestingModule} from '@angular/router/testing';
// import {Router} from '@angular/router';
// import routes from './../../../../testing/testRoutes';



describe('HomeComponent', () => {

  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
          HomeComponent
      ],
      imports: [

      ]
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

