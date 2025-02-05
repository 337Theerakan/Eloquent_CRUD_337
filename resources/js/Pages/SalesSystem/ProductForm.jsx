import React from 'react';
import { useForm } from '@inertiajs/react';

export default function ProductForm({ product = {} }) {
    const { data, setData, post, put, processing, errors, reset } = useForm({
        name: product.name || '',
        description: product.description || '',
        price: product.price || '',
        stock: product.stock || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (product.id) {
            put(route('products.update', product.id), {
                onSuccess: () => reset(), // Reset after successful update
            });
        } else {
            post(route('products.store'), {
                onSuccess: () => reset(), // Reset after successful creation
            });
        }
    };

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">{product.id ? 'แก้ไขสินค้า' : 'เพิ่มสินค้าใหม่'}</h1>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg space-y-6">
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 text-sm font-medium mb-2">ชื่อสินค้า</label>
                    <input
                        type="text"
                        id="name"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        className="shadow-md appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    {errors.name && <div className="text-red-500 text-xs italic mt-1">{errors.name}</div>}
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block text-gray-700 text-sm font-medium mb-2">รายละเอียด</label>
                    <textarea
                        id="description"
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                        className="shadow-md appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    ></textarea>
                </div>
                <div className="mb-4">
                    <label htmlFor="price" className="block text-gray-700 text-sm font-medium mb-2">ราคา</label>
                    <input
                        type="number"
                        id="price"
                        value={data.price}
                        onChange={(e) => setData('price', e.target.value)}
                        className="shadow-md appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    {errors.price && <div className="text-red-500 text-xs italic mt-1">{errors.price}</div>}
                </div>
                <div className="mb-4">
                    <label htmlFor="stock" className="block text-gray-700 text-sm font-medium mb-2">จำนวนคงเหลือ</label>
                    <input
                        type="number"
                        id="stock"
                        value={data.stock}
                        onChange={(e) => setData('stock', e.target.value)}
                        className="shadow-md appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    {errors.stock && <div className="text-red-500 text-xs italic mt-1">{errors.stock}</div>}
                </div>
                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className={`bg-blue-500 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${processing ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={processing}
                    >
                        {processing ? 'กำลังบันทึก...' : (product.id ? 'อัปเดตสินค้า' : 'เพิ่มสินค้า')}
                    </button>
                </div>
            </form>
        </div>
    );
}
