// gets and manages supported languages and language codes
// allows to translate language name to language code

const { default: axios } = require("axios")


class LanguageManager {
    constructor() {
        this.avaliable_languages = {}
    }

    async init() {
        try {
            const response = await axios.get("https://api.cognitive.microsofttranslator.com/languages",
                {
                    params: {
                        'api-version': '3.0',
                    }

                });
            this.avaliable_languages = response.data.translation
            this.createLanguageMaps()
        }
        catch (err) {
            console.log(err);
            throw err
        }
    }

    createLanguageMaps() {
        this.code_to_language = {}
        this.language_to_code = {}
        this.language_native_name_to_code = {}
        for (const code in this.avaliable_languages) {
            const language_obj = this.avaliable_languages[code]
            const language_name = language_obj.name.toLowerCase()
            const language_native_name = language_obj.nativeName.toLowerCase()
            this.code_to_language[code] = language_name
            this.language_to_code[language_name] = code
            this.language_native_name_to_code[language_native_name] = code
        }
    }

    getLanguageCode(language_name) {
        language_name = language_name.toLowerCase()
        if (this.language_to_code[language_name]) {
            return this.language_to_code[language_name]
        }
        else {
            return null
        }
    }

    getLanguageName(language_code) {
        if (this.code_to_language[language_code]) {
            return this.code_to_language[language_code]
        }
        else {
            return null
        }
    }

    getSupportedLanguages() {
        return Object.keys(this.language_to_code)
    }
}

module.exports = {
    LanguageManager
}