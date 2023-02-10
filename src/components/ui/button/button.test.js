import renderer from 'react-test-renderer';
import { fireEvent, render, screen } from "@testing-library/react";
import { Button } from "./button";

describe('Button unit-tests', () => {
  it('Render clear button', () => {
    const component = renderer.create(<Button />).toJSON();

    expect(component).toMatchSnapshot();
  });

  it('Render button with text', () => {
    const component = renderer.create(<Button text={'что-то'} />).toJSON();

    expect(component).toMatchSnapshot();
  });

  it('Render disabled button', () => {
    const component = renderer.create(<Button disabled />).toJSON();

    expect(component).toMatchSnapshot();
  });

  it('Render loading button', () => {
    const component = renderer.create(<Button isLoader />).toJSON();

    expect(component).toMatchSnapshot();
  });

  it('Call button callback', () => {
    const mockCallback = jest.fn();
    render(<Button text={'button'} onClick={mockCallback}/>);

    fireEvent.click(screen.getByText('button'))

    expect(mockCallback.mock.calls.length).toEqual(1);
  });
});
