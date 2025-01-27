import connectDb from "@/app/utils/connectDB";
import order from "@/app/models/order";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      // Connect to the database
      await connectDb() 

      // Fetch orders with recent activities (modified orders)
      const activities = await order.find({ updatedAt: { $ne: null } })
        .sort({ updatedAt: -1 }) // Sort by most recently updated
        .select("_id user orderStatus createdAt updatedAt") // Select only the required fields
        .lean();

      // Respond with the activities
      res.status(200).json({ success: true, activities });
    } catch (error) {
      console.error("Error fetching order activities:", error);
      res.status(500).json({ success: false, message: "Failed to fetch order activities." });
    }
  } else {
    // Handle unsupported methods
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ success: false, message: `Method ${req.method} Not Allowed` });
  }
}
