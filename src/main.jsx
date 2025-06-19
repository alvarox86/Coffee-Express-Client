import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'

import { AuthWrapper } from './context/auth.context.jsx';
import { UserWrapper } from './context/profile.context.jsx';


createRoot(document.getElementById('root')).render(
    <AuthWrapper>
        <UserWrapper>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </UserWrapper>
    </AuthWrapper>
)

