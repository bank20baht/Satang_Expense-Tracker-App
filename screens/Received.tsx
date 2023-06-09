import {
  StyleSheet,
  Text,
  View,
  TextInput,
  StatusBar,
  Pressable,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Formik} from 'formik';
import {number, object, string} from 'yup';
import DateTimePicker from '@react-native-community/datetimepicker';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {openDatabase, createTable} from '../utils/db';
import {formatDate} from '../utils/formatDate';

type Props = {};

const db = openDatabase();

const Received = ({route, navigation}: any, props: Props) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [chooseItem, setChooseItem] = useState('');
  const {value} = route.params || '';
  const initialValues = {
    amount: '',
    info: '',
    status: 'Received',
  };

  const itemListPage = () => {
    navigation.navigate('ListItemRecive');
  };

  useEffect(() => {
    // Update chooseItem when the value from route.params changes
    if (value) {
      setChooseItem(value);
    }
  }, [value]);

  const handleFormSubmit = (values: any) => {
    db.transaction((tx: any) => {
      tx.executeSql(
        'INSERT INTO expenses (amount, listName, info, date, status) VALUES (?, ?, ?, ?, ?)',
        [
          values.amount,
          chooseItem,
          values.info,
          selectedDate.toISOString(),
          values.status,
        ],
        (_: any, result: any) => {
          console.log('Data inserted successfully');
        },
        (error: any) => {
          console.error('Failed to insert data: ', error);
        },
      );
    });
    navigation.navigate('Home');
  };

  const handleDateChange = (event: any, selected: Date | undefined) => {
    const currentDate = selected || selectedDate;
    setShowDatePicker(false);
    setSelectedDate(currentDate);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleFormSubmit}>
      {({handleChange, handleSubmit, values}) => (
        <View
          style={{
            flex: 1,
            //backgroundColor: '#F9FBE7'
            backgroundColor: '#ffbf9b',
          }}>
          <StatusBar barStyle="light-content" backgroundColor="#92CEA8" />
          <View
            style={{
              flex: 0.9,
              backgroundColor: '#ffecc9',
              margin: 10,
              elevation: 5, // Add elevation for the shadow effect
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
            }}>
            <View style={styles.inputContainer}>
              <View style={{flexDirection: 'row', paddingLeft: 5}}>
                <FontAwesome5 name="coins" color={'gray'} size={20} />
                <Text style={styles.label}>จำนวนเงิน</Text>
              </View>
              <TextInput
                style={styles.input}
                onChangeText={handleChange('amount')}
                value={values.amount}
                textAlign="right"
                keyboardType="numeric"
                placeholder="0.00"
                placeholderTextColor="gray"
              />
            </View>
            <View style={styles.lineStyle} />
            <View style={styles.inputContainer}>
              <View style={{flexDirection: 'row', paddingLeft: 5}}>
                <FontAwesome5
                  name="file-invoice-dollar"
                  color={'gray'}
                  size={20}
                />
                <Text style={styles.label}>ชื่อรายการ</Text>
              </View>
              <View style={{flexDirection: 'row', paddingRight: 5}}>
                <View>
                  {chooseItem ? (
                    <Text
                      onPress={itemListPage}
                      style={{paddingRight: 5, color: 'black'}}>
                      {chooseItem}
                    </Text>
                  ) : (
                    <Text
                      onPress={itemListPage}
                      style={{paddingRight: 5, color: 'black'}}>
                      เลือก
                    </Text>
                  )}
                </View>
                <FontAwesome5 name="angle-right" color={'gray'} size={20} />
              </View>
            </View>
            <View style={styles.lineStyle} />
            <View style={styles.inputContainer}>
              <View style={{flexDirection: 'row'}}>
                <AntDesign name="calendar" color={'gray'} size={20} />
                <Text style={styles.label}>วันที่</Text>
              </View>

              <Pressable
                style={{
                  alignContent: 'flex-end',
                  flexDirection: 'row',
                  paddingRight: 5,
                }}
                onPress={() => setShowDatePicker(true)}>
                <Text style={{paddingRight: 5, color: 'black'}}>
                  {formatDate(selectedDate)}
                </Text>
                <FontAwesome5 name="angle-right" color={'gray'} size={20} />
              </Pressable>
            </View>
            {showDatePicker && (
              <DateTimePicker
                value={selectedDate}
                mode="date"
                display="default"
                onChange={handleDateChange}
              />
            )}
            <View style={styles.lineStyle} />
            <View style={{padding: 10}}>
              <View style={{flexDirection: 'row'}}>
                <AntDesign name="profile" color={'gray'} size={20} />
                <Text style={styles.label}>รายละเอียดเพิ่มเติม</Text>
              </View>

              <TextInput
                style={styles.textarea}
                numberOfLines={4}
                multiline={true}
                onChangeText={handleChange('info')}
                textAlignVertical="top"
                textAlign="left"
              />
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <Pressable style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>บันทึก</Text>
            </Pressable>
          </View>
        </View>
      )}
    </Formik>
  );
};

export default Received;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    alignItems: 'center',
  },
  label: {
    width: '50%',
    fontSize: 20,
    paddingLeft: 8,
    color: 'black',
  },
  input: {
    flex: 1,
    padding: 5,
    fontSize: 20,
    color: 'black',
  },
  textarea: {
    padding: 5,
    fontSize: 20,
    borderWidth: 1,
    margin: 5,
    borderColor: 'gray',
    borderRadius: 8,
    backgroundColor: '#F9FBE7',
    color: 'black',
  },
  buttonContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 5,
    backgroundColor: '#92CEA8',
  },
  button: {},
  buttonText: {
    fontSize: 20,
    color: '#ffffff',
  },
  lineStyle: {
    borderWidth: 0.5,
    borderColor: '#ffbf9b',
    margin: 5,
  },
});
