import { Home, Settings, Info, type LucideIcon } from "lucide-react";

export interface ViewMeta {
  id: string;
  path: string;
  label: string;
  icon?: LucideIcon;
  description?: string;
}

export const VIEW_REGISTRY: ViewMeta[] = [
  {
    id: "home",
    path: "/",
    label: "Home",
    icon: Home,
    description: "Dashboard overview",
  },
  {
    id: "settings",
    path: "/settings",
    label: "Settings",
    icon: Settings,
    description: "Application preferences",
  },
  {
    id: "about",
    path: "/about",
    label: "About",
    icon: Info,
    description: "System information",
  },
];

export function getViewByPath(path: string): ViewMeta | undefined {
  return VIEW_REGISTRY.find((v) => v.path === path);
}
