document.addEventListener("DOMContentLoaded", function () {

    const expenseModal =
        document.getElementById("expenseEditModal");

    if (!expenseModal) return;

    const mainSelect =
        document.getElementById("editExpenseMainCategory");

    const subSelect =
        document.getElementById("editExpenseSubCategory");

    const idField =
        document.getElementById("editExpenseId");

    const dateField =
        document.getElementById("editExpenseDate");

    const amountField =
        document.getElementById("editExpenseAmount");

    const noteField =
        document.getElementById("editExpenseNote");

    let currentMainCategory = "";

    // ----------------------------
    // LOAD SUB CATEGORIES
    // ----------------------------
    function loadSubCategories(mainCategory, selectedSub = "") {

        subSelect.innerHTML = "";

        const subs = window.subcategories[mainCategory] || [];

        subs.forEach(sub => {
            const option = document.createElement("option");
            option.value = sub;
            option.textContent = sub;
            subSelect.appendChild(option);
        });

        if (selectedSub) {
            subSelect.value = selectedSub;
        }
    }

    // ----------------------------
    // MAIN CATEGORY CHANGE
    // ----------------------------
    mainSelect.addEventListener("change", function () {
        currentMainCategory = this.value;
        loadSubCategories(this.value);
    });

    // ----------------------------
    // MODAL OPEN
    // ----------------------------
    expenseModal.addEventListener("show.bs.modal", function (event) {

        const button = event.relatedTarget;

        const mainCategory = button.getAttribute("data-main-category");
        const subCategory = button.getAttribute("data-sub-category");

        // ID
        idField.value = button.getAttribute("data-id");

        // DATE
        dateField.value = button.getAttribute("data-date");

        // AMOUNT (FIXED)
        const rawAmount = button.getAttribute("data-amount");
        const amount = parseFloat(rawAmount);

        amountField.value = isNaN(amount) ? "" : amount;

        // NOTE
        noteField.value = button.getAttribute("data-note");

        // ----------------------------
        // MAIN CATEGORY LOAD
        // ----------------------------
        mainSelect.innerHTML = "";

        Object.keys(window.subcategories).forEach(category => {

            const option = document.createElement("option");
            option.value = category;
            option.textContent = category;

            mainSelect.appendChild(option);
        });

        mainSelect.value = mainCategory;
        currentMainCategory = mainCategory;

        // ----------------------------
        // SUB CATEGORY LOAD
        // ----------------------------
        loadSubCategories(mainCategory, subCategory);
    });

});