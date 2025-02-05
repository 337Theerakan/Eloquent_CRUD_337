import { useEffect, useMemo } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Link } from "@inertiajs/inertia-react";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function SalesSystemPage({ customers, products, orders, customerOrderCount }) {
  useEffect(() => {
    console.log("Component mounted");
    console.log("Customers:", customers);
    console.log("Products:", products);
    console.log("Orders:", orders);
    console.log("Customer Order Count:", customerOrderCount);
  }, [customers, products, orders, customerOrderCount]);

  if (!customers || !products || !orders || !customerOrderCount) {
    console.log("Data is not available");
    return <div className="text-center text-gray-600 p-4">Loading...</div>;
  }

  const customerPurchaseSummary = useMemo(() => {
    return customers.map((customer) => {
      const customerOrders = orders.filter((order) => order.customer_id === customer.id);
      const totalSpent = Math.round(customerOrders.reduce((sum, order) => sum + Number(order.total_price), 0));

      return {
        id: customer.id,
        name: customer.name,
        orderCount: customerOrders.length,
        totalSpent,
      };
    });
  }, [customers, orders]);

  const chartData = useMemo(
    () => ({
      labels: customerPurchaseSummary.map((customer) => customer.name),
      datasets: [
        {
          label: "จำนวนการสั่งซื้อ",
          data: customerPurchaseSummary.map((customer) => customer.orderCount),
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
          yAxisID: "y",
        },
        {
          label: "จำนวนเงิน (฿)",
          data: customerPurchaseSummary.map((customer) => customer.totalSpent),
          backgroundColor: "rgba(255, 159, 64, 0.2)",
          borderColor: "rgba(255, 159, 64, 1)",
          borderWidth: 1,
          yAxisID: "y1",
        },
      ],
    }),
    [customerPurchaseSummary]
  );

  const chartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        position: "left",
        ticks: {
          stepSize: 1,
        },
      },
      y1: {
        beginAtZero: true,
        position: "right",
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  const formatNumber = (number) => {
    return new Intl.NumberFormat("th-TH", { style: "currency", currency: "THB" }).format(number);
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-green-600">Sales System</h1>
        <Link href="/products" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          View Products
        </Link>
      </div>

      <h2 className="text-xl font-semibold mb-2">Orders per Customer</h2>
      <div className="bg-white shadow-md rounded-lg p-4 mb-6">
        <Bar data={chartData} options={chartOptions} />
      </div>

      <h2 className="text-xl font-semibold mt-6 mb-2">Customer Purchase Summary</h2>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg p-4">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Customer Name</th>
              <th className="border border-gray-300 p-2">Order Count</th>
              <th className="border border-gray-300 p-2">Total Spent</th>
            </tr>
          </thead>
          <tbody>
            {customerPurchaseSummary.map((customer) => (
              <tr key={customer.id}>
                <td className="border border-gray-300 p-2">{customer.name}</td>
                <td className="border border-gray-300 p-2">{customer.orderCount}</td>
                <td className="border border-gray-300 p-2">{formatNumber(customer.totalSpent)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="text-xl font-semibold mt-6 mb-2">Customers ({customers.length})</h2>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg p-4">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Customer Name</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id}>
                <td className="border border-gray-300 p-2">{customer.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
