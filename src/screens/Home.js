import React, {Component, Fragment} from 'react';
import {
    StyleSheet,
    TouchableHighlight,
    View,
    Dimensions,
    FlatList, Image, ImageBackground, StatusBar, SafeAreaView,
} from 'react-native';
import {
    Container,
    Title, Header,
    Content,
    Button, Icon,
    Text,
    Left,
    Body, Input, Item,
} from 'native-base';

import GLOBAL from '../global';
import BottomNavigationBar from '../components/BottomNavigationBar';
import {ScrollView} from 'react-navigation';

const Data = {
    'Asker'    : require('../assets/images/Asker.png'),
    'Deli'     : require('../assets/images/Deli.png'),
    'Doktor'   : require('../assets/images/Doktor.png'),
    'Erzurum'  : require('../assets/images/Erzurum.png'),
    'Genel'    : require('../assets/images/Genel.png'),
    'Karadeniz': require('../assets/images/Karadeniz.png'),
    'Nasreddin': require('../assets/images/Nasreddin.png'),
    'Iran'     : require('../assets/images/Iran.png'),
    'Kayseri'  : require('../assets/images/Kayseri.png'),
    'Okul'     : require('../assets/images/Okul.png'),
    'Politik'  : require('../assets/images/Politik.png'),
    'Sarisin'  : require('../assets/images/Sarisin.png'),
    'Spor'     : require('../assets/images/Spor.png'),
    'Temel'    : require('../assets/images/Temel.png'),
};

class HomeContent extends Component {
    constructor(props)
    {
        super(props);
        this.state = {

            // isLoading  : true,
            dataSource2: [],
            showNavBar : true,
        };
        GLOBAL.db.transaction((tx) => {
            tx.executeSql('SELECT * FROM kategori', '', (tx, results) => {
                var len = results.rows.length;
                let messages = [];
                if (len > 0)
                {

                    for (let i = 0; i < len; i++)
                    {
                        var row = results.rows.item(i);
                        messages.push({id: row.id, name: row.name, baslik: row.baslik});
                    }
                    this.setState({dataSource2: messages});
                }
            });
        });

    }

    componentDidMount()
    {

    }

    renderItem(item)
    {
        return (
            <TouchableHighlight style={styles.touchArea2}
                                onPress={() => this.onClickListener('' + item.name, item.id)}>
                <View style={styles.iconPic}>
                    <Image source={Data['' + item.name]}
                           style={{height: 70, width: 70, top: 10}}></Image>
                    <Text numberOfLines={1}
                          style={{fontSize: GLOBAL.fontSize - 2, color: '#000000', marginTop: 8, fontWeight: 'bold'}}>
                        {item.baslik}
                    </Text>
                </View>
            </TouchableHighlight>
        );
    }

    onClickListener = (viewname, viewId) => {
        this.props.navigation.navigate('Kategori', {view_id: viewId, view_name: viewname});
    };

    render()
    {
        return (
            <View style={{flex: 1}}>
                <StatusBar barStyle="dark-content" hidden={true} backgroundColor="#00BCD4"/>
                <ImageBackground source={require('../assets/images/wallpaper.png')}
                                 style={{width: '100%', height: '100%'}}>
                    <View style={{bottom: 0, height: Dimensions.get('window').height - 20}}>
                        <Header style={{backgroundColor: '#ffc215'}}>
                            <Left>

                                <Icon style={{color: '#fff', fontSize: 40}} name='happy'/>

                            </Left>

                            <Body>
                                <Title style={{fontWeight: 'bold', fontSize: 20}}> FIKRACI</Title>
                            </Body>

                        </Header>

                        <ScrollView>

                            <FlatList
                                numColumns={3}
                                data={this.state.dataSource2}
                                renderItem={({item}) => this.renderItem(item)}
                            />

                        </ScrollView>
                        <View style={{bottom: 0, height: 70, zIndex: 9999999}}>
                            <BottomNavigationBar {...this.props}/>
                        </View>
                    </View>
                </ImageBackground>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex           : 1,
        width          : null,
        height         : null,
        backgroundColor: '#FFF',
    },

    col                      : {
        alignItems: 'center',

        backgroundColor: '#effbee', height: 100,
        flex           : 1,
        justifyContent : 'center',
        borderRadius   : 10,
        borderColor    : '#005699',
        borderWidth    : 2,
        marginLeft     : 2,
        opacity        : 0.6,

    },
    row                      : {
        paddingBottom: 3,
    },
    iconText                 : {},
    iconPic                  : {
        justifyContent: 'center',
        alignItems    : 'center',
        color         : '#999999',
    },
    buttonContainer          : {
        flexDirection : 'row',
        justifyContent: 'center',
        alignItems    : 'center',
    },
    homeScreenImage          : {
        width: '90%',
    },
    homeScreenBackGroundImage: {
        flex      : 1,
        resizeMode: 'cover',
    },
    touchArea                : {
        width          : Dimensions.get('window').width / 3.15,
        paddingTop     : 15,
        flex           : 1,
        resizeMode     : 'cover',
        backgroundColor: '#effbee',
        borderColor    : '#012cf9',
        borderWidth    : 2,
        borderRadius   : 10,
        margin         : 2,
    },
    touchArea2               : {
        alignItems: 'center',

        backgroundColor: '#ffed8b', height: 100,
        flex           : 1,
        borderRadius   : 10,
        borderColor    : '#ffae2c',
        borderWidth    : 3,
        marginLeft     : 2,
        opacity        : 0.8,
        margin         : 3,
    },
    touchArea3               : {
        width     : Dimensions.get('window').width / 3.15,
        paddingTop: 25,
        flex      : 1,
        resizeMode: 'cover',
    },
});

export default HomeContent;
