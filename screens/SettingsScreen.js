import React from 'react';
import {View, ScrollView, TextInput, Text, StyleSheet, Button, Platform} from "react-native";

export default class SettingsScreen extends React.Component {
    static navigationOptions = {
        title: 'Settings',
    };

    state = {
        name: ""
    }

    changeName = () => {

    };

    render() {
        return (
            <View style={styles.container}>
                <ScrollView style={styles.container}>
                    <Text style={styles.title}>Name</Text>
                    <TextInput style={styles.input}
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
        fontSize: 18
    },
    input: {
        height: 30,
        backgroundColor: "#d1d1d1"
    }
});