import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGuardComponent } from './add-guard.component';

describe('AddGuardComponent', () => {
  let component: AddGuardComponent;
  let fixture: ComponentFixture<AddGuardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddGuardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddGuardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
