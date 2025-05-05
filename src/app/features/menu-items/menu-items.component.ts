import { Component, OnInit, inject, signal, viewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';
import { Table } from 'primeng/table';
import { PageHeaderComponent } from '../../layout/page-header/page-header.component';
// import { MOCK_MENU_ITEMS } from '../../mock/menu-items.mock';
import { IMenuItem } from '../../shared/models/menu-item.interface';
import { ITableCol } from '../../shared/models/table-col.interface';
import { MENU_ITEM_COLUMNS } from './menu-items.constats';
import { MenuItemTableComponent } from './menu-item-table/menu-item-table.component';
import { JsonPipe } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { FileUploadEvent, FileUploadModule } from 'primeng/fileupload';
import { MenuItemsService } from './menu-items.service';

@Component({
  selector: 'app-menu-items',
  imports: [
    PageHeaderComponent,
    DrawerModule,
    ButtonModule,
    MenuItemTableComponent,
    JsonPipe,
    InputTextModule,
    InputNumberModule,
    ToggleButtonModule,
    FileUploadModule,
  ],
  templateUrl: './menu-items.component.html',
  styleUrl: './menu-items.component.scss',
})
export class MenuItemsComponent implements OnInit {
  private readonly menuItemService = inject(MenuItemsService);
  menuItems = signal<IMenuItem[]>([]);
  menuItemsCols = signal<ITableCol[]>(MENU_ITEM_COLUMNS);
  selectedRow = signal<IMenuItem | null>(null);
  isEditMode = signal<boolean>(false);

  isDarawerVisible = false;
  uploadedFiles: any[] = [];

  ngOnInit(): void {
    this.loadMenuItems();
  }

  onUpload(event: FileUploadEvent) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }

    // this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
  }

  addNewItem() {
    this.isEditMode.set(false);
    this.isDarawerVisible = true;
  }

  editRow(data: IMenuItem) {
    this.isEditMode.set(true);
    this.selectedRow.set(data);
    this.isDarawerVisible = true;
  }

  deleteRow(data: IMenuItem) {
    this.isEditMode.set(false);
    this.selectedRow.set(data);
  }

  private loadMenuItems(): void {
    this.menuItemService.getItems().subscribe({
      next: (items) => this.menuItems.set(items),
      error: (err) => console.error('Failed to load menu items', err),
    });
  }
}
