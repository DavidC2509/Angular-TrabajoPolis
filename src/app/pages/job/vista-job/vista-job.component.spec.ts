import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaJobComponent } from './vista-job.component';

describe('VistaJobComponent', () => {
  let component: VistaJobComponent;
  let fixture: ComponentFixture<VistaJobComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VistaJobComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VistaJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
