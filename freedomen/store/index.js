import Storage from './storage'
import { AsyncStorage } from 'react-native';
class Store {
  constructor() {
    this.storage = new Storage({
      size: 1000,
      storageBackend: AsyncStorage,
      defaultExpires: 1000 * 3600 * 24,
      sync : {
        // we'll talk about the details later.
      }
    })
  }
  set(key, data) {
    this.storage.save({
      key: key,
      data: data, 
      expires: 1000 * 3600 * 24
    })
  }
  remove(key) {
    this.storage.remove({
      key: key
    });
  }
  get(key) {
    return this.storage.load({
      key: key,
      autoSync: true,
      syncInBackground: true,
    
      // you can pass extra params to sync method
      // see sync example below for example
      syncParams: {
        extraFetchOptions: {
          // blahblah
        },
        someFlag: true,
      },
    })
  }
}
const store = new Store()
export default store