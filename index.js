import  translate from './translate.js'
import languageManager from './languageManager.js'
import JokeManager from './jokeManager.js'
import bot from './bot.js'

async function main() {

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