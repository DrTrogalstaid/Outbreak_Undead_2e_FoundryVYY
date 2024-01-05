import * as Dice from "./dice.mjs";

export function addChatListeners(html) {
    html.on("click", "button.skill", onSkill);

}

function onSkill(event) {
    
    
    
    const card = event.currentTarget.closest(".skill");
    let player = game.actors.get(card.dataset.itemId);
    let skill = player.getOwnedItem(card.dataset.itemId);
}