import Bill from "../models/Bill.js";
import puppeteer from "puppeteer";

// ✅ Helper: generate invoice HTML
const generateInvoiceHTML = (items, customerName, customerEmail, subTotal, totalWithGST, gstRate) => {
  return `
  <html>
  <head>
    <style>
      @page {
        margin: 0;
      }
      body {
        font-family: Arial, sans-serif;
        background: #fff;
        padding: 30px;
        color: #333;
        -webkit-print-color-adjust: exact !important;
        color-adjust: exact !important;
      }

      /* Header */
      .header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        border-bottom: 1px solid #ddd;
        padding-bottom: 10px;
      }
      .logo {
        display: flex;
        align-items: center;
        font-weight: bold;
        font-size: 18px;
        color: #1d2352;
      }
      .logo img {
        width: 40px;
        margin-right: 8px;
      }
      .invoice-title {
        text-align: right;
      }
      .invoice-title h2 {
        margin: 0;
        font-size: 18px;
        font-weight: bold;
      }
      .invoice-title small {
        font-size: 12px;
        color: #666;
      }

      /* Customer Section */
      .customer-box {
        margin-top: 20px;
        border-radius: 12px;
        padding: 20px;
        background: linear-gradient(90deg, #1d2352, #0a3c27);
        color: #fff;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .customer-box h3 {
        margin: 0;
        font-size: 20px;
        font-weight: bold;
        color: #CCF575; /* ✅ Highlight customer name */
      }
      .customer-box .label {
        font-size: 12px;
        color: #ddd;
      }
      .customer-box .email {
        background: #fff;
        color: #333;
        padding: 6px 12px;
        border-radius: 20px;
        font-size: 14px;
        margin-top: 6px;
        text-align: right;
      }
      .customer-box .right {
        text-align: right;
      }
      .customer-box .date {
        font-size: 14px;
        color: #ddd;
      }

      /* Table */
      table {
        width: 100%;
        margin-top: 20px;
        border-collapse: collapse;
        font-size: 14px;
      }
      th {
        background: linear-gradient(90deg, #1d2352, #0a3c27);
        color: #fff;
        text-align: left;
        padding: 10px;
      }
      th:first-child {
        border-top-left-radius: 10px;
      }
      th:last-child {
        border-top-right-radius: 10px;
      }
      td {
        background: #fafafa;
        padding: 10px;
        border-bottom: 1px solid #eee;
      }
      tr:nth-child(even) td {
        background: #fff;
      }

      /* Totals */
      .totals {
        margin-top: 20px;
        width: 250px;
        float: right;
        border: 1px solid #eee;
        border-radius: 10px;
        padding: 15px;
      }
      .totals table {
        width: 100%;
        border: none;
      }
      .totals td {
        border: none;
        padding: 6px 0;
      }
      .totals .bold {
        font-weight: bold;
      }
      .totals .grand {
        color: #0077ff;
        font-size: 16px;
        font-weight: bold;
      }
    </style>
  </head>
  <body>
    <!-- Header -->
    <!-- Header -->
    <div style="display:flex; justify-content:space-between; align-items:flex-start; border-bottom:1px solid #ddd; padding-bottom:10px;">
      <div style="display:flex; align-items:center;">
        <!-- ✅ Logo placeholder -->
        <img src="https://dummyimage.com/40x40/1d2352/ffffff&text=L" alt="Levitation Logo" style="width:40px; margin-right:8px;" />
        <div style="display:flex; flex-direction:column; line-height:1.2; font-size:18px; font-weight:bold; color:#1d2352;">
          <div>Levitation</div>
          <small style="font-weight:normal; font-size:12px; color:#555;">Infotech</small>
        </div>
      </div>
      <div style="text-align:right;">
        <h2 style="margin:0; font-size:18px; font-weight:bold;">INVOICE GENERATOR</h2>
        <small style="font-size:12px; color:#666;">Sample Output</small>
      </div>
    </div>


    <!-- Customer Info -->
    <div class="customer-box">
      <div>
        <div class="label">Customer Name</div>
        <h3>${customerName}</h3>
      </div>
      <div class="right">
        <div class="date">Date : ${new Date().toLocaleDateString()}</div>
        <div class="email">${customerEmail}</div>
      </div>
    </div>

    <!-- Table -->
    <table>
      <thead>
        <tr>
          <th>Product</th>
          <th>Qty</th>
          <th>Rate</th>
          <th>Total Amount</th>
        </tr>
      </thead>
      <tbody>
        ${items.map(i => `
        <tr>
          <td>${i.name}</td>
          <td>${i.quantity}</td>
          <td>${i.price}</td>
          <td>₹ ${(i.price * i.quantity).toFixed(2)}</td>
        </tr>`).join("")}
      </tbody>
    </table>

    <!-- Totals -->
    <div class="totals">
      <table>
        <tr>
          <td>Total Charges</td>
          <td>₹ ${subTotal.toFixed(2)}</td>
        </tr>
        <tr>
          <td>GST (${(gstRate * 100).toFixed(0)}%)</td>
          <td>₹ ${(subTotal * gstRate).toFixed(2)}</td>
        </tr>
        <tr>
          <td class="bold">Total Amount</td>
          <td class="grand">₹ ${totalWithGST.toFixed(2)}</td>
        </tr>
      </table>
    </div>

    <div style="clear:both"></div>
  </body>
  </html>
  `;
};

// ✅ Main Controller
export const generateBill = async (req, res) => {
  try {
    const { items, customerName, customerEmail } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "No items provided" });
    }

    // Subtotal & GST
    const subTotal = items.reduce((acc, i) => acc + i.price * i.quantity, 0);
    const gstRate = 0.18;
    const totalWithGST = subTotal + subTotal * gstRate;

    // Save to DB
    const bill = new Bill({
      user: req.user.id,
      items,
      subTotal,
      totalWithGST,
      gstRate,
      customerName,
      customerEmail,
    });
    await bill.save();

    // Puppeteer PDF
   const browser = await puppeteer.launch({
      headless: "new",   // modern headless mode
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-gpu",
      ],
      executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || puppeteer.executablePath()
    });
    const page = await browser.newPage();

    const html = generateInvoiceHTML(items, customerName, customerEmail, subTotal, totalWithGST, gstRate);
    await page.setContent(html, { waitUntil: "networkidle0" });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: 0, right: 0, bottom: 0, left: 0 }
    });

    await browser.close();

    // Send PDF
    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=invoice.pdf",
    });

    res.send(pdfBuffer);
  } catch (err) {
    console.error("Error in generateBill:", err);
    res.status(500).json({ message: err.message });
  }
};
