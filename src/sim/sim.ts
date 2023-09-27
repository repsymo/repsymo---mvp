// Copyright (c) 2023 Tobias Briones. All rights reserved.
// SPDX-License-Identifier: GPL-3.0-or-later
// This file is part of https://github.com/repsymo/2dp-repsymo-solver

function getScreenshot(canvasEl: HTMLCanvasElement, txt: string = '', title: string = '') {
    const clone = cloneCanvas(canvasEl);
    drawText(clone, txt);

    if (title.length !== 0) {
        drawTitle(clone, title);
        drawRef(clone, 'math.software')
    } else {
        drawRef(clone);
    }
    return clone.toDataURL('image/png');
}

function drawText(canvasEl: HTMLCanvasElement, txt: string) {
    const ctx = canvasEl.getContext('2d');
    ctx.font = '44px Poppins';
    ctx.fillStyle = '#212121';

    const metrics = ctx.measureText(txt)

    ctx.fillText(txt, (canvasEl.width - metrics.width) / 2, canvasEl.height - 72 - 88);
}

function drawTitle(canvasEl: HTMLCanvasElement, txt: string) {
    const ctx = canvasEl.getContext('2d');
    ctx.font = 'bold 36px Poppins';
    ctx.fillStyle = '#212121';
    const txtMetrics = ctx.measureText(txt);


    ctx.fillText(txt, (canvasEl.width - txtMetrics.width) / 2, canvasEl.height - 72 - 36);
}

function drawRef(canvasEl: HTMLCanvasElement, text: string = 'mathsoftware.engineer') {
    const ctx = canvasEl.getContext('2d');
    ctx.font = 'bold 36px Poppins';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#212121';
    const y = canvasEl.height - 72
    const txt = String(text);
    const txtMetrics = ctx.measureText(txt);
    const txtHeight = txtMetrics.actualBoundingBoxAscent + txtMetrics.actualBoundingBoxDescent;
    const cx = canvasEl.width / 2
    ctx.fillText(txt, cx, y + txtHeight / 2);
}

export function cloneCanvas(oldCanvas: HTMLCanvasElement) {
    const newCanvas = document.createElement('canvas');
    const context = newCanvas.getContext('2d');

    newCanvas.width = oldCanvas.width;
    newCanvas.height = oldCanvas.height + 128;

    context.drawImage(oldCanvas, 0, 0);
    return newCanvas;
}

export class Screenshots {
    private readonly canvas: HTMLCanvasElement;
    readonly ss: string[];

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.ss = [];
    }

    save(txt: string) {
        this.ss.push(getScreenshot(this.canvas, txt));
    }

    saveLast() {
        this.ss.push(getScreenshot(
            this.canvas,
            'MRM Solution Tree',
            'Repsymo',
        ));
    }

    download() {
        const combinedText = JSON.stringify(this.ss);
        const blob = new Blob([combinedText], { type: 'text/plain' });
        const a = document.createElement('a');

        console.log(`Downloading ${this.ss.length} screenshots`);
        a.href = URL.createObjectURL(blob);
        a.download = 'sim.json';
        a.click();
        URL.revokeObjectURL(a.href);
    }
}
