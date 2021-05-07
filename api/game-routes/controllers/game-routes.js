'use strict';

const mission = require("../../mission/services/mission");

/**
 * A set of functions called "actions" for `game-routes`
 */

module.exports = {

  // GETS
  
  getMissions: async (ctx, next) => {
    let p = [
      'gameType'
    ]
    return { missions: await strapi.query('mission').find(ctx.query, p) }
    
    const missions = await strapi.query('mission').find(ctx.query, p)
    let data = []

    for (let i = 0; i < missions.length; i++) {
      switch(missions[i].gameType.game){
        case 1:
          data.push({
            ...missions[i],
            missionData: await strapi.query('game-one-mission-data').findOne({'mission': mission.id}, [
              { path: 'locations', populate: ['location', { path: 'missionCharacters', populate: [{ path: 'character', populate: ['characterAssets'] }, 'answers']} ]},
              'questions',
            ])
          })
          break
        case 2:
          data.push({
            ...missions[i],
            missionData: await strapi.query('game-two-mission-data').findOne({'mission': mission.id}, [
              'locations',
              'questions',
              { path: 'missionCharacters', populate: [{ path: 'character', populate: ['characterAssets'] }, 'answers'] },
              {path: 'tutorial', populate: [{path: 'character', populate: ['characterAssets']}, 'location']}
            ])
          }) 
          break         
        default:
      }
    }

    return { missions: data };
  },

  getMission: async (ctx, next) => {
    let p = [
      'gameType'
    ]
    const mission = await strapi.query('mission').findOne({ id: ctx.params.id }, p)

    switch(mission.gameType.game){
      case 1:
        return {
          missions: [{
            ...mission,
            missionData: await strapi.query('game-one-mission-data').findOne({'mission': mission.id}, [
              { path: 'locations', populate: ['location', { path: 'missionCharacters', populate: [{ path: 'character', populate: ['characterAssets'] }, 'answers']} ]},
              'questions', 'feedbacks'
            ])
          }]
        }
      case 2:
        return {
          missions: [{
            ...mission,
            missionData: await strapi.query('game-two-mission-data').findOne({'mission': mission.id}, [
              'locations',
              'questions',
              { path: 'missionCharacters', populate: [{ path: 'character', populate: ['characterAssets'] }, 'answers'] },
              {path: 'tutorial', populate: [{path: 'character', populate: ['characterAssets']}, 'location']}
            ])
          }]
        }    
      default:
    }
  },

  getResults: async (ctx, next) => {
    let p = [
      'gameType'
    ]
    console.log(ctx.query)
    const mission = await strapi.query('mission').findOne({ id: ctx.query.mission }, p)

    switch(mission.gameType.game){
      case 1:
        return {
          results: await strapi.query('game-one-result').find(ctx.query, [])
        }
      case 2:
        return {
          results: await strapi.query('game-two-result').find(ctx.query, [])
        }       
      default:
    }
  },

  getResultsCount: async (ctx, next) => {
    let p = [
      'gameType'
    ]
    const mission = await strapi.query('mission').findOne({ id: ctx.query.mission }, p)

    switch(mission.gameType.game){
      case 1:
        return { resultsCount: await strapi.query('game-one-result').count(ctx.query, []) }
      case 2:
        return { resultsCount: await strapi.query('game-two-result').count(ctx.query, []) }
      default:
    }
  },


  // CREATE
  createResult: async (ctx, next) => {
    let p = [
      'gameType'
    ]
    const mission = await strapi.query('mission').findOne({ id: ctx.query.mission }, p)

    switch(mission.gameType.game){
      case 1:
        return {
          results: [await strapi.query('game-one-result').create(ctx.query)]
        }
      case 2:
        return {
          results: [await strapi.query('game-two-result').create(ctx.query)]
        }     
      default:
    }
  }
};

