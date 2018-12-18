import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewRefereeComponent } from './new-referee.component';

describe('NewRefereeComponent', () => {
  let component: NewRefereeComponent;
  let fixture: ComponentFixture<NewRefereeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewRefereeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewRefereeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
