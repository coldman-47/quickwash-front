export interface Wash {
  id: string;
  date: Date;
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
  temperature: number;
  washType: 'machine' | 'hand' | 'dry';
  colors: number;
  detergent?: string;
}
