import { createIntl, createIntlCache } from '@formatjs/intl';

import flat from '~/utilities/converters/flattenObject';

import blog     from '~/translations/en/blog';
import security from '~/translations/en/security';
import users    from '~/translations/en/users';

export default async ({ $api }, inject) => {
  const apiTranslations = await $api.get('/translations/en', { flatten: 0 })
    .then((response) => response.data.translations || {})
    .catch(() => {});

  const translations = {
    ...apiTranslations,
    ...flat(blog, 'blog'),
    ...flat(security, 'security'),
    ...flat(users, 'users')
  }

  const config = {
    locale: 'en',
    messages: translations
  };

  const intlCache = createIntlCache();
  const intl = createIntl(config, intlCache);

  const translate = (message, params = {}) => {
    if (!Object.keys(translations).includes(message)) {
      return message.includes('.') ? message.substring(message.lastIndexOf('.') + 1) : message;
    }

    let translatedMessage = intl.formatMessage({ id: message }, params);

    return translatedMessage;
  };

  inject('t', translate);
}
