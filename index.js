import  translate from './translate.js'
import languageManager from './languageManager.js'
import JokeManager from './jokeManager.js'
import bot from './bot.js'
import http from 'http'

async function start_server_for_azure() {
    

    const port = process.env.PORT || 8080;

    const server = http.createServer((req, res) => {
        if (req.url=='/env'){
            res.end(JSON.stringify(process.env))
        }
        else {
            res.end('Hello World!')
        }
    });

    server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
    });

}

async function main() {

    start_server_for_azure()

    const manager = new languageManager.LanguageManager()
    const translator = new translate.Translator()
    const englishTranslator = new translate.Translator()
    const jokes = new JokeManager.JokeManager()

    try {
        await Promise.all([manager.init(), jokes.init()]);
    }
    catch (err) {
        return;
    }

    bot.init(translator, englishTranslator, jokes, manager)

}

main()