import React, {Component} from 'react';
import {Text,Image, AsyncStorage} from 'react-native';
import {
    Root, Content,
    List, ListItem, Container,
    Left, Button, Body, Toast,
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Navigation} from 'react-native-navigation';


class SidePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loader:false
        }
    }

    goMainPage=()=>{
        Navigation.push('side_menu', {
            component: {
                name: 'MainPage',
                options: {
                    sideMenu: {
                        left: {
                            visible: false,
                        },
                    },
                },
            },
        });
    }

    goLoginPage=()=>{
        Navigation.push('side_menu', {
            component: {
                name: 'LoginPage',
                options: {
                    sideMenu: {
                        left: {
                            visible: false,
                        },
                    },
                },
            },
        });
    }

    goRegisterPage=()=>{
        Navigation.push('side_menu', {
            component: {
                name: 'RegisterPage',
                options: {
                    sideMenu: {
                        left: {
                            visible: false,
                        },
                    },
                },
            },
        });
    }

    goForgotPage=()=>{
        Navigation.push('side_menu', {
            component: {
                name: 'ForgotPage',
                options: {
                    sideMenu: {
                        left: {
                            visible: false,
                        },
                    },
                },
            },
        });
    }

    goProfilePage(){
        Navigation.push('side_menu', {
            component: {
                name: 'ProfilePage',
                options: {
                    sideMenu: {
                        left: {
                            visible: false,
                        },
                    },
                },
            },
        });
    }

    goCartPage=()=>{
        Navigation.push('side_menu', {
            component: {
                name: 'CartPage',
                options: {
                    sideMenu: {
                        left: {
                            visible: false,
                        },
                    },
                },
            },
        });
    }

    goCheckOut=()=>{
        Navigation.push('side_menu', {
            component:{
                name:"CheckOutPage",
                options: {
                    sideMenu: {
                        left: {
                            visible: false,
                        },
                    },
                },
            }
        })
    }

    logOut = async ()=>{
        await AsyncStorage.removeItem("myToken");
        this.toastMsg("You Are SuccessFully LogOut");
    }

    toastMsg=(msg)=>{
        Toast.show({
            buttonText:"Cancel",
            text:msg,
            position:"bottom",
            textStyle:{color:"white"},
            duration:5000
        })
    }


    render() {
            return (
                <Root>
                    <Container style={{ backgroundColor:"#FAF4EE"}}>
                            <Content>
                                <List>
                                    <ListItem thumbnail noBorder>
                                        <Body>
                                            <Image
                                                source={require("../assets/images/logo.png")}
                                                style={{left:60}}
                                            >
                                            </Image>
                                        </Body>
                                    </ListItem>

                                    <ListItem Border>
                                        <Left>
                                            <Button transparent onPress={this.goMainPage}>
                                                <Icon name="home" style={{color:"#C28E79", fontSize:20, marginRight:7}} />
                                                <Text style={{fontSize:15, borderBottomColor:"#FAF4EE"}}>Home</Text>
                                            </Button>
                                        </Left>
                                    </ListItem>
                                    <ListItem Border>
                                        <Left>
                                            <Button transparent onPress={this.goCartPage}>
                                                <Icon active name="cart-plus" style={{color:"#C28E79", fontSize:20, marginRight:7}} />
                                                <Text style={{fontSize:15, borderBottomColor:"#FAF4EE"}}>Cart</Text>
                                            </Button>
                                        </Left>
                                    </ListItem>
                                    <ListItem Border>
                                        <Left>
                                            <Button transparent onPress={this.goCheckOut}>
                                                <Icon active name="shopping-bag" style={{color:"#C28E79", fontSize:20, marginRight:7}} />
                                                <Text style={{fontSize:15, borderBottomColor:"#FAF4EE"}}>CheckOut</Text>
                                            </Button>
                                        </Left>
                                    </ListItem>

                                    <ListItem  Border>
                                        <Left>
                                            <Button transparent onPress={this.goProfilePage}>
                                                <Icon name="user-alt" style={{color:"#C28E79", fontSize:20, marginRight:7}} />
                                                <Text style={{fontSize:15, borderBottomColor:"#FAF4EE"}}>Profile</Text>
                                            </Button>
                                        </Left>
                                    </ListItem>
                                    <ListItem Border>
                                        <Left>
                                            <Button transparent onPress={this.goLoginPage}>
                                                <Icon name="sign-in-alt" style={{color:"#C28E79", fontSize:20, marginRight:7}} />
                                                <Text style={{fontSize:15, borderBottomColor:"#FAF4EE"}}>Login</Text>
                                            </Button>
                                        </Left>
                                    </ListItem>
                                    <ListItem Border>
                                        <Left>
                                            <Button transparent onPress={this.goRegisterPage}>
                                                <Icon name="user-plus" style={{color:"#C28E79", fontSize:20, marginRight:7}} />
                                                <Text style={{fontSize:15, borderBottomColor:"#FAF4EE"}}>Register</Text>
                                            </Button>
                                        </Left>
                                    </ListItem>
                                    <ListItem Border>
                                        <Left>
                                            <Button transparent onPress={this.goForgotPage}>
                                                <Icon name="unlock" style={{color:"#C28E79", fontSize:20, marginRight:7}} />
                                                <Text style={{fontSize:15, borderBottomColor:"#FAF4EE"}}>Forget Password</Text>
                                            </Button>
                                        </Left>
                                    </ListItem>
                                    <ListItem Border>
                                        <Left>
                                            <Button transparent onPress={this.logOut}>
                                                <Icon name="power-off" style={{color:"#C28E79", fontSize:20, marginRight:7}} />
                                                <Text style={{fontSize:15, borderBottomColor:"#FAF4EE"}}>LogOut</Text>
                                            </Button>
                                        </Left>
                                    </ListItem>
                                </List>
                            </Content>
                    </Container>
                </Root>
            );
    }
}

export default SidePage;
