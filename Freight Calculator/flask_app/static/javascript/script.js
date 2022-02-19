var count = 1;
var totalChargeable = 0;
var totalWeight = 0;
function getFormData() {
  let output = document.querySelector(".chargeable");
  output.innerHTML = "";
  var dimensionType = document.getElementById("dimensionType").value;
  var outputDims = document.getElementById("outputDims").value;
  var outputWeight = document.getElementById("outputWeight").value;
  let weightType = "";
  if (document.getElementById("kilos").checked == true) {
    weightType = "kg";
  } else if (document.getElementById("pounds").checked == true) {
    weightType = "lb";
  }
  totalChargeable = 0;
  totalWeight = 0;
  console.log(weightType, outputWeight);
  for (let x = 0; x < count; x++) {
    var numOfPcs = document.getElementById(`numberOfPcs${x + 1}`).value;
    var length = document.getElementById(`length${x + 1}`).value;
    var width = document.getElementById(`width${x + 1}`).value;
    var height = document.getElementById(`height${x + 1}`).value;
    var weight = document.getElementById(`weight${x + 1}`).value;
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
      <td>${convertDims(dimensionType, outputDims, length)}</td>
      <td>${convertDims(dimensionType, outputDims, width)}</td>
    <td>${convertDims(dimensionType, outputDims, height)}</td>
    <td>${convertWeight(weightType, outputWeight, weight)}</td>
    <td>${convertWeight(weightType, outputWeight, weight * numOfPcs)}</td>
    <td>${volume} kgs</td>
    </tr>`;
  }
  var totals = document.querySelector(".totals");
  totals.innerHTML = `<h4>Total Weight: ${convertWeight(
    weightType,
    outputWeight,
    totalWeight
  )} ${outputWeight}</h4>
  <h4>Total Chargeable: ${roundUp(
    convertWeight(weightType, outputWeight, totalChargeable),
    1
  )} ${outputWeight}</h4>`;
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
    totalChargeable += chargeable;
    return roundUp(chargeable, 1);
  } else if (dimensionType == "cm") {
    chargeable = ((length * width * height) / 6000) * numOfPcs;
    totalChargeable += chargeable;
    return roundUp(chargeable, 1);
  }
};

var tr = document.querySelector("tbody");

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

const convertDims = (inputDims, outputDims, num) => {
  if (
    (outputDims == "cm" && inputDims == "cm") ||
    (outputDims == "in" && inputDims == "in")
  ) {
    return num;
  } else if (inputDims == "in" && outputDims == "cm") {
    num = roundUp(num * 2.54, 1);
    return num;
  } else if (inputDims == "cm" && outputDims == "in") {
    num = roundUp(num * 0.3937007874, 1);
    return num;
  }
};
const convertWeight = (inputWeight, outputWeight, num) => {
  if (
    (outputWeight == "kg" && inputWeight == "kg") ||
    (outputWeight == "lb" && inputWeight == "lb")
  ) {
    console.log("here");
    return num;
  } else if (inputWeight == "kg" && outputWeight == "lb") {
    num = roundUp(num * 2.2046, 1);
    console.log(`kgs to lbs`);
    return num;
  } else if (inputWeight == "lb" && outputWeight == "kg") {
    num = roundUp(num / 2.2046, 1);
    console.log("lbs to kgs");
    return num;
  }
};
function roundUp(num, precision) {
  precision = Math.pow(10, precision);
  return Math.ceil(num * precision) / precision;
}
