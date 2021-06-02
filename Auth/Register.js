import React, {Component} from 'react';
import {View, StyleSheet, Image, Text, TextInput, TouchableOpacity} from 'react-native';
import {Navigation} from 'react-native-navigation';
import {Root, Toast, Container, Content, Left, Button, Body, Title, Header} from 'native-base';
import Axios from 'axios';
import Loader from "../Pages/Loader";
import Icon from 'react-native-vector-icons/FontAwesome5';


class Register extends Component {

    constructor() {
        super();
        this.state = {
            name:"",
            email:"",
            mobile:"",
            address:"",
            password:"",
            password_confirmation:"",
            loader:false
        }
    }

    componentDidMount() {

    }

    componentWillUnmount() {
        // fix Warning: Can't perform a React state update on an unmounted component
        this.setState = (state,callback)=>{
            return;
        };
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

    handleRegister=()=>{

        let name = this.state.name;
        let email = this.state.email;
        let mobile = this.state.mobile;
        let address = this.state.address;
        let password = this.state.password;
        let confirm_password= this.state.password_confirmation;
        let config ={
            headers:{
                "Content-Type":"application/json"
            }
        }
        let expEmail = "/^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$/";
        let myData = {
            name:name,
            email:email,
            mobile:mobile,
            address:address,
            password:password,
            password_confirmation: confirm_password
        }
        if(name == ""){
            this.toastMsg("Enter Your name")
        }else if (password === ""){
            this.toastMsg("Enter Your Password")
        }else if (confirm_password === ""){
            this.toastMsg("Enter Your Confirm Password")
        }else if (email === ""){
            this.toastMsg("Enter your Email")
        }else if(email.match(expEmail)){
            this.toastMsg("Please Put Valid Email")
        }else if (password !== confirm_password ){
            this.toastMsg("Password Not match")
        }else if(password.length <6){
            this.toastMsg("Provide 6 word password")
        }else{
            this.setState({loader:true})
            Axios.post("https://www.auth.azmisoft.com/api/register", myData, config)
                .then((response)=>{
                    this.setState({loader:false})
                    this.toastMsg(response.data.message)
                })
                .catch((error)=>{
                    this.setState({loader:false})
                    this.toastMsg(error)
                })

            this.setState({name:"", email:"", mobile:"", address:"", password:"", password_confirmation:""})
        }
    }

    toastMsg=(msg)=>{
        Toast.show({
            buttonText:"Cancel",
            text:msg,
            position:"bottom",
            textStyle:{color:"white"},
            duration:3000
        })
    }


    render() {
        if (this.state.loader){
            return <Loader/>
        }else {
            return (
                <Root>
                    <Container>
                        <Header style={{backgroundColor: "#B98068"}} androidStatusBarColor="#CF9775">
                            <Left>
                                <Button transparent onPress={this.OpenMenu}>
                                    <Icon name='bars' style={{fontSize:20}}/>
                                </Button>
                            </Left>
                            <Body>
                                <Title>Register</Title>
                            </Body>
                        </Header>
                        <View>
                            <Image
                                source={require("../assets/images/bg.png")}
                                style={{position: "absolute", height: 700}}
                            >

                            </Image>

                            <Image
                                source={require("../assets/images/logo.png")}
                                style={{top: 20, left: 145, width: 100, height: 100}}
                            >
                            </Image>
                        </View>

                        <Content>
                            <View style={{alignItems: "center", marginTop: 35}}>
                                <View style={styles.inputStyle}>
                                    <TextInput placeholder="Name" onChangeText={name => {
                                        this.setState({name: name})
                                    }}></TextInput>
                                </View>
                                <View style={styles.inputStyle}>
                                    <TextInput placeholder="Email Address" onChangeText={email => {
                                        this.setState({email: email})
                                    }}></TextInput>
                                </View>

                                <View style={styles.inputStyle}>
                                    <TextInput placeholder="Address" onChangeText={address => {
                                        this.setState({address: address})
                                    }}></TextInput>
                                </View>

                                <View style={styles.inputStyle}>
                                    <TextInput placeholder="Mobile" onChangeText={mobile => {
                                        this.setState({mobile: mobile})
                                    }}></TextInput>
                                </View>

                                <View style={styles.inputStyle}>
                                    <TextInput placeholder="Password" onChangeText={password => {
                                        this.setState({password: password})
                                    }}></TextInput>
                                </View>

                                <View style={styles.inputStyle}>
                                    <TextInput placeholder="Confirm_password" onChangeText={password_confirmation => {
                                        this.setState({password_confirmation: password_confirmation})
                                    }}></TextInput>
                                </View>
                                <TouchableOpacity style={styles.loginButton} onPress={this.handleRegister}>
                                    <Text style={{
                                        paddingTop: 12,
                                        textAlign: "center",
                                        color: "white",
                                        fontSize: 16,
                                        fontWeight: "bold"
                                    }}>REGISTER</Text>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={this.goLogin}>
                                    <Text style={{paddingTop: 12, textAlign: "center", color: "#AFB1B2", fontSize: 14}}>Already
                                        Have Account?</Text>
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

export default Register;
