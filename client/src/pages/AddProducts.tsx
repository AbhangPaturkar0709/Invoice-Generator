import React, { useState } from "react";
import Header from "../components/Header";
import { Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import API from "../context/api";

interface Product {
  name: string;
  price: number;
  quantity: number;
}

type SortField = "name" | "quantity" | null;
type SortOrder = "asc" | "desc" | "original";

const AddProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [originalProducts, setOriginalProducts] = useState<Product[]>([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [quantity, setQuantity] = useState<number | "">("");
  const [sortField, setSortField] = useState<SortField>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>("original");

  // modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");

  const handleAddProduct = () => {
    if (!name || !price || !quantity) return;

    const newProducts = [
      ...products,
      { name, price: Number(price), quantity: Number(quantity) },
    ];

    setProducts(newProducts);
    setOriginalProducts(newProducts);

    setName("");
    setPrice("");
    setQuantity("");
  };

  const handleDeleteProduct = (index: number) => {
    const updated = products.filter((_, i) => i !== index);
    setProducts(updated);
    setOriginalProducts(updated);
  };

  const toggleSort = (field: SortField) => {
    if (sortField !== field) {
      setSortField(field);
      setSortOrder("asc");
    } else {
      setSortOrder((prev) =>
        prev === "asc" ? "desc" : prev === "desc" ? "original" : "asc"
      );
    }

    if (sortOrder === "original") {
      setProducts([...originalProducts]);
      return;
    }

    const sorted = [...products].sort((a, b) => {
      if (field === "name") {
        return sortOrder === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else if (field === "quantity") {
        return sortOrder === "asc"
          ? a.quantity - b.quantity
          : b.quantity - a.quantity;
      }
      return 0;
    });

    setProducts(sorted);
  };

  const subTotal = products.reduce((acc, p) => acc + p.price * p.quantity, 0);
  const gst = subTotal * 0.18;
  const total = subTotal + gst;

const handleGenerateInvoice = async () => {
  try {
    if (!customerName.trim() || !customerEmail.trim()) {
      toast.error("Customer name and email are required");
      return;
    }

    // Open a blank window first (avoids popup block)
    const newWindow = window.open("", "_blank");

    const res = await API.post(
      "/bills/generate",
      { items: products, customerName, customerEmail },
      { responseType: "blob" }
    );

    // Create blob URL
    const pdfBlob = new Blob([res.data], { type: "application/pdf" });
    const pdfUrl = window.URL.createObjectURL(pdfBlob);

    // Load PDF in the new tab
    if (newWindow) {
      newWindow.location.href = pdfUrl;
    }

    // Reset modal & fields
    setIsModalOpen(false);
    setCustomerName("");
    setCustomerEmail("");

    toast.success("Invoice generated successfully");
  } catch (err) {
    console.error(err);
    toast.error("Error generating invoice");
  }
};





  return (
    <div className="relative h-full md:h-screen flex flex-col bg-black/90 text-white md:overflow-hidden">
      {/* ✅ Background Glow Effects */}
      <div
        className="absolute rounded-full blur-3xl z-0"
        style={{
          width: "clamp(150px, 20vw, 260px)",
          height: "clamp(150px, 22vw, 280px)",
          background: "#4F59A8",
          opacity: 0.3,
          top: "0%",
          left: "38%",
        }}
      />

      {/* ✅ Foreground Content */}
      <div className="relative z-10 flex flex-col flex-1">
        <Header isLogin={true} />

        <div className="flex-1 px-6 md:px-20 py-10 md:overflow-hidden flex flex-col">
          <h1 className="text-3xl font-bold mb-2">Add Products</h1>
          <p className="text-gray-400 mb-8">
            Add products to generate GST invoice PDF.
          </p>

          {/* ✅ Product form */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block mb-1 text-sm text-gray-300">
                Product Name
              </label>
              <input
                type="text"
                placeholder="Enter the product name"
                className="px-4 py-2 rounded-md bg-white/10 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#CCF575] w-full"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label className="block mb-1 text-sm text-gray-300">
                Product Price
              </label>
              <input
                type="text"
                inputMode="numeric"
                placeholder="Enter the price"
                className="px-4 py-2 rounded-md bg-white/10 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#CCF575] w-full"
                value={price}
                onChange={(e) => {
                  const val = e.target.value;
                  if (/^\d*$/.test(val)) {
                    setPrice(val === "" ? "" : Number(val));
                  }
                }}
              />
            </div>

            <div>
              <label className="block mb-1 text-sm text-gray-300">
                Quantity
              </label>
              <input
                type="text"
                inputMode="numeric"
                placeholder="Enter the Qty"
                className="px-4 py-2 rounded-md bg-white/10 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#CCF575] w-full"
                value={quantity}
                onChange={(e) => {
                  const val = e.target.value;
                  if (/^\d*$/.test(val)) {
                    setQuantity(val === "" ? "" : Number(val));
                  }
                }}
              />
            </div>
          </div>

          {/* ✅ Centered Add Product Button */}
          <div className="flex justify-center mb-8">
            <button
              onClick={handleAddProduct}
              className="bg-[#303030] hover:bg-[#305020] text-[#CCF575] font-medium px-6 py-2 rounded-md transition"
            >
              Add Product
            </button>
          </div>

          {/* ✅ Product Table */}
          <div className="flex-1 overflow-y-auto rounded-md border border-gray-700">
            <table className="w-full text-sm border-collapse">
              <thead className="sticky top-0 bg-white text-black">
                <tr className="text-left">
                  <th
                    className="py-3 px-4 cursor-pointer"
                    onClick={() => toggleSort("name")}
                  >
                    Product name{" "}
                    {sortField === "name" &&
                      (sortOrder === "asc"
                        ? "↑"
                        : sortOrder === "desc"
                        ? "↓"
                        : "↔")}
                  </th>
                  <th className="py-3 px-4">Price</th>
                  <th
                    className="py-3 px-4 cursor-pointer"
                    onClick={() => toggleSort("quantity")}
                  >
                    Quantity{" "}
                    {sortField === "quantity" &&
                      (sortOrder === "asc"
                        ? "↑"
                        : sortOrder === "desc"
                        ? "↓"
                        : "↔")}
                  </th>
                  <th className="py-3 px-4">Total Price</th>
                  <th className="py-3 px-2 w-8 text-center"></th>
                </tr>
              </thead>
              <tbody className="bg-black/40">
                {products.map((p, index) => (
                  <tr key={index} className="border-b border-gray-700">
                    <td className="py-3 px-4 italic text-gray-200">{p.name}</td>
                    <td className="py-3 px-4">{p.price}</td>
                    <td className="py-3 px-4">{p.quantity}</td>
                    <td className="py-3 px-4">INR {p.price * p.quantity}</td>
                    <td className="py-3 px-2 text-center">
                      <button
                        onClick={() => handleDeleteProduct(index)}
                        className="text-red-400 hover:text-red-600"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
                {products.length > 0 && (
                  <>
                    <tr className="border-t border-gray-700">
                      <td colSpan={3} className="py-3 px-4 text-right">
                        Sub-Total
                      </td>
                      <td className="py-3 px-4">INR {subTotal.toFixed(2)}</td>
                      <td />
                    </tr>
                    <tr>
                      <td colSpan={3} className="py-3 px-4 text-right">
                        Incl + GST 18%
                      </td>
                      <td className="py-3 px-4">INR {total.toFixed(2)}</td>
                      <td />
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>

          {/* ✅ Generate Invoice */}
          <div className="flex justify-center mt-6">
            <button
              disabled={products.length === 0}
              onClick={() => setIsModalOpen(true)}
              className={`w-100 px-6 py-3 rounded-md transition
                ${
                  products.length === 0
                    ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                    : "bg-[#303030] hover:bg-[#305020] text-[#CCF575] hover:bg-gray-900"
                }`}
            >
              Generate PDF Invoice
            </button>
          </div>
        </div>
      </div>

      {/* ✅ Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white text-black rounded-lg p-6 w-96">
            <h2 className="text-lg font-bold mb-4">Customer Info</h2>
            <input
              type="text"
              placeholder="Customer Name"
              className="border p-2 w-full mb-2 rounded"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Customer Email"
              className="border p-2 w-full mb-4 rounded"
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
              required
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setCustomerEmail("");
                  setCustomerName("");
                }}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleGenerateInvoice}
                className="px-4 py-2 bg-green-500 text-white rounded"
              >
                Generate PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddProducts;
