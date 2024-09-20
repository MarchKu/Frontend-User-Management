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

const users: userDataType[] = [
  {
    id: "1",
    username: "alex123",
    password: "123456",
    email: "alex123@gmail.com",
    image:
      "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    firstName: "Alex",
    lastName: "Jone",
    created_at: "2019-03-07",
    updated_at: "2019-03-07",
    lastLogin: "	Thu Sep 19 2024 21:23:38 GMT+0000",
  },
  {
    id: "2",
    username: "nich459",
    password: "123456",
    email: "nich459@gmail.com",
    image: "https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg",
    firstName: "Nich",
    lastName: "hoe",
    created_at: "2019-03-07",
    updated_at: "2019-03-07",
    lastLogin: "	Thu Sep 19 2024 21:23:38 GMT+0000",
  },
  {
    id: "3",
    username: "micheal77596",
    password: "123456",
    email: "micheal77596@gmail.com",
    image:
      "https://images.pexels.com/photos/5876516/pexels-photo-5876516.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    firstName: "Micheal",
    lastName: "Keeth",
    created_at: "2019-03-07",
    updated_at: "2019-03-07",
    lastLogin: "Fri Sep 20 2024 03:19:38 GMT+0000",
  },
  {
    id: "4",
    username: "john5555",
    password: "123456",
    email: "john5555@gmail.com",
    image:
      "https://images.pexels.com/photos/5668774/pexels-photo-5668774.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    firstName: "John",
    lastName: "Doe",
    created_at: "2019-03-07",
    updated_at: "2019-03-07",
    lastLogin: "Fri Sep 20 2024 12:19:38 GMT+0000",
  },
];

export default users;
