import React, { useState, useEffect } from 'react';
import {
  View, Image, Text, StyleSheet, TextInput, TouchableOpacity, Linking, KeyboardAvoidingView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    marginTop: 50,
    width: 223,
    height: 64,
    flex: 0,
    order: 0,
    flexGrow: 0,
  },
  register: {
    width: 227,
    height: 28,
    marginTop: 60,
    marginLeft: 16,
    fontSize: 16,
    lineHeight: 28,
  },
  regview: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 16,
  },
  num: {
    height: 56,
    width:343,
    borderColor: '#2F4D8B',
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    margin: 16,
  },
  button: {
    marginTop: 23,
    backgroundColor: 'lightgray',
    color: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    height: 42,
    margin: 16,
    
  },
  activeButton: {
    marginTop: 23,
    backgroundColor: '#2F4D8B',
    color: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    height: 42,
    margin: 16,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginLeft: 16,
    marginRight: 16,
  },
  text: {
    padding: 12,
    fontSize: 16,
    lineHeight: 19.92,
    marginLeft: 16,
    marginRight: 16,
  },
  Need: {
    padding: 10,
    fontSize: 16,
    lineHeight: 19.92,
    textAlign: 'center',
    marginTop: 110,
  },
  supportText: {
    padding: 10,
    fontSize: 16,
    lineHeight: 19.92,
    textAlign: 'center',
    color: '#2F4D8B',
    textDecorationLine: 'underline',
  },
});

const Screen2 = () => {
  const navigation = useNavigation();

  const handleTap = () => {
    console.log('Tapped');
  };

  const handleNextButton = (phoneNumber) => {
    if (phoneNumber.length === 10) {
      navigation.navigate('Screen3', { phoneNumber });
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleTap}>
      <View style={styles.container}>
        <Image
          style={styles.logo}
          source={require('./GAT.jpeg')}
        />
        <PhoneNumberInput onNextButton={handleNextButton} />
      </View>
    </TouchableOpacity>
  );
};

const PhoneNumberInput = ({ onNextButton }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isButtonActive, setIsButtonActive] = useState(false);

  useEffect(() => {
    setIsButtonActive(phoneNumber.length === 10);
  }, [phoneNumber]);

  const handlePhoneNumberChange = (text) => {
    const formattedNumber = text.replace(/[^0-9]/g, '');
    setPhoneNumber(formattedNumber);
  };

  const handleNextButton = () => {
    console.log('Next button clicked');
    onNextButton(phoneNumber);
  };

  const handleSupportTextPress = () => {
    const supportURL = ''; // Replace with your contact web page URL
    Linking.openURL(supportURL);
  };

  return (
    <View style={styles.regview}>
      <Text style={styles.register}>Your Registered Phone Number:</Text>
      <KeyboardAvoidingView behavior="padding">
        <TextInput
          style={styles.num}
          keyboardType="phone-pad"
          placeholder="Enter phone number"
          value={phoneNumber}
          onChangeText={handlePhoneNumberChange}
          maxLength={10}
        />
        <TouchableOpacity
          style={isButtonActive ? styles.activeButton : styles.button}
          onPress={handleNextButton}
          disabled={!isButtonActive}
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
      <Text style={styles.text}>
        By proceeding, you consent to get SMS messages including by automated means, from Gig and Take and its affiliates
        to the phone number provided
      </Text>
      <Text style={styles.Need}>Need help?</Text>
      <Text style={styles.supportText} onPress={handleSupportTextPress}>
        Contact for support
      </Text>
    </View>
  );
};

export default Screen2;