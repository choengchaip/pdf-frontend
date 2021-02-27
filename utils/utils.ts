import {ILoaderOption} from '~/loader/types';
import {AxiosRequestConfig} from 'axios';
import {_omitBy} from '~/utils/lodash';
import {CookieHelper} from "~/utils/CookieHelper";

export const isChangeWithTrue = (
    value: boolean,
    oldValue: boolean
): boolean => {
    return oldValue !== value && value
}

export const isChangeWithFalse = (
    value: boolean,
    oldValue: boolean
): boolean => {
    return oldValue !== value && !value
}

export const getRequestObjectOptions = (ctx: any, options: ILoaderOption, $cookies: any = null): AxiosRequestConfig => {
    let token = false
    if (ctx.rootState) {
        token = ctx.rootState?.app?.me?.token || $cookies?.get('me')?.token || false
    } else {
        token = ctx.app?.me?.token || $cookies?.get('me')?.token || false
    }

    return {
        params: {
            ...(options?.params && _omitBy(options?.params))
        },
        headers: {
            ...(token && {Authorization: token})
        },
    }
}