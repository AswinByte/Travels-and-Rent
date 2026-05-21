import Invoice from "../../models/Invoice.js";
import Booking from "../../models/Booking.js";
import PDFDocument from "pdfkit";

// Generate Invoice
export const generateInvoice = async (
  req,
  res
) => {
  try {

    const booking = await Booking.findById(
      req.params.bookingId
    ).populate("user");

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    const invoice = await Invoice.create({
      booking: booking._id,

      customerName: booking.user.name,

      invoiceNumber:
        "INV-" + Date.now(),

      amount: booking.totalAmount,

      paymentStatus:
        booking.paymentStatus,
    });

    res.status(201).json(invoice);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Invoices
export const getInvoices = async (
  req,
  res
) => {
  try {

    const invoices = await Invoice.find()
      .populate("booking");

    res.status(200).json(invoices);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const downloadInvoice = async (
  req,
  res
) => {
  try {

    const invoice =
      await Invoice.findById(
        req.params.id
      );

    const doc = new PDFDocument();

    res.setHeader(
      "Content-Type",
      "application/pdf"
    );

    res.setHeader(
      "Content-Disposition",
      `attachment; filename=invoice.pdf`
    );

    doc.pipe(res);

    doc.fontSize(20)
      .text("Travel Invoice");

    doc.moveDown();

    doc.text(
      `Invoice Number: ${invoice.invoiceNumber}`
    );

    doc.text(
      `Customer: ${invoice.customerName}`
    );

    doc.text(
      `Amount: ₹${invoice.amount}`
    );

    doc.text(
      `Payment Status: ${invoice.paymentStatus}`
    );

    doc.end();

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};