import React, { useState } from "react";
import CytoscapeComponent from "react-cytoscapejs";

//Assets
import network from "./jsonMockup.json";
import styleSheet from "./styleSheet.json";

function App() {
  const [zoom, setZoom] = useState(0.8);
  const [layouts, setLayouts] = useState("breadthfirst");

  const layout = {
    name: layouts,
    fit: true,
    directed: true,
    padding: 50,
    spacingFactor: 1.5,
    animate: true,
    animationDuration: 1000,
    avoidOverlap: true,
    nodeDimensionsIncludeLabels: false,
  };

  const cyto = (cy) => {
    cy.on("click", "node", (evt) => {
      var node = evt.target;
      console.log("EVT", evt);
      console.log("TARGET", node.data());
    });

    cy.zoom(zoom);

    let btn = document.getElementById("btn");
    let image = document.getElementById("image");
    btn.addEventListener("click", () => {
      image.setAttribute("src", cy.png());
    });

    const filteredNodes = cy.nodes().filter((e) => {
      return e.data("type") === "something";
    });

    console.log(
      filteredNodes.map((e) => {
        return e.data();
      })
    );
  };

  return (
    <>
      <div style={{ backgroundColor: "#404E5C" }}>
        <h1>Cytoscape example</h1>
        <CytoscapeComponent
          elements={CytoscapeComponent.normalizeElements(network)}
          style={{ width: "100%", height: "400px" }}
          zoomingEnabled={true}
          maxZoom={2}
          minZoom={0.2}
          autounselectify={false}
          boxSelectionEnabled={true}
          layout={layout}
          stylesheet={styleSheet}
          cy={cyto}
        />
      </div>
      <button id="btn">imagen</button>
      <button onClick={() => setZoom(zoom + 0.2)}>+</button>
      <button onClick={() => setZoom(zoom - 0.2)}>-</button>
      <br />
      <label htmlFor="">Layout: </label>
      <select
        value={layouts}
        onChange={(e) => {
          const layoutSelected = e.target.value;
          setLayouts(layoutSelected);
        }}
      >
        <option value="breadthfirst">Breadthfirst</option>
        <option value="grid">Grid</option>
        <option value="cose">Cose</option>
        <option value="circle">Circle</option>
      </select>
      <img src="" id="image" alt="" />
    </>
  );
}

export default App;
