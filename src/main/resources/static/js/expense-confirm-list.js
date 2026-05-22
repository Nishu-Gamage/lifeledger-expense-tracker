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

				    <td class="text-center align-middle border">
				        ${expenseDate}
				    </td>

				    <td class="text-end align-middle fw-bold text-primary border">
				        ¥ ${amount}
				    </td>

				    <td class="align-middle text-center border">
			            ${mainCategory}
				    </td>

				    <td class="align-middle text-center border">
			            ${subCategory}
				    </td>

				    <td class="align-middle text-break border">
				        ${note || "-"}
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
	
	/* =========================================
	   SAVE BUTTON EVENT
	========================================= */

	const saveButton =
	    document.getElementById(
	        "saveExpenseListBtn"
	    );

	if (saveButton) {

	    saveButton.addEventListener(
	        "click",
	        function () {

	            saveExpenseList();

	        });

	}
	
	/*==============================
	    SAVE EXPENSE LIST
	================================*/

	function saveExpenseList() {

	    /* =========================
	       GET ORIGINAL ROWS
	    ========================= */

	    const rows =
	        document.querySelectorAll(
	            "#searchAddListExModal tbody tr"
	        );

	    /* =========================
	       CREATE ARRAY
	    ========================= */

	    const expenseList = [];

	    /* =========================
	       LOOP ALL ROWS
	    ========================= */

	    rows.forEach(row => {

	        const expense = {

				mainCategory:
	               row.querySelector(
	                   ".main-category"
	               )?.value || "",

	           subCategory:
	               row.querySelector(
	                   ".sub-category"
	               )?.value || "",

			   amount: parseFloat(
			       row.querySelector(
			           'input[name="amount"]'
			       )?.value || 0
			   ),

	           note:
	               row.querySelector(
	                   'input[name="note"]'
	               )?.value || "",

	           expenseDate:
	               row.querySelector(
	                   'input[name="expenseDate"]'
	               )?.value || ""

	        };

	        expenseList.push(expense);

	    });

	    /* =========================
	       CHECK DATA
	    ========================= */

	    console.log(expenseList);

	    /* =========================
	       SEND TO BACKEND
	    ========================= */
		
		const token =
		    document.querySelector(
		        'meta[name="_csrf"]'
		    ).content;

		const header =
		    document.querySelector(
		        'meta[name="_csrf_header"]'
		    ).content;

		fetch("/saveExpenseList", {

	        method: "POST",

	        headers: {
	            "Content-Type":
	                "application/json",
				[header]: token
	        },

	        body: JSON.stringify(
	            expenseList
	        )

	    })

		.then(response => {

		    if (!response.ok) {

		        throw new Error(
		            "Server Error"
		        );

		    }

		    return response.text();

		})

	    .then(data => {

	        console.log(data);

			window.location.href =
			        "/expense";

	    })

	    .catch(error => {

	        console.error(error);

	        alert("Save Failed");

	    });

	}
	
	
	
	
	
	
	
});