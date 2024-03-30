import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { getDatabase, ref, onValue } from 'firebase/database';
import { db } from '../config'; 
import { useNavigation } from '@react-navigation/native';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import { StatusBar } from 'expo-status-bar';

const RealTimeData = () => {
  const [data, setData] = useState({});
  const [Humidity, setHumidity] = useState(100);
  const [Temperature, setTemperature] = useState(100);
  const [Gas, setGas] = useState(100);

  useEffect(() => {
    const database = getDatabase();
    const dataRef = ref(database, 'Air');

    const unsubscribe = onValue(dataRef, (snapshot) => {
      const data = snapshot.val();
      console.log('Data: ', data);
      setData(data);

      setTimeout(() => {
        setHumidity(data.Humidity/100);
        setTemperature(data.Temperature/100);
        setGas(data.Gas/10000);
      }, 5000);

  
    });

    return () => unsubscribe(); 
  }, []);

  const data1 = {
    labels: ["Humidity"], // optional
    data: [
      Humidity,
    ]
    // data: [data.Humidity,]
    
  };

  const data2 = {
    labels: ["Temp"], // optional
    data: [
      Temperature,
    ]
    
  };

  const data3 = {
    labels: ["Gas"], // optional
    data: [
      Gas,
    ]
  
  }

  const navigation = useNavigation();

  return (
    <SafeAreaView 
      style = {{ justifyContent : 'start', alignItems : 'center', width : '100%', height : '100%', backgroundColor : '#071414',}}
      >
  <StatusBar hidden = {false} backgroundColor='gray'/>

      <ScrollView style = {{paddingTop : 30}}>

        <View style ={{width : Dimensions.get("window").width,height : 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <Text style = {{color: 'white', fontSize: 25, marginTop: 10, fontWeight: 600 }}>Welcome to AuraSense</Text>
          <Text style = {{color: 'gray', fontSize: 12 }}>Scroll Down to view Real-Time Data</Text>
          <Text style = {{color: 'gray', fontSize: 12, marginBottom: 10  }}>Click on "See More" for Analytics</Text>
        </View>

      <View style = {{width : Dimensions.get("window").width,height : 'auto'}}>
          <View style = {{height: 'auto', width : Dimensions.get("window").width, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems:'center'}}>
            <Text style = {{color:'white',fontSize : 25,paddingLeft : 30, marginTop: 10}}>Humidity</Text>
            <TouchableOpacity onPress={() => {}}>
              <Text style = {{paddingRight : 30, paddingTop: 10, color: 'white', }}>See More</Text>
            </TouchableOpacity>
          </View>
          <View style = {{justifyContent : 'center',alignItems : 'center'}}>
            
          <Text style = {{color:'white',position : 'absolute'}}>{data.Humidity + '%'}</Text>
                    <ProgressChart
                    data={data1}
                    width={Dimensions.get("window").width-50}
                    height={300}
                    strokeWidth={16}
                    radius={80}
                    chartConfig={
                      {
                        backgroundGradientFrom: "#214a48",
                        backgroundGradientFromOpacity: 0,
                        backgroundGradientTo: "#214a48",
                        backgroundGradientToOpacity: 0.6,
                        color: (opacity = 1) => `rgba(92, 247, 240, ${opacity})`,
                        strokeWidth: 2, // optional, default 3
                        barPercentage: 0.5,
                        useShadowColorFromDataset: false // optional
                      }
                    }
                    hideLegend={true}
                    style={{borderRadius : 16,marginVertical : 30}}
                  />
          </View>

      </View>


      <View style = {{width : Dimensions.get("window").width,height : 'auto'}}>
      <View style = {{height: 'auto', width : Dimensions.get("window").width, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems:'center'}}>
            <Text style = {{color:'white',fontSize : 25,paddingLeft : 30, marginTop: 10}}>Temperature</Text>
            <TouchableOpacity onPress={() => {}}>
              <Text style = {{paddingRight : 30, paddingTop: 10, color: 'white', }}>See More</Text>
            </TouchableOpacity>
          </View>
        
      <View style = {{justifyContent : 'center',alignItems : 'center'}}>
      <Text style = {{color:'white',position : 'absolute'}}>{data.Temperature + ' C'}</Text> 
          <ProgressChart
          data={data2}
          width={Dimensions.get("window").width-50}
          height={300}
          strokeWidth={16}
          radius={80}
          chartConfig={
            {
              backgroundGradientFrom: "#193c45",
              backgroundGradientFromOpacity: 0,
              backgroundGradientTo: "#193c45",
              backgroundGradientToOpacity: 0.5,
              color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
              strokeWidth: 2, // optional, default 3
              barPercentage: 0.5,
              useShadowColorFromDataset: false // optional
            }
          }
          hideLegend={true}
          style={{borderRadius : 16,marginVertical : 30}}
        />
      </View>
      </View>


      <View style = {{width : Dimensions.get("window").width,height : 'auto'}}>
      <View style = {{height: 'auto', width : Dimensions.get("window").width, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems:'center'}}>
            <Text style = {{color:'white',fontSize : 25,paddingLeft : 30, marginTop: 10}}>Harmful Gases</Text>
            <TouchableOpacity onPress={() => {}}>
              <Text style = {{paddingRight : 30, paddingTop: 10, color: 'white', }}>See More</Text>
            </TouchableOpacity>
          </View>
      <View style = {{justifyContent : 'center',alignItems : 'center'}}>
      <Text style = {{color:'white',position : 'absolute'}}>{data.Gas /100}</Text>
        <ProgressChart
        data={data3}
        width={Dimensions.get("window").width-50}
        height={300}
        strokeWidth={16}
        radius={80}
        chartConfig={
          {
            backgroundGradientFrom: "#193c45",
            backgroundGradientFromOpacity: 0,
            backgroundGradientTo: "#193c45",
            backgroundGradientToOpacity: 0.5,
            color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
            strokeWidth: 2, // optional, default 3
            barPercentage: 0.5,
            useShadowColorFromDataset: false // optional
          }
        }
        hideLegend={true}
        style={{borderRadius : 16,marginVertical : 30}}
      />
      </View>
      </View>

      </ScrollView>
    </SafeAreaView>
  );
};

export default RealTimeData;
