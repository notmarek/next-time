import cheerio from "cheerio";

export default async function handler(req, res) {
    let { episode } = req.query;
    let servers = await getServers(episode);
    res.status(200).json({servers});
}

async function getServers(episode) {
    let page = await fetch("https://www1.gogoanime.cm/" + episode, {
        headers: {
            "User-agent": "Mozilla/5.0 (X11; Linux x86_64; rv:97.0) Gecko/20100101 Firefox/97.0",
        }
    });
    let html = await page.text();
    let $ = cheerio.load(html);
    let servers = $("div.anime_muti_link>ul").children();
    let result = [];
    for (const srv of servers) {
        result.push({
            name: $(srv).find("a").text().replace("\n", "").replaceAll(" ", "").replace("Choosethisserver", ""),
            iframe: $(srv).find("a").attr("data-video"),
        });
    }
    return result;
}