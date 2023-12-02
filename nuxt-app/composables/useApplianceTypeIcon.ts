/**
 * Can be improved, appliances types can be fetched from the db and
 * saved beforehand...
 *
 * An enum could be used to automatically set up the icon maybe
 *
 * @param applianceType : string
 * @returns the icon related to the type of applicance
 */

const useApplianceTypeIcon = (applianceType: string): string => {
    switch (applianceType) {
        case 'Thermostat':
            return 'material-symbols:thermostat';

        case 'Lightbulb':
            return 'material-symbols:lightbulb-outline';

        case 'Switch':
            return 'mdi:light-switch';

        case 'Plug':
            return 'ri:plug-line';

        case 'Lock':
            return 'ph:lock-bold';

        case 'Speaker':
            return 'material-symbols:speaker-outline';

        case 'Smart TV':
            return 'bi:tv';

        case 'Microwave':
            return 'streamline:food-kitchenware-microwave-cook-food-appliances-cooking-nutrition-appliance-microwave';

        case 'Oven':
            return 'material-symbols:oven-outline';

        case 'Smart Vacuum Cleaner':
            return 'material-symbols:vacuum-outline';

        case 'Air Conditioner':
            return 'iconoir:air-conditioner';

        case 'Dishwasher':
            return 'fluent:dishwasher-24-regular';

        case 'Washing Machine':
            return 'icon-park-outline:washing-machine';

        case 'Dryer':
            return 'mdi:hair-dryer-outline';

        default:
            return 'material-symbols:question-mark';
    }
};
export default useApplianceTypeIcon;
