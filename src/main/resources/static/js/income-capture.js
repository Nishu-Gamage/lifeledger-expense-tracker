document.addEventListener("DOMContentLoaded", function () {
	
	const form = document.querySelector("#searchaddIncomeModal form");

    // Bootstrap modal object
    const modalElement = document.getElementById("searchaddIncomeModal");
    const modal = bootstrap.Modal.getOrCreateInstance(modalElement);

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