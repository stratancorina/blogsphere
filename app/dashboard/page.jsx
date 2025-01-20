'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import Dashboard from 'components/Dashboard';
import Users from 'components/Users';

import { useAuth } from 'app/context/AuthContext';

const MyDashboard = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [myPosts, setMyPosts] = useState([]);

  const [users, setUsers] = useState([]);

  const { role } = useAuth();

  useEffect(() => {
    if (role !== 'admin') {
      router.push('/');
    }
  }, [role, router]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();

      setMyPosts(data);
    };

    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/users'); // Fetch all users
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    if (session?.user.id) {
      fetchPosts();
      fetchUsers();
    }
  }, [session?.user.id]);

  const handleEdit = (post) => {
    router.push(`/update-post?id=${post._id}`);
  };

  const handleDelete = async (post) => {
    const hasConfirmed = confirm('Are you sure you want to delete this post?');

    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: 'DELETE',
        });

        const filteredPosts = myPosts.filter((item) => item._id !== post._id);

        setMyPosts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className='w-full'>
      <h1 className="head_text text-left">
        <span className="blue_gradient">Dashboard</span>
      </h1>
      <p className="desc text-left">Check your posts and blog viewers.</p>
      <div className="lg:flex-row flex-col flex gap-14 w-full mt-10">
      <Dashboard
        data={myPosts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
      <Users users={users}/>
      </div>
    </div>
  );
};

export default MyDashboard;
