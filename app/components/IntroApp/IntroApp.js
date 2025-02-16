import React, { useState } from 'react'
import AppIntroSlider from 'react-native-app-intro-slider';
import { Div, Text, Image } from 'react-native-magnus';
import { StyleSheet } from 'react-native';

export default function IntroApp({ onDone }) {

    const [showRealApp, setShowRealApp] = useState(false);

    const slides = [
        {
            key: 1,
            title: 'Title 1',
            text: 'Description.\nSay something cool',
            image: require('./1.png'),
            backgroundColor: '#59b2ab',
        },
        {
            key: 2,
            title: 'Title 2',
            text: 'Other cool stuff',
            image: require('./2.png'),
            backgroundColor: '#febe29',
        },
        {
            key: 3,
            title: 'Rocket guy',
            text: 'I\'m already out of descriptions\n\nLorem ipsum bla bla bla',
            image: require('./3.png'),
            backgroundColor: '#22bcb5',
        }
    ];




    const _renderItem = ({ item }) => (
        <Div p={0} overflow='hidden' borderWidth={2} borderColor='black' bg='black' flex={1}>   
            <Image source={item.image} h="80%" w="100%" />
        </Div>
    );

    const _onDone = () => {
        setShowRealApp(true);
        onDone(); 
    };


    if (showRealApp) {
        return null;
    } else {
        return <AppIntroSlider
            renderItem={_renderItem}
            data={slides}
            onDone={_onDone}
            showSkipButton={true} // Show the Skip button
            showNextButton={true} // Show the Next button
            skipLabel="Skip" // Customize Skip button text
            doneLabel="Done" // Customize Done button text
            nextLabel="Next" // Customize Next button text
            buttonStyle={styles.buttonStyle} // Customize button style
            skipStyle={styles.skipButton} // Customize Skip button style
            doneStyle="#000000" // Customize Done button style
        />;
    }
}



// Style customizations for buttons
const styles = StyleSheet.create({
    buttonStyle: {
        backgroundColor: '#000', // Custom background color
        borderRadius: 25,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    skipButton: {
        backgroundColor: '#000',
        color:"red" // Custom color for the Skip button
    },
    doneButton: {
        backgroundColor: '#000', // Custom color for the Done button
    },
});