//import readXlsxFile from "read-excel-file"
import { Row } from 'read-excel-file';

export interface Extinguisher {
    dateChecked: Date
    region: String
    address: String
    city: String
    state: String
    zipcode: String
    county: String
}

export function ProcessRow(row: Row): (string | Extinguisher)[] {
    const region = row[6];
    const address = row[7];
    const city = row[8];
    const state = row[9];
    const zipcode = row[10];
    const county = row[11];
    const dateChecked = row[12];
    let errors = ""

    if (typeof(region) !== 'string') {
        errors = errors + "Invalid region, "
    }

    if (typeof(address) !== 'string') {
        errors = errors + "Invalid address, "
    }

    if (typeof(city) !== 'string') {
        errors = errors + "Invalid city, "
    }
    
    if (typeof(state) !== 'string') {
        errors = errors + "Invalid state, "
    }

    if (typeof(zipcode) !== 'number') {
        errors = errors + "Invalid zipcode, "
    }

    if (typeof(county) !== 'string') {
        errors = errors + "Invalid county, "
    }

    if (!(dateChecked instanceof Date)) {
        errors = errors + "Invalid DateChecked, "
    }

    if (errors === "") {
        return [errors, {
            dateChecked: new Date(dateChecked.valueOf() as Date),
            region: region.valueOf() as String,
            address: address.valueOf() as String,
            city: city.valueOf() as String,
            state: state.valueOf() as String,
            zipcode: zipcode.valueOf() as String,
            county: county.valueOf() as String,
        }]
    }
    return [errors]
}