import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Save an object to AsyncStorage
 * @param key - The key to store the object under
 * @param value - The object to store
 */
export const saveObjectToCache = async <T>(key: string, value: T): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (error) {
    console.error("Error saving data", error);
  }
};

/**
 * Retrieve an object from AsyncStorage
 * @param key - The key to retrieve the object from
 * @returns The parsed object or null if not found
 */
export const getObjectFromCache = async <T>(key: string): Promise<T | null> => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error("Error retrieving data", error);
    return null;
  }
};

/**
 * Remove an object from AsyncStorage
 * @param key - The key to remove
 */
export const removeObjectFromCache = async (key: string): Promise<void> => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error("Error removing data", error);
  }
};
