import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {Footer, FooterTab, Button, Badge, Text, Icon, Toast} from 'native-base';
import theme from './theme';
import Profilim from '../screens/HomeScreens/MyProfile';
import Iletisim from '../screens/HomeScreens/Iletisim';
import Home from '../screens/Home';

export default class BottomNavigationBar extends Component {
    constructor(props)
    {
        super(props);
    }

    componentDidMount(): void
    {

    }

    render()
    {
        return (
            <Footer style={{flex: 1}}>
                <FooterTab style={{backgroundColor: '#ffb51a'}}>
                    {/*<Button style={{borderWidth:0,borderRadius:5,borderColor:'#005699'}} onPress={() => {*/}
                    {/*    this.props.navigation.navigate("Home")*/}
                    {/*}}>*/}
                    {/*    /!*<Icon style={{color: theme.COLORS.ERROR, fontSize: 25}} name="home"/>*!/*/}
                    {/*    <Text style={{fontSize:15}}>Ana Sayfa</Text>*/}
                    {/*</Button>*/}



                    <Button style={{borderWidth: 0, borderRadius: 5}} onPress={() => {
                        this.props.navigation.navigate('Profilim');
                        // this.setState({loading: false})

                    }
                    }>
                        <Icon style={{color: '#fff', fontSize: 25}} type={"FontAwesome"} name= {"star"}/>
                        <Text style={{fontSize: 15,color:'#fff'}}>Profilim</Text>
                    </Button>
                    <Button style={{borderWidth: 0, borderRadius: 5}} onPress={() => {
                        this.props.navigation.navigate('Rastgele');
                        this.setState({loading: false});

                    }
                    }>
                        <Icon style={{color: '#fff', fontSize: 25}} type={"FontAwesome"} name= {"random"}/>
                        <Text style={{fontSize: 15,color:'#fff'}}>Rastgele</Text>
                    </Button>
                    <Button style={{borderWidth: 0, borderRadius: 5}} onPress={() => {
                        this.props.navigation.navigate('Iletisim');
                    }}>
                        <Icon style={{color: '#fff', fontSize: 25}} type={"FontAwesome"} name= {"send"}/>
                        <Text style={{fontSize: 15,color:'#fff'}}>Fıkram</Text>
                    </Button>
                </FooterTab>
            </Footer>
        );
    }

}
