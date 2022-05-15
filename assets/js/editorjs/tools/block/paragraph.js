import ParagraphSource from 'editorjs-paragraph-with-alignment';
import icon from '!raw-loader!~/assets/images/editorjs/icons/paragraph.svg';

export default class Paragraph extends ParagraphSource {
  static get toolbox() {
    return {
      icon:   icon,
      title:  'Paragraph'
    };
  }
}
