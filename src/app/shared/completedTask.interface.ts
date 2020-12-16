export interface CompletedTask {
  _id?: string;
  categoryID: string;
  taskID: string;
  description: string;
  timeSpent: number;
  date: string;
}
