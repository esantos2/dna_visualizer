# DNA Visualizer

<!-- <img  align="right" max-width="auto" max-height="400px" src="dist/gifs/dna_mobile_strand3.gif"> -->

[Live Demo](https://esantos2.github.io/dna_visualizer/)

Closely examine the DNA sequence of various species and diseases through dynamic charts and 3D renderings. Available on desktop or mobile.

-   [Features](#features)
-   [Technologies](#technologies)
-   [Contributing](#contributing)

## Features

-   Dynamic data modelling

    -   Bar charts show base composition of user-selected and total regions.
    -   Users can interact with a 3D model that is rendered based on the user's selection.

      <img width="300px" height="auto" src="dist/gifs/charts1.gif">
      <img width="300px" height="auto" src="dist/gifs/strand2.gif">

-   Select specific regions of a sequence to examine in more detail

      <img width="550px" height="auto" src="dist/gifs/selected_seq4.gif">

-   Filter the selection by specific nucleotide bases

      <img width="550px" height="auto" src="dist/gifs/filter3.gif">

## Technologies

-   [D3.js](https://d3js.org/) for bar charts
-   [Three.js](https://threejs.org/) for 3D modelling

    The DNA model consists of rotating shapes at a fixed angle and distance.
    By incrementing layers at an acute angle over time, the repetition creates a uniform helix.

    ```javascript
    row.position.y = i * 2; //position of row height
    row.rotation.y = (30 * i * Math.PI) / 180; //angle for helix
    ```

## Contributing

### Local Development

1. Clone this repo to your local machine
1. In bash, run `npm install`, then `npm run start`
1. In VS code, install the "Open In Browser" extension
1. In VS code, right click `index.html` and select `Open in default browser`
1. In your default browser, use the inspector (`Ctrl` + `Shift` + `I`) to view additional logs

### CI/CD

-   Formatting: [Prettier](https://prettier.io/)
-   Linting: [eslint](https://eslint.org/)
