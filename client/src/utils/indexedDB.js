import { openDB } from 'idb';

const DB_NAME = 'AppDB';
const STORE_NAME = 'UserStore';
const USER_KEY = 'currentUser';

export const initDB = async () => {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    },
  });
};

// ✅ Save user with fixed key
export const saveUserToDB = async (user) => {
  const db = await initDB();
  await db.put(STORE_NAME, user, USER_KEY);
};

// ✅ Get user with fixed key
export const getUserFromDB = async () => {
  const db = await initDB();
  return await db.get(STORE_NAME, USER_KEY);
};

// ✅ Delete user with fixed key
export const clearUserFromDB = async () => {
  const db = await initDB();
  await db.delete(STORE_NAME, USER_KEY);
};

// ✅ Update currentUser by merging new data
export const updateUser = async (updatedData) => {
  const db = await initDB();
  const user = await db.get(STORE_NAME, USER_KEY);
  if (!user) return;

  const updatedUser = { ...user, ...updatedData };
  await db.put(STORE_NAME, updatedUser, USER_KEY);
  return updatedUser;
};