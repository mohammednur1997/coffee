import React, {Component} from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import {Badge, Button, Footer, FooterTab, Icon} from 'native-base';
import {Navigation} from 'react-native-navigation';
import Axios from 'axios';


class HomePage extends Component {

        constructor() {
            super();
            this.state = {
                total:""
            }

        }
    componentDidMount() {
       this.totalCount();
    }

    totalCount =()=>{
        Axios.get("http://www.custom.azmisoft.com/api/order")
            .then((response)=>{
                let myData = response.data;
                let count = myData.length;
                this.setState({total:count})
            })
            .catch((error)=>{
                console.log(error);
            })
    }

    goHomePage=()=>{
        Navigation.push(this.props.componentId, {
            component:{
                name:"HomePage",
                passProps: {
                    totalCart: this.state.total
                }
            }
        })
    }

    goMainPage=()=>{
        Navigation.push(this.props.componentId, {
            component:{
                name:"MainPage",
                passProps: {
                    totalCart: this.state.total
                }
            }
        })
    }

    goCartPage=()=>{
        Navigation.push(this.props.componentId, {
            component:{
                name:"CartPage",
                passProps: {
                    totalCart: this.state.total
                }
            }
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Image
                        source={require("../assets/images/bg.png")}
                        style={{position:"absolute", height:700}}
                    >

                    </Image>

                    <Image
                        source={require("../assets/images/logo.png")}
                        style={{top:200, left:130}}
                    >

                    </Image>
                      </View>

                <View style={{height:100, bottom:-440}}>
                    <Footer>
                        <FooterTab style={{backgroundColor:"white"}}>
                            <Button badge vertical onPress={this.goHomePage}>
                                <Icon name="home" style={{color:"#C28E79", fontSize:25, marginTop:1}} />
                            </Button>
                            <Button vertical onPress={this.goMainPage}>
                                <Icon name="cafe" style={{color:"#C28E79", fontSize:30}} />
                            </Button>
                            <Button  badge vertical onPress={this.goCartPage}>
                                <Badge style={{backgroundColor:"#707070"}}><Text style={{color:"white"}}>{this.state.total}</Text></Badge>
                                <Icon active name="cart" style={{color:"#C28E79", fontSize:30}} />
                            </Button>
                            <Button vertical onPress={this.profile}>
                                <Icon name="person" style={{color:"#C28E79", fontSize:25}} />
                            </Button>
                        </FooterTab>
                    </Footer>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1
    }
})

export default HomePage;
