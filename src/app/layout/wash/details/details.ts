import { Component, ChangeDetectorRef } from '@angular/core';
import { WashService } from '../../../core/services/wash/wash.service';
import { Wash } from '../../../core/models/wash/wash';
import { AuthService } from '../../../core/services/auth/auth.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.html',
  styleUrl: './details.scss',
  standalone: false,
})
export class Details {
  steps: any[] = [
    {
      label: 'Étape 1',
      status: 'completed',
    },
    {
      label: 'Étape 2',
      status: 'current',
    },
    {
      label: 'Étape 3',
      status: 'pending',
    },
  ];
  visible = false;
  laundry: Wash | null = null;
  user: any;

  constructor(private srv: WashService, cdr: ChangeDetectorRef, authSrv: AuthService) {
    authSrv.user.subscribe({
      next: (user) => {
        this.user = user;
      },
    });
    srv.details.subscribe({
      next: (val) => {
        console.log(val);
        
        this.laundry = val;
        // cdr.detectChanges();
        if (val) this.visible = true;
      },
    });
  }
}
