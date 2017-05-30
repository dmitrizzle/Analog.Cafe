import React from 'react';

const TestExample = ({ words }) => {
  if (words === 'Hello') {
    return (
      <div>
        Goodbye
      </div>
    );
  }
  if (words === 'Goodbye') {
    return (
      <div>
        Hello!
      </div>
    )
  }
  return (
    <div>
      props.words was empty. Sad!
    </div>
  )
}
TestExample.propTypes = {
  words: React.PropTypes.string,
};

export default TestExample;
