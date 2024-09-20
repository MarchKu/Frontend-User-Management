import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { userDataType } from "@/hooks/useUsers";

export const UserModal: React.FC<{ userData: userDataType }> = ({
  userData,
}) => {
  const DateFormat: React.FC<{ date: string }> = ({ date }) => {
    const newDate = new Date(date);

    const pad = (num: number): string =>
      num < 10 ? "0" + num : num.toString();

    const formattedDate: string = `${pad(newDate.getDate())}/${pad(
      newDate.getMonth() + 1
    )}/${newDate.getFullYear().toString().slice(-2)} ${pad(
      newDate.getHours()
    )}:${pad(newDate.getMinutes())}:${pad(newDate.getSeconds())}`;

    return (
      <div className="flex flex-col gap-[0.5rem]">
        <p>Last login:</p>
        <p className="font-normal">{formattedDate}</p>
      </div>
    );
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="bg-green-300 hover:bg-green-500 rounded-md"
        >
          View user
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] max-h-[50vh]">
        <DialogHeader>
          <DialogTitle className="flex justify-center items-center gap-[1rem] w-full h-full">
            <div className="h-full w-[60%]">
              <img
                src={userData.image}
                alt="Profile pictur"
                className="size-full object-cover"
              />
            </div>
            <div className="flex flex-col h-full justify-start gap-[1rem] w-full ">
              <h3 className="w-full text-center g-gray-300">Profile data</h3>
              <div className="size-full flex flex-col justify-between text-start">
                <div className="flex flex-col gap-[0.5rem]">
                  <p>Name</p>
                  <p className="font-normal">
                    {`${userData.firstName}  ${userData.lastName}`}
                  </p>
                </div>
                <div className="flex flex-col gap-[0.5rem]">
                  <p>username:</p>
                  <p className="font-normal">{userData.username}</p>
                </div>
                <div className="flex flex-col gap-[0.5rem]">
                  <p>password:</p>
                  <p className="font-normal">{userData.password}</p>
                </div>
                <div className="flex flex-col gap-[0.5rem]">
                  <p>Email: </p>
                  <p className="font-normal">{userData.created_at} </p>
                </div>
                <div className="flex flex-col gap-[0.5rem]">
                  <p>Last update:</p>
                  <p className="font-normal">{userData.created_at}</p>
                </div>
                <DateFormat date={userData.lastLogin} />
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
