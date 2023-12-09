/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface CreatePictureDto {
  /**
   * Название картинки
   * @example "Рассвет"
   */
  name: string;
  /**
   * Год создания картинки
   * @example 1999
   */
  year: number;
  /**
   * Автор картинки
   * @example "Кастеев А"
   */
  author: string;
  /**
   * Размер картинки
   * @example "400x400"
   */
  size: string;
  /**
   * Тип картинки
   * @example "Маслом"
   */
  type: string;
  /**
   * Прайс картинки
   * @example "1 000 000 KZT"
   */
  price: string;
  /**
   * Ориентация картинки
   * @example "VERTICAL"
   */
  orientation: string;
  /**
   * Ссылка на картинку
   * @example "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.indiewire.com%2Ffeatures%2Fgeneral%2Fbaz-luhrmann-the-great-gatsby-underrated-leonardo-dicaprio-carey-mulligan-1201799900%2F&psig=AOvVaw3qL24N30HiEkr9HEE8E8Vm&ust=1692608559049000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCLD00rLw6oADFQAAAAAdAAAAABAD"
   */
  pictures: string;
}

export interface UpdatePictureDto {
  /**
   * Название картинки
   * @example "Рассвет"
   */
  name: string;
  /**
   * Год создания картинки
   * @example 1999
   */
  year: number;
  /**
   * Автор картинки
   * @example "Кастеев А"
   */
  author: string;
  /**
   * Ссылка на картинку
   * @example "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.indiewire.com%2Ffeatures%2Fgeneral%2Fbaz-luhrmann-the-great-gatsby-underrated-leonardo-dicaprio-carey-mulligan-1201799900%2F&psig=AOvVaw3qL24N30HiEkr9HEE8E8Vm&ust=1692608559049000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCLD00rLw6oADFQAAAAAdAAAAABAD"
   */
  pictures: string;
  /**
   * Размер картинки
   * @example "400x400"
   */
  size: string;
  /**
   * Тип картинки
   * @example "Маслом"
   */
  type: string;
}

export interface AuthDto {
  /**
   * Имя пользователя
   * @example "Admin"
   */
  username: string;
  /**
   * Пароль
   * @example "Password"
   */
  password: string;
}

import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, HeadersDefaults, ResponseType } from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || "" });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method && this.instance.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] = property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem));
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (type === ContentType.FormData && body && body !== null && typeof body === "object") {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (type === ContentType.Text && body && body !== null && typeof body !== "string") {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title Pictures example
 * @version 1.0
 * @contact
 *
 * The artOriginal/pictures API description
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  api = {
    /**
     * No description
     *
     * @name AppControllerGetHello
     * @request GET:/api
     */
    appControllerGetHello: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api`,
        method: "GET",
        ...params,
      }),

    /**
     * @description Get all pictures
     *
     * @tags Pictures
     * @name PictureControllerGetPictures
     * @summary Get pictures
     * @request GET:/api/pictures
     */
    pictureControllerGetPictures: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/pictures`,
        method: "GET",
        ...params,
      }),

    /**
     * @description Add new picture
     *
     * @tags Pictures
     * @name PictureControllerCreatePicture
     * @summary Create picture
     * @request POST:/api/pictures
     */
    pictureControllerCreatePicture: (data: CreatePictureDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/pictures`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Update picture by id
     *
     * @tags Pictures
     * @name PictureControllerEditPictureById
     * @summary Update picture
     * @request PUT:/api/pictures/{id}
     */
    pictureControllerEditPictureById: (id: number, data: UpdatePictureDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/pictures/${id}`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Pictures
     * @name PictureControllerDeletePictureById
     * @request DELETE:/api/pictures/{id}
     */
    pictureControllerDeletePictureById: (id: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/pictures/${id}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * @description password
     *
     * @tags Auth, Auth
     * @name AuthControllerLogin
     * @summary Admin
     * @request POST:/api/auth/login
     */
    authControllerLogin: (data: AuthDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/auth/login`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description password
     *
     * @tags Auth
     * @name AuthControllerRegistration
     * @summary Admin
     * @request POST:/api/auth/registration
     */
    authControllerRegistration: (data: AuthDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/auth/registration`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),
  };
}
