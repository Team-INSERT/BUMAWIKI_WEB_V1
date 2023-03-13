import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import App from './App'
import { QueryCache, QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { RecoilRoot } from 'recoil'
import { AxiosError } from 'axios'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			retry: 1,
			suspense: false,
		},
	},
	queryCache: new QueryCache({
		onError: (err) => {
			if (err instanceof AxiosError) {
				const { status } = err
				if (status === 403) return alert('로그인 후 이용 가능한 서비스입니다.')
				if (status === 404) return alert('잘못된 접근입니다.')
				if (status === 500) return alert('서버에 오류가 발생했습니다.')
				return alert('오류가 발생하여 문서를 불러올 수 없습니다.')
			}
		},
	}),
})

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
	<RecoilRoot>
		<QueryClientProvider client={queryClient}>
			<ReactQueryDevtools initialIsOpen={true} />
			<App />
		</QueryClientProvider>
	</RecoilRoot>
)
