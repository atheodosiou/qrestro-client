import { Component, signal } from '@angular/core';
import { PageHeaderComponent } from '../../layout/page-header/page-header.component';

@Component({
  selector: 'app-theme',
  imports: [PageHeaderComponent],
  templateUrl: './theme.component.html',
  styleUrl: './theme.component.scss'
})
export class ThemeComponent {
  venues = signal<any[]>([]);
}
