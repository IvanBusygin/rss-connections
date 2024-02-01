export interface IGroupResponse {
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
  createdAt: DataItem;
  id: DataItem;
  createdBy: DataItem;
  name: DataItem;
}

export interface DataItem {
  S: string;
}

export interface IRequestNewGroup {
  name: string;
}
export interface IResponseNewGroup {
  groupID: string;
}

export interface Groups {
  createdAt: string;
  id: string;
  createdBy: string;
  name: string;
}
