import DelimiterSource from '@editorjs/delimiter';
import icon from '!raw-loader!~/assets/images/editorjs/icons/delimiter.svg';

export default class Delimiter extends DelimiterSource {
  static get toolbox() {
    return {
      icon:   icon,
      title:  'Delimiter'
    };
  }
}
