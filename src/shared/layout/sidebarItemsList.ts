import type { SidebarItem } from "./sidebarType";

export const SIDEBAR_ITEMS: SidebarItem[] = [
  { label: "Mi perfil", icon: "pi pi-user", path: "/usuario" },

  { label: "Idiomas", icon: "pi pi-language", path: "/idiomas" },
  { label: "Habilidades", icon: "pi pi-star", path: "/skills" },
  { label: "Educación", icon: "pi pi-book", path: "/educacion" },
  {
    label: "Experiencia laboral",
    icon: "pi pi-briefcase",
    path: "/experience",
  },
  { label: "Proyectos", icon: "pi pi-folder", path: "/projects" },
  { label: "Gestión de redes", icon: "pi pi-share-alt", path: "/social" },
];
