import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantsSummaryCardComponent } from './tenants-summary-card.component';

describe('TenantsSummaryCardComponent', () => {
  let component: TenantsSummaryCardComponent;
  let fixture: ComponentFixture<TenantsSummaryCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TenantsSummaryCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TenantsSummaryCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
