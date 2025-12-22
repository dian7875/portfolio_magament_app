import type { CardData, CardActionType } from "../types/CardType";

export function getVisibleCardActions(data: CardData): CardActionType[] {
  return data.actions.filter((action) => {
    if (action === "hide" && data.hidden) return false;
    if (action === "restore" && !data.hidden) return false;
    return true;
  });
}

export function getActions(hidden: boolean): CardActionType[] {
  return hidden ? ["edit", "restore", "delete"] : ["edit", "hide", "delete"];
}
