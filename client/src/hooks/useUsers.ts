import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export type userDataType = {
  id: string;
  username: string;
  password: string;
  email: string;
  image: string;
  firstName: string;
  lastName: string;
  created_at: string;
  updated_at: string;
  lastLogin: string;
};

const useUsers = () => {
  const [users, setUsers] = useState<userDataType[]>([]);
  const [user, setUser] = useState<userDataType[]>([]);
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getUsers = async () => {
    setIsError(false);
    setIsLoading(true);
    try {
      const results = await axios.get(`http://localhost:4000/user`);
      setUsers(results.data);
      setTotalUsers(results.data.length);
    } catch (error: any) {
      console.error("Error fetching users:", error.message);
      setIsError(true);
      toast.error("Failed to fetch users.");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteUser = async (userId: string) => {
    setIsError(false);
    setIsLoading(true);
    try {
      const results = await axios.delete(
        `http://localhost:4000/user/${userId}`
      );
      const newUsers = results.data.filter((user) => user.id !== userId);
      setUsers(newUsers);
      setTotalUsers(newUsers.length);
      toast.success(`User id ${userId} deleted successfully.`);
    } catch (error: any) {
      console.error("Error deleting user:", error.message);
      setIsError(true);
      toast.error("Failed to delete user.");
    } finally {
      setIsLoading(false);
    }
  };

  const getUserByName = async (keyword: string) => {
    setIsError(false);
    setIsLoading(true);
    try {
      if (keyword.trim() === "") {
        await getUsers();
      } else {
        const searchUser = users.filter((user) =>
          user.firstName.toLowerCase().includes(keyword.toLowerCase())
        );
        setUser(searchUser);
      }
    } catch (error: any) {
      console.error("Error searching for users:", error.message);
      setIsError(true);
      toast.error("Failed to search for users.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    users,
    user,
    totalUsers,
    getUsers,
    getUserByName,
    deleteUser,
    isError,
    isLoading,
  };
};

export default useUsers;
