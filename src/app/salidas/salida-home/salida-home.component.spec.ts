import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalidaHomeComponent } from './salida-home.component';

describe('SalidaHomeComponent', () => {
  let component: SalidaHomeComponent;
  let fixture: ComponentFixture<SalidaHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SalidaHomeComponent]
    });
    fixture = TestBed.createComponent(SalidaHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
