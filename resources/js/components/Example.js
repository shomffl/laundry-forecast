import React from 'react';
import ReactDOM from 'react-dom';

const Example = () => {
    return (
        <div><h1>洗濯日和</h1></div>
    );
}

export default Example;

if (document.getElementById('root')) {
    ReactDOM.render(<Example />, document.getElementById('root'));
}
