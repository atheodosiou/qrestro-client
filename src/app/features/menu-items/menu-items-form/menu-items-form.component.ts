import {
  Component,
  computed,
  effect,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { IMenuItem } from '../../../shared/models/menu-item.interface';

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

  onUpload(event: any) {
    const files: File[] = event.files;
    this.uploadedFiles.set(files);
    const uploadedImageUrl = files[0]?.name ?? null;
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
    }
  }

  cancel() {
    this.form.reset();
    this.dismiss.emit();
  }
}
