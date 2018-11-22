import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCompetitionComponent } from './new-competition.component';

describe('NewCompetitionComponent', () => {
  let component: NewCompetitionComponent;
  let fixture: ComponentFixture<NewCompetitionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewCompetitionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCompetitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
