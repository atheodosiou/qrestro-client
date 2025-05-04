import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VanueComponent } from './vanue.component';

describe('VanuesComponent', () => {
  let component: VanueComponent;
  let fixture: ComponentFixture<VanueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VanueComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(VanueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
