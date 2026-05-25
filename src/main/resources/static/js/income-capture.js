document.addEventListener("DOMContentLoaded", function () {
	
	/* ---------------------------
	       CLEAR BTN
	--------------------------- */
    document.getElementById("clearExpenseFormBtn").addEventListener("click", function () {

        // Reset form to default values
        document.querySelector("#searchaddIncomeModal form").reset();

    });

});