import { Component, TemplateRef, ViewContainerRef, inject, output, viewChild } from '@angular/core';
import { AuthStore } from '../../core/stores/auth-store.service';
import { CdkOverlayOrigin, Overlay, OverlayModule, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
@Component({
  selector: 'app-topbar',
  imports: [OverlayModule],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss'
})
export class TopbarComponent {
  authStore = inject(AuthStore);
  menuClick = output<void>();
  overlayOrigin = viewChild(CdkOverlayOrigin);
  userMenuTpl = viewChild<TemplateRef<unknown>>('userMenu');
  private readonly overlay = inject(Overlay);
  private readonly vcr = inject(ViewContainerRef);

  private overlayRef: OverlayRef | null = null;
  private portal!: TemplatePortal;

  toggleUserMenu() {
    if (this.overlayRef && this.overlayRef.hasAttached()) {
      this.overlayRef.detach();
    } else {
      if (!this.overlayRef) {
        this.overlayRef = this.overlay.create({
          hasBackdrop: true,
          backdropClass: 'transparent-backdrop',
          positionStrategy: this.overlay
            .position()
            .flexibleConnectedTo(this.overlayOrigin()!.elementRef)
            .withPositions([
              { originX: 'end', originY: 'bottom', overlayX: 'end', overlayY: 'top' }
            ]),
          scrollStrategy: this.overlay.scrollStrategies.close()
        });

        this.overlayRef.backdropClick().subscribe(() => {
          this.overlayRef?.detach();
        });
      }

      this.portal = new TemplatePortal(this.userMenuTpl()!, this.vcr);
      this.overlayRef.attach(this.portal);
    }
  }

  getInitials(name?: string): string {
    if (!name) return '';
    const parts = name.trim().split(' ');
    if (parts.length === 1) return parts[0][0];
    return parts[0][0] + parts[1][0];
  }

  logout() {
    this.authStore.clear();
    window.location.href = '/login';
  }
}
