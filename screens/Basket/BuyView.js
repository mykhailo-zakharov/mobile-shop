import React from "react";
import {View, ScrollView, Text, StyleSheet, Button, Platform} from "react-native";
import { Icon } from 'expo';
import Colors from "../../constants/Colors";


export default BuyView = props => {

    return (
    <ScrollView style={styles.container}>
        <View style={styles.headerContainer}>
            <Text style={styles.header}>Your basket.</Text>
        </View>
        {Object.keys(props.basket).map(key => {
            let {count, link, currentPrice, sum} = props.basket[key];
            let {id, name} = link;

            return (
                <View key={key} style={styles.itemContainer}>
                    <Text style={styles.itemText}>{`${name} : ${count} * ${currentPrice} = ${sum}`}</Text>
                    <Icon.Ionicons
                        name={(Platform.OS === 'ios' ? 'ios' : 'md') + '-remove-circle-outline'}
                        size={22}
                        onPress={()=> {props.removeItem(id)}}
                        style={{ marginRight: 10 }}
                    />
                </View>
            )})
        }
        <View style={styles.sumContainer}>
            <Text style={styles.sum}>Sum: {props.sum} grn</Text>
        </View>
        <Button title={"Clear basket"} onPress={props.clearBasket}/>
    </ScrollView>)
}


const styles = StyleSheet.create({
    container: {
        display: "flex",
        flex: 1,
        padding: 20,

    },
    itemContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        fontSize: 22,
        paddingTop: 5,
        paddingBottom: 5,
    },
    itemText: {
        fontSize: 18
    },
    headerContainer: {
        borderBottomWidth: 1,
        borderBottomColor: "#d1d11d1",
        marginBottom: 10
    },
    header: {
        fontSize: 20,
    },
    sumContainer: {
        borderTopWidth: 1,
        borderTopColor: "#d1d11d1",
        marginTop: 10
    },
    sum: {
        fontSize: 20,
    }
});