import React from 'react';
import { useForm , Link } from '@inertiajs/react';

export default function OrderDetailForm({ orderDetail = {}, orders, products }) {
    const { data, setData, post, put, processing, errors } = useForm({
        order_id: orderDetail.order_id || '',
        product_id: orderDetail.product_id || '',
        quantity: orderDetail.quantity || '',
        price: orderDetail.price || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        orderDetail.id ? put(route('orderDetails.update', orderDetail.id)) : post(route('orderDetails.store'));
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold mb-4">{orderDetail.id ? 'Edit Order Detail' : 'Create Order Detail'}</h1>
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <label>Order</label>
                <select value={data.order_id} onChange={(e) => setData('order_id', e.target.value)}>
                    {orders.map(order => (
                        <option key={order.id} value={order.id}>Order #{order.id}</option>
                    ))}
                </select>
                {errors.order_id && <div>{errors.order_id}</div>}

                <label>Product</label>
                <select value={data.product_id} onChange={(e) => setData('product_id', e.target.value)}>
                    {products.map(product => (
                        <option key={product.id} value={product.id}>{product.name}</option>
                    ))}
                </select>
                {errors.product_id && <div>{errors.product_id}</div>}

                <label>Quantity</label>
                <input type="number" value={data.quantity} onChange={(e) => setData('quantity', e.target.value)} />

                <label>Price</label>
                <input type="number" value={data.price} onChange={(e) => setData('price', e.target.value)} />

                <button type="submit" disabled={processing}>Save</button>
            </form>
        </div>
    );
}
