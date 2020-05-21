import React, {Component} from 'react';
import {createStackNavigator, createAppContainer, StackActions, NavigationActions} from 'react-navigation';
import {Root, Toast} from 'native-base';

import Home from './src/screens/Home';

import {Kategori} from './src/screens/HomeScreens/Kategori';
import {MyProfile} from './src/screens/HomeScreens/MyProfile';
import {Rastgele} from './src/screens/HomeScreens/Rastgele';
import {Iletisim} from './src/screens/HomeScreens/Iletisim';


import {StyleSheet, View, Text, Image} from 'react-native';

export default class App extends Component {

    constructor(properties)
    {
        super(properties);
        this.state = {};

    }

    componentDidMount()
    {

    }

    render()
    {

        return (

            <Root>
                <AppContainer/>
            </Root>);

    }
}

const AppNavigator = createStackNavigator({
    Home    : {
        screen           : Home,
        navigationOptions: {
            gesturesEnabled: false,
        },
    },
    Kategori: {
        screen           : Kategori,
        navigationOptions: {
            gesturesEnabled: false,
        },
    },
    Profilim: {
        screen           : MyProfile,
        navigationOptions: {
            gesturesEnabled: false,
        },
    },
    Rastgele: {
        screen           : Rastgele,
        navigationOptions: {
            gesturesEnabled: false,
        },
    },
    Iletisim: {
        screen           : Iletisim,
        navigationOptions: {
            gesturesEnabled: false,
        },
    },
}, {
    index             : 0,
    initialRouteName  : 'Home',
    headerMode        : 'none',
    initialRouteParams: {transition: 'vertical'},
    navigationOptions : {
        gesturesEnabled: false,
    },
});

const AppContainer = createAppContainer(AppNavigator);
const styles = StyleSheet.create({
    image: {
        width       : 200,
        height      : 200,
        borderRadius: 10,
    },
    text : {
        fontSize       : 18,
        color          : 'white',
        textAlign      : 'center',
        paddingVertical: 30,
    },
    title: {
        fontSize    : 25,
        color       : 'white',
        textAlign   : 'center',
        marginBottom: 16,
    },
});


