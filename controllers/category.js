import axios from "axios";

import {URL} from '../utils/index.js'

export const category = async (cate) => {
    const SEARCH_QUERY = 'category/'
    const a = await axios.get(URL + SEARCH_QUERY + cate)
    const b = await a.data
    return b
}