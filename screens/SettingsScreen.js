import React from 'react';
import {View, ScrollView, TextInput, Text, StyleSheet, Button, Platform} from "react-native";
import {connect} from "react-redux";

import RNPickerSelect from 'react-native-picker-select';
import {nls, setLanguage, getLanguage} from "../i18n";
import {changeLanguage, changeUserName} from "../redux/reducer";


class SettingsScreen extends React.Component {
    static navigationOptions = {
        title: 'Settings',
    };

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

    changeLang = value => {
        setLanguage(value);
        this.props.changeLanguage(value)
    };

    render() {
        const {language, userName, userAddress, userPhones} = this.props;
        console.log("setting language", language);

        return (
            <View style={styles.container}>
                <ScrollView style={styles.container}>
                    <Text style={styles.title}>{nls("language")}</Text>
                    <RNPickerSelect
                        items={this.langItems}
                        onValueChange={this.changeLang}
                        style={{...pickerSelectStyles}}
                        value={language}
                        placeholder={{}}
                    />

                    <Text style={styles.title}>{nls("name")}</Text>
                    <TextInput style={pickerSelectStyles.inputIOS}
                               onChangeText={this.props.changeUserName}
                               value={userName}
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

const mapStateToProps = state => {
    console.log("settings mapStateProps", state);
    return {
        language: state.language,
        userName: state.userName,
        userAddress: state.userAddress,
        userPhones: state.userPhones,
    }
};

const mapDispatchToProps = {
    changeLanguage,
    changeUserName
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);