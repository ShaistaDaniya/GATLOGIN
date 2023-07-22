import React, { useState, useRef } from 'react';
import { View, Image, Text, StyleSheet, TextInput, TouchableOpacity, Linking } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 223,
    height: 64,
    flex: 'none',
    order: 0,
    flexGrow: 0,
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
  resend: {
    fontSize: 16,
    marginLeft: 124,
    marginRight: 94,
    marginBottom: 298,
    width: 'auto',
    height: 'auto',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 8,
  },
});

const Screen6 = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('./GAT.jpeg')}
      />
      <PasscodeScreen />
    </View>
  );
};

const PasscodeScreen = () => {
  const [passcode, setPasscode] = useState(['', '', '', '']);
  const [passcodeError, setPasscodeError] = useState(false);
  const [selectedBox, setSelectedBox] = useState(null);
  const passcodeInputs = useRef([]);

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
    } else {
      console.log('Error: Passcode verification failed!');
      setPasscodeError(true);
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
            ]}
            autoFocus={index === 0}
            onKeyPress={({ nativeEvent }) => {  
              if (nativeEvent.key === 'Backspace' && !digit && index > 0) {
                passcodeInputs.current[index - 1].focus();
              }
            }}
          />
        ))}
      </View>

      {passcodeError && <Text style={styles.errorText}>Incorrect passcode entered. Try Again!</Text>}

      <TouchableOpacity style={styles.button} onPress={handleVerifyPasscode}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
      <Text style={styles.resend}>Resend Passcode</Text>
    </View>
  );
};

export default Screen6;