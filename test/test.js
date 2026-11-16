import http from 'k6/http';
import { check, sleep } from 'k6';
import execution from 'k6/execution';

export const options = {
    stages: [
        { duration: '30s', target: 50 },  
        { duration: '1m', target: 100 }, 
        { duration: '2m', target: 200 }, 
        { duration: '30s', target: 0 },    
    ],
};

const BASE_URL = 'http://localhost:4000/v1';


export function setup() {
    const res = http.get(`${BASE_URL}/product/GetProducts`);
    
    if (res.status === 200) {
        const body = res.json();
        console.log(`[Setup] Fetched ${body.products.length} products successfully from Database.`);
        return { products: body.products };
    } else {
        console.error("[Setup] Failed to fetch products:", res.body);
        return { products: [] };
    }
}

export default function (data) {
    const products = data.products;
    
    if (!products || products.length === 0) {
        console.error("No products available to test!");
        return;
    }

    const headers = { 'Content-Type': 'application/json' };
    const counter = execution.scenario.iterationInTest + 1;

    const loginRes = http.post(`${BASE_URL}/user/Login`, JSON.stringify({
        email: `user${counter}@test.com`,
        password: '12345678',
    }), { headers });

    const isLoginSuccess = check(loginRes, {
        'login status is 200': (r) => r.status === 200,
        'has auth token': (r) => r.json('token') !== undefined,
    });

    if (!isLoginSuccess) return;

    const token = loginRes.json('token');
    const authHeaders = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    };

    for (let i = 0; i < 2; i++) {
 
        const randomProduct = products[Math.floor(Math.random() * products.length)];
        const realProductId = randomProduct._id; 

        const cartRes = http.post(`${BASE_URL}/product/AddToCartRedis/${realProductId}`, JSON.stringify({
            amount: 1,
        }), authHeaders);

        check(cartRes, {
            'add to cart status is 200/201': (r) => r.status === 200 || r.status === 201,
        });
    }

    const orderRes = http.post(`${BASE_URL}/order/CreateOrderAfter`, JSON.stringify({}), authHeaders);

    const isOrderCreated = check(orderRes, {
        'order creation status is 201/200': (r) => r.status === 200 || r.status === 201,
        'has order id': (r) => r.json('order_id') !== undefined, 
    });

    if (!isOrderCreated) {
        return;
    }

    // const orderId = orderRes.json('order_id'); 

    // const confirmRes = http.post(`${BASE_URL}/order/ConfirmOrder/${orderId}`, JSON.stringify({}), authHeaders);

    // const confirmOk = check(confirmRes, { 'Confirm Order OK': (r) => r.status === 200 });


    // if (confirmOk) {
    //     completedJourneys.add(1);
    // }

    sleep(1);
}