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
});