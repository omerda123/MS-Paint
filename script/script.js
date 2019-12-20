{
  /*
    create color pallete from array of colors
*/

  let tool;

  const createColorPalette = () => {
    const colors = ["black", "white", "red", "yellow", "blue", "green", "purple", "lightblue", "orangered", "crimson","lightgreen"];
    for (let color of colors) {
      let colorBox = document.createElement("div");
      colorBox.style.width = "30px";
      colorBox.style.height = "30px";
      colorBox.style.backgroundColor = color;
      colorBox.style.border = "1px solid black";
      colorBox.style.margin = "1px";
      colorBox.addEventListener("click", setColor);
      document.querySelector(".color-palette").appendChild(colorBox);
    }
  };

  /*
    sets the desired color by clicking on some color on the palette
*/

  const setColor = e => {
    color = e.target.style.backgroundColor;
  };

  const draw = e => {
    if (drawing) {
      if (tool === "pencil") {
        let pixel = document.createElement("div");
        pixel.style.position = "absolute";
        pixel.style.left = `${e.pageX}px`;
        pixel.style.top = `${e.pageY}px`;
        pixel.style.height = "8px";
        pixel.style.width = "8px";
        pixel.style.borderRadius = "50%";
        pixel.style.backgroundColor = color;
        canvas.appendChild(pixel);
      }

      else if (tool === "eraser") {
        if (!e.target.className.includes("canvas"))
          e.target.style.display = "none";
      }

      else if (tool === "square") {
        console.log("drawing square")
        endingPoint = [e.pageX, e.pageY];
        drawShape("square", startingPoint, endingPoint);
      }
    }
  };



  const changeTool = e => {
    tool = e.target.id;
    console.log(e.target.id);
    canvas.className = "canvas"
    canvas.classList.add(tool)


  }

  const drawShape = (shape = "square", start, end) => {

    let square = document.createElement("div");
    square.style.position = "absolute";
    square.style.left = `${start[0]}px`;
    square.style.top = `${start[1]}px`;
    square.style.height = `${end[1] - start[1]}px`;
    square.style.width = `${end[0] - start[0]}px`;
    square.style.backgroundColor = color;
    if (shape === "circle")
      square.style.borderRadius = "50%";
    canvas.appendChild(square);

  }

  const mouseUp = (e) => {
    if (tool === "pencil")
      drawing = false;

    else if (tool === "square") {
      drawing = false;
    }
    //   endingPoint = [e.pageX, e.pageY];
    //   drawShape("square", startingPoint, endingPoint);
    // }
    else if (tool === "circle") {
      endingPoint = [e.pageX, e.pageY];
      drawShape("circle", startingPoint, endingPoint);
    }
  }

  const clicked = (e) => {
    console.log(tool)
    canvas.addEventListener("mousemove", draw);
    if (tool === "pencil") {
      drawing = true;

    }

    else if (tool === "bucket") {
      console.log(color);
      canvas.style.backgroundColor = color;

    }


    else if (tool === "eraser") {
      drawing = true;
      // canvas.addEventListener("mousemove", draw);
      canvas.addEventListener("mouseup", () => (drawing = false));
      // console.log(e.target.style);

    }

    else if ((tool === "square") || (tool === "circle")) {
      drawing = true;
      startingPoint = [e.pageX, e.pageY];

    }


  }

  const resetScreen = () => {
    divsInsideCanvas = document.querySelectorAll(".canvas div");
    divsInsideCanvas.forEach((subDiv) => subDiv.remove());
    canvas.style.backgroundColor = "white";
  }

  let drawing = false;

  let color = "black";
  let startingPoint = [];
  let endingPoint = [];
  let canvas = document.querySelector(".canvas");

  const toolbox = document.querySelectorAll("i");
  canvas.addEventListener("mousedown", clicked);
  canvas.addEventListener("mouseup", mouseUp);
  toolbox.forEach((item) => item.addEventListener("click", changeTool));

  resetButton = document.querySelector(".menu-item:nth-child(3)")
  resetButton.addEventListener("click", resetScreen);

  createColorPalette(); //creates the color palette from array
}