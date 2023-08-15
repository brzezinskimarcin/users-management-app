export interface User {
  id: number;
  first_name: string;
  last_name: string;
  avatar: string;
}

export interface GetUsersResponse {
  page: number;
  total_pages: number;
  data: User[];
}

export type UserForm = Omit<User, 'id'>;
