import { useEffect, useState } from 'react';
import { Analytics } from '@deriv-com/analytics';
import useIsGrowthbookIsLoaded from './useIsGrowthbookLoaded';

interface UseGrowthbookGetFeatureValueArgs<T> {
    defaultValue?: T;
    featureFlag: string;
}

const useGrowthbookGetFeatureValue = <T extends boolean | string>({
    defaultValue,
    featureFlag,
}: UseGrowthbookGetFeatureValueArgs<T>) => {
    const resolvedDefaultValue: T = defaultValue !== undefined ? defaultValue : (false as T);
    const [featureFlagValue, setFeatureFlagValue] = useState(
        Analytics?.getFeatureValue(featureFlag, resolvedDefaultValue) ?? resolvedDefaultValue
    );
    const isGBLoaded = useIsGrowthbookIsLoaded();

    useEffect(() => {
        if (isGBLoaded) {
            if (Analytics?.getInstances()?.ab) {
                const setFeatureValue = () => {
                    const value = Analytics?.getFeatureValue(featureFlag, resolvedDefaultValue);
                    setFeatureFlagValue(value);
                };
                setFeatureValue();
                Analytics?.getInstances()?.ab?.GrowthBook?.setRenderer(() => {
                    // this will be called whenever the feature flag value changes and acts as a event listener
                    setFeatureValue();
                });
            }
        }
    }, [isGBLoaded, resolvedDefaultValue, featureFlag]);

    return [featureFlagValue, isGBLoaded];
};

export default useGrowthbookGetFeatureValue;
