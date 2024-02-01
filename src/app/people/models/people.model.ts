export interface IPeopleResponse {
  $metadata: Metadata;
  Count: number;
  Items: Item[];
  ScannedCount: number;
}

interface Metadata {
  httpStatusCode: number;
  requestId: string;
  attempts: number;
  totalRetryDelay: number;
}

interface Item {
  name: DataItem;
  uid: DataItem;
}

interface DataItem {
  S: string;
}

export interface People {
  name: string;
  uid: string;
}

// --
export interface IConversationsResponse {
  $metadata: MetadataConv;
  Count: number;
  Items: ItemConv[];
  ScannedCount: number;
}

interface MetadataConv {
  httpStatusCode: number;
  requestId: string;
  attempts: number;
  totalRetryDelay: number;
}

interface ItemConv {
  id: DataItem;
  companionID: DataItem;
}

export interface Conversations {
  id: string;
  companionID: string;
}

export interface IRequestNewConversations {
  companion: string;
}

export interface IResponseNewConversations {
  conversationID: string;
}
