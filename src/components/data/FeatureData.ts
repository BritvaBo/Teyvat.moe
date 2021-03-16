/**
 * Loads, validates, and includes utility methods for retrieving marker data.
 */
import _ from 'lodash';

import { MSFFeature, validateFeatureData } from '~/components/data/ElementSchema';
import { importFromContext, isDev } from '~/components/util';

const featuresContext = require.context('~/data/features/', true, /.json$/);
export const listFeatureFiles = (): string[] => featuresContext.keys();
export const loadFeature = (key: string): MSFFeature => {
  const featureData: MSFFeature = importFromContext(featuresContext, key);

  if (isDev()) {
    // In development, validate the data before returning.
    const validation = validateFeatureData(featureData);
    if (validation == null || validation.error) {
      console.warn(`ERROR during validation of feature '${key}'`);
      console.warn(validation);
      return null;
    }
  }

  // In production, simply return the raw data.
  return featureData;
};
