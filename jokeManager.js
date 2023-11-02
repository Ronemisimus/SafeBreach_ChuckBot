const source = "https://parade.com/968666/parade/chuck-norris-jokes"

const puppeteer = require('puppeteer-extra') 
// Add stealth plugin and use defaults 
const pluginStealth = require('puppeteer-extra-plugin-stealth') 
const {executablePath} = require('puppeteer');
const cheerio = require('cheerio')

class JokeManager {
    constructor() {
        this.avaliable_jokes = []
    }

    async init() {
        try{
            puppeteer.use(pluginStealth())
            const browser = await puppeteer.launch({ headless:false, executablePath: executablePath() });
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

            await page.waitForTimeout(1000) 

            await page.goto(source);

            await page.screenshot({ path: 'image.png', fullPage: true });

            const html = await page.content();

            await browser.close();

            this.avaliable_jokes = this.proccess(html)
        }
        catch (err){
            console.log(err);
            throw err
        }
    }

    getJoke(index) {
        return this.avaliable_jokes[index]        
    }
    

    proccess(html) {
        const $ = cheerio.load(html)
        
        console.log("jokes")

    }
}

module.exports = {
    JokeManager
}