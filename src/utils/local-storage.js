export const getLocalStorage = (key) => localStorage.getItem(key);

export const setLocalStorage = (key, data) => localStorage.setItem(key, JSON.stringify(data));

export const removeLocalStorage = (key) => localStorage.removeItem(key);
