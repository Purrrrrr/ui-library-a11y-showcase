import {libraryContainerFor, UILibrary} from '../../components/LibraryContainer';
import {Showcase} from '../../components/ComponentShowcase';

type RC = React.ComponentType<any>;
type PartialShowcase<P extends RC,O> = Omit<Showcase<P,O>, 'id' | 'title'>;

export function showcaseWrapper(libraryName: string, library?: UILibrary) {
  const wrapper = library ? libraryContainerFor(library) : undefined;
  function wrapShowcase<P extends RC,O = {}>(elementName: string, {tags, ...showcase} : PartialShowcase<P,O>) : Showcase<P,O> {
    return {
      id: libraryName.toLowerCase()+'-'+(elementName).toLowerCase().replace(/ +/g, "-"),
      title: libraryName+" "+elementName,
      libraryName,
      tags: [elementName, ...(tags??[])],
      wrapperComponent: wrapper,
      ...showcase
    }
  }
  return wrapShowcase;
}
