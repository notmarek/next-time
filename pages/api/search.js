import cheerio from "cheerio";

export default async function handler(req, res) {
    let { q } = req.query;
    let results = await search(q);
    res.status(200).json({anime: results});
}

async function search(query) {
    let page = await fetch("https://ajax.gogo-load.com/site/loadAjaxSearch?keyword=" + query, {
        headers: {
            "User-agent": "Mozilla/5.0 (X11; Linux x86_64; rv:97.0) Gecko/20100101 Firefox/97.0",
        }
    });
    // console.log(await page.text());
    let html = (await page.json()).content;
    let $ = cheerio.load(decodeURI(html)); 
    let results = [];
    for (const anime of $("div#header_search_autocomplete_body").children()) {
        results.push({
            name: $(anime).find("a").text(),
            link: $(anime).find("a").attr("href").replace('category/', ''),
        })
    }
    return results;
}