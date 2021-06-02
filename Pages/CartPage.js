import React, {Component} from 'react';
import {Text,Image} from "react-native";
import {Root, Toast, Container, Header, Title} from 'native-base';
import Axios from 'axios';
import {
    Content,
    List, ListItem,
    Left, Body, Right,
     Button,
    Footer, FooterTab, Badge
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Navigation} from 'react-native-navigation';
import Loader from './Loader';

class CartPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loader:false,
            total:this.props.totalCart
        }

    }

    componentDidMount() {
        this.totalCount();
        this.getAllOrder();
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

    goHomePage=()=>{
        Navigation.push(this.props.componentId, {
            component:{
                name:"HomePage"
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

    OpenMenu = () => {
        Navigation.mergeOptions(this.props.componentId, {
            sideMenu: {
                left: {
                    visible: true
                }
            }
        });

    };

    deleteItems=(id)=>{
        let product_id = id;
        this.setState({loader:true})
        Axios.get("http://www.custom.azmisoft.com/api/delete/"+product_id)
            .then((response)=>{
                if (response.data === 1){
                    this.setState({loader:false})
                    this.totalCount()
                    this.getAllOrder()
                }
            })
            .catch((error)=>{
                this.toaster("Failed to Delete Items!");
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

    goProfilePage=()=>{
        Navigation.push(this.props.componentId, {
            component:{
                name:"ProfilePage"
            }
        })
    }

    toaster=(msg)=>{
        Toast.show({
            text: msg,
            buttonText: "Okay",
            position: "top",
            duration: 4000
        })
    }



    render() {

        let allData = this.state.data;
        let listItem = allData.map((data)=>{
            return <ListItem thumbnail noBorder key={data.id} style={{marginBottom:10}}>
                <Left>
                    <Button transparent>
                        <Image
                            source={{uri: data.image}}
                            style={{width:60, height:50}}
                        >

                        </Image>
                    </Button>
                </Left>
                <Body>
                    <Button transparent>
                        <Text style={{fontSize:20,borderBottomColor:"#FAF4EE"}}>{data.title}</Text>
                    </Button>
                </Body>
                <Right>
                    <Button transparent onPress={this.deleteItems.bind(this, data.id)}>
                        <Icon name="times-circle" style={{color:"#C28E79", fontSize:30}} />
                    </Button>
                </Right>
            </ListItem>

        })

        if (this.state.loader){
            return <Loader/>
        }else{
            return (
                <Root>
                    <Container style={{ backgroundColor:"#FAF4EE"}}>
                        <Header style={{backgroundColor:"#B98068"}} androidStatusBarColor="#CF9775">
                            <Left>
                                <Button transparent onPress={this.OpenMenu}>
                                    <Icon name='bars' style={{fontSize:20}} />
                                </Button>
                            </Left>
                            <Body>
                                <Title>Cart</Title>
                            </Body>
                        </Header>

                            <Content>
                                <List>
                                    {listItem}
                                </List>
                            </Content>
                            <Footer>
                                <FooterTab style={{backgroundColor:"white"}}>
                                    <Button badge vertical onPress={this.goMainPage}>
                                        <Icon name="home" style={{color:"#C28E79", fontSize:22, marginTop:2}} />
                                    </Button>
                                    <Button  badge vertical onPress={this.goCartPage}>
                                        <Badge style={{backgroundColor:"#707070"}}><Text style={{color:"white"}}>{this.state.total}</Text></Badge>
                                        <Icon active name="cart-plus" style={{color:"#C28E79", fontSize:20}} />
                                    </Button>
                                    <Button vertical onPress={this.goCheckOut}>
                                        <Icon active name="shopping-bag" style={{color:"#C28E79", fontSize:20}} />
                                    </Button>
                                    <Button vertical onPress={this.goProfilePage}>
                                        <Icon name="user-alt" style={{color:"#C28E79", fontSize:20}} />
                                    </Button>
                                </FooterTab>
                            </Footer>
                    </Container>
                </Root>
            );
        }
    }
}

export default CartPage;
