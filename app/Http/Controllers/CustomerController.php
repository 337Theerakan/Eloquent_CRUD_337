<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CustomerController extends Controller {
    public function index() {
        return Inertia::render('Customer/CustomerList', ['customers' => Customer::all()]);
    }

    public function create() {
        return Inertia::render('Customer/CustomerForm');
    }

    public function store(Request $request) {
        Customer::create($request->validate(['name' => 'required', 'email' => 'required|email']));
        return redirect()->route('customers.index');
    }

    public function edit(Customer $customer) {
        return Inertia::render('Customer/CustomerForm', ['customer' => $customer]);
    }

    public function update(Request $request, Customer $customer) {
        $customer->update($request->validate(['name' => 'required', 'email' => 'required|email']));
        return redirect()->route('customers.index');
    }

    public function destroy(Customer $customer) {
        $customer->delete();
        return redirect()->route('customers.index');
    }
}
