import Rete from "rete";
import React from 'react';

class PreviewControl extends Rete.Control {
    static component = ({ value, onChange }) => (
      <div>Result: {value}</div>
    );

    constructor(emitter, key, node, readonly = false) {
      super(key);
      this.emitter = emitter;
      this.key = key;
      this.component = PreviewControl.component;

      const initial = "true"

      node.data[key] = initial || 'true';
      this.props = {
        readonly,
        value: node.data[key]
      };
    }

    setValue(val) {
      let value = val === true ? 'true' : 'false'
      this.props.value = value;
      this.putData(this.key, val);
      this.update();
    }
  }

export default PreviewControl;
