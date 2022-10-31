import Rete from "rete";
import BooleanControl from "../controls/BooleanControl";
import LogicalOperationSelectorControl from "../controls/LogicalOperationSelectorControl";
import PreviewControl from "../controls/PreviewControl";
import booleanSocket from "../sockets/BooleanSocket";

class NewBlock extends Rete.Component {
  constructor() {
    super("Logical Operation Block");

    this.operationTypes = {
      'and': (p, q) => {
          return p && q;
      },
      'or': (p, q) => {
        return p || q;
      },
      'xor': (p, q) => {
        return p !== q;
      },
      'nand': (p, q) => {
        return !(p && q);
      },
      'nor': (p, q) => {
        return !(p || q);
      }
    };
  }

  builder(node) {
    var inp1 = new Rete.Input("bool1", "Boolean value 1", booleanSocket);
    var inp2 = new Rete.Input("bool2", "Boolean value 2", booleanSocket);
    var out = new Rete.Output("output", "Output value", booleanSocket);

    inp1.addControl(new BooleanControl(this.editor, "bool1", node));
    inp2.addControl(new BooleanControl(this.editor, "bool2", node));

    return node
      .addControl(new LogicalOperationSelectorControl(this.editor, "opsType", node))
      .addInput(inp1)
      .addInput(inp2)
      .addControl(new PreviewControl(this.editor, "preview", node))
      .addOutput(out);
  }

  worker(node, inputs, outputs) {
    let p = inputs.bool1.length ? inputs.bool1[0] : node.data.bool1;
    let q = inputs.bool2.length ? inputs.bool2[0] : node.data.bool2;
    let selectedOperationType = this.editor.nodes.find((n) => n.id === node.id).controls
      .get("opsType")
      .getData('opsType')
    let result = this.operationTypes[selectedOperationType](p, q)

    this.editor.nodes.find((n) => n.id === node.id)
    .controls.get("preview")
    .setValue(result);

    outputs["output"] = result;
  }

}

export default NewBlock;
