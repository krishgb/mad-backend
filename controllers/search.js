import axios from "axios";
import {URL} from '../utils/index.js'

export const search = async (keyword) => {
    const SEARCH_QUERY = 'api/v1/search/?s='
    const a = await axios.get(URL + SEARCH_QUERY + keyword)
    const b = await a.data
    const np = b.map(n => {
        const {title, url, description, logo} = n
        return {title, url, description, logo}
    })
    return np
} 