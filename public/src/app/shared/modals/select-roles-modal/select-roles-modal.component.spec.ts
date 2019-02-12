import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectRolesModalComponent } from './select-roles-modal.component';

describe('SelectRolesModalComponent', () => {
  let component: SelectRolesModalComponent;
  let fixture: ComponentFixture<SelectRolesModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectRolesModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectRolesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
