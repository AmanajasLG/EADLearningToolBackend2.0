'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-services)
 * to customize this service
 */

module.exports = {
  find(params, populate) {
    let p = [
      'locations',
      'questions',
      { path: 'missionCharacters', populate: [{ path: 'character', populate: ['characterAssets'] }, 'answers'] },
      {path: 'tutorial', populate: [{path: 'character', populate: ['characterAssets']}, 'location']}
    ]
    return strapi.query('game-two-mission-data').find(params, p);
  },

  findOne(params, populate) {
    let p = [
      'locations',
      'questions',
      { path: 'missionCharacters', populate: [{ path: 'character', populate: ['characterAssets'] }, 'answers'] },
      {path: 'tutorial', populate: [{path: 'character', populate: ['characterAssets']}, 'location']}
    ]
    return strapi.query('game-two-mission-data').findOne(params, p);
  },
};
