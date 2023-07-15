import React from "react";
import { FontSize } from "@ds.e/foundation";

interface TextProps {
    size?: keyof typeof FontSize,
    children: React.ReactNode;
}

const Text: React.FC<TextProps> = ({size = 'base', children}) => {
    const className = `dse-size-${size}` 
    return <div className={className}>
        {children}
    </div>
}

export default Text;