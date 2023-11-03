import TelegramBot from 'node-telegram-bot-api'
import config from './config.js';

// replace the value below with the Telegram token you receive from @BotFather
const token = config.telegram_bot_token;

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });



async function init(translator, jokesManager, languageCodeManager) {

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

    // on language command check if language is supported and set if it is
    // otherwise send error and show supported languages
    bot.onText(patterns.language, (msg, match) => {
        // 'msg' is the received Message from Telegram
        // 'match' is the result of executing the regexp above on the text content
        // of the message

        const chatId = msg.chat.id;
        const resp = match[12]; // the captured "whatever"

        // Get the list of supported languages
    

        const lang_code = languageCodeManager.getLanguageCode(resp)
        if (!lang_code) {
            bot.sendMessage(chatId, "The language you chose is not supported. mabye the name is wrong\n" +
                "here are the supported languages:")
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
        bot.sendMessage(chatId, `Language set to ${languageCodeManager.getLanguageName(lang_code)}`)
    });

    // on start send start message
    bot.onText(patterns.start, (msg) => {
        const chatId = msg.chat.id
        bot.sendMessage(chatId, help_massage)
    });

    // on help send help message
    bot.onText(patterns.help, (msg) => {
        bot.sendMessage(msg.chat.id, help_massage)
    })

    // on number: check range, get joke, translate, and send
    bot.onText(patterns.number, async (msg, match) => {
        // 'msg' is the received Message from Telegram
        // 'match' is the result of executing the regexp above on the text content
        // of the message

        const chatId = msg.chat.id;
        const resp = match[0]; // the captured "whatever"

        if (resp > jokesManager.getAmount() ||
        resp < 1 ){
            bot.sendMessage(chatId, `The number you entered is not supported. it must be in the range: [1-${jokesManager.getAmount()}]`)
            return;
        }

        const translatedText = await translator.translate(jokesManager.getJoke(resp))
        bot.sendMessage(chatId, translatedText)

    })

    // any message not in patterns will be processed as error
    bot.on('message', (msg) => {
        if (Object.values(patterns).some(pattern => pattern.test(msg.text))) {
            return;
        }
        const chatId = msg.chat.id;
        bot.sendMessage(chatId, `Sorry, I can't process that. Please enter help to see the options`);
    });
}

const _bot = {
    init
}

export default _bot