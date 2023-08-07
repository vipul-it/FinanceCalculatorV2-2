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

const RdCalculator = () => {
  useEffect(() => {
    // Create the table if it doesn't exist
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS RdCalculatorHistory2 (id INTEGER PRIMARY KEY AUTOINCREMENT,  monthlyAmount REAL, interest REAL, years REAL, months REAL, maturityAmount REAL, totalInterest REAL, totalInvestment REAL)',
        [],
      );
    });
  }, []);
  const navigation = useNavigation();

  const [monthlyAmount, setMonthlyAmount] = useState('');
  const [interest, setInterest] = useState('');
  const [years, setYears] = useState('1');
  const [months, setMonths] = useState('0');
  const [maturityAmount, setMaturityAmount] = useState('');
  const [totalInterest, setTotalInterest] = useState('');
  const [totalInvestment, setTotalInvestment] = useState('');

  // monthlyAmount, interest, years, months maturityAmount, totalInterest, totalInvestment

  //   Reset data
  const resetData = () => {
    setMonthlyAmount('');
    setInterest('');
    setYears('1');
    setMonths('0');
    setMaturityAmount('');
    setTotalInterest('');
    setTotalInvestment('');
  };

  const handleCalculateButton = () => {
    Keyboard.dismiss();
    calculateRD();
  };
  const calculateRD = () => {
    const P = parseFloat(monthlyAmount);
    const i = parseFloat(interest) / 400;
    const n = parseFloat(years) * 4 + parseFloat(months);
    const t = parseFloat(years) + parseFloat(months) / 12;
    const N = 12;

    const M = (P * (Math.pow(1 + i, n) - 1)) / (1 - Math.pow(1 + i, -1 / 3));
    const A = P * Math.pow(1 + (i * 400) / N, N * t);
    const totalInv = P * 12 * t;
    const totalInt = M - totalInv;

    setMaturityAmount(M.toLocaleString(undefined, {
      maximumFractionDigits: 0,
    }),);
    setTotalInterest(totalInt.toLocaleString(undefined, {
      maximumFractionDigits: 0,
    }),);
    setTotalInvestment(totalInv.toLocaleString(undefined, {
      maximumFractionDigits: 0,
    }),);

    insertData();
  };

  const insertData = () => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO RdCalculatorHistory2 (monthlyAmount, interest, years, months, maturityAmount, totalInterest, totalInvestment) VALUES (?, ?, ?, ? , ?, ?, ?)',
        [
          monthlyAmount,
          interest,
          years,
          months,
          maturityAmount,
          totalInterest,
          totalInvestment,
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

  // Calculation end

  return (
    <View className="flex-1">
      <CustomTopLayout
        onPress={() => {
          navigation.goBack();
        }}
        name="RD Calculator"
      />
      <ScrollView>
        <View className="mx-5 mt-2">
          <SubHeading name="Monthly Amount" />
          <KeyboardAwareScrollView>
            <View className=" my-2 border-[1.5px] border-inputBorderColor rounded-lg flex-row items-center justify-between px-5">
              <TextInput
                className="w-full text-blackC"
                value={monthlyAmount}
                onChangeText={setMonthlyAmount}
                placeholder="eg. 100000"
                keyboardType="numeric"
                autoComplete='off'
              />
              <Text className="text-blackC">&#8377;</Text>
            </View>
          </KeyboardAwareScrollView>
          <SubHeading name="Interest Rate" />
          <View className=" my-2 border-[1.5px] border-inputBorderColor rounded-lg flex-row items-center justify-between px-5">
            <TextInput
              className="w-full text-blackC"
              value={interest}
              onChangeText={setInterest}
              placeholder="eg. 8"
              keyboardType="numeric"
              autoComplete='off'
            />
            <Text className="text-blackC">&#37;</Text>
          </View>
          <SubHeading name="Time Period" />
          <View className=" my-2 border-[1.5px] border-inputBorderColor rounded-lg flex-row items-center justify-between px-5">
            <TextInput
              className="w-[25%] text-blackC"
              value={years}
              onChangeText={setYears}
              placeholder="e.g. 5"
              keyboardType="numeric"
              autoComplete='off'
            />
            <Text className="text-blackC">Years</Text>
          </View>
          <View className=" my-2 border-[1.5px] border-inputBorderColor rounded-lg flex-row items-center justify-between px-5">
            <TextInput
              className="w-[25%] text-blackC"
              value={months}
              onChangeText={setMonths}
              placeholder="e.g. 5"
              keyboardType="numeric"
              autoComplete='off'
            />
            <Text className="text-blackC">Months</Text>
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
                navigation.navigate('RdCalculatorHistory');
              }}
              srcPath={allImages.History}
            />
          </View>
        </View>

        <View className="h-[250px] w-full rounded-t-[30px] bg-primaryC py-3">
          <Image
            className="w-[135px] h-[5px] self-center mb-6"
            source={allImages.HomeIndicator}
          />

          <View className="flex-row justify-between mx-10 items-center">
            <Text className="text-whiteC pt-2 text-lg ">Invested Amount</Text>
            <Text className="text-primaryHeading text-lg ">
              &#8377; {totalInvestment}
            </Text>
          </View>
          <View className="flex-row justify-between mx-10 items-center">
            <Text className="text-whiteC pt-2 text-lg ">Total Interest</Text>
            <Text className="text-primaryHeading text-lg ">
              &#8377; {totalInterest}
            </Text>
          </View>
          <View className="flex-row justify-between mx-10 items-center">
            <Text className="text-whiteC pt-2 text-lg ">Maturity Amount</Text>
            <Text className="text-primaryHeading text-lg ">
              &#8377; {maturityAmount}
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default RdCalculator;
