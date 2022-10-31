import Rete from "rete";
import ReactRenderPlugin from "rete-react-render-plugin";
import ConnectionPlugin from "rete-connection-plugin";
import DockPlugin from "rete-dock-plugin";
import AreaPlugin from "rete-area-plugin";
import LogicalOperationBlock from "./components/blocks/LogicalOperationBlock";
import BinarySourceBlock from "./components/blocks/BinarySourceBlock"


export async function createEditor(container) {
  const components = [
    new BinarySourceBlock(),
    new LogicalOperationBlock()];
  const engine = new Rete.Engine("demo@0.1.0");
  const editor = new Rete.NodeEditor("demo@0.1.0", container);
  editor.use(ConnectionPlugin);
  editor.use(ReactRenderPlugin);

  await editor.use(DockPlugin, {
    container: document.getElementById("dock"),
    plugins: [ReactRenderPlugin],
  });

  components.forEach((c) => {
    editor.register(c);
    engine.register(c);
  });

  //json objesinden bu formatta okuyup acilista node'lari yerlestirebiliriz
  // await editor.fromJSON({
  //   id: "demo@0.1.0",
  //   nodes: {
  //     "1": {
  //       id: 1,
  //       position: [100, 50],
  //       name: "Trigger"
  //     }
  //   }
  // });


//bu blogu acinca sadece dock'ta degil, editore de node'lari (blockklari) ekliyor
/*   var n1 = await components[0].createNode({ num: 2 });
  var n2 = await components[0].createNode({ num: 3 });
  var add = await components[1].createNode();

  n1.position = [80, 200];
  n2.position = [80, 400];
  add.position = [500, 240];

  editor.addNode(n1);
  editor.addNode(n2);
  editor.addNode(add);

  editor.connect(n1.outputs.get("num"), add.inputs.get("num1"));
  editor.connect(n2.outputs.get("num"), add.inputs.get("num2")); */

  editor.on(
    "process nodecreated noderemoved connectioncreated connectionremoved",
    async () => {
      await engine.abort();
      await engine.process(editor.toJSON());
      // console.log(editor)
    }
  );

  editor.view.resize();
  editor.trigger("process");
  AreaPlugin.zoomAt(editor, editor.nodes);
}
