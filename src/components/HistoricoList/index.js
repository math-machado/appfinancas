import React from "react";
import { StyleSheet, Text, View, TouchableWithoutFeedback, Alert } from "react-native";

import {Feather} from 'react-native-vector-icons'

export default function HistoricoList({data, deleteItem}){

    function handleDeleteItem(){
        Alert.alert(
            'ATENÇÂO',
            'Você tem certeza que deseja deletar essa registro?',
            [
                {
                    text:'Cancelar',
                    style:'cancel'
                },
                {
                    text:'Continuar',
                    onPress: () => deleteItem(data.id)
                }
            ]
        )
    }

    return(
        <TouchableWithoutFeedback onLongPress={handleDeleteItem}>
            <View style={styles.container}> 
                <View style={styles.tipo}>
                    <View style={[styles.iconView, {
                        backgroundColor: data.type === 'despesa' ? '#c62c36' : '#0d9301'
                    }]}>
                        <Feather 
                        name={data.type === 'despesa' ? 'arrow-down' : 'arrow-up'} 
                        size={20} 
                        color='#fff'
                        />
                        <Text style={styles.tipoText}>{data.type}</Text>
                    </View>
                </View>

                <Text style={styles.valueText}>
                R$ {data.value}
                </Text>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#f0f0ff',
        borderRadius: 4,
        marginHorizontal: 10,
        marginBottom: 14,
        padding: 12

    },
    tipo:{
        flexDirection:'row',

    },
    tipoText:{
        color:'#fff',
        fontSize:16,
        fontStyle:'italic'
    },
    iconView:{
        flexDirection:'row',
        backgroundColor:'red',
        paddingVertical:4,
        paddingHorizontal: 8,
        borderRadius: 4,
        marginBottom: 4
    },
    valueText:{
        color:'#121212',
        fontSize: 22,
    }

})