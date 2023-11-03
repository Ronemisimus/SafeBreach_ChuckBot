#!/bin/sh

export $(cat secrets.env )

echo $TELEGRAM_BOT_TOKEN

node index.js