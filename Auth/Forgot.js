import React, {Component} from 'react';
import {
    Text,
    Toast,
    View,
    Root, Left, Button, Body, Title, Header,
} from 'native-base';
import {TextInput, TouchableOpacity, StyleSheet, Image, } from "react-native";
import {Container, Content} from 'native-base';
import {Navigation} from "react-native-navigation";
import axios from "axios";
import Loader from "../Pages/Loader";
import Icon from 'react-native-vector-icons/FontAwesome5';

class Forgot extends Component {

    constructor(props) {
        super(props);
        this.state ={
            email:"",
            password:"",
            loader:false
        }
    }


    componentWillUnmount() {
        // fix Warning: Can't perform a React state update on an unmounted component
        this.setState = (state,callback)=>{
            return;
        };
    }

    goReset=()=>{
        Navigation.push(this.props.componentId, {
            component:{
                name:"ResetPage",
                passProps:{
                    msg:"A pin Code sent your mail box"
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

    goLogin=()=>{
        Navigation.push(this.props.componentId, {
            component:{
                name:"LoginPage"
            }
        })
    }



    handleForget=()=>{
        let email = this.state.email;
        let expEmail = "/^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$/";
        const myData={
            email:email
        }
        let config = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        if (email === ""){
            this.toastMsg("Enter Your Email")
        }else if (email.match(expEmail)){
            this.toastMsg("Email not valid")
        }else{
            this.setState({loader:true})
            axios.post("http://auth.azmisoft.com/api/forgot", myData, config)
                .then(response =>{
                    this.setState({loader:false})
                    if (response.data.code == "fail"){
                        this.toastMsg(response.data.message)
                    }else if(response.data.code == "ok"){
                        this.goReset();
                    }


                })
                .catch(error=>{
                    this.setState({loader:false})
                    this.toastMsg(error)
                })
        }

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
        if (this.state.loader === true){
            return <Loader/>
        }else{
            return (
                <Root>
                    <Container>
                        <Header style={{backgroundColor:"#B98068"}} androidStatusBarColor="#CF9775">
                            <Left>
                                <Button transparent onPress={this.OpenMenu}>
                                    <Icon name='bars' style={{fontSize:20}} />
                                </Button>
                            </Left>
                            <Body>
                                <Title>Forgot Password</Title>
                            </Body>
                        </Header>

                        <View>
                            <Image
                                source={require("../assets/images/bg.png")}
                                style={{position:"absolute", height:700}}
                            >

                            </Image>

                            <Image
                                source={require("../assets/images/logo.png")}
                                style={{top:100, left:130}}
                            >
                            </Image>
                        </View>

                        <Content>
                        <View style={{alignItems:"center", marginTop:140}}>
                            <View style={styles.inputStyle}>
                                <TextInput  placeholder="Email Address" onChangeText={email=>{this.setState({email: email})}} value={this.state.email}></TextInput>
                            </View>

                            <TouchableOpacity style={styles.loginButton} onPress={this.handleForget}>
                                <Text style={{paddingTop:12,textAlign:"center", color:"white", fontSize:16, fontWeight:"bold"}}>Sent Pin</Text>
                            </TouchableOpacity>
                        </View>
                        </Content>

                    </Container>
                </Root>
            );
        }
    }
}

const styles = StyleSheet.create({
    inputStyle:{
        width:"80%",
        backgroundColor:"white",
        marginBottom:10,
        borderRadius:50,
        paddingLeft:15

    },
    loginButton:{
        width:"80%",
        height:50,
        backgroundColor:"#B98068",
        borderRadius:50,
    }
})

export default Forgot;
