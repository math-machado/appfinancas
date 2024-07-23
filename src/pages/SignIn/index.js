import React, { useState, useContext } from 'react'
import { ActivityIndicator, Image, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

import { useNavigation } from '@react-navigation/native'

import { AuthContext } from '../../contexts/auth'

export default function SignIn(){
    const navigation = useNavigation()
    const {signIn, loadingAuth} = useContext(AuthContext)

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleLogin(){
        signIn(email, password);
    }

    return(
        <View style={styles.background}>
            <KeyboardAvoidingView style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : ''}
            enabled>
                <Image
                    style={styles.logo}
                    source={require('../../assets/Logo.png')}
                />
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
                        placeholder='Sua senha'
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                    />
                </View>

                <TouchableOpacity style={styles.submitButton}
                activeOpacity={0.8}
                onPress={handleLogin}>
                    {
                        loadingAuth ? (
                            <ActivityIndicator size={20} color='#fff'/>
                        ) : (
                            <Text style={styles.submitText}> Acessar</Text>
                        )
                    }
                    
                </TouchableOpacity>

                <TouchableOpacity style={styles.link}
                onPress={() => navigation.navigate('SignUp')}>
                    <Text style={styles.linkText}> Criar uma conta</Text>
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