import http from 'k6/http';
import { check, sleep } from 'k6';
import execution from 'k6/execution';

export const options = {
    stages: [
        { duration: '30s', target: 200 },  
        { duration: '1m', target: 400 }, 
        { duration: '2m', target: 800 }, 
        { duration: '30s', target: 0 },    
    ],
    // vus: 1,
    // iterations: 1,
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
const TOTAL_USERS = 800;
export default function (data) {
    const products = data.products;
    
    if (!products || products.length === 0) {
        console.error("No products available to test!");
        return;
    }

    const headers = { 'Content-Type': 'application/json' };
    const counter = ((execution.vu.idInTest - 1) % TOTAL_USERS) + 1;

    const loginRes = http.post(`${BASE_URL}/user/Login`, JSON.stringify({
        email: `user${counter}@test.com`,
        password: '12345678',
    }), { headers });

    const isLoginSuccess = check(loginRes, {
        'login status is 200': (r) => r.status === 200,
        'has auth token': (r) => r.json('token') !== undefined,
    });

    if (!isLoginSuccess) {
        console.log(`status=${loginRes.status} body=${loginRes.body} user=${counter}`);
        return;
    }

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

        const cartRes = http.post(`${BASE_URL}/product/AddToCart/${realProductId}`, JSON.stringify({
            amount: 1,
        }), authHeaders);

        check(cartRes, {
            'add to cart status is 200/201': (r) => r.status === 200 || r.status === 201,
        });
    }

    const orderRes = http.post(`${BASE_URL}/order/CreateOrder`, JSON.stringify({}), authHeaders);

    const isOrderCreated = check(orderRes, {
        'order creation status is 201/200': (r) => r.status === 200 || r.status === 201,
        'has order_id': (r) => r.json('order_id') !== undefined, 
    });

    if (!isOrderCreated) {
        console.log(` Status: ${confirmRes.status} | Body: ${confirmRes.body}`)
        return;
    }
    const orderId = orderRes.json('order_id'); 

    const confirmRes = http.post(`${BASE_URL}/order/ConfirmOrder/${orderId}`, JSON.stringify({}), authHeaders);

    const confirmOk = check(confirmRes, { 'Confirm Order OK': (r) => r.status === 200 });

    // if (!confirmOk) {
    //     console.log(`[Error] Confirm failed for order ${orderId} | Status: ${confirmRes.status} | Body: ${confirmRes.body}`);
    // }
    // if (confirmOk) {
    //     completedJourneys.add(1);
    // }

    sleep(1);
}