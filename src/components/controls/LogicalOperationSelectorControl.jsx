import React from "react";
import Rete from "rete";

class LogicalOperationSelectorControl extends Rete.Control {
  static component = ({ value, onChange }) => (
    <select
      ref={(ref) => {
        ref && ref.addEventListener("pointerdown", (e) => e.stopPropagation());
      }}
      onChange={(e) => {onChange(e.target.value)}}
    >
      <option value="and">AND</option>
      <option value="or">OR</option>
      <option value="xor">XOR</option>
      <option value="nand">NAND</option>
      <option value="nor">NOR</option>
    </select>
  );

  constructor(emitter, key, node, readonly = false) {
    super(key);
    this.emitter = emitter;
    this.key = key;
    this.component = LogicalOperationSelectorControl.component;

    const initialValue = 'and';

    node.data[key] = initialValue;

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
    this.putData(this.key, val);
    this.update();
  }
}

export default LogicalOperationSelectorControl;
