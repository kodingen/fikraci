import React, {Component} from 'react';
import {
    BackHandler, Dimensions, Modal,  ImageBackground,
    StyleSheet, View, TouchableOpacity, FlatList,
} from 'react-native';
import {
    Container, Header, Text, Content, Left, Button, Body,
    Title, Right, Card, CardItem, Icon, Input, Item, Spinner,
} from 'native-base';
import GLOBAL from '../../global';
import BottomNavigationBar from '../../components/BottomNavigationBar';

export class Kategori extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            modalVisible: false,
            modalContent: {},
            dataSource2 : [],
            baslik      : '',
            itemId      : '',
            count       : 10,
            liked       : false,
            search      : '',
            searched    : false,
            loading     : true,
        };

        this.Ara();

    }

    Ara()
    {
        const {navigation} = this.props;
        this.state.itemId = navigation.getParam('view_id');
        this.state.baslik = navigation.getParam('view_name');
        GLOBAL.db.transaction((tx) => {
            tx.executeSql('SELECT * FROM icerik where kategori_id=\'' + this.state.itemId + '\' order by okundu LIMIT 10', '', (tx, results) => {
                var len = results.rows.length;
                let messages = [];
                if (len > 0)
                {

                    for (let i = 0; i < len; i++)
                    {
                        // exists owner name John
                        var row = results.rows.item(i);
                        messages.push({id: row.id, icerik: row.icerik, baslik: row.baslik});
                    }
                    this.setState({dataSource2: messages, loading: false});
                }
            });
        });
    }

    isLiked(id)
    {

        GLOBAL.db.transaction((tx) => {
            tx.executeSql('SELECT * FROM favori where fikra_id=' + id, '', (tx, results) => {
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

    loadMoreData = () => {
        if (!this.state.searched)
        {
            this.setState({loading: true});
            const limit = this.state.count;
            this.state.count = this.state.count + 10;
            GLOBAL.db.transaction((tx) => {
                tx.executeSql('SELECT * FROM icerik where kategori_id=\'' + this.state.itemId + '\' order by okundu LIMIT ' + limit + ',' + this.state.count, '', (tx, results) => {
                    var len = results.rows.length;
                    let messages = [];
                    if (len > 0)
                    {

                        for (let i = 0; i < len; i++)
                        {
                            var row = results.rows.item(i);
                            messages.push({id: row.id, icerik: row.icerik, baslik: row.baslik});
                        }
                        this.setState({
                            dataSource2: [...this.state.dataSource2, ...messages], loading: false,
                        });
                    }
                });
            });
        }

    };

    setModalVisible(visible)
    {
        this.setState({modalVisible: visible, reads: false, liked: false});
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

    read(id)
    {
        GLOBAL.db.transaction((tx) => {
            tx.executeSql('UPDATE icerik set okundu = 1 where id=' + id, '', (tx, results) => {
                this.setState({reads: true});
            });
        });

    }

    favori(id)
    {
        if (this.state.liked)
        {
            GLOBAL.db.transaction((tx) => {
                tx.executeSql('DELETE from favori where fikra_id=' + id, '', (tx, results) => {
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

    FikraAra()
    {
        GLOBAL.db.transaction((tx) => {
            tx.executeSql('SELECT * FROM icerik where kategori_id=' + this.state.itemId + ' and baslik like \'%' + this.state.search + '%\'', '', (tx, results) => {
                var len = results.rows.length;
                let messages = [];
                if (len > 0)
                {

                    for (let i = 0; i < len; i++)
                    {
                        // exists owner name John
                        var row = results.rows.item(i);
                        messages.push({id: row.id, icerik: row.icerik, baslik: row.baslik});
                    }
                    this.setState({
                        dataSource2: messages,
                    });
                }
            });
        });
        this.setState({searched: true});
    }

    updateSearch = (value) => {
        this.setState({search: value, dataSource2: []});
        GLOBAL.db.transaction((tx) => {
            tx.executeSql('SELECT * FROM icerik where kategori_id=' + this.state.itemId + ' and baslik like \'%' + value + '%\'', '', (tx, results) => {
                var len = results.rows.length;
                let messages = [];
                if (len > 0)
                {

                    for (let i = 0; i < len; i++)
                    {
                        // exists owner name John
                        var row = results.rows.item(i);
                        messages.push({id: row.id, icerik: row.icerik, baslik: row.baslik});
                    }
                    // this.state.dataSource2.push(messages)

                    this.setState({
                        dataSource2: messages,
                    });
                }
            });
        });

    };

    exitSearch()
    {
        this.setState({searched: false, dataSource2: [], search: ''});
        this.Ara();
    }

    render()
    {
        if (this.state.loading)
        {
            return (<View style={styles.container}>
                <Spinner color='red'/>
            </View>);
        }
        else
        {

            return (
                <Container>
                    <Header style={{backgroundColor:'#ffd51c'}}>
                        <Left>
                            <Button
                                transparent
                                onPress={() => this.props.navigation.navigate('Home')}
                            >
                                <Icon style={{color: '#fff'}} name='arrow-back'/>
                            </Button>
                        </Left>
                        <Body>
                            <Title style={{fontWeight: 'bold', fontSize: 20}}>Kategori : {this.state.baslik} Fıkraları</Title>
                        </Body>
                    </Header>

                    <Item>
                        <Icon name="ios-search"/>
                        <Input placeholder="Fıkralarda ara ..." value={this.state.search}
                               onChangeText={text => this.updateSearch(text)}/>
                        <TouchableOpacity onPress={() => {
                            this.exitSearch();
                        }}>
                            <Icon name="ios-close"/>

                        </TouchableOpacity>
                        {/*<Button transparent onPress={this.FikraAra()}>*/}
                        {/*    <Text>Ara</Text>*/}
                        {/*</Button>*/}
                    </Item>
                    <Container>
                        <ImageBackground source={require('../../assets/images/wallpaper.png')} style={{width: '100%', height: '100%'}}>
                        <FlatList
                            style={{width: '100%'}}
                            keyExtractor={(item, index) => index}
                            data={this.state.dataSource2}
                            renderItem={({item, index}) => (
                                <Card>
                                    <TouchableOpacity onPress={() => {
                                        this.setState({
                                            modalVisible: true,
                                            modalContent: item,
                                        });
                                        this.isLiked(item.id);
                                        this.read(item.id);

                                    }}>
                                        <CardItem style={styles.col}>
                                            <Left>
                                                <Icon style={{color: '#000', fontSize: 25}} type={"FontAwesome"} name= {"arrow-right"}/>
                                                <Text style={{color: '#000000', fontWeight: 'bold'}} numberOfLines={3}>
                                                    {item.baslik}
                                                </Text>
                                            </Left>
                                        </CardItem>
                                    </TouchableOpacity>
                                </Card>
                            )}
                            onEndReached={this.loadMoreData}
                            onEndReachedThreshold={0.1}
                            showsVerticalScrollIndicator={false}
                        />
                            <View style={{bottom: 0, height: 70, zIndex: 9999999}}>
                                <BottomNavigationBar {...this.props}/>
                            </View>
                        </ImageBackground>
                    </Container>

                    <Modal
                        animationType="slide"
                        transparent={false}
                        visible={this.state.modalVisible}>
                        <Container>
                            <Header style={styles.modalHeader}>
                                <Left>
                                    <Button
                                        transparent
                                        onPress={() => this.props.navigation.navigate('Home')}
                                    >
                                        <Icon style={{color: '#fff'}} name='home'/>
                                    </Button>
                                </Left>
                                <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                                    <Left>
                                        {/*<Button*/}
                                        {/*    transparent*/}
                                        {/*    onPress={() => this.read(this.state.modalContent.id)}>*/}
                                        {/*    <Icon name="star" family="font-awesome"*/}
                                        {/*          style={{color: this.state.reads? '#F00' : '#fff', fontSize: 25}}/>*/}
                                        {/*</Button>*/}
                                    </Left>


                                    <Title
                                        style={{textAlign: 'center', paddingLeft: 0}}> FIKRAMANIA </Title>
                                    <Right>
                                        <Button
                                            transparent
                                            onPress={() => this.favori(this.state.modalContent.id)}>
                                            <Icon name="heart" family="font-awesome"
                                                  style={{color: this.state.liked? '#ff508c' : '#fff', fontSize: 25}}
                                                // color={this.state.liked? '#F00' : '#000'}
                                                  size={30}/></Button>
                                        <Button
                                            transparent
                                            onPress={() => this.setModalVisible(!this.state.modalVisible)}>
                                            <Icon style={{fontSize: 40}} size={40} name="ios-close"/>
                                        </Button>
                                    </Right>
                                </View>
                            </Header>
                            <ImageBackground source={require('../../assets/images/wallpaper.png')} style={{width: '100%', height: '100%'}}>
                            <Content
                                style={{borderRadius: 0, borderWidth: 0, borderColor: '#f05',}}>



                               <Card style={{flex: 0}}>


                                    <CardItem  style={{backgroundColor: 'rgba(255,213,28,0.76)'}}>
                                        <Left>
                                            <Body>
                                                <Text style={{
                                                    fontSize  : 20,
                                                    fontWeight: 'bold',
                                                }}>{this.state.modalContent.baslik}</Text>
                                            </Body>
                                        </Left>
                                    </CardItem>
                                    <CardItem style={{backgroundColor: 'rgba(255,213,28,0.53)'}}>
                                        <Body>
                                            <Text style={{color: '#000000',}}>
                                                {this.state.modalContent.icerik}
                                            </Text>
                                        </Body>
                                    </CardItem>

                                </Card>

                            </Content>
                                <View style={{bottom: 0, height: 70, marginBottom:50, zIndex: 9999999}}>
                                    <BottomNavigationBar {...this.props}/>
                                </View>
                    </ImageBackground>
                        </Container>
                    </Modal>
                </Container>
            );
        }
    }
}

const styles = StyleSheet.create({
    container     : {
        flex           : 1,
        width          : null,
        height         : null,
        backgroundColor: 'rgba(255,255,255,0.03)',
    },
    col           : {
        backgroundColor: '#ffed8b',
        height         : 60,
        flex           : 1,
        justifyContent : 'center',

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
        backgroundColor:'#ffd51c',
    },
    spinner       : {
        marginBottom: 50,
    },
});
