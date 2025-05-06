import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';
import { PageHeaderComponent } from '../../layout/page-header/page-header.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FileUploadEvent, FileUploadModule } from 'primeng/fileupload';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { IMenuItem } from '../../shared/models/menu-item.interface';
import { ITableCol } from '../../shared/models/table-col.interface';
import { MenuItemTableComponent } from './menu-item-table/menu-item-table.component';
import { MenuItemsFormComponent } from './menu-items-form/menu-items-form.component';
import { MENU_ITEM_COLUMNS } from './menu-items.constats';
import { MenuItemsService } from './menu-items.service';
import { ConfirmationService, MessageService } from 'primeng/api';
@Component({
  selector: 'app-menu-items',
  imports: [
    PageHeaderComponent,
    DrawerModule,
    ButtonModule,
    MenuItemTableComponent,
    InputTextModule,
    InputNumberModule,
    ToggleButtonModule,
    FileUploadModule,
    MenuItemsFormComponent,
  ],
  templateUrl: './menu-items.component.html',
  styleUrl: './menu-items.component.scss',
})
export class MenuItemsComponent implements OnInit {
  private readonly menuItemService = inject(MenuItemsService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly confirmationService = inject(ConfirmationService);
  private readonly messageService = inject(MessageService);

  menuItems = signal<IMenuItem[]>([]);
  menuItemsCols = signal<ITableCol[]>(MENU_ITEM_COLUMNS);
  selectedRow = signal<IMenuItem | null>(null);
  isEditMode = signal<boolean>(false);

  isDarawerVisible = signal(false);
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
    this.isDarawerVisible.set(true);
  }

  editRow(data: IMenuItem) {
    this.isEditMode.set(true);
    this.selectedRow.set(data);
    this.isDarawerVisible.set(true);
  }

  deleteRow(data: IMenuItem) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this menu item?',
      header: 'Confirmation',
      closable: true,
      closeOnEscape: true,
      icon: 'pi pi-exclamation-triangle',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Delete',
        severity: 'danger',
      },
      accept: () => {
        this.menuItemService
          .deleteItem(this.selectedRow()?._id!)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe({
            next: (result) => {
              console.log(result);
              const deletedId = this.selectedRow()?._id;
              const updatedItems = this.menuItems().filter(
                (item) => item._id !== deletedId
              );
              this.menuItems.set(updatedItems);
              this.messageService.add({
                severity: 'info',
                summary: 'Confirmed',
                detail: 'Menu item deleted successfully',
              });
            },
            error: (e) => {
              this.selectedRow.set(null);
              this.messageService.add({
                severity: 'error',
                summary: 'Failed',
                detail: 'Failed to delete menu item',
                life: 3000,
              });
            },
            complete: () => {
              this.selectedRow.set(null);
            },
          });
      },
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Rejected',
          detail: 'You have rejected',
          life: 3000,
        });
      },
    });
    this.isEditMode.set(false);
    this.selectedRow.set(data);
  }

  private loadMenuItems(): void {
    this.menuItemService.getItems().subscribe({
      next: (items) => this.menuItems.set(items),
      error: (err) => console.error('Failed to load menu items', err),
    });
  }

  handleSubmit(event: { isEdit: boolean; data: Partial<IMenuItem> }) {
    if (event.isEdit) {
      this.updateItem(event.data);
    } else {
      this.createItem(event.data);
    }
  }

  dismiss() {
    this.selectedRow.set(null);
    this.isDarawerVisible.set(false);
  }

  private createItem(data: Partial<IMenuItem>) {
    this.menuItemService
      .createItem(data)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (newItem) => {
          this.menuItems.set([...this.menuItems(), newItem]);
          this.messageService.add({
            severity: 'info',
            summary: 'Confirmed',
            detail: 'Menu item created successfully',
          });
        },
        error: (e) => {
          console.log(e);
          this.messageService.add({
            severity: 'error',
            summary: 'Failed',
            detail: 'Failed to create menu item',
            life: 3000,
          });
        },
        complete: () => {
          this.selectedRow.set(null);
          this.isDarawerVisible.set(false);
        },
      });
  }

  private updateItem(data: Partial<IMenuItem>) {
    const { _id, createdAt, updatedAt, __v, ...dto } = data;
    this.menuItemService
      .updateItem(this.selectedRow()?._id!, dto)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (updatedItem) => {
          // Replace the old item in the list
          const updatedList = this.menuItems().map((item) =>
            item._id === updatedItem._id ? updatedItem : item
          );
          this.menuItems.set(updatedList);
          this.messageService.add({
            severity: 'info',
            summary: 'Confirmed',
            detail: 'Menu item updated successfully',
          });
        },
        error: (e) => {
          console.log(e);
          this.messageService.add({
            severity: 'error',
            summary: 'Failed',
            detail: 'Failed to update menu item',
            life: 3000,
          });
        },
        complete: () => {
          this.selectedRow.set(null);
          this.isDarawerVisible.set(false);
        },
      });
  }
}
