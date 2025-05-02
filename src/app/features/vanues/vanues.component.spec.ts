import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VanuesComponent } from './vanues.component';

describe('VanuesComponent', () => {
  let component: VanuesComponent;
  let fixture: ComponentFixture<VanuesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VanuesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VanuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
