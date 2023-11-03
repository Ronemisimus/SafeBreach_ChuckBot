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

    translator.target = manager.getLanguageCode("chinese simplified a")
    if (!translator.target) {
        console.log("The language you chose is not supported. mabye the name is wrong")
        console.log("here are the supported languages:")
        console.table(manager.getSupportedLanguages())
    }
    else {
        const text = await translator.translate(
            jokes.getJoke(
                Math.round( Math.random() *  (jokes.getAmount() - 1) ) + 1
                )
            )

        console.log(text)
    }
}

main()