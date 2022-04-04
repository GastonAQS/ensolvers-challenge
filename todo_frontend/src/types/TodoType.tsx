export default interface TodoType {
  id: number;
  Name: string;
  Due_Date: string;
  Completed: boolean;
  Expires_Soon: boolean | null;
  Expired: boolean | null;
}
