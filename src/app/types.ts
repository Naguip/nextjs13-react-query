export interface RandomAPI {
  entries: APIElement[];
}

export interface APIElement {
  API: string;
  Description: string;
  Auth: string;
  HTTPS: boolean;
  Cors: string;
  Link: string;
  Category: string;
}

export interface GetUsers {
  success: boolean;
  time: string;
  message: string;
  total_users: number;
  offset: number;
  limit: number;
  users: User[];
}

export interface User {
  last_name: string;
  email: string;
  id: number;
  phone: string;
  street: string;
  state: string;
  zipcode: string;
  latitude: number;
  gender: string;
  first_name: string;
  date_of_birth: string;
  job: string;
  city: string;
  country: string;
  longitude: number;
}
