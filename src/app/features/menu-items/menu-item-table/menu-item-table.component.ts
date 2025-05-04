import { NgStyle, NgClass, CurrencyPipe } from '@angular/common';
import { Component, input, output, signal, viewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { Table, TableModule } from 'primeng/table';
import { ITableCol } from '../../../shared/models/table-col.interface';
import { IMenuItem } from '../../../shared/models/menu-item.interface';

@Component({
  selector: 'app-menu-item-table',
  imports: [
    ButtonModule,
    TableModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    NgStyle,
    NgClass,
    CurrencyPipe,
  ],
  templateUrl: './menu-item-table.component.html',
  styleUrl: './menu-item-table.component.scss',
})
export class MenuItemTableComponent {
  cols = input.required<ITableCol[]>();
  items = input.required<IMenuItem[]>();
  editRow = output<IMenuItem>();
  deleteRow = output<IMenuItem>();

  table = viewChild<Table>('dt');
  filtering = signal<boolean>(false);

  globalSearch(event: any) {
    const filter = event.target?.value;
    this.table()?.filterGlobal(filter, 'contains');
    this.filtering.set(filter ? true : false);
  }
}
