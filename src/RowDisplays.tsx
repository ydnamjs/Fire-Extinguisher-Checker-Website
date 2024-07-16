import React from 'react';
import { RowDisplay } from './RowDisplay';
import { Extinguisher } from './ProcessSpreadSheet';
import './RowDisplays.css'

function GetDaysUntilExpiration(dateChecked: Date, daysLasts: number): number {
    const currentDate = new Date();
    console.log(dateChecked)
    console.log(currentDate.getTime())
    const difference = ((dateChecked.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24)) + daysLasts;
    return difference
}

export function RowDisplays({
    errors, 
    extinguishers,
    extinguisherDuration,
    noticeAmount
}:{
    errors: string[]
    extinguishers: Extinguisher[]
    extinguisherDuration: number
    noticeAmount: number
}) {
    
    const invalidRowDisplays = []
    const expiredExtinguishers = []
    const soonToExpireExtinguishers = []

    for(let i = 1; i < errors.length; i++) {
        if (errors[i] !== "") {
            invalidRowDisplays.push(<RowDisplay index={i + 1} error={errors[i]} extinguisher={extinguishers[i]} daysLasts={extinguisherDuration}></RowDisplay>)
            continue;
        }
        if (GetDaysUntilExpiration(extinguishers[i].dateChecked, extinguisherDuration) < 0) {
            expiredExtinguishers.push(<RowDisplay index={i + 1} error={errors[i]} extinguisher={extinguishers[i]} daysLasts={extinguisherDuration}></RowDisplay>)
            continue;
        }
        if (GetDaysUntilExpiration(extinguishers[i].dateChecked, extinguisherDuration) < noticeAmount) {
            soonToExpireExtinguishers.push(<RowDisplay index={i + 1} error={errors[i]} extinguisher={extinguishers[i]} daysLasts={extinguisherDuration}></RowDisplay>)
            continue;
        }
    }
    
    return <div>
        {invalidRowDisplays.length > 0 && <div className='row-displays-header'>
            <h2>Invalid Rows</h2>
            {invalidRowDisplays}
        </div>}
        {expiredExtinguishers.length > 0 && <div className='row-displays-header'>
            <h2>Expired Extinguishers</h2>
            {expiredExtinguishers}
        </div>}
        {soonToExpireExtinguishers.length > 0 && <div className='row-displays-header'>
            <h2>Soon To Expire Extinguishers</h2>
            {soonToExpireExtinguishers}
        </div>}
    </div>
}