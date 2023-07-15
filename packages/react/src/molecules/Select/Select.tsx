import React, { createRef, KeyboardEventHandler, useEffect, useRef, useState } from "react";
import Text from "../../atoms/Text";

const KEY_CODES = {
    ENTER:13,
    SPACE: 32,
    DOWN_ARROW: 40,
    ESC: 27,
    UP_ARROW: 38
}

interface SelectOption {
    label: string,
    value: string
}

interface RenderOptionProps {
   isSelected: boolean,
   option: SelectOption,
   getOptionRecommendedProps: (overrideProps?: object) => object
}

interface SelectProps {
  oneOptionSelected?: (option: SelectOption, optionIndex: number) => void,
  options?: SelectOption[]
  label?: string,
  renderOption?: (props: RenderOptionProps) => React.ReactNode
}

const getPreviousOptionIndex = (currentIndex:number|null, option:Array<SelectOption>) => {
    if (currentIndex === null) {
       return 0
    }
    if (currentIndex === option.length - 1) {
        return 0
    }
    return currentIndex + 1
}

const getNextOptionIndex = (currentIndex:number|null, option:Array<SelectOption>) => {
    if (currentIndex === null) {
       return 0
    }
    if (currentIndex === option.length - 1) {
        return 0
    }
    return currentIndex + 1
}

const Select: React.FunctionComponent<SelectProps> = ({options=[], label="Please select an option..", oneOptionSelected:handler, renderOption}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const labelRef = useRef<HTMLButtonElement>(null)
    const [overlayTop, setOverlayTop] = useState<number>(0)
    const [selectedIndex, setSelectedIndex] = useState<null|number>(null)
    const [highLightedIndex, setHighLightedIndex] = useState<null|number>(null)
    const [optionRefs, setOptionRefs] = useState<React.RefObject<HTMLLIElement>[]>([])

    const oneOptionSelected = (option:SelectOption, optionIndex:number) => {
        if (handler) {
            handler(option, optionIndex)
        }
        setSelectedIndex(optionIndex)
        setIsOpen(false)
    }
    const onLabelClick = () => {
        setIsOpen(!isOpen)
    }

    useEffect(() => {
       setOverlayTop((labelRef.current?.offsetHeight || 0)+10)
    },[labelRef.current?.offsetHeight])

    let selectedOption = null;

    if (selectedIndex !== null) {
       selectedOption = options[selectedIndex]
    }

    const highlightItem = (optionIndex: number|null) => {
        setHighLightedIndex(optionIndex)
        if (optionIndex !== null) {
           const ref = optionRefs[optionIndex]

           if (ref && ref.current) {
              ref.current.focus()
           }
        }
    }

    const onButtonKeyDown:KeyboardEventHandler = (event) => {
       event.preventDefault();
       console.log("event", event)
       if ([KEY_CODES.ENTER, KEY_CODES.SPACE, KEY_CODES.DOWN_ARROW].includes(event.keyCode)) {
            setIsOpen(true);
            highlightItem(0)
       }
    }

    useEffect(()=> {
      setOptionRefs(options.map(_ => createRef<HTMLLIElement>()))
    },[options.length])

    useEffect(()=> {
        if (highLightedIndex !== null && isOpen) {
            const ref = optionRefs[highLightedIndex];
            if (ref && ref.current) {
                ref.current.focus()
            }
        }
      },[isOpen, highLightedIndex])

      const onOptionKeyDown:KeyboardEventHandler = (event) => {
          if (event.keyCode === KEY_CODES.ESC) {
            setIsOpen(false)
            return
          }
          if (event.keyCode === KEY_CODES.DOWN_ARROW) {
            highlightItem(getNextOptionIndex(highLightedIndex, options))
          }
          if (event.keyCode === KEY_CODES.UP_ARROW) {
            highlightItem(getPreviousOptionIndex(highLightedIndex, options))
          }
          if (event.keyCode === KEY_CODES.ENTER) {
            oneOptionSelected(options[highLightedIndex!], highLightedIndex!)
          }
      }

    return <div className="dse-select">
        <button data-testid="DseSelectBtn" onKeyDown={onButtonKeyDown} aria-controls="dse-select-list" aria-haspopup={true} aria-expanded = {isOpen ? true : undefined} ref={labelRef} className="dse-select__label" onClick={() => onLabelClick()}>
            <Text>{selectedOption === null ? label : selectedOption.label}</Text>
            <svg className={`dse-select__caret ${isOpen ? 'dse-select__caret--open':'dse-select__caret--close'}`} xmlns="http://www.w3.org/2000/svg" width='1rem' height='1rem' fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
        </button>
        {isOpen ? <ul role='menu' id = "dse-select-list" className="dse-select__overlay" style={{top:overlayTop}}>
           {options.map((option, optionIndex) => {
            const isSelected = selectedIndex === optionIndex;
            const isHighLighted = highLightedIndex === optionIndex;
            const ref = optionRefs[optionIndex];
            const RenderOptionProps = {
                ref,
                option,
                isSelected,
                getOptionRecommendedProps: (overrideProps = {}) => {return {
                    ref,
                    role:'menuitemradio',
                    'aria-label': option.label,
                    'aria-checked': isSelected ? true : undefined,
                    onKeyDown: onOptionKeyDown,
                    tabIndex: isHighLighted ? -1 : 0,
                    onMouseEnter: () => highlightItem(optionIndex),
                    onMouseLeave: () => highlightItem(null),
                    className: `dse-select__option ${isSelected ? 'dse-select__option--selected':''} ${isHighLighted ? 'dse-select__option--highlighted' : ''}`,
                    onClick: () => oneOptionSelected(option, optionIndex),
                    key: option.value,
                    ...overrideProps
                }}
            }
            if (renderOption) {
                return renderOption(RenderOptionProps)
            }
            return  <li  {...RenderOptionProps.getOptionRecommendedProps()}>
                 <Text>{option.label}</Text>
                 {isSelected ? <svg xmlns="http://www.w3.org/2000/svg" width='1rem' height='1rem' viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>:null}
                </li>
           })}
        </ul> : null}
        
    </div>
} 

export default Select;