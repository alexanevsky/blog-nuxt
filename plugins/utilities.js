import consoleLog from '~/utilities/consoleLog';
import convert    from '~/utilities/convert';
import object     from '~/utilities/object';

export default async ({}, inject) => {
  inject('utils', {
    consoleLog,
    convert,
    object
  });
}
