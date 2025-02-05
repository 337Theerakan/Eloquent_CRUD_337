import React from 'react';
import { usePage, Link } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import NavigationDialog from '../../Components/NavigationDialog';

export default function OrderList() {
    const { orders, flash } = usePage().props;

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this order?')) {
            Inertia.delete(route('orders.destroy', id));
        }
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            {flash?.message && (
                <div
                    className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4"
                    role="alert"
                >
                    {flash.message}
                </div>
            )}
            {flash?.error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                    {flash.error}
                </div>
            )}

            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">รายการคำสั่งซื้อ</h1>
                <div className="flex space-x-4">

                    <Link
                        href={route('orders.create')}
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    >
                        เพิ่มคำสั่งซื้อใหม่
                    </Link>
                    <NavigationDialog />
                </div>
            </div>

            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border border-gray-300 px-4 py-2">รหัสคำสั่งซื้อ</th>
                        <th className="border border-gray-300 px-4 py-2">ลูกค้า</th>
                        <th className="border border-gray-300 px-4 py-2">ราคารวม</th>
                        <th className="border border-gray-300 px-4 py-2">สถานะ</th>
                        <th className="border border-gray-300 px-4 py-2">การดำเนินการ</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order.id} className="text-center">
                            <td className="border border-gray-300 px-4 py-2">{order.id}</td>
                            <td className="border border-gray-300 px-4 py-2">{order.customer.name}</td>
                            <td className="border border-gray-300 px-4 py-2">{order.total_price} บาท</td>
                            <td className="border border-gray-300 px-4 py-2">{order.status}</td>
                            <td className="border border-gray-300 px-4 py-2">
                                <Link
                                    href={route('orders.edit', order.id)}
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
                                >
                                    แก้ไข
                                </Link>
                                <button
                                    onClick={() => handleDelete(order.id)}
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                                >
                                    ลบ
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="mt-6">
            </div>
        </div>
    );
}
