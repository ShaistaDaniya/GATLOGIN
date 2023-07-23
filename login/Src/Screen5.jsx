import React, { useState, useRef, useEffect } from 'react';
import { View, Image, Text, StyleSheet, TextInput, TouchableOpacity, Linking, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 223,
    height: 64,
    flexGrow: 0,
    marginTop: 80
  },
  enter: {
    width: 'auto',
    height: 'auto',
    marginTop: 30,
    marginLeft: 100,
    marginRight: 100,
    fontSize: 16,
    lineHeight: 18,
  },
  prevnum: {
    width: 'auto',
    height: 'auto',
    marginLeft: 105,
  },
  regview: {
    fontSize: 16,
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
    width: 212,
    marginLeft: 82,
    marginRight: 82,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  passcodeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  passcodeBox: {
    flex: 0,
    height: 56,
    width: 46,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    fontSize: 24,
    textAlign: 'center',
    paddingHorizontal: 0,
    marginHorizontal: 8,
    marginLeft: 1,
  },
  selectedPasscodeBox: {
    borderColor: '#2F4D8B',
    borderWidth: 2,
  },
  filledPasscodeBox: {
    borderColor: '#2F4D8B',
    borderWidth: 1,
  },
  filledPasscodeBoxError: {
    borderColor: 'red',
    borderWidth: 2,
  },
  filledPasscodeBoxSuccess: {
    borderColor: '#2F4D8B',
    borderWidth: 2,
  },
  resend: {
    fontSize: 16,
    marginLeft: 54,
    marginBottom: 349,
    width: 267,
    height: 20,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 8,
  },
 
});

const Screen5 = () => {
  const navigation = useNavigation();
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setIsKeyboardOpen(true);
    });

    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setIsKeyboardOpen(false);
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handlePasscodeSuccess = () => {
    navigation.navigate('LastScreen');
  };

  const handlePasscodeFail = () => {
    setAttempts((prevAttempts) => prevAttempts + 1);
    if (attempts + 1 === 2) {
      navigation.navigate('Screen6');
    }
  };

  return (
    <View style={[styles.container, isKeyboardOpen && { paddingTop: 100 }]}>
      <Image
        style={styles.logo}
        source={require('./GAT.jpeg')}
      />
      <PasscodeScreen onSuccess={handlePasscodeSuccess} onFail={handlePasscodeFail} />
    </View>
  );
};

const PasscodeScreen = ({ onSuccess, onFail }) => {
  const [passcode, setPasscode] = useState(['', '', '', '']);
  const [passcodeError, setPasscodeError] = useState(false);
  const [selectedBox, setSelectedBox] = useState(null);
  const passcodeInputs = useRef([]);
  const [hoveredBox, setHoveredBox] = useState(null);

  const handlePasscodeChange = (index, value) => {
    const updatedPasscode = [...passcode];
    updatedPasscode[index] = value;
    setPasscode(updatedPasscode);
    setSelectedBox(index);

    if (value && index < passcodeInputs.current.length - 1) {
      passcodeInputs.current[index + 1].focus();
    }
  };

  const handleVerifyPasscode = () => {
    const correctPasscode = '1234'; // Replace with your own passcode
    if (passcode.join('') === correctPasscode) {
      console.log('Success: Passcode verified!');
      setPasscodeError(false);
      onSuccess(); // Navigate to the LastScreen on correct passcode
    } else {
      console.log('Error: Passcode verification failed!');
      setPasscodeError(true);
      onFail(); // Navigate to the BYEScreen on incorrect passcode
    }
  };

  return (
    <View style={styles.regview}>
      <Text style={styles.enter}>Enter 4 digit code sent to</Text>
      <Text style={styles.prevnum}>Num</Text>

      <View style={styles.passcodeContainer}>
        {passcode.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => (passcodeInputs.current[index] = ref)}
            secureTextEntry={false}
            keyboardType="numeric"
            maxLength={1}
            value={digit}
            onChangeText={(text) => handlePasscodeChange(index, text)}
            style={[
              styles.passcodeBox,
              digit && styles.filledPasscodeBox,
              selectedBox === index && styles.selectedPasscodeBox,
              passcodeError && digit && styles.filledPasscodeBoxError,
              hoveredBox === index && styles.filledPasscodeBoxSuccess,
            ]}
            autoFocus={index === 0}
            onKeyPress={({ nativeEvent }) => {
              if (nativeEvent.key === 'Backspace' && !digit && index > 0) {
                passcodeInputs.current[index - 1].focus();
              }
            }}
            onFocus={() => setHoveredBox(index)}
            onBlur={() => setHoveredBox(null)}
          />
        ))}
      </View>

      {passcodeError && <Text style={styles.errorText}>Incorrect passcode entered. Try Again!</Text>}

      <TouchableOpacity
        style={[styles.button, passcode.join('').length === 4 && { backgroundColor: '#2F4D8B' }]}
        onPress={handleVerifyPasscode}
        disabled={passcode.join('').length !== 4}
      >
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
      <Text style={styles.resend }>You can resend the passcode after 24 seconds</Text>
    </View>
  );
};

export default Screen5;
