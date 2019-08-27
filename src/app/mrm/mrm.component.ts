import { Component, OnInit } from '@angular/core';
import { MRMSolver } from '../solver/MRMSolver';

// This code comes from the previous project Machine Replacement Model, so this component will stay
// implemented as JS-like way
@Component({
  selector: 'app-mrm',
  templateUrl: './mrm.component.html',
  styleUrls: ['./mrm.component.css'],
  host: { class: 'page' }
})
export class MrmComponent implements OnInit {

  private solver: MRMSolver;

  constructor() {
    this.solver = new MRMSolver();
  }

  generateInputTable = (n: number, t: number) => {
    let html = '';

    html += `<table class="table">
                <thead>
                    <tr>
                        <th scope="col">
                            Time t (years)
                        </th>
                        <th scope="col">
                            Income ($)
                        </th>
                        <th scope="col">
                            Operation cost ($)
                        </th>
                        <th scope="col">
                            Selling revenue ($)
                        </th>
                    </tr>
                </thead>
                <tbody>`;
    for (let y = 0; y <= t; y++) {
        html += `<tr>
                    <th scope="row">${y}</th>`;
        for (let x = 0; x < 3; x++) {
            const id = `input_${x},${y}`;
            html += `<td>
                        <div class="form-group">
                            <input value="0" type="number" class="form-control" id="${id}">
                        </div>
                    </td>`;
        }
        html += `</tr>`;
    }
    html += `</tbody>
            </table>`;
    document.getElementById('inputTable').innerHTML = html;
  }

  getInputValueAt = (x: number, y: number) => {
    const inputValue = (document.getElementById(`input_${x},${y}`) as HTMLInputElement).value;
    const input = parseInt(inputValue);

    if (isNaN(input)) {
        alert('All the inputs are integer numbers!');
        return;
    }
    return input;
  }

  generateDataTable = (data) => {
    const maxAge = parseInt((document.getElementById('timeInput') as HTMLInputElement).value);
    for (let t = 0; t < data.length; t++) {
        if (t > maxAge) { break; }
        const row = data[t];
        (document.getElementById(`input_${0},${t}`) as HTMLInputElement).value = row.income;
        (document.getElementById(`input_${1},${t}`) as HTMLInputElement).value = row.operationCost;
        (document.getElementById(`input_${2},${t}`) as HTMLInputElement).value = row.sellingRevenue;
    }
  }


  ngOnInit() {

  }

  onNext() {
    const nInput = (document.getElementById('yearsInput') as HTMLInputElement).value;
    const tInput = (document.getElementById('timeInput') as HTMLInputElement).value;
    const initialAgeInput = (document.getElementById('initialAgeInput') as HTMLInputElement).value;
    const n = parseInt(nInput);
    const t = parseInt(tInput);
    const initialAge = parseInt(initialAgeInput);

    if (isNaN(n) || isNaN(t)) {
        alert('Invalid number');
        return;
    }
    if (initialAge > t) {
        alert('Invalid initial age');
        return;
    }
    this.generateInputTable(n, t);
    document.getElementById('solveButton').classList.remove('invisible');

    // Generate sample data
    const newRow = (income, operationCost, sellingRevenue) => {
        return {
            income,
            operationCost,
            sellingRevenue
        };
    };
    // const data1 = [
    //     newRow(21000, 210, -1),
    //     newRow(19500, 600, 60000),
    //     newRow(18500, 1300, 45000),
    //     newRow(17200, 1500, 42000),
    //     newRow(15500, 1750, 26000),
    //     newRow(14500, 1900, 10000),
    //     newRow(11200, 2100, 5000),
    // ];
    const data = [
        newRow(20000, 200, -1),
        newRow(19000, 600, 80000),
        newRow(18500, 1200, 60000),
        newRow(17200, 1500, 50000),
        newRow(15500, 1700, 30000),
        newRow(14000, 1800, 10000),
        newRow(12200, 2200, 5000),
    ];

    this.generateDataTable(data);
  }

  onSolve = () => {
    const decisionYearsInput = (document.getElementById('yearsInput') as HTMLInputElement).value;
    const maxAgeInput = (document.getElementById('timeInput') as HTMLInputElement).value;
    const initialAgeInput = (document.getElementById('initialAgeInput') as HTMLInputElement).value;
    const machinePriceInput = (document.getElementById('machinePrice') as HTMLInputElement).value;
    const decisionYears = parseInt(decisionYearsInput);
    const maxAge = parseInt(maxAgeInput);
    const initialAge = parseInt(initialAgeInput);
    const machinePrice = parseInt(machinePriceInput);
    const getData = () => {
        const newRow = (income, operationCost, sellingRevenue) => {
            return {
                income,
                operationCost,
                sellingRevenue
            };
        };
        const data = [];

        for (let t = 0; t <= maxAge; t++) {
            const income = this.getInputValueAt(0, t);
            const operationCost = this.getInputValueAt(1, t);
            const sellingRevenue = this.getInputValueAt(2, t);

            data[t] = newRow(income, operationCost, sellingRevenue);
        }
        return data;
    };
    const generateSolutionsTree = tree => {
        let html = '<div>';

        // Add rows from up to down
        for (let i = maxAge; i > 0; i--) {
            html += `<div style="width:${decisionYears * 192}px">
                        <div class="label">
                            ${i}
                        </div>`;

            // Fill row for each decision year
            for (let j = 0; j < decisionYears; j++) {
                const decisionColumn = tree[j];
                let nodeValue = null;

                // Check whether there is a node in here
                for (let k = 0; k < decisionColumn.length; k++) {
                    if (decisionColumn[k].machineAge == i) {
                        nodeValue = decisionColumn[k];
                        break;
                    }
                }
                if (nodeValue != null) {
                    const kNext = nodeValue.k != null ? nodeValue.k.machineAge : '-';
                    const rNext = nodeValue.r.machineAge;

                    html += `<div class="item">
                                <div>
                                    ${nodeValue.machineAge}
                                </div>
                                <span>
                                    (K: ${kNext}, R: ${rNext})
                                </span>
                            </div>`;
                } else {
                    html += `<div class="item invisible"></div>`;
                }
            }
            html += '</div>';
        }
        html += `<div style="width:${decisionYears * 192}px">
                        <div class="label"></div>`;

        // Fill row for each decision year
        for (let j = 1; j <= decisionYears; j++) {
            html += `<div class="item label">
                        <div>
                            ${j}
                        </div>
                    </div>`;
        }
        html += '</div>';
        html += '</div>';
        document.getElementsByClassName('solutions-tree')[0].innerHTML = html;
    };
    const generateSolutionsStages = stages => {
        let html = '';

        for (let i = stages.length; i > 0; i--) {
            const stage = stages[i - 1];
            html += `<p>STAGE ${i}</p>
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">t</th>
                                <th scope="col">K</th>
                                <th scope="col">R</th>
                                <th scope="col">max</th>
                                <th scope="col">Decision</th>
                            </tr>
                        </thead>
                        <tbody>`;

            stage.forEach(row => {
                html += `<tr>
                            <th scope="row">${row.t}</th>
                            <td>${row.k}</td>
                            <td>${row.r}</td>
                            <td>${row.max}</td>
                            <td>${row.decision}</td>
                        </tr>`;
            });
            html += '</tbody></table>';
        }
        document.getElementsByClassName('stages')[0].innerHTML = html;
    };
    const generateResult = (stages, initialAge) => {
        const getRow = (i, t) => stages[i].find(stage => stage.t == t);
        const chains = [];
        const chainsHTML = [];
        const getDecision = (start, t, chains) => {
            if (start >= stages.length) { return; }
            const decision = getRow(start, t).decision;
            let age = t;

            switch (decision) {
                case 'K':
                    age += 1;
                    break;

                case 'R':
                    age = 1;
                    break;

                case 'K or R':
                    const newChainK = [];
                    const newChainR = [];

                    getDecision(start + 1, age + 1, newChainK);
                    getDecision(start + 1, 1, newChainR);
                    chains.push({
                        k: newChainK,
                        r: newChainR
                    });
                    return;
            }
            chains.push(decision);
            getDecision(start + 1, age, chains);
        };
        const getChainsHTML = (chains, html, initial) => {
            const start = `<div class="chain">`;
            const end = `<div class="end">SELL</div></div>`;

            if (html == '') {
                html = start;
            }
            if (initial != null) {
                html += `<span>${initial}</span>`;
            }
            chains.forEach(e => {
                if (typeof e == 'string') {
                    html += `<span>${e}</span>`;
                } else {
                    getChainsHTML(e.k, html, 'K');
                    getChainsHTML(e.r, html, 'R');
                    return;
                }
            });
            html += end;
            chainsHTML.push(html);
        };
        getDecision(0, initialAge, chains);
        getChainsHTML(chains, '', null);
        let html = '';

        // chainsHTML.pop(); // Don't need the last
        chainsHTML.forEach(chain => html += chain);
        document.querySelector('.chains-container').innerHTML = html;
    };
    if (isNaN(decisionYears) || isNaN(initialAge) || isNaN(maxAge) || isNaN(machinePrice)) {
        alert('Values are integer numbers');
        return;
    }
    const data = getData();

    /*console.log(`Solving problem
                decision years: ${decisionYears}
                initial age: ${initialAge},
                maximum age: ${maxAge},
                machine price: ${machinePrice},
                data: \n${JSON.stringify(data)}`);*/
    this.solver.solve(decisionYears, initialAge, maxAge, machinePrice, data);

    // UI
    const tree = this.solver.getSolutionsTree();
    const stages = this.solver.getStages();

    /*console.log(`Solutions tree \n${JSON.stringify(tree)}`);
    console.log(`Stages \n${JSON.stringify(stages)}`);*/
    generateSolutionsTree(tree);
    generateSolutionsStages(stages);
    generateResult(stages, initialAge);
    document.getElementById('solutionPanel').classList.remove('gone');
  }
}
