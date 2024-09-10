import React, { useState } from 'react'
import { StyleSheet, View, TouchableOpacity, Text, Image,Alert } from 'react-native'
import { Entypo } from '@expo/vector-icons';
import { PublicStyles } from '../styles/PublicStyles';
import * as ImagePicker from 'expo-image-picker';
import { useTranslation } from 'react-i18next';

export default function CustomImageButton({ title, background, iconColor, textColor, borderRadius, padding, imageWidth, imageHeight, imageMarginBottom, imageBorderRaduis, onImageSelected }) {

    const [image, setImage] = useState(null);
    const [imagePath, setImagePath] = useState(null);
    const {t}=useTranslation();



    const requestPermissions = async () => {
        // Request permission for accessing media library
        const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
        const { status: libraryStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        
        if (cameraStatus !== 'granted') {
            Alert.alert('Camera permission required', 'Please grant camera access to take photos.');
        }

        if (libraryStatus !== 'granted') {
            Alert.alert('Library permission required', 'Please grant library access to pick photos.');
        }
    };



    // const pickImage = async () => {
        
    //     let result = await ImagePicker.launchImageLibraryAsync({
    //         mediaTypes: ImagePicker.MediaTypeOptions.All,
    //         allowsEditing: true,
    //         aspect: [4, 4],
    //         quality: 1,
    //     });

      

    //     if (!result.canceled) {
    //         const selectedImage = result.assets[0].fileName;
    //         const selectedImagePath = result.assets[0].uri;
    //         setImage(selectedImage);
    //         setImagePath(selectedImagePath);
    //         onImageSelected(selectedImage, selectedImagePath);
    //     }
    // };
    const pickImage = async () => {
        await requestPermissions();

        // Show options to either pick from gallery or capture using the camera
        Alert.alert(
            t('selectimage'),
            t('imageoption'),
            [
                {
                    text:t('camera'),
                    onPress: async () => {
                        const result = await ImagePicker.launchCameraAsync({
                            mediaTypes: ImagePicker.MediaTypeOptions.Images,
                            allowsEditing: true,
                            aspect: [4, 4],
                            quality: 1,
                        });

                        if (!result.canceled) {
                            const selectedImage = result.assets[0].fileName;
                            const selectedImagePath = result.assets[0].uri;
                            setImage(selectedImage);
                            setImagePath(selectedImagePath);
                            onImageSelected(selectedImage, selectedImagePath);
                        }
                    }
                },
                {
                    text: t('gallery'),
                    onPress: async () => {
                        const result = await ImagePicker.launchImageLibraryAsync({
                            mediaTypes: ImagePicker.MediaTypeOptions.Images,
                            allowsEditing: true,
                            aspect: [4, 4],
                            quality: 1,
                        });

                        if (!result.canceled) {
                            const selectedImage = result.assets[0].fileName;
                            const selectedImagePath = result.assets[0].uri;
                            setImage(selectedImage);
                            setImagePath(selectedImagePath);
                            onImageSelected(selectedImage, selectedImagePath);
                        }
                    }
                },
                {
                    text: t('cancel'),
                    style: 'cancel',
                }
            ]
        );
    };


    return (
        <>
            <TouchableOpacity
                onPress={pickImage}
                style={
                    [
                        styles.imageBtn,
                        PublicStyles.row,
                        PublicStyles.justifyCenter,
                        PublicStyles.itemcenter,
                        { backgroundColor: background, borderRadius: borderRadius, padding: padding }
                    ]
                }>
                <Text style={[styles.imageBtnText, { color: textColor }]}>{title}</Text>
                <Entypo name="images" size={30} color={iconColor} />
            </TouchableOpacity>
            {imagePath && <Image source={{ uri: imagePath }} style={{ width: imageWidth, height: imageHeight, alignSelf: 'center', marginBottom: imageMarginBottom, borderRadius: imageBorderRaduis }} />}
        </>
    )
}


const styles = StyleSheet.create({
    imageBtn: {
        marginBottom: 10,
        width:'80%',
        alignSelf:'center'
    },
    imageBtnText: {
        fontWeight: 'bold',
        marginRight: 10,
        fontSize: 15
    }
})
