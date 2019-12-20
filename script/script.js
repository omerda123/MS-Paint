{

  // create color pallete from array of colors
  const createColorPalette = () => {
    const colors = ["black", "salmon", "white", "red", "yellow", "magenta", "gray", "orange", "blue", "green", "fuchsia", "purple", "lightgray", "brown", "lightblue", "orangered", "crimson", "lightgreen"];
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


  // sets the desired color by clicking on some color on the palette
  const setColor = e => {
    color = e.target.style.backgroundColor;
  };

  // what's happen while mouse move
  const mouseMove = e => {
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
          e.target.remove();
      }

      else if (tool === "square") {
        endingPoint = [e.pageX, e.pageY];
        drawShape("square", startingPoint, endingPoint);
      }
    }
  };


  // change tool on click
  const changeTool = e => {
    tool = e.target.id;
    canvas.className = "canvas";
    canvas.classList.add(tool); //change cursor on the canvas
  }

  // drawing square / circle from x,y coordinates of mouse down and up
  const drawShape = (shape = "square", start, end) => {
    let square = document.createElement("div");
    square.style.position = "absolute";
    square.style.left = `${start[0]}px`;
    square.style.top = `${start[1]}px`;
    square.style.height = `${Math.abs(end[1] - start[1])}px`;
    square.style.width = `${Math.abs(end[0] - start[0])}px`;
    square.style.backgroundColor = color;
    if (shape === "circle")
      square.style.borderRadius = "50%";
    canvas.appendChild(square);
  }

  // what's happen when mouse us down
  const mouseUp = (e) => {
    if (tool === "circle") {
      endingPoint = [e.pageX, e.pageY];
      drawShape("circle", startingPoint, endingPoint);
    }
    else
      drawing = false;
  }

  // what's happen when mouse us up
  const mouseDown = (e) => {
    if (tool === "pencil") {
      drawing = true;
    }
    else if (tool === "bucket") {
      canvas.style.backgroundColor = color;
    }

    else if (tool === "eraser") {
      drawing = true;
    }

    else if ((tool === "square") || (tool === "circle")) {
      drawing = true;
      startingPoint = [e.pageX, e.pageY];
    }
  }

  //toggle display 
  const toggleDisplay = (e = blank , item = "default") =>{
    if (item === "default")
        item = e.target.id;
    if (item === "file"){
      if (document.querySelector(".file-menu").style.display === "none")
          document.querySelector(".file-menu").style.display = "block";
      else 
      document.querySelector(".file-menu").style.display = "none"
    }
  }

  // reset screen when press reset button
  const resetScreen = () => {
    divsInsideCanvas = document.querySelectorAll(".canvas div");
    divsInsideCanvas.forEach((subDiv) => subDiv.remove());
    canvas.style.backgroundColor = "white";
    
    
  }
  // save all divs to local storage
  const saveAs = () =>{
    divsInsideCanvas = document.querySelectorAll(".canvas div");
    let divsArray = [];
    (divsInsideCanvas.forEach((div) => {divsArray.push(div.outerHTML)}));
    localStorage.setItem("canvas", JSON.stringify(divsArray));
    toggleDisplay( null , "file")
    console.log("Saved");
  }

  const open = () => {
    const divs = JSON.parse(localStorage.getItem("canvas"));
    divs.forEach((div) =>  console.log(new DOMParser().parseFromString(div,"text/xml").documentElement));
    divs.forEach((div) =>  canvas.appendChild(new DOMParser().parseFromString(div,"text/xml").documentElement));
  
  }

  // parameters declarations
  let drawing = false;
  let tool;
  let color = "black";
  let startingPoint = [];
  let endingPoint = [];

  // get element from DOM
  const canvas = document.querySelector(".canvas");
  const toolbox = document.querySelectorAll("i");
  const resetButton = document.querySelector(".menu-item:nth-child(3)")
  const fileButton = document.querySelector(".menu-item:nth-child(1)") 
  const saveAsButton = document.querySelector("#save-as")
  const openButton = document.querySelector("#open")


  // add event listeners 
  canvas.addEventListener("mousemove", mouseMove);
  canvas.addEventListener("mousedown", mouseDown);
  canvas.addEventListener("mouseup", mouseUp);
  fileButton.addEventListener("click", toggleDisplay)
  resetButton.addEventListener("click", resetScreen);
  toolbox.forEach((item) => item.addEventListener("click", changeTool));
  saveAsButton.addEventListener("click", saveAs)
  openButton.addEventListener("click", open)

  // function invocation 
  createColorPalette(); //creates the color palette from array
}