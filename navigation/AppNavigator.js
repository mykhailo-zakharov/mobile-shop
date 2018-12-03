import React from 'react';
import { createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';

export default function () {
    return createSwitchNavigator({
        Main: MainTabNavigator(),
    });
}
