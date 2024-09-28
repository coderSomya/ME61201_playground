class Flow {
    constructor(p, h, v) {
        this.v = Number(v);
        this.p = Number(p);
        this.h = Number(h);
    }

    updateHeight(x) {
        this.h += x;
    }

    updateVelocity(x) {
        this.v += x;
    }

    updatePressure(x) {
        this.p += x;
    }

    totalEnergy() {
        let rho = 1000;
        let g = 10;
        return this.p + rho * g * this.h + 0.5 * rho * this.v * this.v;
    }

    setValues(p, h, v) {
        this.p = p;
        this.h = h;
        this.v = v;
    }
}