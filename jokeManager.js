const source = "https://parade.com/968666/parade/chuck-norris-jokes"

const puppeteer = require('puppeteer')
const cheerio = require('cheerio')

class JokeManager {
    constructor() {
        this.avaliable_jokes = []
    }

    async init() {
        try{
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            await page.goto(source);

            await page.waitForSelector('div');

            const html = await page.content();
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