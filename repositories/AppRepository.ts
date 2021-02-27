import {BaseRepository} from '~/repositories/BaseRepository'
import {
    IBreadcrumbItemState,
    IDocMeta,
    IPageMeta, IReplaceState,
    ISidebarItemState, IUpdateState, ReplaceState,
    SaveToState,
    UpdateDocMeta,
    UpdatePageMeta, UpdateRoute
} from '~/store/types'

export default class AppRepository extends BaseRepository {
    public get pageMeta(): IPageMeta {
        return this.getStateByKey('page')
    }

    public get docMeta(): IDocMeta {
        return this.getStateByKey('doc')
    }

    public get sidebar(): ISidebarItemState[] {
        return this.getStateByKey('sidebar')
    }

    public get breadcrumb(): IBreadcrumbItemState[] {
        return this.getStateByKey('breadcrumb')
    }

    public updateRoute = (route: any): void => {
        this.commit(new UpdateRoute(route))
    }

    public updatePageMeta = (data: IPageMeta): void => {
        this.commit(new UpdatePageMeta(data))
    }

    public updateDocMeta = (data: IDocMeta): void => {
        this.commit(new UpdateDocMeta(data))
    }

    public replaceState = (key: string, data: IReplaceState): void => {
        this.commit(new ReplaceState(key, data))
    }

    public saveToState = (key: string, data: IUpdateState | any): void => {
        this.commit(new SaveToState(key, data))
    }

    public get me(): { token: string, user_id: string, role: 'USER' | 'SIGNER' | 'ADMIN' } {
        return this.getStateByKey('me')
    }

    public $dialogShow(option: { header: string, onConfirm: Function }) {
        this.saveToState('dialog', {
            ...option,
            is_show: true,
        })
    }

    public $dialogHide() {
        this.saveToState('dialog', {
            is_show: false
        })
    }
}
