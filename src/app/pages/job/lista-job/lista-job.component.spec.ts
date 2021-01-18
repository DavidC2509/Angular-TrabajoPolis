import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaJobComponent } from './lista-job.component';

describe('ListaJobComponent', () => {
  let component: ListaJobComponent;
  let fixture: ComponentFixture<ListaJobComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaJobComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
