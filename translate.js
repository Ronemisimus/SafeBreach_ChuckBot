import config from './config.js';

import axios from 'axios';

import { v4 as uuidv4 } from 'uuid';

const key = config.translator_api_key;
const endpoint = config.entrypoint;

// location, also known as region.
// required if you're using a multi-service or regional (not global) resource. It can be found in the Azure portal on the Keys and Endpoint page.
const location = config.region;

/**
 * Translates the given text to the specified target language using the Microsoft Translator API.
 *
 * @param {string} text - The text to be translated.
 * @param {string} targetLanguage - The target language to translate the text into.
 * @return {Promise<string>} A promise that resolves to the translated text in JSON format.
 */
async function translate_async(text, targetLanguage) {
    try {
        console.log(`Translating text... ${text} to ${targetLanguage}`);
        const response = await axios({
            baseURL: endpoint,
            url: '/translate',
            method: 'post',
            headers: {
                'Ocp-Apim-Subscription-Key': key,
                'Ocp-Apim-Subscription-Region': location,
                'Content-type': 'application/json',
                'X-ClientTraceId': uuidv4().toString()
            },
            params: {
                'api-version': '3.0',
                'to': targetLanguage
            },
            data: [{
                'text': text
            }],
            responseType: 'json'
        });
        console.log(`Translation successful: ${response.request.toString()}`);
        return response.data[0].translations[0].text;
    } catch (error) {
        console.error("Translation error:", error);
        return "Translation failed";
    }
}

class Translator {
    constructor() {
        this.target = "en"
    }

    async translate(text) {
        return await translate_async(text, this.target)
    }
}



const translate = { Translator }
export default translate