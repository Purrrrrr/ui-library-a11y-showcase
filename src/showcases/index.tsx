import buttons from './buttons';
import breadcrumbs from './breadcrumbs';
import {Showcase} from '../components/ComponentShowcase';

type SC = Showcase<any,any>

const showcases = [
  ...buttons, ...breadcrumbs
];

export function getLibraries(showcases: SC[]) : string[] {
  const libraries = showcases
    .map(sc => sc.libraryName)
    .filter(ln => ln !== undefined)
    .flat() as string[];
  return [...new Set(libraries)].sort();
}
export function getTags(showcases: SC[]) : string[] {
  const allTags = showcases
    .map(getShowcaseTags)
    .flat();
  
  return [...new Set(allTags)].sort();
}

export function getShowcasesForLibrary(showcases: SC[], libraryName: string) {
  return showcases.filter(sc => sc.libraryName === libraryName).sort(
    (a, b) => a.title.localeCompare(b.title)
  );
}
export function getShowcasesForTag(showcases: SC[], tag: string) {
  return showcases.filter(({tags}) => tags !== undefined && tags.indexOf(tag) !== -1).sort(
    (a, b) => a.title.localeCompare(b.title)
  );
}

function getShowcaseTags({tags} : SC) : string[] {
  return tags ?? [];
}

export default showcases;
