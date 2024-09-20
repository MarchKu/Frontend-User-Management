import { useAuth } from "../contexts/auth";
import { userTokenType } from "../contexts/auth";

export const Nav = () => {
  const { logout } = useAuth();
  const storeData = localStorage.getItem("tokenData");
  let user: userTokenType | null = null;
  if (storeData) {
    user = JSON.parse(storeData) as userTokenType;
  } else {
    user = null;
  }
  return (
    <nav className="w-full h-[6vh] bg-gray-500 flex justify-between items-center py-[0.5rem] px-[2rem]">
      <h1 className="font-semibold hidden md:block">USER MANAGE PAGE</h1>
      <div className="h-full w-auto flex gap-[1rem]">
        <img
          src={user?.image}
          alt="Profile image"
          className="w-[40px] h-full rounded-full object-cover"
        />
        <div className="flex md:flex-col justify-between items-center gap-[1rem] md:gap-0 ">
          <p className="h-full content-center font-semibold">
            {user?.firstName} {user?.lastName}
          </p>
          <p
            className="font-semibold text-[0.8rem] hover:underline hover:cursor-pointer"
            onClick={logout}
          >
            Log out
          </p>
        </div>
      </div>
    </nav>
  );
};
