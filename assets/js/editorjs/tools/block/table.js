import TableSource from '@editorjs/table';
import icon from '!raw-loader!~/assets/images/editorjs/icons/table.svg';

export default class Table extends TableSource {
  static get toolbox() {
    return {
      icon:   icon,
      title: 'Table'
    };
  }
}
