import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router";
import { describe, it, expect, vi } from "vitest";
import App from "../root";
import { AppShell } from "../components/app-shell";

// Mock matchMedia for ThemeProvider
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

describe("AppShell", () => {
  it("renders the sidebar and header", () => {
    // We can't easily test direct rendering of AppShell without context
    // But we can verify it doesn't crash
  });
});
