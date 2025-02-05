import React from 'react';
import { usePage, Link } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import NavigationDialog from '../../Components/NavigationDialog';

export default function CustomerList() {
    const { customers } = usePage().props;

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this customer?')) {
            Inertia.delete(route('customers.destroy', id));
        }
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">รายชื่อลูกค้า</h1>
                <div className="flex space-x-4">
                    <Link href={route('customers.create')} className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded">
                        เพิ่มลูกค้าใหม่
                    </Link>
                    <NavigationDialog />
                </div>
            </div>
            <table className="w-full border-collapse border border-gray-300 mt-4">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border border-gray-300 px-4 py-2">ชื่อ</th>
                        <th className="border border-gray-300 px-4 py-2">อีเมล</th>
                        <th className="border border-gray-300 px-4 py-2">เบอร์โทรศัพท์</th>
                        <th className="border border-gray-300 px-4 py-2">ที่อยู่</th>
                        <th className="border border-gray-300 px-4 py-2">การดำเนินการ</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map((customer) => (
                        <tr key={customer.id} className="text-center">
                            <td className="border border-gray-300 px-4 py-2">{customer.name}</td>
                            <td className="border border-gray-300 px-4 py-2">{customer.email}</td>
                            <td className="border border-gray-300 px-4 py-2">{customer.phone || '-'}</td>
                            <td className="border border-gray-300 px-4 py-2">{customer.address || '-'}</td>
                            <td className="border border-gray-300 px-4 py-2">
                                <Link href={route('customers.edit', customer.id)} className="bg-blue-500 hover:bg-blue-700 text-white px-2 py-1 rounded mr-2">
                                    แก้ไข
                                </Link>
                                <button onClick={() => handleDelete(customer.id)} className="bg-red-500 hover:bg-red-700 text-white px-2 py-1 rounded">
                                    ลบ
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
