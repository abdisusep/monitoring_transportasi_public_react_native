import React, { useEffect, useState } from "react";
import { View, ScrollView, ActivityIndicator, Dimensions, Text, RefreshControl } from "react-native";
import { LineChart } from "react-native-chart-kit";
import axios from "axios";

export default LineChartScreen = () => {
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

  const labels = data.jumlah_kendaraan_per_jam.map((item) => item.jam);
  const values = data.jumlah_kendaraan_per_jam.map((item) => item.jumlah);

  return (
    <View style={{ flex: 1, padding: 10, marginTop: 20 }}>
      <ScrollView 
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
        horizontal={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={["#0000ff"]} />
        }
      >
        <Text style={{ fontSize: 18, fontWeight: "bold", textAlign: "center", marginVertical: 10 }}>
          Grafik Jumlah Kendaraan per Jam
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View>
            <LineChart
              data={{
                labels: labels,
                datasets: [{ data: values }],
              }}
              width={Dimensions.get("window").width * 2.5}
              height={300}
              yAxisLabel=""
              chartConfig={{
                backgroundColor: "#1cc910",
                backgroundGradientFrom: "#eff3ff",
                backgroundGradientTo: "#efefef",
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: {
                  borderRadius: 10,
                },
                propsForDots: {
                  r: "5",
                  strokeWidth: "2",
                  stroke: "#ffa726",
                },
              }}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 10,
                alignSelf: "center",
              }}
            />
          </View>
        </ScrollView>
      </ScrollView>
    </View>
  );
};