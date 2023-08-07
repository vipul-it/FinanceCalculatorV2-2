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
import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import CustomTopLayout from '../common/CustomTopLayout';
import {allImages} from '../../utils/images';
import CalculateButton from '../common/CalculateButton';
import SubHeading from '../common/SubHeading';
import {Dropdown} from 'react-native-element-dropdown';
import DatePicker from 'react-native-date-picker';
import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase('mydb.db');

// Alert.alert(JSON.stringify(data))
const data = [
  {label: 'Monthly', value: '1'},
  {label: 'Quartly', value: '3'},
  {label: 'Half Yearly', value: '6'},
  {label: 'Yearly', value: '12'},
];

const InterestCalculator = () => {
  useEffect(() => {
    // Create the table if it doesn't exist
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS InterestCalculatorHistoryPeriod (id INTEGER PRIMARY KEY AUTOINCREMENT,  amount REAL, interest REAL, compoundInterval REAL, principleAmount REAL, years INTEGER, months INTEGER, totalInterest REAL, totalAmount REAL)',
        [],
      );
    });
  }, []);

  useEffect(() => {
    // Create the table if it doesn't exist
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS InterestCalculatorHistoryDatewise (id INTEGER PRIMARY KEY AUTOINCREMENT,  damount REAL, dinterest REAL, dcompoundInterval REAL, dprincipleAmount REAL, dtotalInterest REAL, dtotalAmount REAL, dyears REAL, dmonths REAL, ddays REAL)',
        [],
      );
    });
  }, []);

  const navigation = useNavigation();

  const [openFromDate, setOpenFromDate] = useState(false);
  const [openToDate, setOpenToDate] = useState(false);

  const [selectedDateFrom, setSelectedDateFrom] = useState(new Date());
  const [selectedDateTo, setSelectedDateTo] = useState(new Date());

  // Format Date From

  const formatSelectedDateFrom = () => {
    const options = {year: 'numeric', month: '2-digit', day: '2-digit'};
    return selectedDateFrom
      .toLocaleDateString(undefined, options)
      .replace(/\//g, '-');
  };
  // Format Date To
  const formatSelectedDateTo = () => {
    const options = {year: 'numeric', month: '2-digit', day: '2-digit'};
    return selectedDateTo
      .toLocaleDateString(undefined, options)
      .replace(/\//g, '-');
  };

  const [amount, setAmount] = useState('');
  const [interest, setInterest] = useState('');
  const [compoundInterval, setCompoundInterval] = useState('1');
  const [principleAmount, setPrincipleAmount] = useState('');
  const [years, setYears] = useState('1');
  const [months, setMonths] = useState('0');
  const [totalInterest, setTotalInterest] = useState('');
  const [totalAmount, setTotalAmount] = useState('');

  const [damount, setDAmount] = useState('');
  const [dinterest, setDInterest] = useState('');
  const [dcompoundInterval, setDCompoundInterval] = useState('1');
  const [dprincipleAmount, setDPrincipleAmount] = useState('');
  const [dtotalInterest, setDTotalInterest] = useState('');
  const [dtotalAmount, setDTotalAmount] = useState('');
  const [dyears, setDYears] = useState('');
  const [dmonths, setDMonths] = useState('');
  const [ddays, setDDays] = useState('');

  // amount, interest, compoundInterval, principleAmount, years, months, totalInterest, totalAmount
  //  damount, dinterest, dcompoundInterval, dprincipleAmount, dtotalInterest, dtotalAmount, dyears, dmonths, ddays,

  const [value, setValue] = useState(1);
  const renderItem = item => {
    return (
      <View>
        <Text className="my-4 px-3">{item.label}</Text>
        {item.value === value}
      </View>
    );
  };
  const resetDataPeriod = () => {
    setAmount('');
    setInterest('');
    setCompoundInterval('1');
    setPrincipleAmount('');
    setYears('1');
    setMonths('0');
    setTotalInterest('');
    setTotalAmount('');
  };
  const resetDataDate = () => {
    setDAmount('');
    setDInterest('');
    setDCompoundInterval('1');
    setDPrincipleAmount('');
    setDTotalInterest('');
    setDTotalAmount('');
  };

  const dummyData = [
    {
      title: 'Period',

      id: 1,
    },
    {
      title: 'Date',

      id: 2,
    },
  ];

  const calculateInterestPeriod = () => {
    // Function to calculate the difference between two dates

    const P = parseFloat(amount);
    const r = parseFloat(interest) / 100;
    const n = parseInt(compoundInterval);
    const t = parseFloat(years) + parseFloat(months) / 12;
    console.log(P, r, n, t);
    console.log(amount.toLocaleString());

    const A = P * Math.pow(1 + r / n, n * t);
    const compoundInterest = A - P;

    setPrincipleAmount(
      P.toLocaleString(undefined, {
        maximumFractionDigits: 0,
      }),
    );

    setTotalInterest(
      compoundInterest.toLocaleString(undefined, {
        maximumFractionDigits: 0,
      }),
    );
    setTotalAmount(
      A.toLocaleString(undefined, {
        maximumFractionDigits: 0,
      }),
    );
  };

  // Date wise calculation
  const calculateInterestDate = () => {
    // Calculate the difference in milliseconds
    const diffInMillis = selectedDateTo - selectedDateFrom;

    // Convert milliseconds to days
    const diffInDays = diffInMillis / (1000 * 60 * 60 * 24);

    // Calculate the years, months, and remaining days
    let dyears = Math.floor(diffInDays / 365);
    let dmonths = Math.floor((diffInDays % 365) / 30);
    let ddays = Math.floor((diffInDays % 365) % 30);
    // console.log('date', dyears, dmonths, ddays);
    setDYears(dyears);
    setDMonths(dmonths);
    setDDays(ddays);

    const P = parseFloat(damount);
    const r = parseFloat(dinterest) / 100;
    const n = parseInt(dcompoundInterval);
    const t =
      parseFloat(dyears) + parseFloat(dmonths) / 12 + parseFloat(ddays) / 30.44;
    console.log(P, r, n, t);
    console.log(P.toLocaleString());

    const A = P * Math.pow(1 + r / n, n * t);
    const compoundInterest = A - P;

    setDPrincipleAmount(
      P.toLocaleString(undefined, {
        maximumFractionDigits: 0,
      }),
    );

    setDTotalInterest(
      compoundInterest.toLocaleString(undefined, {
        maximumFractionDigits: 0,
      }),
    );
    setDTotalAmount(
      A.toLocaleString(undefined, {
        maximumFractionDigits: 0,
      }),
    );
  };

  const handleCalculateButtonPeriod = () => {
    // Validate input values
    if (!amount || !interest) {
      Alert.alert('Validation Error', 'Please enter empty fields.');
      return;
    }
    calculateInterestPeriod();
    insertDataPeriod();
  };
  const handleCalculateButtonDate = () => {
    // Validate input values
    if (!damount || !dinterest) {
      Alert.alert('Validation Error', 'Please enter empty fields.');
      return;
    }
    if (selectedDateFrom.getTime() === selectedDateTo.getTime()) {
      Alert.alert(
        'Validation Error',
        'From Date, To Date are Same. Please Change it.',
      );
      return;
    }
    calculateInterestDate();
    insertDataDate();
  };
  const insertDataPeriod = () => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO InterestCalculatorHistoryPeriod (amount, interest, compoundInterval, principleAmount, years, months, totalInterest, totalAmount) VALUES (?, ?, ?, ? , ?, ?, ?, ?)',
        [
          amount,
          interest,
          compoundInterval,
          principleAmount,
          years,
          months,
          totalInterest,
          totalAmount,
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

  const insertDataDate = () => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO InterestCalculatorHistoryDatewise (damount, dinterest, dcompoundInterval, dprincipleAmount, dtotalInterest, dtotalAmount, dyears, dmonths, ddays) VALUES (?, ?, ?, ? , ?, ?, ?, ?, ?)',
        [
          damount,
          dinterest,
          dcompoundInterval,
          dprincipleAmount,
          dtotalInterest,
          dtotalAmount,
          dyears,
          dmonths,
          ddays,
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

  const [selectedcolor, setSelected] = useState(1);

  return (
    <>
      <SafeAreaView className="bg-backgroundC flex-1">
        <View>
          <CustomTopLayout
            onPress={() => {
              navigation.navigate('Dashboard');
            }}
            name="Interest Calculator"
          />
        </View>
        <View className="flex-row mt-[20px] mb-3">
          <View className=" m-auto py-[3px] px-[3px] bg-[#DFDFDF] rounded-md ">
            <FlatList
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              data={dummyData}
              renderItem={({item, index}) => {
                return (
                  <View className=" flex-row justify-center items-center ">
                    <TouchableOpacity
                      className="duration-700"
                      style={{
                        width: 92,
                        height: 35,
                        paddingVertical: 2,
                        alignSelf: 'center',
                        justifyContent: 'center',
                        borderRadius: 6,
                        backgroundColor:
                          selectedcolor == item.id ? '#FFF' : '#DFDFDF',
                      }}
                      onPress={() => {
                        setSelected(item.id);
                      }}>
                      <Text
                        style={{
                          color: selectedcolor == item.id ? '#000' : '#000',
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
          </View>
        </View>
        <ScrollView>
          {selectedcolor == '1' ? (
            <View>
              <View className="mx-5">
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
                    value={interest}
                    onChangeText={setInterest}
                    placeholder="eg. 8"
                    keyboardType="numeric"
                    autoComplete="off"
                  />
                  <Text className="text-blackC">&#37;</Text>
                </View>
                <SubHeading name="Compound Interval" />
                <View className=" my-2 border-[1.5px] border-inputBorderColor rounded-lg  items-center  px-5">
                  <Dropdown
                    className="w-full my-2 text-blackC"
                    data={data}
                    labelField="label"
                    valueField="value"
                    value={compoundInterval}
                    onChange={item => {
                      setCompoundInterval(item.value);
                    }}
                    renderItem={renderItem}
                  />
                </View>

                <SubHeading name="Time Period" />
                <KeyboardAwareScrollView>
                  <View className=" my-2 border-[1.5px] border-inputBorderColor rounded-lg flex-row items-center justify-between px-5 pr-16">
                    <TextInput
                      className="w-full text-blackC"
                      value={years}
                      onChangeText={setYears}
                      placeholder="eg. 5"
                      keyboardType="numeric"
                      autoComplete="off"
                    />
                    <View className="flex-row">
                      <Text className="text-blackC">Years</Text>
                    </View>
                  </View>
                </KeyboardAwareScrollView>
                <KeyboardAwareScrollView>
                  <View className=" my-2 border-[1.5px] border-inputBorderColor rounded-lg flex-row items-center justify-between px-5 pr-16">
                    <TextInput
                      className="w-full text-blackC"
                      value={months}
                      onChangeText={setMonths}
                      placeholder="eg. 3"
                      keyboardType="numeric"
                      autoComplete="off"
                    />
                    <View className="flex-row">
                      <Text className="text-blackC">Months</Text>
                    </View>
                  </View>
                </KeyboardAwareScrollView>
                <View className="flex-row justify-evenly my-12">
                  <CalculateButton
                    name="Calculate"
                    onPress={handleCalculateButtonPeriod}
                    srcPath={allImages.Calculate}
                  />
                  <CalculateButton
                    name="Reset"
                    onPress={resetDataPeriod}
                    srcPath={allImages.Reset}
                  />
                  <CalculateButton
                    name="History"
                    onPress={() => {
                      navigation.navigate('InterestCalculatorHistoryPeriod');
                    }}
                    srcPath={allImages.History}
                  />
                </View>
              </View>

              <View>
                <View className="h-[240px] w-full rounded-t-[30px] bg-primaryC py-3">
                  <Image
                    className="w-[135px] h-[5px] self-center mb-6"
                    source={allImages.HomeIndicator}
                  />
                  <View className="flex-row justify-between items-center mx-10 ">
                    <Text className="text-whiteC pt-2 text-lg ">
                      Principle Amount
                    </Text>
                    <Text className="text-primaryHeading text-lg ">
                      &#8377; {principleAmount}
                    </Text>
                  </View>
                  <View className="flex-row justify-between items-center mx-10">
                    <Text className="text-whiteC pt-2 text-lg ">
                      Total Interest
                    </Text>
                    <Text className="text-primaryHeading text-lg ">
                      &#8377; {totalInterest}
                    </Text>
                  </View>
                  <View className="flex-row justify-between items-center mx-10">
                    <Text className="text-whiteC pt-2 text-lg ">
                      Total Amount
                    </Text>
                    <Text className="text-primaryHeading text-lg ">
                      &#8377; {totalAmount}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          ) : selectedcolor == '2' ? (
            <View>
              <View className="mx-5">
                <SubHeading name="Amount" />
                <KeyboardAwareScrollView>
                  <View className=" my-2 border-[1.5px] border-inputBorderColor rounded-lg flex-row items-center justify-between px-5">
                    <TextInput
                      className="w-full text-blackC"
                      value={damount}
                      onChangeText={setDAmount}
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
                    value={dinterest}
                    onChangeText={setDInterest}
                    placeholder="eg. 8"
                    keyboardType="numeric"
                  />
                  <Text className="text-blackC">&#37;</Text>
                </View>
                <SubHeading name="Compound Interval" />
                <View className=" my-2 border-[1.5px] border-inputBorderColor rounded-lg  items-center  px-5">
                  <Dropdown
                    className="w-full my-2 text-blackC"
                    data={data}
                    labelField="label"
                    valueField="value"
                    value={dcompoundInterval}
                    onChange={item => {
                      setDCompoundInterval(item.value);
                    }}
                    renderItem={renderItem}
                  />
                </View>

                <DatePicker
                  modal
                  mode="date"
                  open={openFromDate}
                  date={selectedDateFrom}
                  onConfirm={selectedDateFrom => {
                    setOpenFromDate(false);
                    setSelectedDateFrom(selectedDateFrom);
                  }}
                  onCancel={() => {
                    setOpenFromDate(false);
                  }}
                />
                <DatePicker
                  modal
                  mode="date"
                  open={openToDate}
                  date={selectedDateTo}
                  onConfirm={selectedDateTo => {
                    setOpenToDate(false);
                    setSelectedDateTo(selectedDateTo);
                  }}
                  onCancel={() => {
                    setOpenToDate(false);
                  }}
                />
                <SubHeading name="From Date" />
                <KeyboardAwareScrollView>
                  <View className=" my-2 border-[1.5px] border-inputBorderColor rounded-lg flex-row items-center justify-between px-5 pr-12">
                    <TextInput
                      className="w-full text-blackC"
                      value={formatSelectedDateFrom(selectedDateFrom)}
                      placeholder="DD-MM-YYYY"
                      keyboardType="numeric"
                    />
                    <View>
                      <TouchableOpacity
                        className="p-3"
                        title="Open"
                        onPress={() => setOpenFromDate(true)}>
                        <Image
                          className="w-[15px] h-[15px]"
                          source={allImages.Calender}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </KeyboardAwareScrollView>

                <SubHeading name="To Date" />
                <KeyboardAwareScrollView>
                  <View className=" my-2 border-[1.5px] border-inputBorderColor rounded-lg flex-row items-center justify-between px-5 pr-12">
                    <TextInput
                      className="w-full text-blackC"
                      value={formatSelectedDateTo(selectedDateTo)}
                      placeholder="DD-MM-YYYY"
                      keyboardType="numeric"
                    />
                    <View>
                      <TouchableOpacity
                        className="p-3"
                        title="Open"
                        onPress={() => setOpenToDate(true)}>
                        <Image
                          className="w-[15px] h-[15px]"
                          source={allImages.Calender}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </KeyboardAwareScrollView>
                <View className="flex-row justify-evenly my-12">
                  <CalculateButton
                    name="Calculate"
                    onPress={handleCalculateButtonDate}
                    srcPath={allImages.Calculate}
                  />
                  <CalculateButton
                    name="Reset"
                    onPress={resetDataDate}
                    srcPath={allImages.Reset}
                  />
                  <CalculateButton
                    name="History"
                    onPress={() => {
                      navigation.navigate('InterestCalculatorHistoryDate');
                    }}
                    srcPath={allImages.History}
                  />
                </View>
              </View>

              <View>
                <View className="h-[240px] w-full rounded-t-[30px] bg-primaryC py-3">
                  <Image
                    className="w-[135px] h-[5px] self-center mb-6"
                    source={allImages.HomeIndicator}
                  />
                  <View className="flex-row justify-between items-center mx-10 ">
                    <Text className="text-whiteC pt-2 text-lg ">
                      Principle Amount
                    </Text>
                    <Text className="text-primaryHeading text-lg ">
                      &#8377; {dprincipleAmount}
                    </Text>
                  </View>
                  <View className="flex-row justify-between items-center mx-10">
                    <Text className="text-whiteC pt-2 text-lg ">
                      Total Interest
                    </Text>
                    <Text className="text-primaryHeading text-lg ">
                      &#8377; {dtotalInterest}
                    </Text>
                  </View>
                  <View className="flex-row justify-between items-center mx-10">
                    <Text className="text-whiteC pt-2 text-lg ">
                      Total Amount
                    </Text>
                    <Text className="text-primaryHeading text-lg ">
                      &#8377; {dtotalAmount}
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

export default InterestCalculator;
