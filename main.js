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
