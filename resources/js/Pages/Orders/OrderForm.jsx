import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';

export default function OrderForm({ order = {}, customers, products }) {
    const { data, setData, post, put, processing, errors } = useForm({
        customer_id: order.customer_id || '',
        status: order.status || 'pending',
        order_details: order.order_details || [],
    });

    const addOrderDetail = () => {
        setData('order_details', [...data.order_details, { product_id: '', quantity: 1, price: 0 }]);
    };

    const removeOrderDetail = (index) => {
        const updatedDetails = [...data.order_details];
        updatedDetails.splice(index, 1);
        setData('order_details', updatedDetails);
    };

    const updatePrice = (index, productId) => {
        const product = products.find(p => p.id == productId);
        const updatedDetails = [...data.order_details];
        updatedDetails[index].price = product ? product.price : 0;
        setData('order_details', updatedDetails);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        order.id ? put(route('orders.update', order.id)) : post(route('orders.store'));
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen rounded-lg shadow-md">
            <h1 className="text-3xl font-bold text-center text-green-700 mb-6">
                {order.id ? 'แก้ไขคำสั่งซื้อ' : 'สร้างคำสั่งซื้อ'}
            </h1>
            <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">ลูกค้า</label>
                    <select
                        value={data.customer_id}
                        onChange={(e) => setData('customer_id', e.target.value)}
                        className="shadow-md border rounded-lg w-full py-2 px-3 text-gray-700 focus:ring focus:ring-green-300"
                    >
                        <option value="">เลือกลูกค้า</option>
                        {customers.map(customer => (
                            <option key={customer.id} value={customer.id}>{customer.name}</option>
                        ))}
                    </select>
                    {errors.customer_id && <p className="text-red-500 text-xs italic mt-1">{errors.customer_id}</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">สถานะ</label>
                    <select
                        value={data.status}
                        onChange={(e) => setData('status', e.target.value)}
                        className="shadow-md border rounded-lg w-full py-2 px-3 text-gray-700 focus:ring focus:ring-green-300"
                    >
                        <option value="pending">Pending</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </div>

                <h2 className="text-xl font-semibold mb-4">รายการสินค้า</h2>
                {data.order_details.map((detail, index) => (
                    <div key={index} className="flex space-x-2 items-center mb-2">
                        <select
                            value={detail.product_id}
                            onChange={(e) => {
                                const updatedDetails = [...data.order_details];
                                updatedDetails[index].product_id = e.target.value;
                                updatePrice(index, e.target.value);
                                setData('order_details', updatedDetails);
                            }}
                            className="shadow-md border rounded-lg py-2 px-3"
                        >
                            <option value="">เลือกสินค้า</option>
                            {products.map(product => (
                                <option key={product.id} value={product.id}>{product.name}</option>
                            ))}
                        </select>

                        <input
                            type="number"
                            value={detail.quantity}
                            min="1"
                            onChange={(e) => {
                                const updatedDetails = [...data.order_details];
                                updatedDetails[index].quantity = e.target.value;
                                setData('order_details', updatedDetails);
                            }}
                            className="shadow-md border rounded-lg py-2 px-3 w-16 text-center"
                        />

                        <input
                            type="number"
                            value={detail.price}
                            disabled
                            className="shadow-md border rounded-lg py-2 px-3 w-24 bg-gray-100 text-center"
                        />

                        <button
                            type="button"
                            onClick={() => removeOrderDetail(index)}
                            className="text-red-500 hover:text-red-700"
                        >
                            ❌
                        </button>
                    </div>
                ))}

                <button
                    type="button"
                    onClick={addOrderDetail}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg mb-4"
                >
                    + เพิ่มสินค้า
                </button>

                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg focus:ring focus:ring-green-300 shadow-md"
                        disabled={processing}
                    >
                        {order.id ? 'อัปเดตคำสั่งซื้อ' : 'สร้างคำสั่งซื้อ'}
                    </button>
                </div>
            </form>
        </div>
    );
}
