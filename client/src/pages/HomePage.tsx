import React, { useEffect, useState } from "react";
import useUsers from "@/hooks/useUsers";
import { Link } from "react-router-dom";
import { Nav } from "../components/Nav";
import { UserModal } from "@/components/userModal";
import { Button } from "@/components/ui/button";
import { userTokenType } from "@/contexts/auth";

const HomePage: React.FC = () => {
  const [keywords, setKeywords] = useState<string>("");
  const {
    users,
    user,
    totalUsers,
    getUsers,
    getUserByName,
    deleteUser,
    isError,
    isLoading,
  } = useUsers();

  const storeData = localStorage.getItem("tokenData");
  let tokenData: userTokenType | null = null;
  if (storeData) {
    tokenData = JSON.parse(storeData) as userTokenType;
  } else {
    tokenData = null;
  }

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    keywords !== "" ? getUserByName(keywords) : getUsers();
  }, [keywords]);

  const DateFormat: React.FC<{ date: string }> = ({ date }) => {
    const newDate = new Date(date);

    const pad = (num: number): string =>
      num < 10 ? "0" + num : num.toString();

    const formattedDate: string = `${pad(newDate.getDate())}/${pad(
      newDate.getMonth() + 1
    )}/${newDate.getFullYear().toString().slice(-2)} ${pad(
      newDate.getHours()
    )}:${pad(newDate.getMinutes())}:${pad(newDate.getSeconds())}`;

    return <p>{formattedDate}</p>;
  };

  return (
    <>
      <Nav />
      <section className="w-full min-h-screen h-auto px-[5%] py-[1.5rem] flex flex-col items-center ">
        <div className="size-full max-w-[1440px] flex flex-col gap-[1.5rem] border p-[1rem]">
          <div className="w-full flex flex-col justify-between gap-[1rem]">
            <h3 className="font-semibold bg-slate-400 px-[1rem] py-[1rem] rounded-md text-center md:text-start">
              Dash board
            </h3>
            <div className="w-full h-auto flex flex-col md:flex-row justify-between gap-[1rem]">
              <div className=" basis-1/4 border font-semibold flex flex-col justify-center items-center rounded-md bg-green-300 hover:bg-green-500">
                <h3>Total users</h3>
                <h3>{totalUsers}</h3>
              </div>
              <div className="basis-1/4 border font-semibold flex flex-col justify-center items-center rounded-md bg-red-300 hover:bg-red-500">
                <h3>Active users</h3>
                <h3>3</h3>
              </div>
              <div className="basis-2/4 border p-[1rem]  flex flex-col justify-start items-center rounded-md bg-yellow-300 hover:bg-yellow-500">
                <h3 className="font-semibold">Last login</h3>
                <div className="w-full">
                  {users?.map((time, index) => (
                    <div key={index} className="flex w-full justify-between">
                      <p>
                        {time.firstName} {time.lastName}
                      </p>
                      <DateFormat date={time.lastLogin} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="w-full px-[1rem] py-[1rem] bg-slate-400 flex justify-between  rounded-md">
            <label className="flex gap-[1.5rem] items-center font-semibold">
              Search
              <input
                type="text"
                placeholder="Search by first name"
                value={keywords}
                onChange={(e) => {
                  setKeywords(e.target.value);
                }}
                className="border pl-[0.5rem] font-normal"
              />
            </label>
          </div>

          <div className="w-full h-auto flex flex-col justify-start items-center gap-[0.5rem]">
            {users && !users.length && !isLoading ? (
              <div className="size-full flex flex-col justify-center items-center ">
                <h1 className=" font-semibold text-[2rem]">
                  There is no user in database
                </h1>
              </div>
            ) : keywords === "" ? (
              users?.map((user, index) => {
                return (
                  <div
                    key={user.id}
                    className="w-full flex flex-col md:flex-row justify-between p-[1rem] border rounded-md hover:bg-slate-200"
                  >
                    <div className="flex flex-col md:flex-row gap-[1rem]">
                      <img
                        src={user.image}
                        alt="profile"
                        className="h-[200px] md:size-[100px] object-contain md:object-cover object-center"
                      />
                      <div className="flex flex-col justify-between items-start">
                        <h3 className="text-[2rem] ">
                          <Link
                            to={`/user/${user.id}`}
                            className="hover:underline"
                          >
                            {user.firstName} {user.lastName}
                          </Link>
                        </h3>
                        <h3>{user.email}</h3>
                      </div>
                    </div>
                    <div className="w-full md:w-[10%] min-w-[98px] flex flex-col justify-between py-[1rem] gap-[1rem]">
                      <UserModal userData={users[index]} />
                      {tokenData && tokenData.id !== user.id && (
                        <Button
                          className="bg-red-300 hover:bg-red-500 rounded-md"
                          onClick={() => deleteUser(user.id)}
                        >
                          Delete user
                        </Button>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              user?.map((user) => {
                return (
                  <div
                    key={user.id}
                    className="w-full flex flex-col md:flex-row justify-between p-[1rem] border rounded-md hover:bg-slate-200"
                  >
                    <div className="flex flex-col md:flex-row gap-[1rem]">
                      <img
                        src={user.image}
                        alt="profile"
                        className="h-[200px] md:size-[100px] object-contain md:object-cover object-center"
                      />
                      <div className="flex flex-col justify-between items-start">
                        <h3 className="text-[2rem] ">
                          <Link
                            to={`/user/${user.id}`}
                            className="hover:underline"
                          >
                            {user.firstName} {user.lastName}
                          </Link>
                        </h3>
                        <h3>{user.email}</h3>
                      </div>
                    </div>
                    <div className="w-full md:w-[10%] min-w-[98px] flex flex-col justify-between py-[1rem] gap-[1rem]">
                      <UserModal userData={user} />
                      {tokenData && tokenData.id !== user.id && (
                        <Button
                          className="bg-red-300 hover:bg-red-500 rounded-md"
                          onClick={() => deleteUser(user.id)}
                        >
                          Delete user
                        </Button>
                      )}
                    </div>
                  </div>
                );
              })
            )}

            {isError ? <h1>Request failed</h1> : null}
            {isLoading ? <h1>Loading ....</h1> : null}
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
