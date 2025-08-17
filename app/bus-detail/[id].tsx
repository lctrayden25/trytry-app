import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { Pressable, Text, View } from "react-native";

const BusDetailScreen = () => {
	const { id } = useLocalSearchParams();
	const router = useRouter();

	return (
		<View className="p-4">
			<Pressable onPress={() => router.back()}>
				<Text>Back</Text>
			</Pressable>
			<Text>{id}</Text>
		</View>
	);
};

export default BusDetailScreen;
