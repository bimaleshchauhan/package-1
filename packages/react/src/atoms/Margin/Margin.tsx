import React from "react";
import { Spacing } from "@ds.e/foundation";

interface MarginProps {
    space?: keyof typeof Spacing,
    children: React.ReactNode,
    left?: boolean,
    right?: boolean,
    top?: boolean,
    botton?: boolean
}

const Margin: React.FC<MarginProps> = ({space = 'sm', children, left, right, top, botton}) => {
    let className = '';
    if(!left && !right && !top && !botton) className = `dse-margin-${space}`;
    if (left) className = `${className} dse-margin-left-${space}`
    if (right) className = `${className} dse-margin-right-${space}`
    if (top) className = `${className} dse-margin-top-${space}`
    if (botton) className = `${className} dse-margin-botton-${space}`
    return <div className={className} >
        {children}
    </div>
}

export default Margin;