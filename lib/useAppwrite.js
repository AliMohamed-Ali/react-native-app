import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'

const useAppwrite = (fn) => {
    const [data, setData] = useState([]);
    const [isLoading,setIsLoading] = useState(true);
    const fetchData = async () => {
        setIsLoading(true);
        try {
          const data = await fn();
        //   console.log(data);
          setData(data);
        } catch (error) {
          console.log(error);
          Alert.alert("Error", error.message);
        }finally{
          setIsLoading(false);
        }
      };
    useEffect(() => {
      
  
      fetchData();
    },[]);
    const refreshData =  () => fetchData();
    return {data,isLoading,refreshData}
}

export default useAppwrite