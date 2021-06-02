import React, {Component} from 'react';
import {View, StyleSheet, Image, Text, TextInput, TouchableOpacity, AsyncStorage} from 'react-native';
import {Navigation} from 'react-native-navigation';
import {Root, Toast, Container, Content, Left, Button, Body, Title, Header} from 'native-base';
import axios from 'axios';
import Loader from "../Pages/Loader";
import Icon from 'react-native-vector-icons/FontAwesome5';


class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name:"",
            email:"",
            mobile:"",
            address:"",
            loader:false,
            allData:[]
        }
    }

    componentDidMount= async ()=>{
        axios.defaults.headers.common['Authorization'] = "Bearer " + await AsyncStorage.getItem("myToken");
        axios.get("http://auth.azmisoft.com/api/users")
            .then((response)=>{
                this.setState({allData:response.data})
            })
            .catch((error)=>{
                console.log(error);
            })
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

    handleUpdate=()=>{
        let id = this.state.allData.id;
        let name = this.state.allData.name;
        let email = this.state.allData.email;
        let mobile = this.state.allData.mobile;
        let address = this.state.allData.address;

        let config ={
            headers:{
                "Content-Type":"application/json"
            }
        }

        let myData = {
            id:id,
            name:name,
            email:email,
            mobile:mobile,
            address:address
        }

            this.setState({loader:true})
            axios.post("https://www.auth.azmisoft.com/api/update", myData, config)
                .then((response)=>{
                    this.setState({loader:false})
                    this.toastMsg(response.data.message)
                })
                .catch((error)=>{
                    this.setState({loader:false})
                    console.log(error)
                })

            this.setState({name:"", email:"", mobile:"", address:""})

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
                            <Title>Profile</Title>
                        </Body>
                    </Header>
                    <View>
                        <Image
                            source={require("../assets/images/bg.png")}
                            style={{position:"absolute"}}
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
                            <TextInput  placeholder="Name" onChangeText={name=>{this.setState({name: name})}} value={this.state.allData.name} ></TextInput>
                        </View>
                        <View style={styles.inputStyle}>
                            <TextInput  placeholder="Email Address" onChangeText={email=>{this.setState({email: email})}} value={this.state.allData.email} ></TextInput>
                        </View>

                        <View style={styles.inputStyle}>
                            <TextInput  placeholder="Address" onChangeText={address=>{this.setState({address: address})}} value={this.state.allData.address} ></TextInput>
                        </View>

                        <View style={styles.inputStyle}>
                            <TextInput  placeholder="Mobile" onChangeText={mobile=>{this.setState({mobile: mobile})}} value={this.state.allData.mobile} ></TextInput>
                        </View>

                        <TouchableOpacity style={styles.loginButton} onPress={this.handleUpdate}>
                            <Text style={{paddingTop:12,textAlign:"center", color:"white", fontSize:16, fontWeight:"bold"}}>UPDATE</Text>
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

export default Profile;
