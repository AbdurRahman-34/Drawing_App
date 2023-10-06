const  canvas = document.querySelector("canvas"),
toolsBtns = document.querySelectorAll(".tool"),
fillColor = document.querySelector("#fill-color"),
sizeSlider = document.querySelector("#size-slider"),
colorBtns = document.querySelectorAll(".colors .option"),
ctx =  canvas.getContext("2d");

// Global variable with default value
let prevMouseX, prevMouseY, snapshot,
isDrawing = false,
selectedTool = "brush",
brushWidth = 5;


window.addEventListener("load", () => {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
});


// -----------------------------

const drawRect = (e) => {
    if(!fillColor.checked){
     return ctx.strokeRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY);
    }
    ctx.fillRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY);

}

// -----------------------------------
const drawCircle = (e) => {
    ctx.beginPath();
    let radius = Math.sqrt(Math.pow((prevMouseX - e.offsetX), 2) + Math.pow((prevMouseY - e.offsetY), 2))
    ctx.arc(prevMouseX, prevMouseY, radius, 50, 0, 2 * Math.PI);
    fillColor.checked ? ctx.fill() : ctx.stroke();
}


// --------------------------------------
const  drawTriangle = (e) => {
    ctx.beginPath();
    ctx.moveTo(prevMouseX, prevMouseY);
    ctx.lineTo(e.offsetX, e.offsetY)
    ctx.lineTo(prevMouseX *2 - e.offsetX, e.offsetY)
    ctx.closePath();
    fillColor.checked ? ctx.fill() : ctx.stroke();
}

const startDraw = (e) => {
    isDrawing = true;
    prevMouseX = e.offsetX;
    prevMouseY = e.offsetY;
    ctx.beginPath(); // Creating a new path to draw
    ctx.lineWidth = brushWidth; //passing brushSize as line width
    snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height)
}

const drawing = (e) => {
    if(!isDrawing) return;
    ctx.putImageData(snapshot, 0, 0);
    
    if(selectedTool === "brush"){
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke(); // drawing/ filling line with color
    }
    else if(selectedTool === "rectangle"){
        drawRect(e);
    }
    else if(selectedTool === "circle"){
        drawCircle(e);
    }
    else{
        drawTriangle(e);
    }
}

toolsBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelector(".options .active").classList.remove("active");
        btn.classList.add("active");
        selectedTool = btn.id;
        console.log(selectedTool);
        
    })
})

sizeSlider.addEventListener("change", () => brushWidth = sizeSlider.value)

colorBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelector(".options .selected").classList.remove("selected");
        btn.classList.add("selected");
        console.log(window.getComputedStyle(btn).getPropertyValue());
        
    })
})

canvas.addEventListener("mousedown", startDraw);
canvas.addEventListener("mousemove", drawing);
canvas.addEventListener("mouseup", () => isDrawing = false);