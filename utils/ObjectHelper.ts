import {IPageOption, IStatus} from '~/state/types';
import {IResponse} from '~/core/requester';
import {_omitBy} from '~/utils/lodash';

export default class ObjectHelper {
  static toStatus = (obj: IStatus): IStatus => ({
    isError: obj.isError,
    isSuccess: obj.isSuccess,
    isLoading: obj.isLoading,
    isLoaded: obj.isLoaded,
    errorData: obj.errorData,
  })
}
