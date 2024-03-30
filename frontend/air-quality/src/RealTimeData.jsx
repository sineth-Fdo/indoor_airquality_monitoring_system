import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { getDatabase, ref, onValue } from 'firebase/database';
import { db } from '../config'; 
import { useNavigation } from '@react-navigation/native'
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

  useEffect(() => {
    const database = getDatabase();
    const dataRef = ref(database, 'Air');

    const unsubscribe = onValue(dataRef, (snapshot) => {
      const data = snapshot.val();
      console.log('Data: ', data);
      setData(data);
    });

    return () => unsubscribe(); 
  }, []);

  const data1 = {
    labels: ["Humidity"], // optional
    data: [
      data.Humidity/100,
    ]
    // data: [data.Humidity,]
    
  };

  const data2 = {
    labels: ["Temp"], // optional
    data: [
      data.Temperature/100,
    ]
    
  };

  const data3 = {
    labels: ["Gas"], // optional
    data: [
      data.Gas/10000,
    ]
  
  }

  const navigation = useNavigation();

  return (
    <SafeAreaView 
      style = {{ justifyContent : 'start', alignItems : 'center', width : '100%', height : '100%', backgroundColor : '#071414',}}
      
      >
  <StatusBar hidden = {false} backgroundColor='gray'/>

      <ScrollView style = {{paddingTop : 30}}>

      <View style = {{width : Dimensions.get("window").width,height : 'auto'}}>
          <Text style = {{color:'white',fontSize : 25,paddingLeft : 30, marginTop: 10}}>Humidity</Text>
          <TouchableOpacity onPress={() => {}}>
            <Text>See More</Text>
          </TouchableOpacity>
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
        <Text style = {{color:'white',fontSize : 25,paddingLeft : 30}}>Temperature</Text>
        
      <View style = {{justifyContent : 'center',alignItems : 'center'}}>
      <Text style = {{color:'white',position : 'absolute'}}>{data.Temperature + '%'}</Text> 
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
      <Text style = {{color:'white',fontSize : 25,paddingLeft : 30}}>Harmful Gases</Text>
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
