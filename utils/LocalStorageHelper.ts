import {Vue} from 'vue-property-decorator';

export class LocalStorageHelper {
  static set(key: string, data: any) {
    const client = LocalStorageHelper.getLocalClient()
    if (client) {
      client.setItem(key, JSON.stringify({
        ...data,
      }))
    }
  }

  static get(key: string) {
    const client = LocalStorageHelper.getLocalClient()
    if (client) {
      const data = JSON.parse(client.getItem(key) || '{}')
      Vue.delete(data, 'local_storage_expire')
      return data
    }
    return null
  }

  private static getLocalClient(): Storage | null {
    return window?.localStorage
  }
}
