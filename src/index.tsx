import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import App from './App'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { RecoilRoot } from 'recoil'
import { HelmetProvider } from 'react-helmet-async'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			retry: 0,
			suspense: false,
		},
	},
})

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
	<RecoilRoot>
		<QueryClientProvider client={queryClient}>
			<ReactQueryDevtools initialIsOpen={true} />
			<HelmetProvider>
				<App />
			</HelmetProvider>
		</QueryClientProvider>
	</RecoilRoot>
)
