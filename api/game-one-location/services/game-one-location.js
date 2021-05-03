'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-services)
 * to customize this service
 */

 module.exports = {
  find(params, populate) {
    let p = [
      'location',
      { path: 'missionCharacters', populate: [{ path: 'character', populate: ['characterAssets'] }, 'answers'] },
    ]
    return strapi.query('game-one-location').find(params, p);
  },

  findOne(params, populate) {
    let p = [
      'location',
      { path: 'missionCharacters', populate: [{ path: 'character', populate: ['characterAssets'] }, 'answers'] },
    ]
    return strapi.query('game-one-location').findOne(params, p);
  },
};
