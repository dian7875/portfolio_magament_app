import type { SidebarItem } from "./sidebarType";

export const SIDEBAR_ITEMS: SidebarItem[] = [
  { label: "Mi perfil", icon: "pi pi-user", path: "/profile" },

  { label: "Lenguajes", icon: "pi pi-language", path: "/languages" },
  { label: "Habilidades", icon: "pi pi-star", path: "/skills" },
  { label: "Educación", icon: "pi pi-book", path: "/education" },
  {
    label: "Experiencia laboral",
    icon: "pi pi-briefcase",
    path: "/experience",
  },
  { label: "Proyectos", icon: "pi pi-folder", path: "/projects" },
  { label: "Gestión de redes", icon: "pi pi-share-alt", path: "/social" },
];
