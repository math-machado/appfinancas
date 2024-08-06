import React, { useContext, useEffect, useState } from 'react'
import {FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { AuthContext } from '../../contexts/auth'

import Header from '../../components/Header'

import api from '../../services/api'

import { format } from 'date-fns'

import { useIsFocused } from '@react-navigation/native'

import BalanceItem from '../../components/BalanceItem'

export default function Home(){
    const isFocused = useIsFocused();

    const {signOut, user} = useContext(AuthContext)

    const [listBalance, setListBalance] = useState([])

    const [dateMovements, setDateMovements] = useState(new Date())

    useEffect(() => {
        let isActive = true;

        async function getMovements(params){
            let dateFormated = format(dateMovements, 'dd/MM/yyyy')

            const balance = await api.get('/balance', {
                params:{
                    date: dateFormated
                }
            })

            if(isActive){
                setListBalance(balance.data)
            }
        }

        getMovements();

        return () => isActive = false
    },[isFocused])
    return(
        <SafeAreaView style={styles.background}>
            <Header title='Minhas movimentações'/>

            <FlatList style ={styles.listBalance}
                data={listBalance}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                keyExtractor={ item => item.tag }
                renderItem={ ({ item }) => (<BalanceItem data={item}/>)}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    background:{
        flex:1,
        backgroundColor:'#f0f4ff'
    },
    listBalance:{
        maxHeight:190,

    }
})