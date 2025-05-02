import { Component, signal } from '@angular/core';
import { PageHeaderComponent } from '../../layout/page-header/page-header.component';

@Component({
  selector: 'app-vanues',
  imports: [PageHeaderComponent],
  templateUrl: './vanues.component.html',
  styleUrl: './vanues.component.scss'
})
export class VanuesComponent {
  venues = signal<any[]>([]);
  headerActions = signal<{ label: string }[]>([
    { label: 'New Venue' }
  ])
}
