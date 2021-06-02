import React, {Component} from 'react';
import {Text, Toast, View, Root, Container, Content, Header, Left, Button, Body, Title} from 'native-base';
import {TextInput, TouchableOpacity, StyleSheet, Image, AsyncStorage} from "react-native";
import {Navigation} from "react-native-navigation";
import axios from "axios";
import Loader from "../Pages/Loader";
import Icon from 'react-native-vector-icons/FontAwesome5';

class Login extends Component {

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

    goRegister=()=>{
        Navigation.push(this.props.componentId, {
            component:{
                name:"RegisterPage"
            }
        })
    }

    goForget=()=>{
        Navigation.push(this.props.componentId, {
            component:{
                name:"ForgotPage"
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


    handleLogin=async ()=> {
        let email = this.state.email;
        let password = this.state.password;
        let expEmail = "/^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$/";

        const myData = {
            email: this.state.email,
            password: this.state.password
        }

        let config = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        if (email === "") {
            this.toastMsg("Enter Your Email")
        }else if (email.match(expEmail)) {
            this.toastMsg("Please Put Valid Email")
        }else if (password === "") {
            this.toastMsg("Enter Your Password")
        }else{
            this.setState({loader: true})
            axios.post("http://www.auth.azmisoft.com/api/login", myData, config)
                .then(async (response) => {
                    this.setState({loader: false})
                    if (response.data.result == "fail") {
                        this.toastMsg(response.data.message)
                    } else {
                        await AsyncStorage.setItem("myToken", response.data.token)
                        this.goMainPage();
                    }

                })
                .catch(error => {
                    this.setState({loader: false})
                    this.toastMsg(error)
                    this.setState({email:"", password:""})
                })

            this.setState({email:"", password:""})
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
                                <Title>Login</Title>
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
                                style={{top:50, left:130}}
                            >
                            </Image>
                        </View>

                        <Content>
                        <View style={{alignItems:"center", marginTop:70}}>
                            <View style={styles.inputStyle}>
                                <TextInput  placeholder="Email Address" onChangeText={email =>{this.setState({email: email})}} ></TextInput>
                            </View>

                            <View style={styles.inputStyle}>
                                <TextInput  placeholder="Password" onChangeText={password =>{this.setState({password: password})}} ></TextInput>
                            </View>
                            <TouchableOpacity style={styles.loginButton} onPress={this.handleLogin}>
                                <Text style={{paddingTop:12,textAlign:"center", color:"white", fontSize:16, fontWeight:"bold"}}>LOGIN</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={this.goForget}>
                                <Text style={{paddingTop:12,textAlign:"center", color:"#AFB1B2", fontSize:14}}>Forget Password?</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={this.goRegister}>
                                <Text style={{paddingTop:45,textAlign:"center", color:"#B98068", fontSize:18,fontWeight:"bold"}}>Register Here</Text>
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

export default Login;
