import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuItemsFormComponent } from './menu-items-form.component';

describe('MenuItemsFormComponent', () => {
  let component: MenuItemsFormComponent;
  let fixture: ComponentFixture<MenuItemsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuItemsFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuItemsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
