import React from 'react';
import { TouchableOpacity } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import styled from 'styled-components/native';
import { useNavigation } from 'expo-router';
import { COLORS } from '@ui/theme/colors';
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = {
  title: string;
};

const AppHeader = ({ title }: Props) => {
  const navigation = useNavigation();

  return (
    <SafeAreaTop edges={['top']}>
      <Container>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Entypo name="chevron-thin-left" size={20} color={COLORS.text} />
        </TouchableOpacity>
        <Title numberOfLines={2}>{title}</Title>
      </Container>
    </SafeAreaTop>
  );
};

export default AppHeader;

const SafeAreaTop = styled(SafeAreaView)({
  backgroundColor: COLORS.white,
});

const Container = styled.View({
  flexDirection: 'row',
  alignItems: 'center',
  paddingHorizontal: 24,
  paddingTop: 8,
  paddingBottom: 16,
  backgroundColor: COLORS.white,
  gap: 12,
});

const Title = styled.Text({
  flexShrink: 1,
  fontSize: 16,
  fontFamily: 'Eina03-SemiBold',
  color: COLORS.text,
  textAlign: 'left',
});
