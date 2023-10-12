import { View, Text, TouchableOpacity, Image, Alert } from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import React from 'react'
import axios from 'axios'
import { shareAsync } from 'expo-sharing';
import * as Print from 'expo-print';
import { ShareIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import { destinationData } from '../constants'
import { theme } from '../theme';

const BookedPackagesCard = ({ item, getData }) => {
    let url;
    const key = item._id
    const navigation = useNavigation();

    destinationData.map((item1)=>{
        if(item.packageName === item1.title){
            url = item1.image;
        }
    })

    const deleteData = async (id) => {
        Alert.alert(
            'Confirm Deletion',
            'Are you sure you want to delete this package?',
            [
                {
                  text: 'Cancel',
                  style: 'cancel',
                },
                {
                  text: 'Delete',
                  onPress: async () => {
                    await axios.delete(`http://172.28.23.47:3000/package/${id}`)
                    .then(() => {       
                        Alert.alert("Package Details Deleted Successfully")
                        getData();     
                        console.log("Package Details Deleted")
                    })
                    .catch((err) => {
                        Alert.alert("Error occurred while deleting the details")
                        console.error('Error:', err);
                    })
                  },
                },
            ]
        )
        
    }
    const html = `
        <html>
        <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
            <style>
                table {
                    border-collapse: collapse;
                    width: 100%;
                }
                th, td {
                    border: 1px solid #dddddd;
                    text-align: left;
                    padding: 8px;
                }
                tr:nth-child(even) {
                    background-color: #f2f2f2;
                }
            </style>
        </head>
        <body style="text-align: center;">
            <h1 style="font-size: 50px; font-family: Helvetica Neue; font-weight: normal;">
                Tour Package Receipt
                <br>
                <span style="color:red;">ID : ${key}</span>
            </h1>
            <table>
                <tr>
                    <th>Customer Name</th>
                    <th>Email</th>
                    <th>Contact No</th>
                    <th>No of Guests</th>
                    <th>Total</th>
                    <th>Package Name</th>
                </tr>
                <tr>
                    <td>${item.name}</td>
                    <td>${item.email}</td>
                    <td>${item.contact}</td>
                    <td>${item.count}</td>
                    <td>${item.total}</td>
                    <td>${item.packageName}</td>
                </tr>
            </table>
        </body>
        </html>
    `;
    
    const print = async () => {
        // On iOS/android prints the given html. On web prints the HTML from the current page.
        await Print.printAsync({
          html,
          // iOS only
        });
    };
    
    const share = async () => {
        const { uri } = await Print.printToFileAsync({ html });
        console.log('File has been saved to:', uri);
        await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
    }

    return (
        <View className='relative flex bg-white self-center my-3 py-3 px-4 rounded-xl shadow-md' style={{width: wp(90), height:hp(15)}}>
            <TouchableOpacity
                style={{backgroundColor: 'rgba(0,0,0,0.25)'}}
                className="absolute top-2 right-3 rounded-full p-1"
                onPress={() => share()}
            >
                <ShareIcon size={wp(4.5)}/>
            </TouchableOpacity>
            <Image
                source={url}
                className='absolute m-2 rounded-lg'
                style={{width: wp(30), height:hp(13)}}
            />
            <Text className='absolute ml-32 pl-2 mt-1 text-lg font-semibold' style={{width: wp(50)}}>{item.packageName}</Text>
            <Text className='absolute ml-32 pl-2 mt-14'>{item.count} Persons</Text>
            <Text className='absolute ml-32 pl-2 mt-16 pt-2 font-semibold ' style={{color: theme.bg(0.8)}}>${item.total}</Text>
            <View className='relative ml-28 mt-20 flex-row'>
                <TouchableOpacity
                    onPress={() => deleteData(key)}
                    className='absolute bg-red-700 py-1 px-2 rounded items-center right-3'
                    style={{width: wp(15)}}
                >
                    <Text>Delete</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() =>
                        navigation.navigate("UpdatePackage", {...item})
                    }
                    className='absolute py-1 px-2 rounded right-20 items-center'
                    style={{backgroundColor:'rgba(0,200,0,0.8)', width: wp(15)}}
                >
                    <Text>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => print()}
                    className='absolute left-1 py-1 px-2 rounded items-center'
                    style={{backgroundColor:'rgba(0,100,200,1)', width: wp(15)}}
                >
                    <Text>Print</Text>
                </TouchableOpacity>       
            </View>
        </View>
    )
}

export default BookedPackagesCard;