// interface IChildrenProps {
//     children: ReactNode
// }

import mongoose from "mongoose";

export enum IDProofType {
  VOTER_ID = 0,
  DRIVING_LICENSE = 1,
  PASSPORT = 2,
  GAS_CONNECTION = 3,
  AADHAAR_CARD = 4,
  BPL_CARD = 5,
  BIRTH_CERTIFICATE = 6,
}

export interface IVisitor {
  _id: string;
  phoneNo: number;
  firstName: string;
  lastName: string;
  email?: string;
  address: string;
  state: string;
  district: string;
  pincode: number;
  idProofType: IDProofType;
  idProofNumber: string;
}

export interface IOpt {
  value: string | number | boolean;
  desc: string;
}

export interface IDistrict {
  id?: string;
  name: string;
  pincodes: number[];
}
export interface IState {
  _id?: string;
  name: string;
  districtID: IDistrict[];
}

export interface Response<T> {
  message: string;
  data: T;
}
export interface IEntry {
  visitorId: string;
  // phoneNo: number;
  registrationTimestamp: Date;
  checkinTimestamp: Date;
  checkoutTimestamp: Date;
  status: EEntryStatus;
}

export enum EEntryStatus {
  REGISTERED = 1,
  CHECKEDIN = 2,
  CHECKEDOUT = 3,
}
