import './index.css'
import { createRoot } from 'react-dom/client'
import { AppRouter } from './router'
import { StrictMode } from 'react'
import { Provider } from 'react-redux'
import { store } from '@/app/store'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<Provider store={store}>
			<AppRouter />
		</Provider>
	</StrictMode>
)
