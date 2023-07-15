import React from "react";
import Select from "../molecules/Select";
import '@ds.e/sass/lib/Select.css'

export default {
    title:'Molecules/Select',
    decoraction:'withA11y'
}

const options = [{
    label: 'Strict Back',
    value: 'strick-black'
}, {
    label: 'Heavenly Green',
    value: 'heavenly-green'
}]

export const Common = () => <Select options = {options}  />

export const RenderOption = () => <Select options = {options} renderOption = {({getOptionRecommendedProps, option}) => <span {...getOptionRecommendedProps()}>{option.label}</span>} />

export const CustomLabel = () => <Select label = 'Select a color' options = {options} />

Common.parameters={
    a11y: {
        disable: false,
    }
}