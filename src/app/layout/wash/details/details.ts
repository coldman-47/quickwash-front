import { Component } from '@angular/core';
import { WashService } from '../../../core/services/wash/wash.service';

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
  visible = false

  constructor(private srv: WashService) {
    srv.details.subscribe({
      next: (val) => {
        if(val) this.visible = true
      }
    })
  }
}
