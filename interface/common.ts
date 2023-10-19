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