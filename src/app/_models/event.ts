export enum EStatus {
  Draft  = "draft",
  Public   = "public",
  Private  = "private"
}
export class Event {
  _id: string;
  headline: string;
  description: string;
  startDate: Date;
  location: string;
  state: EStatus;
  creatorId: string;
}
