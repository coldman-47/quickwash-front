import { Component } from '@angular/core';

@Component({
  selector: 'app-new-wash',
  standalone:false,
  templateUrl: './new-wash.html',
  styleUrl: './new-wash.scss',
})
export class NewWash {

  categories:any = {
    bonnet:0,
    chaussette:0,
    culotte:0,
    debardeur:0,
    echarpe:0,
    manteau:0,
    pantalon:0,
    tshirt:0,
    pull:0,
    sweater:0
  }
  wash: any = []
  stateOptions: any[] = [
    { label: 'Machine', value: 'machine' },
    { label: 'À la main', value: 'hand' },
    { label: 'À sec', value: 'dry' }
  ];

  temperature = 45;
  colors: any = 0;

  get catLabels() {
    return Object.keys(this.categories);
  }

  get selected(){
    return this.catLabels.filter(cat => this.categories[cat] > 0);
  }
  

}
