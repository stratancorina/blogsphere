import User from '@models/user';
import { connectToDB } from '@utils/database';

export const GET = async () => {
  try {
    await connectToDB();

    const users = await User.find({}, 'username email role image'); // Fetch specific fields only

    console.log('Fetched Users:', users); 
    
    return new Response(JSON.stringify(users), { status: 200 });
  } catch (error) {
    console.error('Error fetching users:', error);
    return new Response('Failed to fetch users', { status: 500 });
  }
};
