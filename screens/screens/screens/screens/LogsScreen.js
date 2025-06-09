import React, { useEffect, useState } from 'react';
import { SafeAreaView, FlatList } from 'react-native';
import { Text } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LogsScreen() {
  const [logs, setLogs] = useState([]);
  useEffect(() => {
    AsyncStorage.getItem('trade_logs').then(j => setLogs(JSON.parse(j) || []));
  }, []);

  return (
    <SafeAreaView style={{ flex:1, padding:16 }}>
      <FlatList
        data={logs}
        keyExtractor={(_, i) => String(i)}
        renderItem={({ item }) => (
          <Text>{`${item.strategyId} ${item.outcome} P/L:${item.profit.toFixed(2)}`}</Text>
        )}
      />
    </SafeAreaView>
  );
}
