const Users = ({ users }) => {

    
    const fallbackSVG = (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-12 h-12"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
          <g id="SVGRepo_iconCarrier">
            <path
              d="M5 21C5 17.134 8.13401 14 12 14C15.866 14 19 17.134 19 21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
              stroke="#000000"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </g>
        </svg>
      );

    return (
      <div className="users-list lg:w-1/3 border p-4 rounded glassmorphism h-min min-h-screen">
        <h2 className="text-xl font-bold mb-4">All Users</h2>
        <div className="flex gap-4 flex-col">
          {users.map((user) => (
            <div
              key={user._id}
              className="p-4 border rounded-lg shadow flex items-center gap-4 bg-white"
            >
                <img
                src={user.image}
                alt={`${user.username}'s avatar`}
                className="w-12 h-12 rounded-full object-cover"
                onError={(e) => {
                  e.target.onerror = null; // Prevent infinite loop in case fallback fails
                  e.target.parentNode.innerHTML = fallbackSVG.outerHTML;
                }}
              />
              <div>
                <p className="font-semibold">{user.username}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
                <p className="text-sm text-gray-400">{user.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default Users;
  