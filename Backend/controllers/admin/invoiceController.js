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
      ).populate("booking");

    if (!invoice) {
      return res.status(404).json({
        message:
          "Invoice not found",
      });
    }

    const doc =
      new PDFDocument({
        margin: 40,
        size: "A4",
      });

    res.setHeader(
      "Content-Type",
      "application/pdf"
    );

    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${invoice.invoiceNumber}.pdf`
    );

    doc.pipe(res);

    // =====================
    // Header
    // =====================

    doc
      .rect(0, 0, 612, 90)
      .fill("#2563EB");

    doc
      .fillColor("#FFFFFF")
      .fontSize(24)
      .font("Helvetica-Bold")
      .text(
        "TRAVELS & RENTAL SERVICES",
        40,
        25
      );

    doc
      .fontSize(11)
      .font("Helvetica")
      .text(
        "Professional Travel & Vehicle Rental Solutions",
        40,
        58
      );

    doc.fillColor("black");

    // =====================
    // Invoice Info
    // =====================

    doc
      .roundedRect(
        40,
        120,
        530,
        90,
        10
      )
      .stroke("#CBD5E1");

    doc
      .fontSize(14)
      .font("Helvetica-Bold")
      .text(
        "Invoice Details",
        55,
        135
      );

    doc
      .fontSize(11)
      .font("Helvetica");

    doc.text(
      `Invoice No : ${invoice.invoiceNumber}`,
      55,
      165
    );

    doc.text(
      `Invoice Date : ${new Date(
        invoice.issueDate
      ).toLocaleDateString()}`,
      320,
      165
    );

    // =====================
    // Customer Info
    // =====================

    doc
      .roundedRect(
        40,
        230,
        530,
        100,
        10
      )
      .stroke("#CBD5E1");

    doc
      .fontSize(14)
      .font("Helvetica-Bold")
      .text(
        "Customer Information",
        55,
        245
      );

    doc
      .fontSize(11)
      .font("Helvetica");

    doc.text(
      `Customer Name : ${invoice.customerName}`,
      55,
      275
    );

    doc.text(
      `Booking ID : ${
        invoice.booking?._id ||
        "N/A"
      }`,
      55,
      295
    );

    // =====================
    // Invoice Table
    // =====================

    const tableY = 370;

    doc
      .rect(
        40,
        tableY,
        530,
        30
      )
      .fill("#2563EB");

    doc
      .fillColor("#FFFFFF")
      .fontSize(12)
      .font("Helvetica-Bold")
      .text(
        "Description",
        55,
        tableY + 8
      );

    doc.text(
      "Amount",
      460,
      tableY + 8
    );

    doc.fillColor("black");

    doc
      .rect(
        40,
        tableY + 30,
        530,
        45
      )
      .stroke();

    doc
      .fontSize(11)
      .font("Helvetica");

    doc.text(
      "Travel Package / Vehicle",
      55,
      tableY + 47
    );

    doc.text(
      `Rs. ${invoice.amount}`,
      460,
      tableY + 47
    );

    // =====================
    // Total Summary
    // =====================

    const subtotal =
      invoice.amount;

    const gst =
      Math.round(
        subtotal * 0.18
      );

    const total =
      subtotal + gst;

    doc
      .roundedRect(
        340,
        490,
        230,
        110,
        10
      )
      .fillAndStroke(
        "#F8FAFC",
        "#CBD5E1"
      );

    doc.fillColor("black");

    doc.text(
      `Subtotal : Rs. ${subtotal}`,
      360,
      515
    );

    doc.text(
      `GST (18%) : Rs. ${gst}`,
      360,
      540
    );

    doc
      .fontSize(14)
      .font("Helvetica-Bold")
      .text(
        `TOTAL : Rs. ${total}`,
        360,
        570
      );

    // =====================
    // Payment Status Badge
    // =====================

    const badgeColor =
      invoice.paymentStatus ===
      "paid"
        ? "#16A34A"
        : "#DC2626";

    doc
      .roundedRect(
        40,
        515,
        150,
        40,
        8
      )
      .fill(
        badgeColor
      );

    doc
      .fillColor("#FFFFFF")
      .fontSize(12)
      .font("Helvetica-Bold")
      .text(
        invoice.paymentStatus.toUpperCase(),
        78,
        528
      );

    doc.fillColor("black");

    // =====================
    // Footer
    // =====================

    doc
      .moveTo(
        40,
        690
      )
      .lineTo(
        570,
        690
      )
      .stroke("#CBD5E1");

    doc
      .fontSize(10)
      .fillColor("#64748B")
      .text(
        "Thank you for choosing Travels & Rental Services",
        0,
        710,
        {
          align:
            "center",
        }
      );

    doc.text(
      "support@travels.com | +91 98765 43210",
      {
        align:
          "center",
      }
    );

    doc.text(
      "www.travelsrental.com",
      {
        align:
          "center",
      }
    );

    doc.end();

  } catch (error) {

    res.status(500).json({
      message:
        error.message,
    });

  }
};


export const getInvoiceById =
  async (req, res) => {
    try {

      const invoice =
        await Invoice.findById(
          req.params.id
        ).populate("booking");

      if (!invoice) {
        return res.status(404).json({
          message:
            "Invoice not found",
        });
      }

      res.status(200).json(
        invoice
      );

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }
};

export const deleteInvoice =
  async (req, res) => {
    try {

      const invoice =
        await Invoice.findById(
          req.params.id
        );

      if (!invoice) {
        return res.status(404).json({
          message:
            "Invoice not found",
        });
      }

      await invoice.deleteOne();

      res.status(200).json({
        message:
          "Invoice deleted successfully",
      });

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }
};