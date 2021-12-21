import cheerio from "cheerio";
export default async function handler(req, res) {
    let { anime } = req.query;
    return res.status(200).json(await getAnime(anime));
}

async function getAnime(anime_slug) {
    let page = fetch("https://www1.gogoanime.cm/category/" + anime_slug, {
        headers: {
            "User-agent": "Mozilla/5.0 (X11; Linux x86_64; rv:97.0) Gecko/20100101 Firefox/97.0",
        }
    });
    let html = await page.text();
    let $ = cheerio.load(html);

    return {
        name: $("div.anime_info_body_bg>h1").text(),
        cover: $("div.anime_info_body_bg>img").attr("src"),
        episodes: getEpisodes($("input#anime_id").attr("value")),
    };
}

async function getEpisodes(anime_id) {
    let page = fetch("https://ajax.gogo-load.com/ajax/load-list-episode?ep_start=0&ep_end=99999&id=" + anime_id, {
        headers: {
            "User-agent": "Mozilla/5.0 (X11; Linux x86_64; rv:97.0) Gecko/20100101 Firefox/97.0",
        }
    });
    let html = await page.text();
    let $ = cheerio.load(html);
    let result = [];
    for (ep of $("ul.episode_related").children()) {
        result.push({
            name: $(ep).find("a>div.name").text(),
            link: $(ep).find("a").attr("href"),
        })
    }
    return result;
}