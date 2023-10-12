import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, Platform, TextInput } from 'react-native'
import React from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { MagnifyingGlassIcon } from 'react-native-heroicons/outline'
import PackagesComp from '../components/PackagesComp';
import { useNavigation } from '@react-navigation/native';

const ios = Platform.OS=='ios';
const topMargin = ios? 'mt-3': 'mt-10';

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView showsVerticalScrollIndicator={false} className={"space-y-5 "+topMargin}>
        {/* avatar */}
        <View className="mx-5 flex-row justify-between items-center mb-4">
          <Text style={{fontSize: wp(7)}} className="font-bold text-neutral-700">Let's Discover</Text>
          <TouchableOpacity
            onPress={()=> navigation.navigate('BookedPackages')}
          >
            <Image source={require('../../assets/images/avatar.png')} style={{height: wp(12), width: wp(12)}} />
          </TouchableOpacity>
        </View>

        {/* search bar */}
        <View className="mx-5 mb-4">
          <View className="flex-row items-center bg-neutral-100 rounded-full p-4 space-x-2 pl-6">
            <MagnifyingGlassIcon size={20} strokeWidth={3} color="gray" />
            <TextInput
              placeholder='Search destination'
              placeholderTextColor={'gray'}
              className="flex-1 text-base mb-1 pl-1 tracking-wider"
            />
          </View>
        </View>

        {/* packages */}
        <View>
          <PackagesComp />
        </View>

      </ScrollView>
    </SafeAreaView>
  )
}