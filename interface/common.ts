// interface IChildrenProps {
//     children: ReactNode
// }


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
  _id?: string;
  phoneNumber: number;
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

export interface Response<T> {
  message: string;
  data: T;
}
export interface IEntry {
  _id?: string; // generated by mongoose
  visitorId: string;
  checkinTimestamp: Date;
  checkoutTimestamp: Date;
  status: EEntryStatus;
  createdAt: Date;
  updatedAt: Date;
  whomToMeet:string;
  department:string

}

export enum EEntryStatus {
  REGISTERED = 1,
  CHECKEDIN = 2,
  CHECKEDOUT = 3,
}

export interface IDistrict {
  name: string;
  geoCode: number[];
  pinCodes: number[];
  _id: string;
}

export interface IState {
  id: string;
  name: string;
  districts: IDistrict[];
}
