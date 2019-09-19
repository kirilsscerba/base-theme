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

import React, { Component } from 'react';
import Html from 'Component/Html';
import { TotalsType } from 'Type/MiniCart';
import { formatCurrency } from 'Util/Price';
import Image from 'Component/Image';
import CartItemPrice from 'Component/CartItemPrice';
import './CheckoutOrderSummary.style';

/**
 * Checkout Order Summary component
 */
class CheckoutOrderSummary extends Component {
    /**
     * @param {*} product
     * @param {*} item
     */
    getSourceProduct(product, item) {
        const { type_id: type, variants } = product;
        if (type !== 'configurable') return product;
        const { sku: itemSku } = item;
        const variantIndex = [].findIndex.call(
            variants,
            variant => itemSku === variant.sku
        );

        if (variantIndex >= 0) return variants[variantIndex];

        return null;
    }

    /**
     * @param {*} price
     * @param {*} name
     * @param {*} mods
     */
    renderPriceLine(price, name, mods) {
        if (!price) return null;

        const { totals: { base_currency_code } } = this.props;
        const priceString = formatCurrency(parseFloat(price).toFixed(2), base_currency_code);

        return (
            <li block="CheckoutOrderSummary" elem="SummaryItem" mods={ mods }>
                <strong block="CheckoutOrderSummary" elem="Text">{ name }</strong>
                <strong block="CheckoutOrderSummary" elem="Text">{ priceString }</strong>
            </li>
        );
    }

    /**
     * Render order summary cart item
     * @param key
     * @param item
     * @returns {*}
     */
    renderItem(key, item, currency_code) {
        const { product, row_total, qty: quantity } = item;
        const sourceProduct = this.getSourceProduct(product, item);
        if (!sourceProduct) return null;
        const {
            thumbnail: { path } = {},
            short_description: { html } = {},
            manufacturer,
            name
        } = sourceProduct;
        return (
            <li key={ key } block="CheckoutOrderSummary" elem="CartItem">
                <div
                  block="CheckoutOrderSummary"
                  elem="Thumbnail"
                >
                    <Image src={ `/media/catalog/product${ path }` } alt={ __('Cart Thumbnail') } />
                </div>

                <div block="CheckoutOrderSummary" elem="Title">
                    { manufacturer && <span>{ manufacturer }</span> }
                    <p><strong>{ name }</strong></p>
                    <div block="CheckoutOrderSummary" elem="CartItemDescription">
                        <Html content={ html } />
                    </div>
                </div>

                <div
                  block="CheckoutOrderSummary"
                  elem="Details"
                >
                    <div block="CheckoutOrderSummary" elem="Price">
                        <CartItemPrice row_total={ row_total } currency_code={ currency_code } />
                    </div>
                    <p block="CheckoutOrderSummary" elem="Qty">
                        <strong>{ __('Qty:') }</strong>
                        <span>{ quantity }</span>
                    </p>
                </div>
            </li>
        );
    }

    /**
     * Render checkout order summary block
     * @returns {*}
     */
    render() {
        const {
            totals: {
                grand_total, subtotal, tax_amount, items, shipping_amount, base_currency_code, items_qty
            }
        } = this.props;

        // eslint-disable-next-line no-param-reassign, no-return-assign
        const itemsTax = items ? items.reduce((sum, { tax_amount }) => sum += tax_amount, tax_amount) : 0;

        return (
            <div block="CheckoutOrderSummary" aria-label="Order Summary">
                <div block="CheckoutOrderSummary" elem="OrderTotals">
                    <h3>{ __('Order Summary') }</h3>
                    <ul>
                        { this.renderPriceLine(subtotal, __('Cart Subtotal')) }
                        { this.renderPriceLine(itemsTax, __('Tax')) }
                        { this.renderPriceLine(shipping_amount, __('Shipping'), { divider: true }) }
                        { this.renderPriceLine(grand_total, __('Order Total')) }
                    </ul>
                </div>

                <div block="CheckoutOrderSummary" elem="OrderItems">
                    <h3>{ __('%s Items In Cart', items_qty) }</h3>
                    <ul block="CheckoutOrderSummary" elem="CartItemList">
                        { [].map.call(items, (item, index) => this.renderItem(index, item, base_currency_code)) }
                    </ul>
                </div>
            </div>
        );
    }
}

CheckoutOrderSummary.propTypes = {
    totals: TotalsType
};

CheckoutOrderSummary.defaultProps = {
    totals: {}
};

export default CheckoutOrderSummary;
