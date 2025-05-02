import { Component, signal } from '@angular/core';
import { PageHeaderComponent } from '../../layout/page-header/page-header.component';

@Component({
  selector: 'app-menu-sections',
  imports: [PageHeaderComponent],
  templateUrl: './menu-sections.component.html',
  styleUrl: './menu-sections.component.scss'
})
export class MenuSectionsComponent {
  venues = signal<any[]>([]);
  headerActions = signal<{ label: string }[]>([
    { label: 'New Section' }
  ])
}
