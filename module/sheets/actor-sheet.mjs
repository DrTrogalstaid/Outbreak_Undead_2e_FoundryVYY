import {onManageActiveEffect, prepareActiveEffectCategories} from "../helpers/effects.mjs";
//import * as Dice from "../dice.mjs";

/**
 * Extend the basic ActorSheet with some very simple modifications
 * @extends {ActorSheet}
 */
export class OutbreakUndead2eActorSheet extends ActorSheet {

  /** @override */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["outbreakundead2e", "sheet", "actor"],
      template: "systems/outbreakundead2e/templates/actor/actor-sheet.html",
      width: 740,
      height: 700,
      tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "skills" }]
    });
  }

  /** @override */
  get template() {
    return `systems/outbreakundead2e/templates/actor/actor-${this.actor.type}-sheet.hbs`;
  }

  /* -------------------------------------------- */

  /** @override */
  getData() {
    // Retrieve the data structure from the base sheet. You can inspect or log
    // the context variable to see the structure, but some key properties for
    // sheets are the actor object, the data object, whether or not it's
    // editable, the items array, and the effects array.
    const context = super.getData();

    // Use a safe clone of the actor data for further operations.
    const actorData = this.actor.toObject(false);

    // Add the actor's data to context.data for easier access, as well as flags.
    context.system = actorData.system;
    context.flags = actorData.flags;

    // Prepare character data and items.
    if (actorData.type == 'character') {
      this._prepareItems(context);
      this._prepareCharacterData(context);
    }

    // Prepare NPC data and items.
    if (actorData.type == 'npc') {
      this._prepareItems(context);
    }

    // Add roll data for TinyMCE editors.
    context.rollData = context.actor.getRollData();

    // Prepare active effects
    //context.effects = prepareActiveEffectCategories(this.actor.effects);

    return context;
  }

  /**
   * Organize and classify Items for Character sheets.
   *
   * @param {Object} actorData The actor to prepare.
   *
   * @return {undefined}
   */
  _prepareCharacterData(context) {
    // Handle ability scores.
    for (let [k, v] of Object.entries(context.system.abilities)) {
      v.label = game.i18n.localize(CONFIG.OUTBREAKUNDEAD2E.abilities[k]) ?? k;
    }
  }

  /**
   * Organize and classify Items for Character sheets.
   *
   * @param {Object} actorData The actor to prepare.
   *
   * @return {undefined}
   */
  _prepareItems(context) {
    // Initialize containers.
    const gear = [];
    const attributes = [];
    const spells = {
      0: [],
      1: [],
      2: [],
      3: [],
      4: [],
      5: [],
      6: [],
      7: [],
      8: [],
      9: []
    };

    // Iterate through items, allocating to containers
    for (let i of context.items) {
      i.img = i.img || DEFAULT_TOKEN;
      // Append to gear.
      if (i.type === 'item') {
        gear.push(i);
      }
      // Append to attributes.
      else if (i.type === 'feature') {
        attributes.push(i);
      }
      // Append to spells.
      else if (i.type === 'spell') {
        if (i.system.spellLevel != undefined) {
          spells[i.system.spellLevel].push(i);
        }
      }
      // Append to skills.
      else if (i.type === 'spell') {
        if (i.system.skill_level != undefined) {
          skills[i.system.skill_leve].push(i);
        }
      }
    }

    // Assign and return
    context.gear = gear;
    context.attributes = attributes;
    context.spells = spells;
  }

  /* -------------------------------------------- */

  /** @override */
  activateListeners(html) {
    super.activateListeners(html);

    // Render the item sheet for viewing/editing prior to the editable check.
    html.find('.item-edit').click(ev => {
      const li = $(ev.currentTarget).parents(".item");
      const item = this.actor.items.get(li.data("itemId"));
      item.sheet.render(true);
    });

    // -------------------------------------------------------------
    // Everything below here is only needed if the sheet is editable
    if (!this.isEditable) return;

    // Add Inventory Item
    html.find('.item-create').click(this._onItemCreate.bind(this));

    // Delete Inventory Item
    html.find('.item-delete').click(ev => {
      const li = $(ev.currentTarget).parents(".item");
      const item = this.actor.items.get(li.data("itemId"));
      item.delete();
      li.slideUp(200, () => this.render(false));
    });

    // Active Effect management
    html.find(".effect-control").click(ev => onManageActiveEffect(ev, this.actor));

    // Rollable abilities.
    html.find('.rollable').click(this._onRoll.bind(this));

    // Skill Card
    html.find(".skill-card").click(this._onSkillCard.bind(this));
    // Skill Roll
    html.find(".skill-roll").click(this._onSkillRoll.bind(this));


    // Drag events for macros.
    if (this.actor.isOwner) {
      let handler = ev => this._onDragStart(ev);
      html.find('li.item').each((i, li) => {
        if (li.classList.contains("inventory-header")) return;
        li.setAttribute("draggable", true);
        li.addEventListener("dragstart", handler, false);
      });
    }

    // Level of Play Dropdown
    var level_of_play_select = document.getElementById("level_of_play");
    level_of_play_select.addEventListener("change",function(){
      // Set player's level_of_play to the new level_of_play
      console.log(level_of_play_select.value);
    });

    // Spew General Check
    var spew_general_check = document.querySelectorAll(".spew-name");
    spew_general_check.forEach(function(spew_clicked) {
      spew_clicked.addEventListener("click", function(event){
        event.preventDefault()
        // Spew Attribute
        const spew_label = event.currentTarget.innerText;
        const spew_id = event.currentTarget.dataset.label;
        
        //Debug
        //console.log(spew_label);
    
        new Dialog({
          title: `${spew_label} Check`,
          content: `<p>What type of ${spew_label} Check?</p>`,
          buttons: {
            check: {
              label: "Check",
              callback: () => spewRollTest(spew_label, spew_id)
            },
            save: {
              label: "Save"
            }
          }
        }).render(true);

      });

    })


  }

  /**
   * Handle creating a new Owned Item for the actor using initial data defined in the HTML dataset
   * @param {Event} event   The originating click event
   * @private
   */
  async _onItemCreate(event) {
    event.preventDefault();
    const header = event.currentTarget;
    // Get the type of item to create.
    const type = header.dataset.type;
    // Grab any data associated with this control.
    const data = duplicate(header.dataset);
    // Initialize a default name.
    const name = `New ${type.capitalize()}`;
    // Prepare the item object.
    const itemData = {
      name: name,
      type: type,
      system: data
    };
    // Remove the type from the dataset since it's in the itemData.type prop.
    delete itemData.system["type"];

    // Finally, create the item!
    return await Item.create(itemData, {parent: this.actor});
  }

  //-------------------ROLLS--------------------------
  /**
   * Handle clickable rolls.
   * @param {Event} event   The originating click event
   * @private
   */
  _onRoll(event) {
    event.preventDefault();
    const element = event.currentTarget;
    const dataset = element.dataset;

    console.log(element);
    console.log(dataset);

    // Handle Roll Types
    if (dataset.rollType) {
      // item rolls
      if (dataset.rollType == "item") {
        const itemId = element.closest('.item').dataset.itemId;
        const item = this.actor.items.get(itemId);
        console.log(itemId);
        if (item) return item.roll();
      }
      // skill rolls
      // TODO: Give this it's own card for chat!
      else if (dataset.rollType == "skill") {
        let label = dataset.label ? `${dataset.label}` : "";
        let percent_chance = dataset.percentChance;
        let _flavor = label + ": Percent Chance " + percent_chance + "%";
        // TODO: Make a new function in stead of calling getRollData to set the DC
        let roll = new Roll("d100", this.actor.getRollData());
        // TODO: Create an message sheet for Skill checks in stead of using this
        roll.toMessage({
          speaker: ChatMessage.getSpeaker({ actor: this.actor }),
          flavor: _flavor,
          rollMode: game.settings.get('core', 'rollMode'),
        });
      }
    }

    // Handle rolls that supply the formula directly.
    if (dataset.roll) {
      let label = dataset.label ? `${dataset.label}` : '';
      let roll = new Roll(dataset.roll, this.actor.getRollData());
      roll.toMessage({
        speaker: ChatMessage.getSpeaker({ actor: this.actor }),
        flavor: label,
        rollMode: game.settings.get('core', 'rollMode'),
      });
      return roll;
    }
  }

  async _onSkillCard(event) {
    event.preventDefault(event);

    const element = event.currentTarget;
    const dataset = element.dataset;

    let message_content = "@UUID[Compendium.outbreakundead2e.skills.Item." + dataset.itemId + "]{" + dataset.label + "}"

    // Debug
    console.log(dataset);

    //Output Skill card based on UUID
    ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ actor: this.actor }),
      content: message_content
    });
  }

  async _onSkillRoll(event) {
    event.preventDefault();
    
    const element = event.currentTarget;
    const dataset = element.dataset;
    const actorData = this.actor.toObject(false);
    const level_of_play = actorData.system.level_of_play;

    // Debug
    //console.log(dataset);

    // Determine formula based on Level of Play
    // NOTE: Don't need to worry about arcade because they do not have Skills
    let rollFormula;
    if(level_of_play == "survivalist") {
      rollFormula = "1d100";
    }
    else {
      rollFormula = "1d10*10";
    }
    
    // Prepare data for the skill card
    let cardData = {
      label: dataset.label,
      percentChance: dataset.percentChance
    };

    // Roll
    let roll = new Roll(rollFormula, this.actor.getRollData());
    
    // TODO: Create an message sheet for Skill checks in stead of using this
    //ChatMessage.applyRollMode(game.settings.get('core', 'rollMode'))
    
    ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ actor: this.actor }),
      content: await renderTemplate("systems/outbreakundead2e/templates/item/chat/skill-card.hbs", cardData),
      rollMode: game.settings.get('core', 'rollMode'),
      rolls: roll
    });
    

  }

}
