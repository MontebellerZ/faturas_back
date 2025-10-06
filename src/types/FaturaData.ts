export interface FaturaData {
  date: Date;
  title: string;
  amount: number;
  category?: string;
}

export interface FaturaDataGroup extends FaturaData {
  faturas: FaturasArray;
}

export type FaturasArray = (FaturaData | FaturaDataGroup)[];
