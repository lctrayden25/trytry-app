import { useFetch } from "@/hooks";
import {
	Badge,
	Box,
	Card,
	Center,
	HStack,
	Input,
	InputField,
	Spinner,
	Text,
	VStack,
} from "@gluestack-ui/themed";
import React, { useMemo, useState } from "react";
import { FlatList } from "react-native";

// Interface for KMB Route API response
interface KMBRoute {
	route: string;
	bound: string;
	service_type: string;
	orig_en: string;
	orig_tc: string;
	orig_sc: string;
	dest_en: string;
	dest_tc: string;
	dest_sc: string;
}

interface KMBRouteResponse {
	type: string;
	version: string;
	generated_timestamp: string;
	data: KMBRoute[];
}

const BusTabScreen = () => {
	const { data, loading, error, refetch } = useFetch<KMBRouteResponse>(
		"https://data.etabus.gov.hk/v1/transport/kmb/route/"
	);

	const [searchQuery, setSearchQuery] = useState("");

	// Filter routes based on search query
	const filteredRoutes = useMemo(() => {
		if (!data?.data) return [];
		if (!searchQuery.trim()) return data.data;

		return data.data.filter((route: KMBRoute) =>
			route.route.toLowerCase().includes(searchQuery.toLowerCase())
		);
	}, [data?.data, searchQuery]);

	const renderRouteItem = ({ item }: { item: KMBRoute }) => (
		<Card
			className={`mx-4 mb-3 relative rounded-2xl`}
			variant="elevated"
			size="md"
		>
			<VStack>
				{/* Route Header with gradient accent */}
				<HStack
					justifyContent="space-between"
					alignItems="center"
					className="mb-4"
				>
					<HStack space="md" alignItems="center">
						<Text size="2xl" bold className="text-white">
							{item.route}
						</Text>

						<HStack space="xs">
							<Text size="xs" className="text-gray-400 font-semibold">
								KMB ROUTE
							</Text>
							<Badge
								size="sm"
								variant="outline"
								action={item.bound === "O" ? "success" : "warning"}
								className="self-start ml-2"
							>
								<Text size="xs" bold>
									{item.bound === "O" ? "往程" : "返程"}
								</Text>
							</Badge>
						</HStack>
					</HStack>
				</HStack>

				{/* Route Details with beautiful layout */}
				<HStack space="md">
					{/* Destination */}
					<HStack
						space="md"
						alignItems="center"
						className="bg-emerald-50 rounded-xl p-3"
					>
						<VStack space="xs">
							<Text size="xs" bold className="text-emerald-600">
								DESTINATION
							</Text>
							<Text size="lg" bold className="text-gray-800">
								{item.dest_tc}
							</Text>
						</VStack>
					</HStack>

					{/* Origin */}
					<HStack
						space="md"
						alignItems="center"
						className="bg-amber-50 rounded-xl p-3"
					>
						<VStack space="xs">
							<Text size="xs" bold className="text-amber-600">
								ORIGIN
							</Text>
							<Text size="lg" bold className="text-gray-700">
								{item.orig_tc}
							</Text>
						</VStack>
					</HStack>
				</HStack>
			</VStack>
		</Card>
	);

	if (loading) {
		return (
			<Box>
				<Center flex={1}>
					<VStack space="xl" alignItems="center" className="px-8">
						<Box className="bg-white rounded-3xl p-8">
							<VStack space="lg" alignItems="center">
								<Box className="rounded-full p-4">
									<Spinner size="large" color="white" />
								</Box>
								<VStack space="sm" alignItems="center">
									<Text size="2xl" bold className="text-gray-800">
										載入中...
									</Text>
									<Text size="md" className="text-gray-600 text-center">
										正在獲取最新九巴路線資訊
									</Text>
								</VStack>
							</VStack>
						</Box>
					</VStack>
				</Center>
			</Box>
		);
	}

	if (error) {
		return (
			<Box flex={1} className="bg-red-100">
				<Center flex={1}>
					<VStack space="xl" alignItems="center" className="px-8">
						<Box className="bg-white rounded-3xl p-8">
							<VStack space="lg" alignItems="center">
								<Box className="bg-red-500 rounded-full p-4">
									<Text size="4xl" className="text-white">
										😓
									</Text>
								</Box>
								<VStack space="sm" alignItems="center">
									<Text size="2xl" bold className="text-red-600">
										載入失敗
									</Text>
									<Text size="md" className="text-gray-600 text-center">
										{error}
									</Text>
									<Text size="sm" className="text-gray-500 text-center">
										請檢查網絡連接後重試
									</Text>
								</VStack>
							</VStack>
						</Box>
					</VStack>
				</Center>
			</Box>
		);
	}

	return (
		<Box flex={1} className="bg-slate-50 pb-[6rem]">
			{/* Search Bar */}
			<VStack className="pt-2 pb-2 px-4 bg-white">
				<VStack space="md" alignItems="center">
					<Input
						className="w-full bg-gray-50 rounded-xl"
						variant="outline"
						size="md"
					>
						<InputField
							placeholder="搜尋路線號碼 (例如: 1A, 2X, 269B)"
							value={searchQuery}
							onChangeText={setSearchQuery}
							className="text-gray-800"
							keyboardAppearance="default"
							keyboardType="default"
						/>
					</Input>
					<HStack space="sm" alignItems="center">
						<Text size="sm" className="text-gray-600">
							顯示 {filteredRoutes.length} 條路線
						</Text>
						{searchQuery.trim() && (
							<Text size="sm" className="text-blue-600">
								• 搜尋: {searchQuery}
							</Text>
						)}
					</HStack>
				</VStack>
			</VStack>

			{/* Routes List */}
			<Box flex={1} className="pt-2">
				<FlatList
					refreshing={loading}
					onRefresh={refetch}
					data={filteredRoutes}
					renderItem={renderRouteItem}
					keyExtractor={(item, index) => `${item.route}-${item.bound}-${index}`}
					showsVerticalScrollIndicator={false}
					contentContainerStyle={{
						paddingBottom: 40,
						paddingTop: 8,
					}}
					ListEmptyComponent={
						<Box className="pt-20">
							<Center>
								<VStack space="md" alignItems="center">
									<Text size="4xl">🔍</Text>
									<Text size="lg" bold className="text-gray-600">
										找不到相關路線
									</Text>
									<Text size="sm" className="text-gray-500 text-center">
										請嘗試不同的搜尋詞彙
									</Text>
								</VStack>
							</Center>
						</Box>
					}
				/>
			</Box>
		</Box>
	);
};

export default BusTabScreen;
