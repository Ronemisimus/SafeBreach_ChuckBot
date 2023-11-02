const config = require('./config.js');

const axios = require('axios').default;
    
const { v4: uuidv4 } = require('uuid');

let key = config.translator_api_key;
let endpoint = config.entrypoint;

// location, also known as region.
// required if you're using a multi-service or regional (not global) resource. It can be found in the Azure portal on the Keys and Endpoint page.
let location = config.region;

/**
 * Translates the given text to the specified target language using the Microsoft Translator API.
 *
 * @param {string} text - The text to be translated.
 * @param {string} targetLanguage - The target language to translate the text into.
 * @return {Promise<string>} A promise that resolves to the translated text in JSON format.
 */
async function translate(text, targetLanguage) {
    try {
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
                'from': '',
                'to': [targetLanguage]
            },
            data: [{
                'text': text
            }],
            responseType: 'json'
        });
        
        return JSON.stringify(response.data, null, 4);
    } catch (error) {
        // Handle errors here, e.g., by returning an error message or throwing an exception.
        console.error("Translation error:", error);
        return "Translation failed";
    }
}

module.exports = { translate }