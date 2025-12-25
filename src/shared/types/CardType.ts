import type { FwbColor } from "./FwbColors";

export const CARD_ACTIONS = ["delete", "hide", "restore", "edit"] as const;

export type CardActionType = (typeof CARD_ACTIONS)[number];

export type CardActionMeta = {
  label: string;
  icon: string;
  color: FwbColor;
  disabled?: boolean;
};

export const CARD_ACTION_META: Record<CardActionType, CardActionMeta> = {
  delete: {
    label: "Eliminar",
    icon: "trash",
    color: "red",
  },
  hide: {
    label: "Ocultar",
    icon: "eye-slash",
    color: "yellow",
  },
  restore: {
    label: "Restaurar",
    icon: "undo",
    color: "green",
  },
  edit: {
    label: "Editar",
    icon: "pencil",
    color: "alternative",
  },
};

export type CardData = {
  id: string;
  title: string;
  resumen: string | string[];
  hidden: boolean;
  actions: CardActionType[];
};
