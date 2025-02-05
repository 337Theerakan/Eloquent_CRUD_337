'use client'

import { useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle, TransitionChild } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Link } from '@inertiajs/react'

export default function NavigationDialog() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        Open Navigation
      </button>

      <Dialog open={open} onClose={setOpen} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity duration-500 ease-in-out data-closed:opacity-0"
        />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <DialogPanel
                transition
                className="pointer-events-auto relative w-screen max-w-md transform transition duration-500 ease-in-out data-closed:translate-x-full sm:duration-700"
              >
                <TransitionChild>
                  <div className="absolute top-0 left-0 -ml-8 flex pt-4 pr-2 duration-500 ease-in-out data-closed:opacity-0 sm:-ml-10 sm:pr-4">
                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      className="relative rounded-md text-gray-300 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden"
                    >
                      <span className="absolute -inset-2.5" />
                      <span className="sr-only">Close panel</span>
                      <XMarkIcon aria-hidden="true" className="size-6" />
                    </button>
                  </div>
                </TransitionChild>

                <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                  <div className="px-4 sm:px-6">
                    <DialogTitle className="text-base font-semibold text-gray-900">Navigation</DialogTitle>
                  </div>

                  <div className="relative mt-6 flex-1 px-4 sm:px-6">
                    {/* ปุ่มนำทางไปยังหน้าต่างๆ */}
                    <div className="flex flex-col space-y-4">
                      <Link href={route('sales.index')} className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-700">
                        ไปที่ Index
                      </Link>
                      <Link href={route('products.index')} className="bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-700">
                        ไปที่ Inprod
                      </Link>
                      <Link href={route('customers.index')} className="bg-green-500 text-white py-2 px-4 rounded hover:bg-red-700">
                        ไปที่ Customers
                      </Link>
                      <Link href={route('orders.index')} className="bg-red-500 text-white py-2 px-4 rounded hover:bg-green-700">
                        ไปที่ Orders
                      </Link>
                      <Link href={route('orderDetails.index')} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">
                        ไปที่ Order Details
                      </Link>
                    </div>
                  </div>
                </div>
              </DialogPanel>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  )
}
