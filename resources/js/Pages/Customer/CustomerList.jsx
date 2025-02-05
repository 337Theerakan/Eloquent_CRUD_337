import React from 'react';
import { usePage, Link } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';

export default function CustomerList() {
    const { customers } = usePage().props;

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this customer?')) {
            Inertia.delete(route('customers.destroy', id));
        }
    };

    return (
        <div>
            <h1>Customers</h1>
            <Link href={route('customers.create')}>Add Customer</Link>
            <ul>
                {customers.map((customer) => (
                    <li key={customer.id}>
                        {customer.name} ({customer.email})
                        <Link href={route('customers.edit', customer.id)}>Edit</Link>
                        <button onClick={() => handleDelete(customer.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
