import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageRefereeComponent } from './manage-referee.component';

describe('ManageRefereeComponent', () => {
  let component: ManageRefereeComponent;
  let fixture: ComponentFixture<ManageRefereeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageRefereeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageRefereeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
