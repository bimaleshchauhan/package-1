import React from "react";

import Select from "./Select";

import { render, fireEvent } from '@testing-library/react';

const options = [{
    label: 'Strict Back',
    value: 'strick-black'
}, {
    label: 'Heavenly Green',
    value: 'heavenly-green'
}]

// test('renders all options passed to it', () => {
//     const { getAllByRole, getByTestId} = render(<Select options={options} />)
     
//     fireEvent.click(getByTestId('DseSelectBtn'))
   

//     expect(getAllByRole('menuitemradio')).toHaveLength(options.length)
// })  

// test('renders options using custom renderOption method if passed as prop', () => {
//     const { getAllByTestId, getByTestId} = render(<Select options={options} renderOption = {({option, getOptionRecommendedProps}) => {
//         return <li data-testid="customRenderOption" {...getOptionRecommendedProps()}>{option.label}</li>
//     }} />)
//     fireEvent.click(getByTestId('DseSelectBtn'))
//     expect(getAllByTestId('customRenderOption')).toHaveLength(options.length)
// })

// test.only('calls the onOptionSelected prop with the select option and its index if passed', () => {
//     const onOptionSelected = jest.fn()
//     const { getAllByRole, getByTestId} = render(<Select options={options} oneOptionSelected = {onOptionSelected} />)
//     fireEvent.click(getByTestId('DseSelectBtn'))
//     fireEvent.click(getAllByRole('menuitemradio')[0])
//     expect(onOptionSelected).toHaveBeenCalledWith(options[0], 0)
// })

test('snapshot of the options menu open state', () => {
   const { getByTestId, asFragment} = render(<Select options = {options} />)

   fireEvent.click(getByTestId('DseSelectBtn'))

   expect(asFragment()).toMatchSnapshot()


})

test('can customise select label', () => {
    const { getByText} = render(<Select options = {options} label='this custom label' />)
    expect(getByText(/this custom labe/)).toBeInTheDocument()
})