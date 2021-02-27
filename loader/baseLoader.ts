import {
    IFindOption,
    ILoaderOption,
    IParam,
    LoaderAddData,
    LoaderDeleteData,
    LoaderFindData,
    LoaderUpdateData
} from '~/loader/types';
import {
    DestroyAppState,
    IContext,
    IState,
    ReplaceAppState,
    SaveToAppState,
} from '~/store/types';
import {NewRequester} from '~/core/requester';
import ObjectHelper from '~/utils/ObjectHelper';
import {_get} from '~/utils/lodash';
import {getRequestObjectOptions} from '~/utils/utils';
import {CookieHelper} from '~/utils/CookieHelper';
import {IPageOption, IStatus} from '~/state/types';
import {commonObjectState} from '~/state/object';
import {commonListState} from '~/state/page';
import {v4 as uuidV4} from 'uuid';

interface IInitial {
    isInitState: boolean
}

export class BaseLoader<T = any> {
    protected stateKey!: string

    constructor(protected _vm: IContext | any, public options: (data?: any) => ILoaderOption) {
        this._vm.cookies = this._vm?.$cookies || this._vm?.app?.$cookies
    }

    public initial(options: IInitial = {isInitState: false}) {
        this.stateKey = this.options()?.stateKey ?? uuidV4()

        if (options.isInitState) {
            this.initialState()
        }
    }

    private initialState() {
        this.commit(new ReplaceAppState(`${this.stateKey}_upload`, commonObjectState()))
        this.commit(new ReplaceAppState(`${this.stateKey}_add`, commonObjectState()))
        this.commit(new ReplaceAppState(`${this.stateKey}_update`, commonObjectState()))
        this.commit(new ReplaceAppState(`${this.stateKey}_delete`, commonObjectState()))
        this.commit(new ReplaceAppState(`${this.stateKey}_find`, commonObjectState()))
        this.commit(new ReplaceAppState(`${this.stateKey}_fetch`, commonListState()))
    }

    private getStateWithPostfix(key: string): any {
        return this.getters['app/getState'](key)
    }

    protected toLoadingStatus(key) {
        this.commit(new SaveToAppState(key, {
            isLoading: true,
            isLoaded: false,
            isError: false,
            isSuccess: false,
            errorData: null
        }))
    }

    protected toSuccessStatus(key, data: any, options: any = {}) {
        this.commit(new SaveToAppState(key, {
            isSuccess: true,
            data: data,
            options: options,
        }))
    }

    protected toSuccessItemsStatus(key, items: any[], options: any = {}) {
        this.commit(new SaveToAppState(key, {
            isSuccess: true,
            items: items,
            options: options,
        }))
    }

    protected toErrorStatus(key, error: any) {
        this.commit(new SaveToAppState(key, {
            isError: true,
            errorData: error,
        }))
    }

    protected toCompleteStatus(key) {
        this.commit(new SaveToAppState(key, {
            isLoading: false,
            isLoaded: true,
        }))
    }

    get store() {
        return (this._vm as any).store || this._vm.$store
    }

    get state(): IState {
        return this.store.state
    }

    get dispatch(): any {
        return this.store.dispatch
    }

    get getters(): any {
        return this.store.getters
    }

    get commit(): any {
        return this.store.commit
    }

    getStateByKey(key: string) {
        return this._vm?.app?.$app?.getStateByKey(key) || this._vm?.$app?.getStateByKey(key)
    }

    get uploadItem(): T {
        return _get(this.getStateWithPostfix(`${this.stateKey}_upload`), 'data', {})
    }

    get uploadStatus(): IStatus {
        return ObjectHelper.toStatus(this.getStateWithPostfix(`${this.stateKey}_upload`))
    }

    get addItem(): T {
        return _get(this.getStateWithPostfix(`${this.stateKey}_add`), 'data', {})
    }

    get addStatus(): IStatus {
        return ObjectHelper.toStatus(this.getStateWithPostfix(`${this.stateKey}_add`))
    }

    get fetchItems(): T[] {
        return this.options().mockFetchItems ?? _get(this.getStateWithPostfix(`${this.stateKey}_fetch`), 'items', [])
    }

    get fetchOptions(): IPageOption {
        return _get(this.getStateWithPostfix(`${this.stateKey}_fetch`), 'options', {})
    }

    get fetchStatus() {
        return ObjectHelper.toStatus(this.getStateWithPostfix(`${this.stateKey}_fetch`))
    }

    get findItem(): T {
        return this.options().mockFindItem ?? _get(this.getStateWithPostfix(`${this.stateKey}_find`), 'data', {})
    }

    get findStatus() {
        return ObjectHelper.toStatus(this.getStateWithPostfix(`${this.stateKey}_find`))
    }

    get updateItem() {
        return _get(this.getStateWithPostfix(`${this.stateKey}_update`), 'data', {})
    }

    get updateStatus() {
        return ObjectHelper.toStatus(this.getStateWithPostfix(`${this.stateKey}_update`))
    }

    get deleteItem() {
        return _get(this.getStateWithPostfix(`${this.stateKey}_delete`), 'data', {})
    }

    get deleteStatus() {
        return ObjectHelper.toStatus(this.getStateWithPostfix(`${this.stateKey}_delete`))
    }

    fetchClear() {
        this.commit(new ReplaceAppState(`${this.stateKey}_fetch`, commonListState()))
    }

    appendFetch(key: string, head: any) {
        const fetchs = _get(this.getStateWithPostfix(`${key}_fetch`), 'items', [])
        this.commit(new SaveToAppState(`${key}_fetch`, {
            isSuccess: true,
            items: [head, ...fetchs],
        }))
    }

    public destroyLoader() {
        this.commit(new DestroyAppState(this.stateKey))
    }

    public $upload = async <T>(data: T, options: IParam = {}) => {
        this.toLoadingStatus(`${this.stateKey}_upload`)

        try {
            const form = new FormData()
            for (const [key, value] of Object.entries(data || {})) {
                form.append(key, value as any)
            }

            const response = await NewRequester.post(
                this.options(new LoaderAddData(options))?.baseAdd || this.options(new LoaderAddData(options))?.baseURL,
                form,
                getRequestObjectOptions(this.state, this.options(new LoaderAddData(options)), this._vm.cookies))
            this.toSuccessStatus(`${this.stateKey}_upload`, response.data)
            if (this.options().appendKey) {
                this.appendFetch(this.options().appendKey!, response.data)
            }
            if (this.options().cookieKey) {
                CookieHelper.set(this.options().cookieKey!, this.addItem)
            }
            if (this.options().onUploadSuccess) {
                this.options().onUploadSuccess!(this.addStatus)
            }
        } catch (e) {
            this.toErrorStatus(`${this.stateKey}_upload`, e.response?.data || e)
            if (this.options().onUploadError) {
                this.options().onUploadError!(this.addStatus)
            }
        }

        this.toCompleteStatus(`${this.stateKey}_upload`)
    }

    public $add = async <T>(data: T, options: IParam = {}) => {
        this.toLoadingStatus(`${this.stateKey}_add`)

        try {
            const response = await NewRequester.post(
                this.options(new LoaderAddData(options))?.baseAdd || this.options(new LoaderAddData(options))?.baseURL,
                data,
                getRequestObjectOptions(this.state, this.options(new LoaderAddData(options)), this._vm.cookies))
            this.toSuccessStatus(`${this.stateKey}_add`, response.data)
            if (this.options().appendKey) {
                this.appendFetch(this.options().appendKey!, response.data)
            }
            if (this.options().cookieKey) {
                CookieHelper.set(this.options().cookieKey!, this.addItem)
            }
            if (this.options().onAddSuccess) {
                this.options().onAddSuccess!(this.addStatus)
            }
        } catch (e) {
            this.toErrorStatus(`${this.stateKey}_add`, e.response?.data || e)
            if (this.options().onAddError) {
                this.options().onAddError!(this.addStatus)
            }
        }

        this.toCompleteStatus(`${this.stateKey}_add`)
    }

    public $update = async <U>(id: string, data: U, options: IParam = {}) => {
        this.toLoadingStatus(`${this.stateKey}_update`)

        try {
            const response = await NewRequester.put(
                `${this.options(new LoaderUpdateData(id, options)).baseUpdate || `${this.options(new LoaderUpdateData(id)).baseURL}/${id}`}`,
                data,
                getRequestObjectOptions(this.state, this.options(new LoaderUpdateData(this._vm)), this._vm.cookies))
            this.toSuccessStatus(`${this.stateKey}_update`, response.data)
            if (this.options().cookieKey) {
                CookieHelper.set(this.options().cookieKey!, this.updateItem)
            }
            if (this.options().onUpdateSuccess) {
                this.options().onUpdateSuccess!(this.updateStatus)
            }
        } catch (e) {
            this.toErrorStatus(`${this.stateKey}_update`, e.response?.data || e)
            if (this.options().onUpdateError) {
                this.options().onUpdateError!(this.updateStatus)
            }
        }

        this.toCompleteStatus(`${this.stateKey}_update`)
    }

    public $get = async (id: string, options: IFindOption = {}) => {
        this.toLoadingStatus(`${this.stateKey}_find`)

        try {
            const response = await NewRequester.get(
                `${this.options(new LoaderFindData(id, options)).baseFind || `${this.options(new LoaderFindData(id, options)).baseURL}/${id}`}`,
                getRequestObjectOptions(
                    this.state,
                    {
                        ...this.options(new LoaderFindData(id, options)),
                        params: {...new LoaderFindData(id, options).params, ...options.params}
                    }, this._vm.cookies))
            this.toSuccessStatus(`${this.stateKey}_find`, response.data)
            if (this.options().cookieKey) {
                CookieHelper.set(this.options().cookieKey!, this.findItem)
            }
            if (this.options().onFindSuccess) {
                this.options().onFindSuccess!(this.findStatus)
            }
        } catch (e) {
            this.toErrorStatus(`${this.stateKey}_find`, e.response?.data || e)
            if (this.options().onFindError) {
                this.options().onFindError!(this.findStatus)
            }
        }

        this.toCompleteStatus(`${this.stateKey}_find`)
    }

    public $delete = async (id: string) => {
        this.toLoadingStatus(`${this.stateKey}_delete`)

        try {
            const response = await NewRequester.delete(
                `${this.options(new LoaderDeleteData(id)).baseDelete || `${this.options(new LoaderDeleteData(id)).baseURL}/${id}`}`,
                getRequestObjectOptions(this.state, this.options(new LoaderDeleteData(id)), this._vm.cookies))
            this.toSuccessStatus(`${this.stateKey}_delete`, response.data)
            if (this.options().cookieKey) {
                CookieHelper.set(this.options().cookieKey!, this.deleteItem)
            }
            if (this.options().onDeleteSuccess) {
                this.options().onDeleteSuccess!(this.deleteStatus)
            }
        } catch (e) {
            this.toErrorStatus(`${this.stateKey}_delete`, e.response?.data || e)
            if (this.options().onDeleteError) {
                this.options().onDeleteError!(this.deleteStatus)
            }
        }

        this.toCompleteStatus(`${this.stateKey}_delete`)
    }
}
