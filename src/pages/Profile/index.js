import React, { useContext } from "react";

import Header from '../../components/Header'

import { AuthContext } from "../../contexts/auth";

import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { useNavigation } from "@react-navigation/native";

export default function Profile(){
    const {user, signOut} = useContext(AuthContext)

    const navigation = useNavigation()

    return(
        <View style={styles.container}>
        <Header title='Meu perfil'/>

        <Text style={styles.message}> Bem vindo de volta!!</Text>

        <Text 
        style={styles.name}
        numberOfLines={1}> 
            {user.name} 
        </Text>

        <TouchableOpacity 
        style={styles.newlink}
        onPress={() => navigation.navigate('Registrar')}>
            <Text style={styles.newtext}> Fazer registro</Text>
        </TouchableOpacity>

        <TouchableOpacity 
        style={styles.logoutbutton}
        onPress={() => signOut()}>
            <Text style={styles.logouttext}> Sair </Text>
        </TouchableOpacity>
    </View>
    ) 
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#f0f4ff',
        alignItems:'center'
    },
    message:{
        fontSize:18,
        fontWeight:'bold',
        marginTop: 24
    },
    name:{
        fontSize:24,
        marginBottom:24,
        marginTop: 8,
        paddingHorizontal: 14,
        color:'#121212'
    },
    newlink:{
        backgroundColor:'#3b3dbf',
        width:'90%',
        height: 45,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12
    },
    newtext:{
        fontSize: 18,
        fontWeight: 'bold',
        color:'#fff'
    },
    logoutbutton:{
        justifyContent: 'center',
        alignItems: 'center',
        width:'90%',
        height: 45,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: '#c62c36'
    },
    logouttext:{
        fontSize: 18,
        fontWeight: 'bold',
        color: '#c62c36'
    }
})