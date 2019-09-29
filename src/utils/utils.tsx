// import { AsyncStorage } from "react-native";
import AsyncStorage from '@react-native-community/async-storage';
/**
 * 设置本地缓存
 * @param key 缓存key
 * 
 * @param value 缓存value
 */
const _storeData = async (key: string,value: string) => {
  await AsyncStorage.setItem(key, value);
}
export {_storeData}


/**
 * 返回一个promise
 * @param key 获取缓存的key
 */
const _retrieveData = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value
      // We have data!!
      // console.log(value);
    }
   } catch (error) {
     // Error retrieving data
   }
}

export {_retrieveData}

/**
 * 移除本地缓存
 * @param key 移除本地缓存key
 */
const _removeItem = async (key:string) => {
  try {
    await AsyncStorage.removeItem(key)
  } catch (error) {
    // Error retrieving data
  }
}

export {_removeItem}