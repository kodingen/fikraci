import React, {Component} from 'react';
import {
    BackHandler, Dimensions, Modal,
    StyleSheet, View, TouchableOpacity, FlatList, Image, ImageBackground,
} from 'react-native';
import {
    Container, Header, Text, Content, Left, Button, Body,
    Title, Right, Card, CardItem, Icon,
} from 'native-base';
import GLOBAL from '../../global';
import {SCLAlert, SCLAlertButton} from 'react-native-scl-alert';
import BottomNavigationBar from '../../components/BottomNavigationBar';

export class MyProfile extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            modalVisible: false,
            modalContent: {},
            dataSource2 : [],
            count       : 10,
            favoriIds   : '',
            liked       : false,
            index       : 0,
            show        : false,
            deleteId    : '',
        };
        this.favorids()
    }

    favorids()
    {
        GLOBAL.db.transaction((tx) => {
            tx.executeSql('SELECT * FROM favori order by id desc', '', (tx, results) => {
                var len = results.rows.length;
                let favories = '';
                if (len > 0)
                {

                    for (let i = 0; i < len; i++)
                    {
                        var row = results.rows.item(i);
                        if (i <= 0)
                        {
                            favories = row.fikra_id;
                        }
                        else
                        {
                            favories = favories + ',' + row.fikra_id;
                        }
                    }
                    this.setState({favoriIds: favories});
                }
            });
        });
        this.favorilerim();
    }

    favorilerim()
    {
        GLOBAL.db.transaction((tx) => {
            tx.executeSql('SELECT * FROM icerik where  id in (' + this.state.favoriIds + ') order by id desc LIMIT 10', '', (tx, results) => {
                var len = results.rows.length;
                let favoriler = [];
                if (len > 0)
                {
                    this.setState({dataSource2: []});

                    for (let i = 0; i < len; i++)
                    {
                        var row = results.rows.item(i);
                        favoriler.push({id: row.id, icerik: row.icerik, baslik: row.baslik});
                    }
                    this.setState({dataSource2: favoriler});
                }
            });
        });
    }

    loadMoreData = () => {

        const limit = this.state.count;
        this.state.count = this.state.count + 10;
        GLOBAL.db.transaction((tx) => {
            tx.executeSql('SELECT * FROM icerik where id in (' + this.state.favoriIds + ') order by id desc LIMIT ' + limit + ',' + this.state.count, '', (tx, results) => {
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
                        dataSource2: [...this.state.dataSource2, ...messages],
                    });
                }
            });
        });

    };

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
        GLOBAL.db.transaction((tx) => {
            tx.executeSql('DELETE from favori where fikra_id=' + id, '', (tx, results) => {
                this.setState({liked: false});
            });
        });
        this.setState({modalVisible: false, show: false});
        this.favorids();

    };

    render()
    {
        return (
            <Container>
                <SCLAlert style={{backgroundColor:'#b58500'}}
                    theme="warning" //default,inverse,success, info, danger, warning
                    headerContainerStyles={{backgroundColor: '#FF3D00'}}
                    show={this.state.show}
                    title="Bilgi"
                    subtitle="Beğendiklerimden Çıkarmak İstediğinize Emin Misiniz?"
                    onRequestClose={() => {
                        this.setState({show: false});
                    }}>
                    <SCLAlertButton theme="inverse"
                                    onPress={() => {
                                        this.favori(this.state.deleteId);
                                    }}>Sil</SCLAlertButton>
                    <SCLAlertButton theme="inverse"
                                    onPress={() => {
                                        this.setState({show: false});
                                    }}>İptal</SCLAlertButton>
                </SCLAlert>
                <Header style={{backgroundColor:'#ffc215'}}>
                    <Left>
                        <Button
                            transparent
                            onPress={() => this.props.navigation.navigate('Home')}
                        >
                            <Icon style={{color: '#fff'}} name='arrow-back'/>
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{fontWeight: 'bold', fontSize: 20}}>BEĞENDİKLERİM</Title>
                    </Body>
                </Header>
                <Container>
                    <ImageBackground source={require('../../assets/images/wallpaper.png')} style={{width: '100%', height: '100%'}}>
                    <FlatList
                        style={{width: '100%'}}
                        keyExtractor={(item, index) => index}
                        data={this.state.dataSource2}
                        renderItem={({item, index}) => (
                            <Card>
                                <TouchableOpacity
                                    onLongPress={() => {
                                        this.setState({show: true, deleteId: item.id});
                                    }}
                                    onPress={() => {
                                        this.setState({
                                            modalVisible: true,
                                            modalContent: item,
                                        });
                                    }}>
                                    <CardItem style={styles.col}>
                                        <Left>
                                            <Icon style={{color: '#ffb10e', fontSize: 25}} type={"FontAwesome"} name= {"star"}/>
                                            <Text style={{color: '#000000', fontWeight: 'bold',}} numberOfLines={3}>
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
                            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                                {/*<Left>*/}

                                {/*</Left>*/}

                                <Left>
                                    <Button
                                        transparent
                                        onPress={() => this.props.navigation.navigate('Home')}
                                    >
                                        <Icon style={{color: '#fff'}} name='home'/>
                                    </Button>
                                </Left>
                                <Body>
                                <Title
                                    style={{textAlign: 'center'}}> BEĞENDİKLERİM</Title></Body>

                                <Right>
                                    <Button
                                        transparent
                                        onPress={() => this.setState({
                                            show    : true,
                                            deleteId: this.state.modalContent.id,
                                        })}>
                                        <Icon name="trash" family="font-awesome"
                                              style={{color: '#fff', fontSize: 30}}
                                              size={30}/></Button>
                                    <Button
                                        transparent
                                        onPress={() => this.setModalVisible(!this.state.modalVisible)}>
                                        <Icon style={{fontSize: 40}} name="ios-close"/>
                                    </Button>
                                </Right>
                            </View>
                        </Header>
                        <ImageBackground source={require('../../assets/images/wallpaper.png')} style={{width: '100%', height: '100%'}}>
                        <Content>
                            <Card style={{flex: 0}}>
                                <CardItem style={{backgroundColor: 'rgba(255,213,28,0.76)'}}>
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
                                        <Text>
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

const styles = StyleSheet.create({
    container     : {
        flex           : 1,
        width          : null,
        height         : null,
        backgroundColor: '#FFF',
    },
    col           : {
        backgroundColor: '#ffed8b',
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
        backgroundColor:'#ffc215'
    },
});
