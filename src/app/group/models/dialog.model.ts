export interface IDialogResponse {
  $metadata: Metadata;
  Count: number;
  Items: Item[];
  ScannedCount: number;
}

export interface Metadata {
  httpStatusCode: number;
  requestId: string;
  attempts: number;
  totalRetryDelay: number;
}

export interface Item {
  authorID: DataItem;
  createdAt: DataItem;
  message: DataItem;
}

export interface DataItem {
  S: string;
}

export interface IMessage {
  authorID: string;
  createdAt: string;
  message: string;
}

export interface MessageRequest {
  groupID: string;
  message: string;
}
