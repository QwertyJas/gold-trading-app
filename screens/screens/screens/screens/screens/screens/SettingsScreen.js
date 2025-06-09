import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Alert } from 'react-native';
import { Text, TextInput, Button, Switch } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SettingsScreen() {
  const [bal,setBal] = useState('10000');
  const [risk,setRisk] = useState('1');
  const [dark,setDark] = useState(false);
  const [riskError, setRiskError] = useState('');

  useEffect(() => {
    AsyncStorage.multiGet(['balance','risk','theme']).then(vals => {
      vals.forEach(([k,v]) => {
        if (k==='balance') setBal(v || bal);
        if (k==='risk') setRisk(v || risk);
        if (k==='theme') setDark(v==='dark');
      });
    });
  }, []);

  const save = () => {
    const r = parseFloat(risk);
    if (isNaN(r) || r < 0.1 || r > 5) {
      setRiskError('Risk % must be between 0.1 and 5');
      return;
    }
    setRiskError('');
    AsyncStorage.multiSet([
      ['balance',bal],
      ['risk',risk],
      ['theme',dark?'dark':'light']
    ]);
    Alert.alert('Settings saved');
  };

  return (
    <SafeAreaView style={{ flex:1, padding:16 }}>
      <Text>Balance (USD)</Text>
      <TextInput value={bal} onChangeText={setBal} keyboardType="numeric" />
      <Text>Risk %</Text>
      <TextInput value={risk} onChangeText={setRisk} keyboardType="numeric" />
      {riskError ? <Text style={{ color:'red' }}>{riskError}</Text> : null}
      <View style={{ flexDirection:'row', alignItems:'center', marginVertical:12 }}>
        <Text>Dark Mode</Text>
        <Switch value={dark} onValueChange={setDark} />
      </View>
      <Button mode="contained" onPress={save}>Save</Button>
    </SafeAreaView>
  );
}
