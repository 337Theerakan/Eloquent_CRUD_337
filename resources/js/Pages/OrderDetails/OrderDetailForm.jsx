import React from 'react';
import { useForm, Link } from '@inertiajs/react';

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
        <div className="max-w-3xl mx-auto p-6 bg-gray-50 min-h-screen rounded-lg shadow-md">
            <h1 className="text-3xl font-bold text-center text-green-700 mb-6">
                {orderDetail.id ? 'แก้ไขรายละเอียดคำสั่งซื้อ' : 'เพิ่มรายละเอียดคำสั่งซื้อ'}
            </h1>
            <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">คำสั่งซื้อ</label>
                    <select value={data.order_id} onChange={(e) => setData('order_id', e.target.value)} className="shadow-md border rounded-lg w-full py-2 px-3 text-gray-700 focus:ring focus:ring-green-300">
                        <option value="">เลือกคำสั่งซื้อ</option>
                        {orders.map(order => (
                            <option key={order.id} value={order.id}>Order #{order.id}</option>
                        ))}
                    </select>
                    {errors.order_id && <p className="text-red-500 text-xs italic mt-1">{errors.order_id}</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">สินค้า</label>
                    <select value={data.product_id} onChange={(e) => setData('product_id', e.target.value)} className="shadow-md border rounded-lg w-full py-2 px-3 text-gray-700 focus:ring focus:ring-green-300">
                        <option value="">เลือกสินค้า</option>
                        {products.map(product => (
                            <option key={product.id} value={product.id}>{product.name}</option>
                        ))}
                    </select>
                    {errors.product_id && <p className="text-red-500 text-xs italic mt-1">{errors.product_id}</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">จำนวน</label>
                    <input type="number" value={data.quantity} onChange={(e) => setData('quantity', e.target.value)} className="shadow-md border rounded-lg w-full py-2 px-3 text-gray-700 focus:ring focus:ring-green-300" />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">ราคา</label>
                    <input type="number" value={data.price} onChange={(e) => setData('price', e.target.value)} className="shadow-md border rounded-lg w-full py-2 px-3 text-gray-700 focus:ring focus:ring-green-300" />
                </div>

                <div className="flex justify-between">
                <Link
                        href={route('orderDetails.index')}
                        className="bg-gray-500 hover:bg-gray-700 text-white font-semibold py-2 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
                    >
                        ย้อนกลับ
                    </Link>
                    
                    <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg focus:ring focus:ring-green-300 shadow-md" disabled={processing}>
                        {orderDetail.id ? 'อัปเดตรายละเอียด' : 'เพิ่มรายละเอียด'}
                    </button>

                </div>
            </form>
        </div>
    );
}
