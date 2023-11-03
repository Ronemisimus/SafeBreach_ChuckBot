const TelegramBot = require('node-telegram-bot-api');
const config = require('./config.js');

// replace the value below with the Telegram token you receive from @BotFather
const token = config.telegram_bot_token;

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });



async function init(translator, jokesManager, languageCodeManager) {

    const help_massage = 'Welcome! I am chuck bot!\n' +
        `I hold ${jokesManager.getAmount()} chuck norris facts in english\n` +
        `I support the following options:\n` +
        `1. Enter a number from 1-${jokesManager.getAmount()} to get a joke\n` +
        `2. Enter 'Set language [Language Name]' to set the language\n` +
        `3. Enter 'Help' to see this message again`

    bot.onText(/set language (.+)/, (msg, match) => {
        // 'msg' is the received Message from Telegram
        // 'match' is the result of executing the regexp above on the text content
        // of the message

        const chatId = msg.chat.id;
        const resp = match[1]; // the captured "whatever"

        const lang_code = languageCodeManager.getLanguageCode(resp)
        if (!lang_code) {
            bot.sendMessage(chatId, "The language you chose is not supported. mabye the name is wrong\n" +
                "here are the supported languages:")
            bot.sendMessage(chatId, JSON.stringify(console.table(manager.getSupportedLanguages())))
        }
        else {
            translator.target = lang_code
            bot.sendMessage(chatId, "Language set to " + manager.getLanguageName(lang_code))
        }
    });

    // Listen for the /start command
    bot.onText(/\/start/, (msg) => {
        const chatId = msg.chat.id

        // Send the start message
        bot.sendMessage(chatId, help_massage)
    });

    bot.onText(/help/, (msg) => {
        bot.sendMessage(msg.chat.id, help_massage)
    })

    bot.onText(/^[1-9]\d*$/, async (msg, match) => {
        // 'msg' is the received Message from Telegram
        // 'match' is the result of executing the regexp above on the text content
        // of the message

        const chatId = msg.chat.id;
        const resp = match[0]; // the captured "whatever"

        const translatedText = await translator.translate(resp)
        bot.sendMessage(chatId, translatedText)

    })

    bot.on('message', (msg) => {
        const chatId = msg.chat.id;
        // Send an error message for non-text messages
        bot.sendMessage(chatId, `Sorry, I can't process that. Please enter help to see the options`);
    });

    bot.on('polling_error', (error) => {
        console.log(error); // Handle errors
    });
}

module.exports = {
    init
}