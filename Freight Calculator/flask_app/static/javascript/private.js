const saveProfile = (num) => {
  let weightType = "";
  if (document.getElementById("kilos").checked == true) {
    weightType = "kg";
  } else if (document.getElementById("pounds").checked == true) {
    weightType = "lb";
  }
  // "e" is the js event happening when we submit the form.
  // e.preventDefault() is a method that stops the default nature of javascript.
  var form = new FormData();
  form.append("id", document.getElementById(`selectProfile${num}`).value);
  form.append(
    "numberOfPcs",
    document.getElementById(`numberOfPcs${num}`).value
  );
  form.append("length", document.getElementById(`length${num}`).value);
  form.append("width", document.getElementById(`width${num}`).value);
  form.append("height", document.getElementById(`height${num}`).value);
  form.append("weight", document.getElementById(`weight${num}`).value);
  form.append("dimensionType", document.getElementById(`dimensionType`).value);
  form.append("weightType", weightType);
  // this how we set up a post request and send the form data.
  fetch("http://localhost:5000/create/user", { method: "POST", body: form })
    .then((response) => response.json())
    .then((data) => console.log(data));
  alert("Profile Saved");
};

const changeInput = (e, num) => {
  if (document.getElementById(`selectProfile${num}`).value == "newProfile") {
    const thing = document.getElementById(e.name);
    thing.innerHTML = `
          <input
          class="newName"
          type="text"
          name="profileName${num}"
          id="profileName${num}"
          placeholder="Name Profile"
          />
          `;
  } else {
    return;
  }
};

document.getElementById("addLine").addEventListener("click", function () {
  count += 1;
  var newInputs = document.createElement("tr");
  newInputs.id = `row${count}`;
  newInputs.innerHTML = `<th scope="row">${count}</th>
        <td id="profileName${count}">
        <Select name="profileName${count}" onchange="changeInput(this, ${count})" id="selectProfile${count}">
        <option disabled selected >Select Profile</option>
        {% for profile in profiles %}
        <option value="{{profile.id}}">{{profile.name}}</option>
        {% endfor %}
        <option value="newProfile">New Profile</option>
      </Select>
        </td>
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
        <td><button class="btn btn-success" onclick="saveProfile(${count})">Save Profile</button></td>
      </td>`;
  tr.appendChild(newInputs);
});
