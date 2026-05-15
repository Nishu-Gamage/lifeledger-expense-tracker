document.addEventListener("DOMContentLoaded", function () {

    console.log("expense-confirm-list.js loaded");

    /* =========================================
       OPEN CONFIRM MODAL
    ========================================= */

    const confirmButton =
        document.getElementById(
            "openConfirmModalBtn"
        );

    if (!confirmButton) {
        return;
    }

	confirmButton.addEventListener(
	    "click",
	    function () {

	        /* =========================
	           VALIDATE FORM
	        ========================= */

	        const form =
	            document.querySelector(
	                "#searchAddListExModal form"
	            );

	        if (!form.checkValidity()) {

	            form.reportValidity();

	            return;

	        }

	        /* =========================
	           LOAD CONFIRM DATA
	        ========================= */

	        loadConfirmExpenseList();

	        /* =========================
	           CLOSE CAPTURE MODAL
	        ========================= */

	        const captureModalElement =
	            document.getElementById(
	                "searchAddListExModal"
	            );

	        const captureModal =
	            bootstrap.Modal.getInstance(
	                captureModalElement
	            );

	        captureModal.hide();

	        /* =========================
	           OPEN CONFIRM MODAL
	        ========================= */

	        const confirmModal =
	            new bootstrap.Modal(
	                document.getElementById(
	                    "searchConfirmListExModal"
	                )
	            );

	        confirmModal.show();

	    });

    /* =========================================
       LOAD CONFIRM TABLE
    ========================================= */

    function loadConfirmExpenseList() {

        const captureRows =
            document.querySelectorAll(
                "#searchAddListExModal tbody tr"
            );

        const confirmTableBody =
            document.getElementById(
                "confirmExpenseTableBody"
            );

        confirmTableBody.innerHTML = "";

        captureRows.forEach(row => {

            const expenseDate =
                row.querySelector(
                    'input[name="expenseDate"]'
                )?.value || "";

            const amount =
                row.querySelector(
                    ".list-amount"
                )?.value || "";

            const mainCategory =
                row.querySelector(
                    ".main-category"
                )?.value || "";

            const subCategory =
                row.querySelector(
                    ".sub-category"
                )?.value || "";

            const note =
                row.querySelector(
                    'input[name="note"]'
                )?.value || "";

            const confirmRow =
                document.createElement("tr");

            confirmRow.innerHTML = `

                <td>${expenseDate}</td>

                <td class="text-end">
                    ${amount}
                </td>

                <td>
                    ${mainCategory}
                </td>

                <td>
                    ${subCategory}
                </td>

                <td>
                    ${note}
                </td>

            `;

            confirmTableBody.appendChild(
                confirmRow
            );

        });

    }

	/* =========================================
	   BACK TO CAPTURE MODAL
	========================================= */

	const backButton =
	    document.getElementById(
	        "backToCaptureModalBtn"
	    );

	if (backButton) {

	    backButton.addEventListener(
	        "click",
	        function () {

	            /* CLOSE CONFIRM MODAL */

	            const confirmModalElement =
	                document.getElementById(
	                    "searchConfirmListExModal"
	                );

	            const confirmModal =
	                bootstrap.Modal.getInstance(
	                    confirmModalElement
	                );

	            confirmModal.hide();

	            /* OPEN CAPTURE MODAL */

	            const captureModal =
	                new bootstrap.Modal(
	                    document.getElementById(
	                        "searchAddListExModal"
	                    )
	                );

	            captureModal.show();

	        });

	}
});