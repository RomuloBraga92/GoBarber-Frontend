import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { isToday, format, getDay, parseISO, isAfter } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import DayPicker, { DayModifiers } from 'react-day-picker';
import { Link } from 'react-router-dom';
import 'react-day-picker/lib/style.css';

import { FiPower, FiClock } from 'react-icons/fi';
import {
  AnimationContainer,
  Header,
  HeaderContent,
  Profile,
  Content,
  AnimationSchedule,
  AnimationCalendar,
  NextAppointment,
  AnimationSection,
  Appointment,
} from './styles';
import logo from '../../assets/logo.svg';
import profile from '../../assets/sign-in-background.png';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import Loading from '../../components/Loading';

interface MonthAvailabilityItem {
  day: number;
  available: boolean;
}

interface Appointment {
  id: string;
  date: string;
  hourFormatted: string;
  user: {
    avatar_url: string;
    name: string;
  };
}

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [monthAvailability, setMonthAvailability] = useState<
    MonthAvailabilityItem[]
  >([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
    if (modifiers.available && !modifiers.disabled) {
      setSelectedDate(day);
    }
  }, []);

  const handleMonthChange = useCallback((month: Date) => {
    setCurrentMonth(month);
  }, []);

  useEffect(() => {
    api
      .get(`/providers/${user.id}/month-availability`, {
        params: {
          year: currentMonth.getFullYear(),
          month: currentMonth.getMonth() + 1,
        },
      })
      .then(response => setMonthAvailability(response.data));
    setLoading(false);
  }, [currentMonth, user.id]);

  useEffect(() => {
    api
      .get<Appointment[]>('/appointments/me', {
        params: {
          year: selectedDate.getFullYear(),
          month: selectedDate.getMonth() + 1,
          day: selectedDate.getDate(),
        },
      })
      .then(response => {
        const appointmentsFormatted = response.data.map(appointment => {
          return {
            ...appointment,
            hourFormatted: format(parseISO(appointment.date), 'HH:mm'),
          };
        });

        setAppointments(appointmentsFormatted);
      });
    setLoading(false);
  }, [selectedDate]);

  const disabledDays = useMemo(() => {
    const dates = monthAvailability
      .filter(monthDay => monthDay.available === false)
      .map(monthDay => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();
        return new Date(year, month, monthDay.day);
      });

    return dates;
  }, [currentMonth, monthAvailability]);

  const selectedDateAsText = useMemo(() => {
    return format(selectedDate, "'Dia' dd 'de' MMMM", {
      locale: ptBR,
    });
  }, [selectedDate]);

  const selectedWeekDayAsText = useMemo(() => {
    const weekDayAsText = format(selectedDate, 'cccc', { locale: ptBR });
    const CapitalizeWeekDayText =
      weekDayAsText.charAt(0).toUpperCase() + weekDayAsText.slice(1);

    if (getDay(selectedDate) !== 0 && getDay(selectedDate) !== 6) {
      return `${CapitalizeWeekDayText}-feira`;
    }

    return CapitalizeWeekDayText;
  }, [selectedDate]);

  const morningAppointments = useMemo(() => {
    return appointments.filter(appointment => {
      return parseISO(appointment.date).getHours() <= 12;
    });
  }, [appointments]);

  const afternoonAppointments = useMemo(() => {
    return appointments.filter(appointment => {
      return parseISO(appointment.date).getHours() > 12;
    });
  }, [appointments]);

  const nextAppointment = useMemo(() => {
    return appointments.find(appointment =>
      isAfter(parseISO(appointment.date), new Date()),
    );
  }, [appointments]);

  return (
    <AnimationContainer>
      <Header>
        <HeaderContent>
          <img src={logo} alt="gobarber" />

          <Profile>
            <Link to="/profile">
              <img
                src={user.avatar_url ? user.avatar_url : profile}
                alt={user.name}
              />
              <div>
                <strong>Bem-vindo,</strong>
                <p>{user.name}</p>
              </div>
            </Link>
          </Profile>

          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>

      <Content>
        <AnimationSchedule>
          <h1>Horários agendados</h1>

          <p>
            {isToday(selectedDate) && <span>Hoje</span>}
            <span>{selectedDateAsText}</span>
            <span>{selectedWeekDayAsText}</span>
          </p>

          {loading ? (
            <Loading
              type="spinningBubbles"
              color="#312e38"
              width={32}
              height={32}
            />
          ) : (
            isToday(selectedDate) &&
            nextAppointment && (
              <NextAppointment>
                <strong>Agendamento a seguir</strong>
                <div>
                  <img
                    src={
                      nextAppointment.user.avatar_url
                        ? nextAppointment.user.avatar_url
                        : profile
                    }
                    alt={nextAppointment.user.name}
                  />
                  <strong>{nextAppointment.user.name}</strong>
                  <span>
                    <FiClock />
                    {nextAppointment.hourFormatted}
                  </span>
                </div>
              </NextAppointment>
            )
          )}

          <AnimationSection>
            <h3>Manhã</h3>
            {loading && (
              <Loading
                type="spinningBubbles"
                color="#312e38"
                width={32}
                height={32}
              />
            )}
            {!loading && morningAppointments.length !== 0 ? (
              morningAppointments.map(appointment => (
                <Appointment key={appointment.id}>
                  <span>
                    <FiClock />
                    {appointment.hourFormatted}
                  </span>
                  <div>
                    <img
                      src={
                        appointment.user.avatar_url
                          ? appointment.user.avatar_url
                          : profile
                      }
                      alt={appointment.user.name}
                    />
                    <strong>{appointment.user.name}</strong>
                  </div>
                </Appointment>
              ))
            ) : (
              <h4>Não há agendamentos para o período!</h4>
            )}
          </AnimationSection>

          <AnimationSection>
            <h3>Tarde</h3>

            {afternoonAppointments.length !== 0 ? (
              afternoonAppointments.map(appointment => (
                <Appointment key={appointment.id}>
                  <span>
                    <FiClock />
                    {appointment.hourFormatted}
                  </span>
                  <div>
                    <img
                      src={
                        appointment.user.avatar_url
                          ? appointment.user.avatar_url
                          : profile
                      }
                      alt={appointment.user.name}
                    />
                    <strong>{appointment.user.name}</strong>
                  </div>
                </Appointment>
              ))
            ) : (
              <h4>Não há agendamentos para o período!</h4>
            )}
          </AnimationSection>
        </AnimationSchedule>
        <AnimationCalendar>
          <DayPicker
            disabledDays={[{ daysOfWeek: [0, 6] }, ...disabledDays]}
            weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
            fromMonth={new Date()}
            modifiers={{
              available: { daysOfWeek: [1, 2, 3, 4, 5] },
            }}
            onDayClick={handleDateChange}
            onMonthChange={handleMonthChange}
            selectedDays={selectedDate}
            months={[
              'Janeiro',
              'Fevereiro',
              'Março',
              'Abril',
              'Maio',
              'Junho',
              'Julho',
              'Agosto',
              'Setembro',
              'Outubro',
              'Novembro',
              'Dezembro',
            ]}
          />
        </AnimationCalendar>
      </Content>
    </AnimationContainer>
  );
};

export default Dashboard;
