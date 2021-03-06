import PropTypes from 'prop-types';

import { addressType } from 'Type/Account';
import { countriesType } from 'Type/Config';
import FieldForm from 'Component/FieldForm';

export const DEFAULT_COUNTRY_ID = 'US';

class MyAccountAddressForm extends FieldForm {
    static propTypes = {
        address: addressType.isRequired,
        countries: countriesType.isRequired,
        onSave: PropTypes.func
    };

    static defaultProps = {
        onSave: () => {}
    };

    constructor(props) {
        super(props);

        const {
            countries,
            address: { country_id, region: { region_id } = {} }
        } = props;

        const countryId = country_id || DEFAULT_COUNTRY_ID;
        const country = countries.find(({ id }) => id === countryId);
        const { available_regions: availableRegions } = country;
        const regions = availableRegions || [{}];
        const regionId = regions[0].id || region_id;

        this.state = {
            countryId,
            availableRegions,
            regionId
        };
    }

    onFormSuccess = (fields) => {
        const { onSave } = this.props;
        const { region_id, region_string: region, ...newAddress } = fields;
        newAddress.region = { region_id, region };
        onSave(newAddress);
    };

    getRegionFields() {
        const { address: { region: { region } = {} } } = this.props;
        const { availableRegions, regionId } = this.state;

        if (!availableRegions || !availableRegions.length) {
            return {
                region_string: {
                    label: __('State/Province'),
                    value: region
                }
            };
        }

        return {
            region_id: {
                label: __('State/Province'),
                type: 'select',
                selectOptions: availableRegions.map(({ id, name }) => ({ id, label: name, value: id })),
                onChange: regionId => this.setState({ regionId }),
                value: regionId
            }
        };
    }

    get fieldMap() {
        const { countryId } = this.state;
        const { countries, address } = this.props;
        const { default_billing, default_shipping, street = [] } = address;

        return {
            default_billing: {
                type: 'checkbox',
                label: __('This is default Billing Address'),
                value: 'default_billing',
                checked: default_billing
            },
            default_shipping: {
                type: 'checkbox',
                label: __('This is default Shipping Address'),
                value: 'default_shipping',
                checked: default_shipping
            },
            firstname: {
                label: __('First name'),
                validation: ['notEmpty']
            },
            lastname: {
                label: __('Last name'),
                validation: ['notEmpty']
            },
            telephone: {
                label: __('Phone number'),
                validation: ['notEmpty']
            },
            city: {
                label: __('City'),
                validation: ['notEmpty']
            },
            country_id: {
                type: 'select',
                label: __('Country'),
                validation: ['notEmpty'],
                value: countryId,
                selectOptions: countries.map(({ id, label }) => ({ id, label, value: id })),
                onChange: (countryId) => {
                    const country = countries.find(({ id }) => id === countryId);
                    const { available_regions } = country;

                    this.setState({
                        countryId,
                        availableRegions: available_regions || []
                    });
                }
            },
            ...this.getRegionFields(),
            postcode: {
                label: __('Zip/Postal code'),
                validation: ['notEmpty']
            },
            street: {
                label: __('Street address'),
                value: street[0],
                validation: ['notEmpty']
            },
            fax: {
                label: __('Fax')
            },
            company: {
                label: __('Company')
            },
            vat_id: {
                label: __('VAT number')
            }
        };
    }

    getDefaultValues(fieldEntry) {
        const [key, { value }] = fieldEntry;
        const { address: { [key]: addressValue } } = this.props;

        return {
            ...super.getDefaultValues(fieldEntry),
            value: value !== undefined ? value : addressValue
        };
    }

    renderActions() {
        return (
            <button type="submit" block="Button">
                { __('Save address') }
            </button>
        );
    }
}

export default MyAccountAddressForm;
