import { useEffect, useMemo } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Link } from "@inertiajs/inertia-react";
import NavigationDialog from '../../Components/NavigationDialog';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function SalesSystemPage({ customers, products, orders, customerOrderCount }) {
  useEffect(() => {
    console.log("Component mounted", { customers, products, orders, customerOrderCount });
  }, [customers, products, orders, customerOrderCount]);

  if (!customers || !products || !orders || !customerOrderCount) {
    return <div className="text-center text-gray-600 p-6">Loading...</div>;
  }

  const customerPurchaseSummary = useMemo(() => {
    return customers.map(customer => {
      const customerOrders = orders.filter(order => order.customer_id === customer.id);
      const totalSpent = Math.round(customerOrders.reduce((sum, order) => sum + Number(order.total_price), 0));
      return { id: customer.id, name: customer.name, orderCount: customerOrders.length, totalSpent };
    });
  }, [customers, orders]);

  const chartData = useMemo(() => ({
    labels: customerPurchaseSummary.map(customer => customer.name),
    datasets: [
      {
        label: "จำนวนการสั่งซื้อ",
        data: customerPurchaseSummary.map(customer => customer.orderCount),
        backgroundColor: "rgba(75, 192, 192, 0.4)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
        yAxisID: "y",
      },
      {
        label: "จำนวนเงิน (฿)",
        data: customerPurchaseSummary.map(customer => customer.totalSpent),
        backgroundColor: "rgba(255, 159, 64, 0.4)",
        borderColor: "rgba(255, 159, 64, 1)",
        borderWidth: 1,
        yAxisID: "y1",
      },
    ],
  }), [customerPurchaseSummary]);

  return (
    <div className="max-w-6xl mx-auto p-8 bg-gray-50 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-green-700">Sales System</h1>
        <NavigationDialog />
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Orders per Customer</h2>
        <Bar data={chartData} options={{ responsive: true, scales: { y: { beginAtZero: true }, y1: { beginAtZero: true, position: "right" } } }} />
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Customer Purchase Summary</h2>
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg p-6">
          <table className="w-full border-collapse border border-gray-200">
            <thead className="bg-blue-100">
              <tr>
                <th className="border border-gray-300 p-3">Customer Name</th>
                <th className="border border-gray-300 p-3">Order Count</th>
                <th className="border border-gray-300 p-3">Total Spent</th>
              </tr>
            </thead>
            <tbody>
              {customerPurchaseSummary.map(customer => (
                <tr key={customer.id} className="text-center hover:bg-gray-100">
                  <td className="border border-gray-300 p-3">{customer.name}</td>
                  <td className="border border-gray-300 p-3">{customer.orderCount}</td>
                  <td className="border border-gray-300 p-3">{new Intl.NumberFormat("th-TH", { style: "currency", currency: "THB" }).format(customer.totalSpent)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Customers ({customers.length})</h2>
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg p-6">
          <table className="w-full border-collapse border border-gray-200">
            <thead className="bg-green-100">
              <tr>
                <th className="border border-gray-300 p-3">Customer Name</th>
              </tr>
            </thead>
            <tbody>
              {customers.map(customer => (
                <tr key={customer.id} className="text-center hover:bg-gray-100">
                  <td className="border border-gray-300 p-3">{customer.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
