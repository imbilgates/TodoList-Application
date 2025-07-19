export interface TodoItem {
  _id: string;
  title: string;
  completed: boolean;
  reminderAt: Date,
  createdAt?: string;
  updatedAt?: string;
}
