import { Component, signal, viewChild } from '@angular/core';
import { PageHeaderComponent } from '../../layout/page-header/page-header.component';
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
import { MenuItem } from 'primeng/api';
import { IMenuItem } from '../../shared/models/menu-item.interface';
import { MOCK_MENU_ITEMS } from '../../mock/menu-items.mock';
import { ITableCol } from '../../shared/models/table-col.interface';
import { MENU_ITEM_COLUMNS } from './menu-items.constats';
import { Table, TableModule } from 'primeng/table';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { NgStyle } from '@angular/common';
@Component({
  selector: 'app-menu-items',
  imports: [PageHeaderComponent, DrawerModule, ButtonModule, TableModule, IconFieldModule, InputIconModule, InputTextModule, NgStyle],
  templateUrl: './menu-items.component.html',
  styleUrl: './menu-items.component.scss'
})
export class MenuItemsComponent {
  menuItems = signal<IMenuItem[]>(MOCK_MENU_ITEMS);
  menuItemsCols = signal<ITableCol[]>(MENU_ITEM_COLUMNS);
  isDarawerVisible = false;

  table = viewChild<Table>('dt')

  globalSearch(event: any) {
    this.table()?.filterGlobal(event.target?.value, 'contains')
  }
}
