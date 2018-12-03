import React from 'react';
import {View, ScrollView, TextInput, Text, StyleSheet, Button, Platform} from "react-native";

import RNPickerSelect from 'react-native-picker-select';
import { nls, setLanguage, getLanguage } from "../i18n";

export default class SettingsScreen extends React.Component {
    static navigationOptions = {
        title: 'Settings',
    };

    state = {
        name: "",
        lang: getLanguage()
    };

    inputRefs = {};

    langItems = [
        {
            label: 'English',
            value: 'en',
        },
        {
            label: 'Ukraine',
            value: 'ua',
        },
        {
            label: 'Russian',
            value: 'ru',
        },
    ];

    changeName = () => {

    };

    changeLang = value => {
        setLanguage(value);
        this.setState({
            lang: value
        });
    };

    render() {
        return (
            <View style={styles.container}>
                <ScrollView style={styles.container}>
                    <Text style={styles.title}>{nls("language")}</Text>
                    <RNPickerSelect
                        items={this.langItems}
                        onValueChange={this.changeLang}
                        style={{ ...pickerSelectStyles }}
                        value={this.state.lang}
                        placeholder={{}}
                        ref={(el) => {
                            this.inputRefs.lang = el;
                        }}
                    />

                    <Text style={styles.title}>{nls("name")}</Text>
                    <TextInput style={pickerSelectStyles.inputIOS}
                               onChangeText={this.changeName}
                    />
                </ScrollView>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 5
    },
    title: {
        fontSize: 18,
        marginBottom: 5,
        marginTop: 10
    },
    input: {
        height: 30,
        backgroundColor: "#d1d1d1"
    }
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingTop: 13,
        paddingHorizontal: 10,
        paddingBottom: 12,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        backgroundColor: 'white',
        color: 'black',
    },
});