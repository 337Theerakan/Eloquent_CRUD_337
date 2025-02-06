<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Customer;
use App\Models\OrderDetail;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;

class OrderController extends Controller
{
    /**
     * แสดงรายการ Order ทั้งหมด
     */
    public function index()
    {
        $orders = Order::with('customer', 'orderDetails.product')->get();

        return Inertia::render('Orders/OrderList', [
            'orders' => $orders
        ]);
    }

    /**
     * แสดงฟอร์มสร้าง Order ใหม่
     */
    public function create()
{
    $customers = Customer::all();
    $products = Product::all();

    return Inertia::render('Orders/OrderForm', [
        'customers' => $customers,
        'products' => $products
    ]);
}

    /**
     * บันทึก Order ใหม่ลงฐานข้อมูล
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'customer_id' => 'required|exists:customers,id',
            'status' => 'required|in:pending,completed,cancelled',
            'order_details' => 'required|array',
            'order_details.*.product_id' => 'required|exists:products,id',
            'order_details.*.quantity' => 'required|integer|min:1',
            'order_details.*.price' => 'required|numeric|min:0',
        ]);

        try {
            $order = Order::create([
                'customer_id' => $validated['customer_id'],
                'total_price' => 0,
                'status' => $validated['status'],
            ]);

            $total_price = 0;

            foreach ($validated['order_details'] as $detail) {
                $total_price += $detail['quantity'] * $detail['price'];

                OrderDetail::create([
                    'order_id' => $order->id,
                    'product_id' => $detail['product_id'],
                    'quantity' => $detail['quantity'],
                    'price' => $detail['price'],
                ]);
            }

            $order->update(['total_price' => $total_price]);

            return redirect()->route('orders.index')->with('message', 'Order created successfully');
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return redirect()->back()->with('error', 'Failed to create order');
        }
    }

    /**
     * แสดงฟอร์มแก้ไข Order
     */
    public function edit(Order $order)
{
    $order->load('orderDetails.product');
    $customers = Customer::all();
    $products = Product::all();

    return Inertia::render('Orders/OrderForm', [
        'order' => $order,
        'customers' => $customers,
        'products' => $products
    ]);
}

    /**
     * อัปเดตข้อมูล Order
     */
    public function update(Request $request, Order $order)
    {
        // validated ข้อมูลที่รับมาจากฟอร์ม โดยต้องมีข้อมูลที่ต้องการและถูกต้อง 
        $validated = $request->validate([
            'customer_id' => 'required|exists:customers,id',
            'status' => 'required|in:pending,completed,cancelled',
            'order_details' => 'required|array',
            'order_details.*.product_id' => 'required|exists:products,id',
            'order_details.*.quantity' => 'required|integer|min:1',
            'order_details.*.price' => 'required|numeric|min:0',
        ]);

        try {
            $order->update([
                'customer_id' => $validated['customer_id'],
                'status' => $validated['status'],
            ]);

            // ลบ OrderDetail เก่า
            $order->orderDetails()->delete();

            $total_price = 0;
            foreach ($validated['order_details'] as $detail) {
                $total_price += $detail['quantity'] * $detail['price'];

                OrderDetail::create([
                    'order_id' => $order->id,
                    'product_id' => $detail['product_id'],
                    'quantity' => $detail['quantity'],
                    'price' => $detail['price'],
                ]);
            }

            $order->update(['total_price' => $total_price]);

            return redirect()->route('orders.index')->with('message', 'Order updated successfully');
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return redirect()->back()->with('error', 'Failed to update order');
        }
    }

    /**
     * ลบ Order และ OrderDetail ทั้งหมดที่เกี่ยวข้อง
     */
    public function destroy(Order $order)
    {
        try {
            $order->orderDetails()->delete();
            $order->delete();
            return redirect()->route('orders.index')->with('message', 'Order deleted successfully');
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return redirect()->back()->with('error', 'Failed to delete order');
        }
    }
}
