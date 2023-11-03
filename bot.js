import TelegramBot from 'node-telegram-bot-api'
import config from './config.js';

// replace the value below with the Telegram token you receive from @BotFather
const token = config.telegram_bot_token;

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });


async function init(translator, englishTranslator, jokesManager, languageCodeManager) {

    bot.setWebHook(config.webhook);

    const patterns = {
        language: /^(s|S)(e|E)(t|T) (l|L)(a|A)(n|N)(g|G)(u|U)(a|A)(g|G)(e|E) (.+)/,
        start: /^\/start$/,
        help: /^(h|H)(e|E)(l|L)(p|P)$/,
        number: /^[1-9]\d*$/
    }

    const help_massage = 'Welcome! I am chuck bot!\n' +
        `I hold ${jokesManager.getAmount()} chuck norris facts in english\n` +
        `I support the following options:\n` +
        `1. Enter a number from 1-${jokesManager.getAmount()} to get a joke\n` +
        `2. Enter 'Set language [Language Name]' to set the language\n` +
        `3. Enter 'Help' to see this message again`

    const supportedLanguages = languageCodeManager.getSupportedLanguages();


    async function setLanguage(msg, chatId){
    
            const match = msg.match(patterns.language)
            const resp = match[12]; // the captured "whatever"
    
            const lang_code = languageCodeManager.getLanguageCode(resp)
            if (!lang_code) {
                bot.sendMessage(chatId, await translator.translate("The language you chose is not supported. maybe the name is wrong\n" +
                    "here are the supported languages:"))
                const groupSize = 10;
                for (let i = 0; i < supportedLanguages.length; i += groupSize) {
                    const group = supportedLanguages.slice(i, i + groupSize);
                    const message = group.join('\n');
                    // Send the message for each group of languages
                    bot.sendMessage(chatId, message);
                }
                return;
            }
            translator.target = lang_code
            bot.sendMessage(chatId, await translator.translate(`No problem: Language set to ${languageCodeManager.getLanguageName(lang_code)}`))
    }

    async function help(chatId){
        bot.sendMessage(chatId, await translator.translate(help_massage))
    }

    async function jokeNumber(msg, chatId){
        const match = msg.match(patterns.number)
        const resp = match[0]; // the captured "whatever"

        if (resp > jokesManager.getAmount() ||
        resp < 1 ){
            bot.sendMessage(chatId, await translator.translate(
                `The number you entered is not supported. it must be in the range: [1-${jokesManager.getAmount()}]`))
            return;
        }

        const translatedText = await translator.translate(`${resp}. ` +jokesManager.getJoke(resp))
        bot.sendMessage(chatId, translatedText)
    }

    // any message not in patterns will be processed as error
    bot.on('message', async (msg) => {
        const english_msg = await englishTranslator.translate(msg.text)
        const chatId = msg.chat.id;
        if (Object.values(patterns).some(pattern => pattern.test(english_msg))) {
            if (english_msg.match(patterns.language)) {
                setLanguage(english_msg, chatId)
            }
            else if (english_msg.match(patterns.start)) {
                help(chatId)
            }
            else if (english_msg.match(patterns.help)) {
                help(chatId)
            }
            else if (english_msg.match(patterns.number)) {
                jokeNumber(english_msg, chatId)
            }
            return;
        }
        bot.sendMessage(chatId, await translator.translate(`Sorry, I can't process that. Please enter help to see the options`));
    });
}

const _bot = {
    init
}

export default _bot