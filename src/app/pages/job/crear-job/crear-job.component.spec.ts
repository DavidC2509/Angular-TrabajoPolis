import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearJobComponent } from './crear-job.component';

describe('CrearJobComponent', () => {
  let component: CrearJobComponent;
  let fixture: ComponentFixture<CrearJobComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearJobComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
