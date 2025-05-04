import { Component, signal, viewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';
import { Table } from 'primeng/table';
import { PageHeaderComponent } from '../../layout/page-header/page-header.component';
import { MOCK_MENU_ITEMS } from '../../mock/menu-items.mock';
import { IMenuItem } from '../../shared/models/menu-item.interface';
import { ITableCol } from '../../shared/models/table-col.interface';
import { MENU_ITEM_COLUMNS } from './menu-items.constats';
import { MenuItemTableComponent } from './menu-item-table/menu-item-table.component';
import { JsonPipe } from '@angular/common';
@Component({
  selector: 'app-menu-items',
  imports: [
    PageHeaderComponent,
    DrawerModule,
    ButtonModule,
    MenuItemTableComponent,
    JsonPipe,
  ],
  templateUrl: './menu-items.component.html',
  styleUrl: './menu-items.component.scss',
})
export class MenuItemsComponent {
  menuItems = signal<IMenuItem[]>(MOCK_MENU_ITEMS);
  menuItemsCols = signal<ITableCol[]>(MENU_ITEM_COLUMNS);
  isDarawerVisible = false;
  selectedRow = signal<IMenuItem | null>(null);

  setSelectedRow(data: any) {
    if (!data) {
      this.selectedRow.set(null);
      this.isDarawerVisible = false;
      return;
    }
    this.selectedRow.set(data as IMenuItem);
    this.isDarawerVisible = true;
  }
}
