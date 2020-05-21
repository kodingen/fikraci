import React, {Component} from 'react';
import {
    Dimensions,
    ImageBackground,
    StyleSheet,
    TouchableHighlight,
    View,
    Linking,
    TouchableOpacity,
} from 'react-native';
import {
    Container,
    Header,
    Title,
    Content,
    Button,
    Text,
    Left,
    Right,
    Body,
    Col,
    Row,
    CardItem,
    Card,
    Icon,
} from 'native-base';
import GLOBAL from '../../global';
import {NavigationActions, StackActions} from 'react-navigation';
import BottomNavigationBar from '../../components/BottomNavigationBar';

export class Iletisim extends Component {
    constructor(props)
    {
        super(props);
    }

    componentDidMount(): void
    {
    }

    render()
    {
        const {goBack} = this.props.navigation;
        return (

            <Container>

                <Header style={{backgroundColor:'#ffc215'}}>
                    <Left>
                        <Button
                            transparent
                            onPress={() => goBack()}
                        >
                            <Icon name="arrow-back"/>
                        </Button>
                    </Left>
                    <Body>
                        <Title> FIKRA GÖNDER </Title>
                    </Body>
                </Header>
                <ImageBackground source={require('../../assets/images/wallpaper.png')} style={{width: '100%', height: '100%'}}>
                <Content>
                    <Card>
                        <TouchableOpacity >
                            <CardItem style={styles.col}>
                                <Left>
                                    <Icon style={{color: '#000000'}} name="ios-mail" size={50}/>

                                    <Text style={{color: '#000000'}} numberOfLines={3}>
                                        fikraci@karson.com.tr </Text>
                                </Left>
                            </CardItem>
                        </TouchableOpacity>
                    </Card>
                    <Card>
                        <TouchableOpacity >
                            <CardItem style={styles.col}>
                                <Left>
                                    <Icon style={{color: '#000000'}} active name="md-call" size={50}/>

                                    <Text style={{color: '#000000'}} numberOfLines={3}>
                                        08503049029
                                    </Text>
                                </Left>
                            </CardItem>
                        </TouchableOpacity>
                    </Card>
                    <Card>
                        <CardItem style={{backgroundColor: 'rgba(255,213,28,0.76)'}}>
                            <Body>
                                <Text style={{fontWeight:'bold',fontSize:18,color:'#000000'}}>SİZİNDE FIKRALARINIZ YAYINLANSIN</Text>
                                <Text></Text>
                                <Text style={{color: '#000000'}}>
                                    EKLEMEK İSTEDİĞİNİZ FIKRALARINIZI BELİRTİLEN E-MAİL ADRESİNE VEYA BELİRTİLEN NUMARAYA SMS YOLUYLA ULAŞTIRABİLİRSİNİZ.
                                </Text>
                            </Body>
                        </CardItem>
                    </Card>
                </Content>
                <View style={{bottom: 0, height: 70,  marginBottom:50, zIndex: 9999999}}>
                    <BottomNavigationBar {...this.props}/>
                </View>
                </ImageBackground>
            </Container>
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
    col      : {
        alignItems     : 'center',
        backgroundColor: 'rgba(255,213,28,0.76)', height: 60,
        flex           : 1,
        justifyContent : 'center',
        borderColor    : '#ffffff',
        borderWidth    : 0,
        // borderRadius: 20,
        marginLeft     : 0,
        marginRight    : 0,
        opacity        : 0.9,
    },
    row      : {
        paddingBottom: 3,
    },

    touchArea : {
        width: Dimensions.get('window').width / 1.2,
    },
    iconText  : {
        fontSize     : 15,
        color        : '#ffffff',
        flexDirection: 'row',
        fontWeight   : 'bold',
        width        : Dimensions.get('window').width * (4 / 5),
    },
    leftIcon  : {
        width: Dimensions.get('window').width * (0.7 / 5),
    },
    rightTitle: {
        flex          : 1,
        justifyContent: 'center',
        alignItems    : 'center',
        width         : Dimensions.get('window').width * (4.3 / 5),
    },
    iconStyle : {
        // color: "#ffc51f",
        color        : '#ffffff',
        flexDirection: 'row',
        top          : '-30%',
        width        : 35,
        height       : 35,
        left         : -8,
    },
});

