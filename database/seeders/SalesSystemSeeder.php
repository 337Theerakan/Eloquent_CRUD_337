<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Customer;
use App\Models\Product;
use App\Models\Order;
use App\Models\OrderDetail;
use Illuminate\Support\Facades\Log;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class SalesSystemSeeder extends Seeder
{
    public function run(): void
    {
        Product::factory(10)->create();

        Customer::factory(10)->create()->each(function ($customer) {
            Order::factory(2)->create(['customer_id' => $customer->id])->each(function ($order) {
                $orderDetails = OrderDetail::factory(3)->create(['order_id' => $order->id])->each(function ($detail) {
                    $detail->update(['product_id' => Product::inRandomOrder()->first()->id]);
                });
                $order->update(['total_price' => $orderDetails->sum(fn ($detail) => $detail->quantity * $detail->price)]);
            });
        });
    }
}
//php artisan db:seed --class=SalesSystemSeeder
//php artisan migrate:refresh --seed
//php artisan migrate:fresh
//php artisan optimize:clear
