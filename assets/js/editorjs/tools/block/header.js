import HeaderSource from 'editorjs-header-with-anchor';
import icon from '!raw-loader!~/assets/images/editorjs/icons/header.svg';

export default class Header extends HeaderSource {
  static get toolbox() {
    return {
      icon: icon,
      title: 'Heading',
    };
  }
}
