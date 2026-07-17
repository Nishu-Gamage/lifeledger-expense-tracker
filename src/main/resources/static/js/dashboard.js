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

	if (tableBody && window.subcategories && Array.isArray(window.categoryTotals)) {
		
		// ALL categories from JS
	    const allCategories = Object.keys(window.subcategories);
	
	    // Merge categories with DB totals
	    const mergedCategories = allCategories.map(category => {

            const found = window.categoryTotals.find(item =>
		                    item.mainCategory
		                        .trim()
		                        .toLowerCase()
		                    ===
		                    category
		                        .trim()
		                        .toLowerCase()
		                );

	            return {
	
	                mainCategory: category,
	
	                totalAmount:
	                    found
	                    ? found.totalAmount
	                    : 0
	            };
        	});

		    // SORT highest -> lowest
		    mergedCategories.sort((a, b) =>
		        b.totalAmount - a.totalAmount
		    );
		
		    // CLEAR OLD ROWS
		    tableBody.innerHTML = "";
		
		    // DISPLAY
		    mergedCategories.forEach(item => {
		
		        tableBody.innerHTML += `
		            <tr>
		                <td class="p-1">
		                    ${item.mainCategory}
		                </td>
		
		                <td class="p-1">
		                    ${item.totalAmount.toLocaleString()} 円
		                </td>
		            </tr>
		        `;
		    });
	}
	
	/* ------------------------------------
	   EXPENSE TAB CONTROL
	---------------------------------------*/
	const params = new URLSearchParams(window.location.search);
	    const tab = params.get("tab");

	    let targetSelector = '[data-bs-target="#exp-home"]';

	    if (tab === "monthly") {
	        targetSelector = '[data-bs-target="#exp-menu1"]';
	    } 
	    else if (tab === "daily") {
	        targetSelector = '[data-bs-target="#exp-menu2"]';
	    }

	    const trigger = document.querySelector(targetSelector);

	    if (trigger) {

	        const tabInstance = bootstrap.Tab.getOrCreateInstance(trigger);

	        tabInstance.show();
	    }
});