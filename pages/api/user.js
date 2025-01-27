import connectDb from "@/app/utils/connectDB";
import User from "@/app/models/User";

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            await connectDb();
            const usersData = await User.find({});
            res.status(200).json(usersData);
        } catch (error) {
            console.error('Failed to fetch users:', error);
            res.status(500).json({ error: 'Failed to fetch users' });
        } 
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}