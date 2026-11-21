const cars = [
    { type: "sedan", name: "Honda Accord", description: "A comfortable sedan with plenty of room for everyday trips.", year: 2024 },
    { type: "sedan", name: "Toyota Camry", description: "A reliable car with good fuel economy.", year: 2024 },
    { type: "sedan", name: "Hyundai Elantra", description: "A compact sedan for driving around town.", year: 2023 },
    { type: "suv", name: "Toyota RAV4", description: "A versatile SUV with extra cargo space.", year: 2024 },
    { type: "suv", name: "Honda CR-V", description: "A spacious SUV for family trips.", year: 2023 },
    { type: "suv", name: "Ford Explorer", description: "A larger SUV with seating for the whole family.", year: 2024 },
    { type: "truck", name: "Ford F-150", description: "A pickup truck for hauling equipment and gear.", year: 2024 },
    { type: "truck", name: "Toyota Tacoma", description: "A midsize pickup for work or weekend adventures.", year: 2023 },
    { type: "sports", name: "Ford Mustang", description: "A sporty coupe for an exciting drive.", year: 2024 },
    { type: "sports", name: "Chevrolet Camaro", description: "A performance car with classic muscle car styling.", year: 2023 }
];

function validateSearch() {
    const form = document.querySelector(".rental-form");
    const carType = form.querySelector("#car-type").value;
    const pickupDate = form.querySelector("#pickup-date").value;
    const returnDate = form.querySelector("#return-date").value;
    const errors = [];

    if (!carType) {
        errors.push("Please choose a car type.");
    }
    if (!pickupDate) {
        errors.push("Please choose a pickup date.");
    }
    if (!returnDate) {
        errors.push("Please choose a return date.");
    }

    if (pickupDate) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const pickup = new Date(pickupDate + "T00:00:00");

        if (pickup <= today) {
            errors.push("Pickup date must be in the future.");
        }
    }

    if (pickupDate && returnDate && returnDate <= pickupDate) {
        errors.push("Return date must be after the pickup date.");
    }

    return errors;
}

const searchForm = document.querySelector(".rental-form");
if (searchForm) {
    const searchButton = searchForm.querySelector('button[type="submit"]');

    searchButton.addEventListener("click", function (event) {
        const previousErrors = searchForm.querySelector(".search-errors");
        if (previousErrors) {
            previousErrors.remove();
        }

        const errors = validateSearch();

        if (errors.length > 0) {
            event.preventDefault();

            const errorList = document.createElement("ul");
            errorList.className = "search-errors";

            errors.forEach(function (message) {
                const item = document.createElement("li");
                item.textContent = message;
                errorList.appendChild(item);
            });

            searchForm.appendChild(errorList);
        }
    });
}

function displayCars(carList) {
    const container = document.getElementById("car-list");
    container.textContent = "";
    const params = new URLSearchParams(window.location.search);

    if (carList.length === 0) {
        container.textContent = "No cars found for this type.";
        return;
    }

    carList.forEach(function (car) {
        const card = document.createElement("article");
        card.className = "car-card";

        const name = document.createElement("h3");
        name.textContent = car.year + " " + car.name;

        const type = document.createElement("p");
        type.className = "car-type";
        type.textContent = car.type === "sports" ? "Sports Car" : car.type.toUpperCase();

        const description = document.createElement("p");
        description.className = "car-description";
        description.textContent = car.description;

        const rentButton = document.createElement("button");
        rentButton.type = "button";
        rentButton.className = "button rent-button";
        rentButton.textContent = "Rent This Car";

        rentButton.addEventListener("click", function () {
            const rental = {
                carType: car.type,
                startDate: params.get("pickup") || "",
                returnDate: params.get("return") || ""
            };

            document.dispatchEvent(new CustomEvent("confirm-rental", {
                detail: rental
            }));
        });

        card.appendChild(name);
        card.appendChild(type);
        card.appendChild(description);
        card.appendChild(rentButton);
        container.appendChild(card);
    });
}

function listCars() {
    const params = new URLSearchParams(window.location.search);

    if (params.has("type")) {
        const type = params.get("type");
        const filteredCars = cars.filter(function (car) {
            return car.type === type;
        });
        displayCars(filteredCars);
    } else {
        displayCars(cars);
    }
}
