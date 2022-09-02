import axios from "axios";
import cheerio from "cheerio";

import { URL } from "../utils/site.js";

export const category = async (cate) => {
  const SEARCH_QUERY = "/category/";
  const a = await axios.get(URL + SEARCH_QUERY + cate);
  const b = await a.data;

  const $ = cheerio.load(b);
  const atag = [...$(".px-1.capitalize a")];
  const img = [...$(".lazy.object-scale-down.object-center")];
  const desc = [...$(".text-sm")];

  const data = [];
  let j = 0;
  for (let i = 0; i < atag.length; i++) {
    const txtA = atag[i],
      im = img[i],
      de = desc[j].children
        .map((a) =>
          a.type === "text"
            ? a.data.replaceAll("\t", "").replaceAll("\n", "")
            : ""
        )
        .join("")
        .trim();
    j += 2;

    data.push({
      url: URL + txtA.attribs.href,
      title: txtA.children[0].data,
      img: im.attribs["data-src"],
      desc: de,
    });
  }
  return data;
};
