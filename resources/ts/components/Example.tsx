import React from 'react';
import ReactDOM from 'react-dom';

const Example:React.FC = () => {
    return (
        <div>
            <h1>洗濯日和</h1>
            <h2>typescript</h2>
        </div>
    );
}

export default Example;

if (document.getElementById('example')) {
    ReactDOM.render(<Example />, document.getElementById('example'));
}
