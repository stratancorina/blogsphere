import Prompt from '@models/prompt';
import { connectToDB } from '@utils/database';

export const GET = async (request) => {
  try {
    await connectToDB();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;
    const tag = searchParams.get('tag') || '';

    // Build query object
    const query = tag ? { tag: { $regex: tag, $options: 'i' } } : {};

    // Get paginated results
    const prompts = await Prompt.find(query)
      .populate('creator')
      .skip((page - 1) * limit)
      .limit(limit);

    // Get total count for pagination
    const total = await Prompt.countDocuments(query);

    return new Response(
      JSON.stringify({
        prompts,
        total,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
      }),
      { status: 200 }
    );
  } catch (error) {
    return new Response('Failed to fetch prompts', { status: 500 });
  }
};
