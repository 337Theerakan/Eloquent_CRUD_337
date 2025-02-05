<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderDetail;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;

class OrderDetailController extends Controller
{
    /**
     * แสดงรายการ OrderDetail ทั้งหมด
     */
    public function index()
    {
        $orderDetails = OrderDetail::with('order', 'product')->get();
        return Inertia::render('OrderDetails/OrderDetailList', [
            'orderDetails' => $orderDetails
        ]);
    }

    /**
     * แสดงฟอร์มสร้าง OrderDetail ใหม่
     */
    public function create()
    {
        $orders = Order::all();
        $products = Product::all();

        return Inertia::render('OrderDetails/OrderDetailForm', [
            'orders' => $orders,
            'products' => $products
        ]);
    }

    /**
     * บันทึก OrderDetail ใหม่ลงฐานข้อมูล
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'order_id' => 'required|exists:orders,id',
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
            'price' => 'required|numeric|min:0',
        ]);

        OrderDetail::create($validated);

        return redirect()->route('orderDetails.index')->with('message', 'Order Detail created successfully');
    }

    /**
     * แสดงฟอร์มแก้ไข OrderDetail
     */
    public function edit(OrderDetail $orderDetail)
    {
        $orders = Order::all();
        $products = Product::all();

        return Inertia::render('OrderDetails/OrderDetailForm', [
            'orderDetail' => $orderDetail,
            'orders' => $orders,
            'products' => $products
        ]);
    }

    /**
     * อัปเดตข้อมูล OrderDetail
     */
    public function update(Request $request, OrderDetail $orderDetail)
    {
        $validated = $request->validate([
            'order_id' => 'required|exists:orders,id',
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
            'price' => 'required|numeric|min:0',
        ]);

        $orderDetail->update($validated);

        return redirect()->route('orderDetails.index')->with('message', 'Order Detail updated successfully');
    }

    /**
     * ลบ OrderDetail
     */
    public function destroy(OrderDetail $orderDetail)
    {
        $orderDetail->delete();
        return redirect()->route('orderDetails.index')->with('message', 'Order Detail deleted successfully');
    }
}
