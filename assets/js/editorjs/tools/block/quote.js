import QuoteSource from '@editorjs/quote';
import icon from '!raw-loader!~/assets/images/editorjs/icons/quote.svg';


export default class Quote extends QuoteSource {
  static get toolbox() {
    return {
      icon:   icon,
      title:  'Quote'
    };
  }
}
