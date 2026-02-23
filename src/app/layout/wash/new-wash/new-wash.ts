import { Component } from '@angular/core';
import { WashService } from '../../../core/services/wash/wash.service';
import { Wash } from '../../../core/models/wash/wash';
import { Message } from 'primeng/message';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-new-wash',
  standalone: false,
  templateUrl: './new-wash.html',
  styleUrl: './new-wash.scss',
})
export class NewWash {
  categories: any = {
    bonnet: 0,
    chaussette: 0,
    culotte: 0,
    debardeur: 0,
    echarpe: 0,
    manteau: 0,
    pantalon: 0,
    tshirt: 0,
    pull: 0,
    sweater: 0,
  };
  wash: Wash;
  washType: any[] = [
    { label: 'Machine', value: 'machine' },
    { label: 'À la main', value: 'hand' },
    { label: 'À sec', value: 'dry' },
  ];
  temperature = 45;
  colors: any = 0;
  weight = 0;

  constructor(
    private srv: WashService,
    private msgSrv: MessageService,
  ) {
    this.wash = new Wash({}, 0);
  }

  create() {
    this.wash.clothes = this.categories;
    this.wash.status =  {
    enAttente: true,
    acceptee: false,
    recue: false,
    enCoursDeLavage: false,
    essorage: false,
    sechage: false,
    termine: false,
  };;
    this.wash.reference = this.generateRef();
    this.srv.add(this.wash).subscribe({
      next: (val) => {
        this.msgSrv.add({
          severity: 'success',
          summary: 'Demande de lessive envoyée',
          detail: `Votre lavage a été créé avec la référence ${val.reference}`,
        });
        this.srv.newWash.next(val);
      },
      error: (err) => {
        console.error(err);
      },
    });
    console.log(this.wash);
  }

  get catLabels() {
    return Object.keys(this.categories);
  }

  get selected() {
    return this.catLabels.filter((cat) => this.categories[cat] > 0);
  }
  generateRef() {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    return `QW${year}${month}${day}${hours}${minutes}${seconds}`;
  }
}
