import * as React from "react";
import { Link, useLocation } from "react-router";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { useTheme } from "@/components/theme-provider";
import { Menu, Moon, Sun, Monitor, PanelLeft } from "lucide-react";

export function AppShell({ children }: { children: React.ReactNode }) {
  // Simple cookie persistence
  const [isSidebarOpen, setIsSidebarOpenState] = React.useState(() => {
    if (typeof document !== "undefined") {
      const match = document.cookie.match(new RegExp("(^| )sidebar_open=([^;]+)"));
      if (match) return match[2] === "true";
    }
    return true;
  });

  const setIsSidebarOpen = (info: boolean) => {
    setIsSidebarOpenState(info);
    document.cookie = `sidebar_open=${info}; path=/; max-age=31536000`;
  };

  return (
    <div className="flex h-screen w-full flex-col bg-background text-foreground md:flex-row">
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "hidden border-r bg-muted/40 transition-all duration-300 md:flex md:flex-col",
          isSidebarOpen ? "w-64" : "w-0 opacity-0 overflow-hidden"
        )}
      >
        <SidebarContent />
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header isSidebarOpen={isSidebarOpen} onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useTranslation } from "react-i18next";
import { Languages } from "lucide-react";

function Header({ isSidebarOpen, onToggleSidebar }: { isSidebarOpen: boolean; onToggleSidebar: () => void }) {
  const { theme, setTheme } = useTheme();
  const { i18n } = useTranslation();

  return (
    <header className="flex h-14 items-center justify-between border-b px-4 lg:h-[60px]">
      <div className="flex items-center gap-4">
        {/* Mobile Sidebar Trigger */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <SidebarContent />
          </SheetContent>
        </Sheet>

        {/* Desktop Sidebar Toggle */}
        <Button variant="ghost" size="icon" className="hidden md:flex" onClick={onToggleSidebar}>
          <PanelLeft className="h-5 w-5" />
        </Button>

        <h1 className="text-lg font-semibold">Cortex View</h1>
      </div>

      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Languages className="h-[1.2rem] w-[1.2rem]" />
              <span className="sr-only">Switch language</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => i18n.changeLanguage("en")}>English</DropdownMenuItem>
            <DropdownMenuItem onClick={() => i18n.changeLanguage("es")}>Español</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </div>
    </header>
  );
}

import { VIEW_REGISTRY } from "@/lib/views";

function SidebarContent() {
  const location = useLocation();

  return (
    <div className="flex h-full flex-col">
      <div className="flex h-14 items-center border-b px-4 lg:h-[60px]">
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <Monitor className="h-6 w-6" />
          <span>App</span>
        </Link>
      </div>
      <ScrollArea className="flex-1">
        <nav className="grid gap-1 p-2 text-sm font-medium">
          {VIEW_REGISTRY.map((view) => (
            <NavLink key={view.id} to={view.path} active={location.pathname === view.path}>
              {view.icon && <view.icon className="h-4 w-4" />}
              {view.label}
            </NavLink>
          ))}
        </nav>
      </ScrollArea>
      <div className="p-4 border-t">
        <p className="text-xs text-muted-foreground w-full text-center">v0.1.0</p>
      </div>
    </div>
  );
}

function NavLink({ to, children, active }: { to: string; children: React.ReactNode; active?: boolean }) {
  return (
    <Link
      to={to}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
        active ? "bg-muted text-primary" : "text-muted-foreground"
      )}
    >
      {children}
    </Link>
  );
}
