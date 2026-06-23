document.addEventListener("DOMContentLoaded", function () {

	let originalExpense = {};
	
    // =========================
    // EDIT MODAL
    // =========================
    const expenseModal = document.getElementById("expenseEditModal");

    // =========================
    // DELETE MODAL
    // =========================
    const deleteModal = document.getElementById("expenseDeleteConfirmModal");

    // =========================
    // BUTTONS
    // =========================
    const openDeleteBtn = document.getElementById("openExpenseDeleteBtn");
    const backBtn = document.getElementById("backToExpenseEditModal");

    // =========================
    // STOP ONLY IF MAIN MODAL MISSING
    // =========================
    if (!expenseModal) return;

    // =========================
    // EDIT FIELDS
    // =========================
    const mainSelect = document.getElementById("editExpenseMainCategory");
    const subSelect = document.getElementById("editExpenseSubCategory");

    const idField = document.getElementById("editExpenseId");
    const dateField = document.getElementById("editExpenseDate");
    const amountField = document.getElementById("editExpenseAmount");
    const noteField = document.getElementById("editExpenseNote");

    // =========================
    // DELETE FIELDS
    // =========================
    const deleteId = document.getElementById("deleteExpenseId");
    const deleteDate = document.getElementById("deleteExpenseDate");
    const deleteMain = document.getElementById("deleteExpenseMainCategory");
    const deleteSub = document.getElementById("deleteExpenseSubCategory");
    const deleteAmount = document.getElementById("deleteExpenseAmount");
    const deleteNote = document.getElementById("deleteExpenseNote");

    let currentMainCategory = "";

    // =========================
    // LOAD SUB CATEGORIES
    // =========================
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

    // =========================
    // MAIN CATEGORY CHANGE
    // =========================
    if (mainSelect) {
        mainSelect.addEventListener("change", function () {
            currentMainCategory = this.value;
            loadSubCategories(this.value);
        });
    }

    // =========================
    // EDIT MODAL OPEN (Bootstrap)
    // =========================
    expenseModal.addEventListener("show.bs.modal", function (event) {

        const button = event.relatedTarget;
		
		originalExpense = {
		    id: button.getAttribute("data-id"),
		    date: button.getAttribute("data-date"),
		    mainCategory: button.getAttribute("data-main-category"),
		    subCategory: button.getAttribute("data-sub-category"),
		    amount: button.getAttribute("data-amount"),
		    note: button.getAttribute("data-note")
		};

        const mainCategory = button.getAttribute("data-main-category");
        const subCategory = button.getAttribute("data-sub-category");

        idField.value = button.getAttribute("data-id");
        dateField.value = button.getAttribute("data-date");

        const rawAmount = button.getAttribute("data-amount");
        const amount = parseFloat(rawAmount);
        amountField.value = isNaN(amount) ? "" : amount;

        noteField.value = button.getAttribute("data-note");

        // MAIN CATEGORY LOAD
        mainSelect.innerHTML = "";

        Object.keys(window.subcategories).forEach(category => {

            const option = document.createElement("option");
            option.value = category;
            option.textContent = category;

            mainSelect.appendChild(option);
        });

        mainSelect.value = mainCategory;
        currentMainCategory = mainCategory;

        // SUB CATEGORY LOAD
        loadSubCategories(mainCategory, subCategory);
    });

    // =========================
    // DELETE MODAL OPEN
    // =========================
    if (openDeleteBtn && deleteModal) {

        openDeleteBtn.addEventListener("click", function () {
			
			document.getElementById("deleteExpenseId").value = originalExpense.id;
			document.getElementById("deleteExpenseDate").innerText = originalExpense.date;
			document.getElementById("deleteExpenseMainCategory").innerText = originalExpense.mainCategory;
			document.getElementById("deleteExpenseSubCategory").innerText = originalExpense.subCategory;
			document.getElementById("deleteExpenseAmount").innerText = originalExpense.amount;
			document.getElementById("deleteExpenseNote").innerText = originalExpense.note;

            // hide edit modal safely
            let editInstance = bootstrap.Modal.getInstance(expenseModal);
            if (!editInstance) editInstance = new bootstrap.Modal(expenseModal);
            editInstance.hide();

            // show delete modal
            new bootstrap.Modal(deleteModal).show();
        });
    }

    // =========================
    // BACK BUTTON
    // =========================
    if (backBtn && deleteModal) {

        backBtn.addEventListener("click", function () {

            let deleteInstance = bootstrap.Modal.getInstance(deleteModal);
            if (!deleteInstance) deleteInstance = new bootstrap.Modal(deleteModal);
            deleteInstance.hide();

            let editInstance = bootstrap.Modal.getInstance(expenseModal);
            if (!editInstance) editInstance = new bootstrap.Modal(expenseModal);
            editInstance.show();
        });
    }

});