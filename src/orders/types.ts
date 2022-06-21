import {OrderWithCounter} from "@opensea/seaport-js/lib/types";
import {OpenSeaAccount} from "../types";
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
    account: OpenSeaAccount;
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
    maker: OpenSeaAccount;
    taker: OpenSeaAccount;
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
    @Type(() => MakerAssetBundle)
    maker_asset_bundle: MakerAssetBundle;
    @Type(() => TakerAssetBundle)
    taker_asset_bundle: TakerAssetBundle;
}

export class MakerAssetBundle {
    maker: string;
    slug: string;
    @Type(() => MakerAssetBundleAsset)
    assets: MakerAssetBundleAsset[];
    name: string;
    description: string;
    external_link: string;
    @Type(() => AssetContract)
    asset_contract: AssetContract;
    permalink: string;
    sell_orders: string;
    seaport_sell_orders: string;
}

export class AssetContract {
    @Type(() => AssetContractCollection)
    collection?: AssetContractCollection;
    address: string;
    asset_contract_type: string;
    created_date: Date;
    name: string;
    nft_version: string;
    opensea_version: string;
    owner: number;
    schema_name: string;
    symbol: string;
    total_supply: string;
    description: string;
    external_link: string;
    image_url: string;
    default_to_fiat: boolean;
    dev_buyer_fee_basis_points: number;
    dev_seller_fee_basis_points: number;
    only_proxied_transfers: boolean;
    opensea_buyer_fee_basis_points: number;
    opensea_seller_fee_basis_points: number;
    buyer_fee_basis_points: number;
    seller_fee_basis_points: number;
    payout_address: null | string;
}

export class AssetContractCollection {
    banner_image_url: string;
    chat_url: null;
    created_date: Date;
    default_to_fiat: boolean;
    description: string;
    dev_buyer_fee_basis_points: string;
    dev_seller_fee_basis_points: string;
    discord_url: null;
    @Type(() => DisplayData)
    display_data: DisplayData;
    external_url: string;
    featured: boolean;
    featured_image_url: string;
    hidden: boolean;
    safelist_request_status: string;
    image_url: string;
    is_subject_to_whitelist: boolean;
    large_image_url: string;
    medium_username: string;
    name: string;
    only_proxied_transfers: boolean;
    opensea_buyer_fee_basis_points: string;
    opensea_seller_fee_basis_points: string;
    payout_address: string;
    require_email: boolean;
    short_description: string;
    slug: string;
    telegram_url: string;
    twitter_username: string;
    instagram_username: string;
    wiki_url: string;
    is_nsfw: boolean;
}

export class DisplayData {
    card_display_style?: string;
}

export class MakerAssetBundleAsset {
    id: number;
    num_sales: number;
    background_color: string;
    image_url: string;
    image_preview_url: string;
    image_thumbnail_url: string;
    image_original_url: string;
    animation_url: string;
    animation_original_url: string;
    name: string;
    description: string;
    external_link: string;
    @Type(() => AssetContract)
    asset_contract: AssetContract;
    permalink: string;
    @Type(() => PurpleCollection)
    collection: PurpleCollection;
    decimals: string;
    token_metadata: string;
    is_nsfw: boolean;
    @Type(() => Owner)
    owner: Owner;
    token_id: string;
}

export class PurpleCollection {
    banner_image_url: string;
    chat_url: string;
    created_date: Date;
    default_to_fiat: boolean;
    description: string;
    dev_buyer_fee_basis_points: string;
    dev_seller_fee_basis_points: string;
    discord_url: null;
    @Type(() => DisplayData)
    display_data: DisplayData;
    external_url: string;
    featured: boolean;
    featured_image_url: string;
    hidden: boolean;
    safelist_request_status: string;
    image_url: string;
    is_subject_to_whitelist: boolean;
    large_image_url: string;
    medium_username: string;
    name: string;
    only_proxied_transfers: boolean;
    opensea_buyer_fee_basis_points: string;
    opensea_seller_fee_basis_points: string;
    payout_address: string;
    require_email: boolean;
    short_description: string;
    slug: string;
    telegram_url: string;
    twitter_username: string;
    instagram_username: string;
    wiki_url: string;
    is_nsfw: boolean;
}

export class Owner {
    @Type(() => User)
    user: User;
    profile_img_url: string;
    address: string;
    config: string;
}

export class User {
    username: string;
}

export class MakerFee {
    @Type(() => OpenSeaAccount)
    account: OpenSeaAccount;
    basis_points: string;
}

export class TakerAssetBundle {
    maker: null;
    slug: string;
    assets: TakerAssetBundleAsset[];
    name: string;
    description: string;
    external_link: string;
    asset_contract: AssetContract;
    permalink: string;
    sell_orders: null;
    seaport_sell_orders: null;
}

export class TakerAssetBundleAsset {
    id: number;
    num_sales: number;
    background_color: string;
    image_url: string;
    image_preview_url: string;
    image_thumbnail_url: string;
    image_original_url: string;
    animation_url: string;
    animation_original_url: string;
    name: string;
    description: string;
    external_link: null;
    asset_contract: AssetContract;
    permalink: string;
    collection: FluffyCollection;
    decimals: number;
    token_metadata: string;
    is_nsfw: boolean;
    owner: Owner;
    token_id: string;
}

export class FluffyCollection {
    banner_image_url: string;
    chat_url: string;
    created_date: Date;
    default_to_fiat: boolean;
    description: string;
    dev_buyer_fee_basis_points: string;
    dev_seller_fee_basis_points: string;
    discord_url: string;
    display_data: DisplayData;
    external_url: string;
    featured: boolean;
    featured_image_url: string;
    hidden: boolean;
    safelist_request_status: string;
    image_url: string;
    is_subject_to_whitelist: boolean;
    large_image_url: string;
    medium_username: string;
    name: string;
    only_proxied_transfers: boolean;
    opensea_buyer_fee_basis_points: string;
    opensea_seller_fee_basis_points: string;
    payout_address: string;
    require_email: boolean;
    short_description: string;
    slug: string;
    telegram_url: string;
    twitter_username: string;
    instagram_username: string;
    wiki_url: string;
    is_nsfw: boolean;
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
