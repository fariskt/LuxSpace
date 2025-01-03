import React, { useContext, useState } from "react";
import {AppContext} from "../../../context/AppContext";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineDelete } from "react-icons/ai";
import UserDetails from "./UserDetails";
import axios from "axios";

const Users = () => {
  const { users, orders, setUsers } = useContext(AppContext);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const handleViewDetails = (user) => {
    setSelectedUser(user);
    setShowDetails(true);
  };

  const handleDeleteUser = async (userId) => {
    let confirm = window.confirm("Are you sure want to delete the user");
    if (confirm) {
      try {
        const deletedUser = users.filter((item) => item.id !== userId);
        setUsers(deletedUser);
        await axios.delete(`http://localhost:3000/users/${userId}`);
      } catch (error) {
        console.log("error deleting user ", error);
      }
    }
  };

  return (
    <>
      {showDetails ? (
        <UserDetails
          selectedUser={selectedUser}
          setShowDetails={setShowDetails}
          orders={orders}
        />
      ) : (
        <div className="mt-24 w-[90%] ml-16 bg-white py-8 rounded-lg">
          <div className="flex justify-between items-center mb-6 px-6">
            <h1 className="text-lg">All Users List</h1>
          </div>
          <div className="shadow-md overflow-hidden ">
            <table className="w-full table-auto p-3">
              <thead>
                <tr className="bg-gray-100 text-gray-700 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">Users Details</th>
                  <th className="py-3 px-6 text-left">Joined Date</th>
                  <th className="py-3 px-6 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {users
                  .filter((user) => user.role === "user")
                  .map((item, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-200 hover:bg-gray-50"
                    >
                      <td className="py-3 px-6 text-left flex items-center space-x-3">
                        <img
                          src="https://t4.ftcdn.net/jpg/00/65/77/27/360_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg"
                          alt="User"
                          className="w-16 h-16 rounded bg-white border border-gray-200"
                        />
                        <div>
                          <p className="font-semibold">{item.name}</p>
                          <p className="text-gray-500 text-sm">{item.email}</p>
                        </div>
                      </td>
                      <td className="py-2 px-6">{item.createdAt}</td>
                      <td className="py-2 px-6 text-center">
                        <button
                          title="view"
                          onClick={() => handleViewDetails(item)}
                          className="mx-4 text-lg bg-blue-100 rounded-lg py-2 px-4 text-blue-600 hover:bg-blue-700 hover:text-white"
                        >
                          <AiOutlineEye />
                        </button>
                        <button
                          onClick={() => handleDeleteUser(item.id)}
                          className="text-lg bg-red-100 rounded-lg py-2 px-4 text-red-400 hover:bg-red-500 hover:text-white"
                        >
                          <AiOutlineDelete />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default Users;
