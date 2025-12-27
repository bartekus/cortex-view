import { useState, useEffect } from "react";
import { getStorage } from "~/lib/storage";

export function useStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    getStorage()
      .getItem<T>(key)
      .then((value) => {
        if (mounted) {
          if (value !== null) {
            setStoredValue(value);
          }
          setLoading(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, [key]);

  const setValue = async (value: T) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      await getStorage().setItem(key, valueToStore);
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue, loading] as const;
}

// Alias for spec compliance
export const useLocalForage = useStorage;
