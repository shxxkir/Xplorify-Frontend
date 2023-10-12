import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { destinationData } from '../constants'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { LinearGradient } from 'expo-linear-gradient'
import { HeartIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';

export default function PackagesComp() {
    const navigation = useNavigation();
    
    return (
        <View>
            <Text style={{fontSize: wp(6)}} className='ml-7 mb-5 font-bold text-neutral-700'>Tour Packages</Text>
            <View className="mx-4 flex-row justify-between flex-wrap">
            {
                destinationData.map((item, index)=>{
                    return (
                        <PackageCard navigation={navigation} item={item} key={index} />
                    )
                })
            }
            </View>
        </View>
    )
}

const PackageCard = ({item, navigation})=>{
    const [isFavourite, toggleFavourite] = useState(false);
    return (
        <TouchableOpacity
            onPress={()=> navigation.navigate('PackageScreen', {...item})}
            style={{width: wp(44), height: wp(65)}}
            className="flex justify-end relative p-4 py-6 space-y-2 mb-5">
                <Image
                    source={item.image}
                    style={{width: wp(44), height: wp(65), borderRadius: 35}}
                    className="absolute"
                />

            <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.8)']}
                style={{width: wp(44), height: hp(15), borderBottomLeftRadius: 35, borderBottomRightRadius: 35}}
                start={{x: 0.5, y: 0}}
                end={{x: 0.5, y: 1}}
                className="absolute bottom-0"
            />


            <TouchableOpacity onPress={()=> toggleFavourite(!isFavourite)} style={{backgroundColor: 'rgba(0,0,0,0.15)'}} className="absolute top-1 right-3 rounded-full p-2">
                <HeartIcon size={wp(6)} color={isFavourite? "red": "white"} />
            </TouchableOpacity>

            <Text style={{fontSize: wp(4)}} className="text-white font-semibold">{item.title}</Text>
            <Text style={{fontSize: wp(2.2)}} className="text-white">{item.shortDescription}</Text>

        </TouchableOpacity>
    )
}