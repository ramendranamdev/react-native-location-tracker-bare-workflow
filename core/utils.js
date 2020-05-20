import { AsyncStorage } from "react-native";

export const emailValidator = (email) => {
  const re = /\S+@\S+\.\S+/;

  if (!email || email.length <= 0) return "Email cannot be empty.";
  if (!re.test(email)) return "Ooops! We need a valid email address.";

  return "";
};

export const passwordValidator = (password) => {
  if (!password || password.length <= 0) return "Password cannot be empty.";

  return "";
};

export const nameValidator = (name) => {
  if (!name || name.length <= 0) return "Name cannot be empty.";

  return "";
};

export const getItemFromAsyncStorage = async (key) => {
  try {
    const retrievedItem = await AsyncStorage.getItem(key);
    // const item = JSON.parse(retrievedItem);
    const item = retrievedItem;
    return item;
  } catch (error) {
    console.log(error.message);
    return error;
  }
};
