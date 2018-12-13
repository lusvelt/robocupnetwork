import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageRunComponent } from './manage-run.component';

describe('ManageRunComponent', () => {
  let component: ManageRunComponent;
  let fixture: ComponentFixture<ManageRunComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageRunComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageRunComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
