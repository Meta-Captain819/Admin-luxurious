import connectDb from "@/app/utils/connectDB";
import order from "@/app/models/order";

export default async function handler(req, res) {
  await connectDb();

  const { action } = req.query; // Extract action from the URL
  const { orderId, status } = req.body; // Get data from the request body

  try {
    if (req.method === "POST") {
      // Handle updating order status
      if (action === "updateOrderStatus") {
        if (!orderId || !status) {
          return res
            .status(400)
            .json({ message: "Order ID and status are required." });
        }

        // Update the order status
        const updatedOrder = await order.findByIdAndUpdate(
          orderId,
          { orderStatus: status },
          { new: true } // Return the updated document
        );

        if (!updatedOrder) {
          return res.status(404).json({ message: "Order not found." });
        }

        return res.status(200).json({
          message: "Order status updated successfully.",
          order: updatedOrder,
        });
      }

      // Handle removing an order
      if (action === "removeOrder") {
        if (!orderId) {
          return res.status(400).json({ message: "Order ID is required." });
        }

        // Remove the order
        const removedOrder = await order.findByIdAndDelete(orderId);

        if (!removedOrder) {
          return res.status(404).json({ message: "Order not found." });
        }

        return res.status(200).json({
          message: "Order removed successfully.",
          order: removedOrder,
        });
      }
    }

    // Invalid method or action
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({
      message: `Method ${req.method} not allowed or action not supported.`,
    });
  } catch (error) {
    console.error("API Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
