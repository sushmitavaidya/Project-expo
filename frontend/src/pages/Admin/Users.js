// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "../../resources/Users.css";

// const Users = () => {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     // Fetch all users
//     axios
//       .get(`/api/users`)
//       .then((response) => {
//         setUsers(response.data);
//       })
//       .catch((err) => console.log(err));
//   }, []);

//   return (
//     <div className="users-container">
//       <h2>Users</h2>
//       <table className="users-table">
//         <thead>
//           <tr>
//             <th>User ID</th>
//             <th>Name</th>
//             <th>Email</th>
//             {/* <th>Phone Number</th> */}
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((user) => (
//             <tr key={user._id}>
//               <td>{user._id}</td>
//               <td>{user.name}</td>
//               <td>{user.email}</td>
//               {/* <td>{user.phoneNumber}</td> */}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Users;


import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../resources/Users.css";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch bookings from the backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`/api/users/`);
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching Users:", error);
      }
    };
    fetchUsers();
  }, []);



  // Filter bookings based on the search term
  const filteredUsers = users.filter(
    (user) =>
      user._id?.toLowerCase().includes(searchTerm.toLowerCase()) 
  );

  return (
    <div className="bookings-container">
      <h2 className="bookings-title">User Management</h2>

      <div className="bookings-actions">
        {/* Search Input */}
        <input
          type="text"
          className="search-input"
          placeholder="Search by User ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        
      </div>

      {/* Users Table */}
      <table className="bookings-table">
        <thead>
          <tr>
            <th>User ID</th>
            <th>Name</th>
            <th>Email</th>

          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user.userId}>
                <td>{user.userId}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="no-bookings">
                No User found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
