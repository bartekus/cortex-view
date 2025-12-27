export type RuntimeMode = 'tauri' | 'web';

export function isTauri(): boolean {
    return typeof window !== 'undefined' && '__TAURI__' in window;
}

export function getRuntimeMode(): RuntimeMode {
    return isTauri() ? 'tauri' : 'web';
}
