import { ColorKeys, COLORS } from '@ui/theme/colors';
import styled from 'styled-components/native';
import AntDeisgn from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import { TouchableOpacity } from 'react-native';
import Toast from 'react-native-toast-message';

type Props = {
  message: string;
  backgroundColor?: string;
  icon: React.ReactNode;
};

const ToastMessage = ({
  message,
  backgroundColor = COLORS.green500,
  icon,
}: Props) => {
  return (
    <Container $bgColor={backgroundColor}>
      <MessageContainer>
        {icon}
        <Message>{message}</Message>
      </MessageContainer>
      <TouchableOpacity onPress={() => Toast.hide()}>
        <Entypo name="cross" color={COLORS.white} size={16} />
      </TouchableOpacity>
    </Container>
  );
};

export default ToastMessage;

const Container = styled.View<{ $bgColor: string }>(({ $bgColor }) => ({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: $bgColor,
  paddingVertical: 16,
  paddingHorizontal: 8,
  borderRadius: 8,
  width: '90%',
}));

const MessageContainer = styled.View({
  flexDirection: 'row',
  gap: 10,
  alignItems: 'center',
});

const Message = styled.Text({
  fontSize: 14,
  fontFamily: 'Eina03-SemiBold',
  color: COLORS.white,
});
