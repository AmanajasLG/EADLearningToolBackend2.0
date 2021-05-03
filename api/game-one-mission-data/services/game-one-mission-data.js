'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-services)
 * to customize this service
 */

 module.exports = {
  find(params, populate) {
    let p = [
      { path: 'locations', populate: ['location', { path: 'missionCharacters', populate: [{ path: 'character', populate: ['characterAssets'] }, 'answers']} ]},
      'questions',
    ]
    return strapi.query('game-one-mission-data').find(params, p);
  },

  findOne(params, populate) {
    let p = [
      { path: 'locations', populate: ['location', { path: 'missionCharacters', populate: [{ path: 'character', populate: ['characterAssets'] }, 'answers']} ]},
      'questions',
    ]
    return strapi.query('game-one-mission-data').findOne(params, p);
  },
};
