document.addEventListener("DOMContentLoaded", function () {
	
	const form = document.querySelector("#searchaddIncomeModal form");

    // Bootstrap modal object
    const modalElement = document.getElementById("searchaddIncomeModal");
    const modal = bootstrap.Modal.getOrCreateInstance(modalElement);

	/* =========================================
	            AMOUNT FORMAT
	    ========================================= */

	    const amountDisplay = document.getElementById("amountDisplay");

	    const hiddenAmount = document.getElementById("amount");

	    amountDisplay.addEventListener("input", function () {

	        // remove commas
	        let value = this.value.replace(/,/g, "");

	        // numbers only
	        value = value.replace(/\D/g, "");

	        // hidden clean value
	        hiddenAmount.value = value;

	        // display with commas
	        if (value !== "") {
	            this.value = Number(value).toLocaleString();
	        } else {
	            this.value = "";
	        }
	    });
		
	/* =========================================
	   　		CLEAR button
	========================================= */
    document.getElementById("clearExpenseFormBtn")
        .addEventListener("click", function () {

            form.reset();

        });

		
	/* =========================================
	   　		CANCEL button
	========================================= */
    document.getElementById("cancelBtn")
        .addEventListener("click", function () {

            // Clear form
            form.reset();

            // Close popup
            modal.hide();

			// Remove frozen backdrop
			document.querySelectorAll('.modal-backdrop').forEach(el => el.remove());
			document.body.classList.remove('modal-open');
			document.body.style = "";
        });
		
	/* =========================================
	        BACK button
	========================================= */

	const backBtn = document.getElementById("backToCaptureModalBtn");

	if (backBtn) {

	    backBtn.addEventListener("click", function () {

			// get confirm values
			const incomeDate = document.getElementById("confirmIncomeDate").innerText;
			const category = document.getElementById("confirmCategory").innerText;
			const amount = document.getElementById("confirmAmount").innerText;
			const note = document.getElementById("confirmNote").innerText;
			   
			// set capture modal values
	        document.getElementById("incomedate").value = incomeDate;
	        document.getElementById("position").value = category;
	        document.getElementById("amountDisplay").value = Number(amount).toLocaleString();
	        document.getElementById("amount").value = amount.replace(/,/g, '');
	        document.getElementById("cell").value = note;
						
	        // close confirm modal
	        const confirmModalElement =  document.getElementById("confirmIncomeModal");
	        const confirmModal = bootstrap.Modal.getInstance(confirmModalElement);

	        confirmModal.hide();

	        // reopen capture modal
	        const captureModalElement = document.getElementById("searchaddIncomeModal");
	        const captureModal = new bootstrap.Modal(captureModalElement);

	        captureModal.show();
	    });
	}
	
	console.log(
	    document.getElementById("confirmIncomeModal")
	);

	/* =========================================
			AUTO OPEN CONFIRM MODAL
	========================================= */
    if (window.showIncomeConfirm) {

        const modalElement =
            document.getElementById("confirmIncomeModal");

        if (modalElement) {

            const confirmModal =
                new bootstrap.Modal(modalElement);

            confirmModal.show();
        }
    }
});