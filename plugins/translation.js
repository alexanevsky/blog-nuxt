import { createIntl, createIntlCache } from '@formatjs/intl';

export default async ({ $api }, inject) => {
  const translations = await $api.get('/translations/en', { flatten: 1 })
    .then(response => response.data.translations || {});

  const config = {
    locale: 'en',
    messages: translations
  };

  const intlCache = createIntlCache();
  const intl = createIntl(config, intlCache);

  const translate = (message, params = {}) => {
    if (!Object.keys(translations).includes(message)) {
      return message;
    }

    let translatedMessage = intl.formatMessage({ id: message }, params);

    return translatedMessage;
  };

  inject('t', translate);
}
