import { createSelector } from 'reselect';
import memoize from 'lodash.memoize';


const selectShop = state => state.shop;


export const selectCollections = createSelector(
    [selectShop],
    shop => shop.collections
);


export const selectCollectionsForPreview = createSelector(
    [selectCollections],
    collections => Object.keys(collections).map(key => collections[key])
);


export const selectCollection = memoize((collectionUrlParams) => createSelector(
    [selectCollections],
    collections =>
        collections[collectionUrlParams]
));

// const getPramas = memoize((state, props) => props.match.params.collectionId);
// export const selectCollection = createSelector(
//     [selectCollections, getPramas],
//     (collections, collectionParams) => collections.find(el => el.routeName === collectionParams)
// );