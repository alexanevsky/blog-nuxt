import converter from 'js-convert-case';

export default {
  camel:  (string) => converter.toCamelCase(string),
  snake:  (string) => converter.toSnakeCase(string),
  title:  (string) => string.split(' ').map((s) => s[0].toUpperCase() + s.substring(1)).join(' ')
};
