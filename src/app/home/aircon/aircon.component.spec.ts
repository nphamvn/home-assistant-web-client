import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirconComponent } from './aircon.component';

describe('AirconComponent', () => {
  let component: AirconComponent;
  let fixture: ComponentFixture<AirconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AirconComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AirconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
