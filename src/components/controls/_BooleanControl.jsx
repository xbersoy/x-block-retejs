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

    // html component'i value'yu string olarak aldigi icin
    // parent node'a direkt gonderirsek node'da da string
    // tutulacagi icin bu sekilde boolean karsiligini gonderdim
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

    // this.getNode().data[key] = data;
    // control'un parent node'unun data property'sine set ediyor
    // ornegin newBlock.data.bool1 = val gibi..
    let boolVal = val === 'true' ? true : false;
    this.putData(this.key, boolVal);

    //en ustte prop objesine yapilan atamadan sonra component'i yeniden render ediyor
    this.update();
  }
}

export default BooleanControl;
