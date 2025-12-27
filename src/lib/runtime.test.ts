import { describe, it, expect, vi, afterEach } from 'vitest';
import { isTauri, getRuntimeMode } from './runtime';

describe('runtime detection', () => {
    afterEach(() => {
        // cleanup window mock
        delete (window as any).__TAURI__;
    });

    it('detects web mode when __TAURI__ is missing', () => {
        expect(isTauri()).toBe(false);
        expect(getRuntimeMode()).toBe('web');
    });

    it('detects tauri mode when __TAURI__ is present', () => {
        (window as any).__TAURI__ = {};
        expect(isTauri()).toBe(true);
        expect(getRuntimeMode()).toBe('tauri');
    });
});
