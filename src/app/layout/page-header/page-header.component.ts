import { Component, input } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-page-header',
  imports: [ButtonModule],
  templateUrl: './page-header.component.html',
  styleUrl: './page-header.component.scss'
})
export class PageHeaderComponent {
  title = input.required<string>();
}
