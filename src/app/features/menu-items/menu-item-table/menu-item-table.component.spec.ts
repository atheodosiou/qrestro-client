import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuItemTableComponent } from './menu-item-table.component';

describe('MenuItemTableComponent', () => {
  let component: MenuItemTableComponent;
  let fixture: ComponentFixture<MenuItemTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuItemTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuItemTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
