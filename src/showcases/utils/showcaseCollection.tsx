import {libraryContainerFor, UILibrary} from '../../components/LibraryContainer';
import {Showcase} from '../../components/ComponentShowcase';

type RC = React.ComponentType<any>;
type PartialShowcase<P extends RC,O> = Omit<Showcase<P,O>, 'id' | 'title'>;

interface ShowcaseCollection {
  add<P extends RC, O = {}>(elementName: string, showcase: PartialShowcase<P,O>): Showcase<P,O>
  readonly showcases: Showcase<any,any>[]
}

/** Creates a collection of showcases with a convenient add method
 * for adding a showcase with all the library specific details and id's filled in
 */
export function showcaseCollection(libraryName: string, libraryClassname?: UILibrary) : ShowcaseCollection {
  const wrapper = libraryClassname ? libraryContainerFor(libraryClassname) : undefined;
  function wrapShowcase<P extends RC,O = {}>(elementName: string, {tags, ...showcase} : PartialShowcase<P,O>) : Showcase<P,O> {
    const sc = {
      id: libraryName.toLowerCase()+'-'+(elementName).toLowerCase().replace(/ +/g, "-"),
      title: libraryName+" "+elementName,
      libraryName,
      tags: [elementName, ...(tags??[])],
      wrapperComponent: wrapper,
      ...showcase
    }
    showcases.push(sc);
    return sc;
  }
  const showcases = [] as Showcase<any,any>[];
  return {add: wrapShowcase, showcases};
}
