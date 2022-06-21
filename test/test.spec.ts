import {Network} from "../src/types";
import {OpenSeaAPI} from "../src/api";


test('getOrder', async () => {
    const api = new OpenSeaAPI({apiKey: '2f6f419a083c46de9d83ce3dbe7db601', networkName: Network.Main});

    const data = await api.getOrder({
        side: 'ask',
        orderBy: 'created_date',
        orderDirection: 'desc',
        protocol: "seaport"
    });
    expect(data.next).toBeDefined()
    expect(data.orders.length).toBeLessThanOrEqual(1)
},6000)
test('getOrders', async () => {
    const api = new OpenSeaAPI({apiKey: '2f6f419a083c46de9d83ce3dbe7db601', networkName: Network.Main});

    const data = await api.getOrders({
        side: 'ask',
        orderBy: 'created_date',
        orderDirection: 'desc',
        protocol: "seaport"
    });
    expect(data.next).toBeDefined()
    expect(data.orders.length).toBeGreaterThanOrEqual(0)
},6000)
