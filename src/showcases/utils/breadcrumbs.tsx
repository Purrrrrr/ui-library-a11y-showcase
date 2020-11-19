const breadcrumTexts = ['The Foxy site', 'Foxes', 'Foxy foxes', 'Utah Area', 'Delilah', 'Tail'];

export function getBreadcrumbTexts(count: number) {
  return takeItemsRepeated(breadcrumTexts, count);
}

function takeItemsRepeated(array: any[], itemCount: number) {
  const repeats = Math.ceil(itemCount/array.length);
  return arrayRepeat(array, repeats).slice(0, itemCount);
}

function arrayRepeat(array: any[], repeats: number) {
  if (repeats <= 1) return array;
  return Array.from({length: repeats}, () => array).flat();
}
