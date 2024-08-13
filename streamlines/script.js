document.getElementById('velocity-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const vxFunction = new Function('x', 'y', 'return ' + document.getElementById('vx').value);
    const vyFunction = new Function('x', 'y', 'return ' + document.getElementById('vy').value);
    
    let x = parseFloat(document.getElementById('start-x').value);
    let y = parseFloat(document.getElementById('start-y').value);
    const dt = parseFloat(document.getElementById('time-step').value);
    const duration = parseFloat(document.getElementById('duration').value);
    
    const points = [];
    for (let t = 0; t <= duration; t += dt) {
        points.push({ x, y });
        const vx = vxFunction(x, y);
        const vy = vyFunction(x, y);
        x += vx * dt;
        y += vy * dt;
    }
    
    drawStreamline(points);
});

function drawStreamline(points) {
    const canvas = document.getElementById('streamline-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.moveTo(points[0].x + canvas.width / 2, -points[0].y + canvas.height / 2);
    
    for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x + canvas.width / 2, -points[i].y + canvas.height / 2);
    }
    
    ctx.stroke();
}
