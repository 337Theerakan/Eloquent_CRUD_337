<?php
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SalesSystemController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\OrderDetailController;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/sales', [SalesSystemController::class, 'index'])
    ->name('sales.index');

Route::get('/products', [SalesSystemController::class, 'productIndex'])
    ->name('products.index');

Route::get('/customers', [CustomerController::class, 'index'])
    ->name('customers.index');
Route::get('/orders', [OrderController::class, 'index'])
    ->name('orders.index');

Route::get('/orderDetails', [OrderDetailController::class, 'index'])
    ->name('orderDetails.index');

// resource คือ การสร้าง route ทั้งหมด ให้กับ controller ที่เรากำหนด โดยไม่ต้องสร้าง route แยกแต่ละ method ของ controller

Route::resource('products', ProductController::class);
Route::resource('customers', CustomerController::class);
Route::resource('orders', OrderController::class);
Route::resource('orderDetails', OrderDetailController::class);
Route::resource('orderDetails', OrderDetailController::class);


Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'show'])
        ->name('profile.show');
    Route::put('/profile', [ProfileController::class, 'update'])
        ->name('profile.update');
});

require __DIR__.'/auth.php';

//php artisan optimize:clear
