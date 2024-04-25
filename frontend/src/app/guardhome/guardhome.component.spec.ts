import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuardhomeComponent } from './guardhome.component';

describe('GuardhomeComponent', () => {
  let component: GuardhomeComponent;
  let fixture: ComponentFixture<GuardhomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GuardhomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GuardhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
