const translate = require('./translate.js')
const languageManager = require('./languageManager.js')

async function main(){

    const manager = new languageManager.LanguageManager()

    try{
        await Promise.all([manager.init()]);
    }
    catch (err){
        console.log(err);
        return;
    }

    console.log(manager.getLanguageCode("hebrew"))
}

main()