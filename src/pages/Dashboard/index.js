import React, { useEffect, useState } from 'react';
import { withNavigationFocus } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Background from '~/components/Background';
import { Container, Title, List } from './styles';
import Appointment from '~/components/Appointment';
import api from '~/services/api';

function Dashboard({ isFocused }) {
  const [appointments, setAppointment] = useState([]);

  async function getAppointments() {
    const response = await api.get(`appointments`);
    setAppointment(response.data);
  }

  useEffect(() => {
    if (isFocused) {
      getAppointments();
    }
  }, [isFocused]);

  async function handleCancel(id) {
    const response = await api.delete(`appointments/${id}`);

    setAppointment(
      appointments
        .map(appointment =>
          appointment.id === id
            ? {
                ...appointment,
                canceled_at: response.data.canceled_at,
              }
            : appointment
        )
        .filter(item => !item.canceled_at)
    );
  }

  return (
    <Background>
      <Container>
        <Title>Appointments</Title>

        <List
          data={appointments}
          renderItem={({ item }) => (
            <Appointment onCancel={() => handleCancel(item.id)} data={item} />
          )}
          keyExtractor={item => String(item.id)}
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

export default withNavigationFocus(Dashboard);
