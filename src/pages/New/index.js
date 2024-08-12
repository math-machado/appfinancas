import React, { useState } from "react";
import {Keyboard, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View} from "react-native";

import { Alert } from "react-native";

import Header from '../../components/Header'

import RegisterTypes from "../../components/RegisterTypes";

import api from "../../services/api";

import { format } from 'date-fns'

export default function New(){
    const [labelInput, setLabelInput] = useState('')
    const [valeuInput, setValueInput] = useState('')
    const [type, setType] = useState('receita')

    function handleSubmit(){
        Keyboard.dismiss();

        if(isNaN(parseFloat(valeuInput)) || type === null){
            alert('Preencha todos os campos')
            return;
        }

        Alert.alert(
            'Confirmando dados',
            `Tipo: ${type}

Valor: R$${parseFloat(valeuInput)}`,
            [
                {
                    text:'Cancelar',
                    style: 'cancel'
                },
                {
                    text:'Confirmar',
                    onPress:() => handleAdd()
                }
            ]
        )
    }

    async function handleAdd(params) {
        Keyboard.dismiss();

        await api.post('/receive',{
            description: labelInput,
            value: Number(valeuInput),
            type: type,
            date: format(new Date(), 'dd/MM/yyyy')
        })

        setLabelInput('');
        setValueInput('');
    }
    return(
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.background}>
                <Header title={'Registrando'}/>

                <SafeAreaView style={{ alignItems:'center', marginTop: 14}}>

                    <TextInput
                    style={styles.input}
                    placeholder="Descrição desse registro"
                    value={labelInput}
                    onChangeText={(text) => setLabelInput(text)}
                    />
                    <TextInput
                    style={styles.input}
                    placeholder="Valor desejado"
                    keyboardType="numeric"
                    value={valeuInput}
                    onChangeText={(text) => setValueInput(text)}
                    />

                    <RegisterTypes type={type} sendTypeChanged={(item) => setType(item)} />
                    
                    <TouchableOpacity 
                    style={styles.submitButton}
                    onPress={() => handleSubmit()}>
                        <Text style={styles.textButton}>Registrar</Text>
                    </TouchableOpacity>
                </SafeAreaView>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    background:{
        flex:1,
        backgroundColor: '#f0f4ff'
    },
    input:{
        height:50,
        width:'90%',
        backgroundColor:'#fff',
        fontSize:17,
        paddingHorizontal:8,
        marginBottom:14,
        borderRadius:8
    },
    submitButton:{
        width:'90%',
        height:50,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#00b94a',
        borderRadius:8
    },
    textButton:{
        color:'#fff',
        fontSize:21,
        fontWeight:'bold'
    }
})