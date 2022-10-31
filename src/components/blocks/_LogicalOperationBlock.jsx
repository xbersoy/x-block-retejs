import Rete from "rete";
import BooleanControl from "../controls/BooleanControl";
import PreviewControl from "../controls/PreviewControl";
import booleanSocket from "../sockets/BooleanSocket";

class NewBlock extends Rete.Component {
  constructor() {
    super("New Block");
  }

  builder(node) {
    var inp1 = new Rete.Input("bool1", "Boolean value 1", booleanSocket);
    var inp2 = new Rete.Input("bool2", "Boolean value 2", booleanSocket);
    var out = new Rete.Output("output", "Output value", booleanSocket);

    inp1.addControl(new BooleanControl(this.editor, "bool1", node));
    inp2.addControl(new BooleanControl(this.editor, "bool2", node));

    return node
      .addInput(inp1)
      .addInput(inp2)
      .addControl(new PreviewControl(this.editor, "preview", node))
      .addOutput(out);
  }

  worker(node, inputs, outputs) {
    // inputs bir obje (keyleri 'bool1' ve 'bool2' gibi)
    // altindaki elemanlar array

    let i1 = inputs.bool1.length ? inputs.bool1[0] : node.data.bool1;
    let i2 = inputs.bool2.length ? inputs.bool2[0] : node.data.bool2;
    let result = i1 && i2;

    this.editor.nodes.find((n) => n.id === node.id)
    .controls.get("preview")
    .setValue(result);

    outputs["output"] = result;

    // console.log(result);
  }
}

export default NewBlock;
