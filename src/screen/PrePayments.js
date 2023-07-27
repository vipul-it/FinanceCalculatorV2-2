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

const PrePayments = () => {
  const navigation = useNavigation();

  const [amount, setAmount] = useState('');
  const [interest, setInterest] = useState('');
  const [currentEmi, setCurrentEmi] = useState('');
  const [revisedInterest, setRevisedInterest] = useState('');
  const [newEmi, setNewEmi] = useState('');
  const [oldEmi, setOldEmi] = useState('');
  const [newTenure, setNewTenure] = useState('');
  const [oldTenure, setOldTenure] = useState('');
  const [emiDifference, setEmiDifference] = useState('');
  const [tenureDifference, setTenureDifference] = useState('');
  const [prePayment, setPrePayment] = useState('');


  // amount interest currentEmi revisedIntrest

  const [value, setValue] = useState(0);
  const renderItem = item => {
    return (
      <View>
        <Text className="my-4 px-3">{item.label}</Text>
        {item.value === value}
      </View>
    );
  };

  const resetDataROI = () => {
    setAmount('');
    setInterest('');
    setCurrentEmi('');
    setRevisedInterest('');
    setNewEmi('');
    setOldEmi('');
    setNewTenure('');
    setOldTenure('');
    setEmiDifference('');
    setTenureDifference('');
    
  };
  const resetDataPRI = () => {
    setAmount('');
    setInterest('');
    setCurrentEmi('');
    setPrePayment('');
    setNewEmi('');
    setOldEmi('');
    setNewTenure('');
    setOldTenure('');
    setEmiDifference('');
    setTenureDifference('');
    
  };

  const dummyData = [
    {
      title: 'Pre payment',
      id: 1,
    },
    {
      title: 'ROI Change',
      id: 2,
    },
  ];

  const [selectedcolor, setSelected] = useState(1);


  const calculatePrePaymentROI = () => {
    // Convert input values to numbers
    const loanAmount = parseFloat(amount);
    const initialInterest = parseFloat(interest);
    const initialEmi = parseFloat(currentEmi);
    const revisedInterestRate = parseFloat(revisedInterest);

    // Calculate old tenure (months) and EMIs
    const oldTenureMonths = Math.ceil(loanAmount / (initialEmi - (loanAmount * (initialInterest / 1200))));
    const oldEmiAmount = Math.ceil((loanAmount * (initialInterest / 1200)) + initialEmi);

    // Calculate new tenure (months) and EMIs
    const newTenureMonths = Math.ceil(loanAmount / (initialEmi - (loanAmount * (revisedInterestRate / 1200))));
    const newEmiAmount = Math.ceil((loanAmount * (revisedInterestRate / 1200)) + initialEmi);

    // Calculate difference between old and new EMIs and tenures
    const emiDifference =   newEmiAmount - oldEmiAmount;
    const tenureDifference =   newTenureMonths - oldTenureMonths;

    // Update state with calculated values
    setNewEmi(newEmiAmount.toString());
    setOldEmi(oldEmiAmount.toString());
    setNewTenure(newTenureMonths.toString());
    setOldTenure(oldTenureMonths.toString());
    setEmiDifference(emiDifference.toString());
    setTenureDifference(tenureDifference.toString());
  };

  const calculatePrePayment = () => {
    // Convert input values to appropriate data types
    const loanAmount = parseFloat(amount);
    const interestRate = parseFloat(interest);
    const currentMonthlyEmi = parseFloat(currentEmi);
    const prePaymentAmount = parseFloat(prePayment);

    // Calculate old tenure and old EMI
    const oldTenureMonths = Math.ceil(loanAmount / currentMonthlyEmi);
    const oldEmiAmount = loanAmount / oldTenureMonths;

    // Calculate new tenure and new EMI after pre-payment
    const remainingLoanAmount = loanAmount - prePaymentAmount;
    const newTenureMonths = Math.ceil(remainingLoanAmount / oldEmiAmount);
    const newEmiAmount = remainingLoanAmount / newTenureMonths;

    // Calculate the difference between new EMI and old EMI
    const emiDifference = oldEmiAmount - newEmiAmount;

    // Calculate the difference between new tenure and old tenure
    const tenureDifference = oldTenureMonths - newTenureMonths;

    // Set the calculated values in state variables
    setOldEmi(oldEmiAmount.toFixed(2));
    setNewEmi(newEmiAmount.toFixed(2));
    setOldTenure(oldTenureMonths);
    setNewTenure(newTenureMonths);
    setEmiDifference(emiDifference.toFixed(2));
    setTenureDifference(tenureDifference.toString());
  };
  const handleCalculateButtonPRI = () => {
    // Validate input values
    if (!amount || !interest || !currentEmi || !prePayment) {
      Alert.alert('Validation Error', 'Please enter empty fields.');
      return;
    }
    calculatePrePayment();
  };
  const handleCalculateButtonROI = () => {
    // Validate input values
    if (!amount || !interest || !currentEmi || !revisedInterest) {
      Alert.alert('Validation Error', 'Please enter empty fields.');
      return;
    }
    calculatePrePaymentROI();
  };
  
 

  return (
    <>
      <SafeAreaView className="bg-backgroundC flex-1">
        <View>
          <CustomTopLayout
            onPress={() => {
              navigation.navigate('Dashboard');
            }}
            name="Revised EMI & Tenure"
          />
        </View>
        <View className="mt-[20px] flex justify-center items-center">
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={dummyData}
            renderItem={({item, index}) => {
              return (
                <View>
                  <TouchableOpacity
                    style={{
                      borderWidth: 1,
                      borderColor:
                        selectedcolor == item.id ? '#CBCBCB' : '#BDBDBD',
                      width: 90,
                      height: 35,
                      alignSelf: 'center',
                      justifyContent: 'center',
                      borderRadius: 5,
                      backgroundColor:
                        selectedcolor == item.id ? '#1F3CFE' : '#fff',
                    }}
                    onPress={() => {
                      setSelected(item.id);
                    }}>
                    <Text
                      style={{
                        color: selectedcolor == item.id ? '#fff' : '#CBCBCB',
                        fontSize: 13,
                        fontWeight: 500,
                        alignSelf: 'center',
                      }}>
                      {item.title}
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            }}
          />

          <View className="mt-0.5">
            <Text></Text>
          </View>
        </View>
        <ScrollView>
          {selectedcolor == '1' ? (
            <View>
              <View className="mx-5">
                <View>
                  <SubHeading name="Outstanding Amount" />
                  <KeyboardAwareScrollView>
                    <View className=" my-2 border-[1.5px] border-inputBorderColor rounded-lg flex-row items-center justify-between px-5">
                      <TextInput
                        className="w-full text-blackC"
                        value={amount}
                        onChangeText={setAmount}
                        placeholder="eg. 100000"
                        keyboardType="numeric"
                      />
                      <Text className="text-blackC">&#8377;</Text>
                    </View>
                  </KeyboardAwareScrollView>
                  <SubHeading name="Current Intrest Rate" />
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

                  <SubHeading name="Current EMI" />
                  <KeyboardAwareScrollView>
                    <View className=" my-2 border-[1.5px] border-inputBorderColor rounded-lg flex-row items-center justify-between px-5">
                      <TextInput
                        className="w-full text-blackC"
                        value={currentEmi}
                        onChangeText={setCurrentEmi}
                        placeholder="eg. 100000"
                        keyboardType="numeric"
                      />
                      <Text className="text-blackC">&#8377;</Text>
                    </View>
                  </KeyboardAwareScrollView>
                  <SubHeading name="Pre-Payment Amount" />
                  <KeyboardAwareScrollView>
                    <View className=" my-2 border-[1.5px] border-inputBorderColor rounded-lg flex-row items-center justify-between px-5">
                      <TextInput
                        className="w-full text-blackC"
                        value={prePayment}
                        onChangeText={setPrePayment}
                        placeholder="eg. 100000"
                        keyboardType="numeric"
                      />
                      <Text className="text-blackC">&#8377;</Text>
                    </View>
                  </KeyboardAwareScrollView>
                </View>
                <View className="flex-row justify-evenly my-12">
                  <CalculateButton
                    name="Calculate"
                    onPress={handleCalculateButtonPRI}
                    srcPath={allImages.Calculate}
                  />
                  <CalculateButton
                    name="Reset"
                    onPress={resetDataPRI}
                    srcPath={allImages.Reset}
                  />
                </View>
              </View>
              <View className="h-800px] w-full rounded-t-[30px] bg-primaryC py-3">
                <Text className="text-whiteC py-4 text-[12px] text-center">
                  If you want to change EMI then
                </Text>

                <View className="flex-row mr-2 justify-evenly">
                  <View>
                    <Text className="text-whiteC text-lg text-center">
                      New EMI
                    </Text>
                    <Text className="text-primaryDark text-lg text-center">
                      &#8377; {newEmi}
                    </Text>
                  </View>

                  <View>
                    <Text className="text-whiteC text-lg text-center">
                      Old EMI
                    </Text>
                    <Text className="text-primaryDark text-lg text-center">
                      &#8377; {oldEmi}
                    </Text>
                  </View>

                  <View>
                    <Text className="text-whiteC text-lg text-center">
                      Difference
                    </Text>
                    <Text className="text-primaryDark text-lg text-center">
                      &#8377; {emiDifference}
                    </Text>
                  </View>
                </View>
                <Text className="border-whiteC  text-center border-b-[1px]"></Text>
                <Text className="text-whiteC py-4 text-[12px] text-center">
                  If you want to change Tenure then
                </Text>

                <View className="flex-row mr-2 justify-evenly">
                  <View>
                    <Text className="text-whiteC text-lg text-center">
                      New Tenure
                    </Text>
                    <Text className="text-primaryDark text-lg text-center">
                      {newTenure} Months
                    </Text>
                  </View>

                  <View>
                    <Text className="text-whiteC text-lg text-center">
                      Old Tenure
                    </Text>
                    <Text className="text-primaryDark text-lg text-center">
                      {oldTenure} Months
                    </Text>
                  </View>

                  <View>
                    <Text className="text-whiteC text-lg text-center">
                      Difference
                    </Text>
                    <Text className="text-primaryDark text-lg text-center">
                      {tenureDifference} Months
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          ) : selectedcolor == '2' ? (
            <View>
              <View className="mx-5">
                <SubHeading name="Outstanding Amount" />
                <KeyboardAwareScrollView>
                  <View className=" my-2 border-[1.5px] border-inputBorderColor rounded-lg flex-row items-center justify-between px-5">
                    <TextInput
                      className="w-full text-blackC"
                      value={amount}
                      onChangeText={setAmount}
                      placeholder="eg. 100000"
                      keyboardType="numeric"
                    />
                    <Text className="text-blackC">&#8377;</Text>
                  </View>
                </KeyboardAwareScrollView>
                <SubHeading name="Current Intrest Rate" />
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

                <SubHeading name="Current EMI" />
                <KeyboardAwareScrollView>
                  <View className=" my-2 border-[1.5px] border-inputBorderColor rounded-lg flex-row items-center justify-between px-5">
                    <TextInput
                      className="w-full text-blackC"
                      value={currentEmi}
                      onChangeText={setCurrentEmi}
                      placeholder="eg. 100000"
                      keyboardType="numeric"
                    />
                    <Text className="text-blackC">&#8377;</Text>
                  </View>
                </KeyboardAwareScrollView>
                <SubHeading name="Revised Intrest Rate" />
                <View className=" my-2 border-[1.5px] border-inputBorderColor rounded-lg flex-row items-center justify-between px-5">
                  <TextInput
                    className="w-full text-blackC"
                    value={revisedInterest}
                    onChangeText={setRevisedInterest}
                    placeholder="eg. 8"
                    keyboardType="numeric"
                  />
                  <Text className="text-blackC">&#37;</Text>
                </View>

                <View className="flex-row justify-evenly my-12">
                  <CalculateButton
                    name="Calculate"
                    onPress={handleCalculateButtonROI}
                    srcPath={allImages.Calculate}
                  />
                  <CalculateButton
                    name="Reset"
                    onPress={resetDataROI}
                    srcPath={allImages.Reset}
                  />
                </View>
              </View>
              <View className="h-800px] w-full rounded-t-[30px] bg-primaryC py-3">
                <Text className="text-whiteC py-4 text-[12px] text-center">
                  If you want to change EMI then
                </Text>

                <View className="flex-row mr-2 justify-evenly">
                  <View>
                    <Text className="text-whiteC text-lg text-center">
                      New EMI
                    </Text>
                    <Text className="text-primaryDark text-lg text-center">
                      &#8377; {newEmi}
                    </Text>
                  </View>

                  <View>
                    <Text className="text-whiteC text-lg text-center">
                      Old EMI
                    </Text>
                    <Text className="text-primaryDark text-lg text-center">
                      &#8377; {oldEmi}
                    </Text>
                  </View>

                  <View>
                    <Text className="text-whiteC text-lg text-center">
                      Difference
                    </Text>
                    <Text className="text-primaryDark text-lg text-center">
                      &#8377; {emiDifference}
                    </Text>
                  </View>
                </View>
                <Text className="border-whiteC  text-center border-b-[1px]"></Text>
                <Text className="text-whiteC py-4 text-[12px] text-center">
                  If you want to change Tenure then
                </Text>

                <View className="flex-row mr-2 justify-evenly">
                  <View>
                    <Text className="text-whiteC text-lg text-center">
                      New Tenure
                    </Text>
                    <Text className="text-primaryDark text-md text-center">
                    {newTenure} Months
                    </Text>
                  </View>

                  <View>
                    <Text className="text-whiteC text-lg text-center">
                      Old Tenure
                    </Text>
                    <Text className="text-primaryDark text-md text-center">
                      {oldTenure} Months
                    </Text>
                  </View>

                  <View>
                    <Text className="text-whiteC text-lg text-center">
                      Difference
                    </Text>
                    <Text className="text-primaryDark text-md text-center">
                      {tenureDifference} Months
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          ) : null}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default PrePayments;
