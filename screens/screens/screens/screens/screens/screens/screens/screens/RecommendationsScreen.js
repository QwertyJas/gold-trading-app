import React from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { Title, Chip, Card, IconButton, Paragraph } from 'react-native-paper';
import Sparkline from '../components/Sparkline';

export default function RecommendationsScreen({ route }) {
  const { strategy } = route.params;
  return (
    <SafeAreaView style={{ flex:1, padding:16 }}>
      <Title>{strategy.title}</Title>
      <Chip icon="star" style={{ marginVertical:8 }}>
        Confidence: {(strategy.confidence * 100).toFixed(0)}%
      </Chip>
      <ScrollView>
        {strategy.steps.map((step, idx) => (
          <Card key={idx} style={{ marginVertical:6 }}>
            <Card.Title
              title={step.label}
              left={props => (
                <IconButton {...props} icon={step.type==='chart' ? 'chart-line' : 'checkbox-marked-circle'} />
              )}
            />
            <Card.Content>
              {step.type==='chart' && (
                <Sparkline
                  symbol="XAU/USD"
                  interval="1h"
                  pointsCount={40}
                  width={300}
                  height={80}
                  apiKey={strategy.apiKey}
                />
              )}
              {step.description && <Paragraph style={{ marginTop:8 }}>{step.description}</Paragraph>}
            </Card.Content>
          </Card>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
