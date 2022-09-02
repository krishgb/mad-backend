import axios from "axios";
import {URL} from '../utils/site.js'

export const search = async (keyword) => {
    const SEARCH_QUERY = '/api/v1/search/?s='
    const a = await axios.get(URL + SEARCH_QUERY + keyword)
    const b = await a.data
    const np = b.map(n => {
        const {title, description, logo} = n
        let url = 'https://apilist.fun/api/' + title.split(' ').join('-')
        return {title, url, description, logo}
    })
    return np
} 