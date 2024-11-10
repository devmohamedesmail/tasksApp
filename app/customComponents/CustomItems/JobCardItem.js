import React from 'react'
import { Div, Text, Dropdown, Button } from 'react-native-magnus'
import { Image } from "react-native-magnus";
import Colors from '../../config/Colors';
import Entypo from '@expo/vector-icons/Entypo';
import CustomActionButton from '../CustomActionButton';
import { useTranslation } from 'react-i18next';


export default function JobCardItem({ id, carNo, carType, start, end, workers, RemainingTime, handleChangeStageStatus, handleDeleteStage, isActive, handleChangeActiveStatus, status }) {
    const { t } = useTranslation();
    const dropdownRef = React.createRef();

    return (
        <Div w='98%' m='auto' key={id} bg='white' my={10} p='lg' rounded='lg' >

            <Div row justifyContent='space-between' alignItems='center'>
                <Image
                    h={60}
                    w={60}
                    m={10}
                    rounded="circle"
                    source={require("../../images/icons/truck.png")}
                />



                <Text fontWeight='bold' borderColor={Colors.primary} borderWidth={2} w={120} textAlign='center' py={10} px={7} rounded='md' bg={Colors.secondary} > {carNo} </Text>

                <Button
                    block
                    bg={Colors.secondary}
                    borderWidth={2}
                    borderColor={Colors.primary}
                    w={50}
                    h={50}
                    mt={14}

                    color="white"
                    onPress={() => dropdownRef.current.open()}>
                    <Entypo name="dots-three-vertical" size={20} color="black" />
                </Button>

                <Dropdown
                    ref={dropdownRef}
                    mt="md"
                    pb="2xl"
                    showSwipeIndicator={true}
                    roundedTop="xl">
                    <Dropdown.Option py="md" px="xl" block>
                        <CustomActionButton icon='check' backgroundColor='green700' title={t('complete-stage')} onpress={() => handleChangeStageStatus(id)} />
                    </Dropdown.Option>

                    <Dropdown.Option py="md" px="xl" block>
                        <CustomActionButton icon='pause' backgroundColor='green700' title={t('pause')} onpress={() => handleChangeActiveStatus(id)} />
                    </Dropdown.Option>

                    <Dropdown.Option py="md" px="xl" block>
                        <CustomActionButton icon='delete' backgroundColor='red700' title={t('delete')} onpress={() => handleDeleteStage(id)} />
                    </Dropdown.Option>


                </Dropdown>
            </Div>

            <Text fontWeight='bold' fontSize={15} mx={10}>{carType}</Text>


            <Div row justifyContent='space-between' alignItems='center'>
                <Div>
                    {isActive === 1 ? (
                        <Text bg="red300" px={10} py={5} rounded="lg" w={100} textAlign='center' my={5}>{t('active')}</Text>
                    ) :
                        (
                            <Text bg="red300" px={10} py={5} rounded="lg" w={100} textAlign='center' my={5}>{t('inactive')}</Text>)}
                    {status === '1' ? (
                        <Text bg="green300" px={10} py={5} rounded="lg" w={100} textAlign='center' my={5}>{t('done')}</Text>
                    ) :
                        (
                            <Text bg="red300" px={10} py={5} rounded="lg" w={100} textAlign='center' my={5}>{t('running')}</Text>)}
                </Div>

                <Div justifyContent='space-between' alignItems='center' my={10}>
                    <Text fontWeight='bold' color='green700'>{start}</Text>
                    <Text fontWeight='bold' color='red700'>{end}</Text>
                    <Text bg='green300' w={100} textAlign='center' p={10} rounded='lg'>{RemainingTime}</Text>
                </Div>
            </Div>




            <Div row alignItems='center' mt={20}>
                {workers && workers.map((w, i) => (

                    <Text
                        key={i}
                        bg={Colors.primary}
                        color='white'
                        mx={10}
                        px={10}
                        py={5}
                        rounded='lg'
                    >{w}</Text>
                ))}
            </Div>

        </Div>
    )
}
