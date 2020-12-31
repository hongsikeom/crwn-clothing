import { combineReducers } from 'redux';
import userReducer from './user/user-reducer';
import cartReducer from './cart/cart.reducer';
import directoryReducer from './directory/directory.reducer';
import shopReducer from './shop/shop.reducer';
import { persistReducer } from 'redux-persist';
// choose session or storage
import storage from 'redux-persist/lib/storage';
// import sessionStorage from 'redux-persist/lib/storage';


const persistConfig = {
    key: 'root',
    // sessionStorage or just storage
    storage,
    // which one will be stored
    whitelist: ['cart']
}

const rootReducer = combineReducers({
    user: userReducer,
    cart: cartReducer,
    directory: directoryReducer,
    shop: shopReducer
});

export default persistReducer(persistConfig, rootReducer);