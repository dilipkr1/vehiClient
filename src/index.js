import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { CustomerProvider } from './context/customrContext'
import { AuthProvider } from './context/AuthContext';
import { PackageProvider } from './context/packageContext';
import { CartProvider } from './context/cartContext'
import { OrderProvider } from './context/OrderContext';
import { SocialMediaProvider } from './context/settingSociaContext'
import { SettingDataProvider } from './context/settingDetContext'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render( 
    <AuthProvider>
        <SettingDataProvider>
            <SocialMediaProvider>
                <OrderProvider>
                    <CartProvider>
                        <PackageProvider>
                            <CustomerProvider>

                                <App />

                            </CustomerProvider>
                        </PackageProvider>
                    </CartProvider>
                </OrderProvider>
            </SocialMediaProvider>
        </SettingDataProvider>
    </AuthProvider>
);

