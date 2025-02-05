<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Customer;
use App\Models\Product;
use App\Models\Order;
use Illuminate\Support\Facades\Log;

class SalesSystemController extends Controller
{
    public function index()
    {
        Log::debug('Sales System index is called.');

        $customers = Customer::all();
        $products = Product::all();
        $orders = Order::with('orderDetails.product')->get();

        $customerOrderCount = $customers->map(function ($customer) {
            return [
                'customer_id' => $customer->id,
                'name' => $customer->name,
                'order_count' => $customer->orders()->count(),
            ];
        });

        return Inertia::render('SalesSystem/Index', [
            'customers' => $customers,
            'products' => $products,
            'orders' => $orders,
            'customerOrderCount' => $customerOrderCount,
        ]);
    }

    public function productIndex()
    {
        $products = Product::all();
        $orders = Order::with('orderDetails.product')->get();

        Log::debug('Products: ' . $products);
        Log::debug('Orders: ' . $orders);

        return Inertia::render('SalesSystem/Inprod', [
            'products' => $products,
            'orders' => $orders,
        ]);
    }
    
}
