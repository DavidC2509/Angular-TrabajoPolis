import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearCityComponent } from './crear-city.component';

describe('CrearCityComponent', () => {
  let component: CrearCityComponent;
  let fixture: ComponentFixture<CrearCityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearCityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearCityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
