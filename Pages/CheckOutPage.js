import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Root, Toast, Container, Header, Title} from "native-base"
import Axios from 'axios';
import {
    Content,
    List, ListItem,
    Left, Body,
    Button,
    Footer, FooterTab, Badge
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Navigation} from 'react-native-navigation';
import Loader from './Loader';

class CheckOutPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loader:false,
            total:this.props.totalCart,
            totalPrice:""
        }

    }

    componentDidMount() {

        Axios.get("http://www.custom.azmisoft.com/api/total")
            .then((response)=>{
                this.setState({totalPrice:response.data})
            })
            .catch((error)=>{
                console.log(error);
            })

        this.getAllOrder();
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

    getAllOrder=()=>{
        this.setState({loader: true})
        Axios.get("http://www.custom.azmisoft.com/api/order")
            .then((response)=>{
                let myData = response.data;
                this.setState({data:myData, loader: false})
            })
            .catch((error)=>{
                console.log(error);
            })
    }


    goProfilePage=()=>{
        Navigation.push(this.props.componentId, {
            component:{
                name:"ProfilePage"
            }
        })
    }

    OpenMenu = () => {
        Navigation.mergeOptions(this.props.componentId, {
            sideMenu: {
                left: {
                    visible: true
                }
            }
        });

    };

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

    checkOut=()=>{
        this.toaster("Order Successfully Done");
    }

    goCheckOut=()=>{
        Navigation.push(this.props.componentId, {
            component:{
                name:"CheckOutPage",
                passProps: {
                    totalCart: this.state.total
                }
            }
        })
    }

    toaster=(msg)=>{
        Toast.show({
            text: msg,
            buttonText: "Okay",
            position: "bottom",
            duration: 4000
        })
    }



    render() {

        let allData = this.state.data;
        let listItem = allData.map((data)=>{
            return <ListItem key={data.id} Border>
                <Left>
                    <Text style={{fontSize:20}}>{data.title} :</Text>
                </Left>
                <Body>
                    <Text style={{fontSize:20}}>{data.price}*{data.quantity} = ${data.price * data.quantity}</Text>
                </Body>
            </ListItem>
        })

        if (this.state.loader){
            return <Loader/>
        }else{
            return (
                <Root>
                <Container style={{backgroundColor:"#FAF4EE"}}>
                    <Header style={{backgroundColor:"#B98068"}} androidStatusBarColor="#CF9775">
                        <Left>
                            <Button transparent onPress={this.OpenMenu}>
                                <Icon name='bars' style={{fontSize:20}} />
                            </Button>
                        </Left>
                        <Body>
                            <Title>CheckOut</Title>
                        </Body>
                    </Header>
                            <Content style={{marginLeft:30}}>
                                <List>
                                    {listItem}
                                </List>
                            </Content>

                    <View style={{flexDirection:"row", marginLeft:40, marginBottom:20}}>
                        <Text style={{fontSize:20}}>Total VAT:</Text>
                        <Text style={{fontSize:20, marginLeft:10}}>15%</Text>
                    </View>

                            <View style={{flexDirection:"row", marginLeft:40, marginBottom:30}}>
                                <Text style={{fontSize:20}}>Total Price:</Text>
                                <Text style={{fontSize:20, marginLeft:10}}>${this.state.totalPrice}</Text>
                            </View>


                    <TouchableOpacity style={styles.loginButton} onPress={this.checkOut}>
                        <Text style={{paddingTop:12,textAlign:"center", color:"white", fontSize:16, fontWeight:"bold"}}>CheckOut</Text>
                    </TouchableOpacity>

                            <Footer>
                                <FooterTab style={{backgroundColor:"white"}}>
                                    <Button badge vertical onPress={this.goMainPage}>
                                        <Icon name="home" style={{color:"#C28E79", fontSize:22, marginTop:2}} />
                                    </Button>
                                    <Button  badge vertical onPress={this.goCartPage}>
                                        <Badge style={{backgroundColor:"#707070"}}><Text style={{color:"white"}}>{this.state.total}</Text></Badge>
                                        <Icon active name="cart-plus" style={{color:"#C28E79", fontSize:22}} />
                                    </Button>
                                    <Button vertical onPress={this.goCheckOut}>
                                        <Icon active name="shopping-bag" style={{color:"#C28E79", fontSize:22}} />
                                    </Button>
                                    <Button vertical onPress={this.goProfilePage}>
                                        <Icon name="user-alt" style={{color:"#C28E79", fontSize:22}} />
                                    </Button>
                                </FooterTab>
                            </Footer>
                    </Container>
                </Root>
            );
        }
    }
}

const styles = StyleSheet.create({
    loginButton:{
        width:"80%",
        height:50,
        backgroundColor:"#B98068",
        borderRadius:50,
        marginBottom:20,
        left:30
    }
})

export default CheckOutPage;
