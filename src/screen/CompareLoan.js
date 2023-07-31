import {
  View,
  Text,
  Image,
  SafeAreaView,
  TextInput,
  ScrollView,
  Alert,
  FlatList,
  TouchableOpacity,
  Keyboard,
  StyleSheet,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import CustomTopLayout from './common/CustomTopLayout';
import {allImages} from '../utils/images';
import SubHeading from './common/SubHeading';
import CalculateButton from './common/CalculateButton';
import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase('mydb.db');

const CompareLoan = () => {
  useEffect(() => {
    // Create the table if it doesn't exist
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS CompareLoanHistory (id INTEGER PRIMARY KEY AUTOINCREMENT,  principalAmount1 REAL,interest1 REAL,years1 INTEGER,months1 INTEGER,principalAmount2 REAL,interest2 REAL,years2 INTEGER,months2 INTEGER,emi1 REAL,emi2 REAL,interestPayable1 REAL,interestPayable2 REAL,totalPayable1 REAL,totalPayable2 REAL, emiDiff REAL, interestPayDiff REAL, totalPayDiff REAL)',
        [],
      );
    });
  }, []);

  const navigation = useNavigation();

  const [principalAmount1, setPrincipalAmount1] = useState('');
  const [interest1, setInterest1] = useState('');
  const [years1, setYears1] = useState('1');
  const [months1, setMonths1] = useState('0');
  const [principalAmount2, setPrincipalAmount2] = useState('');
  const [interest2, setInterest2] = useState('');
  const [years2, setYears2] = useState('1');
  const [months2, setMonths2] = useState('0');
  const [emi1, setEMI1] = useState('');
  const [emi2, setEMI2] = useState('');
  const [interestPayable1, setInterestPayable1] = useState('');
  const [interestPayable2, setInterestPayable2] = useState('');
  const [totalPayable1, setTotalPayable1] = useState('');
  const [totalPayable2, setTotalPayable2] = useState('');
  const [emiDiff, setEmiDiff] = useState('');
  const [interestPayDiff, setInterestPayDiff] = useState('');
  const [totalPayDiff, setTotalPayDiff] = useState('');

  // principalAmount1,interest1,years1,months1,principalAmount2,interest2,years2,months2,emi1,emi2,interestPayable1,interestPayable2,totalPayable1,totalPayable2, emiDiff, interestPayDiff, totalPayDiff

  const resetData = () => {
    setPrincipalAmount1('');
    setPrincipalAmount2('');
    setInterest1('');
    setInterest2('');
    setYears1('1');
    setYears2('1');
    setMonths1('0');
    setMonths2('0');
    setEMI1('');
    setEMI2('');
    setInterestPayable1('');
    setTotalPayable2('');
    setEmiDiff('');
    setInterestPayDiff('');
    setTotalPayDiff('');
  };

  const calculateLoanComparison = () => {
    const timePeriod1 = years1 * 12 + months1;
    const timePeriod2 = years2 * 12 + months2;

    // Loan 1 calculations
    const monthlyInterestRate1 = interest1 / 100 / 12;
    const denominator1 = Math.pow(1 + monthlyInterestRate1, timePeriod1);
    const emi1 =
      (principalAmount1 * monthlyInterestRate1 * denominator1) /
      (denominator1 - 1);
    const interestPayable1 = emi1 * timePeriod1 - principalAmount1;
    const totalPayable1 = principalAmount1 * 1 + interestPayable1;

    // Loan 2 calculations
    const monthlyInterestRate2 = interest2 / 100 / 12;
    const denominator2 = Math.pow(1 + monthlyInterestRate2, timePeriod2);
    const emi2 =
      (principalAmount2 * monthlyInterestRate2 * denominator2) /
      (denominator2 - 1);
    const interestPayable2 = emi2 * timePeriod2 - principalAmount2;
    const totalPayable2 =   interestPayable2 + principalAmount2 * 1;

    setEMI1(emi1.toFixed(2));
    setEMI2(emi2.toFixed(2));
    setInterestPayable1(interestPayable1.toFixed(2));
    setInterestPayable2(interestPayable2.toFixed(2));
    setTotalPayable1(parseFloat(totalPayable1).toFixed(2));
    setTotalPayable2(parseFloat(totalPayable2).toFixed(2));

    // calculate diffrence

    const emiDiff = emi1 - emi2;
    const interestPayDiff = interestPayable1 - interestPayable2;
    const totalPayDiff = totalPayable1 - totalPayable2;

    setEmiDiff(emiDiff.toFixed(2));
    setInterestPayDiff(interestPayDiff.toFixed(2));
    setTotalPayDiff(totalPayDiff.toFixed(2));
  };

  const handleCalculateButton = () => {
    // Validate input values
    if (
      !principalAmount1 ||
      !interest1 ||
      !principalAmount2 ||
      !interest2 ||
      !years1 ||
      !months1 ||
      !years2 ||
      !months2
    ) {
      Alert.alert('Validation Error', 'Please enter empty fields.');
      return;
    }
    calculateLoanComparison();
    insertData();
  };
  const insertData = () => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO CompareLoanHistory (principalAmount1,interest1,years1,months1,principalAmount2,interest2,years2,months2,emi1,emi2,interestPayable1,interestPayable2,totalPayable1,totalPayable2, emiDiff, interestPayDiff, totalPayDiff) VALUES (?, ?, ?, ? , ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [
          principalAmount1,
          interest1,
          years1,
          months1,
          principalAmount2,
          interest2,
          years2,
          months2,
          emi1,
          emi2,
          interestPayable1,
          interestPayable2,
          totalPayable1,
          totalPayable2,
          emiDiff,
          interestPayDiff,
          totalPayDiff,
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

  return (
    <>
      <SafeAreaView className="bg-backgroundC flex-1">
        <View>
          <CustomTopLayout
            onPress={() => {
              navigation.navigate('Dashboard');
            }}
            name="Compare Loan"
          />
        </View>
        <View className="mt-[24px] mb-2 flex-row mx-5 items-center justify-between">
          <View className="w-[49%] flex justify-center">
            <Text className="text-whiteC text-center py-2 rounded-md bg-primaryDark">
              Loan 1
            </Text>
          </View>
          <View className="w-[49%] flex justify-center">
            <Text className="text-whiteC text-center py-2 rounded-md bg-primaryDark">
              Loan 2
            </Text>
          </View>
        </View>
        <ScrollView>
          <View>
            <View className="mx-5">
              <View>
                <SubHeading name="Principal Amount" />
                <KeyboardAwareScrollView>
                  <View className="flex-row justify-between">
                    <View className=" my-2 border-[1.5px] border-inputBorderColor rounded-lg w-[49%]  flex-row items-center justify-between px-5">
                      <TextInput
                        className="w-full text-blackC"
                        value={principalAmount1}
                        onChangeText={setPrincipalAmount1}
                        placeholder="eg. 100000"
                        keyboardType="numeric"
                      />
                      <Text className="text-blackC">&#8377;</Text>
                    </View>
                    <View className=" w-[49%] my-2 border-[1.5px] border-inputBorderColor rounded-lg flex-row items-center justify-between px-5">
                      <TextInput
                        className="w-full text-blackC"
                        value={principalAmount2}
                        onChangeText={setPrincipalAmount2}
                        placeholder="eg. 100000"
                        keyboardType="numeric"
                      />
                      <Text className="text-blackC">&#8377;</Text>
                    </View>
                  </View>
                </KeyboardAwareScrollView>
                <SubHeading name="Interest" />
                <View className="flex-row justify-between">
                  <View className=" my-2 border-[1.5px] border-inputBorderColor rounded-lg w-[49%]  flex-row items-center justify-between px-5">
                    <TextInput
                      className="w-full text-blackC"
                      value={interest1}
                      onChangeText={setInterest1}
                      placeholder="eg. 8"
                      keyboardType="numeric"
                    />
                    <Text className="text-blackC">&#37;</Text>
                  </View>
                  <View className=" w-[49%] my-2 border-[1.5px] border-inputBorderColor rounded-lg flex-row items-center justify-between px-5">
                    <TextInput
                      className="w-full text-blackC"
                      value={interest2}
                      onChangeText={setInterest2}
                      placeholder="eg. 8"
                      keyboardType="numeric"
                    />
                    <Text className="text-blackC">&#37;</Text>
                  </View>
                </View>

                <SubHeading name="Time Period" />
                <KeyboardAwareScrollView>
                  <View className="flex-row justify-between">
                    <View className=" my-2 border-[1.5px] border-inputBorderColor rounded-lg w-[49%]  flex-row items-center justify-between px-5">
                      <TextInput
                        className="w-full text-blackC"
                        value={years1}
                        onChangeText={setYears1}
                        placeholder="eg. 5"
                        keyboardType="numeric"
                      />
                      <Text className="text-blackC -ml-7">Years</Text>
                    </View>
                    <View className=" w-[49%] my-2 border-[1.5px] border-inputBorderColor rounded-lg flex-row items-center justify-between px-5">
                      <TextInput
                        className="w-full text-blackC"
                        value={years2}
                        onChangeText={setYears2}
                        placeholder="eg. 5"
                        keyboardType="numeric"
                      />
                      <Text className="text-blackC -ml-7">Years</Text>
                    </View>
                  </View>
                  <View className="flex-row justify-between">
                    <View className=" my-2 border-[1.5px] border-inputBorderColor rounded-lg w-[49%]  flex-row items-center justify-between px-5">
                      <TextInput
                        className="w-full text-blackC"
                        value={months1}
                        onChangeText={setMonths1}
                        placeholder="eg. 5"
                        keyboardType="numeric"
                      />
                      <Text className="text-blackC -ml-9">Months</Text>
                    </View>
                    <View className=" w-[49%] my-2 border-[1.5px] border-inputBorderColor rounded-lg flex-row items-center justify-between px-5">
                      <TextInput
                        className="w-full text-blackC"
                        value={months2}
                        onChangeText={setMonths2}
                        placeholder="eg. 5"
                        keyboardType="numeric"
                      />
                      <Text className="text-blackC -ml-9">Months</Text>
                    </View>
                  </View>
                </KeyboardAwareScrollView>
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
                    navigation.navigate('CompareLoanHistory');
                  }}
                  srcPath={allImages.History}
                />
              </View>
            </View>
            <View className="h-800px] w-full rounded-t-[30px] bg-primaryC py-3">
              <Text className="text-whiteC py-4 text-[14px] text-center">
                Monthly EMI
              </Text>

              <View className="flex-row mr-2 justify-center ">
                <View className="mr-6">
                  <Text className="text-primaryDark text-lg text-center">
                    &#8377; {emi1}
                  </Text>
                </View>
                <View className="border-r-[1px] h-[80%] border-whiteC"></View>

                <View className="ml-6">
                  <Text className="text-primaryDark text-lg text-center">
                    &#8377; {emi2}
                  </Text>
                </View>
              </View>
              <View>
                <Text className="text-red-500 text-xs text-center">
                  Difference : &#8377; {emiDiff}
                </Text>
              </View>
              <Text className="border-whiteC  text-center border-b-[1px]"></Text>

              <Text className="text-whiteC py-4 text-[14px] text-center">
                Interest Payable
              </Text>

              <View className="flex-row mr-2 justify-center ">
                <View className="mr-6">
                  <Text className="text-primaryDark text-lg text-center">
                    &#8377; {interestPayable1}
                  </Text>
                </View>
                <View className="border-r-[1px] h-[80%] border-whiteC"></View>

                <View className="ml-6">
                  <Text className="text-primaryDark text-lg text-center">
                    &#8377; {interestPayable2}
                  </Text>
                </View>
              </View>
              <View>
                <Text className="text-red-500 text-xs text-center">
                  Difference : &#8377; {interestPayDiff}
                </Text>
              </View>
              <Text className="border-whiteC  text-center border-b-[1px]"></Text>

              <Text className="text-whiteC py-4 text-[14px] text-center">
                Total Payment
              </Text>

              <View className="flex-row mr-2 justify-center ">
                <View className="mr-6">
                  <Text className="text-primaryDark text-lg text-center">
                    &#8377; {totalPayable1}
                  </Text>
                </View>
                <View className="border-r-[1px] h-[80%] border-whiteC"></View>

                <View className="ml-6">
                  <Text className="text-primaryDark text-lg text-center">
                    &#8377; {totalPayable2}
                  </Text>
                </View>
              </View>
              <View>
                <Text className="text-red-500 text-xs text-center">
                  Difference : &#8377; {totalPayDiff}
                </Text>
              </View>
              <Text className="border-whiteC  text-center border-b-[1px]"></Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default CompareLoan;
