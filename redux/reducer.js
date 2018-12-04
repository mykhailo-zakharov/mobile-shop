import {Alert, AsyncStorage} from "react-native";

import {nls, getLanguage} from "../i18n";

export const GET_PRICES = 'GET_PRICES';
export const GET_PRICES_SUCCESS = 'GET_PRICES_SUCCESS';
export const GET_PRICES_FAIL = 'GET_PRICES_FAIL';
export const CHANGE_LANGUAGE = 'CHANGE_LANGUAGE';
export const CHANGE_USER_NAME = 'CHANGE_USER_NAME';

let initObj;

export const initState = async () => {
    const userName = await getItemFromStorage("userName") || "";
    const userAddress = await getItemFromStorage("userAddress", true) || [];
    const userPhones = await getItemFromStorage("userPhones", true) || [];
    const prices = await getItemFromStorage("prices", true) || [];
    const language = await getItemFromStorage("language", ) || getLanguage();

    initObj = {
        userName,
        userAddress,
        userPhones,
        prices,
        language
    };
    return initObj;
};

const getItemFromStorage = async (attr, isJson) => {
    try{
        let data = await AsyncStorage.getItem(attr);
        if(isJson && data){
            data = JSON.parse(data);
        }
        return data;
    } catch (e) {
        return null;
    }
};


export default function(state = initObj, action) {
    console.log("==================reducer", state);
    switch (action.type) {
        case GET_PRICES:
            return {...state, loading: true};
        case GET_PRICES_SUCCESS:
            // let prices = action.payload.data;
            let prices = [
                {
                    id: 0,
                    name: "item 1",
                    prices: {
                        "1": 50,
                        "10": 45,
                        "50": 40
                    },
                    optCounting: 10,
                    exist: true
                },
                {
                    id: 1,
                    name: "item 2",
                    prices: {
                        "1": 100
                    },
                    priceOpt: 50,
                    optCounting: 10,
                    exist: true
                },
                {
                    id: 2,
                    name: "item 3",
                    prices: {
                        "10": 45,
                        "50": 40
                    },
                    priceOpt: 50,
                    optCounting: 10,
                    exist: true
                },
                {
                    id: 3,
                    name: "item 4",
                    prices: {
                        "1": 50,
                        "50": 40
                    },
                    priceOpt: 50,
                    optCounting: 10,
                    exist: true
                },
                {
                    id: 4,
                    name: "item 5",
                    prices: {
                        "1": 50
                    },
                    priceOpt: 50,
                    optCounting: 10,
                    exist: false
                },
                {
                    id: 5,
                    name: "item 6",
                    prices: {
                        "1": 50,
                        "50": 40
                    },
                    priceOpt: 50,
                    optCounting: 10,
                    exist: true
                },
            ];
            AsyncStorage.setItem("prices", JSON.stringify(prices));
            return {...state, loading: false, prices};
        case GET_PRICES_FAIL:
            Alert.alert(
                nls("alert_error_fetch_price_title"),
                nls("alert_error_fetch_price_body"),
                [
                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                ],
                { cancelable: false }
            );

            return {
                ...state,
                loading: false,
                error: 'Error while fetching prices'
            };
        case CHANGE_LANGUAGE:
            const language = action.payload;
            AsyncStorage.setItem("language", language);
            return {...state, language};
        case CHANGE_USER_NAME:
            const userName = action.payload;
            AsyncStorage.setItem("userName", userName);
            return {...state, userName};
        default:
            return state;
    }
};


export function listRepos(user) {
    return {
        type: GET_PRICES,
        payload: {
            request: {
                url: `/users/zakharovmikhail/repos`
            }
        }
    };
}

export function changeLanguage(lang){
    return {
        type: CHANGE_LANGUAGE,
        payload: lang
    }
}

export function changeUserName(name){
    return {
        type: CHANGE_USER_NAME,
        payload: name
    }
}