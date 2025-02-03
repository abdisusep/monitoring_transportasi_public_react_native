import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "../screens/HomeScreen";
import BarChartScreen from "../screens/BarChartScreen";
import LineChartScreen from "../screens/LineChartScreen";
import CardScreen from "../screens/CardScreen";

const Tab = createBottomTabNavigator();

export default function AppBottomNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = "home";
            } else if (route.name === "Bar Chart") {
              iconName = "bar-chart";
            } else if (route.name === "Line Chart") {
              iconName = "stats-chart";
            } else if (route.name === "Card") {
              iconName = "list";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "tomato",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Bar Chart" component={BarChartScreen} />
        <Tab.Screen name="Line Chart" component={LineChartScreen} />
        <Tab.Screen name="Card" component={CardScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}