import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Background from '~/components/Background';
import { Container, Title, List } from './styles';
import Appointment from '~/components/Appointment';

const data = [1, 2, 3, 4, 5, 6];

export default function Dashboard() {
  return (
    <Background>
      <Container>
        <Title>Appointments</Title>

        <List
          data={data}
          renderItem={({ item }) => <Appointment data={item} />}
          keyExtractor={item => String(item)}
        />
      </Container>
    </Background>
  );
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Appointments',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="event" size={20} color={tintColor} />
  ),
};
