import * as MediaLibrary from "expo-media-library";
import React, { useEffect } from "react";
import { ActivityIndicator, Button, FlatList, Image, StyleSheet, View } from "react-native";
import StyledText from "../src/components/StyledText";
import useMergeState from "../src/customHooks/mergeState";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CloudOff, Tick } from "../src/Svgs/svg";
import * as FileSystem from "expo-file-system";

export default function gallery() {
  const [state, setMergeState] = useMergeState({
    data: [],
    hasNextPage: true,
    totalCount: 0,
    synced_asset_ids: null,
    asset_being_synced: null,
    assets_fetched: false,
  });

  getAssets = () =>
    new Promise(async (resolve, reject) => {
      try {
        let result = await MediaLibrary.getAssetsAsync({
          first: Number.MAX_SAFE_INTEGER,
          // after: after.assetId
          // sortBy: ['creationTime', true]
        }),
        data = [...state.data, ...result.assets], 
        first_asset_found = false,
        first_asset = await AsyncStorage.getItem("first_asset");
        for (let i = data.length - 1; i >= 0; i--) {
          if (!first_asset_found && data[i].id == first_asset) {
            first_asset_found = true;
            if(state.synced_asset_ids.includes(data[i].id)) {
              data[i].uploaded = true;
            }
          } else if (!first_asset_found) {
            data[i].skip = true;
          } else if(state.synced_asset_ids.includes(data[i].id)) {
            data[i].uploaded = true;
          }
        }
        setMergeState({ data, assets_fetched: true });
        resolve();
        createUploadTask();
      } catch (error) {
        console.error(error);
        reject(error);
      }
    });

  getSyncedAssetIds = () =>
    new Promise(async (resolve, reject) => {
      try {
        let synced_asset_ids = await AsyncStorage.getItem("synced_asset_ids");
        setMergeState({ synced_asset_ids: synced_asset_ids ? synced_asset_ids.split(",") : [] });
        resolve();
      } catch (error) {
        console.error(error);
        setMergeState({ synced_asset_ids: [] });
        resolve();
      }
    });

  useEffect(() => {
    if (state.data.length === 0 && state.synced_asset_ids !== null && !state.assets_fetched) {
      getAssets();
    }
  }, [state.synced_asset_ids]);

  createUploadTask = async () => {
    try {
      let value = await AsyncStorage.getItem("server_ip"),
        port = await AsyncStorage.getItem("server_port"),
        data = state.data;
      for (let i = data.length - 1; i >= 0; i--) {
        if (data[i].skip || data[i].uploaded) {
          continue;
        }
        data[i].uploading = true;
        setMergeState({ data });
        let asset_details = await MediaLibrary.getAssetInfoAsync(data[i].id);
        await FileSystem.uploadAsync(`http://${value}:${port}/upload`, asset_details.localUri, {
          fieldName: "file",
          httpMethod: "POST",
          sessionType: FileSystem.FileSystemSessionType.BACKGROUND,
          uploadType: FileSystem.FileSystemUploadType.MULTIPART,
          headers: {
            id: asset_details.id,
            filename: asset_details.filename
          },
          parameters: {
            id: asset_details.id,
            filename: asset_details.filename
          },
        });
        data[i].uploading = false;
        data[i].uploaded = true;
        let synced_asset_ids = await AsyncStorage.getItem("synced_asset_ids");
        console.log("synced_asset_ids -> ", synced_asset_ids);
        if(!synced_asset_ids) synced_asset_ids = [];
        else synced_asset_ids = synced_asset_ids.split(",")
        synced_asset_ids.push(data[i].id);
        await AsyncStorage.setItem("synced_asset_ids", synced_asset_ids.join(","));
        setMergeState({ data });
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error Upload', typeof error === "string" ? error : JSON.stringify(error), [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    }
  };

  _initial_requests = async () => {
    await getSyncedAssetIds();
  };

  useEffect(() => {
    _initial_requests();
  }, []);

  return (
    <View style={{ width: "100%", flex: 1, justifyContent: "center", alignItems: "center" }}>
      <StyledText style={{ marginBottom: 20 }}>Gallery</StyledText>
      <FlatList
        data={state.data}
        renderItem={({ item }) => (
          <View onPress={() => setFirstAsset(item)} style={{ width: "20%", height: 80, padding: 2, position: "relative" }}>
            <Image style={{ width: "100%", height: "100%" }} source={{ uri: item.uri }} />
            {item.uploaded ? (
              <View style={{ position: "absolute", bottom: 8, right: 8, width: 24, height: 24 }}>
                <Tick />
              </View>
            ) : item.uploading ? (
              <View style={{ position: "absolute", width: "100%", height: "100%", flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.4)" }}>
                <ActivityIndicator />
              </View>
            ) : item.skip ? (
              <View style={{ position: "absolute", width: "100%", height: "100%", flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.4)" }}>
                <View style={{ width: 32, height: 32 }}>
                  <CloudOff />
                </View>
              </View>
            ) : null}
          </View>
        )}
        keyExtractor={(item) => item.filename}
        numColumns={5}
        style={{ flex: 1 }}
      />
      <Button title="clear" onPress={() => AsyncStorage.clear()}></Button>
    </View>
  );
}

const styles = StyleSheet.create({});
