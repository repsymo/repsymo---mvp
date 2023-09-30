// Copyright (c) 2022 Tobias Briones. All rights reserved.
// SPDX-License-Identifier: GPL-3.0-or-later
// This file is part of https://github.com/repsymo/2dp-repsymo-solver

import {
  Decision,
  newTreeNode,
  SolutionStageRow,
  TreeNode
} from '../../../model/machine-replacement';
import {Screenshots} from '../../../sim/sim';

export const parentElId = 'solutionsTreeParent';

export abstract class MrmCanvas {
  public padding: number;
  private canvasEl: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  protected constructor() {
    this.padding = 0;
  }

  get width() {
    return this.canvasEl.width;
  }

  get height() {
    return this.canvasEl.height;
  }

  init(canvasEl: HTMLCanvasElement) {
    this.canvasEl = canvasEl;
    this.ctx = this.canvasEl.getContext('2d');
    this.updateCanvasSize();
    this.update();
  }

  render() {
    this.update();
    this.draw(this.ctx);
  }

  private updateCanvasSize() {
    const parentEl = document.getElementById(parentElId);
    this.canvasEl.width = parentEl.offsetWidth - this.padding;
    this.canvasEl.height = parentEl.offsetHeight - this.padding;
  }

  protected abstract update();

  protected abstract draw(ctx: CanvasRenderingContext2D);
}

export class SolutionsTreeCanvas extends MrmCanvas {
  private readonly axesCanvas: TreeAxesCanvas;
  public readonly solutionMark: NodeSolutionMark;
  public rootNode: TreeNode;
  private radiusPx: number;

  screenshots: Screenshots;

  constructor() {
    super();
    this.axesCanvas = new TreeAxesCanvas();
    this.solutionMark = new NodeSolutionMark();
    this.rootNode = newTreeNode();
  }

  init(canvasEl) {
    super.init(canvasEl);
    this.axesCanvas.init(canvasEl);

    this.screenshots = new Screenshots(canvasEl);
  }

  render() {
    super.render();
    this.axesCanvas.render();
  }

  protected update() {
    this.radiusPx = this.axesCanvas.cellSize / 4;
  }

  protected draw(ctx) {
    const memoization = new Set<string>();

    this.drawNode(ctx, this.rootNode, memoization);
    this.screenshots.saveLast();
    this.screenshots.download();
  }

  private drawNode(ctx: CanvasRenderingContext2D, node: TreeNode, memoization: Set<string>) {
    const point2d = { x: node.decisionYear, y: node.machineAge };
    const point2dStr = JSON.stringify(point2d);
    const hasNeverBeenDrawn = !memoization.has(point2dStr);

    if (hasNeverBeenDrawn) {
      this.screenshots.save(`First Drawing of Node (${node.decisionYear}, ${node.machineAge})...`);
      this.drawNodeLines(ctx, node, memoization);
    }
    else {
      this.screenshots.save(`Partial Drawing of Node (${node.decisionYear}, ${node.machineAge})...`);
    }
    this.drawNodeCircle(ctx, node);
    this.drawNodeContent(ctx, node);
    memoization.add(point2dStr);
    this.screenshots.save(`Node (${node.decisionYear}, ${node.machineAge}) Done`);
  }

  private drawNodeLines(ctx: CanvasRenderingContext2D, node: TreeNode, memoization: Set<string>) {
    const padding = TreeAxesCanvas.AXIS_LABEL_SIZE_PX;
    const { x, y } = this.getNodeCP(node);
    const isNodeNext = (next: TreeNode) => node.machineAge === 1 && next.machineAge === 1;
    const isNodeBelow = (next: TreeNode) => node.machineAge < next.machineAge;

    const drawLineTo = (next: TreeNode) => {
      const nextX = (next.decisionYear * this.axesCanvas.cellSize) + padding;
      const nextY = this.height - (next.machineAge * this.axesCanvas.cellSize) - padding;
      const color = this.getLineColor(node, next);
      ctx.strokeStyle = this.getLineColor(node, next);
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(nextX, nextY);
      ctx.stroke();
      return color;
    };

    /**
     * Computes the rectangle triangle given by this node's (x, y) and the next
     * node's (nextX, nextY) points.
     */
    const triangle = (next: TreeNode) => {
      const nextCP = this.getNodeCP(next);
      const nextX = nextCP.x;
      const nextY = nextCP.y;
      const triangleX = nextX - x;
      const triangleY = Math.abs(nextY - y);
      const hypotenuse = getHypotenuse(triangleX, triangleY);
      return { triangleX, triangleY, hypotenuse };
    };

    const drawUpRightLabel = (next: TreeNode, label: string) => {
      const { triangleX, triangleY, hypotenuse } = triangle(next);
      const labelX = x + (triangleX * this.radiusPx / hypotenuse);
      const labelY = y - (triangleY * this.radiusPx / hypotenuse) - 16;
      ctx.fillText(label, labelX, labelY);
    };

    const drawDownRightLabel = (next: TreeNode, label: string) => {
      const { triangleX, triangleY, hypotenuse } = triangle(next);
      const labelX = x + (triangleX * this.radiusPx / hypotenuse) - 8;
      const labelY = y + (triangleY * this.radiusPx / hypotenuse) + 32;
      ctx.fillText(label, labelX, labelY);
    };

    const drawRightLabel = (next: TreeNode, label: string) => {
      const { triangleX, triangleY, hypotenuse } = triangle(next);
      const labelX = x + (triangleX * this.radiusPx / hypotenuse) + 8;
      const labelY = y + (triangleY * this.radiusPx / hypotenuse) + 32;
      ctx.fillText(label, labelX, labelY);
    };

    const drawLabelTo = (next: TreeNode, label: string) => {
      ctx.font = '24px Poppins';
      ctx.textAlign = 'center';
      ctx.fillStyle = 'black';

      if (isNodeBelow(next)) {
        drawUpRightLabel(next, label);
      }
      else if (isNodeNext(next)) {
        drawRightLabel(next, label);
      }
      else {
        drawDownRightLabel(next, label);
      }
    };

    if (node.k) {
      const color = drawLineTo(node.k) === 'black' ? '' : ' (Solution)';
      this.screenshots.save('Line K' + color);
      drawLabelTo(node.k, 'K');
      this.screenshots.save('Label K');

      this.screenshots.save('Recursion to Next Node...');

      this.drawNode(ctx, node.k, memoization); // Recursive call
    }
    if (node.r) {
      const color = drawLineTo(node.r) === 'black' ? '' : ' (Solution)';
      this.screenshots.save('Line R' + color);
      drawLabelTo(node.r, 'R');
      this.screenshots.save('Label R');

      this.screenshots.save('Recursion to Next Node...');

      this.drawNode(ctx, node.r, memoization); // Recursive call
    }
    this.screenshots.save('Node Lines Done');
  }

  private drawNodeCircle(ctx: CanvasRenderingContext2D, node: TreeNode) {
    const { x, y } = this.getNodeCP(node);
    ctx.beginPath();
    ctx.arc(x, y, this.radiusPx, 0, 2 * Math.PI);
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'black';
    ctx.fill();
    ctx.stroke();
    const sol = this.solutionMark.fillNodeSolutionMarkIfAny(
        ctx,
        node,
        x,
        y,
        this.radiusPx
    );

    if (sol) {
      this.screenshots.save('Node Circle (Solution)');
    } else {
      this.screenshots.save('Node Circle');
    }
  }

  private drawNodeContent(ctx: CanvasRenderingContext2D, node: TreeNode) {
    ctx.font = '48px Poppins';
    ctx.textAlign = 'center';
    ctx.fillStyle = 'black';
    const txt = String(node.machineAge);
    const txtMetrics = ctx.measureText(txt);
    const txtHeight = txtMetrics.actualBoundingBoxAscent + txtMetrics.actualBoundingBoxDescent;
    const { x, y } = this.getNodeCP(node);
    ctx.fillText(txt, x, y + txtHeight / 2);
    this.screenshots.save(`Node Content: ${txt}`);
  }

  private getNodeCP(node: TreeNode) {
    return {
      x: (node.decisionYear * this.axesCanvas.cellSize) + TreeAxesCanvas.AXIS_LABEL_SIZE_PX,
      y: this.height - (node.machineAge * this.axesCanvas.cellSize) - TreeAxesCanvas.AXIS_LABEL_SIZE_PX
    };
  }

  private getLineColor(node: TreeNode, next: TreeNode) {
    return this.solutionMark.areConnected(node, next) ? '#0288d1' : 'black';
  }
}

export class TreeAxesCanvas extends MrmCanvas {
  public static readonly AXIS_LABEL_SIZE_PX = 24;
  public maxAbscissa: number;
  public maxOrdinate: number;
  private cellSizePx: number;

  constructor() {
    super();
    this.padding = TreeAxesCanvas.AXIS_LABEL_SIZE_PX;
    this.maxAbscissa = 6;
    this.maxOrdinate = 7;
  }

  get cellSize() {
    return this.cellSizePx;
  }

  protected update() {
    this.cellSizePx = this.width / (this.maxAbscissa + 1);
  }

  protected draw(ctx) {
    ctx.font = '12px Poppins';
    ctx.fillStyle = 'black';
    ctx.strokeStyle = 'black';

    ctx.moveTo(this.padding, 0);
    ctx.lineTo(this.padding, this.height - this.padding);
    ctx.lineTo(this.width, this.height - this.padding);
    ctx.lineWidth = 1;
    ctx.stroke();
    this.drawXLabels(ctx);
    this.drawYLabels(ctx);
  }

  private drawXLabels(ctx) {
    ctx.textAlign = 'center';

    for (let i = 0; i <= this.maxAbscissa; i++) {
      const x = (i * this.cellSizePx) + this.padding;
      ctx.fillText(String(i), x, this.height);
    }
  }

  private drawYLabels(ctx) {
    ctx.textAlign = 'start';

    for (let i = 1; i <= this.maxOrdinate; i++) {
      const y = this.height - (i * this.cellSizePx) - this.padding;
      ctx.fillText(String(i), 0, y);
    }
  }
}

// By designing a domain model all the actions are easy trivial to execute
// By using primitive obsession and so, many complicated algorithms with
// side effects have to be done
// This is a great implementation for the current stage of the project though
class NodeSolutionMark {
  private readonly solutions: Set<string>;
  private readonly connectedNodes: Set<string>;
  private stages: SolutionStageRow[][];
  private currentStage: number;

  constructor() {
    this.solutions = new Set();
    this.connectedNodes = new Set();
    this.currentStage = 1;
  }

  init(stages: SolutionStageRow[][]) {
    this.stages = stages;

    this.solutions.clear();
    this.connectedNodes.clear();
    this.markStageSolutionNode(0, stages[0][0].t);
  }

  fillNodeSolutionMarkIfAny(
    ctx: CanvasRenderingContext2D,
    node: TreeNode,
    x: number,
    y: number,
    radiusPx: number
  ) {
    const point2dStr = JSON.stringify({
      x: node.decisionYear,
      y: node.machineAge
    });

    if (!this.solutions.has(point2dStr)) {
      return false;
    }
    ctx.beginPath();
    ctx.arc(x, y, radiusPx, 0, 2 * Math.PI);
    ctx.fillStyle = '#b3e5fc';
    ctx.fill();
    ctx.stroke();
    return true;
  }

  areConnected(node: TreeNode, nextNode: TreeNode) {
    const ser = (n: TreeNode) => JSON.stringify({
      x: n.decisionYear,
      y: n.machineAge
    });
    return this.connectedNodes.has(ser(node) + ser(nextNode));
  }

  private markStageSolutionNode(x: number, t: number) {
    const nextX = x + 1;
    const row = this.stages[x].find(r => r.t === t);
    const { decision } = row;

    const getNextIndexes = () => {
      if (decision === Decision.KEEP) {
        return [t + 1];
      }
      else if (decision === Decision.REPLACE) {
        return [1];
      }
      return [t + 1, 1];
    };

    const isLastStage = (decisionYear: number) => decisionYear === this.stages.length;
    const nextMachineAge = getNextIndexes();

    const markConnected = (rowX: number, machineAge: number) => {
      const point2dStr = JSON.stringify({ x: rowX + 1, y: machineAge });
      const nextPoint2dStr = JSON.stringify({
        x: rowX + 2,
        y: nextMachineAge[0]
      });
      this.connectedNodes.add(point2dStr + nextPoint2dStr);

      if (nextMachineAge.length === 2) {
        const otherPoint2dStr = JSON.stringify({
          x: rowX + 2,
          y: nextMachineAge[1]
        });
        this.connectedNodes.add(point2dStr + otherPoint2dStr);
      }
    };

    const mark = (rowX: number, machineAge: number) => {
      const point2dStr = JSON.stringify({ x: rowX + 1, y: machineAge });
      this.solutions.add(point2dStr);
      markConnected(rowX, machineAge);
    };

    const markNext = () => {
      mark(nextX, nextMachineAge[0]);
      if (nextMachineAge.length === 2) {
        mark(nextX, nextMachineAge[1]);
      }
    };

    mark(x, t);
    if (isLastStage(nextX)) {
      markNext();
      return;
    }

    this.markStageSolutionNode(nextX, nextMachineAge[0]);
    if (nextMachineAge.length === 2) {
      this.markStageSolutionNode(nextX, nextMachineAge[1]);
    }
  }
}

function getHypotenuse(triangleX: number, triangleY: number) {
  return Math.sqrt(Math.pow(triangleX, 2) + Math.pow(triangleY, 2));
}
