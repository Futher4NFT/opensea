import {Collection, Network, OpenSeaAPIConfig} from "./types";
import {API_BASE_MAINNET, API_BASE_RINKEBY, API_PATH} from "./constants";
import axios, {AxiosInstance} from "axios";
import {Order, OrdersQueryOptions, QueryCursors} from "./orders/types";
import {getOrdersAPIPath, serializeOrdersQueryOptions} from "./orders/utils";
import * as QueryString from "query-string";

export class OpenSeaAPI {
    public readonly apiBaseUrl: string;
    public pageSize = 20;
    private readonly apiKey: string | undefined;
    private readonly api: AxiosInstance;
    private readonly networkName: Network;
    private retryDelay = 3000;

    constructor(config: OpenSeaAPIConfig) {
        this.apiKey = config.apiKey;
        this.networkName = config.networkName ?? Network.Main;
        switch (config.networkName) {
            case Network.Rinkeby:
                this.apiBaseUrl = config.apiBaseUrl || API_BASE_RINKEBY;
                break;
            case Network.Main:
            default:
                this.apiBaseUrl = config.apiBaseUrl || API_BASE_MAINNET;
                break;
        }

        this.api = axios.create({
            baseURL: this.apiBaseUrl,
            timeout: 5000,
            headers: {...(this.apiKey ? {"X-API-KEY": this.apiKey} : {}),},
            ...config.axiosConfig,
        });
        this.api.interceptors.response.use(
            (response) => {
                return response;
            },
            (error)=>{
                return error
            }
        )
    }

    async get<T>(apiPath: string, query: any = {}): Promise<T> {
        const qs = QueryString.stringify(query);
        const url = `${apiPath}?${qs}`;
        const {data} = await this.api.get<T>(url);
        return data;
    }

    /**
     * 获取订单数据
     * @param protocol
     * @param side
     * @param orderDirection
     * @param orderBy
     * @param restOptions
     */
    public async getOrder({
                              protocol = 'seaport',
                              side,
                              orderDirection = "desc",
                              orderBy = "created_date",
                              ...restOptions
                          }: Omit<OrdersQueryOptions, "limit">): Promise<Order> {
        const data = await this.get<QueryCursors & {
            orders: Order[];
        }>(getOrdersAPIPath(this.networkName, protocol, side), serializeOrdersQueryOptions({
            limit: 1,
            orderBy,
            orderDirection,
            ...restOptions,
        }));
        if (data.orders.length === 0) {
            throw new Error("Not found: no matching order found");
        }
        return data.orders[0];
    }

    /**
     * 批量获取多个订单
     * @param protocol
     * @param side
     * @param orderDirection
     * @param orderBy
     * @param restOptions
     */
    public async getOrders({
                               protocol,
                               side,
                               orderDirection = "desc",
                               orderBy = "created_date",
                               ...restOptions
                           }: Omit<OrdersQueryOptions, "limit">): Promise<QueryCursors & {
        orders: Order[];
    }> {
        return await this.get<QueryCursors & {
            orders: Order[];
        }>(
            getOrdersAPIPath(this.networkName, protocol, side),
            serializeOrdersQueryOptions({
                limit: this.pageSize,
                orderBy,
                orderDirection,
                ...restOptions,
            })
        );
    }

    /**
     * 获取集合信息
     * @param collectionSlug
     */
    public async getCollection(collectionSlug: string): Promise<false | Collection> {
        const data = await this.get<{ collection?: Collection, success?: boolean }>(
            `${API_PATH}/collection/${collectionSlug}`
        );
        if (data?.collection) {
            return data.collection
        }
        return false;
    }
}
