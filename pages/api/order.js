import connectDb from "@/app/utils/connectDB";
import order from "@/app/models/order";


export default async function handler(req, res) {

    
    if (req.method === 'GET') {
        try {
            await connectDb();
            const ordersData = await order.find({});
            res.status(200).json(ordersData);
        } catch (error) {
            console.error('Failed to fetch orders:', error);
            res.status(500).json({ error: 'Failed to fetch orders' });
        } 
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}