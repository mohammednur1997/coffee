import React, {Component} from 'react';
import {Text, Image} from "react-native";
import {Root, Toast, Container, Header} from "native-base"
import Axios from 'axios';
import {
    Content,
    List, ListItem,
    Left, Body, Right,
    Button,Item, Input,
    Footer, FooterTab, Badge
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Navigation} from 'react-native-navigation';
import Loader from "../Pages/Loader";

class MainPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data:[],
            total:"",
            loading:false,
            searchData:""
        }
    }

    componentDidMount() {
        this.getAllData();
        this.totalCount();
    }


    getAllData=()=>{
        this.setState({loader:true})
        Axios.get("http://www.custom.azmisoft.com/api/allData")
            .then((response)=>{
                let myData = response.data;
                this.setState({data:myData, loader:false})
            })
            .catch((error)=>{
                console.log(error);
            })
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

    search=()=>{
        let search = this.state.searchData;
        const myData = {
            search: search
        }
        let config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        this.setState({loader:true})
        Axios.post("http://www.custom.azmisoft.com/api/search", myData, config)
            .then((response)=>{
                let myData = response.data;
                this.setState({data:myData, loader:false})
            })
            .catch((error)=>{
                console.log(error);
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

    goProfilePage=()=>{
        Navigation.push(this.props.componentId, {
            component:{
                name:"ProfilePage"
            }
        })
    }

    goOrderPage=(id)=>{
        Navigation.push(this.props.componentId, {
            component:{
                name:"OrderPage",
                passProps:{
                    productId:id
                }
            }
        })
    }

    goCheckOut=()=>{
        Navigation.push(this.props.componentId, {
            component:{
                name:"CheckOutPage",
                passProps:{
                    totalCart: this.state.total

                }
            }
        })
    }

    goHomePage=()=>{
        Navigation.push(this.props.componentId, {
            component:{
                name:"HomePage"
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
                    <Button transparent onPress={this.goOrderPage.bind(this, data.id)}>
                        <Image
                            source={{uri: data.image}}
                            style={{width:60, height:50}}
                        >

                        </Image>
                    </Button>
                </Left>
                <Body>
                    <Button transparent onPress={this.goOrderPage.bind(this, data.id)}>
                    <Text style={{fontSize:20,borderBottomColor:"#FAF4EE"}}>{data.title}</Text>
                    </Button>
                </Body>
                <Right>
                    <Button transparent onPress={this.goOrderPage.bind(this, data.id)}>
                        <Image
                            source={require("../assets/images/back.png")}
                        >
                        </Image>
                    </Button>
                </Right>
            </ListItem>

        })

        if (this.state.loader){
            return <Loader/>
        }else {
            return (
                <Root>
                    <Container style={{backgroundColor: "#FAF4EE"}}>
                        <Header style={{backgroundColor: "#FAF4EE"}}  androidStatusBarColor="#B98068">
                            <Left>
                                <Button transparent onPress={this.OpenMenu}>
                                    <Image
                                        source={require("../assets/images/menu.png")}
                                    >
                                    </Image>
                                </Button>
                            </Left>
                            <Body>
                                <Item style={{borderBottomColor: "#FAF4EE"}}>
                                    <Input placeholder="Search" onChangeText={search=>{this.setState({searchData:search})}}/>
                                    <Button transparent onPress={this.search}>
                                        <Image
                                            source={require("../assets/images/search.png")}
                                        >
                                        </Image>
                                    </Button>
                                </Item>
                            </Body>
                        </Header>

                        <Text style={{fontSize: 36,marginTop: 15, marginLeft: 10}}>It's
                            Great <Text style={{color: '#B98875'}}>Day for
                                Coffee.</Text></Text>

                        <Content>
                            <List>
                                {listItem}
                            </List>
                        </Content>

                        <Footer>
                            <FooterTab style={{backgroundColor: "white"}}>
                                <Button badge vertical onPress={this.goMainPage}>
                                    <Icon name="home" style={{color: "#C28E79", fontSize: 22, marginTop: 2}}/>
                                </Button>
                                <Button badge vertical onPress={this.goCartPage}>
                                    <Badge style={{backgroundColor: "#707070"}}><Text
                                        style={{color: "white"}}>{this.state.total}</Text></Badge>
                                    <Icon active name="cart-plus" style={{color: "#C28E79", fontSize: 22}}/>
                                </Button>
                                <Button vertical onPress={this.goCheckOut}>
                                    <Icon active name="shopping-bag" style={{color: "#C28E79", fontSize: 22}}/>
                                </Button>
                                <Button vertical onPress={this.goProfilePage}>
                                    <Icon name="user-alt" style={{color: "#C28E79", fontSize: 22}}/>
                                </Button>
                            </FooterTab>
                        </Footer>
                    </Container>
                </Root>
            );
        }
    }
}

export default MainPage;
