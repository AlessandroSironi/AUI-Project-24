const useApplianceTypeIcon = (applianceType: string): string => {
    switch (applianceType) {
        case '':
            return '';
            break;
        default:
            return 'material-symbols:question-mark';
            break;
    }
};

export default useApplianceTypeIcon;
