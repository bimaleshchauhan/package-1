import React, { useState, useRef, useEffect, createRef } from 'react';
import Text from '../../atoms/Text/Text.js';

const KEY_CODES = {
    ENTER: 13,
    SPACE: 32,
    DOWN_ARROW: 40,
    ESC: 27,
    UP_ARROW: 38
};
const getPreviousOptionIndex = (currentIndex, option) => {
    if (currentIndex === null) {
        return 0;
    }
    if (currentIndex === option.length - 1) {
        return 0;
    }
    return currentIndex + 1;
};
const getNextOptionIndex = (currentIndex, option) => {
    if (currentIndex === null) {
        return 0;
    }
    if (currentIndex === option.length - 1) {
        return 0;
    }
    return currentIndex + 1;
};
const Select = ({ options = [], label = "Please select an option..", oneOptionSelected: handler, renderOption }) => {
    const [isOpen, setIsOpen] = useState(false);
    const labelRef = useRef(null);
    const [overlayTop, setOverlayTop] = useState(0);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [highLightedIndex, setHighLightedIndex] = useState(null);
    const [optionRefs, setOptionRefs] = useState([]);
    const oneOptionSelected = (option, optionIndex) => {
        if (handler) {
            handler(option, optionIndex);
        }
        setSelectedIndex(optionIndex);
        setIsOpen(false);
    };
    const onLabelClick = () => {
        setIsOpen(!isOpen);
    };
    useEffect(() => {
        setOverlayTop((labelRef.current?.offsetHeight || 0) + 10);
    }, [labelRef.current?.offsetHeight]);
    let selectedOption = null;
    if (selectedIndex !== null) {
        selectedOption = options[selectedIndex];
    }
    const highlightItem = (optionIndex) => {
        setHighLightedIndex(optionIndex);
        if (optionIndex !== null) {
            const ref = optionRefs[optionIndex];
            if (ref && ref.current) {
                ref.current.focus();
            }
        }
    };
    const onButtonKeyDown = (event) => {
        event.preventDefault();
        console.log("event", event);
        if ([KEY_CODES.ENTER, KEY_CODES.SPACE, KEY_CODES.DOWN_ARROW].includes(event.keyCode)) {
            setIsOpen(true);
            highlightItem(0);
        }
    };
    useEffect(() => {
        setOptionRefs(options.map(_ => createRef()));
    }, [options.length]);
    useEffect(() => {
        if (highLightedIndex !== null && isOpen) {
            const ref = optionRefs[highLightedIndex];
            if (ref && ref.current) {
                ref.current.focus();
            }
        }
    }, [isOpen, highLightedIndex]);
    const onOptionKeyDown = (event) => {
        if (event.keyCode === KEY_CODES.ESC) {
            setIsOpen(false);
            return;
        }
        if (event.keyCode === KEY_CODES.DOWN_ARROW) {
            highlightItem(getNextOptionIndex(highLightedIndex, options));
        }
        if (event.keyCode === KEY_CODES.UP_ARROW) {
            highlightItem(getPreviousOptionIndex(highLightedIndex, options));
        }
        if (event.keyCode === KEY_CODES.ENTER) {
            oneOptionSelected(options[highLightedIndex], highLightedIndex);
        }
    };
    return React.createElement("div", { className: "dse-select" },
        React.createElement("button", { "data-testid": "DseSelectBtn", onKeyDown: onButtonKeyDown, "aria-controls": "dse-select-list", "aria-haspopup": true, "aria-expanded": isOpen ? true : undefined, ref: labelRef, className: "dse-select__label", onClick: () => onLabelClick() },
            React.createElement(Text, null, selectedOption === null ? label : selectedOption.label),
            React.createElement("svg", { className: `dse-select__caret ${isOpen ? 'dse-select__caret--open' : 'dse-select__caret--close'}`, xmlns: "http://www.w3.org/2000/svg", width: '1rem', height: '1rem', fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 },
                React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M19 9l-7 7-7-7" }))),
        isOpen ? React.createElement("ul", { role: 'menu', id: "dse-select-list", className: "dse-select__overlay", style: { top: overlayTop } }, options.map((option, optionIndex) => {
            const isSelected = selectedIndex === optionIndex;
            const isHighLighted = highLightedIndex === optionIndex;
            const ref = optionRefs[optionIndex];
            const RenderOptionProps = {
                ref,
                option,
                isSelected,
                getOptionRecommendedProps: (overrideProps = {}) => {
                    return {
                        ref,
                        role: 'menuitemradio',
                        'aria-label': option.label,
                        'aria-checked': isSelected ? true : undefined,
                        onKeyDown: onOptionKeyDown,
                        tabIndex: isHighLighted ? -1 : 0,
                        onMouseEnter: () => highlightItem(optionIndex),
                        onMouseLeave: () => highlightItem(null),
                        className: `dse-select__option ${isSelected ? 'dse-select__option--selected' : ''} ${isHighLighted ? 'dse-select__option--highlighted' : ''}`,
                        onClick: () => oneOptionSelected(option, optionIndex),
                        key: option.value,
                        ...overrideProps
                    };
                }
            };
            if (renderOption) {
                return renderOption(RenderOptionProps);
            }
            return React.createElement("li", { ...RenderOptionProps.getOptionRecommendedProps() },
                React.createElement(Text, null, option.label),
                isSelected ? React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: '1rem', height: '1rem', viewBox: "0 0 20 20", fill: "currentColor" },
                    React.createElement("path", { fillRule: "evenodd", d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z", clipRule: "evenodd" })) : null);
        })) : null);
};

export { Select as default };
//# sourceMappingURL=Select.js.map
