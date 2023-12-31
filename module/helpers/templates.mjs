/**
 * Define a set of template paths to pre-load
 * Pre-loaded templates are compiled and cached for fast access when rendering
 * @return {Promise}
 */
 export const preloadHandlebarsTemplates = async function() {
  return loadTemplates([

    // Actor partials.
    "systems/outbreakundead2e/templates/actor/parts/actor-survival-gestalt-compitence.hbs",
    "systems/outbreakundead2e/templates/actor/parts/actor-skills.hbs",
    "systems/outbreakundead2e/templates/actor/parts/actor-vitality.hbs",
    "systems/outbreakundead2e/templates/actor/parts/actor-injuries.hbs",
    "systems/outbreakundead2e/templates/actor/parts/actor-damage-threshold.hbs",
    "systems/outbreakundead2e/templates/actor/parts/actor-training.hbs",
    "systems/outbreakundead2e/templates/actor/parts/actor-triggered-effects.hbs",
    "systems/outbreakundead2e/templates/actor/parts/actor-character-traits.hbs",
    "systems/outbreakundead2e/templates/actor/parts/actor-equipment.hbs",
    "systems/outbreakundead2e/templates/actor/parts/actor-spells.html",
    "systems/outbreakundead2e/templates/actor/parts/actor-effects.html",
  ]);
};
