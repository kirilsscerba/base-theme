import PropTypes from 'prop-types';

export const regionType = PropTypes.oneOfType([
    PropTypes.shape({
        region_code: PropTypes.string,
        region: PropTypes.string,
        region_id: PropTypes.number
    })
]);

export const addressType = PropTypes.shape({
    city: PropTypes.string,
    company: PropTypes.string,
    country_id: PropTypes.string,
    customer_id: PropTypes.number,
    default_billing: PropTypes.bool,
    default_shipping: PropTypes.bool,
    fax: PropTypes.string,
    firstname: PropTypes.string,
    id: PropTypes.number,
    lastname: PropTypes.string,
    middlename: PropTypes.string,
    postcode: PropTypes.string,
    prefix: PropTypes.string,
    regionType,
    street: PropTypes.arrayOf(PropTypes.string),
    suffix: PropTypes.string,
    telephone: PropTypes.string,
    vat_id: PropTypes.string
});

export const addressesType = PropTypes.arrayOf(addressType);

export const customerType = PropTypes.shape({
    addressesType,
    created_at: PropTypes.string,
    default_billing: PropTypes.string,
    default_shipping: PropTypes.string,
    dob: PropTypes.date,
    email: PropTypes.string,
    firstname: PropTypes.string,
    group_id: PropTypes.number,
    id: PropTypes.number,
    is_subscribed: PropTypes.bool,
    lastname: PropTypes.string,
    middlename: PropTypes.string,
    prefix: PropTypes.string,
    suffix: PropTypes.string,
    taxvat: PropTypes.string
});

export const DASHBOARD = 'dashboard';
export const MY_ORDERS = 'my-orders';
export const MY_WISHLIST = 'my-wishlist';
export const ADDRESS_BOOK = 'address-book';

export const activeTabType = PropTypes.oneOf([
    DASHBOARD,
    MY_ORDERS,
    MY_WISHLIST,
    ADDRESS_BOOK
]);

export const tabType = PropTypes.shape({
    url: PropTypes.string,
    name: PropTypes.string
});

export const tabMapType = PropTypes.objectOf(tabType);
