import { AsyncStorage } from "react-native"
import I18n from 'react-native-i18n';

import ua from "./ua";
import en from "./en";
import ru from "./ru";


I18n.fallbacks = true;
I18n.translations = {
    ua,
    en,
    ru
};

const nls = (text) => {
    return I18n.t(text)
};

const getLanguage = () => {
    console.log("getLanguage", I18n.currentLocale(), I18n.locale);
    return I18n.currentLocale()
};

const setLanguage = async lang => {
    I18n.locale = lang;
    I18n.forceUpdateApp();
    console.log("should", lang, " / is ", I18n.locale);
};

const initLanguage = component => {
    return new Promise(resolve => {
        try {
            console.log("init language", I18n.locale);
            AsyncStorage.getItem("language", (err, lang) => {
                console.log("init language", lang);
                if (lang !== null) {
                    I18n.locale = lang;
                    I18n.defaultLocale = lang;
                    I18n.forceUpdateApp = component.forceUpdate.bind(component);
                }
                resolve();
            });
        } catch (error) {
            // Error saving data
        }
    })
};

export {
    nls,
    setLanguage,
    getLanguage,
    initLanguage
}