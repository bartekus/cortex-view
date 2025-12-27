import type { Route } from "./+types/home";
import { useEffect, useMemo, useState } from "react";
import { invoke } from "@tauri-apps/api/core";

/**
 * UI Integration Guide: Cortex MCP Snapshot/Workspace Tools
 * Single-page stub UI that matches the guide's workflows.
 *
 * Notes:
 * - This file intentionally keeps everything in one place.
 * - The "client" wrapper is defined inline so you can later extract it cleanly.
 * - All backend calls are stubbed, but shaped for real MCP tool wiring.
 */

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Cortex View | Snapshot + Workspace" },
    { name: "description", content: "Tauri UI stub for Cortex MCP snapshot/workspace tools" },
  ];
}

type Mode = "worktree" | "snapshot";

type CacheHint = "until_dirty" | "immutable";

type SnapshotContext = {
  mode: Mode;
  snapshot_id?: string;
  lease_id?: string;
  repo_root?: string;
  cache_hint?: CacheHint;
};

type Entry = {
  path: string;
  kind: "file" | "dir";
  size?: number;
};

type ListResponse = SnapshotContext & {
  entries: Entry[];
};

type FileResponse = SnapshotContext & {
  path: string;
  content: string;
};

type DiffResponse = SnapshotContext & {
  path?: string;
  diff: string;
};

type ApplyPatchResponse = SnapshotContext & {
  // In snapshot mode, this should be a NEW snapshot_id.
  // In worktree mode, files are mutated and lease_id should rotate.
  applied: boolean;
};

type PatchInput = {
  patch: string;
  // optional, for snapshot mode "branching"
  base_snapshot_id?: string;
};

type ToastKind = "info" | "ok" | "warn" | "err";
type Toast = { kind: ToastKind; msg: string };

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

function shortId(id?: string) {
  if (!id) return "";
  if (id.length <= 18) return id;
  return `${id.slice(0, 10)}…${id.slice(-6)}`;
}

function nowTs() {
  const d = new Date();
  return d.toLocaleString();
}

type McpEnvelope =
  | { ok: true; result: unknown }
  | { ok: false; error: { code: string; message: string; details?: unknown } };

type McpToolName = "snapshot.list" | "snapshot.file" | "snapshot.diff" | "workspace.apply_patch";

export default function Home() {
  /**
   * Minimal inline "client" wrapper.
   * Replace the `stub*` bodies with real `invoke("mcp_call", { ... })` later.
   */
  const mcp = useMemo(() => {
    async function mcpCall(tool: McpToolName, args: Record<string, unknown>): Promise<McpEnvelope> {
      return invoke<McpEnvelope>("cortex_mcp_call", { tool, args });
    }

    async function snapshot_list(ctx: SnapshotContext): Promise<McpEnvelope> {
      return mcpCall("snapshot.list", {
        mode: ctx.mode,
        snapshot_id: ctx.snapshot_id,
        lease_id: ctx.lease_id,
      });
    }

    async function snapshot_file(ctx: SnapshotContext, path: string): Promise<McpEnvelope> {
      return mcpCall("snapshot.file", {
        mode: ctx.mode,
        snapshot_id: ctx.snapshot_id,
        lease_id: ctx.lease_id,
        path,
      });
    }

    async function snapshot_diff(
      ctx: SnapshotContext,
      args: { path?: string; from_snapshot_id?: string }
    ): Promise<McpEnvelope> {
      return mcpCall("snapshot.diff", {
        mode: ctx.mode,
        snapshot_id: ctx.snapshot_id,
        lease_id: ctx.lease_id,
        path: args.path,
        from_snapshot_id: args.from_snapshot_id,
      });
    }

    async function workspace_apply_patch(ctx: SnapshotContext, input: PatchInput): Promise<McpEnvelope> {
      return mcpCall("workspace.apply_patch", {
        mode: ctx.mode,
        snapshot_id: ctx.snapshot_id,
        lease_id: ctx.lease_id,
        patch: input.patch,
      });
    }

    return { snapshot_list, snapshot_file, snapshot_diff, workspace_apply_patch };
  }, []);

  // ----------------------------
  // UI state
  // ----------------------------
  const [mode, setMode] = useState<Mode>("worktree");

  // "current context" used for tool calls
  const [repoRoot, setRepoRoot] = useState<string>("");
  const [leaseId, setLeaseId] = useState<string>("");
  const [snapshotId, setSnapshotId] = useState<string>("");

  // snapshot mode browsing: choose a target snapshot id
  const [snapshotBrowseId, setSnapshotBrowseId] = useState<string>("");

  // list and selection
  const [entries, setEntries] = useState<Entry[]>([]);
  const [selectedPath, setSelectedPath] = useState<string>("");

  // file + diff panes
  const [fileContent, setFileContent] = useState<string>("");
  const [diffText, setDiffText] = useState<string>("");

  // patching
  const [patchText, setPatchText] = useState<string>(
    [
      "diff --git a/README.md b/README.md",
      "index 0000000..1111111 100644",
      "--- a/README.md",
      "+++ b/README.md",
      "@@ -1,1 +1,2 @@",
      "-Hello",
      "+Hello",
      "+Preview patch line",
      "",
    ].join("\n")
  );

  // "preview" result snapshot_id when applying patch in snapshot mode
  const [previewSnapshotId, setPreviewSnapshotId] = useState<string>("");

  // status and toasts
  const [busy, setBusy] = useState<boolean>(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  function pushToast(kind: ToastKind, msg: string) {
    setToasts((t) => [{ kind, msg }, ...t].slice(0, 5));
  }

  function currentCtx(): SnapshotContext {
    if (mode === "worktree") {
      return { mode, lease_id: leaseId || undefined, snapshot_id: snapshotId || undefined };
    }
    // snapshot mode uses snapshotBrowseId (or previewSnapshotId if user switched)
    const sid = snapshotBrowseId || snapshotId || undefined;
    return { mode, snapshot_id: sid };
  }

  function setCtxFrom(res: SnapshotContext) {
    if (res.repo_root) setRepoRoot(res.repo_root);
    if (res.snapshot_id) setSnapshotId(res.snapshot_id);
    if (res.lease_id) setLeaseId(res.lease_id);
  }

  function handleMcpEnvelope(env: McpEnvelope, contextMsg?: string) {
    if (env.ok) return { ok: true as const, result: env.result };

    const code = env.error.code;
    const msg = contextMsg ? `${contextMsg}: ${code}: ${env.error.message}` : `${code}: ${env.error.message}`;

    if (code === "STALE_LEASE") {
      setLeaseId("");
      pushToast("warn", "Stale lease. Refresh list to obtain a new lease.");
      return { ok: false as const };
    }

    pushToast("err", msg);
    return { ok: false as const };
  }

  async function refreshList() {
    setBusy(true);
    setDiffText("");
    setFileContent("");
    setSelectedPath("");
    try {
      const ctx = currentCtx();
      const env = await mcp.snapshot_list(ctx);
      const handled = handleMcpEnvelope(env, "snapshot.list");
      if (!handled.ok) return;

      const res = handled.result as ListResponse;
      setCtxFrom(res);
      setEntries(res.entries);
      pushToast("ok", `Listed ${res.entries.length} entries (${res.mode}, cache: ${res.cache_hint ?? "?"}).`);
    } catch (e: any) {
      pushToast("err", `Transport error: ${e?.message ?? String(e)}`);
    } finally {
      setBusy(false);
    }
  }

  async function openFile(path: string) {
    setBusy(true);
    try {
      const ctx = currentCtx();
      const env = await mcp.snapshot_file(ctx, path);
      const handled = handleMcpEnvelope(env, "snapshot.file");
      if (!handled.ok) return;

      const res = handled.result as FileResponse;
      setCtxFrom(res);
      setSelectedPath(path);
      setFileContent(res.content);
      pushToast("ok", `Opened ${path}`);
    } catch (e: any) {
      pushToast("err", `Transport error: ${e?.message ?? String(e)}`);
    } finally {
      setBusy(false);
    }
  }

  async function runDiff() {
    setBusy(true);
    try {
      const ctx = currentCtx();
      const env = await mcp.snapshot_diff(ctx, {
        path: selectedPath || undefined,
        from_snapshot_id: undefined,
      });
      const handled = handleMcpEnvelope(env, "snapshot.diff");
      if (!handled.ok) return;

      const res = handled.result as DiffResponse;
      setCtxFrom(res);
      setDiffText(res.diff);
      pushToast("ok", `Diff generated${selectedPath ? ` for ${selectedPath}` : ""}`);
    } catch (e: any) {
      pushToast("err", `Transport error: ${e?.message ?? String(e)}`);
    } finally {
      setBusy(false);
    }
  }

  async function applyPatchLive() {
    setBusy(true);
    try {
      const ctx: SnapshotContext = { mode: "worktree", lease_id: leaseId || undefined, snapshot_id: snapshotId || undefined };
      const env = await mcp.workspace_apply_patch(ctx, { patch: patchText });
      const handled = handleMcpEnvelope(env, "workspace.apply_patch(worktree)");
      if (!handled.ok) return;

      const res = handled.result as ApplyPatchResponse;
      setCtxFrom(res);
      pushToast("ok", `Applied patch to worktree. New lease: ${shortId(res.lease_id)}`);
      // Worktree changed, refresh list for the new "version tag"
      await refreshList();
    } catch (e: any) {
      pushToast("err", `Transport error: ${e?.message ?? String(e)}`);
    } finally {
      setBusy(false);
    }
  }

  async function previewPatchSnapshot() {
    setBusy(true);
    try {
      if (!snapshotBrowseId && !snapshotId) {
        pushToast("warn", "Set a base snapshot_id first (Snapshot Mode) to preview a patch.");
        return;
      }
      const base = snapshotBrowseId || snapshotId;
      const ctx: SnapshotContext = { mode: "snapshot", snapshot_id: base };
      const env = await mcp.workspace_apply_patch(ctx, { patch: patchText, base_snapshot_id: base });
      const handled = handleMcpEnvelope(env, "workspace.apply_patch(snapshot)");
      if (!handled.ok) return;

      const res = handled.result as ApplyPatchResponse;
      setCtxFrom(res);
      setPreviewSnapshotId(res.snapshot_id ?? "");
      pushToast("ok", `Preview snapshot created: ${shortId(res.snapshot_id)}`);
    } catch (e: any) {
      pushToast("err", `Transport error: ${e?.message ?? String(e)}`);
    } finally {
      setBusy(false);
    }
  }

  function switchToPreview() {
    if (!previewSnapshotId) return;
    setSnapshotBrowseId(previewSnapshotId);
    pushToast("info", `Switched browsing to preview snapshot: ${shortId(previewSnapshotId)}`);
  }

  function invalidateWorktreeCaches() {
    // UI-level "until_dirty" strategy: clear views, keep ids
    setEntries([]);
    setSelectedPath("");
    setFileContent("");
    setDiffText("");
    pushToast("info", "Invalidated UI caches (until_dirty). Refresh list to re-fetch.");
  }

  // initial load
  useEffect(() => {
    void refreshList();
    // non-exhaustive-deps
  }, [mode]);

  // ----------------------------
  // UI
  // ----------------------------
  return (
    <main style={{ padding: 16, fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto" }}>
      <header style={{ display: "flex", gap: 12, alignItems: "center", justifyContent: "space-between", flexWrap: "wrap" }}>
        <div>
          <div style={{ fontSize: 20, fontWeight: 700 }}>Cortex MCP UI Stub</div>
          <div style={{ opacity: 0.75, fontSize: 13 }}>
            Snapshot + Worktree integration workflows (browse, file, diff, patch apply, patch preview)
          </div>
        </div>

        <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
          <ModeToggle mode={mode} setMode={setMode} disabled={busy} />
          <button onClick={() => void refreshList()} disabled={busy} style={btnPrimary} title="snapshot.list">
            Refresh list
          </button>
          {mode === "worktree" ? (
            <button onClick={invalidateWorktreeCaches} disabled={busy} style={btn}>
              Invalidate caches
            </button>
          ) : null}
        </div>
      </header>

      <section style={{ marginTop: 12, display: "grid", gridTemplateColumns: "1fr", gap: 12 }}>
        <Card title="Context">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 10 }}>
            <Info label="mode" value={mode} span={3} />
            <Info label="repo_root" value={repoRoot || "(unknown)"} span={9} />
            <Info label="snapshot_id" value={snapshotId ? `${snapshotId} (${shortId(snapshotId)})` : "(none)"} span={7} />
            <Info
              label="lease_id"
              value={mode === "worktree" ? (leaseId ? `${leaseId} (${shortId(leaseId)})` : "(none)") : "(n/a)"}
              span={5}
            />
          </div>

          {mode === "snapshot" ? (
            <div style={{ marginTop: 12, display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 10 }}>
              <div style={{ gridColumn: "span 8" }}>
                <div style={label}>Browse snapshot_id</div>
                <input
                  value={snapshotBrowseId}
                  onChange={(e) => setSnapshotBrowseId(e.currentTarget.value)}
                  placeholder="sha256:... (optional; if empty uses current snapshot_id)"
                  style={input}
                />
                <div style={{ marginTop: 6, opacity: 0.75, fontSize: 12 }}>Time travel: set a snapshot_id and hit Refresh list.</div>
              </div>

              <div style={{ gridColumn: "span 4" }}>
                <div style={label}>Patch preview snapshot_id</div>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <input value={previewSnapshotId} readOnly placeholder="(none)" style={input} />
                  <button onClick={switchToPreview} disabled={!previewSnapshotId || busy} style={btn}>
                    Switch
                  </button>
                </div>
                <div style={{ marginTop: 6, opacity: 0.75, fontSize: 12 }}>
                  Created by apply_patch(snapshot). Switch to browse it.
                </div>
              </div>
            </div>
          ) : null}
        </Card>

        <div style={{ display: "grid", gridTemplateColumns: "360px 1fr", gap: 12, alignItems: "start" }}>
          <Card title="Browse">
            <div style={{ display: "flex", gap: 8, marginBottom: 10, flexWrap: "wrap" }}>
              <button onClick={() => void refreshList()} disabled={busy} style={btn} title="snapshot.list">
                snapshot.list
              </button>
              <button onClick={() => void runDiff()} disabled={busy} style={btn} title="snapshot.diff">
                snapshot.diff
              </button>
            </div>

            <div style={{ fontSize: 12, opacity: 0.75, marginBottom: 6 }}>
              Click a file to open. Directories are shown but not expanded in this stub.
            </div>

            <div style={listBox}>
              {entries.length === 0 ? (
                <div style={{ opacity: 0.7, fontSize: 13 }}>No entries loaded.</div>
              ) : (
                entries.map((e) => (
                  <button
                    key={e.path}
                    onClick={() => (e.kind === "file" ? void openFile(e.path) : pushToast("info", `Dir selected: ${e.path}`))}
                    // style={`${cx(itemBtn, selectedPath === e.path && e.kind === "file" ? itemBtnActive : "")}`}
                    disabled={busy}
                    title={e.path}
                  >
                    <span style={{ width: 18, opacity: 0.75 }}>{e.kind === "dir" ? "📁" : "📄"}</span>
                    <span style={{ flex: 1, textAlign: "left" }}>{e.path}</span>
                    {typeof e.size === "number" ? <span style={{ opacity: 0.6, fontSize: 12 }}>{e.size}b</span> : null}
                  </button>
                ))
              )}
            </div>
          </Card>

          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 12 }}>
            <Card title="File">
              <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap", marginBottom: 10 }}>
                <div style={{ fontSize: 13, opacity: 0.8 }}>{selectedPath ? `Path: ${selectedPath}` : "No file selected"}</div>
                <div style={{ flex: 1 }} />
                <button
                  onClick={() => (selectedPath ? void openFile(selectedPath) : pushToast("warn", "Select a file first."))}
                  disabled={busy || !selectedPath}
                  style={btn}
                  title="snapshot.file"
                >
                  Reload file
                </button>
              </div>

              <textarea readOnly value={fileContent} placeholder="File contents will appear here" style={textarea} />
            </Card>

            <Card title="Diff">
              <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap", marginBottom: 10 }}>
                <div style={{ fontSize: 13, opacity: 0.8 }}>
                  {selectedPath ? `Target: ${selectedPath}` : "Target: (repo-level diff in stub)"}
                </div>
                <div style={{ flex: 1 }} />
                <button onClick={() => void runDiff()} disabled={busy} style={btn} title="snapshot.diff">
                  Generate diff
                </button>
              </div>

              <textarea readOnly value={diffText} placeholder="Diff output will appear here" style={textarea} />
            </Card>

            <Card title="Patching / Editing">
              <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 10 }}>
                <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                  <button
                    onClick={() => void applyPatchLive()}
                    disabled={busy || mode !== "worktree"}
                    style={btnPrimary}
                    title='workspace.apply_patch(mode="worktree")'
                  >
                    Apply patch (worktree)
                  </button>

                  <button
                    onClick={() => void previewPatchSnapshot()}
                    disabled={busy || mode !== "snapshot"}
                    style={btnPrimary}
                    title='workspace.apply_patch(mode="snapshot")'
                  >
                    Preview patch (snapshot)
                  </button>

                  <div style={{ fontSize: 12, opacity: 0.75 }}>
                    Worktree applies to disk and rotates lease. Snapshot creates a new immutable snapshot_id.
                  </div>
                </div>

                <textarea
                  value={patchText}
                  onChange={(e) => setPatchText(e.currentTarget.value)}
                  placeholder="Paste unified diff patch here"
                  style={textarea}
                />
              </div>
            </Card>
          </div>
        </div>

        <Card title="Events">
          <div style={{ display: "grid", gap: 8 }}>
            {toasts.length === 0 ? (
              <div style={{ opacity: 0.7, fontSize: 13 }}>No events yet.</div>
            ) : (
              toasts.map((t, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: "8px 10px",
                    borderRadius: 10,
                    border: "1px solid rgba(0,0,0,0.12)",
                    background:
                      t.kind === "ok"
                        ? "rgba(0, 128, 0, 0.06)"
                        : t.kind === "err"
                          ? "rgba(255, 0, 0, 0.06)"
                          : t.kind === "warn"
                            ? "rgba(255, 165, 0, 0.08)"
                            : "rgba(0,0,0,0.03)",
                    fontSize: 13,
                  }}
                >
                  <strong style={{ textTransform: "uppercase", marginRight: 8 }}>{t.kind}</strong>
                  {t.msg}
                </div>
              ))
            )}
          </div>
        </Card>
      </section>

      <footer style={{ marginTop: 14, fontSize: 12, opacity: 0.65 }}>
        Cache semantics: worktree results are <code>until_dirty</code>; snapshot results are <code>immutable</code>.
      </footer>
    </main>
  );
}

// ----------------------------
// Small UI components
// ----------------------------
function ModeToggle(props: { mode: Mode; setMode: (m: Mode) => void; disabled?: boolean }) {
  const { mode, setMode, disabled } = props;
  return (
    <div style={{ display: "flex", border: "1px solid rgba(0,0,0,0.14)", borderRadius: 12, overflow: "hidden" }}>
      <button
        onClick={() => setMode("worktree")}
        disabled={disabled}
        style={{
          ...btnSegment,
          background: mode === "worktree" ? "rgba(0,0,0,0.06)" : "transparent",
          fontWeight: mode === "worktree" ? 700 : 500,
        }}
        title='mode="worktree"'
      >
        Worktree
      </button>
      <button
        onClick={() => setMode("snapshot")}
        disabled={disabled}
        style={{
          ...btnSegment,
          background: mode === "snapshot" ? "rgba(0,0,0,0.06)" : "transparent",
          fontWeight: mode === "snapshot" ? 700 : 500,
        }}
        title='mode="snapshot"'
      >
        Snapshot
      </button>
    </div>
  );
}

function Card(props: { title: string; children: React.ReactNode }) {
  return (
    <section
      style={{
        border: "1px solid rgba(0,0,0,0.14)",
        borderRadius: 14,
        padding: 12,
        background: "white",
      }}
    >
      <div style={{ fontWeight: 700, marginBottom: 10 }}>{props.title}</div>
      {props.children}
    </section>
  );
}

function Info(props: { label: string; value: string; span?: number }) {
  return (
    <div style={{ gridColumn: `span ${props.span ?? 6}` }}>
      <div style={label}>{props.label}</div>
      <div style={{ fontSize: 13, padding: "8px 10px", borderRadius: 10, border: "1px solid rgba(0,0,0,0.12)" }}>{props.value}</div>
    </div>
  );
}

// ----------------------------
// Styles
// ----------------------------
const label: React.CSSProperties = { fontSize: 12, opacity: 0.7, marginBottom: 4 };

const input: React.CSSProperties = {
  width: "100%",
  padding: "9px 10px",
  borderRadius: 10,
  border: "1px solid rgba(0,0,0,0.16)",
  outline: "none",
  fontSize: 13,
};

const textarea: React.CSSProperties = {
  width: "100%",
  minHeight: 160,
  padding: 10,
  borderRadius: 12,
  border: "1px solid rgba(0,0,0,0.16)",
  outline: "none",
  fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  fontSize: 12.5,
  lineHeight: 1.35,
};

const btn: React.CSSProperties = {
  padding: "9px 12px",
  borderRadius: 12,
  border: "1px solid rgba(0,0,0,0.16)",
  background: "white",
  cursor: "pointer",
  fontSize: 13,
};

const btnPrimary: React.CSSProperties = {
  ...btn,
  border: "1px solid rgba(0,0,0,0.22)",
  background: "rgba(0,0,0,0.06)",
  fontWeight: 700,
};

const btnSegment: React.CSSProperties = {
  padding: "9px 12px",
  border: "none",
  background: "transparent",
  cursor: "pointer",
  fontSize: 13,
};

const listBox: React.CSSProperties = {
  display: "grid",
  gap: 6,
  padding: 8,
  borderRadius: 12,
  border: "1px solid rgba(0,0,0,0.12)",
  maxHeight: 420,
  overflow: "auto",
};

const itemBtn: React.CSSProperties = {
  display: "flex",
  gap: 8,
  alignItems: "center",
  padding: "8px 10px",
  borderRadius: 10,
  border: "1px solid rgba(0,0,0,0.10)",
  background: "white",
  cursor: "pointer",
  fontSize: 13,
};

const itemBtnActive: React.CSSProperties = {
  background: "rgba(0,0,0,0.06)",
  border: "1px solid rgba(0,0,0,0.18)",
};
