import {StyleSheet, Text, View, TextInput, StatusBar} from 'react-native';
import React from 'react';
import SQLite from 'react-native-sqlite-storage';
import {Formik} from 'formik';
import {number, object, string} from 'yup';

type Props = {};

const db = SQLite.openDatabase(
  {
    name: 'test2.db',
    location: 'default',
  },
  () => {
    console.log('Database opened successfully');
  },
  error => {
    console.error('Failed to open database: ', error);
  },
);

const validationSchema = object().shape({
  amount: number().required(),
  listName: string().required(),
});

const Received = ({navigation}: any, props: Props) => {
  const initialValues = {
    amount: '',
    listName: '',
    info: '',
    status: 'Received',
  };

  const handleFormSubmit = (values: any) => {
    db.transaction((tx: any) => {
      tx.executeSql(
        'INSERT INTO expenses (amount, listName, info, date, status) VALUES (?, ?, ?, ?, ?)',
        [
          values.amount,
          values.listName,
          values.info,
          new Date(),
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

  db.transaction((tx: any) => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS expenses (id INTEGER PRIMARY KEY AUTOINCREMENT, amount REAL, listName TEXT, info TEXT, date TEXT, status TEXT)',
      [],
      (_: any, result: any) => {
        console.log('Table created successfully');
      },
      (error: any) => {
        console.error('Failed to create table: ', error);
      },
    );
  });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleFormSubmit}
      validationSchema={validationSchema}>
      {({handleChange, handleSubmit, values}) => (
        <View style={{flex: 1}}>
          <StatusBar barStyle="light-content" backgroundColor="#98D8AA" />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 10,
            }}>
            <Text style={{width: '50%'}}>จำนวนเงิน</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange('amount')}
              value={values.amount}
              textAlign="right"
              keyboardType="numeric"
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 10,
            }}>
            <Text>ชื่อรายการ</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange('listName')}
              value={values.listName}
              textAlign="right"
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 10,
            }}>
            <Text>วันที่</Text>
            <Text>{new Date().toString()}</Text>
          </View>
          <View style={{padding: 10}}>
            <Text>รายละเอียดเพิ่มเติม</Text>
            <TextInput
              style={styles.textarea}
              numberOfLines={4}
              multiline={true}
              onChangeText={handleChange('info')}
              textAlignVertical="top"
              textAlign="left"
            />
          </View>
          <View
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 0,
              flexDirection: 'row',
              justifyContent: 'center',
              padding: 5,
              backgroundColor: '#92CEA8',
            }}>
            <Text
              style={{fontSize: 20, color: '#ffffff'}}
              onPress={handleSubmit}>
              บันทึก
            </Text>
          </View>
        </View>
      )}
    </Formik>
  );
};

export default Received;

const styles = StyleSheet.create({
  input: {
    width: '50%',
    borderWidth: 1,
  },
  textarea: {
    borderWidth: 1,
  },
});
