import type { Route } from "./+types/about";

export function meta({}: Route.MetaArgs) {
  return [{ title: "About | Cortex View" }, { name: "description", content: "System info" }];
}

export default function About() {
  return (
    <div className="p-4 space-y-4">
      <h2 className="text-2xl font-bold tracking-tight">About</h2>
      <p className="text-muted-foreground">Cortex View v0.1.0</p>
    </div>
  );
}
