import React from 'react';
import { useForm } from '@inertiajs/react';


export default function ProductForm({ product = {} }) {
    const { data, setData, post, put, processing, errors } = useForm({
        name: product.name || '',
        description: product.description || '',
        price: product.price || '',
        stock: product.stock || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (product.id) {
            put(route('products.update', product.id));
        } else {
            post(route('products.store'));
        }
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold mb-4">{product.id ? 'แก้ไขสินค้า' : 'เพิ่มสินค้าใหม่'}</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">ชื่อสินค้า</label>
                    <input
                        type="text"
                        id="name"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    {errors.name && <div className="text-red-500 text-xs italic">{errors.name}</div>}
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">รายละเอียด</label>
                    <textarea
                        id="description"
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    ></textarea>
                </div>
                <div className="mb-4">
                    <label htmlFor="price" className="block text-gray-700 text-sm font-bold mb-2">ราคา</label>
                    <input
                        type="number"
                        id="price"
                        value={data.price}
                        onChange={(e) => setData('price', e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    {errors.price && <div className="text-red-500 text-xs italic">{errors.price}</div>}
                </div>
                <div className="mb-4">
                    <label htmlFor="stock" className="block text-gray-700 text-sm font-bold mb-2">จำนวนคงเหลือ</label>
                    <input
                        type="number"
                        id="stock"
                        value={data.stock}
                        onChange={(e) => setData('stock', e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    {errors.stock && <div className="text-red-500 text-xs italic">{errors.stock}</div>}
                </div>
                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        disabled={processing}
                    >
                        {product.id ? 'อัปเดตสินค้า' : 'เพิ่มสินค้า'}
                    </button>
                </div>
            </form>
        </div>
    );
}
