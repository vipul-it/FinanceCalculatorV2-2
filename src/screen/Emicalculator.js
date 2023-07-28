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
} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomTopLayout from './common/CustomTopLayout';
import {useNavigation} from '@react-navigation/native';
import {allImages} from '../utils/images';
import SubHeading from './common/SubHeading';
import CalculateButton from './common/CalculateButton';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {dummyData} from './common/Daymeydata';
import DoughnutChart from './common/DoughnutChart';
import moment from 'moment';

import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase('mydb.db');

// Alert.alert(JSON.stringify(dummyData))

const Emicalculator = () => {
  const navigation = useNavigation();

  useEffect(() => {
    // Create the table if it doesn't exist
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS LoanData (id INTEGER PRIMARY KEY AUTOINCREMENT, amount REAL, interest REAL, tenure INTEGER, monthlyEMI REAL, totalInterest REAL, totalPayment REAL, loanAmountPercentage REAL, totalInterestPercentage REAL)',
        [],
      );
    });
  }, []);

  const [amount, setAmount] = useState('');
  const [interest, setInterest] = useState('');
  const [tenure, setTenure] = useState('');
  const [monthlyEMI, setMonthlyEMI] = useState('');
  const [totalInterest, setTotalInterest] = useState('');
  const [totalPayment, setTotalPayment] = useState('');
  const [loanAmountPercentage, setLoanAmountPercentage] = useState('');
  const [totalInterestPercentage, setTotalInterestPercentage] = useState('');

  // amount interest tenure monthlyEMI totalInterest totalPayment loanAmountPercentage totalInterestPercentage

  const resetData = () => {
    setAmount('');
    setInterest('');
    setTenure('');
    setMonthlyEMI('');
    setTotalInterest('');
    setTotalPayment('');
    setLoanAmountPercentage(0);
    setTotalInterestPercentage(0);
  };

  const calculateLoan = () => {
    // Hide the keyboard
    Keyboard.dismiss();

    const loanAmount = parseFloat(amount);
    const loanInterest = parseFloat(interest) / 100;
    const loanTenure = parseFloat(tenure);

    // Calculating monthly interest rate
    const monthlyInterestRate = loanInterest / 12;

    // Calculating the number of monthly payments
    const numberOfPayments = loanTenure * 12;

    // Calculating the monthly EMI
    const monthlyEMI =
      (loanAmount *
        monthlyInterestRate *
        Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
      (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);

    // Calculating the total payment
    const totalPayment = monthlyEMI * numberOfPayments;

    // Calculating the total interest
    const totalInterest = totalPayment - loanAmount;

    // Calculating the loan amount percentage
    const loanAmountPercentage = (loanAmount / totalPayment) * 100;

    // Calculating the total interest percentage
    const totalInterestPercentage = (totalInterest / totalPayment) * 100;

    setMonthlyEMI(monthlyEMI.toFixed(2));
    setTotalInterest(totalInterest.toFixed(2));
    setTotalPayment(totalPayment.toFixed(2));
    setLoanAmountPercentage(loanAmountPercentage.toFixed(2));
    setTotalInterestPercentage(totalInterestPercentage.toFixed(2));
  };

  const currentDate = moment();
  const formattedTime = currentDate.format('hh:mm a');
  const currentDateFormat = moment().format('DD MMMM');

  const [selectedcolor, setSelected] = useState(1);

  const principleAmount1 = loanAmountPercentage * 1; // Example value for principle amount
  const interestPercent1 = totalInterestPercentage * 1; // Example value for interest

  const chartData = [
    {
      name: 'Amount',
      population: principleAmount1, // Percentage for principle amount
      color: '#00107B',
      legendFontColor: '#00107B',
      legendFontSize: 15,
    },
    {
      name: 'Interest',
      population: interestPercent1, // Percentage for interest
      color: '#1F3CFE',
      legendFontColor: '#00107B',
      legendFontSize: 15,
    },
  ];

  const insertData = () => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO LoanData (amount, interest, tenure, monthlyEMI, totalInterest, totalPayment, loanAmountPercentage, totalInterestPercentage) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [
          amount,
          interest,
          tenure,
          monthlyEMI,
          totalInterest,
          totalPayment,
          loanAmountPercentage,
          totalInterestPercentage,
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
    // Validate input values
    if (!amount || !interest || !tenure) {
      Alert.alert('Validation Error', 'Please enter empty fields.');
      return;
    }
    calculateLoan();
    insertData();
  };

  return (
    <>
      <SafeAreaView className="bg-backgroundC flex-1">
        <View>
          <CustomTopLayout
            onPress={() => {
              navigation.navigate('Dashboard');
            }}
            name="EMI Calculator"
          />
        </View>
        <View>
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={dummyData}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  style={{
                    borderWidth: 1,
                    borderColor:
                      selectedcolor == item.id ? '#CBCBCB' : '#BDBDBD',
                    width: 100,
                    height: 70,
                    alignSelf: 'center',
                    justifyContent: 'center',
                    borderRadius: 9,
                    marginHorizontal: 15,
                    marginTop: 20,
                    backgroundColor:
                      selectedcolor == item.id ? '#1F3CFE' : '#fff',
                  }}
                  onPress={() => {
                    setSelected(item.id);
                  }}>
                  <Image
                    source={item.url}
                    style={{
                      width: 31,
                      height: 24,
                      alignSelf: 'center',
                      resizeMode: 'contain',
                      tintColor: selectedcolor == item.id ? '#fff' : '#CBCBCB',
                    }}
                  />

                  <Text
                    style={{
                      color: selectedcolor == item.id ? '#fff' : '#CBCBCB',
                      marginVertical: 2,
                      fontSize: 13,
                      fontWeight: 500,
                      alignSelf: 'center',
                    }}>
                    {item.title}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />

          <View className="my-1">
            <Text></Text>
          </View>
        </View>
        <ScrollView>
          {selectedcolor == '1' ? (
            <View className="mx-5">
              <SubHeading name="Home Loan Amount" />
              <KeyboardAwareScrollView>
                <View className=" my-2 border-[1.5px] border-inputBorderColor rounded-lg flex-row items-center justify-between px-5">
                  <TextInput
                    className="w-full text-blackC"
                    value={amount}
                    onChangeText={text => setAmount(text)}
                    placeholder="eg. 100000"
                    keyboardType="numeric"
                  />
                  <Text className="text-blackC">&#8377;</Text>
                </View>
              </KeyboardAwareScrollView>
              <SubHeading name="Intrest Rate" />
              <View className=" my-2 border-[1.5px] border-inputBorderColor rounded-lg flex-row items-center justify-between px-5">
                <TextInput
                  className="w-full text-blackC"
                  value={interest}
                  onChangeText={text => setInterest(text)}
                  placeholder="eg. 8"
                  keyboardType="numeric"
                />
                <Text className="text-blackC">&#37;</Text>
              </View>
              <SubHeading name="Loan Tenure" />
              <KeyboardAwareScrollView>
                <View className=" my-2 border-[1.5px] border-inputBorderColor rounded-lg flex-row items-center justify-between px-5 pr-12">
                  <TextInput
                    className="w-full text-blackC"
                    value={tenure}
                    onChangeText={text => setTenure(text)}
                    placeholder="eg. 5"
                    keyboardType="numeric"
                  />
                  <View className="flex-row">
                    <Text className="text-blackC">Years</Text>
                    {/* <Text className="text-grayC">/</Text>
                    <Text className="text-grayC">Months</Text> */}
                  </View>
                </View>
              </KeyboardAwareScrollView>
            </View>
          ) : selectedcolor == '2' ? (
            <View className="mx-5">
              <SubHeading name="Car Loan Amount" />
              <KeyboardAwareScrollView>
                <View className=" my-2 border-[1.5px] border-inputBorderColor rounded-lg flex-row items-center justify-between px-5">
                  <TextInput
                    className="w-full text-blackC"
                    value={amount}
                    onChangeText={text => setAmount(text)}
                    placeholder="eg. 100000"
                    keyboardType="numeric"
                  />
                  <Text className="text-blackC">&#8377;</Text>
                </View>
              </KeyboardAwareScrollView>
              <SubHeading name="Intrest Rate" />
              <View className=" my-2 border-[1.5px] border-inputBorderColor rounded-lg flex-row items-center justify-between px-5">
                <TextInput
                  className="w-full text-blackC"
                  value={interest}
                  onChangeText={text => setInterest(text)}
                  placeholder="eg. 8"
                  keyboardType="numeric"
                />
                <Text className="text-blackC">&#37;</Text>
              </View>
              <SubHeading name="Loan Tenure" />
              <KeyboardAwareScrollView>
                <View className=" my-2 border-[1.5px] border-inputBorderColor rounded-lg flex-row items-center justify-between px-5 pr-12">
                  <TextInput
                    className="w-full text-blackC"
                    value={tenure}
                    onChangeText={text => setTenure(text)}
                    placeholder="eg. 5"
                    keyboardType="numeric"
                  />
                  <View className="flex-row">
                    <Text className="text-blackC">Years</Text>
                    {/* <Text className="text-grayC">/</Text>
                    <Text className="text-grayC">Months</Text> */}
                  </View>
                </View>
              </KeyboardAwareScrollView>
            </View>
          ) : selectedcolor == '3' ? (
            <View className="mx-5">
              <SubHeading name="Personal Loan Amount" />
              <KeyboardAwareScrollView>
                <View className=" my-2 border-[1.5px] border-inputBorderColor rounded-lg flex-row items-center justify-between px-5">
                  <TextInput
                    className="w-full text-blackC"
                    value={amount}
                    onChangeText={text => setAmount(text)}
                    placeholder="eg. 100000"
                    keyboardType="numeric"
                  />
                  <Text className="text-blackC">&#8377;</Text>
                </View>
              </KeyboardAwareScrollView>
              <SubHeading name="Intrest Rate" />
              <View className=" my-2 border-[1.5px] border-inputBorderColor rounded-lg flex-row items-center justify-between px-5">
                <TextInput
                  className="w-full text-blackC"
                  value={interest}
                  onChangeText={text => setInterest(text)}
                  placeholder="eg. 8"
                  keyboardType="numeric"
                />
                <Text className="text-blackC">&#37;</Text>
              </View>
              <SubHeading name="Loan Tenure" />
              <KeyboardAwareScrollView>
                <View className=" my-2 border-[1.5px] border-inputBorderColor rounded-lg flex-row items-center justify-between px-5 pr-12">
                  <TextInput
                    className="w-full text-blackC"
                    value={tenure}
                    onChangeText={text => setTenure(text)}
                    placeholder="eg. 5"
                    keyboardType="numeric"
                  />
                  <View className="">
                    <Text className="text-blackC">Years</Text>
                    {/* <Text className="text-grayC">/</Text>
                    <Text className="text-grayC">Months</Text> */}
                  </View>
                </View>
              </KeyboardAwareScrollView>
            </View>
          ) : selectedcolor == '4' ? (
            <View className="mx-5">
              <SubHeading name="Business Loan Amount" />
              <KeyboardAwareScrollView>
                <View className=" my-2 border-[1.5px] border-inputBorderColor rounded-lg flex-row items-center justify-between px-5">
                  <TextInput
                    className="w-full text-blackC"
                    value={amount}
                    onChangeText={text => setAmount(text)}
                    placeholder="eg. 100000"
                    keyboardType="numeric"
                  />
                  <Text className="text-blackC">&#8377;</Text>
                </View>
              </KeyboardAwareScrollView>
              <SubHeading name="Intrest Rate" />
              <View className=" my-2 border-[1.5px] border-inputBorderColor rounded-lg flex-row items-center justify-between px-5">
                <TextInput
                  className="w-full text-blackC"
                  value={interest}
                  onChangeText={text => setInterest(text)}
                  placeholder="eg. 8"
                  keyboardType="numeric"
                />
                <Text className="text-blackC">&#37;</Text>
              </View>
              <SubHeading name="Loan Tenure" />
              <KeyboardAwareScrollView>
                <View className=" my-2 border-[1.5px] border-inputBorderColor rounded-lg flex-row items-center justify-between px-5 pr-12">
                  <TextInput
                    className="w-full text-blackC"
                    value={tenure}
                    onChangeText={text => setTenure(text)}
                    placeholder="eg. 5"
                    keyboardType="numeric"
                  />
                  <View className="flex-row">
                    <Text className="text-blackC">Years</Text>
                    {/* <Text className="text-grayC">/</Text>
                    <Text className="text-grayC">Months</Text> */}
                  </View>
                </View>
              </KeyboardAwareScrollView>
            </View>
          ) : selectedcolor == '5' ? (
            <View className="mx-5">
              <SubHeading name="Gold Loan Amount" />
              <KeyboardAwareScrollView>
                <View className=" my-2 border-[1.5px] border-inputBorderColor rounded-lg flex-row items-center justify-between px-5">
                  <TextInput
                    className="w-full text-blackC"
                    value={amount}
                    onChangeText={text => setAmount(text)}
                    placeholder="eg. 100000"
                    keyboardType="numeric"
                  />
                  <Text className="text-blackC">&#8377;</Text>
                </View>
              </KeyboardAwareScrollView>
              <SubHeading name="Intrest Rate" />
              <View className=" my-2 border-[1.5px] border-inputBorderColor rounded-lg flex-row items-center justify-between px-5">
                <TextInput
                  className="w-full text-blackC"
                  value={interest}
                  onChangeText={text => setInterest(text)}
                  placeholder="eg. 8"
                  keyboardType="numeric"
                />
                <Text className="text-blackC">&#37;</Text>
              </View>
              <SubHeading name="Loan Tenure" />
              <KeyboardAwareScrollView>
                <View className=" my-2 border-[1.5px] border-inputBorderColor rounded-lg flex-row items-center justify-between px-5 pr-12">
                  <TextInput
                    className="w-full text-blackC"
                    value={tenure}
                    onChangeText={text => setTenure(text)}
                    placeholder="eg. 5"
                    keyboardType="numeric"
                  />
                  <View className="flex-row">
                    <Text className="text-blackC">Years</Text>
                    {/* <Text className="text-grayC">/</Text>
                    <Text className="text-grayC">Months</Text> */}
                  </View>
                </View>
              </KeyboardAwareScrollView>
            </View>
          ) : null}

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
                navigation.navigate('EmiHistory');
              }}
              srcPath={allImages.History}
            />
          </View>

          <View>
            <View className="h-800px] w-full rounded-t-[30px] bg-primaryC py-3">
              <Image
                className="w-[135px] h-[5px] self-center"
                source={allImages.HomeIndicator}
              />
              <Text className="text-whiteC pt-2 text-xl text-center">EMI</Text>
              <Text className="text-whiteC text-2xl text-center">
                &#8377; {monthlyEMI}
              </Text>
              <Text className="border-whiteC mb-4 -mt-4 text-2xl text-center border-b-[0.8px]"></Text>
              <View className="flex-row mr-2 justify-evenly">
                <View>
                  <Text className="text-whiteC text-lg text-center">
                    Principal
                  </Text>
                  <Text className="text-whiteC text-lg text-center">
                    Amount
                  </Text>
                  <Text className="text-whiteC text-xl text-center">
                    {amount}
                  </Text>
                </View>
                <Text className="text-whiteC text-lg text-center">+</Text>
                <View>
                  <Text className="text-whiteC text-lg text-center">
                    Interest
                  </Text>
                  <Text className="text-whiteC text-lg text-center">
                    Payable
                  </Text>
                  <Text className="text-whiteC text-xl text-center">
                    {totalInterest}
                  </Text>
                </View>
                <Text className="text-whiteC text-lg text-center">=</Text>
                <View>
                  <Text className="text-whiteC text-lg text-center">
                    Total Payment
                  </Text>
                  <Text className="text-whiteC text-lg text-center">
                    Payment
                  </Text>
                  <Text className="text-whiteC text-xl text-center">
                    {totalPayment}
                  </Text>
                </View>
              </View>
              <Text className="border-whiteC text-lg text-center border-b-[0.8px]"></Text>

              <View className="flex items-center  py-4">
                <DoughnutChart chartData={chartData} />
              </View>
              <View className="flex-row justify-evenly my-6">
                <CalculateButton
                  name="Details"
                  onPress={() => {
                    navigation.navigate('Detilsshowemi', {
                      montly: monthlyEMI,
                      total: totalPayment,
                      loan: amount,
                      monts: tenure,
                      intrest: interest,
                      totalintrest: totalInterest,
                    });
                  }}
                  srcPath={allImages.Calculate}
                />

                {/* <CalculateButton name="Share" srcPath={allImages.Share} /> */}
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Emicalculator;
