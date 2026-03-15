window.addEventListener('load', function() {
    const canvas = document.getElementById('canvasPacman');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const centreX = 170;
    const centreY = 200;
    const radius = 100;
    
    ctx.beginPath();
    ctx.arc(centreX, centreY, radius, 0.17 * Math.PI, 1.83 * Math.PI);
    
    ctx.lineTo(centreX, centreY);
    
    ctx.fillStyle = "#FFD700"; 
    ctx.fill();

    ctx.beginPath();
    const oeilX = centreX + 10; 
    const oeilY = centreY - 50; 
    const oeilRadius = 14;
    
    ctx.arc(oeilX, oeilY, oeilRadius, 0, 2 * Math.PI);
    ctx.fillStyle = "black";
    ctx.fill();

    ctx.beginPath();
    ctx.arc(oeilX + 7, oeilY - 0, 4, 0, 2 * Math.PI);
    ctx.fillStyle = "white";
    ctx.fill();

    ctx.fillStyle = "white";
    
    ctx.beginPath();
    ctx.arc(260, 200, 15, 0, 2 * Math.PI);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(340, 200, 15, 0, 2 * Math.PI);
    ctx.fill();
});