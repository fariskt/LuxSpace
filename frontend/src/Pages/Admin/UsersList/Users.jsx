import React, { useEffect, useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import UserDetails from "./UserDetails";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers, fetchUserById } from "../../../features/adminSlice";
import { fetchUserOrder } from "../../../features/orderSlice";
import { TailSpin } from "react-loader-spinner";

const Users = () => {
  const { users, loading } = useSelector((state) => state.admin);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const [showDetails, setShowDetails] = useState(false);

  const handleViewDetails = (user) => {
    dispatch(fetchUserById(user?._id));
    dispatch(fetchUserOrder(user?._id));
    setShowDetails(true);
  };

  useEffect(() => {
    dispatch(fetchAllUsers({ page: page, limit: 10 }));
  }, [users?.length]);

  return (
    <>
      {showDetails ? (
        <UserDetails setShowDetails={setShowDetails} />
      ) : (
        <div className="mt-24 md:w-[90%] max-w-screen overflow-x-scroll md:ml-16 bg-white py-8 rounded-lg">
          <div className="flex justify-between items-center mb-6 px-6">
            <h1 className="text-lg">All Users List</h1>
            <div>
              <button
                className={`${
                  page === 1 ? "bg-gray-400" : "bg-gray-600"
                } p-1 rounded mr-4 text-white`}
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
              >
                Prev
              </button>
              <button
                className={`${
                  users.length < 10 ? "bg-gray-400" : "bg-gray-600"
                } p-1 rounded text-white`}
                disabled={users.length < 9}
                onClick={() => setPage(page + 1)}
              >
                Next
              </button>
            </div>
          </div>
          <div className="shadow-md overflow-hidden ">
            <table className="w-full table-auto p-3">
              <thead>
                <tr className="bg-gray-100 text-gray-700 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">Users Details</th>
                  <th className="py-3 md:px-6 text-left">Joined Date</th>
                  <th className="py-3 px-6 text-center">Action</th>
                </tr>
              </thead>
              {loading ? (
                <div className="loader-container ml-20 ">
                  <TailSpin
                    visible={true}
                    height="40"
                    width="40"
                    color="blue"
                    ariaLabel="tail-spin-loading"
                    radius="1"
                    wrapperStyle={{}}
                    wrapperClass=""
                  />
                </div>
              ) : (
                <tbody className="text-gray-600 text-sm font-light">
                  {users &&
                    users.map((item, index) => (
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
                            <p className="hidden md:block text-gray-500 text-sm">
                              {item.email}
                            </p>
                          </div>
                        </td>
                        <td className="py-2 md:px-6">
                          {item.createdAt.slice(0, 10)}
                        </td>
                        <td className="py-2 md:px-6 text-center">
                          <button
                            title="view"
                            onClick={() => handleViewDetails(item)}
                            className="mx-4 text-lg bg-blue-100 rounded-lg py-2 px-4 text-blue-600 hover:bg-blue-700 hover:text-white"
                          >
                            <AiOutlineEye />
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              )}
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default Users;
