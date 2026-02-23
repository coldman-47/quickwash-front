export class Wash {
  id?: string;
  clothes: {
    bonnet?: number;
    chaussette?: number;
    culotte?: number;
    debardeur?: number;
    echarpe?: number;
    manteau?: number;
    pantalon?: number;
    tshirt?: number;
    pull?: number;
    sweater?: number;
  };
  weight: number;
  temperature?: number;
  washType?: 'machine' | 'hand' | 'dry';
  reference?: string;
  createdAt?: Date;
  colors?: number;

  constructor(clothes: any, weight: number) {
    this.clothes = clothes;
    this.weight = weight;
  }
  
}
