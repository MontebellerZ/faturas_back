import { FaturaData, FaturaDataGroup, FaturasArray } from "../types/FaturaData";

function createDeepGroup(faturas: FaturasArray, groupKeyGetter: (f: FaturaData) => string) {
  const groups: { [group: string]: FaturaDataGroup } = {};

  for (const f of faturas) {
    const isGroup = "faturas" in f;

    if (isGroup) {
      f.faturas = createDeepGroup(f.faturas, groupKeyGetter);
      groups[f.title] = f;
      continue;
    }

    const groupKey = groupKeyGetter(f);

    if (!groups[groupKey]) {
      groups[groupKey] = {
        date: f.date,
        title: groupKey,
        amount: 0,
        faturas: [],
      };
    }

    groups[groupKey].amount += f.amount;
    groups[groupKey].faturas.push(f);
  }

  return Object.values(groups);
}

export default createDeepGroup;
