import React, { useContext, useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Alert, Modal, ActivityIndicator, Image, ScrollView } from 'react-native'
import CustomInput from '../customComponents/CustomInput';
import DateTimePicker from '@react-native-community/datetimepicker';
import CustomButton from './CustomButton';
import axios from 'axios';
import { AntDesign } from '@expo/vector-icons';
import { PublicStyles } from '../styles/PublicStyles';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import CustomImageButton from '../customComponents/CustomImageButton';
import { ServicesContextData } from '../ContextData/ServicesContext';


export default function AddTaskModal({ modalVisible, setModalVisible, id }) {
    const [car_no, setCarNo] = useState('')
    const [car_type, setCarType] = useState('')
    const [car_color, setCarColor] = useState('')
    const [task, setTask] = useState('')
    const [task_time, setTaskTime] = useState('')
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false)
    const [image, setImage] = useState(null);
    const [imagePath, setImagePath] = useState(null);
    const [services, fetchServicesData, carstypes, fetchCarsTypes]=useContext(ServicesContextData)
    



    const onChange = (event, selectedDate) => {
        if (selectedDate) {
            if (mode === 'date') {
                setDate(selectedDate);
                setMode('time');
                setShow(true); // Show time picker after date is selected

            } else {
                setDate(selectedDate);
                setShow(false); // Hide picker after time is selected
                setMode('date'); // Reset mode to date for next time

                // Update formattedDateTime state
                const formattedDate = selectedDate.toLocaleDateString();
                const formattedTime = selectedDate.toLocaleTimeString();
                setTaskTime(`${formattedDate} ${formattedTime}`);

            }
        } else {
            setShow(false);
            setMode('date'); // Reset mode to date if user cancels

        }
    };

    const showDatepicker = () => {
        setMode('date');
        setShow(true);
    };


    const handleAddTask = async () => {

        try {
            setLoading(true)
            const formData = new FormData();
            formData.append('id', id)
            formData.append('car_no', car_no)
            formData.append('car_type', car_type)
            formData.append('car_color', car_color)
            formData.append('task', task)
            formData.append('task_time', task_time)
            if (image) {
                formData.append("image", {
                    uri: imagePath,
                    type: 'image/jpeg',
                    name: image
                })
            }
            const response = await axios.post(`https://alkhtaboot.net/api/add/task/${id}`, formData, {
                // id, car_no, car_type, car_color, task, task_time
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            setLoading(false)
            Alert.alert('You added Task Successfully', 'check tasks for this worker');
        } catch (error) {
            setLoading(false)
            Alert.alert('There is Error Happened', 'please try again later');
            console.log(error)
        }
    }



    useEffect(()=>{
        fetchCarsTypes();
    },[])

    return (

        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                setModalVisible(!modalVisible);
            }}>
            <ScrollView>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalTitle}>Add New Task </Text>
                        <CustomInput value={car_no} placeholder='write car no' onchangetext={(text) => setCarNo(text)} />
                        {carstypes && carstypes.length > 0 ? (
                        
                        <Picker
                            selectedValue={car_type}
                            style={styles.picker}
                            onValueChange={(itemValue, itemIndex) => setCarType(itemValue)}
                            mode="dropdown"

                        >
                            {carstypes.map((car) => (
                                <Picker.Item key={car.id} label={car.type} value={car.type} />
                            ))}
                        </Picker>
                    
                ) : (
                <View>
                   <ActivityIndicator color={PublicStyles.primaryColor} size='small' />
                </View>)}
                        <CustomInput value={car_color} placeholder='write car color' onchangetext={(text) => setCarColor(text)} />
                        <CustomInput value={task} placeholder='write task decription' onchangetext={(text) => setTask(text)} />

                        <TouchableOpacity onPress={showDatepicker} style={[styles.timeBtn, PublicStyles.row, PublicStyles.itemcenter]}>
                            <Text style={styles.timeBtnText}>Select Date & Time</Text>
                            <Ionicons name="time-sharp" size={24} color={PublicStyles.primaryColor} />
                        </TouchableOpacity>




                        {show && (
                            <DateTimePicker
                                value={date}
                                mode={mode}
                                is24Hour={true}
                                display="default"
                                onChange={onChange}
                            />
                        )}

                      

                        <CustomImageButton
                            background="white"
                            title="Choose Car Image"
                            iconColor={PublicStyles.primaryColor}
                            textColor={PublicStyles.primaryColor}
                            borderRadius={10}
                            padding={10}
                            imageHeight={200}
                            imageWidth={200}
                            imageMarginBottom={30}
                            imageBorderRaduis={20}
                            onImageSelected={(selectedImage, selectedImagePath) => {
                                setImage(selectedImage);
                                setImagePath(selectedImagePath);
                            }} />



                        {loading ? (
                            <CustomButton title={<ActivityIndicator size='small' color='white' />} onpress={handleAddTask} />)
                            : (<CustomButton title='Add This Task' onpress={handleAddTask} />)}


                        <TouchableOpacity onPress={() => setModalVisible(!modalVisible)} style={{ marginTop: 30,alignSelf:'center' }} >
                            <AntDesign name="closecircleo" size={30} color="black" />
                        </TouchableOpacity>

                    </View>
                </View>
            </ScrollView>
        </Modal>


    )
}


const styles = StyleSheet.create({


    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        borderRadius: 20,
        padding: 30,
        borderWidth:1,
        backgroundColor:'white',
        borderColor:PublicStyles.lightColor,
        elevation:4,
        width: '90%',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 1,
        shadowRadius: 4,
    },
    modalTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        marginBottom: 20,
        alignSelf:'center',
    },
    timeBtn: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
        width: '100%',
        marginBottom: 20,
        justifyContent: 'center'

    },
    timeBtnText: {
        color: PublicStyles.primaryColor,
        textAlign: 'center',
        marginRight: 10,
    },
    imageBtn: {
        marginBottom: 20,
    },
    image: {
        width: 50,
        height: 50,
        alignSelf: 'center',
        marginBottom: 20
    }
})
