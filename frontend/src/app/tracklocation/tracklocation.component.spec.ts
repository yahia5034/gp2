import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TracklocationComponent } from './tracklocation.component';

describe('TracklocationComponent', () => {
  let component: TracklocationComponent;
  let fixture: ComponentFixture<TracklocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TracklocationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TracklocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
