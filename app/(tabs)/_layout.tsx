import { Tabs } from "expo-router";
import React from "react";

const TabLayout = () => {
	return (
		<Tabs screenOptions={{ tabBarActiveTintColor: "blue" }}>
			<Tabs.Screen
				name="index"
				options={{
					title: "Home",
					// tabBarIcon: ({ color }) => (
					// 	<FontAwesome size={28} name="home" color={color} />
					// ),
				}}
			/>
			<Tabs.Screen
				name="bus"
				options={{
					title: "Bus",
					// tabBarIcon: ({ color }) => (
					// 	<FontAwesome size={28} name="home" color={color} />
					// ),
				}}
			/>
		</Tabs>
	);
};

export default TabLayout;
