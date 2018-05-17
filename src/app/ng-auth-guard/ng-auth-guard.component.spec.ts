import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgAuthGuardComponent } from './ng-auth-guard.component';

describe('NgAuthGuardComponent', () => {
  let component: NgAuthGuardComponent;
  let fixture: ComponentFixture<NgAuthGuardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgAuthGuardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgAuthGuardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
