import { useState } from 'react';

export const useLocalStorage = (key: string, initialValue: unknown) => {
  // eslint-disable-next-line consistent-return
  const [value, setValue] = useState(() => {
    try {
      const valueFromLocalStorage = localStorage.getItem(key);

      if (valueFromLocalStorage !== null) {
        return JSON.parse(valueFromLocalStorage) || initialValue;
      }
    } catch {
      return initialValue;
    }
  });

  const save = (valueToSave: string) => {
    setValue(valueToSave);
    localStorage.setItem(key, JSON.stringify(valueToSave));
  };

  return [value, save];
};
