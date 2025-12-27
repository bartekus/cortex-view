import type { Route } from "./+types/settings";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Settings | Cortex View" }, { name: "description", content: "App configuration" }];
}

export default function Settings() {
  return (
    <div className="p-4 space-y-4">
      <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
      <p className="text-muted-foreground">Manage your application preferences here.</p>
    </div>
  );
}
