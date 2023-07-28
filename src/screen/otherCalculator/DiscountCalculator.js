import {
  View,
  Text,
  TextInput,
  ScrollView,
  Image,
  Keyboard,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomTopLayout from '../common/CustomTopLayout';
import {useNavigation} from '@react-navigation/native';
import SubHeading from '../common/SubHeading';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import CalculateButton from '../common/CalculateButton';
import {allImages} from '../../utils/images';

import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase('mydb.db');

const DiscountCalculator = () => {
  useEffect(() => {
    // Create the table if it doesn't exist
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS DiscountCalculator (id INTEGER PRIMARY KEY AUTOINCREMENT, priceBeforeDiscount REAL, discountPercent REAL, priceAfterDiscount REAL, youSave REAL)',
        [],
      );
    });
  }, []);

  const navigation = useNavigation();
  const [priceBeforeDiscount, setPriceBeforeDiscount] = useState('');
  const [discountPercent, setDiscountPercent] = useState('');
  const [priceAfterDiscount, setPriceAfterDiscount] = useState('');
  const [youSave, setYouSave] = useState('');

  //   Reset data
  const resetData = () => {
    setPriceBeforeDiscount('');
    setDiscountPercent('');
    setPriceAfterDiscount('');
    setYouSave('');
  };

  // Calculation start
  const calculateDiscount = () => {
    Keyboard.dismiss();
    // Validate input values
    if (!priceBeforeDiscount) {
      Alert.alert('Attention!', 'Please Enter The Price.');
      return;
    }
    if (!discountPercent) {
      Alert.alert('Attention!', 'Please Enter The Discount.');
      return;
    }

    const price = parseFloat(priceBeforeDiscount);
    const discount = parseFloat(discountPercent);

    // Validate numeric input
    if (isNaN(price) || isNaN(discount)) {
      Alert.alert(
        'Validation Error',
        'Please enter valid numeric values for price and discount percentage.',
      );
      return;
    }

    // Calculate price after discount
    const discountAmount = (price * discount) / 100;
    const priceAfter = price - discountAmount;
    const youSave = priceBeforeDiscount - priceAfter;

    // Update state variable
    setPriceAfterDiscount(priceAfter.toFixed(2));
    setYouSave(youSave.toFixed(2));

    insertData();
  };

  const insertData = () => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO DiscountCalculator (priceBeforeDiscount, discountPercent, priceAfterDiscount, youSave) VALUES (?, ?, ?, ?)',
        [priceBeforeDiscount, discountPercent, priceAfterDiscount, youSave],
        // (_, result) => {
        //   if (result.insertId !== undefined) {
        //     Alert.alert('Success', 'Data inserted successfully!');
        //     fetchData();
        //   } else {
        //     Alert.alert('Error', 'Failed to insert data!');
        //   }
        // },
      );
    });
  };
  const handleCalculateButton = () => {
    calculateDiscount();
  };

  // Calculation end

  return (
    <View className="flex-1">
      <CustomTopLayout
        onPress={() => {
          navigation.goBack();
        }}
        name="Discount Calculator"
      />
      <ScrollView>
        <View className="mx-5 mt-2">
          <SubHeading name="Price Before Discount" />
          <KeyboardAwareScrollView>
            <View className=" my-2 border-[1.5px] border-inputBorderColor rounded-lg flex-row items-center justify-between px-5">
              <TextInput
                className="w-full text-blackC"
                value={priceBeforeDiscount}
                onChangeText={text => setPriceBeforeDiscount(text)}
                placeholder="eg. 100000"
                keyboardType="numeric"
                autoComplete="off"
              />
              <Text className="text-blackC">&#8377;</Text>
            </View>
          </KeyboardAwareScrollView>
          <SubHeading name="Discount" />
          <View className=" my-2 border-[1.5px] border-inputBorderColor rounded-lg flex-row items-center justify-between px-5">
            <TextInput
              className="w-full text-blackC"
              value={discountPercent}
              onChangeText={text => setDiscountPercent(text)}
              placeholder="eg. 8"
              keyboardType="numeric"
              autoComplete="off"
            />
            <Text className="text-blackC">&#37;</Text>
          </View>

          <View className="flex-row justify-evenly my-12">
            <CalculateButton
              name="Calculate"
              onPress={handleCalculateButton}
              srcPath={allImages.Calculate}
            />
            <CalculateButton
              name="Reset"
              onPress={resetData}
              srcPath={allImages.Reset}
            />
            <CalculateButton
              name="History"
              onPress={() => {
                navigation.navigate('DiscountHistory');
              }}
              srcPath={allImages.History}
            />
          </View>
        </View>

        <View className="h-[340px] w-full rounded-t-[30px] bg-primaryC py-3">
          <Image
            className="w-[135px] h-[5px] self-center mb-6"
            source={allImages.HomeIndicator}
          />

          <View className="flex-row justify-between mx-10 items-center">
            <Text className="text-whiteC pt-2 text-lg ">
              Price Before Discount
            </Text>
            <Text className="text-primaryHeading text-lg ">
              &#8377; {priceBeforeDiscount}
            </Text>
          </View>
          <View className="flex-row justify-between mx-10 items-center">
            <Text className="text-whiteC pt-2 text-lg ">
              Price After Discount
            </Text>
            <Text className="text-primaryHeading text-lg ">
              &#8377; {priceAfterDiscount}
            </Text>
          </View>
          <View className="flex-row justify-between mx-10 items-center">
            <Text className="text-whiteC pt-2 text-lg ">You Save Total</Text>
            <Text className="text-primaryHeading text-lg ">
              &#8377; {youSave}
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default DiscountCalculator;
