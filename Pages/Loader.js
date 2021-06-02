import React, {Component} from 'react';
import {View, StyleSheet} from "react-native";
import {Spinner} from 'native-base';


class Loader extends Component {

    render() {
        return (
            <View style={styles.container}>
                    <Spinner color='#B98068' />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#FAF4EE",
        justifyContent:"center",
        alignItems:"center"
    }
})

export default Loader;
