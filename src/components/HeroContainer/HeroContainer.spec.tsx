import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { HeroContainer } from './HeroContainer';

const createDefaultProps = () => ({
  title: 'Hero title',
  description: 'Hero description',
  imageURI: '',
  children: <></>,
  scrollViewTestID: 'scroll-view-test-id',
  onScroll: jest.fn(),
});

describe('testing HeroContainer component', () => {
  it('should match snapshot', () => {
    const props = createDefaultProps();
    const result = render(<HeroContainer {...props} />);
    expect(result).toMatchSnapshot();
  });

  it('should trigger onScroll prop when scrolling the container', async () => {
    const props = createDefaultProps();
    const { getByTestId } = render(<HeroContainer {...props} />);
    const scrollView = getByTestId(props.scrollViewTestID);

    const event = {
      nativeEvent: {
        contentOffset: { y: -15 },
      },
    };

    await fireEvent.scroll(scrollView, event);
    expect(props.onScroll).toBeCalledWith(event);
  });
});
