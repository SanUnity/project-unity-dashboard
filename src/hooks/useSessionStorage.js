import { useState } from 'react';

export function useSessionStorage(key, initialValue) {
  const [storedValue, setValue] = useState(() => {
    try {
      const item = sessionStorage.getItem(key);
      return item !== null ? JSON.parse(item) : initialValue;
    } catch (e) {
      return initialValue;
    }
  });

  const setSessionStorage = (value) => {
    try {
      sessionStorage.setItem(key, JSON.stringify(value));
      setValue(value);
    } catch (e) {
      console.error(e);
    }
  };

  return [storedValue, setSessionStorage];
}