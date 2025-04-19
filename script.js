const canvas = document.getElementById("frame");
const ctx = canvas.getContext("2d");



const frames = {
     currentIndex: 0,
     maxIndex: 382
};

let imagesLoaded = 0;
const images = [];

function setCanvasSize() {
     canvas.width = window.innerWidth;
     canvas.height = window.innerHeight;
}

window.addEventListener("resize", () => {
     setCanvasSize();
     loadImages(Math.floor(frames.currentIndex));
});

function preloadImages(){
     for(let i = 1; i <= frames.maxIndex; i++){
          const imageUrl = `images/frame_${i.toString().padStart(4, "0")}.jpeg`;
          const img = new Image();
          img.src = imageUrl;
          img.onload = () =>{
               imagesLoaded++;
               if (imagesLoaded === frames.maxIndex){
                    setCanvasSize();
                    loadImages(frames.currentIndex);
                    startAnimation();
               }
          }
          images.push(img);
     }
}

function loadImages(index){
     if(index >= 0 && index < frames.maxIndex){
          const img = images[index];

          const scaleX = canvas.width / img.width;
          const scaleY = canvas.height / img.height;
          const scale = Math.max(scaleX, scaleY);

          const newWidth = img.width * scale;
          const newHeight = img.height * scale;

          const x = (canvas.width - newWidth) / 2;
          const y = (canvas.height - newHeight) / 2;

          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = "high";
          ctx.drawImage(img, x, y, newWidth, newHeight);
          frames.currentIndex = index;
     }
}

function startAnimation(){
     var tl = gsap.timeline({
          scrollTrigger:{
               trigger: '.parent',
               start: "top top",
               end: "bottom bottom",
               scrub: 2,
               markers: true
          }
     })

     tl.to(frames, {
          currentIndex: frames.maxIndex - 1,
          onUpdate: () => {
               loadImages(Math.floor(frames.currentIndex));
          },
          duration: 5
     })
}

preloadImages();
