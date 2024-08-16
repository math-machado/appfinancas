import React, { useState } from "react";

import { StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";

import { Calendar, LocaleConfig } from 'react-native-calendars'

export default function CalendarModal({ setVisable, handleFilter }){
    const [dateNow, setDateNow] = useState(new Date())
    const [markedDates, setMarkedDates] = useState(new Date())

    function handleOnDayPress(date){

        setDateNow(new Date(date.dateString))

        let markedDay = {};

        markedDay[date.dateString] = {
            selected: true,
            selectedColor: '#3b3dbf',
            textColor: '#fff'
        }

        setMarkedDates(markedDay)
    }

    function handleFilterDate(){
        handleFilter(dateNow);
        setVisable();
    }

    return(
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={setVisable}>
                <View style={{flex:1}}></View>
            </TouchableWithoutFeedback>

            <View style={styles.modalContent}>

                <Calendar
                    onDayPress={handleOnDayPress}
                    markedDates={markedDates}
                    enableSwipeMonths={true}
                    theme={{
                        todayTextColor: 'red',
                        selectedDayBackgroundColor: 'blue',
                        selectedDayTextColor: '#fff'
                    }}
                />

                <TouchableOpacity 
                style={styles.buttonFilter}
                onPress={handleFilterDate}>
                    <Text style={styles.buttonFilterText}>Filtrar</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'rgba(34, 34, 34, 0.4)'
    },
    modalContent:{
        flex:2,
        justifyContent: 'center',
        backgroundColor: '#fff',
        padding: 14
    },
    buttonFilterText:{
        color: '#fff',
        fontSize: 19,
        fontWeight: 'bold'
    },
    buttonFilter:{
        backgroundColor: '#3b3dbf',
        borderRadius: 4,
        height: 41,
        alignItems: 'center',
        justifyContent: 'center'
    }
})