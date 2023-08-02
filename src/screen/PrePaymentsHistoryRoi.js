import {
    View,
    Text,
    Image,
    Alert,
    TouchableOpacity,
    ScrollView,
  } from 'react-native';
  import React, {useEffect, useState} from 'react';
  import {useNavigation} from '@react-navigation/native';
  
  import SQLite from 'react-native-sqlite-storage';
  import TopTwoIcon from './common/TopTwoIcon';
  import { allImages } from '../utils/images';
  
  
  const db = SQLite.openDatabase('mydb.db');
  
  const PrePaymentsHistoryRoi = () => {
    const navigation = useNavigation();
  
    const [data, setData] = useState([]);
  
    // alert(JSON.stringify(data))
  
    const deleteRecord = id => {
      db.transaction(tx => {
        tx.executeSql(
          'DELETE FROM PrePaymentsHistoryRoi WHERE id = ?',
          [id],
          (_, result) => {
            if (result.rowsAffected > 0) {
              Alert.alert('Success', 'Record deleted successfully!');
              fetchData();
            } else {
              Alert.alert('Error', 'Failed to delete record!');
            }
          },
        );
      });
    };
  
    const handleDeleteDatabase = () => {
      Alert.alert(
        'Confirm Deletion',
        'Are you sure you want to delete the all History?',
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
        tx.executeSql('DELETE FROM PrePaymentsHistoryRoi', [], (_, result) => {
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
        tx.executeSql('SELECT * FROM PrePaymentsHistoryRoi', [], (_, {rows}) => {
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
          name="Revised EMI History"
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
                      {/* amount, interest, currentEmi, prePayment, newEmi, oldEmi, newTenure, oldTenure emiDifference, tenureDifference */}
                      <View>
                        <Text className="text-primaryHeading font-semibold ">
                         Outsatandind Amount: &#8377; {item.amount}
                        </Text>
                        <Text className="text-primaryHeading font-semibold ">
                         Current Interest Rate: {item.interest} %
                        </Text>
                        <Text className="text-primaryHeading font-semibold">
                          Current EMI: &#8377; {item.currentEmi}
                        </Text>
                        <Text className="text-primaryHeading font-semibold">
                          Revised Interest Rate: {item.revisedInterest} %
                        </Text>
                        <Text className="text-primaryDark font-semibold">
                          New EMI: &#8377; {item.newEmi}, 
                          Old EMI: &#8377; {item.oldEmi}
                        </Text>
                        <Text className="text-primaryDark font-semibold">
                          EMI Difference: &#8377; {item.emiDifference}
                        </Text>
                        <Text className="text-primaryDark font-semibold">
                          New Tenure: &#8377; {item.newTenure}, 
                          Old Tenure: &#8377; {item.oldTenure}
                        </Text>
                        <Text className="text-primaryDark font-semibold">
                          Tenure Difference: &#8377; {item.tenureDifference}
                        </Text>
                       
                      </View>
                    </View>
                    <View></View>
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      </View>
    );
  };
  
  export default PrePaymentsHistoryRoi;
  