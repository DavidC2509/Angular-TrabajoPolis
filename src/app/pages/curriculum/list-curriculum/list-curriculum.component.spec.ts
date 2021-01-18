import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCurriculumComponent } from './list-curriculum.component';

describe('ListCurriculumComponent', () => {
  let component: ListCurriculumComponent;
  let fixture: ComponentFixture<ListCurriculumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCurriculumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCurriculumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
