export interface IProfileResponse {
  email: Timestamp;
  name: Timestamp;
  uid: Timestamp;
  createdAt: Timestamp;
}

export interface Timestamp {
  S: string;
}

export interface IProfile {
  email: string;
  name: string;
  uid: string;
  createdAt: string;
}

export interface IRequestName {
  name: string;
}
