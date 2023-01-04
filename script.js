import { getMatrixData } from "./matrix.js";

const button = document.getElementById('button'); // button which triggers creation of new random graph
const graphOutput = document.getElementById('graph-display-div');
const controllabilityOutput = document.getElementById('matrix-controllability-div'); 
const mathOutput = document.getElementById('thesis-latex-div'); 

// mostly copied from source
const collapsible = document.getElementsByClassName('collapsible');
let i;
for (i = 0; i < collapsible.length; i++) {
    collapsible[i].addEventListener("click", function() {
    this.classList.toggle("active");
    let content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}

// options for vis
let graphOptions = {
    edges: {
        physics: false,
        smooth: false
    },
    layout: {
      improvedLayout: true,
    },
    interaction: {
      dragView: false,
      zoomView: false
    }
};

function clickButton() {
    const value = document.getElementById('dim'); // input element for number of nodes 
    const dim = parseInt(value.value, 10);
    // generate random matrix
    const [graphData, newHTML, controllability]  = getMatrixData(dim);
    // Draw graph
    let network = new vis.Network(graphOutput, graphData, graphOptions);
    // write new HTML elements
    mathOutput.innerHTML = newHTML;
    controllabilityOutput.innerHTML = `<em>${controllability}</em>`;
    // tell MathJax (for LaTeX) to look for new code
    MathJax.typeset();
}

button.addEventListener('click', clickButton);

clickButton();


