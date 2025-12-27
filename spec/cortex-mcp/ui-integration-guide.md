# UI Integration Guide: Cortex MCP Snapshot/Workspace Tools

This guide outlines how UI clients (like Tauri v2 or IDE extensions) should interact with the Cortex MCP tools, specifically regarding the "Snapshot" and "Worktree" modes.

## Core Concepts

### 1. Two Modes of Operation
Almost every tool accepts a `mode` argument: `worktree` or `snapshot`.

*   **Worktree Mode (`mode: "worktree"`)**: Operates on the *live* workspace implementation (files on disk).
    *   **Mutability**: Highly mutable. State changes on every file save or external modification.
    *   **Identity**: `snapshot_id` returned is a hash of the current status (`sha256:{status_hash}`). It changes whenever the workspace state changes.
    *   **Lease**: Requires a `lease_id` to ensure session consistency.
    *   **Cache Hint**: `"until_dirty"`. Clients should invalidate caches when they detect workspace changes or receive a new `lease_id`.

*   **Snapshot Mode (`mode: "snapshot"`)**: Operates on *frozen*, immutable snapshots stored in the Cortex Persistence Layer.
    *   **Mutability**: Immutable. Once created, a snapshot never changes.
    *   **Identity**: `snapshot_id` is a stable, deterministic content-addressed hash (`sha256:{...}`).
    *   **Cache Hint**: `"immutable"`. Clients can cache results indefinitely for a given `snapshot_id`.

## Integration Workflows

### Browsing Files
Use `snapshot.list` and `snapshot.file`.

*   **Live View**: Call `snapshot.list(mode="worktree")`. Use the returned `snapshot_id` as a "version tag" for the current UI state.
*   **Time Travel**: Call `snapshot.list(mode="snapshot", snapshot_id="...")` to browse history.

### Patching / Editing
Use `workspace.apply_patch`.

*   **Live Editing**: Call `apply_patch(mode="worktree")`. This modifies the actual files on disk. Returns a new `lease_id`.
*   **Proposing Changes (Dry Run / Branching)**: Call `apply_patch(mode="snapshot", snapshot_id="base_id")`.
    *   **Returns**: A **NEW** `snapshot_id`.
    *   **Usage**: The UI can switch to this new snapshot to show the user "what the patch would look like" without modifying disk. This is ideal for "Preview" features.

### Diffing
Use `snapshot.diff`.

*   **Worktree Diff**: `snapshot.diff(mode="worktree", path="...")` shows `git diff` of working copy vs index.
*   **Snapshot Diff**: `snapshot.diff(mode="snapshot", snapshot_id="target", from_snapshot_id="base")` shows precise diff between two immutable states.

## Determinism Guarantee
Snapshot IDs are now **fully deterministic**.
`apply_patch(base_snap, patch)` will ALWAYS produce the exact same `result_snapshot_id`, regardless of when or where it is run, provided the base snapshot and patch content are identical. This allows robust caching of "preview states".
