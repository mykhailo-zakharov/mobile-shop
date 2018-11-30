import React, {Component} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';


export default class Item extends Component {

    state = {
        count: 0
    };

    increment = diff => {
      this.setState(prevState => ({count: prevState.count + diff}))
    };

    decrement = diff => {
      this.setState(prevState => {
          const newCount = prevState.count - diff;
          if(newCount >= 0){
              return {count: newCount};
          }
          return {count: 0};
      })
    };

    addToBasket = () => {
        this.props.addToBasket({
            itemId: this.props.id,
            count: this.state.count
        });
        this.setState({count: 0});
    };

    countPrice = (count, prices) => {
        const {price, sum} = this.props.countPrice(count, prices);
        return `* ${price} = ${sum}grn`;
    };

    render(){
        const prices = this.props.prices;
        let {count} = this.state;

        return(
            <View style={styles.itemContainer}>
                <Text style={styles.header}>{this.props.name}</Text>

                <Text style={styles.title}>Prices:</Text>
                {Object.keys(prices).map(key => (
                    <View key={key} style={styles.priceContainer}>
                        <Button title={" - "} onPress={()=>{this.decrement(+key)}} />
                        <Text style={styles.priceText} >From {key} piece(s) - {prices[key]} grn.</Text>
                        <Button title={" + "} onPress={()=>{this.increment(+key)}} />
                    </View>
                ))}

                {this.props.exist ?
                <View style={styles.footer}>
                    <Text style={styles.footerText}>{count}p. {count && this.countPrice(count, prices) || null}</Text>
                    <Button title={"Add to basket"} onPress={this.addToBasket} disabled={!count}  style={styles.footerBtn} />
                </View> :

                <View style={styles.footer}>
                    <Text>In current moment item is absent!</Text>
                </View>}
            </View>
        )
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
    itemContainer: {
        width: "90%",
        margin: 10,
        marginBottom: 20,
        backgroundColor: 'powderblue'
    },

    header: {
        fontSize: 20,
        padding: 10,
        marginBottom: 10,
        textAlign: "center"
    },

    title: {
        fontSize: 17,
        padding: 10,
        marginBottom: 10,
        textAlign: "center"
    },

    priceText: {
        fontSize: 15,
        padding: 10,
        lineHeight: 20,
        textAlign: "center"
    },

    priceContainer: {
        display: "flex",
        flexDirection: 'row',
        justifyContent: "space-between",
    },

    footer: {
        display: "flex",
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center",
        borderTopColor: "#fff",
        borderTopWidth: 1,
        paddingRight: 10,
        paddingLeft: 10
    },

    footerText: {
        fontSize: 18,
    }
});