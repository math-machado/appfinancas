import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { Feather } from 'react-native-vector-icons'

export default function RegisterTypes({type, sendTypeChanged}){
    const [typeChecked, setTypeChecked] = useState(type)

    function changeType(name){
        if(name === 'receita'){
            setTypeChecked('receita')
            sendTypeChanged('receita')
        }else{
            setTypeChecked('despesa')
            sendTypeChanged('despesa')
        }
    }
    return(
        <View style={styles.container}>
            <TouchableOpacity 
            style={[styles.registerTypeButton, {
                backgroundColor: typeChecked === 'receita' ? '#fff' : '#e7e7e7',
                borderColor: typeChecked === 'receita' ? '#3b3dbf' : 'transparent'
            }]}
            onPress={() => changeType('receita')}>
                <Feather name='arrow-up' size={20} color='#121212'/>
                <Text style={styles.textButton}>Receita</Text>
            </TouchableOpacity>

            <TouchableOpacity 
            style={[styles.registerTypeButton, {
                backgroundColor: typeChecked === 'despesa' ? '#fff' : '#e7e7e7',
                borderColor: typeChecked === 'despesa' ? '#3b3dbf' : 'transparent'
            }]}
            onPress={() => changeType('despesa')}>
                <Feather name='arrow-down' size={20} color='#121212'/>
                <Text style={styles.textButton}>Despesa</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        width:'100%',
        justifyContent:'space-between',
        paddingHorizontal:'5%',
        alignItems:'center'
    },
    registerTypeButton:{
        backgroundColor:'#e7e7e7',
        width:'47%',
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row',
        height:45,
        borderRadius:8,
        borderWidth:1.5,
        borderColor:'#3b3dbf',
        marginBottom:14
    },
    
    textButton:{
        marginLeft:8,
        fontSize:17
    }
})