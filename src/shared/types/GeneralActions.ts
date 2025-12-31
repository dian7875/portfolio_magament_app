export type GeneralAction = "delete" | "hide" | "restore";


export const actionLabelMap: Record<GeneralAction, string> = {
  delete: "eliminar",
  hide: "ocultar",
  restore: "restaurar",
};
