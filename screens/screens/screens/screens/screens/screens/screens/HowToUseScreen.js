import React from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { Title, Paragraph } from 'react-native-paper';

export default function HowToUseScreen() {
  return (
    <SafeAreaView style={{ flex:1 }}>
      <ScrollView style={{ padding:16 }}>
        <Title>How to Use GoldApp</Title>
        <Paragraph>1. Configure your balance & risk in Settings.</Paragraph>
        <Paragraph>2. Select a strategy on Home.</Paragraph>
        <Paragraph>3. Follow the step checklist to identify entry, stop, and target.</Paragraph>
        <Paragraph>4. Practice without risk in Demo Mode.</Paragraph>
        <Paragraph>5. Track your performance in Logs & Performance.</Paragraph>
      </ScrollView>
    </SafeAreaView>
  );
}
