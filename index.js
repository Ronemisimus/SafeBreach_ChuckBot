const translate = require('./translate.js')

async function main(){
    try {
        const translation = await translate.translate('מה הולך?', 'en');
        console.log(translation);
    }catch(error){
        console.error("Translation error:", error);
    }
}

main()