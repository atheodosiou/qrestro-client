import { Component, signal } from '@angular/core';
import { PageHeaderComponent } from '../../layout/page-header/page-header.component';

@Component({
  selector: 'app-menu-items',
  imports: [PageHeaderComponent],
  templateUrl: './menu-items.component.html',
  styleUrl: './menu-items.component.scss'
})
export class MenuItemsComponent {
  venues = signal<any[]>([]);
  headerActions = signal<{ label: string }[]>([
    { label: 'New Item' }
  ])
}
