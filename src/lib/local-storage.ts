export const setLocalStorage = (key: string, value: any) => {
  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error setting localStorage item ${key}`, error);
    }
  }
};

export const getLocalStorage = (key: string, initialValue: any) => {
  if (typeof window !== "undefined") {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error getting localStorage item ${key}`, error);
      return initialValue;
    }
  }
  return initialValue;
};

export const removeLocalStorage = (key: string) => {
  if (typeof window !== "undefined") {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing localStorage item ${key}`, error);
    }
  }
};
