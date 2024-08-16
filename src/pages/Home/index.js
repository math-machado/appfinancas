import React, { useContext, useEffect, useState } from 'react'
import {FlatList, Modal, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { AuthContext } from '../../contexts/auth'

import Header from '../../components/Header'

import api from '../../services/api'

import { format } from 'date-fns'

import { useIsFocused } from '@react-navigation/native'

import BalanceItem from '../../components/BalanceItem'

import Icon from 'react-native-vector-icons/MaterialIcons'

import HistoricoList from '../../components/HistoricoList'

import CalendarModal from '../../components/CalendarModal'


export default function Home(){
    const isFocused = useIsFocused();

    const {signOut, user} = useContext(AuthContext)

    const [listBalance, setListBalance] = useState([])
    const [movements, setMovements] = useState([])
    const [dateMovements, setDateMovements] = useState(new Date())
    const [modalVisable, setModalVisable] = useState(false)

    useEffect(() => {
        let isActive = true;

        async function getMovements(params){
            let dateFormated = format(dateMovements, 'dd/MM/yyyy')

            const receives = await api.get('/receives',{
                params:{
                    date: dateFormated
                }
            })

            const balance = await api.get('/balance', {
                params:{
                    date: dateFormated
                }
            })

            if(isActive){
                setMovements(receives.data)
                setListBalance(balance.data)
            }
        }

        getMovements();

        return () => isActive = false
    },[isFocused, dateMovements])

    async function handleDelete(id){
        try {
            await api.delete ('/receives/delete', {
            params:{
                item_id: id
            }
        })
            setDateMovements(new Date())
        } catch (err) {
            console.log('ERRO AO DELETAR:', err);
            
        }
        
    }

    function filterDateMovements(dateSelected){
        setDateMovements(dateSelected)
    }

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

            <View style={styles.area}>
                <TouchableOpacity
                onPress={() => setModalVisable(true)}>
                    <Icon name='event' color="#121212" size={30}/>
                </TouchableOpacity>

                <Text style={styles.title}>Ultimas movimentações</Text>
            </View>

            <FlatList
                data={movements}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => (<HistoricoList data={item} deleteItem={handleDelete}/>)}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingBottom: 20}}
            />

            <Modal visible={modalVisable} animationType='fade' transparent={true}>
                <CalendarModal
                setVisable={() => setModalVisable(false)}
                handleFilter={filterDateMovements}
                />
            </Modal>
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
        minHeight:190
    },
    area:{
        backgroundColor:"#fff",
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        flexDirection:'row',
        paddingHorizontal: 14,
        alignItems:'baseline',
        marginTop: 0,
        paddingTop: 14
    },
    title:{
        marginLeft: 5,
        color:'#121212',
        marginBottom: 14,
        fontWeight:'bold',
        fontSize:18
    },
    list:{
        flex:1,
        backgroundColor:'#fff'
    }
})