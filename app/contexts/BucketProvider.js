import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

const BucketContext = createContext();
const BucketProvider = ({ children }) => {
  const [buckets, setBuckets] = useState([]);

  const findBuckets = async () => {
    const result = await AsyncStorage.getItem('buckets');
    if (result !== null) setBuckets(JSON.parse(result));
  };

  useEffect(() => {
    findBuckets();
  }, []);

  return (
    <BucketContext.Provider value={{ buckets, setBuckets, findBuckets }}>
      {children}
    </BucketContext.Provider>
  );
};

export const useBuckets = () => useContext(BucketContext);

export default BucketProvider;
