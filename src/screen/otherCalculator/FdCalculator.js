import {
  View,
  Text,
  TextInput,
  ScrollView,
  Image,
  Keyboard,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import CustomTopLayout from '../common/CustomTopLayout';
import {useNavigation} from '@react-navigation/native';
import SubHeading from '../common/SubHeading';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import CalculateButton from '../common/CalculateButton';
import {allImages} from '../../utils/images';

import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase('mydb.db');

const FdCalculator = () => {
  useEffect(() => {
    // Create the table if it doesn't exist
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS FdCalculatorHistory (id INTEGER PRIMARY KEY AUTOINCREMENT,  amount REAL, interestRate REAL, years INTEGER, months INTEGER, days INTEGER, maturityAmount REAL)',
        [],
      );
    });
  }, []);

  const navigation = useNavigation();
  const [amount, setAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [years, setYears] = useState('1');
  const [months, setMonths] = useState('0');
  const [days, setDays] = useState('0');
  const [maturityAmount, setMaturityAmount] = useState('0');

  // amount, interestRate, years, months, days, maturityAmount

  //   Reset data
  const resetData = () => {
    setAmount('');
    setInterestRate('');
    setYears('');
    setMonths('');
    setDays('');
    setMaturityAmount('');
  };

  const handleCalculateButton = () => {
    Keyboard.dismiss();
    calculateMaturityAmount();
  };
  const calculateMaturityAmount = () => {
    // Validate input values
    if (!amount || !interestRate || !years) {
      Alert.alert('Validation Error', 'Please enter empty fields.');
      return;
    }

    const principal = parseFloat(amount);
    const rate = parseFloat(interestRate);
    const timeInYears =
      parseFloat(years) + parseFloat(months) / 12 + parseFloat(days) / 365;

    const maturityAmount = principal * Math.pow(1 + rate / 100, timeInYears);
    setMaturityAmount(maturityAmount);

    insertData();
  };

  const insertData = () => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO FdCalculatorHistory (amount, interestRate, years, months, days, maturityAmount) VALUES (?, ?, ?, ? , ?, ?)',
        [amount, interestRate, years, months, days, maturityAmount],
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

  // Calculation end

  return (
    <View className="flex-1">
      <CustomTopLayout
        onPress={() => {
          navigation.goBack();
        }}
        name="FD Calculator"
      />
      <ScrollView>
        <View className="mx-5 mt-2">
          <SubHeading name="Amount" />
          <KeyboardAwareScrollView>
            <View className=" my-2 border-[1.5px] border-inputBorderColor rounded-lg flex-row items-center justify-between px-5">
              <TextInput
                className="w-full text-blackC"
                value={amount}
                onChangeText={setAmount}
                placeholder="eg. 100000"
                keyboardType="numeric"
                autoComplete="off"
              />
              <Text className="text-blackC">&#8377;</Text>
            </View>
          </KeyboardAwareScrollView>
          <SubHeading name="Interest Rate" />
          <View className=" my-2 border-[1.5px] border-inputBorderColor rounded-lg flex-row items-center justify-between px-5">
            <TextInput
              className="w-full text-blackC"
              value={interestRate}
              onChangeText={setInterestRate}
              placeholder="eg. 8"
              keyboardType="numeric"
              autoComplete="off"
            />
            <Text className="text-blackC">&#37;</Text>
          </View>
          <SubHeading name="Time Period" />
          <View className=" my-2 border-[1.5px] border-inputBorderColor rounded-lg flex-row items-center justify-between px-5 pr-12">
            <TextInput
              className="w-full text-blackC"
              value={years}
              onChangeText={setYears}
              placeholder="Years"
              keyboardType="numeric"
              autoComplete="off"
            />
            <Text className="text-blackC ">Years</Text>
          </View>

          <View className=" my-2 border-[1.5px] border-inputBorderColor rounded-lg flex-row items-center justify-between px-5 pr-14">
            <TextInput
              className="w-full text-blackC"
              value={months}
              onChangeText={setMonths}
              placeholder="Months"
              keyboardType="numeric"
              autoComplete="off"
            />
            <Text className="text-blackC ">Months</Text>
          </View>
          <View className=" my-2 border-[1.5px] border-inputBorderColor rounded-lg flex-row items-center justify-between px-5 pr-12">
            <TextInput
              className="w-full text-blackC"
              value={days}
              onChangeText={setDays}
              placeholder="Days"
              keyboardType="numeric"
              autoComplete="off"
            />
            <Text className="text-blackC">Days</Text>
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
                navigation.navigate('FdCalculatorHistory');
              }}
              srcPath={allImages.History}
            />
          </View>
        </View>

        <View className="h-[150px] w-full rounded-t-[30px] bg-primaryC py-3">
          <Image
            className="w-[135px] h-[5px] self-center mb-6"
            source={allImages.HomeIndicator}
          />

          <View className="flex-row justify-between mx-10 items-center">
            <Text className="text-whiteC pt-2 text-lg ">Est. Returns</Text>
            <Text className="text-primaryHeading text-lg ">
              &#8377;{' '}
              {(maturityAmount - amount).toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })}
            </Text>
          </View>
          <View className="flex-row justify-between mx-10 items-center">
            <Text className="text-whiteC pt-2 text-lg ">Maturity Amount</Text>
            <Text className="text-primaryHeading text-lg ">
              &#8377;{' '}
              {maturityAmount.toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })}
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default FdCalculator;
