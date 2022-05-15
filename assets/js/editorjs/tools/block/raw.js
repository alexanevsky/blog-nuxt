import RawSource from '@editorjs/raw';
import icon from '!raw-loader!~/assets/images/editorjs/icons/raw.svg';

export default class Raw extends RawSource {
  static get toolbox() {
    return {
      icon:   icon,
      title: 'Raw HTML'
    };
  }
}
