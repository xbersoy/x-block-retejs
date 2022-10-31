import Rete from "rete";
import BooleanControl from "../controls/BooleanControl";
import booleanSocket from "../sockets/BooleanSocket";

class BinarySourceBlock extends Rete.Component {
  constructor() {
    super("Binary Source Block");
  }

  builder(node) {
    let out1 = new Rete.Output("booleanOut1", "Output", booleanSocket);
    let ctrl = new BooleanControl(this.editor, "booleanControl1", node);

    return node.addControl(ctrl).addOutput(out1);
  }

  worker(node, inputs, outputs) {
    outputs.booleanOut1 = node.data.booleanControl1;
  }
}

export default BinarySourceBlock;
