import { EEntryStatus, IEntry } from '@/interface/common'
import React from 'react'
import DisplayItem from './shared/DisplayItem'
interface IEntryDisplayProps{
    entry:IEntry
}
const EntryDisplay = ({entry}:IEntryDisplayProps) => {
  return (
    // <div>EntryDisplay</div>
    <div className="max-w-sm w-full lg:max-w-full  rounded-md border border-gray-200  shadow p-2">
    <h1 className="font-bold text-md">Entry Data</h1>
    <div className="flex flex-col gap-4 justify-start md:gap-4 lg:flex-row ">
      <DisplayItem label="ID" data={entry._id ||''} />
      <DisplayItem label="Visitor ID" data={entry.visitorId} />
      <DisplayItem label="Whom to meet" data={entry.whomToMeet} />
      <DisplayItem label="Department" data={entry.department} />
      <DisplayItem label="Status" data={EEntryStatus[entry.status]} />
    </div>
  </div>
  )
}

export default EntryDisplay