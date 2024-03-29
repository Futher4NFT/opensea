import {Seaport} from "@opensea/seaport-js";
import {JsonRpcProvider} from "@ethersproject/providers";
import {Order} from "./orders/types";
import {CROSS_CHAIN_SEAPORT_ADDRESS} from "@opensea/seaport-js/lib/constants";
import {constructPrivateListingCounterOrder, getPrivateListingFulfillments} from "./orders/privateListings";
import {OpenSeaAPI} from "./api";
import {OpenSeaAPIConfig} from "./types";
import {CONDUIT_KEYS_TO_CONDUIT, CROSS_CHAIN_DEFAULT_CONDUIT_KEY} from "./constants";
import {OrderWithCounter} from "@opensea/seaport-js/lib/types";

export class OpenSeaSDK {
    public seaport: Seaport;
    public readonly api: OpenSeaAPI;

    constructor(provider: JsonRpcProvider, apiConfig: OpenSeaAPIConfig = {},) {
        this.seaport = new Seaport(provider, {
            conduitKeyToConduit: CONDUIT_KEYS_TO_CONDUIT,
            overrides: {
                defaultConduitKey: CROSS_CHAIN_DEFAULT_CONDUIT_KEY,
            },
        });
        this.api = new OpenSeaAPI(apiConfig);
    }

    /**
     * 下单
     * @param order
     * @param accountAddress
     * @param recipientAddress
     */
    public async fulfillOrder({
                                  order,
                                  accountAddress,
                                  recipientAddress,
                              }: {
        order: Order;
        accountAddress: string;
        recipientAddress?: string;
    }) {
        const isPrivateListing = !!order.taker;
        if (isPrivateListing) {
            if (recipientAddress) {
                throw new Error(
                    "Private listings cannot be fulfilled with a recipient address"
                );
            }
            return this.fulfillPrivateOrder({
                order,
                accountAddress,
            });
        }

        let transactionHash: string;
        switch (order.protocol_address) {
            case CROSS_CHAIN_SEAPORT_ADDRESS: {
                const {executeAllActions} = await this.seaport.fulfillOrder({
                    order: order.protocol_data,
                    accountAddress,
                    recipientAddress,
                });
                const transaction = await executeAllActions();
                transactionHash = transaction.hash;
                break;
            }
            default:
                throw new Error("Unsupported protocol");
        }

        return transactionHash;
    }

    /**
     * 批量
     * @param orders
     * @param accountAddress
     * @param recipientAddress
     */
    public async fulfillOrders({orders, accountAddress, recipientAddress}: {
        orders: Order[];
        accountAddress: string;
        recipientAddress?: string;
    }): Promise<string> {
        const fulfillOrderDetails: { order: OrderWithCounter; }[] = [];
        let transactionHash: string;
        orders.forEach(order => {
            fulfillOrderDetails.push({order: order.protocol_data})
        })
        const {executeAllActions} = await this.seaport.fulfillOrders({
            fulfillOrderDetails,
            accountAddress,
            recipientAddress
        })
        const transaction = await executeAllActions();
        transactionHash = transaction.hash;
        return transactionHash;
    }

    /**
     * 私有下单
     * @param order
     * @param accountAddress
     * @private
     */
    private async fulfillPrivateOrder({
                                          order,
                                          accountAddress,
                                      }: {
        order: Order;
        accountAddress: string;
    }): Promise<string> {
        let transactionHash: string;
        switch (order.protocol_address) {
            case CROSS_CHAIN_SEAPORT_ADDRESS: {
                if (!order.taker?.address) {
                    throw new Error(
                        "Order is not a private listing must have a taker address"
                    );
                }
                const counterOrder = constructPrivateListingCounterOrder(
                    order.protocol_data,
                    order.taker.address
                );
                const fulfillments = getPrivateListingFulfillments(order.protocol_data);
                const transaction = await this.seaport
                    .matchOrders({
                        orders: [order.protocol_data, counterOrder],
                        fulfillments,
                        overrides: {
                            value: counterOrder.parameters.offer[0].startAmount,
                        },
                        accountAddress,
                    })
                    .transact();
                const transactionReceipt = await transaction.wait();
                transactionHash = transactionReceipt.transactionHash;
                break;
            }
            default:
                throw new Error("Unsupported protocol");
        }


        return transactionHash;
    }
}
