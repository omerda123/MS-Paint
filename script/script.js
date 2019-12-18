{
  /*
    create color pallete from array of colors
*/
  const createColorPalette = () => {
    const colors = ["black", "white", "red", "yellow", "blue", "green", "purple", "lightblue", "orangered", "crimson"];
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
    // console.log(e)
    if (tool === "pencil") {
      if (drawing) {
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
    }
  };
  //   const initCanvasElement = element => {
  //     newElement = element.cloneNode(true);
  //     console.log(newElement);
  //     return newElement;
  //   };

  const changeTool = e => {
    tool = e.target.id;
    console.log(e.target.id);

    if (tool === "bucket") {
      //   canvas = initCanvasElement(canvas);
      canvas.addEventListener("click", () => {
        canvas.style.backgroundColor = color;
        console.log("Hi");
      });
    }

    if (tool === "eraser") {
      console.log("eraser");
      canvas.addEventListener("click", () => {
        canvas.style.backgroundColor = color;
        console.log("eraser func" + color);
      });
    }

    if ((tool = "pencil")) {
      //   canvas = initCanvasElement(canvas);
      canvas.addEventListener("mousemove", draw);
      canvas.addEventListener("mousedown", () => (drawing = true)); // allow to use mousemove while mousedown
      canvas.addEventListener("mouseup", () => (drawing = false));
    }
  };

  let drawing = false;

  let color = "black";
  let tool = "pencil";
  let canvas = document.querySelector(".canvas");
  const toolbox = document.querySelectorAll("i");

  createColorPalette(); //creates the color palette from array

  toolbox.forEach(toolBoxButton =>
    toolBoxButton.addEventListener("click", changeTool)
  );
}
