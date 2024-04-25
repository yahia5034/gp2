import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Guardhome2Component } from './guardhome2.component';

describe('Guardhome2Component', () => {
  let component: Guardhome2Component;
  let fixture: ComponentFixture<Guardhome2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Guardhome2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Guardhome2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
