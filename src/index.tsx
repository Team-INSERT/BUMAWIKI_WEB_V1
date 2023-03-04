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
				const { status, code, message } = err
				if (message && code) {
					if (message === 'Cannot Change Your Docs') alert('자기자신의 문서는 변경할 수 없습니다.')
					else if (message === 'YOUR BANNED') alert('읽기전용 유저는 문서를 편집할 수 없습니다.')
					else if (status === 403) alert('로그인 후 이용 가능한 서비스입니다.')
					else if (status === 404) alert('잘못된 접근입니다.')
					else if (status === 500) alert('서버에 오류가 발생했습니다.')
				}
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
