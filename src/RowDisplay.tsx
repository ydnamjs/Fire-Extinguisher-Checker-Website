import React from 'react';
import './RowDisplay.css';
import { Extinguisher } from './ProcessSpreadSheet';

function MakeExpirationNoticeText(dateChecked: Date, daysLasts: number) {
    const currentDate = new Date();
    console.log(dateChecked)
    console.log(currentDate.getTime())
    const difference = ((dateChecked.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24)) + daysLasts;

    if (difference < 0) {
        return "Expired "  + Math.round(-1 * difference) + " Days Ago"
    } 
    return "Expires in " + Math.round(difference) + " Days"
}

export function RowDisplay({
    index,
    error,
    extinguisher,
    daysLasts
}:{
    index: number
    error: string
    extinguisher: Extinguisher
    daysLasts: number
}) {
    return <div className='row-display'>
        <h3> Extinguisher #{index}</h3>
        {error !== "" && <div>Errors: {error}</div>}
        {error === "" && <div>
            <span>{MakeExpirationNoticeText(extinguisher.dateChecked, daysLasts)}</span><br/>
            <span>Region: {extinguisher.region}</span><br/>
            <span>Address: {extinguisher.address}</span><br/>
            <span>City: {extinguisher.city}</span><br/>
            <span>State: {extinguisher.state}</span><br/>
            <span>County: {extinguisher.county}</span><br/>
            <span>Zipcode: {extinguisher.zipcode}</span><br/>
            <span>Last Checked: {extinguisher.dateChecked.toLocaleDateString('en-US', {timeZone: 'America/New_York'})}</span>
        </div>}
    </div>
}