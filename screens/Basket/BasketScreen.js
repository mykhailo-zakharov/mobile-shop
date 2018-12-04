import React from 'react';
import {View, ScrollView, Text, StyleSheet, Button} from "react-native";
import { connect } from 'react-redux';

import ItemBasket from "./Item";
import BuyView from "./BuyView"
import { listRepos } from '../../redux/reducer';


class BasketScreen extends React.Component {

    state = {
        basket: {
            // id: {
            //     id,
            //     link,
            //     currentPrice,
            //     sum
            // }
        },
        sum: 0,
        isBasketView: false
    };

    componentDidMount() {
        console.log("componentDidMount");
        this.props.listRepos();
    }

    static navigationOptions = {
        header: null,
    };

    addToBasket = ({itemId, count}) => {
        const prices = this.props.prices;
        this.setState(prevState => {
            let item = this.state.basket[itemId];
            if(item && item.link){
                item = {...item, count: item.count += count};
            } else {
                item = {
                    id: itemId,
                    count,
                    link: prices.filter(i => i.id == itemId)[0]
                }
            }

            let basket = {...prevState.basket, [itemId]: item};
            return {
                basket,
                sum: this.countBasketSum(basket)
            }
        })
    };

    countBasketSum = basket => {
        return Object.keys(basket)
            .reduce((sum, key) => sum + this.countPriceBasket(basket[key]), 0);
    };

    handleBasketBtn = () => {
        this.setState(prevState => ({isBasketView: !prevState.isBasketView}));
    };

    countPriceBasket = BasketItem => {
        let {count} = BasketItem;
        let {prices} = BasketItem.link;
        const priceKeys = Object.keys(prices);
        let lastKey, price;

        for(let i=priceKeys.length-1; i>-1; --i){
            lastKey = priceKeys[i];
            price = prices[lastKey];
            if(count === lastKey || count >= lastKey) {
                let sum = price * count;
                BasketItem.currentPrice = price;
                BasketItem.sum = sum;
                return sum;
            }
        }
    };

    countPrice = (count, prices) => {
        const priceKeys = Object.keys(prices);
        let lastKey, price;

        for(let i=priceKeys.length-1; i>-1; --i){
            lastKey = priceKeys[i];
            price = prices[lastKey];
            if(count === lastKey || count >= lastKey) {
                return {sum: price * count, price};
            }
        }
    };

    removeItem = id => {
        this.setState(prevState => {
            let newBasket = {...prevState.basket};
            delete newBasket[id];
            if(Object.getOwnPropertyNames(newBasket).length === 0){
                return {
                    basket: {},
                    sum: 0,
                    isBasketView: false
                }
            }
            return {
                basket: newBasket,
                sum: this.countBasketSum(newBasket)
            }
        })
    };

    clearBasket = () => {
        this.setState({
            basket: {},
            sum: 0,
            isBasketView: false
        });
    };

    checkout = () => {

    };


    render() {
        let {basket, sum, isBasketView} = this.state;
        let prices = this.props.prices;

        return (
            <View style={styles.container}>
                <View style={styles.basket}>
                    <Text>{sum ? `Sum: ${sum} grn` : "Your basket is empty now."}</Text>
                    {(sum || isBasketView) && <Button title={isBasketView ? "Back to item list":"Move to basket"} onPress={this.handleBasketBtn}/> || null}
                </View>

                {/*basket body*/}
                {isBasketView ? <BuyView {...this.state}
                                         removeItem={this.removeItem}
                                         clearBasket={this.clearBasket}
                                         checkout={this.checkout}
                    /> :
                // prices of items
                <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                    {!isBasketView && prices && prices.length && prices.map(item => (
                        <ItemBasket key={item.id} {...item}
                                    addToBasket={this.addToBasket}
                                    countPrice={this.countPrice}
                        />
                    )) || null}

                </ScrollView>}

            </View>);
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    contentContainer: {
        display: "flex",
        flexDirection: 'row',
        flexWrap: "wrap",
        justifyContent: "space-between",
        paddingTop: 30,
        paddingRight: 10,
        paddingLeft: 10,
    },
    containerItem: {
        width: 150,
        height: 200,
        margin: 10,
        marginBottom: 20,
        backgroundColor: 'powderblue'
    },

    basket: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: 30,
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
        borderBottomColor: "#000",
        borderBottomWidth: 1
    }

});

const mapStateToProps = state => {
    return {
        prices: state.prices
    };
};

const mapDispatchToProps = {
    listRepos
};

export default connect(mapStateToProps, mapDispatchToProps)(BasketScreen);

