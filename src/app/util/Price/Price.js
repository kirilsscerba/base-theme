/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/base-theme
 */

/* eslint-disable import/prefer-default-export */

import getSymbolFromCurrency from 'currency-symbol-map';

export const formatCurrency = (currency = 'USD') => {
    const symbol = getSymbolFromCurrency(currency);
    return symbol || currency;
};

/**
 * Calculate discount percentage
 * @param {Number} min minimum price
 * @param {Number} reg regular price
 * @return {Number} discount percentage
 */
export const calculateDiscountPercentage = (min, reg) => Math.floor(Math.round((1 - min / reg) * 100));

/**
 * Calculate final price
 * @param {Number} discount discount percentage
 * @param {Number} min minimum price
 * @param {Number} reg regular price
 * @return {Number} final price
 */
export const calculateFinalPrice = (discount, min, reg) => (discount ? min : reg);

/**
 * Calculate final price
 * @param {Number} price
 * @return {Number} price rounded to 2 digits
 */
export const roundPrice = price => parseFloat(price).toFixed(2);
