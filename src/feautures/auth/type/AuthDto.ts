export type LoginDto = {
  identifier: string;
  password: string;
};

export type RegisterDto = {
  name: string;
  password: string;
  email: string;
  phone: string;
};

export type loginResponse = {
  user: {
    name: string;
    id: string;
    email: string;
    phone: string;
    photoUrl: string;
  };
  acces_token: string;
};
