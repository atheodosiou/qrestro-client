import { Component, signal } from '@angular/core';
import { PageHeaderComponent } from '../../layout/page-header/page-header.component';
import { ITableCol } from '../../shared/models/table-col.interface';

@Component({
  selector: 'app-vanue',
  imports: [PageHeaderComponent],
  templateUrl: './vanue.component.html',
  styleUrl: './vanue.component.scss'
})
export class VanueComponent {
  headerActions = signal<{ label: string }[]>([
    { label: 'New Venue' }
  ])

  cols = signal<ITableCol[]>([
    { field: 'name', header: 'Name' },
    { field: 'slug', header: 'Slug' },
    { field: 'isActive', header: 'Status' },
    { field: 'createdAt', header: 'Created At' },
  ]);

  venues = signal<any[]>([
    {
      name: 'Central Bistro',
      slug: 'central-bistro',
      isActive: true,
      createdAt: '2025-04-12T10:30:00Z',
    },
    {
      name: 'Seaside Café',
      slug: 'seaside-cafe',
      isActive: false,
      createdAt: '2025-03-28T14:15:00Z',
    },
    {
      name: 'Mountain View Grill',
      slug: 'mountain-view-grill',
      isActive: true,
      createdAt: '2025-02-20T09:45:00Z',
    },
    {
      name: 'Urban Eatery',
      slug: 'urban-eatery',
      isActive: true,
      createdAt: '2025-01-15T12:00:00Z',
    },
    {
      name: 'Garden Delight',
      slug: 'garden-delight',
      isActive: false,
      createdAt: '2025-05-01T08:20:00Z',
    },
  ]);
}
