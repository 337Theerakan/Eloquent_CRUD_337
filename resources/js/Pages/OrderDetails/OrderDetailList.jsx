import React from 'react';
import { usePage, Link } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import NavigationDialog from '../../Components/NavigationDialog';

export default function OrderDetailList() {
    const { orderDetails } = usePage().props;

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this order detail?')) {
            Inertia.delete(route('orderDetails.destroy', id));
        }
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Order Details</h1>
                <div className="flex space-x-4">

                    <Link href={route('orderDetails.create')} className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded">
                        + Add Order Detail
                    </Link>
                    <NavigationDialog />
                </div>
            </div>
            <table className="w-full border-collapse border border-gray-300 mt-4">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border border-gray-300 px-4 py-2">Order ID</th>
                        <th className="border border-gray-300 px-4 py-2">Product</th>
                        <th className="border border-gray-300 px-4 py-2">Quantity</th>
                        <th className="border border-gray-300 px-4 py-2">Price</th>
                        <th className="border border-gray-300 px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {orderDetails.map((detail) => (
                        <tr key={detail.id} className="text-center">
                            <td className="border border-gray-300 px-4 py-2">{detail.order_id}</td>
                            <td className="border border-gray-300 px-4 py-2">{detail.product.name}</td>
                            <td className="border border-gray-300 px-4 py-2">{detail.quantity}</td>
                            <td className="border border-gray-300 px-4 py-2">{detail.price} บาท</td>
                            <td className="border border-gray-300 px-4 py-2">
                                <Link href={route('orderDetails.edit', detail.id)} className="bg-blue-500 hover:bg-blue-700 text-white px-2 py-1 rounded mr-2">
                                    Edit
                                </Link>
                                <button onClick={() => handleDelete(detail.id)} className="bg-red-500 hover:bg-red-700 text-white px-2 py-1 rounded">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
