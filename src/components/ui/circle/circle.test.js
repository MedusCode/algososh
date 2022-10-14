import renderer from "react-test-renderer";
import { Circle } from "./circle";
import { ElementStates } from "../../../types/element";


describe('Circle unit-tests', () => {
  it('Render clear circle', () => {
    const component = renderer.create(<Circle />).toJSON();

    expect(component).toMatchSnapshot();
  });

  it('Render circle with letter', () => {
    const component = renderer.create(<Circle letter={'A'} />).toJSON();

    expect(component).toMatchSnapshot();
  });

  it('Render circle with letter in head', () => {
    const component = renderer.create(<Circle head={'A'} />).toJSON();

    expect(component).toMatchSnapshot();
  });

  it('Render circle with component in head', () => {
    const component = renderer.create(<Circle head={<Circle />} />).toJSON();

    expect(component).toMatchSnapshot();
  });

  it('Render circle with letter in tail', () => {
    const component = renderer.create(<Circle tail={'A'} />).toJSON();

    expect(component).toMatchSnapshot();
  });

  it('Render circle with component in tail', () => {
    const component = renderer.create(<Circle tail={<Circle />} />).toJSON();

    expect(component).toMatchSnapshot();
  });

  it('Render circle with index', () => {
    const component = renderer.create(<Circle index={1} />).toJSON();

    expect(component).toMatchSnapshot();
  });

  it('Render small circle', () => {
    const component = renderer.create(<Circle isSmall />).toJSON();

    expect(component).toMatchSnapshot();
  });

  it('Render default circle', () => {
    const component = renderer.create(<Circle state={ElementStates.Default} />).toJSON();

    expect(component).toMatchSnapshot();
  });

  it('Render changing circle', () => {
    const component = renderer.create(<Circle state={ElementStates.Changing} />).toJSON();

    expect(component).toMatchSnapshot();
  });

  it('Render modified circle', () => {
    const component = renderer.create(<Circle state={ElementStates.Modified} />).toJSON();

    expect(component).toMatchSnapshot();
  });
})