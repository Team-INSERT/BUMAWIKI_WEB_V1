import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import App from './App'
import { QueryCache, QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			retry: 0,
			suspense: false,
		},
	},
	queryCache: new QueryCache({
		onError: (err) => {
			console.log(err)
		},
	}),
})

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
	<QueryClientProvider client={queryClient}>
		<ReactQueryDevtools initialIsOpen={true} />
		<App />
	</QueryClientProvider>
)
