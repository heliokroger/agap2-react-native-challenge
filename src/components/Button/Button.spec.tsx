import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { Button } from './Button';

const createDefaultProps = () => ({
  title: 'Button',
  onPress: jest.fn(),
  testID: 'button-test-id',
  iconName: '',
  iconTestID: '',
});

describe('testing Button component', () => {
  it('should match snapshot', () => {
    const props = createDefaultProps();
    const result = render(<Button {...props} />);
    expect(result).toMatchSnapshot();
  });

  it('should call onPress function on pressing the button', async () => {
    const props = createDefaultProps();
    const { getByTestId } = render(<Button {...props} />);
    const pressable = getByTestId(props.testID);
    await fireEvent.press(pressable);
    expect(props.onPress).toBeCalled();
  });

  it('should render an icon when prop iconName is set', () => {
    const props = createDefaultProps();
    props.iconName = 'x';
    props.iconTestID = 'icon-test-id';
    const { getByTestId } = render(<Button {...props} />);
    const icon = getByTestId(props.iconTestID);
    expect(icon).toBeDefined();
  });
});
