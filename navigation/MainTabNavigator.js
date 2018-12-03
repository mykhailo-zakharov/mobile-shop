import React from 'react';
import {Platform} from 'react-native';
import {createStackNavigator, createBottomTabNavigator} from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import HistoryScreen from '../screens/HistoryScreen';
import SettingsScreen from '../screens/SettingsScreen';
import BasketScreen from '../screens/Basket/BasketScreen';

import { nls } from "../i18n";



export default function () {
    const HomeStack = createStackNavigator({
        Home: HomeScreen,
    });

    HomeStack.navigationOptions = {
        tabBarLabel: nls("link_home"),
        tabBarIcon: ({focused}) => (
            <TabBarIcon
                focused={focused}
                name={
                    Platform.OS === 'ios'
                        ? `ios-information-circle${focused ? '' : '-outline'}`
                        : 'md-information-circle'
                }
            />
        ),
    };

    const HistoryStack = createStackNavigator({
        Links: HistoryScreen,
    });

    HistoryStack.navigationOptions = {
        tabBarLabel: 'History',
        tabBarIcon: ({focused}) => (
            <TabBarIcon
                focused={focused}
                name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
            />
        ),
    };

    const SettingsStack = createStackNavigator({
        Settings: SettingsScreen,
    });

    SettingsStack.navigationOptions = {
        tabBarLabel: nls("link_settings"),
        tabBarIcon: ({focused}) => (
            <TabBarIcon
                focused={focused}
                name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
            />
        ),
    };

    const BasketStack = createStackNavigator({
        Settings: BasketScreen,
    });

    BasketStack.navigationOptions = {
        tabBarLabel: nls("link_basket"),
        tabBarIcon: ({focused}) => (
            <TabBarIcon
                focused={focused}
                name={Platform.OS === 'ios' ? 'ios-basket' : 'md-basket'}
            />
        ),
    };

    return createBottomTabNavigator({
        HomeStack,
        BasketStack,
        HistoryStack,
        SettingsStack
    });
}
