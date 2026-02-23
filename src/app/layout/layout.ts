import { Component } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { AuthService } from '../core/services/auth/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
  standalone: false,
})
export class Layout {
  items: MenuItem[] = [];
  visible = false;
  user: any = null;

  constructor(
    private messageService: MessageService,
    private authService: AuthService,
  ) {
    this.items = [
      {
        label: 'Home',
      },
      {
        label: 'Features',
      },
      {
        label: 'Projects',
        items: [
          {
            label: 'Components',
            icon: 'pi pi-bolt',
          },
          {
            label: 'Blocks',
            icon: 'pi pi-server',
          },
          {
            label: 'UI Kit',
            icon: 'pi pi-pencil',
          },
          {
            label: 'Templates',
            icon: 'pi pi-palette',
            items: [
              {
                label: 'Apollo',
                icon: 'pi pi-palette',
              },
              {
                label: 'Ultima',
                icon: 'pi pi-palette',
              },
            ],
          },
        ],
      },
      {
        label: 'Contact',
      },
    ];

    authService.user.subscribe({
      next: (user) => {
          this.user = user;
      },
    });
  }

  onAuthSuccess() {
    this.visible = false;
    this.messageService.add({
      severity: 'success',
      summary: 'Succès',
      detail: 'Authentification réussie',
      life: 3000,
    });
  }
}
