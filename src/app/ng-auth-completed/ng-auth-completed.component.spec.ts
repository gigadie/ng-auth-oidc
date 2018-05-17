import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgAuthCompletedComponent } from './ng-auth-completed.component';

describe('NgAuthCompletedComponent', () => {
  let component: NgAuthCompletedComponent;
  let fixture: ComponentFixture<NgAuthCompletedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgAuthCompletedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgAuthCompletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
