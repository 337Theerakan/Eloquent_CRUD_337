import React from 'react';
import { useForm , Link } from '@inertiajs/react';

export default function CustomerForm({ customer = {} }) {
    const { data, setData, post, put, processing, errors } = useForm({
        name: customer.name || '',
        email: customer.email || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        customer.id ? put(route('customers.update', customer.id)) : post(route('customers.store'));
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>Name</label>
            <input value={data.name} onChange={(e) => setData('name', e.target.value)} />
            {errors.name && <div>{errors.name}</div>}
            <label>Email</label>
            <input value={data.email} onChange={(e) => setData('email', e.target.value)} />
            {errors.email && <div>{errors.email}</div>}
            <button type="submit" disabled={processing}>Save</button>
        </form>
    );
}
