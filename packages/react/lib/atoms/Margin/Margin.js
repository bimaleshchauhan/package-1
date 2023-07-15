import React from 'react';

const Margin = ({ space = 'sm', children, left, right, top, botton }) => {
    let className = '';
    if (!left && !right && !top && !botton)
        className = `dse-margin-${space}`;
    if (left)
        className = `${className} dse-margin-left-${space}`;
    if (right)
        className = `${className} dse-margin-right-${space}`;
    if (top)
        className = `${className} dse-margin-top-${space}`;
    if (botton)
        className = `${className} dse-margin-botton-${space}`;
    return React.createElement("div", { className: className }, children);
};

export { Margin as default };
//# sourceMappingURL=Margin.js.map
