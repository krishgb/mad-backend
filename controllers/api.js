import axios from "axios";
import cheerio from "cheerio";
import {URL} from '../utils/site.js'

const getTxt = tags => {
  let data = []
  for(let i of tags){
    let j = i.children
    for(let k of j){
      if(k.type === 'text'){
        data.push(k.data.trim())
      }
    }
  }
  return data
}

export const api = async (url) => {
    const a = await axios.get(url);
  const b = await a.data;

  const $ = cheerio.load(b);

  let tags = [...$('.mb-3')];tags = tags.slice(0, tags.length - 1)
  const image = [...$('.w-24.h-24.object-scale-down.object-center')][0]
  const link = [...$('a[rel=nofollow]')]
  const desc = [...$('.mb-10.mt-8.text-base')]

  let tagsTxt = getTxt(tags)
  let img = image.attribs.src
  let de = getTxt(desc)[0]
  let li = link[0].attribs.href

  let data = {
    tags: tagsTxt,
    img: img,
    desc: de,
    link: URL + li
  }
  return data;
} 