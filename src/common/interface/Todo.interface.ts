// todo.ts

import { User } from "./User.interface";
export interface Todo {
  id: number;
  state: string;
  title: string;
  date: Date;
  created_at: Date;
  deletedAt: Date | null;
  user: User;
}
