import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FullSizeButton from '../src/components/FullSizeButton';
import CustomRegularText from '../src/components/CustomRegularText';
import { router } from 'expo-router';

export default function select_first_asset() {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      // aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      try {
        await AsyncStorage.setItem('first_asset', result.assets[0].assetId);
        router.push('/gallery');
      } catch (e) {
        // saving error
        console.error(e);
      }
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', width: "100%" }}>
      <CustomRegularText style={{ marginBottom: 100 }}>Select the very first image or video which will be synced with your server, all assets created after the selected asset will be queued for upload</CustomRegularText>
      <FullSizeButton title="Pick an image from camera roll" onPress={pickImage} >Pick an image from camera roll</FullSizeButton>
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
    </View>
  );
}
