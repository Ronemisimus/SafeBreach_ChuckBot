const source = "https://parade.com/968666/parade/chuck-norris-jokes"

import puppeteer from 'puppeteer-extra'
// Add stealth plugin and use defaults 
import pluginStealth from 'puppeteer-extra-plugin-stealth'
import { executablePath } from 'puppeteer';
import { load } from 'cheerio'

class JokeManager {
    constructor() {
        this.avaliable_jokes = []
    }

    async init() {
        console.log('Initializing jokes manager...')
        try {
            puppeteer.use(pluginStealth())
            const browser = await puppeteer.launch({ headless: true, executablePath: '/snap/bin/chromium' });
            const page = await browser.newPage();

            await page.setRequestInterception(true);
            page.on('request', async (request) => {
                if (request.resourceType() == 'image') {
                    await request.abort();
                } else {
                    await request.continue();
                }
            });

            await page.setExtraHTTPHeaders({
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
                'upgrade-insecure-requests': '1',
                'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
                'accept-encoding': 'gzip, deflate, br',
                'accept-language': 'en-US,en;q=0.9,en;q=0.8'
            });

            await new Promise(r => setTimeout(r, 1000));

            await page.goto(source);

            const html = await page.content();

            await browser.close();

            this.proccess(html)
            console.log('Jokes manager initialized')
        }
        catch (err) {
            console.log('Jokes manager error:', err)
            throw err
        }
    }

    getJoke(index) {
        return this.avaliable_jokes[index - 1]
    }

    getAmount() {
        return this.avaliable_jokes.length
    }


    proccess(html) {
        const $ = load(html)

        $('ol li').each((index, element) => {
            this.avaliable_jokes.push($(element).text())
        });
    }
}

const Joke = {
    JokeManager
}

export default Joke