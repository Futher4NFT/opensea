import {OrderWithCounter} from "@opensea/seaport-js/lib/types";
import {Account, AssetBundle, MakerFee} from "../types";
import {Type} from "class-transformer";

// Protocol data
type OrderProtocolToProtocolData = {
    seaport: OrderWithCounter;
};
export type OrderProtocol = keyof OrderProtocolToProtocolData;
export type ProtocolData =
    OrderProtocolToProtocolData[keyof OrderProtocolToProtocolData];

// Protocol agnostic order data
type OrderType = "basic" | "dutch" | "english" | "criteria";
export type OrderSide = "ask" | "bid";
export type OrderFee = {
    account: Account;
    basisPoints: string;
};

export class Order {
    created_date: Date;
    closing_date: Date;
    listing_time: number;
    expiration_time: number;
    order_hash: string;
    protocol_data: ProtocolData;
    protocol_address: string;
    maker: Account;
    taker: Account;
    current_price: string;
    @Type(() => MakerFee)
    maker_fees: MakerFee[];
    @Type(() => MakerFee)
    taker_fees: MakerFee[];
    side: string;
    order_type: string;
    cancelled: boolean;
    finalized: boolean;
    marked_invalid: boolean;
    client_signature: string;
    relay_id: string;
    @Type(() => AssetBundle)
    maker_asset_bundle: AssetBundle;
    @Type(() => AssetBundle)
    taker_asset_bundle: AssetBundle;
}



// API query types
type OpenOrderOrderingOption = "created_date" | "eth_price";
type OrderByDirection = "asc" | "desc";

export type OrderAPIOptions = {
    protocol: OrderProtocol;
    side: OrderSide;
};

export type OrdersQueryOptions = OrderAPIOptions & {
    limit: number;
    cursor?: string;

    paymentTokenAddress?: string;
    maker?: string;
    taker?: string;
    owner?: string;
    bundled?: boolean;
    includeBundled?: boolean;
    listedAfter?: number | string;
    listedBefore?: number | string;
    tokenIds?: string[]|string;
    assetContractAddress?: string;
    orderBy?: OpenOrderOrderingOption;
    orderDirection?: OrderByDirection;
    onlyEnglish?: boolean;
};

export type SerializedOrder = {
    created_date: string;
    closing_date: string | null;
    listing_time: number;
    expiration_time: number;
    order_hash: string | null;
    maker: unknown;
    taker: unknown | null;
    protocol_data: ProtocolData;
    protocol_address: string;
    current_price: string;
    maker_fees: {
        account: unknown;
        basis_points: string;
    }[];
    taker_fees: {
        account: unknown;
        basis_points: string;
    }[];
    side: OrderSide;
    order_type: OrderType;
    cancelled: boolean;
    finalized: boolean;
    marked_invalid: boolean;
    client_signature: string | null;
    maker_asset_bundle: unknown;
    taker_asset_bundle: unknown;
};

export type QueryCursors = {
    next: string | null;
    previous: string | null;
};

export type OrdersQueryResponse = QueryCursors & {
    orders: SerializedOrder[];
};

export type OrdersPostQueryResponse = { order: SerializedOrder };
