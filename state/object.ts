import {IObjectState} from "~/state/types";

export const commonObjectState = (): IObjectState<any> => ({
  isError: false,
  isSuccess: false,
  isLoading: false,
  isLoaded: false,
  errorData: null,
  options: {},
  data: null
})
