import {IListState} from "~/state/types";

export class ArrayHelper {
  static toArray<T>(value: any): (T | any)[] {
    return Array.from(value || [])
  }

  static isEmpty(value: any): boolean {
    return this.toArray(value).length === 0
  }

  static isExist(data: any[], value: any): boolean {
    let isHas = false

    ArrayHelper.toArray(data).forEach((item) => {
      if (item === value) {
        isHas = true
      }
    })

    return isHas
  }

  static toStatus = <T>(obj: IListState<T>): IListState<T> => ({
    isError: obj.isError,
    isSuccess: obj.isSuccess,
    isLoading: obj.isLoading,
    isLoaded: obj.isLoaded,
    errorData: obj.errorData,
    options: obj.options,
    items: obj.items
  })
}
