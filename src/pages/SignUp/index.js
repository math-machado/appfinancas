import React, { useContext, useState } from 'react'

import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View, ActivityIndicator } from 'react-native'

import { AuthContext } from '../../contexts/auth'

export default function SignUp() {

    const {signUp, loadingAuth} = useContext(AuthContext)

    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassaword] = useState('')

    function handleSingUp(){
        if(nome === '' || email === '' || password === '') return;

        signUp(nome, email, password)
    }

    return (
        <View style={styles.background}>
            <KeyboardAvoidingView style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : ''}
            enabled>
                <View style={styles.areaInput}>
                <TextInput
                    style={styles.input}
                    placeholder='Nome'
                    value={nome}
                    onChangeText={(text) => setNome(text)}
                />
            </View>
            
            <View style={styles.areaInput}>
                <TextInput
                    style={styles.input}
                    placeholder='Seu email'
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
            </View>

            <View style={styles.areaInput}>
                <TextInput
                    style={styles.input}
                    placeholder='Senha'
                    value={password}
                    onChangeText={(text) => setPassaword(text)}
                    secureTextEntry={true}
                />
            </View>

            <TouchableOpacity style={styles.submitButton}
                activeOpacity={0.8}
                onPress={handleSingUp}>
                    {
                        loadingAuth ? (
                            <ActivityIndicator size={20} color='#fff'/>
                        ) : (
                            <Text style={styles.submitText}>Cadastrar</Text>
                        )
                    }
            </TouchableOpacity>
            </KeyboardAvoidingView> 
        </View>
    )
}

const styles = StyleSheet.create({
    background:{
        flex:1
    },
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    logo:{
        marginBottom: 25
    },
    areaInput:{
        flexDirection:'row',
        marginBottom:15
    },
    input:{
        backgroundColor:'#fff',
        width:'90%',
        fontSize:17,
        padding:10,
        borderRadius:8,
        color:'#121212'
    },
    submitButton:{
        width:'90%',
        height:45,
        borderRadius:8,
        backgroundColor:'#3B3DBF',
        marginTop:10,
        alignItems:'center',
        justifyContent:'center'
    },
    submitText:{
        fontSize:20,
        color:'#fff'
    },
    link:{
        marginVertical:10
    },
    linkText:{
        color:'#171717'
    }
})