import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function PerformanceScreen() {
  const [stats, setStats] = useState({ total:0, wins:0, losses:0, net:0 });
  useEffect(() => {
    AsyncStorage.getItem('trade_logs').then(j => {
      const logs = JSON.parse(j) || [];
      const wins = logs.filter(l => l.outcome === 'win').length;
      const losses = logs.filter(l => l.outcome === 'loss').length;
      const net = logs.reduce((sum, l) => sum + l.profit, 0);
      setStats({ total: logs.length, wins, losses, net });
    });
  }, []);

  return (
    <SafeAreaView style={{ flex:1, padding:16 }}>
      <Text>Total: {stats.total}</Text>
      <Text>Wins: {stats.wins}</Text>
      <Text>Losses: {stats.losses}</Text>
      <Text>Net P/L: {stats.net.toFixed(2)}</Text>
    </SafeAreaView>
  );
}
