// Original income data

let originalIncomeId = "";
let originalIncomeDate = "";
let originalIncomeCategory = "";
let originalIncomeAmount = "";
let originalIncomeNote = "";


// ============================================
// Open Edit Modal and load selected row data
// ============================================

document
    .querySelectorAll(".incomeEditBtn")
    .forEach(button => {

        button.addEventListener(
            "click",
            function () {
				
				// Save original values
				originalIncomeId = this.dataset.id;
				originalIncomeDate = this.dataset.date;
				originalIncomeCategory = this.dataset.category;
				originalIncomeAmount = this.dataset.amount;
				originalIncomeNote = this.dataset.note || "";

                document.getElementById(
                    "editIncomeId"
                ).value =
                    this.dataset.id;

                document.getElementById(
                    "editIncomeDate"
                ).value =
                    this.dataset.date;

                document.getElementById(
                    "editIncomeCategory"
                ).value =
                    this.dataset.category || "";

                document.getElementById(
                    "editIncomeAmount"
                ).value =
                    this.dataset.amount || "";

                document.getElementById(
                    "editIncomeNote"
                ).value =
                    this.dataset.note || "";

            });

    });


// ============================================
// Open Delete Confirmation Modal
// Close Edit Modal first
// ============================================

document
    .getElementById("openDeleteConfirmBtn")
    .addEventListener(
        "click",
        function () {

            const editModal =
                bootstrap.Modal.getInstance(
                    document.getElementById(
                        "incomeEditModal"));

            editModal.hide();
			
			document.getElementById(
			    "deleteIncomeId"
			).value =
			    originalIncomeId;
			
			document.getElementById(
			    "deleteIncomeDate"
			).textContent =
			    originalIncomeDate;

			document.getElementById(
			    "deleteIncomeCategory"
			).textContent =
			    originalIncomeCategory;

			document.getElementById(
			    "deleteIncomeAmount"
			).textContent =
			    originalIncomeAmount;

			document.getElementById(
			    "deleteIncomeNote"
			).textContent =
			     originalIncomeNote || "-";

            const deleteModal =
                new bootstrap.Modal(
                    document.getElementById(
                        "incomeDeleteConfirmModal"));

            deleteModal.show();
        });


// ============================================
// Return to Edit Modal
// Close Delete Confirmation Modal
// ============================================

document
    .getElementById("backToEditModal")
    .addEventListener(
        "click",
        function () {

            const deleteModal =
                bootstrap.Modal.getInstance(
                    document.getElementById(
                        "incomeDeleteConfirmModal"));

            deleteModal.hide();

            const editModal =
                new bootstrap.Modal(
                    document.getElementById(
                        "incomeEditModal"));

            editModal.show();
        });
		
		
// ============================================
// Open Update Confirmation Modal
// ============================================

document
    .getElementById("openUpdateConfirmBtn")
    .addEventListener(
        "click",
        function () {

            const editModal =
                bootstrap.Modal.getInstance(
                    document.getElementById(
                        "incomeEditModal"));

            editModal.hide();

            // Display values

            document.getElementById(
                "confirmIncomeDate"
            ).textContent =
                document.getElementById(
                    "editIncomeDate").value;

            document.getElementById(
                "confirmIncomeCategory"
            ).textContent =
                document.getElementById(
                    "editIncomeCategory").value;

            document.getElementById(
                "confirmIncomeAmount"
            ).textContent =
                document.getElementById(
                    "editIncomeAmount").value;

            document.getElementById(
                "confirmIncomeNote"
            ).textContent =
                document.getElementById(
                    "editIncomeNote").value || "-";

            // Hidden values

            document.getElementById(
                "confirmIncomeId"
            ).value =
                document.getElementById(
                    "editIncomeId").value;

            document.getElementById(
                "confirmIncomeDateInput"
            ).value =
                document.getElementById(
                    "editIncomeDate").value;

            document.getElementById(
                "confirmIncomeCategoryInput"
            ).value =
                document.getElementById(
                    "editIncomeCategory").value;

            document.getElementById(
                "confirmIncomeAmountInput"
            ).value =
                document.getElementById(
                    "editIncomeAmount").value;

            document.getElementById(
                "confirmIncomeNoteInput"
            ).value =
                document.getElementById(
                    "editIncomeNote").value;

            const confirmModal =
                new bootstrap.Modal(
                    document.getElementById(
                        "incomeUpdateConfirmModal"));

            confirmModal.show();
        });

// ============================================
// Return Edit Modal from Update Confirm Modal
// ============================================

document
    .getElementById("backToEditFromUpdate")
    .addEventListener(
        "click",
        function () {

            const confirmModal =
                bootstrap.Modal.getInstance(
                    document.getElementById(
                        "incomeUpdateConfirmModal"));

            confirmModal.hide();

            const editModal =
                new bootstrap.Modal(
                    document.getElementById(
                        "incomeEditModal"));

            editModal.show();
        });