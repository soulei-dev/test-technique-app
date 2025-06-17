import styled from 'styled-components/native';

type SpacerProps = {
  size: number | string;
  horizontal?: boolean;
};

export const Spacer = styled.View<SpacerProps>(({ size, horizontal }) => ({
  width: horizontal ? size : 'auto',
  height: horizontal ? 'auto' : size,
}));
