import React from "react";
import Color from "../atoms/Color";
import '@ds.e/sass/lib/utilities.css'

import { withKnobs, text, select } from "@storybook/addon-knobs";
import { Spacing } from "@ds.e/foundation";

export default {
    title:'Atoms/Color',
    decorators: [withKnobs],
}


export const Common = () => <Color hexCode={text("HexCode", "pink")}  />

export const CustomDimension = () => <Color hexCode={text("HexCode", "pink")} width={select("Width",Object.values(Spacing),"xxl")} height={select("Height",Object.values(Spacing),"xxl")} />
