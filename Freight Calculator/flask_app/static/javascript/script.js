var count = 1;
var totalChargeable = 0;
var totalWeight = 0;
function getFormData() {
  let output = document.querySelector(".chargeable");
  output.innerHTML = "";
  const dimensionType = document.getElementById("dimensionType").value;
  let weightType = "";
  if (document.getElementById("kilos").checked == true) {
    weightType = "kg";
  } else if (document.getElementById("pounds").checked == true) {
    weightType = "lb";
  }
  totalChargeable = 0;
  totalWeight = 0;
  for (let x = 0; x < count; x++) {
    console.log(document.getElementById(`numberOfPcs${x + 1}`).value);
    const numOfPcs = document.getElementById(`numberOfPcs${x + 1}`).value;
    const length = document.getElementById(`length${x + 1}`).value;
    const width = document.getElementById(`width${x + 1}`).value;
    const height = document.getElementById(`height${x + 1}`).value;
    const weight = document.getElementById(`weight${x + 1}`).value;
    console.log(
      dimensionType,
      weightType,
      numOfPcs,
      length,
      width,
      height,
      weight
    );
    // calculateChargeable(dimensionType, numOfPcs, length, width, height);
    const volume = calculateChargeable(
      dimensionType,
      numOfPcs,
      length,
      width,
      height
    );
    totalWeight += numOfPcs * weight;
    output.innerHTML += `<tr>
    <td>${x + 1}</td>
    <td>${numOfPcs}</td>
    <td>${length}</td>
    <td>${width}</td>
    <td>${height}</td>
    <td>${weight}</td>
    <td>${weight * numOfPcs}</td>
    <td>${volume} kgs</td>
    </tr>`;
  }
  var totals = document.querySelector(".totals");
  totals.innerHTML = `<h4>Total Weight: ${totalWeight} ${weightType}s</h4>
  <h4>Total Chargeable: ${Math.ceil(totalChargeable)} kgs</h4>`;
}

const calculateChargeable = (
  dimensionType,
  numOfPcs,
  length,
  width,
  height
) => {
  let chargeable = 0;
  if (dimensionType == "in") {
    chargeable = ((length * width * height) / 366) * numOfPcs;
    console.log(chargeable);
    totalChargeable += chargeable;
    return Math.ceil(chargeable);
  } else if (dimensionType == "cm") {
    chargeable = ((length * width * height) / 6000) * numOfPcs;
    totalChargeable += chargeable;
    console.log(chargeable);
    return Math.ceil(chargeable);
  }
};

var tr = document.querySelector("tbody");

document.getElementById("addLine").addEventListener("click", function () {
  count += 1;
  var newInputs = document.createElement("tr");
  newInputs.id = `row${count}`;
  newInputs.innerHTML = `<th scope="row">${count}</th>
    <td>
      <input
        class="dims pcs"
        type="number"
        name="numberOfPcs"
        id="numberOfPcs${count}"
        placeholder="0"
      />
    </td>
    <td>
      <input
        class="dims"
        type="number"
        name="length"
        id="length${count}"
        placeholder="0"
        step="0.1"
      />
    </td>
    <td>
      <input
        class="dims"
        type="number"
        name="width"
        id="width${count}"
        placeholder="0"
        step="0.1"
      />
    </td>
    <td>
      <input
        class="dims"
        type="number"
        name="height"
        id="height${count}"
        placeholder="0"
        step="0.1"
      />
    </td>
    <td>
      <input
        class="dims"
        type="number"
        name="weight"
        id="weight${count}"
        placeholder="0"
        step="0.1"
      />
      <td scope="col" class="weightLabel" name="weightLabel">kgs</td>
    </td>`;
  tr.appendChild(newInputs);
});

document.getElementById("myForm").addEventListener("submit", function (event) {
  event.preventDefault();
});

const weightFunc = () => {
  const weights = document.querySelectorAll("input[name='weightType']");
  let label1 = document.querySelectorAll("th.weightLabel");
  let label = document.querySelectorAll("td.weightLabel");
  for (const w of weights) {
    if (w.checked) {
      console.log(w.value);
      for (const l of label) {
        l.innerText = w.value;
      }
      label1[0].innerText = w.value;
    }
  }
};

const removeLine = () => {
  let line = document.getElementById(`row${count}`);
  line.remove();
  count -= 1;
};
