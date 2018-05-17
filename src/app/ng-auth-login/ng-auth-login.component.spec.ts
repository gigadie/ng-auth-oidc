import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgAuthLoginComponent } from './ng-auth-login.component';

describe('NgAuthLoginComponent', () => {
  let component: NgAuthLoginComponent;
  let fixture: ComponentFixture<NgAuthLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgAuthLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgAuthLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
