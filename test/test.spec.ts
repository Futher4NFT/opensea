import {Network, OpenSeaAPI} from "../src";

const api = new OpenSeaAPI({apiKey: '2f6f419a083c46de9d83ce3dbe7db601', networkName: Network.Main});

test('get order', async () => {
    const data = await api.getOrder({
        side: 'ask',
        orderBy: 'created_date',
        orderDirection: 'desc',
        protocol: "seaport"
    });
    expect(data).toBeDefined()
}, 6000)

test('get order by token id', async () => {
    const data = await api.getOrder({
        side: 'ask',
        orderBy: 'created_date',
        orderDirection: 'desc',
        protocol: "seaport",
        assetContractAddress: "0x2ee6af0dff3a1ce3f7e3414c52c48fd50d73691e",
        tokenIds: ['1900', '5804']
    });
    console.log(data)
    expect(data).toBeDefined()
}, 6000)
test('get orders', async () => {
    const data = await api.getOrders({
        side: 'ask',
        orderBy: 'created_date',
        orderDirection: 'desc',
        protocol: "seaport"
    });
    expect(data.next).toBeDefined()
    expect(data.orders.length).toBeGreaterThanOrEqual(0)
},6000)

test('get collection', async () => {
    const data = await api.getCollection('best-creature')
    console.log(data)
    expect(data).toBeDefined()
})
test('get collection error', async () => {
    const data = await api.getCollection('best-credsaature')
    console.log(data)
    expect(data).toBe(false)
})
