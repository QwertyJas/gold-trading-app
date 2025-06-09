import React, { useEffect, useState } from 'react';
import { ScrollView, View, Alert } from 'react-native';
import { Text, Checkbox, Appbar } from 'react-native-paper';
import Sparkline from '../components/Sparkline';

export default function ChecklistScreen({ route, navigation }) {
  const { strategy, demoBar } = route.params;
  const [checked, setChecked] = useState([]);
  const [levels, setLevels] = useState(null);

  useEffect(() => {
    setChecked(Array(strategy.steps.length).fill(false));
    setLevels(null);
  }, [strategy]);

  const toggle = idx => {
    const arr = [...checked]; arr[idx] = !arr[idx]; setChecked(arr);
  };

  useEffect(() => {
    if (checked.every(Boolean) && !levels) {
      const price = demoBar ? +demoBar.close : null;
      if (price) {
        const stop = price * 0.002;
        setLevels({ entry: price, sl: price - stop, tp: price + 2 * stop });
      }
    }
  }, [checked]);

  const handleCancel = () => {
    if (checked.some(v => v)) {
      Alert.alert(
        'Cancel Checklist',
        'Are you sure you want to cancel? Progress will be lost.',
        [
          { text: 'No' },
          { text: 'Yes', onPress: () => navigation.goBack() }
        ]
      );
    } else {
      navigation.goBack();
    }
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={handleCancel} />
        <Appbar.Content title={strategy.title} />
      </Appbar.Header>
      <ScrollView style={{ padding:16 }}>
        {strategy.steps.map((s, i) => (
          <View key={i} style={{ flexDirection:'row', alignItems:'center', marginVertical:6 }}>
            <Checkbox status={checked[i] ? 'checked' : 'unchecked'} onPress={() => toggle(i)} />
            <Text>{s.label}</Text>
            {s.type === 'chart' && <Sparkline symbol="XAU/USD" interval="1h" width={200} height={50} />}
          </View>
        ))}
        {levels && (
          <View style={{ marginTop:16 }}>
            <Text>Entry: {levels.entry}</Text>
            <Text>SL: {levels.sl}</Text>
            <Text>TP: {levels.tp}</Text>
          </View>
        )}
      </ScrollView>
    </>
  );
}
