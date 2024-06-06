let autoSaloonList = [];

function AutoSaloon(amountOfSpace, name, address) {
  const garage = [];

  this.amountOfSpace = amountOfSpace;
  this.name = name;
  this.address = address;
  this.color = getRandomColor();

  this.id = Date.now();

  this.addCar = function (car) {
    if (garage.length < amountOfSpace) {
      const isAdded = car.addToSaloon(name);
      if (isAdded) {
        garage.push(car);
      }
    } else {
      console.log("The autosaloon is full. Create new autosaloon");
    }
  };

  this.deleteCar = function (carId) {
    const indexOfCar = garage.findIndex((x) => x.carId === carId);
    if (indexOfCar === -1) {
      console.log("There is no car with that ID");
    } else {
      garage[indexOfCar].removeFromSaloon();
      garage.splice(indexOfCar, 1);
    }
  };

  this.getInfo = function () {
    return `'${this.name}', max cars amount: ${
      this.amountOfSpace
    }, available space: ${this.amountOfSpace - garage.length}, adress ${
      this.address
    }`;
  };
}

function Car(mark, carNumber) {
  this.mark = mark;
  this.carId = carNumber;
  this.nameOfSaloon = "";

  this.addToSaloon = function (name) {
    if (this.nameOfSaloon) {
      console.log("This car is already in a saloon");
      return false;
    } else {
      this.nameOfSaloon = name;
      return true;
    }
  };

  this.removeFromSaloon = function () {
    this.nameOfSaloon = "";
  };

  this.getInfo = function () {
    if (!this.nameOfSaloon) {
      return "The car is not in a saloon";
    } else {
      return `Car ${this.mark}, car ID ${this.carId}, in ${this.nameOfSaloon} saloon`;
    }
  };
}

const addSaloonBtn = document.getElementById("addSaloonBtn");

addSaloonBtn.addEventListener("click", () => {
  const amountOfSpace = +prompt("Set amount of space in saloon");
  console.log(amountOfSpace);
  if (amountOfSpace === "NaN") {
    alert("Auto saloon's space must contain number");
    return;
  } else if (amountOfSpace < 1) {
    alert("Auto saloon's space must be higher than 1");
    return;
  } else if (amountOfSpace % 1 !== 0) {
    alert("The amount of space must be an integer");
    return;
  }
  const name = prompt("Set name for saloon");
  if (name === null || name.trim() === "") {
    alert("Auto saloon's name must contain at least 1 character");
    return;
  }
  const address = prompt("Set address for your saloon");
  if (address === null || address.trim() === "") {
    alert("Auto saloon's name must contain at least 1 character");
    return;
  }

  const autoSaloon = new AutoSaloon(amountOfSpace, name, address);
  autoSaloonList.push(autoSaloon);

  renderAutoSaloons();
});

function deleteAutoSaloon(id) {
  autoSaloonList = autoSaloonList.filter((x) => x.id !== id);
  renderAutoSaloons();
}

function editSaloonsName(id) {
  const newName = prompt("Enter new saloons name");
  if (newName === null || newName.trim() === "") {
    return;
  }

  for (var i = 0; i < autoSaloonList.length; i++) {
    if (autoSaloonList[i].id === id) {
      autoSaloonList[i].name = newName;
      break;
    }
  }
  renderAutoSaloons();
}

function editAmountOfSpace(id) {
  const newAmountOfSpace = prompt("Enter new amount of space");
  if (newAmountOfSpace === "NaN") {
    alert("Auto saloon's space must contain number");
    return;
  } else if (newAmountOfSpace < 1) {
    alert("Auto saloon's space must be higher than 1");
    return;
  } else if (newAmountOfSpace % 1 !== 0) {
    alert("The amount of space must be an integer");
    return;
  }

  for (var i = 0; i < autoSaloonList.length; i++) {
    if (autoSaloonList[i].amountOfSpace === id) {
      autoSaloonList[i].amountOfSpace = newAmountOfSpace;
      break;
    }
  }
  renderAutoSaloons();
}

function renderAutoSaloons() {
  const saloonsList = document.getElementById("saloonsList");

  saloonsList.innerHTML = "";

  autoSaloonList.forEach((autoSaloon) => {
    
    const divBox = document.createElement("div");

    divBox.style.backgroundColor = autoSaloon.color;
    divBox.style.height = "50px";
    divBox.style.width = "350px";
    divBox.style.border = "2px solid black";
    divBox.innerHTML = autoSaloon.name;

    const buttonDivBox = document.createElement("div");

    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Delete";
    deleteButton.addEventListener("click", () => {
      deleteAutoSaloon(autoSaloon.id);
    });
    const editButton = document.createElement("button");
    editButton.innerHTML = "Edit name";
    editButton.addEventListener("click", () => {
      editSaloonsName(autoSaloon.id);
    });

    const editAmountOfSpaceButton = document.createElement("button");
    editAmountOfSpaceButton.innerHTML = "Edit Amount Of space";
    editAmountOfSpaceButton.addEventListener("click", () => {
      editAmountOfSpace(autoSaloon.id);
    });

    buttonDivBox.appendChild(deleteButton);
    buttonDivBox.appendChild(editButton);
    buttonDivBox.appendChild(editAmountOfSpaceButton);
    divBox.appendChild(buttonDivBox);
    saloonsList.appendChild(divBox);
  });
}

function getRandomColor() {
  let r = Math.floor(Math.random() * 256);
  let g = Math.floor(Math.random() * 256);
  let b = Math.floor(Math.random() * 256);

  let color = "rgb(" + r + ", " + g + ", " + b + ")";

  return color;
}
