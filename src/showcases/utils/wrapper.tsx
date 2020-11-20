import {libraryContainerFor, UILibrary} from '../../components/LibraryContainer';
import {Showcase} from '../../components/ComponentShowcase';

export function showcaseWrapper(name: string, library?: UILibrary) {
  const wrapper = library ? libraryContainerFor(library) : undefined;
  function wrapShowcase<P extends React.ComponentType<any>,O = {}>({title, ...rest} : Omit<Showcase<P,O>, 'id'>) : Showcase<P,O> {
    return {
      id: name.toLowerCase()+'-'+(title).toLowerCase().replace(/ +/g, "-"),
      title: name+" "+title,
      wrapperComponent: wrapper,
      ...rest
    }
  }
  return wrapShowcase;
}
