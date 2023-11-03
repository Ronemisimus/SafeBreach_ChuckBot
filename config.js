const config = {
    translator_api_key: process.env.TRANSLATOR_API_KEY,
    region: process.env.REGION,
    entrypoint: process.env.ENTRYPOINT,
    telegram_bot_token: process.env.TELEGRAM_BOT_TOKEN,
    port: process.env.PORT || 3000
};

export default config;
