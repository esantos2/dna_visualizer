# DNA Visualizer

This app allows users to closely examine the DNA sequence of various species and diseases through dynamic charts and 3D renderings.

[Visit the site](https://arctive.github.io/dna_visualizer/)

## Technologies
* HTML/CSS/JS
* D3.js for bar charts
* Three.js for base 3D modelling

## Features
* Select specific regions of a sequence to examine in more detail.
<p align="center">
  <img max-width="600px" height="auto" src="dist/gifs/selected_seq4.gif">
</p>

* Filter the current selection by nucleotide bases.
<p align="center">
  <img max-width="600px" height="auto" src="dist/gifs/filter3.gif">
</p>

* Dynamic charts and models
  * Bar graphs show the base composition of the current selection and of the total strand.
  * Users can interact with a 3D model that is rendered based on the currently selected strand.
  * The 3D model and bar graphs update in real time upon new user selections.

<p align="center">
  <img max-width="600px" height="auto" src="dist/gifs/charts1.gif">
  <img max-width="600px" height="auto" src="dist/gifs/strand2.gif">
</p>

## Challenges

* When filtering the sequence for a specific base, the selection sequence must be redrawn and omit the unselected bases.
    To do this while also updating the bar chart, I added a string variable to the parameter list of the drawSeq function. This is then used
    as a filter, allowing only the bases found in said string to be counted. These counts are saved into the baseCounts object, which is sent
    to the drawCharts function to update the bar graph. When filters are removed, a string containing all bases is sent to the function, allowing 
    all bases to be permitted in the next render.

```
    for (let i = startIdx; i <= endIdx; i++) {
        if (bases.includes(this.mainSeq[i])){ //filter missing data points
            baseCounts[this.mainSeq[i]]++;
            ctx.fillStyle = baseColor[this.mainSeq[i]];
        } else {
            ctx.fillStyle = "#171717";
        }
        ctx.fillRect(this.rectWidth * (i - startIdx), 0, this.rectWidth, canvas.height);
    }
```

* To create the 3D model, I utilized the Three.js library. One major challenge was building the shapes in the
    correct manner to mimic the helical nature of DNA. When the strand is built, the rows at each level of the model have shapes that
    rotated at a fixed integer amount of radians. This allows for consistent positioning and spacing throughout the rendering, and by incrementing
    at an acute angle over time, the repetition creates a uniform helix representative of a simplified DNA molecule.

```
    row.position.y = i*2; //position of row height
    row.rotation.y = 30*i * Math.PI/180; //angle for spiral
```

* In order to synchronize the sequence selection to the bar graphs and the 3D model, the raw sequence is stored in an object, where the main string processing
    occurs. When a new strand or new selection of a strand is made, the raw sequence is sent to the Sequence object, which parses the string for the permitted bases. The new sequence string is then sent to the immersion function to be rendered as a model, while the count is sent directly to the drawCharts function to build the bar graphs. This allows the parsing to happen at a single location, and the auxiliary functions help to render that data for the user to better read and interact with.

<p align="center">
  <img width="100%" height="auto" src="dist/gifs/dynamic.gif">
</p>

## Coming soon
* Mobile friendly
* Detailed molecular structure
* More DNA sequences available for viewing
* Option to upload your own data