# DNA Visualizer

<!-- <img  align="right" max-width="auto" max-height="400px" src="dist/gifs/dna_mobile_strand3.gif"> -->

Closely examine the DNA sequence of various species and diseases through dynamic charts and 3D renderings. Available on desktop or mobile.
Check out the [Live Demo](https://esantos2.github.io/dna_visualizer/).

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

-   D3.js for bar charts
-   Three.js for 3D modelling

    -   To replicate the helical nature of DNA, each level of
        the model contains rotating shapes at a fixed integer multiple of radians. This allows for consistent positioning
        and spacing throughout the rendering. By incrementing at an acute angle over time, the repetition creates a uniform helix
        representative of a simplified DNA molecule.

    ```javascript
    row.position.y = i * 2; //position of row height
    row.rotation.y = (30 * i * Math.PI) / 180; //angle for helix
    ```

## Contributing

### Local Development

1. Clone this repo to your local machine
1. In bash, run `npm install`, the `npm run start`
1. In VS code, ensure you have the "Open In Browser" extension installed
1. In VS code, right click the `index.html` file and select `Open in default browser`
1. In your default browser, use the inspector (`Ctrl` + `Shift` + `I`) to view additional logs

### Testing

1. Run `npm run test` to run unit tests
