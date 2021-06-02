import React, {Component} from 'react';
import {View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity, TouchableHighlight} from "react-native";
import {Toast, Root} from 'native-base';
import { RadioButton } from 'react-native-paper';
import {Navigation} from "react-native-navigation";
import Icon from 'react-native-vector-icons/FontAwesome5';
import Axios from 'axios';
import Loader from "../Pages/Loader";


class Order extends Component {

    constructor(props) {
        super(props);
        this.state = {
            price:"",
            quantity:1,
            checkedSugar:3,
            checkSize:2,
            id:this.props.productId,
            allData:[],
            loader:false
        }
    }

    componentDidMount() {
        this.setState({loader:true})
        let proId = this.state.id;
        Axios.get("http://www.custom.azmisoft.com/api/getProductById/"+proId)
            .then((response)=>{
                this.setState({loader:false})
                this.setState({allData:response.data})
                this.setState({price: this.state.allData.price})
            })
            .catch((error)=>{
                console.log(error);
            })
    }

    addCard=()=>{

        let myData = {
            product_id : this.state.id,
            price: this.state.price,
            quantity : this.state.quantity,
            size : this.state.checkSize,
            sugar : this.state.checkedSugar
        }

        let config = {
            header:{
                "Content-Type":"application/json"
            }
        }
        this.setState({loader:true})
        Axios.post("http://www.custom.azmisoft.com/api/insert", myData, config)
            .then((response)=>{
                if (response.data === 1){
                    this.setState({loader:false})
                    this.toaster("Order SuccessFully complete");
                }
            })
            .catch((error)=>{
                this.setState({loader:false})
                console.log(error)
                this.toaster("Failed to Order Items!");
            })
    }

    discrement=()=>{
        if (this.state.quantity > 1){
            this.setState({quantity: this.state.quantity - 1})
        }else if(this.state.quantity === 1 ){
            this.toaster("Minimum One Item Require!");
        }

    }
    increment=()=>{
        this.setState({quantity: this.state.quantity+1})
    }

    goMainPage=()=>{
        Navigation.push(this.props.componentId, {
            component:{
                name:"MainPage"
            }
        })
    }

    toaster=(msg)=>{
        Toast.show({
            text: msg,
            buttonText: "Ok",
            position: "bottom",
            duration: 4000
        })
    }



    render() {
        if (this.state.loader){
            return <Loader/>
        }else{
            return (
                <Root>
                    <View style={styles.container}>

                        <View style={styles.headerStyle}>
                            <ImageBackground
                                source={require("../assets/images/coffee_image.png")}
                                style={{width:"100%", height:255, position:"absolute"}}
                            >
                                <Icon
                                    style={{color:"#CF9775",fontSize: 25, top:30, left:20}}
                                    name="chevron-left"
                                    onPress={this.goMainPage}
                                />
                                <Text style={{fontSize:23, fontFamily:"SenBold",left:150,  alignItems:"center", justifyContent:"center"}}>{this.state.allData.title}</Text>

                                <Image
                                    source={{uri : this.state.allData.image}}
                                    style={{height:100, width:100, top:25, left:150}}
                                >
                                </Image>


                            </ImageBackground>
                        </View>

                        <View style={styles.section1}>


                            <View style={{width:"50%"}}>
                                <TouchableHighlight>
                                    <Text style={{fontSize:23, fontFamily:"SenRegular"}}>{this.state.allData.title}</Text>
                                </TouchableHighlight>
                                <Text style={{fontSize:30, fontFamily:"SenBold", color:"#CF9775"}}>${this.state.allData.price}</Text>
                            </View>

                            <View style={{width:"50%", flexDirection: "row", justifyContent:"flex-end", marginTop: 8}}>
                                <TouchableOpacity onPress={this.discrement}>
                                    <Image
                                        source={require("../assets/images/minus.png")}
                                        style={{width:30, marginRight:10}}
                                    >
                                    </Image>
                                </TouchableOpacity>

                                <Text style={{fontSize:23, fontFamily:"SenRegular"}}>{this.state.quantity}</Text>

                                <TouchableOpacity onPress={this.increment}>
                                    <Image
                                        source={require("../assets/images/plus.png")}
                                        style={{width:30, marginLeft:10, marginRight:15}}
                                    >
                                    </Image>
                                </TouchableOpacity>

                            </View>

                        </View>

                        <View style={styles.section2}>
                            <Text style={{fontSize:20, fontFamily:"senRegular", marginLeft:8, marginBottom:15}}>Size</Text>

                            <View style={{flexDirection:"row"}}>
                                <RadioButton
                                    color="#CF9775"
                                    uncheckedColor="#CF9775"
                                    value="1"
                                    status={ this.state.checkSize === 1 ? 'checked' : 'unchecked' }
                                    onPress={() => this.setState({checkSize:1})}
                                />
                                <Text style={{marginTop:7}}>Small</Text>

                                <RadioButton
                                    color="#CF9775"
                                    uncheckedColor="#CF9775"
                                    value="2"
                                    status={ this.state.checkSize === 2 ? 'checked' : 'unchecked' }
                                    onPress={() => this.setState({checkSize:2})}
                                />
                                <Text style={{marginTop:7}}>Medium</Text>

                                <RadioButton
                                    color="#CF9775"
                                    uncheckedColor="#CF9775"
                                    value="3"
                                    status={ this.state.checkSize === 3 ? 'checked' : 'unchecked' }
                                    onPress={() => this.setState({checkSize:3})}
                                />
                                <Text style={{marginTop:7}}>Big</Text>
                            </View>

                        </View>

                        <View style={styles.section3}>


                            <Text style={{fontSize:20, fontFamily:"senRegular", marginLeft:8, marginBottom:15}}>Sugar (in Cubes)</Text>

                            <View style={{flexDirection:"row"}}>

                                <RadioButton
                                    color="#CF9775"
                                    uncheckedColor="#CF9775"
                                    value="1"
                                    status={ this.state.checkedSugar === 1 ? 'checked' : 'unchecked' }
                                    onPress={() => this.setState({checkedSugar:1})}
                                />
                                <Text style={{marginTop:7}}>None</Text>

                                <RadioButton
                                    color="#CF9775"
                                    uncheckedColor="#CF9775"
                                    value="2"
                                    status={ this.state.checkedSugar === 2 ? 'checked' : 'unchecked' }
                                    onPress={() => this.setState({checkedSugar:2})}
                                />
                                <Text style={{marginTop:7}}>One</Text>

                                <RadioButton
                                    color="#CF9775"
                                    uncheckedColor="#CF9775"
                                    value="3"
                                    status={ this.state.checkedSugar === 3 ? 'checked' : 'unchecked' }
                                    onPress={() => this.setState({checkedSugar:3})}
                                />
                                <Text style={{marginTop:7}}>Two</Text>

                                <RadioButton
                                    color="#CF9775"
                                    uncheckedColor="#CF9775"
                                    value="4"
                                    status={ this.state.checkedSugar === 4 ? 'checked' : 'unchecked' }
                                    onPress={() => this.setState({checkedSugar:4})}
                                />
                                <Text style={{marginTop:7}}>Three</Text>
                            </View>
                        </View>

                        <View>
                            <TouchableOpacity onPress={this.addCard}>
                                <Image
                                    source={require("../assets/images/btn.png")}
                                    style={{marginLeft:35, marginTop:15}}
                                >
                                </Image>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Root>
            );
        }

    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"white"
    },
    headerStyle:{
        height:"40%",
        backgroundColor: "#FAF4EE",
        borderBottomEndRadius:50,
        borderBottomLeftRadius:50
    },
    section1:{
        height:"10%",
        flexDirection:"row",
        marginTop:20,
        marginLeft:15
    },
    section2:{
        height:"10%",
        flexDirection:"column",
        marginTop:20,
        marginLeft:15
    },
    section3:{
        height:"10%",
        flexDirection:"column",
        marginTop:20,
        marginLeft:15
    }

})

export default Order;
