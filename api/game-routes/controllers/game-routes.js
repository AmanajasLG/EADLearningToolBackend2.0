"use strict";

const mission = require("../../mission/services/mission");

/**
 * A set of functions called "actions" for `game-routes`
 */

module.exports = {
  // GETS

  getMissions: async (ctx, next) => {
    let p = ["gameType"];
    if (ctx.state.user.role.name === "Professor")
      return {
        missions: await strapi.query("mission").find(ctx.query, p),
      };
    else if (ctx.state.user.course)
      return {
        missions: await strapi
          .query("mission")
          .find(
            { ...ctx.query, course: ctx.state.user.course, draft: false },
            p
          ),
      };
    else
      return {
        missions: await strapi
          .query("mission")
          .find({ ...ctx.query, draft: false }, p),
      };
  },

  getMission: async (ctx, next) => {
    let p = ["gameType"];
    const mission = await strapi
      .query("mission")
      .findOne({ id: ctx.params.id }, p);

    switch (mission.gameType.game) {
      case 1:
        return {
          missions: [
            {
              ...mission,
              missionData: await strapi
                .query("game-one-mission-data")
                .findOne({ mission: mission.id }, [
                  {
                    path: "locations",
                    populate: [
                      "location",
                      {
                        path: "missionCharacters",
                        populate: [
                          { path: "character", populate: ["characterAssets"] },
                          "answers",
                        ],
                      },
                    ],
                  },
                  "questions",
                  "feedbacks",
                  "metrics",
                ]),
            },
          ],
        };
      case 2:
        return {
          missions: [
            {
              ...mission,
              missionData: await strapi
                .query("game-two-mission-data")
                .findOne({ mission: mission.id }, [
                  "locations",
                  "questions",
                  {
                    path: "missionCharacters",
                    populate: [
                      { path: "character", populate: ["characterAssets"] },
                      "answers",
                    ],
                  },
                  {
                    path: "tutorial",
                    populate: [
                      { path: "character", populate: ["characterAssets"] },
                      "location",
                    ],
                  },
                ]),
            },
          ],
        };
      case 3:
        return {
          missions: [
            {
              ...mission,
              missionData: await strapi
                .query("game-three-mission-data")
                .findOne({ mission: mission.id }, [
                  "money",
                  {
                    path: "recipes",
                    populate: [{ path: "ingredients", populate: "asset" }],
                  },
                  { path: "character", populate: ["characterAssets"] },
                ]),
            },
          ],
        };
      case 4:
        return {
          missions: [
            {
              ...mission,
              missionData: await strapi
                .query("game-four-mission-data")
                .findOne({ mission: mission.id }, [
                  {
                    path: "recipes",
                    populate: [
                      { path: "ingredients", populate: "asset" },
                      { path: "tablewares", populate: "asset" },
                    ],
                  },
                  { path: "character", populate: ["characterAssets"] },
                ]),
            },
          ],
        };
      case 5:
        return {
          missions: [
            {
              ...mission,
              missionData: await strapi
                .query("game-five-mission-data")
                .findOne({ mission: mission.id }, [
                  { path: "invites", populate: ["rightTags"] },
                  { path: "characters", populate: ["characterAssets"] },
                  { path: "clothes", populate: ["asset", "tags"] },
                ]),
            },
          ],
        };
      case 6:
        return {
          missions: [
            {
              ...mission,
              missionData: await strapi
                .query("game-six-mission-data")
                .findOne({ mission: mission.id }, [
                  { path: "invites", populate: ["rightTags"] },
                  { path: "characters", populate: ["characterAssets"] },
                  { path: "clothes", populate: ["asset", "tags"] },
                ]),
            },
          ],
        };
      case 7:
        return {
          missions: [
            {
              ...mission,
              missionData: await strapi
                .query("game-seven-mission-data")
                .findOne({ mission: mission.id }, [
                  "mail",
                  "cities",
                  "flights",
                  { path: "phrases", populate: ["words"] },
                ]),
            },
          ],
        };
      case 8:
        return {
          missions: [
            {
              ...mission,
              missionData: await strapi
                .query("game-eight-mission-data")
                .findOne({ mission: mission.id }, [
                  "cities",
                  "flights",
                  {
                    path: "email",
                    populate: {
                      path: "messages",
                      populate: { path: "responseEmail", populate: "partials" },
                    },
                  },
                  "locations",
                ]),
            },
          ],
        };
      case 9:
        return {
          missions: [
            {
              ...mission,
              missionData: await strapi
                .query("game-nine-mission-data")
                .findOne({ mission: mission.id }, [
                  "homes",
                  "requests",
                  { path: "characters", populate: ["characterAssets"] },
                  "locations",
                ]),
            },
          ],
        };
      case 10:
        return {
          missions: [
            {
              ...mission,
              missionData: await strapi
                .query("game-ten-mission-data")
                .findOne({ mission: mission.id }, [
                  { path: "character", populate: ["characterAssets"] },
                  "dishes",
                  { path: "invite", populate: ["rightTags"] },
                  { path: "clothes", populate: ["asset", "tags"] },
                  { path: "dressingCharacters", populate: ["characterAssets"] },
                  "musics",
                ]),
            },
          ],
        };
      default:
    }
  },

  getResults: async (ctx, next) => {
    let p = ["gameType"];
    const mission = await strapi
      .query("mission")
      .findOne({ id: ctx.query.mission }, p);

    switch (mission.gameType.game) {
      case 1:
        return {
          results: await strapi.query("game-one-result").find(ctx.query, []),
        };
      case 2:
        return {
          results: await strapi.query("game-two-result").find(ctx.query, []),
        };
      case 3:
        return {
          results: await strapi.query("game-three-result").find(ctx.query, []),
        };
      case 4:
        return {
          results: await strapi.query("game-four-result").find(ctx.query, []),
        };
      case 5:
        return {
          results: await strapi.query("game-five-result").find(ctx.query, []),
        };
      case 6:
        return {
          results: await strapi.query("game-six-result").find(ctx.query, []),
        };
      case 7:
        return {
          results: await strapi.query("game-seven-result").find(ctx.query, []),
        };
      case 8:
        return {
          results: await strapi.query("game-eight-result").find(ctx.query, []),
        };
      case 9:
        return {
          results: await strapi.query("game-nine-result").find(ctx.query, []),
        };
      case 10:
        return {
          results: await strapi.query("game-ten-result").find(ctx.query, []),
        };
      default:
    }
  },

  getResultsCount: async (ctx, next) => {
    let p = ["gameType"];
    const mission = await strapi
      .query("mission")
      .findOne({ id: ctx.query.mission }, p);

    switch (mission.gameType.game) {
      case 1:
        return {
          resultsCount: await strapi
            .query("game-one-result")
            .count(ctx.query, []),
        };
      case 2:
        return {
          resultsCount: await strapi
            .query("game-two-result")
            .count(ctx.query, []),
        };
      case 3:
        return {
          resultsCount: await strapi
            .query("game-three-result")
            .count(ctx.query, []),
        };
      case 4:
        return {
          resultsCount: await strapi
            .query("game-four-result")
            .count(ctx.query, []),
        };
      case 5:
        return {
          resultsCount: await strapi
            .query("game-five-result")
            .count(ctx.query, []),
        };
      case 6:
        return {
          resultsCount: await strapi
            .query("game-six-result")
            .count(ctx.query, []),
        };
      case 7:
        return {
          resultsCount: await strapi
            .query("game-seven-result")
            .count(ctx.query, []),
        };
      case 8:
        return {
          resultsCount: await strapi
            .query("game-eight-result")
            .count(ctx.query, []),
        };
      case 9:
        return {
          resultsCount: await strapi
            .query("game-nine-result")
            .count(ctx.query, []),
        };
      case 10:
        return {
          resultsCount: await strapi
            .query("game-ten-result")
            .count(ctx.query, []),
        };
      default:
    }
  },

  // CREATE
  createResult: async (ctx, next) => {
    let p = ["gameType"];
    const mission = await strapi
      .query("mission")
      .findOne({ id: ctx.query.mission }, p);

    switch (mission.gameType.game) {
      case 1:
        if (ctx.query.phoneErrors)
          ctx.query.phoneErrors = JSON.parse(ctx.query.phoneErrors);
        if (ctx.query.wrongDialogs)
          ctx.query.wrongDialogs = JSON.parse(ctx.query.wrongDialogs);
        return {
          results: await strapi.query("game-one-result").create(ctx.query),
        };
      case 2:
        if (ctx.query.tips) ctx.query.tips = JSON.parse(ctx.query.tips);
        if (ctx.query.wrongDialogs)
          ctx.query.wrongDialogs = JSON.parse(ctx.query.wrongDialogs);
        return {
          results: await strapi.query("game-two-result").create(ctx.query),
        };
      case 3:
        if (ctx.query.wrongIngredients)
          ctx.query.wrongIngredients = JSON.parse(ctx.query.wrongIngredients);
        return {
          results: await strapi.query("game-three-result").create(ctx.query),
        };
      case 4:
        if (ctx.query.wrongIngredientSelected)
          ctx.query.wrongIngredientSelected = JSON.parse(
            ctx.query.wrongIngredientSelected
          );
        if (ctx.query.wrongIngredientNameOrder)
          ctx.query.wrongIngredientNameOrder = JSON.parse(
            ctx.query.wrongIngredientNameOrder
          );
        if (ctx.query.wrongTablewarePairSelected)
          ctx.query.wrongTablewarePairSelected = JSON.parse(
            ctx.query.wrongTablewarePairSelected
          );
        if (ctx.query.wrongTablewareSelected)
          ctx.query.wrongTablewareSelected = JSON.parse(
            ctx.query.wrongTablewareSelected
          );
        return {
          results: await strapi.query("game-four-result").create(ctx.query),
        };
      case 5:
        if (ctx.query.inviteQuestionsMade)
          ctx.query.inviteQuestionsMade = JSON.parse(
            ctx.query.inviteQuestionsMade
          );
        return {
          results: await strapi.query("game-five-result").create(ctx.query),
        };
      case 6:
        if (ctx.query.wrongColors)
          ctx.query.wrongColors = JSON.parse(ctx.query.wrongColors);
        if (ctx.query.inviteQuestionsMade)
          ctx.query.inviteQuestionsMade = JSON.parse(
            ctx.query.inviteQuestionsMade
          );
        return {
          results: await strapi.query("game-six-result").create(ctx.query),
        };
      case 7:
        if (ctx.query.userErrors)
          ctx.query.userErrors = JSON.parse(ctx.query.userErrors);
        return {
          results: await strapi.query("game-seven-result").create(ctx.query),
        };
      case 8:
        if (ctx.query.userErrors)
          ctx.query.userErrors = JSON.parse(ctx.query.userErrors);
        return {
          results: await strapi.query("game-eight-result").create(ctx.query),
        };
      case 9:
        if (ctx.query.userErrors)
          ctx.query.userErrors = JSON.parse(ctx.query.userErrors);
        return {
          results: await strapi.query("game-nine-result").create(ctx.query),
        };
      case 10:
        if (ctx.query.inviteQuestionsMade)
          ctx.query.inviteQuestionsMade = JSON.parse(
            ctx.query.inviteQuestionsMade
          );

        if (ctx.query.wrongGenreNameOrder)
          ctx.query.wrongGenreNameOrder = JSON.parse(
            ctx.query.wrongGenreNameOrder
          );
        return {
          results: await strapi.query("game-ten-result").create(ctx.query),
        };
      default:
    }
  },
};
