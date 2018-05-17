import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgAuthSignoutComponent } from './ng-auth-signout.component';

describe('NgAuthSignoutComponent', () => {
  let component: NgAuthSignoutComponent;
  let fixture: ComponentFixture<NgAuthSignoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgAuthSignoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgAuthSignoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
