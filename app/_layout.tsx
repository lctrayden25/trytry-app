import { config } from "@gluestack-ui/config";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { Stack } from "expo-router";

import "@/global.css";

export default function RootLayout() {
	return (
		<GluestackUIProvider config={config}>
			<Stack>
				<Stack.Screen
					name="(tabs)"
					options={{
						headerShown: false,
					}}
				/>
			</Stack>
		</GluestackUIProvider>
	);
}
