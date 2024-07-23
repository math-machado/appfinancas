import React from "react";

import { SafeAreaView, StyleSheet, Text, TouchableOpacity } from "react-native";

import { Feather } from 'react-native-vector-icons'

import { useNavigation } from '@react-navigation/native'

export default function Header({title}){

    const navigation = useNavigation()

    return(
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.buttonMenu}
            onPress={() => navigation.openDrawer()}>
                <Feather name='menu' size={34} color='#121212'/>
            </TouchableOpacity>

            {title && (
                <Text style={styles.title}>
                    {title}
                </Text>
            )}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'flex-start',
        marginTop:30,
        marginBottom:15,
        marginLeft:15,
        width:'100%',
        maxHeight:60
    },
    title:{
        fontSize:22,
        marginLeft:8
    },
    buttonMenu:{
        alignItems:'center',
        justifyContent:'center'
    }
})