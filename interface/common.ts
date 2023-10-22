import { ReactNode } from 'react'
interface IChildrenProps {
    children: ReactNode
}

export interface IVisitor {
    mobileno: number,
    name: string,
    address: string,
    state: string,
    district: string,
    pincode: number,
    tomeet: string,
    department: string,

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

