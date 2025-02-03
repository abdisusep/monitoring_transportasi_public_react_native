import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, Text, FlatList, RefreshControl } from "react-native";
import axios from "axios";

export default CardScreen = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const apiUrl = 'https://api-monitoring-transportasi-public.vercel.app/';

  const fetchData = async () => {
    try {
      const response = await axios.get(apiUrl);
      setData(response.data);
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  if (loading) {
    return <ActivityIndicator style={{ marginTop: 20 }} size="large" color="#0000ff" />;
  }

  return (
    <View style={{ flex: 1, padding: 10, marginTop: 20 }}>
      <Text style={{ fontSize: 18, fontWeight: "bold", textAlign: "center", marginBottom: 10 }}>
        Jumlah Kendaraan per Jam
      </Text>
      <FlatList
        data={data.jumlah_kendaraan_per_jam}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        contentContainerStyle={{ paddingVertical: 10 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={["#0000ff"]} />
        }
        renderItem={({ item }) => (
          <View style={{
            flex: 1,
            margin: 10,
            padding: 20,
            backgroundColor: "#fff",
            borderRadius: 10,
            elevation: 2,
            alignItems: "center",
          }}>
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>{item.jam}</Text>
            <Text>Jumlah: {item.jumlah}</Text>
          </View>
        )}
      />
    </View>
  );
};
