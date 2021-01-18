import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaCityComponent } from './lista-city.component';

describe('ListaCityComponent', () => {
  let component: ListaCityComponent;
  let fixture: ComponentFixture<ListaCityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaCityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaCityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
