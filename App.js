import axios from "axios";
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  SafeAreaView,
  FlatList,
} from "react-native";

export default function App() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [offset, setOffset] = useState(1);

  const getData = async () => {
    setLoading(true);

    const params = {};

    if (offset) params.offset = offset;

    try {
      const response = await getApi.getItems(params);
      if (response.results.length > 0) {
        setOffset(offset + 1);
        setDataSource([...dataSource, ...response.results]);
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const getItem = (item) => {
    //Function for click on an item
    alert("Id : " + item.id + " Title : " + item.title);
  };

  const renderFooter = () => {
    return (
      //Footer View with Loader
      <View style={styles.footer}>
        {loading ? (
          <ActivityIndicator color="#3E57FF" style={{ margin: 15 }} size={25} />
        ) : null}
      </View>
    );
  };

  const ItemView = ({ item }) => {
    return (
      // Flat List Item
      <Text style={styles.itemStyle} onPress={() => getItem(item)}>
        {item.id}
        {"."}
        {item.title.toUpperCase()}
      </Text>
    );
  };

  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          marginTop: 10,
          marginBottom: 5,
          height: 0.5,
          width: "100%",
          backgroundColor: "#121212",
          // borderWidth: 2
        }}
      />
    );
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={dataSource}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={ItemSeparatorView}
        renderItem={ItemView}
        ListFooterComponent={renderFooter}
        onEndReached={getData}
        onEndReachedThreshold={0.1}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  footer: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
});

const URL = `https://aboutreact.herokuapp.com/`;
const api = axios.create({
  baseURL: URL,
});

const getApi = {
  getItems: async ({ offset }) => {
    const params = {};
    if (offset) params.offset = offset;

    const response = await api.get("/getpost.php", { params });
    return response.data;
  },
};
