# OutbreakUndead2e System

![Foundry v11](https://img.shields.io/badge/foundry-v11-green)

This system is the outbreakundead2e system made by DrTrog. 

## System TODOS
# Actor
TODO: Clicking on skill:
        - Print DC and skill description to chat
        - Roll d100
TODO: Clicking on SPEW attribute
        - Check option 
        - Save option
TODO: Triggered Effects Tab
TODO: Character Traits Tab
TODO: Equipment Tab
TODO: Effects Tab
TODO: Survivalist Stuff??

# Compendiums
TODO: Skills, Fill out descriptions and components
        - Trained
        - Expert
TODO: Skills, Create components
        - Dice Pools
        - Triggered Effects
        - Modifiers
TODO: Items


TODO: Dice Pool Integration https://foundryvtt.com/article/dice-advanced/




## Usage

Before installing this system, you should rename any files that have `outbreakundead2e` in their filename to use whatever machine-safe name your system needs, such as `adnd2e` if you were building a system for 2nd edition Advanced Dungeons & Dragons. In addition, you should search through the files for `outbreakundead2e` and `OutbreakUndead2e` and do the same for those, replacing them with appropriate names for your system.

A system's ID _must_ match its containing folder, and once you've published your system it cannot be changed. It also must be unique within the foundry ecosystem. Choose wisely!

### System Generator

This project is also available as generator that can be run with npm: https://www.npmjs.com/package/generator-foundry

### Vue 3 OutbreakUndead2e

Alternatively, there's another build of this system that supports using Vue 3 components (ES module build target) for character sheet templates.

Head over to the [Vue3OutbreakUndead2e System](https://gitlab.com/asacolips-projects/foundry-mods/vue3outbreakundead2e) repo if you're interested in using Vue!

### Getting Help

Check out the [Official Foundry VTT Discord](https://discord.gg/foundryvtt)! The #system-development channel has helpful pins and is a good place to ask questions about any part of the foundry application.

For more static references, the [Knowledge Base](https://foundryvtt.com/kb/) and [API Documentation](https://foundryvtt.com/api/) provide different levels of detail. For the most detail, you can find the client side code in your foundry installation location. Classes are documented in individual files under `resources/app/client` and `resources/app/common`, and the code is collated into a single file at `resources/app/public/scripts/foundry.js`.

#### Tutorial

For much more information on how to use this system as a starting point for making your own, see the [full tutorial on the Foundry Wiki](https://foundryvtt.wiki/en/development/guides/SD-tutorial)!

Note: Tutorial may be out of date

## Sheet Layout

This system includes a handful of helper CSS classes to help you lay out your sheets if you're not comfortable diving into CSS fully. Those are:

- `flexcol`: Included by Foundry itself, this lays out the child elements of whatever element you place this on vertically.
- `flexrow`: Included by Foundry itself, this lays out the child elements of whatever element you place this on horizontally.
- `flex-center`: When used on something that's using flexrow or flexcol, this will center the items and text.
- `flex-between`: When used on something that's using flexrow or flexcol, this will attempt to place space between the items. Similar to "justify" in word processors.
- `flex-group-center`: Add a border, padding, and center all items.
- `flex-group-left`: Add a border, padding, and left align all items.
- `flex-group-right`: Add a border, padding, and right align all items.
- `grid`: When combined with the `grid-Ncol` classes, this will lay out child elements in a grid.
- `grid-Ncol`: Replace `N` with any number from 1-12, such as `grid-3col`. When combined with `grid`, this will layout child elements in a grid with a number of columns equal to the number specified.

## Compiling the CSS

This repo includes both CSS for the theme and SCSS source files. If you're new to CSS, it's probably easier to just work in those files directly and delete the SCSS directory. If you're interested in using a CSS preprocessor to add support for nesting, variables, and more, you can run `npm install` in this directory to install the dependencies for the scss compiler. After that, just run `npm run gulp` to compile the SCSS and start a process that watches for new changes.

![image](http://mattsmith.in/images/outbreakundead2e.png)
