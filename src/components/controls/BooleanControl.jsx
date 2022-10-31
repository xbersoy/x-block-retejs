import React from "react";
import Rete from "rete";

class BooleanControl extends Rete.Control {
  static component = ({ value, onChange }) => (
    <select
      ref={(ref) => {
        ref && ref.addEventListener("pointerdown", (e) => e.stopPropagation());
      }}
      onChange={(e) => {onChange(e.target.value)}}
    >
      <option value="true">true</option>
      <option value="false">false</option>
    </select>
  );

  constructor(emitter, key, node, readonly = false) {
    super(key);
    this.emitter = emitter;
    this.key = key;
    this.component = BooleanControl.component;

    const initialValue = 'true';

    node.data[key] = initialValue === 'true' ? true : false;

    this.props = {
      readonly,
      value: initialValue,
      onChange: (val) => {
        this.setValue(val);
        this.emitter.trigger("process");
      },
    };
  }

  setValue(val) {
    this.props.value = val;
    let boolVal = val === 'true' ? true : false;
    this.putData(this.key, boolVal);
    this.update();
  }
}

export default BooleanControl;
