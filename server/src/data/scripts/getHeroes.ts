import puppeteer from "puppeteer";
import { writeFile } from "fs";
import { resolve } from "path";
import Hero, { HeroInfos } from "../../models/hero";
import { v4 as uuid } from "uuid";

const BASE_URL = "https://www.marvel.com";
const CHARACTER_LIST_URL = BASE_URL + "/characters";

// get the Hero Data from the provided hero page url
function scrapeHeroPage(newBrowser, url): Promise<Hero> {
  return new Promise(async (resolve, rejects) => {
    try {
      const newPage = await newBrowser.newPage();

      console.log(`Scrapping hero data from ${url}`);

      await newPage.goto(BASE_URL + url, { timeout: 0 });

      await newPage.waitForSelector("body");

      // get the hero data
      const heroCompiledData = await newPage.evaluate(() => {
        // get hero story
        const bioNode = document.querySelectorAll('div[class="content-block__body"]')[0] as HTMLElement;

        // get hero name
        const nameNode = document.querySelectorAll('div[class="masthead__container masthead__container_playing-false "]')[0]
          .childNodes[0] as HTMLElement;

        // get hero photo
        const photoNode = document.querySelectorAll(
          'div[class="masthead__background__wrapper"] > figure[class="img__wrapper masthead__background"]'
        )[0].childNodes[0] as HTMLElement;
        const photoUrl = photoNode.style.backgroundImage.split('"')[1];

        const getHeroesInfos = (): HeroInfos => {
          const heightNode = document.querySelectorAll('div[class="bioheader__charInfo"]')[0]?.childNodes[0] as HTMLElement;
          const weightNode = document.querySelectorAll('div[class="bioheader__charInfo"]')[0]?.childNodes[1] as HTMLElement;

          const eyesNode = document.querySelectorAll('div[class="bioheader__charInfo"]')[1]?.childNodes[0] as HTMLElement;
          const hairNode = document.querySelectorAll('div[class="bioheader__charInfo"]')[1]?.childNodes[1] as HTMLElement;

          return {
            height: heightNode?.innerText?.replace("HEIGHT", "").trim() ?? "Not Provided",
            weight: weightNode?.innerText?.replace("WEIGHT", "").trim() ?? "Not Provided",
            eyes: eyesNode?.innerText?.replace("EYES", "").trim() ?? "Not Provided",
            hair: hairNode?.innerText?.replace("HAIR", "").trim() ?? "Not Provided"
          };
        };

        return {
          photo: photoUrl,
          name: nameNode?.innerText.trim() ?? "Unamed",
          infos: getHeroesInfos(),
          bio: bioNode?.innerText?.replace("BIOGRAPHY", "").trim() ?? "Not Provided"
        };
      });

      // add a unique id to the compiled data
      let hero: Hero;
      hero = { id: uuid(), ...heroCompiledData };

      resolve(hero);
    } catch (err) {
      rejects(err);
    }
  });
}

// getting the Heroes data from the hero pages
async function getHeroData(urlDatas: string[]) {
  let heroes: Hero[];

  const newBrowser = await puppeteer.launch({
    headless: true
  });

  process.setMaxListeners(Infinity);
  const heroPromise: Promise<Hero>[] = urlDatas.map((url) => {
    return scrapeHeroPage(newBrowser, url);
  });

  await Promise.all(heroPromise).then((collectedHeroes) => (heroes = collectedHeroes));
  await newBrowser.close();

  return heroes;
}

// get the Hero Page Url
async function getHeroesPageUrl() {
  const browser = await puppeteer.launch({
    headless: true
  });

  const page = await browser.newPage();
  await page.setUserAgent("Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36");

  console.log("Getting heroes from website", CHARACTER_LIST_URL);
  await page.goto(CHARACTER_LIST_URL, { timeout: 0 });

  await page.waitForSelector("body");

  // scrape the link to the heroes pages
  await page.waitForSelector('div[class="content-grid content-grid__6"] > div[class="grid-base grid__6 "]');
  const urlDatas: string[] = await page.evaluate(() => {
    const urls = document.querySelectorAll('div[class="content-grid content-grid__6"] > div[class="grid-base grid__6 "]');

    // collect the links from the a element href
    const links = [];
    for (let i = 0; i < urls[0].childNodes.length; i++) {
      const aNode = urls[0].childNodes[i].childNodes[0] as HTMLElement;
      links.push(aNode.getAttribute("href"));
    }

    return links;
  });

  await browser.close();

  return urlDatas;
}

// write the provided heroes into a file
function storeData(heroes: Hero[]) {
  // write the Hero data into a file
  writeFile(resolve(__dirname, "../heroes.json"), JSON.stringify(heroes, null, 2), (err) => {
    if (err) {
      throw err;
    }
    console.log("Finished writing file");
  });
}

async function main() {
  const urlsData = await getHeroesPageUrl();
  const heroes = await getHeroData(urlsData);
  storeData(heroes);
}

main();
