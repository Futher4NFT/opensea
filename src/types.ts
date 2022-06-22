import {AxiosRequestConfig} from "axios";
import {Type} from "class-transformer";

export enum Network {
    Main = 'main',
    Rinkeby = 'rinkeby',
}
export interface OpenSeaAPIConfig {
    networkName?: Network;
    apiKey?: string;
    apiBaseUrl?: string;
    axiosConfig?: AxiosRequestConfig;
}

export class Collection {
    editors: string[];
    payment_tokens: PaymentToken[];
    primary_asset_contracts: AssetContract[];
    traits: Traits;
    stats: Stats;
    banner_image_url: string;
    chat_url: null;
    created_date: Date;
    default_to_fiat: boolean;
    description: string;
    dev_buyer_fee_basis_points: string;
    dev_seller_fee_basis_points: string;
    discord_url: string;
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

export interface Stats {
    one_day_volume: number;
    one_day_change: number;
    one_day_sales: number;
    one_day_average_price: number;
    seven_day_volume: number;
    seven_day_change: number;
    seven_day_sales: number;
    seven_day_average_price: number;
    thirty_day_volume: number;
    thirty_day_change: number;
    thirty_day_sales: number;
    thirty_day_average_price: number;
    total_volume: number;
    total_sales: number;
    total_supply: number;
    count: number;
    num_owners: number;
    average_price: number;
    num_reports: number;
    market_cap: number;
    floor_price: number;
}

export class DisplayData {
    card_display_style?: string;
}


export interface PaymentToken {
    id: number;
    symbol: string;
    address: string;
    image_url: string;
    name: string;
    decimals: number;
    eth_price: number;
    usd_price: number;
}

export interface Traits {
    [key: string]: { [key: string]: number };
}

export class Asset {
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
    @Type(() => Collection)
    collection: Collection;
    decimals: string | number;
    token_metadata: string;
    is_nsfw: boolean;
    @Type(() => Account)
    owner: Account;
    token_id: string;
}

export class AssetBundle {
    maker: string;
    slug: string;
    @Type(() => Asset)
    assets: Asset[];
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
    @Type(() => Collection)
    collection?: Collection;
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

export class Account {
    user: User | number | null;
    profile_img_url: string;
    address: string;
    config: string;
}

export class User {
    username: string;
}

export class MakerFee {
    @Type(() => Account)
    account: Account;
    basis_points: string;
}
