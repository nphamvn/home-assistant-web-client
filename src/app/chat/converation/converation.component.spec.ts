import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConverationComponent } from './converation.component';

describe('ConverationComponent', () => {
  let component: ConverationComponent;
  let fixture: ComponentFixture<ConverationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConverationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConverationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
