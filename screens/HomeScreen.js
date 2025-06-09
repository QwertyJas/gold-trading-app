import React, { useEffect, useState } from 'react';
import { SafeAreaView, FlatList, View, ActivityIndicator, Text as RNText } from 'react-native';
import { Text, Button, Chip, IconButton } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import { staticStrategies, AI_API } from '../data/config';

export default function HomeScreen({ navigation }) {
  const [custom, setCustom] = useState([]);
  const [aiStrats, setAiStrats] = useState([]);
  const [loadingAI, setLoadingAI] = useState(true);
  const [aiError, setAiError] = useState(false);
  const [filter, setFilter] = useState('All');
  const diffs = ['All', 'Beginner', 'Intermediate', 'Advanced', 'Custom'];

  useEffect(() => {
    AsyncStorage.getItem('custom_strats').then(json => setCustom(JSON.parse(json) || []));
    NetInfo.fetch().then(s => {
      if (s.isConnected) {
        fetch(`${AI_API}/recommend`)
          .then(r => r.json())
          .then(d => setAiStrats(d.strategies || []))
          .catch(() => setAiError(true))
          .finally(() => setLoadingAI(false));
      } else {
        setLoadingAI(false);
      }
    });
  }, []);

  const all = [...custom, ...aiStrats, ...staticStrategies];
  const sorted = all.sort((a, b) => (b.confidence || 0) - (a.confidence || 0));
  const list = sorted.filter(s => filter === 'All' || s.difficulty === filter);

  return (
    <SafeAreaView style={{ flex:1, padding:16 }}>
      <Text variant="headlineLarge" style={{ marginBottom:12 }}>GoldApp</Text>
      <View style={{ flexDirection:'row', marginBottom:8 }}>
        {diffs.map(d => (
          <Chip key={d} selected={filter===d} onPress={()=>setFilter(d)} style={{ marginRight:4 }}>{d}</Chip>
        ))}
      </View>
      <Button mode="outlined" onPress={()=>navigation.navigate('HowToUse')} style={{ marginBottom:8 }}>How To Use</Button>
      {loadingAI && <ActivityIndicator />}
      {aiError && <RNText style={{ color:'red' }}>Failed to load AI strategies.</RNText>}
      <FlatList
        data={list}
        keyExtractor={s => s.id}
        renderItem={({ item }) => (
          <View style={{ flexDirection:'row', alignItems:'center', marginVertical:6 }}>
            <Button mode="contained" onPress={()=>navigation.navigate('Checklist',{ strategy: item })} style={{ flex:1 }}>
              {item.title}
            </Button>
            <IconButton icon="information" onPress={()=>navigation.navigate('Recommendations',{ strategy: item })} />
          </View>
        )}
      />
    </SafeAreaView>
  );
}
