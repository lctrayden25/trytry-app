import { Tabs } from "expo-router";
import React from "react";

const TabLayout = () => {
	return (
		<Tabs
			screenOptions={{
				headerStyle: {
					backgroundColor: "#e7305b", // Your desired color
				},
				tabBarStyle: {
					backgroundColor: "#e7305b",
					borderRadius: 40,
					marginHorizontal: 20,
					marginBottom: 40,
					height: 70,
					paddingBottom: 30,
					paddingTop: 10,
					position: "absolute",
					boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.1)",
				},
				tabBarActiveTintColor: "white",
				tabBarInactiveTintColor: "black",
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: "常用路線",
				}}
			/>
			<Tabs.Screen
				name="bus"
				options={{
					title: "九巴列表",
				}}
			/>
		</Tabs>
	);
};

export default TabLayout;
