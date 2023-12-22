/**
 * Define a set of template paths to pre-load
 * Pre-loaded templates are compiled and cached for fast access when rendering
 * @return {Promise}
 */
 export const preloadHandlebarsTemplates = async function() {
  return loadTemplates([

    // Actor partials.
    "systems/outbreakundead2e/templates/actor/parts/actor-attributes.html",
    "systems/outbreakundead2e/templates/actor/parts/actor-vitality.hbs",
    "systems/outbreakundead2e/templates/actor/parts/actor-items.html",
    "systems/outbreakundead2e/templates/actor/parts/actor-spells.html",
    "systems/outbreakundead2e/templates/actor/parts/actor-effects.html",
  ]);
};
