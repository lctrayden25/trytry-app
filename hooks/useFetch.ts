import { useCallback, useEffect, useState } from "react";

export interface UseFetchOptions {
	headers?: Record<string, string>;
	method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
	body?: any;
	autoFetch?: boolean;
}

export interface UseFetchReturn<T> {
	data: T | null;
	loading: boolean;
	error: string | null;
	refetch: () => Promise<void>;
}

export function useFetch<T = any>(
	url: string,
	options: UseFetchOptions = {}
): UseFetchReturn<T> {
	const [data, setData] = useState<T | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	const { headers = {}, method = "GET", body, autoFetch = true } = options;

	const fetchData = useCallback(async () => {
		try {
			setLoading(true);
			setError(null);

			const config: RequestInit = {
				method,
				headers: {
					"Content-Type": "application/json",
					...headers,
				},
			};

			if (body && method !== "GET") {
				config.body = typeof body === "string" ? body : JSON.stringify(body);
			}

			const response = await fetch(url, config);

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const result = await response.json();
			setData(result);
		} catch (err) {
			const errorMessage =
				err instanceof Error ? err.message : "An unknown error occurred";
			setError(errorMessage);
			setData(null);
		} finally {
			setLoading(false);
		}
	}, [url, method, JSON.stringify(headers), body]);

	// Only fetch on mount and when the URL changes
	useEffect(() => {
		if (autoFetch && url) {
			fetchData();
		}
	}, [url, autoFetch, fetchData]); // Removed dependencies that would cause infinite loops

	const refetch = useCallback(async () => {
		await fetchData();
	}, [fetchData]);

	return {
		data,
		loading,
		error,
		refetch,
	};
}
