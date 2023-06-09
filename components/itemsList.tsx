import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const itemsList = (props: any) => {
  const {value} = props.value;
  return (
    <View
      style={{
        padding: 5,
        margin: 2,
        flex: 0.7,
      }}>
      <Text style={{color: 'black', fontSize: 20, paddingLeft: 5}}>
        {value}
      </Text>
    </View>
  );
};

export default itemsList;

const styles = StyleSheet.create({});
