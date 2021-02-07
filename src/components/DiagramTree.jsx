import React, { useEffect, useState } from 'react';
import * as RJD from 'react-js-diagrams';
import './DiagramTree.scss';

const DiagramTree = ({ data }) => {
    const engine = new RJD.DiagramEngine();
    engine.registerNodeFactory(new RJD.DefaultNodeFactory());
    engine.registerLinkFactory(new RJD.DefaultLinkFactory());

    const model = new RJD.DiagramModel();

    const createNode = (options) => {
        const { name, color, x, y } = options;
        var node = new RJD.DefaultNodeModel(name, color);
        node.x = x;
        node.y = y;
        return node;
    }
  
    const createPort = (node, options) => {
        const { isInput, id, name } = options;
        return node.addPort(new RJD.DefaultPortModel(isInput, id, name));
    }
  
    const linkNodes = (port1, port2) => {
        const link = new RJD.LinkModel();
        link.setSourcePort(port1);
        link.setTargetPort(port2);
        return link;
    }
  
    const testSerialization = () => {
        // We need this to help the system know what models to create form the JSON
        engine.registerInstanceFactory(new RJD.DefaultNodeInstanceFactory());
        engine.registerInstanceFactory(new RJD.DefaultPortInstanceFactory());
        engine.registerInstanceFactory(new RJD.LinkInstanceFactory());

        // Serialize the model
        const str = JSON.stringify(model.serializeDiagram());
        console.log(str);

        // Deserialize the model
        const model2 = new RJD.DiagramModel();
        model2.deSerializeDiagram(JSON.parse(str),engine);
        engine.setDiagramModel(model2);
        console.log(model2);
    }

    useEffect(() => {
        testSerialization();
    }, []);

    console.log('DATA', data)

    data.forEach(item => {
        const node = createNode({
            name: item.name,
            color: item.color,
            x: item.x,
            y: item.y
        });
        const port = createPort(node, {
            isInput: item.port.isInput,
            id: item.port.id,
            name: item.port.name
        })
        console.log('NODE', node, port)
        model.addNode(node);
        // model.addLink(linkNodes(port))
    })

    // // Create first node and port
    // const node1 = createNode({
    //     name: 'Node 1',
    //     color: 'rgb(0, 192, 255)',
    //     x: 100,
    //     y: 100
    // });
    // const port1 = createPort(node1, {
    //     isInput: false,
    //     id: 'out-1',
    //     name: 'Out'
    // });
  
    // // Create second node and port
    // const node2 = createNode({
    //     name: 'Node 2',
    //     color: 'rgb(192, 255, 0)',
    //     x: 400,
    //     y: 100
    // });
    // const port2 = createPort(node2, {
    //     isInput: true,
    //     id: 'in-1',
    //     name: 'In'
    // });
  
    // // Add the nodes and link to the model
    // model.addNode(node1);
    // model.addNode(node2);
    // model.addLink(linkNodes(port1, port2));

    // Load the model into the diagram engine
    engine.setDiagramModel(model);

    console.log('ENGINE', engine)

    return (
        <RJD.DiagramWidget diagramEngine={engine} />
    );
}

export default DiagramTree;