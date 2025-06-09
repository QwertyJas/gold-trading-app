import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, FlatList, Text, ActivityIndicator } from 'react-native';
import { Button } from 'react-native-paper';
import Sparkline from '../components/Sparkline';
import { staticStrategies, DATA_API } from '../data/config';

export default function DemoModeScreen({ navigation }) {
  const [history, setHistory] = useState(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    fetch(`${DATA_API}?symbol=XAU/USD&interval=1h&outputsize=500&apikey=YOUR_KEY&format=JSON`)
      .then(r => r.json())
      .then(d => setHistory(d.values.reverse()))
      .catch(() => setHistory([]));
  }, []);

  if (history === null) return <ActivityIndicator style={{ flex:1 }} />;
  if (!history.length) return <Text>No history loaded.</Text>;

  const bar = history[index];
  return (
    <SafeAreaView style={{ flex:1, padding:16 }}>
      <Text>{`${index+1} / ${history.length}`}</Text>
      <Sparkline symbol="XAU/USD" interval="1h" pointsCount={50} width={300} height={100} />
      <Text>{bar.datetime} — {bar.close}</Text>

      <FlatList
        data={staticStrategies}
        keyExtractor={s => s.id}
        renderItem={({ item }) => (
          <Button mode="contained" onPress={()=>navigation.navigate('Checklist',{ strategy: item, demoBar: bar })} style={{ marginVertical:4 }}>
            {item.title}
          </Button>
        )}
      />
      <View style={{ flexDirection:'row', justifyContent:'space-between', marginTop:12 }}>
        <Button disabled={index===0} onPress={()=>setIndex(i=>i-1)}>Prev</Button>
        <Button disabled={index===history.length-1} onPress={()=>setIndex(i=>i+1)}>Next</Button>
      </View>
    </SafeAreaView>
  );
}
