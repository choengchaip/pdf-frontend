export interface IObjectState<T> {
  isError: boolean
  isSuccess: boolean
  isLoading: boolean
  isLoaded: boolean
  errorData: any | null
  options: any
  data: T

  [key: string]: any
}

export interface IListState<T> {
  isError: boolean
  isSuccess: boolean
  isLoading: boolean
  isLoaded: boolean
  errorData: any | null
  options: IPageOption | any
  items: T[]
}

export interface IStatus {
  isError: boolean
  isSuccess: boolean
  isLoading: boolean
  isLoaded: boolean
  errorData: any | null
}

export interface IPageOption {
  currentPage: number | string
  nextPage: string
  prevPage: number
  totalItem: number
  limit: number
}
