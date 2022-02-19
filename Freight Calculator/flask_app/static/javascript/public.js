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
