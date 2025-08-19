"use client"
import api from '@/lib/api'
import { API_URL } from '@/lib/utils'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const fetchMessages = async () => {
	const response = await api.get(`/contact/messages/`, {
		headers: {
			'Content-Type': 'application/json',
		},
	})
	return response.data
}

export const useMessages = () => {
	const { data, isLoading, error, refetch } = useQuery({
		queryKey: ['messages'],
		queryFn: fetchMessages,
		staleTime: 5 * 60 * 1000,
		refetchOnWindowFocus: false,
	})

	return {
		data,
		isLoading,
		error,
		refetch,
		messages: data?.results || [],
		totalCount: data?.count || 0,
	}
}

