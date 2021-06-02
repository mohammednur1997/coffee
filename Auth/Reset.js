import React, {Component} from 'react';
import {
    Text, Toast,
    View, Root,
    Container, Content, Header, Left, Button, Body, Title,
} from 'native-base';
import {TextInput, TouchableOpacity, StyleSheet, Image} from "react-native";
import {Navigation} from "react-native-navigation";
import axios from "axios";
import Loader from "../Pages/Loader";
import Icon from 'react-native-vector-icons/FontAwesome5';

class Reset extends Component {

    constructor(props) {
        super(props);
        this.state ={
            email:"",
            password:"",
            loader:false,
            msg:this.props.msg
        }
    }


    componentWillUnmount() {
        // fix Warning: Can't perform a React state update on an unmounted component
        this.setState = (state,callback)=>{
            return;
        };
    }

    componentDidMount() {
        this.toastMsg(this.state.msg)
    }

    goLogin=()=>{
        Navigation.push(this.props.componentId, {
            component:{
                name:"LoginPage"
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

    handleReset=()=>{

        let pinCode = this.state.pin;
        let email = this.state.email;
        let password = this.state.password;
        let confirm_password= this.state.password_confirmation;
        let config ={
            headers:{
                "Content-Type":"application/json"
            }
        }
        let expEmail = "/^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$/";
        let myData = {
            token:pinCode,
            email:email,
            password:password,
            password_confirmation: confirm_password
        }

        if(email === ""){
            this.toastMsg("Enter your Email")
        }else if(email.match(expEmail)){
            this.toastMsg("Please Put Valid Email")
        }else if (password !== confirm_password ){
            this.toastMsg("Password Not match")
        }else if(password.length <6){
            this.toastMsg("Provide 6 word password")
        }else{
            this.setState({loader:true})
            axios.post("http://auth.azmisoft.com/api/reset", myData, config)
                .then((response)=>{
                    this.setState({loader:false})
                    this.toastMsg(response.data.message)
                })
                .catch((error)=>{
                    this.setState({loader:false})
                    this.toastMsg(error)
                })

            this.setState({pin:"", email:"", password:"", password_confirmation:""})
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
                                <Title>Reset Password</Title>
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
                                style={{top:40, left:130}}
                            >
                            </Image>
                        </View>

                        <Content>
                        <View style={{alignItems:"center", marginTop:100}}>
                            <View style={styles.inputStyle}>
                                <TextInput  placeholder="Pin Code" onChangeText={pin=>{this.setState({pin: pin})}} value={this.state.pin}></TextInput>
                            </View>
                            <View style={styles.inputStyle}>
                                <TextInput  placeholder="Email Address" onChangeText={email=>{this.setState({email: email})}} value={this.state.email}></TextInput>
                            </View>

                            <View style={styles.inputStyle}>
                                <TextInput  placeholder="Password" onChangeText={password=>{this.setState({password: password})}} value={this.state.password}></TextInput>
                            </View>

                            <View style={styles.inputStyle}>
                                <TextInput  placeholder="Confirm_password" onChangeText={password_confirmation=>{this.setState({password_confirmation: password_confirmation})}} value={this.state.password_confirmation}></TextInput>
                            </View>
                            <TouchableOpacity style={styles.loginButton} onPress={this.handleReset}>
                                <Text style={{paddingTop:12,textAlign:"center", color:"white", fontSize:16, fontWeight:"bold"}}>Reset</Text>
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

export default Reset;
