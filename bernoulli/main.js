let flowA = new Flow(101325, 0, 10);
let flowB = new Flow(101325, 0, 15);

function updateFlowUI() {
    const flowWidthA = (flowA.v / 50) * 100;
    const flowWidthB = (flowB.v / 50) * 100;

    const pipeFlow = document.getElementById('pipeFlow');
    pipeFlow.style.width = `${(flowWidthA + flowWidthB) / 2}%`;

    pipeFlow.animate(
        [{ transform: 'translateX(-100%)' }, { transform: 'translateX(100%)' }],
        {
            duration: 1000 * (1 / ((flowA.v + flowB.v) / 2)),
            iterations: Infinity,
            easing: 'linear',
        }
    );
}

function synchronizeFlows() {
    const totalEnergyA = flowA.totalEnergy();
    const totalEnergyB = flowB.totalEnergy();
    const totalEnergy = (totalEnergyA + totalEnergyB) / 2;

    flowB.setValues(totalEnergy - flowB.h * 10000 - 0.5 * flowB.v * flowB.v, flowB.h, flowB.v);
    flowA.setValues(totalEnergy - flowA.h * 10000 - 0.5 * flowA.v * flowA.v, flowA.h, flowA.v);

    document.getElementById('pressureValueA').textContent = flowA.p;
    document.getElementById('velocityValueA').textContent = flowA.v;
    document.getElementById('heightValueA').textContent = flowA.h;
    document.getElementById('pressureValueB').textContent = flowB.p;
    document.getElementById('velocityValueB').textContent = flowB.v;
    document.getElementById('heightValueB').textContent = flowB.h;
}

const velocitySliderA = document.getElementById('velocityA');
velocitySliderA.addEventListener('input', (e) => {
    const newVelocity = Number(e.target.value);
    flowA.updateVelocity(newVelocity);
    synchronizeFlows();
    updateFlowUI();
});

const pressureSliderA = document.getElementById('pressureA');
pressureSliderA.addEventListener('input', (e) => {
    const newPressure = Number(e.target.value);
    flowA.updatePressure(newPressure);
    synchronizeFlows();
    updateFlowUI();
});

const velocitySliderB = document.getElementById('velocityB');
velocitySliderB.addEventListener('input', (e) => {
    const newVelocity = Number(e.target.value);
    flowB.updateVelocity(newVelocity);
    synchronizeFlows();
    updateFlowUI();
});

const pressureSliderB = document.getElementById('pressureB');
pressureSliderB.addEventListener('input', (e) => {
    const newPressure = Number(e.target.value);
    flowB.updatePressure(newPressure);
    synchronizeFlows();
    updateFlowUI();
});

const pipeEnd = document.getElementById('pipeEnd');
let heightA = 0;

pipeEnd.addEventListener('mousedown', (e) => {
    const onMouseMove = (event) => {
        heightA = Math.max(0, Math.min(200, event.clientY - 100));
        flowA.updateHeight(heightA / 10);
        synchronizeFlows();
        updateFlowUI();
    };

    const onMouseUp = () => {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
});

updateFlowUI();