import localforage from "localforage";
import { isTauri } from "./runtime";
import { Store } from "@tauri-apps/plugin-store";

export interface StorageAdapter {
  getItem<T>(key: string): Promise<T | null>;
  setItem<T>(key: string, value: T): Promise<void>;
  removeItem(key: string): Promise<void>;
}

class WebStorageAdapter implements StorageAdapter {
  constructor() {
    localforage.config({
      name: "cortex-view",
      storeName: "keyvalue_pairs",
    });
  }

  async getItem<T>(key: string): Promise<T | null> {
    return localforage.getItem<T>(key);
  }

  async setItem<T>(key: string, value: T): Promise<void> {
    await localforage.setItem(key, value);
  }

  async removeItem(key: string): Promise<void> {
    await localforage.removeItem(key);
  }
}

class TauriStorageAdapter implements StorageAdapter {
  private store: Store;

  constructor() {
    // Lazily initialize store
    this.store = new Store("settings.json");
  }

  async getItem<T>(key: string): Promise<T | null> {
    return this.store.get<T>(key);
  }

  async setItem<T>(key: string, value: T): Promise<void> {
    await this.store.set(key, value);
    await this.store.save(); // ensure persistence
  }

  async removeItem(key: string): Promise<void> {
    await this.store.delete(key);
    await this.store.save();
  }
}

let storageInstance: StorageAdapter | null = null;

export function getStorage(): StorageAdapter {
  if (!storageInstance) {
    if (isTauri()) {
      storageInstance = new TauriStorageAdapter();
    } else {
      storageInstance = new WebStorageAdapter();
    }
  }
  return storageInstance;
}
