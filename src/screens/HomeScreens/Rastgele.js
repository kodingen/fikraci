import React, {Component} from 'react';
import {
    BackHandler, Dimensions, Modal,
    StyleSheet, View, TouchableOpacity, FlatList, ScrollView, Image, ImageBackground,
} from 'react-native';
import {
    Container, Header, Text, Content, Left, Button, Body,
    Title, Right, Card, CardItem, Icon,
} from 'native-base';
import GLOBAL from '../../global';
import BottomNavigationBar from '../../components/BottomNavigationBar';

export class Rastgele extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            dataSource2 : {},
            favoriIds   : '',
            liked       : false,
            toplam      : 0,
        };

        GLOBAL.db.transaction((tx) => {
            tx.executeSql('SELECT count(*) as toplam FROM icerik', '', (tx, results) => {

                var len = results.rows.length;
                var toplams = 0;
                if (len > 0)
                {
                    var row = results.rows.item(0);
                    toplams = row.toplam;
                    this.setState({toplam: toplams});
                }
                this.rastgele();
            });
        });

    }

    randomInt(min, max)
    {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    rastgele()
    {

        this.setState({dataSource2: []});
        var sayi = this.randomInt(0, this.state.toplam);
        GLOBAL.db.transaction((tx) => {
            tx.executeSql('SELECT * FROM icerik where id =' + sayi, '', (tx, results) => {
                var len = results.rows.length;
                let rastgeleF = [];
                if (len > 0)
                {

                    var row = results.rows.item(0);
                    rastgeleF = {id: row.id, icerik: row.icerik, baslik: row.baslik};
                    this.setState({dataSource2: rastgeleF});
                }
            });
        });
        this.isLiked()
    }

    setModalVisible(visible)
    {
        this.setState({modalVisible: visible});
    }

    componentDidMount()
    {

        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }

    componentWillUnmount()
    {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }

    handleBackPress = () => {
        this.props.navigation.navigate('Home');
        return true;
    };

    favori(id)
    {
        if (this.state.liked)
        {
            GLOBAL.db.transaction((tx) => {
                tx.executeSql('DELETE from favori where fikra_id=' + id, '', (tx, results) => {
                    console.warn('silindi');
                    this.setState({liked: false});
                });
            });
        }
        else
        {
            GLOBAL.db.transaction((tx) => {
                tx.executeSql('INSERT INTO favori (fikra_id) values(' + id + ')', '', (tx, results) => {
                    this.setState({liked: true});
                });
            });
        }
    };
    isLiked()
    {

        GLOBAL.db.transaction((tx) => {
            tx.executeSql('SELECT * FROM favori where fikra_id=' + this.state.dataSource2.id, '', (tx, results) => {
                var len = results.rows.length;
                if (len > 0)
                {
                    this.setState({liked: true});
                }
                else
                {
                    this.setState({liked: false});
                }

            });
        });
    }

    render()
    {
        return (
            <Container>
                <Header style={{backgroundColor:'#ffc215'}}>
                    <Left>
                        <Button
                            transparent
                            onPress={() => this.props.navigation.navigate('Home')}
                        >
                            <Icon style={{color: '#fff'}} name='arrow-back'/>
                        </Button>
                    </Left>
                    <Body style={{paddingLeft:65}}>
                        <Title style={{fontWeight: 'bold', fontSize: 20}}>RASTGELE</Title>
                    </Body>
                    <Right>
                        <Button
                            transparent
                            onPress={() => this.favori(this.state.dataSource2.id)}>
                            <Icon name="heart" family="font-awesome"
                                  style={{color: this.state.liked? '#ff508c' : '#fff',fontSize: 25}}
                                // color={this.state.liked? '#F00' : '#000'}
                                  size={30}/></Button>
                        <Button
                            transparent
                            onPress={() => this.rastgele()}
                        >
                            <Icon style={{color: '#fff',fontSize: 25}} name='refresh'/>
                        </Button>
                    </Right>
                </Header>

                <Container>
                    <ImageBackground source={require('../../assets/images/wallpaper.png')} style={{width: '100%', height: '100%'}}>
                    <ScrollView>
                        <Content>
                            <Card style={{flex: 0}}>
                                <CardItem style={{backgroundColor: 'rgba(255,213,28,0.76)'}}>
                                    <Left>
                                        <Body>
                                            <Text style={{
                                                fontSize  : 20,
                                                fontWeight: 'bold',
                                            }}>{this.state.dataSource2.baslik}</Text>
                                        </Body>
                                    </Left>
                                </CardItem>
                                <CardItem style={{backgroundColor: 'rgba(255,213,28,0.53)'}}>
                                    <Body>
                                        <Text>
                                            {this.state.dataSource2.icerik}
                                        </Text>
                                    </Body>
                                </CardItem>
                            </Card>

                        </Content>
                    </ScrollView>
                        <View style={{bottom: 0, height: 70, zIndex: 9999999}}>
                            <BottomNavigationBar {...this.props}/>
                        </View>
                </ImageBackground>
                </Container>

            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container     : {
        flex           : 1,
        width          : null,
        height         : null,
        backgroundColor: '#FFF',
    },
    col           : {
        backgroundColor: 'rgb(93,138,255)',
        height         : 60,
        flex           : 1,
        justifyContent : 'center',
        opacity        : 0.9,
    },
    row           : {
        paddingBottom: 3,
    },
    touchArea     : {
        width: Dimensions.get('window').width / 1.2,
    },
    iconText      : {
        fontSize     : 15,
        color        : '#fff0f0',
        flexDirection: 'row',
        fontWeight   : 'bold',
        width        : Dimensions.get('window').width * (4 / 5),
    },
    leftIcon      : {
        width: Dimensions.get('window').width * (0.7 / 5),
    },
    rightTitle    : {
        flex          : 1,
        justifyContent: 'center',
        alignItems    : 'center',
        width         : Dimensions.get('window').width * (4.3 / 5),
    }, modalHeader: {
        textAlign: 'center',
        alignSelf: 'center',
    },
});
