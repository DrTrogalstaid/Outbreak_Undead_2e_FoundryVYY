/**
 * Extend the base Actor document by defining a custom roll data structure which is ideal for the Simple system.
 * @extends {Actor}
 */
export class OutbreakUndead2eActor extends Actor {

  /** @override */
  prepareData() {
    // Prepare data for the actor. Calling the super version of this executes
    // the following, in order: data reset (to clear active effects),
    // prepareBaseData(), prepareEmbeddedDocuments() (including active effects),
    // prepareDerivedData().

    //TODO: Fiture out if this is needed for the changes and resets of different levels of play (arcade, weekend warrior, etc) .

    super.prepareData();
  }

  /** @override */
  prepareBaseData() {
    // Data modifications in this step occur before processing embedded
    // documents or derived data.
  }

  /**
   * @override
   * Augment the basic actor data with additional dynamic data. Typically,
   * you'll want to handle most of your calculated/derived data in this step.
   * Data calculated in this step should generally not exist in template.json
   * (such as ability modifiers rather than ability scores) and should be
   * available both inside and outside of character sheets (such as if an actor
   * is queried and has a roll executed directly from it).
   */
  prepareDerivedData() {
    const actorData = this;
    const systemData = actorData.system;
    const flags = actorData.flags.outbreakundead2e || {};

    // Make separate methods for each Actor type (character, npc, etc.) to keep
    // things organized.
    this._prepareCharacterData(actorData);
    this._prepareNpcData(actorData);
  }

  /**
   * Prepare Character type specific data
   */
  _prepareCharacterData(actorData) {
    if (actorData.type !== 'character') 
    {
      return;
    }

    // Make modifications to data here. For example:
    const systemData = actorData.system;
    
    // Set Level of Play
    // NOTE: This is important to do first because it effects may other vlaues on the character sheet
    


    // Loop through Spew scores, and add their modifiers to our sheet output.
    // TODO: Change abilities to "spew" 
    for (let [key, spew] of Object.entries(systemData.spew)) 
    {
      spew.mod = Math.floor(ability.value / 10);
    }

    // Set Damage Threshold - Based on str.mod and wil.mod
    systemData.damage_threshold.spew = (systemData.spew.str.mod + systemData.spew.wil.mod);
    //TODO: Determine what this is.
    systemData.damage_threshold.bonus = 0;
    systemData.damage_threshold.total = (systemData.damage_threshold.spew + systemData.damage_threshold.bonus);

    // Set Morale - Based on wil.mod and emp.mod
    systemData.morale.spew = (systemData.spew.wil.mod + systemData.spew.emp.mod);
    //TODO: Determine what this is.
    systemData.morale.bonus = 0;
    systemData.morale.total = (systemData.morale.spew + systemData.morale.bonus);

    // Basic Skills
    for (let [key, skill] of Object.entries(systemData.skills.basic))
    {
      switch (skill.primary)
      {
        case "strength":
          skill.base = systemData.spew.str.value;
          break; 
        case "perception":
          skill.base = systemData.spew.per.value;
          break; 
        case "empathy":
          skill.base = systemData.spew.emp.value;
          break; 
        case "willpower":
          skill.base = systemData.spew.wil.value;
          break; 
      }
      switch (skill.supporting)
      {
        case "strength":
          skill.base += systemData.spew.str.mod; 
          break; 
        case "perception":
          skill.base += systemData.spew.per.mod;
          break; 
        case "empathy":
          skill.base += systemData.spew.emp.mod;
          break; 
        case "willpower":
          skill.base += systemData.spew.wil.mod;
          break; 
      }
      //TODO: Add bonus based on advancement level
      if (skill.advancement == 0)
      {
        skill.bonus = 0;
      }
      // Add skills' compenidum UUID
      skill.uuid = game.i18n.localize(CONFIG.OUTBREAKUNDEAD2E.skillsUUID[key])
    }
    // Trained Skills
    for (let [key, skill] of Object.entries(systemData.skills.trained))
    {
      switch (skill.primary)
      {
        case "strength":
          skill.base = systemData.spew.str.value;
          break; 
        case "perception":
          skill.base = systemData.spew.per.value;
          break; 
        case "empathy":
          skill.base = systemData.spew.emp.value;
          break; 
        case "willpower":
          skill.base = systemData.spew.wil.value;
          break; 
      }
      switch (skill.supporting)
      {
        case "strength":
          skill.base += systemData.spew.str.mod; 
          break; 
        case "perception":
          skill.base += systemData.spew.per.mod;
          break; 
        case "empathy":
          skill.base += systemData.spew.emp.mod;
          break; 
        case "willpower":
          skill.base += systemData.spew.wil.mod;
          break; 
      }
      //TODO: Add bonus based on advancement level
      if (skill.advancement == 0)
      {
        skill.bonus = 0;
      }
      // Add skills' compenidum UUID
      skill.uuid = game.i18n.localize(CONFIG.OUTBREAKUNDEAD2E.skillsUUID[key])
    }
    // Expert Skills
    for (let [key, skill] of Object.entries(systemData.skills.expert))
    {
      switch (skill.primary)
      {
        case "strength":
          skill.base = systemData.spew.str.mod;
          break; 
        case "perception":
          skill.base = systemData.spew.per.mod;
          break; 
        case "empathy":
          skill.base = systemData.spew.emp.mod;
          break; 
        case "willpower":
          skill.base = systemData.spew.wil.mod;
          break; 
      }
      switch (skill.supporting)
      {
        case "strength":
          skill.base += systemData.spew.str.mod; 
          break; 
        case "perception":
          skill.base += systemData.spew.per.mod;
          break; 
        case "empathy":
          skill.base += systemData.spew.emp.mod;
          break; 
        case "willpower":
          skill.base += systemData.spew.wil.mod;
          break; 
      }
      //TODO: Add bonus based on advancement level
      if (skill.advancement == 0)
      {
        skill.bonus = 0;
      }
      // Add skills' compenidum UUID
      skill.uuid = game.i18n.localize(CONFIG.OUTBREAKUNDEAD2E.skillsUUID[key])
    }
  }

  /**
   * Prepare NPC type specific data.
   */
  _prepareNpcData(actorData) {
    if (actorData.type !== 'npc') return;

    // Make modifications to data here. For example:
    const systemData = actorData.system;
    //systemData.xp = (systemData.cr * systemData.cr) * 100;
  }

  /**
   * Override getRollData() that's supplied to rolls.
   */
  getRollData() {
    const data = super.getRollData();

    // Prepare character roll data.
    this._getCharacterRollData(data);
    this._getNpcRollData(data);

    return data;
  }

  /**
   * Prepare character roll data.
   */
  _getCharacterRollData(data) {
    if (this.type !== 'character') {
      return
    };

    // Copy the spew scores to the top level, so that rolls can use
    // formulas like `@str.mod + 4`.
    if (data.spew) {
      for (let [k, v] of Object.entries(data.spew)) {
        data[k] = foundry.utils.deepClone(v);
      }
    }
  }

  /**
   * Prepare NPC roll data.
   */
  _getNpcRollData(data) {
    if (this.type !== 'npc') return;

    // Process additional NPC data here.
  }

}