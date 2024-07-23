import React, { useContext } from 'react'
import { Button, SafeAreaView, StyleSheet, Text, View } from 'react-native'

import { AuthContext } from '../../contexts/auth'

import Header from '../../components/Header'

export default function Home(){
    const {signOut, user} = useContext(AuthContext)

    return(
        <SafeAreaView style={styles.background}>
            <Header title='Minhas movimentações'/>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    background:{

    }
})