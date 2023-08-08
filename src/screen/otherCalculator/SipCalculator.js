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

const SipCalculator = () => {
  useEffect(() => {
    // Create the table if it doesn't exist
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS SipCalculatorHistory (id INTEGER PRIMARY KEY AUTOINCREMENT,   totalInvestmentAmount REAL, expectedReturnRate REAL, years INTEGER, months INTEGER, investedAmount REAL, totalProfit REAL, totalReturn REAL)',
        [],
      );
    });
  }, []);
  const navigation = useNavigation();

  const [totalInvestmentAmount, setTotalInvestmentAmount] = useState('');
  const [expectedReturnRate, setExpectedReturnRate] = useState('');
  const [years, setYears] = useState('1');
  const [months, setMonths] = useState('0');
  const [investedAmount, setInvestedAmount] = useState('');
  const [totalProfit, setTotalProfit] = useState('');
  const [totalReturn, setTotalReturn] = useState('');

  // totalInvestmentAmount, expectedReturnRate, years, months, investedAmount, totalProfit, totalReturn

  //   Reset data
  const resetData = () => {
    setTotalInvestmentAmount('');
    setExpectedReturnRate('');
    setYears('1');
    setMonths('0');
    setTotalProfit('');
    setTotalReturn('');
  };

  const calculateSIP = () => {
    // Basic validation
    if (
      totalInvestmentAmount === '' ||
      expectedReturnRate === '' ||
      years === '' ||
      months === ''
    ) {
      Alert.alert('Error', 'Please fill empty fields');
      return;
    }

    // Convert inputs to numbers
    const P = parseFloat(totalInvestmentAmount);
    const i = parseFloat(expectedReturnRate) / 100 / 12;
    const n = parseInt(years) * 12 + parseInt(months);

    // Calculate the maturity amount (M) using the formula
    const M = P * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);

    // Update the state with the calculated values
    setInvestedAmount(P * n);
    const tReturn = M - P * n;
    setTotalProfit(
      tReturn.toLocaleString(undefined, {
        maximumFractionDigits: 0,
      }),
    );
    setTotalReturn(
      M.toLocaleString(undefined, {
        maximumFractionDigits: 0,
      }),
    );
  };

  // Define an async function
  async function delayedAction(delay) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(`Action completed after ${delay} ms`);
      }, delay);
    });
  }

  // Another async function that uses await
  async function main() {
    try {
      const result1 = await delayedAction(400); // Wait for seconds
      calculateSIP();

      const result2 = await delayedAction(900); // Wait for second
      insertData();
    } catch (error) {
      console.error('An error occurred:', error);
    }
  }

  const insertData = () => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO SipCalculatorHistory (totalInvestmentAmount, expectedReturnRate, years, months, investedAmount, totalProfit, totalReturn) VALUES (?, ?, ?, ? , ?, ?, ?)',
        [
          totalInvestmentAmount,
          expectedReturnRate,
          years,
          months,
          investedAmount,
          totalProfit,
          totalReturn,
        ],
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
    Keyboard.dismiss();
    main();
  };
  // Calculation end

  return (
    <View className="flex-1">
      <CustomTopLayout
        onPress={() => {
          navigation.goBack();
        }}
        name="SIP Calculator"
      />
      <ScrollView>
        <View className="mx-5 mt-2">
          <SubHeading name="Monthly Investment Amount" />
          <KeyboardAwareScrollView>
            <View className=" my-2 border-[1.5px] border-inputBorderColor rounded-lg flex-row items-center justify-between px-5">
              <TextInput
                className="w-full text-blackC"
                value={totalInvestmentAmount}
                onChangeText={text => setTotalInvestmentAmount(text)}
                placeholder="eg. 100000"
                keyboardType="numeric"
                autoComplete="off"
              />
              <Text className="text-blackC">&#8377;</Text>
            </View>
          </KeyboardAwareScrollView>
          <SubHeading name="Expected Return Rate (p.a.)" />
          <View className=" my-2 border-[1.5px] border-inputBorderColor rounded-lg flex-row items-center justify-between px-5">
            <TextInput
              className="w-full text-blackC"
              value={expectedReturnRate}
              onChangeText={text => setExpectedReturnRate(text)}
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
                navigation.navigate('SipCalculatorHistory');
              }}
              srcPath={allImages.History}
            />
          </View>
        </View>

        <View className="h-[200px] w-full rounded-t-[30px] bg-primaryC py-3">
          <Image
            className="w-[135px] h-[5px] self-center mb-6"
            source={allImages.HomeIndicator}
          />

          <View className="flex-row justify-between mx-10 items-center">
            <Text className="text-whiteC pt-2 text-lg ">Invested Amount</Text>
            <Text className="text-primaryHeading text-lg ">
              &#8377;{' '}
              {investedAmount.toLocaleString(undefined, {
                maximumFractionDigits: 0,
              })}
            </Text>
          </View>
          <View className="flex-row justify-between mx-10 items-center">
            <Text className="text-whiteC pt-2 text-lg ">Total Profit</Text>
            <Text className="text-primaryHeading text-lg ">
              &#8377; {totalProfit}
            </Text>
          </View>
          <View className="flex-row justify-between mx-10 items-center">
            <Text className="text-whiteC pt-2 text-lg ">Total Return</Text>
            <Text className="text-primaryHeading text-lg ">
              &#8377; {totalReturn}
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default SipCalculator;
