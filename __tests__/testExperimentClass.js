import React from 'react/addons';
import ReactExperiments from '../dist/react-experiments';

let logs = [];
const paramKey = 'foo';
const paramVal = 'bar';
class experiment extends ReactExperiments.experimentClass {
  getParams() {
    let ret = {};
    ret[paramKey] = paramVal;
    return ret;
  }

  logExposure(data) {
    logs.push(data);
  }

  getName() {
    return 'testExperiment';
  }

  previouslyLogged() {
    return false;
  }
}

const expClass = new experiment();
const TestUtils = React.addons.TestUtils;
describe('Test experiment', () => {
  beforeEach(() => {
    logs = [];
  });

  it('should work with experiment Class', () => {
    const Comp = React.createClass({
      render() {
        return (
          <div className={this.props.experimentParameters[paramKey]}>
            Test
          </div>
        );
      }
    });

    const parametrized = TestUtils.renderIntoDocument(
      <ReactExperiments.Parametrize experiment={expClass}>
        <Comp />
      </ReactExperiments.Parametrize>
    );
    expect(TestUtils.scryRenderedDOMComponentsWithClass(
      parametrized,
      paramVal
    ).length).toBe(1);
    expect(logs.length).toEqual(1);
  });
});