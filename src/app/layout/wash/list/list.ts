import { Component } from '@angular/core';
import { Wash } from '../../../core/models/wash/wash';
import { WashService } from '../../../core/services/wash/wash.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.html',
  styleUrl: './list.scss',
  standalone: false,
})
export class List {
  washList: Wash[] = [];

  constructor(private srv: WashService) {
    this.washList.push({
      id: '1',
      date: new Date(),
      clothes: {
        bonnet: 1,
        chaussette: 2,
        debardeur: 1,
        manteau: 1,
        tshirt: 2
      },
      weight: 5,
      temperature: 40,
      washType: 'machine',
      colors: 2,
    });this.washList.push({
      id: '1',
      date: new Date(),
      clothes: {
        bonnet: 1,
        chaussette: 2,
        debardeur: 1,
        manteau: 1,
        tshirt: 2
      },
      weight: 5,
      temperature: 40,
      washType: 'machine',
      colors: 2,
    });
  }

  peek(){
    this.srv.details.next(this.washList[0]);
  }
}
