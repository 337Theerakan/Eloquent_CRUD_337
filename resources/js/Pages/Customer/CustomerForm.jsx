import React from 'react';
import { useForm } from '@inertiajs/react';

export default function CustomerForm({ customer = {} }) {
    const { data, setData, post, put, processing, errors } = useForm({
        name: customer.name || '',
        email: customer.email || '',
        phone: customer.phone || '',
        address: customer.address || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        customer.id ? put(route('customers.update', customer.id)) : post(route('customers.store'));
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-gray-50 min-h-screen rounded-lg shadow-md">
            <h1 className="text-3xl font-bold text-center text-green-700 mb-6">
                {customer.id ? 'แก้ไขข้อมูลลูกค้า' : 'เพิ่มลูกค้าใหม่'}
            </h1>
            <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        ชื่อ
                    </label>
                    <input
                        type="text"
                        id="name"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        className="shadow-md border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:ring focus:ring-green-300"
                    />
                    {errors.name && <p className="text-red-500 text-xs italic mt-1">{errors.name}</p>}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        อีเมล
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        className="shadow-md border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:ring focus:ring-green-300"
                    />
                    {errors.email && <p className="text-red-500 text-xs italic mt-1">{errors.email}</p>}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                        เบอร์โทรศัพท์
                    </label>
                    <input
                        type="text"
                        id="phone"
                        value={data.phone}
                        onChange={(e) => setData('phone', e.target.value)}
                        className="shadow-md border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:ring focus:ring-green-300"
                    />
                    {errors.phone && <p className="text-red-500 text-xs italic mt-1">{errors.phone}</p>}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
                        ที่อยู่
                    </label>
                    <textarea
                        id="address"
                        value={data.address}
                        onChange={(e) => setData('address', e.target.value)}
                        className="shadow-md border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:ring focus:ring-green-300"
                    ></textarea>
                    {errors.address && <p className="text-red-500 text-xs italic mt-1">{errors.address}</p>}
                </div>
                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg focus:ring focus:ring-green-300 shadow-md"
                        disabled={processing}
                    >
                        {customer.id ? 'อัปเดตข้อมูลลูกค้า' : 'เพิ่มลูกค้า'}
                    </button>
                </div>
            </form>
        </div>
    );
}
