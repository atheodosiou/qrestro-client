import {
  Component,
  DestroyRef,
  computed,
  effect,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FileUploadEvent, FileUploadModule } from 'primeng/fileupload';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { IMenuItem } from '../../../shared/models/menu-item.interface';
import { ConfirmationService, MessageService } from 'primeng/api';
import { UploadService } from '../../../core/services/upload.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-menu-items-form',
  imports: [
    ButtonModule,
    InputTextModule,
    InputNumberModule,
    ToggleButtonModule,
    FileUploadModule,
    ReactiveFormsModule,
  ],
  templateUrl: './menu-items-form.component.html',
  styleUrl: './menu-items-form.component.scss',
})
export class MenuItemsFormComponent {
  private fb = inject(FormBuilder);
  readonly item = input<IMenuItem | null>(null);
  readonly formSubmit = output<{ isEdit: boolean; data: Partial<IMenuItem> }>();
  readonly dismiss = output<void>();
  readonly isEditMode = computed(() => !!this.item());
  readonly messageService = inject(MessageService);
  readonly confirmationService = inject(ConfirmationService);
  private readonly uploadService = inject(UploadService);
  private readonly destroyRef = inject(DestroyRef);

  uploadedImageUrl = signal<string | null>(null);
  uploadedFiles = signal<File[]>([]);
  form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    price: [0, Validators.required],
    isGlobal: [true],
    isAvailable: [true],
    imageUrl: [null as string | null],
  });

  constructor() {
    effect(() => {
      const item = this.item();
      if (item) {
        this.form.patchValue({
          name: item.name,
          description: item.description,
          price: item.price,
          isAvailable: item.isAvailable,
          imageUrl: item.imageUrl,
        });
      }
    });
  }

  onUpload(event: FileUploadEvent) {
    const files: File[] = event.files;
    this.uploadedFiles.set(files);
    const uploadedImageUrl = (event.originalEvent as any).body.url;
    this.uploadedImageUrl.set(uploadedImageUrl);
    this.messageService.add({
      severity: 'success',
      summary: 'Upload',
      detail: 'Image uploaded successfully',
    });
    this.form.patchValue({ imageUrl: uploadedImageUrl });
  }

  submit() {
    if (this.form.valid) {
      const result: Partial<IMenuItem> = {
        ...this.item(),
        ...this.form.getRawValue(),
      };

      this.formSubmit.emit({ isEdit: this.isEditMode(), data: result });
      this.form.reset();
      this.uploadedFiles.set([]);
    } else {
      console.log('invalid form', this.form.value);
    }
  }

  cancel() {
    if (!this.uploadedImageUrl()) {
      this.form.reset();
      this.dismiss.emit();
      this.uploadedFiles.set([]);
    } else {
      this.confirmationService.confirm({
        message:
          'Are you sure that you want to stop the prccess and delete the uploaded image?',
        header: 'Confirmation',
        closable: false,
        closeOnEscape: false,
        icon: 'pi pi-exclamation-triangle',
        rejectButtonProps: {
          label: 'Cancel',
          severity: 'danger',
          outlined: true,
        },
        acceptButtonProps: {
          label: 'Delete',
        },
        accept: () => {
          const imageUrl = this.uploadedImageUrl()?.split('/uploads/')[1];
          this.uploadService
            .removeUploadedImage(imageUrl!)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
              next: () => {
                this.messageService.add({
                  severity: 'info',
                  summary: 'Confirmed',
                  detail: 'Image deleted successfully',
                });
                this.form.reset();
                this.dismiss.emit();
                this.uploadedImageUrl.set(null);
                this.uploadedFiles.set([]);
              },
              error: (error: any) => {
                console.error(error);
                this.messageService.add({
                  severity: 'danger',
                  summary: 'Error',
                  detail: 'Faild to delete image.',
                });
              },
            });
        },
      });
    }
  }

  delteImageAndUpdateProduct(url: string | null | undefined) {
    if (!url) return;
    const filename = url.split('/uploads/')[1];
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this image?',
      header: 'Confirmation',
      closable: false,
      closeOnEscape: false,
      icon: 'pi pi-exclamation-triangle',
      rejectButtonProps: {
        label: 'Cancel',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Delete',
        severity: 'danger',
      },
      accept: () => {
        this.uploadService
          .removeUploadedImage(filename!)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe({
            next: () => {
              this.messageService.add({
                severity: 'info',
                summary: 'Confirmed',
                detail: 'Image deleted successfully',
              });
              this.form.get('imageUrl')?.reset();
            },
            error: (error: any) => {
              console.error(error);
              this.messageService.add({
                severity: 'danger',
                summary: 'Error',
                detail: 'Faild to delete image.',
              });
            },
          });
      },
    });
  }
}
