export interface User {
  id: number;
  first_name: string;
  last_name: string;
  avatar: string;
}

export interface GetUsersResponse {
  total_pages: number;
  data: User[];
}

export type UserFormData = Omit<User, 'id'>;

export type CreateUserResponse = Pick<User, 'id'>;
