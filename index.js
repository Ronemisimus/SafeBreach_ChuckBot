const translate = require('./translate.js')
const languageManager = require('./languageManager.js')
const JokeManager = require('./jokeManager.js')

async function main(){

    const manager = new languageManager.LanguageManager()
    const translator = new translate.Translator()
    const jokes = new JokeManager.JokeManager()

    try{
        await Promise.all([manager.init(), jokes.init()]);
    }
    catch (err){
        console.log(err);
        return;
    }

    translator.target = manager.getLanguageCode("Hebrew")
    const text = await translator.translate("hello world")

    console.log(text)
}

main()