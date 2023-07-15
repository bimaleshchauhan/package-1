import React from "react";

import { createRoot } from "react-dom/client";

import { Color, Margin, Text, Select } from '@ds.e/react';


import '@ds.e/sass/lib/button.css'
import '@ds.e/sass/lib/utilities.css'
import '@ds.e/sass/lib/Margin.css'
import '@ds.e/sass/lib/text.css'
import '@ds.e/sass/lib/Select.css'

const rootElement = document.getElementById("root")!;
const root = createRoot(rootElement);

// const App = () => {
//     return <div>App</div>
// }

const options = [{
    label: 'Strict Back',
    value: 'strick-black'
}, {
    label: 'Heavenly Green',
    value: 'heavenly-green'
}]

root.render(
    <div style={{padding:'40px'}}>
        <Select options={options} renderOption ={({option, getOptionRecommendedProps})=><p {...getOptionRecommendedProps()}>{option.label}</p>}></Select>
        <div style={{display:'flex'}}>
            <Color hexCode='#000' />
            <Margin left space='xs'>
                <Text>fsfds</Text>
            </Margin>
        </div>
    </div>
);

// ReactDOM.render(
//     <Button label="Example Button" />,
//     document.querySelector('#root')
// )