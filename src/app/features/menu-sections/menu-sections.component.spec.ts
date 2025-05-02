import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuSectionsComponent } from './menu-sections.component';

describe('MenuSectionsComponent', () => {
  let component: MenuSectionsComponent;
  let fixture: ComponentFixture<MenuSectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuSectionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuSectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
