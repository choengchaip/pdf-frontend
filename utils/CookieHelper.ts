import Cookies from 'js-cookie'

export class CookieHelper {
  static get(key: string): any {
    return Cookies.get(key)
  }

  static set(key: string, data: any, options: any = {}): any {
    return Cookies.set(key, data, options)
  }

  static remove(key: string): any {
    return Cookies.remove(key)
  }

  static getBool(key: string): boolean {
    return this.get(key) === 'true'
  }
}
