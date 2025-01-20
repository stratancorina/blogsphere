import PostCard from './PostCard';

const Dashboard = ({data, handleEdit, handleDelete }) => {
  return (
    <section className="w-full lg:w-4/5 border p-4 rounded bg-gray-100">
      <h2 className="text-xl font-bold mb-4">My posts</h2>
      <div className="space-y-6 pb-8 lg:columns-2 lg:gap-6">
        {data.map((post) => (
          <PostCard
            key={post._id}
            post={post}
            handleEdit={() => handleEdit && handleEdit(post)}
            handleDelete={() => handleDelete && handleDelete(post)}
          ></PostCard>
        ))}
      </div>
    </section>
  );
};

export default Dashboard;
