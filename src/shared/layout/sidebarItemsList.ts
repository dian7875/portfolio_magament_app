import type { SidebarItem } from "./sidebarType";

export const SIDEBAR_ITEMS: SidebarItem[] = [
  { label: "Mi perfil", icon: "pi pi-user", path: "/usuario" },

  { label: "Idiomas", icon: "pi pi-language", path: "/idiomas" },
  { label: "Habilidades", icon: "pi pi-star", path: "/habilidades" },
  { label: "Educación", icon: "pi pi-book", path: "/educacion" },
  {
    label: "Experiencia laboral",
    icon: "pi pi-briefcase",
    path: "/experiencia",
  },
  { label: "Proyectos", icon: "pi pi-folder", path: "/proyectos" },
  {
    label: "Gestión de redes",
    icon: "pi pi-share-alt",
    path: "/redes-sociales",
  },
];
