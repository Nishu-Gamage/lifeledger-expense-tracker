document.addEventListener("DOMContentLoaded", function () {

	/* ------------------------------------
		INCOME CONFIRM MODEL MANAGE
	---------------------------------------*/
    let showIncomeConfirm = window.showIncomeConfirm;

    if (showIncomeConfirm) {
        let modalElement = document.getElementById('confirmIncomeModal');
        let confirmModal = new bootstrap.Modal(modalElement);

        confirmModal.show();
    }

	/* ------------------------------------
		DASHBOARD TABLE CATEGORY DISPLAY
	---------------------------------------*/
    const tableBody = document.getElementById("categoryTableBody");

	if (tableBody && window.subcategories && Array.isArray(categoryTotals)) {
		
		// DB data array
	    // categoryTotals from thymeleaf
	    // example:
	    // [{mainCategory:"Food", totalAmount:3000}]

        Object.keys(window.subcategories).forEach(category => {

			// find matching category from DB
			const found = categoryTotals.find(item =>
		                    item.mainCategory
		                        .trim()
		                        .toLowerCase()
								===
			                    category
			                        .trim()
			                        .toLowerCase()
			                );
			// if found -> amount
	        // else -> 0
			const total = found ? found.totalAmount : 0;
			
            tableBody.innerHTML += `
                <tr>
                    <td class="p-1">${category}</td>
                    <td class="p-1"> ¥ ${total.toLocaleString()}</td>
                </tr>
            `;
			
        });
    }
});