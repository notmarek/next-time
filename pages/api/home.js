import cheerio from "cheerio";

let content = { data: null, timestamp: 0 };
let timeout = 600 * 10; // 10 minutes

export default async function handler(req, res) {
    if (content.timestamp + timeout < Date.now()) {
        let res = await getGogoHomepage();
        content = { data: res, timestamp: Date.now() };
    }
    res.status(200).json(content);
}

async function getGogoHomepage() {
    return {
        recent_releases: await getRecents(1),
        recent_dubbed: await getRecents(2),
        recent_chinese: await getRecents(3),
    };
}

async function getRecents(type) {
    let page = await fetch(
        "https://ajax.gogo-load.com/ajax/page-recent-release.html?page=1&type=" +
            type,
        {
            headers: {
                "User-agent":
                    "Mozilla/5.0 (X11; Linux x86_64; rv:97.0) Gecko/20100101 Firefox/97.0",
            },
        }
    );
    let html = await page.text();
    let $ = cheerio.load(html);
    let releases = $("div.last_episodes.loaddub>ul.items").children();
    let result = [];
    for (const rls of releases) {
        result.push({
            name: $(rls).find("p.name").text(),
            link: $(rls).find("p>a").attr("href"),
            episode: $(rls).find("p.episode").text(),
            cover: $(rls).find("img").attr("src"),
        });
    }
    return result;
}
