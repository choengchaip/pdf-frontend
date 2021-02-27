import {IListState} from "~/state/types";

export const commonListState = (): IListState<any> => ({
  isError: false,
  isSuccess: false,
  isLoading: false,
  isLoaded: false,
  errorData: null,
  options: {},
  items: []
})
