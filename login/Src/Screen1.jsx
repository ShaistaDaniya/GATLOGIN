import React, { useEffect } from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getDataMethod } from './Action';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    width: 223,
    height: 64,
  }
})
const Screen1 = () => {
  const navigation = useNavigation();
  const handlePress = () => {
    navigation.navigate('Screen2');
  };
  const dispatch = useDispatch();
  const dataFromApi = useSelector(state => state.ApiReducer);
  console.log('dataFromRedux' + JSON.stringify(dataFromApi))
  useEffect(() => {
    getData()
  }, [])
  const getData = async () => {
    const res = await fetch('https://fakestoreapi.com/products');
    const data = await res.json();
    console.log('data' + JSON.stringify(data));
    dispatch(getDataMethod())
    // .then(res => res.json())
    // .then(json => console.log(json))

  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePress}>
        <Image
          style={styles.logo}
          source={require('./GAT.jpeg')}
        />
      </TouchableOpacity>
    </View>
  );
};
export default Screen1;