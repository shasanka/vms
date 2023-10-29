import { Document } from 'mongoose';
import { ReactNode } from 'react'
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
    BIRTH_CERTIFICATE = 6
}

export interface IVisitor extends Document {
    phone_no: number,
    first_name: string,
    last_name: string,
    email?: string,
    address: string,
    state: string,
    district: string,
    pincode: number,
    id_proof_type: IDProofType,
    id_proof_number: string,
    // created_at: string,
    // updated_at: string

}

export interface IOpt {
    value: string | number | boolean
    desc: string
}

export interface IDistrict {
    id?: string,
    name: string,
    pincodes: number[]
}
export interface IState {
    _id?: string;
    name: string;
    districtID: IDistrict[];
}

