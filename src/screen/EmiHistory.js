import {
  View,
  Text,
  Image,
  Alert,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import TopTwoIcon from './common/TopTwoIcon';
import {useNavigation} from '@react-navigation/native';
import {allImages} from '../utils/images';
import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase('mydb.db');

const EmiHistory = () => {
  const navigation = useNavigation();

  const [data, setData] = useState([]);

  // alert(JSON.stringify(data))

  const deleteRecord = id => {
    db.transaction(tx => {
      tx.executeSql('DELETE FROM LoanData WHERE id = ?', [id], (_, result) => {
        if (result.rowsAffected > 0) {
          Alert.alert('Success', 'Record deleted successfully!');
          fetchData();
        } else {
          Alert.alert('Error', 'Failed to delete record!');
        }
      });
    });
  };

  const handleDeleteDatabase = () => {
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete the all Hstory?',
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => deleteAllRecords(),
        },
      ],
      {cancelable: false},
    );
  };

  const deleteAllRecords = () => {
    db.transaction(tx => {
      tx.executeSql('DELETE FROM LoanData', [], (_, result) => {
        if (result.rowsAffected > 0) {
          // Alert.alert('Success', 'All records deleted successfully!');
          fetchData();
        } else {
          Alert.alert('Error', 'Failed to delete records!');
        }
      });
    });
  };

  const fetchData = () => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM LoanData', [], (_, {rows}) => {
        const len = rows.length;
        const tempData = [];

        for (let i = 0; i < len; i++) {
          tempData.push(rows.item(i));
        }

        setData(tempData);
      });
    });
  };

  useEffect(() => {
    fetchData();
  }, []);
  // console.log(JSON.stringify(data));

  const showAlert = () => {
    Alert.alert('Alert', 'History Clear.');
  };
  return (
    <View className="flex-1 bg-whiteC">
      <TopTwoIcon
        name="EMI History"
        onPressRight={handleDeleteDatabase}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      <Text className="py-1"></Text>
      <View className="">
        <ScrollView className="mb-28">
          <View style={{flex: 1}}>
            {data.map(item => (
              <View key={item.id}>
                {/* <Text>Amount: {item.amount}</Text>
                  <Text>Interest: {item.interest}</Text>
                  <Text>Tenure: {item.tenure}</Text>
                  <Text>Monthly EMI: {item.monthlyEMI}</Text>
                  <Text>Total Interest: {item.totalInterest}</Text>
                  <Text>Total Payment: {item.totalPayment}</Text>
                  <Text>
                    Loan Amount Percentage: {item.loanAmountPercentage}
                  </Text>
                  <Text>
                    Total Interest Percentage: {item.totalInterestPercentage}
                  </Text> */}

                <View className="flex-row border-[1px] border-Cgray50 justify-between mx-5 items-center rounded-lg p-4 my-2">
                  <View className="flex-row  items-center">
                    <TouchableOpacity
                      onPress={() => deleteRecord(item.id)}
                      className=" mr-[20px]">
                      <Image
                        className="w-[14px] h-[20px]"
                        style={{tintColor: '#1F3CFE'}}
                        source={allImages.Delete}
                      />
                    </TouchableOpacity>

                    <View>
                      <Text className="text-primaryHeading font-semibold ">
                        &#8377; {item.amount} with {item.interest}% for{' '}
                        {item.tenure} years
                      </Text>
                      <Text className="text-primaryDark font-semibold">
                        7 June 2023, 03:07 pm
                      </Text>
                    </View>
                  </View>
                  <View>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate('EmiDetails', {mydata: item});
                      }}>
                      <Image
                        className="w-6 h-6"
                        source={allImages.RightArrowButton}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default EmiHistory;
