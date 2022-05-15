import ListSource from '@editorjs/list';
import icon from '!raw-loader!~/assets/images/editorjs/icons/list.svg';

export default class List extends ListSource {
  static get toolbox() {
    return {
      icon:   icon,
      title: 'List'
    };
  }
}
