window.onload = function () {

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

    if (tableBody && window.subcategories) {

        Object.keys(window.subcategories).forEach(category => {

            tableBody.innerHTML += `
                <tr>
                    <td class="p-1">${category}</td>
                    <td class="p-1">0</td>
                </tr>
            `;

        });

    }

};