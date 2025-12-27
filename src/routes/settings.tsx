import type { Route } from "./+types/settings";
import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Settings | Cortex View" }, { name: "description", content: "App configuration" }];
}

export default function Settings() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
    setGreetMsg(await invoke("greet", { name }));
  }

  return (
    <main className="container">
      <h1>Settings</h1>
      <div className="p-4 space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">Manage your application preferences here.</p>
        <form
          className="row"
          onSubmit={(e) => {
            e.preventDefault();
            void greet();
          }}
        >
          <input id="greet-input" onChange={(e) => setName(e.currentTarget.value)} placeholder="Enter a name..." />
          <button type="submit">Greet</button>
        </form>
        <p>{greetMsg}</p>
      </div>
    </main>
  );
}
