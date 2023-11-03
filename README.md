![Chuck Norris](https://pngimg.com/uploads/chuck_norris/chuck_norris_PNG14.png)
# ChuckBot

ChuckBot is a Telegram bot that provides hard cold facts about Chuck Norris with automatic translation. ChuckBot scrapes jokes from a website using Puppeteer and uses the Azure Translation API for translation. It is built using the Node.js library `node-telegram-bot-api` and deployed to a virtual machine (VM) on Azure. You can chat with ChuckBot at [http://t.me/Chuck_9349_bot](http://t.me/Chuck_9349_bot).

## Features
- ChuckBot provides Chuck Norris jokes and facts in multiple languages.
- Jokes are scraped in real-time using Puppeteer to keep the content fresh.
- Automatic translation is powered by the Azure Translation API, allowing users to enjoy jokes in their preferred language.
- Deployed on an Azure VM for 24/7 availability.

## How to Use ChuckBot
1. Start a chat with ChuckBot by visiting [@Chuck_9349_bot](http://t.me/Chuck_9349_bot).
2. Send a message to ChuckBot to get a Chuck Norris joke or fact in your preferred language.
3. ChuckBot will respond with a joke or fact, ensuring a good laugh.

## Screenshot
![ChuckBot Conversation](https://raw.githubusercontent.com/Ronemisimus/SafeBreach_ChuckBot/main/chat_screenshot.jpeg)

## Deployment
ChuckBot is deployed on an Azure virtual machine. You can set up your own instance by following these steps:

1. Clone this repository to your local machine.

2. npm install

3. ./run_local.sh

## Dependencies

make sure you can run chrome on the server

needs inbound request access on ports: 80,88,443,8443
