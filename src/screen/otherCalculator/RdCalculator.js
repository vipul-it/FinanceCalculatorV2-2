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
        'CREATE TABLE IF NOT EXISTS RdCalculatorHistory (id INTEGER PRIMARY KEY AUTOINCREMENT,  monthlyAmount REAL, interest REAL, timePeriod REAL, maturityAmount REAL, totalInterest REAL, totalInvestment REAL)',
        [],
      );
    });
  }, []);
  const navigation = useNavigation();

  const [monthlyAmount, setMonthlyAmount] = useState('');
  const [interest, setInterest] = useState('');
  const [timePeriod, setTimePeriod] = useState('');
  const [maturityAmount, setMaturityAmount] = useState('');
  const [totalInterest, setTotalInterest] = useState('');
  const [totalInvestment, setTotalInvestment] = useState('');

  // monthlyAmount, interest, timePeriod, maturityAmount, totalInterest, totalInvestment

  //   Reset data
  const resetData = () => {
    setMonthlyAmount('');
    setInterest('');
    setTimePeriod('');
    setTimePeriod('');
    setMaturityAmount('');
    setTotalInterest('');
    setTotalInvestment('');
  };

  const handleCalculateButton = () => {
    Keyboard.dismiss();
    calculateRD();
  };
  const calculateRD = () => {
    const principal = parseFloat(monthlyAmount) * parseFloat(timePeriod);
    const rate = parseFloat(interest) / 100 / 12;
    const maturityAmount = principal * (1 + rate) * timePeriod + principal;
    const totalInterest = maturityAmount - principal;
    const totalInvestment = parseFloat(monthlyAmount) * parseFloat(timePeriod);
    setMaturityAmount(maturityAmount.toFixed(2));
    setTotalInterest(totalInterest.toFixed(2));
    setTotalInvestment(totalInvestment.toFixed(2));
    insertData();
  };

  const insertData = () => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO RdCalculatorHistory (monthlyAmount, interest, timePeriod, maturityAmount, totalInterest, totalInvestment) VALUES (?, ?, ?, ? , ?, ?)',
        [
          monthlyAmount,
          interest,
          timePeriod,
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
          <SubHeading name="Amount" />
          <KeyboardAwareScrollView>
            <View className=" my-2 border-[1.5px] border-inputBorderColor rounded-lg flex-row items-center justify-between px-5">
              <TextInput
                className="w-full text-blackC"
                value={monthlyAmount}
                onChangeText={setMonthlyAmount}
                placeholder="eg. 100000"
                keyboardType="numeric"
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
            />
            <Text className="text-blackC">&#37;</Text>
          </View>
          <SubHeading name="Time Period" />
          <View className=" my-2 border-[1.5px] border-inputBorderColor rounded-lg flex-row items-center justify-between px-5">
            <TextInput
              className="w-[25%] text-blackC"
              value={timePeriod}
              onChangeText={setTimePeriod}
              placeholder="e.g. 5"
              keyboardType="numeric"
            />
            <Text className="text-blackC">No. of Months</Text>
          </View>
          {/* <View className=" my-2 border-[1.5px] border-inputBorderColor rounded-lg flex-row items-center justify-between px-5">
            <TextInput
              className="w-[25%] text-blackC"
              value={months}
              onChangeText={setMonths}
              placeholder="Months"
              keyboardType="numeric"
            />
            <Text className="text-blackC">Months</Text>
          </View> */}

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
            <Text className="text-whiteC pt-2 text-lg ">Maturity Amount</Text>
            <Text className="text-primaryHeading text-lg ">
              &#8377; {maturityAmount}
            </Text>
          </View>
          <View className="flex-row justify-between mx-10 items-center">
            <Text className="text-whiteC pt-2 text-lg ">Total Interest</Text>
            <Text className="text-primaryHeading text-lg ">
              &#8377; {totalInterest}
            </Text>
          </View>
          <View className="flex-row justify-between mx-10 items-center">
            <Text className="text-whiteC pt-2 text-lg ">Total Investment</Text>
            <Text className="text-primaryHeading text-lg ">
              &#8377; {totalInvestment}
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default RdCalculator;
