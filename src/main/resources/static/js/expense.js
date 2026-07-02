document.addEventListener("DOMContentLoaded", function () {

	initCategoryDropdown(
	    "mainCategoryFilter",
	    "subCategoryFilter",
	    "filterForm",
	    "monthlyMainCategory",
	    "monthlySubCategory"
	);
	
	initCategoryDropdown(
	    "dailyMainCategoryFilter",
	    "dailySubCategoryFilter",
	    "dailyFilterForm",
	    "dailyMainCategory",
	    "dailySubCategory"
	);

});
	
function initCategoryDropdown(mainId, subId, formId, mainParam, subParam) {
	
	const mainSelect = document.getElementById(mainId);
    const subSelect = document.getElementById(subId);
	const form = document.getElementById(formId);

    if (!mainSelect || !subSelect || !window.subcategories || !form) {
        return;
    }
	
	const params = new URLSearchParams(window.location.search);

	const selectedMain = params.get(mainParam) || "";
	const selectedSub = params.get(subParam) || "";
	
    /* =========================
       LOAD MAIN CATEGORIES
    ========================= */	
	mainSelect.innerHTML = '<option value="">全て</option>';
	
	Object.keys(window.subcategories).forEach(main => {

	    const option = document.createElement("option");

	    option.value = main;
	    option.textContent = main;

	    if (main === selectedMain) {
	        option.selected = true;
	    }

	    mainSelect.appendChild(option);
	});

    /* =========================
       FUNCTION:
       LOAD SUB CATEGORIES
    ========================= */

	function loadSubCategories(selectedMain = "", selectedSub = "") {
		
        subSelect.innerHTML = '<option value="">全て</option>';

		let list;
		
		if (!selectedMain) {
		       list = Object.values(window.subcategories).flat();
		} else {
			   list = window.subcategories[selectedMain] || [];
		}
			   
		list.forEach(sub => {
		    const option = document.createElement("option");
		
		    option.value = sub;
		    option.textContent = sub;
		
		    if (sub === selectedSub) {
		        option.selected = true;
		    }
		
		    subSelect.appendChild(option);	
		});
    }

    /* =========================
       INITIAL LOAD
    ========================= */

    loadSubCategories(selectedMain, selectedSub);

    /* =========================
       MAIN CATEGORY CHANGED
    ========================= */
	
	mainSelect.addEventListener("change", function () {

	    loadSubCategories(this.value, "");
	    subSelect.value = "";

		form.submit();
	});


	/* =========================
	   SUB CATEGORY CHANGED
	========================= */	
	subSelect.addEventListener("change", function () {

	    const selectedSub = this.value;

	    if (!selectedSub) {
	        mainSelect.value = "";
	    } else {

	        for (const [main, subs] of Object.entries(window.subcategories)) {

	            if (subs.includes(selectedSub)) {
										
	                mainSelect.value = main;
					
	                break;
	            }
	        }
	    }

		form.submit();
	});
	
	/* =========================
	   CLEAR BTN
	========================= */	
	function formatDate(date) {

	    const year = date.getFullYear();
	    const month = String(date.getMonth() + 1).padStart(2, "0");
	    const day = String(date.getDate()).padStart(2, "0");

	    return `${year}-${month}-${day}`;
	}

	const clearBtn = document.getElementById("dailyClearBtn");

	if (clearBtn && formId === "dailyFilterForm") {

	    clearBtn.addEventListener("click", function () {

	        // reset categories
	        mainSelect.value = "";
	        loadSubCategories("", "");

	        // reset dates
	        const today = new Date();
	        const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);

	        const fromInput = form.elements["fromDate"];
	        const toInput = form.elements["toDate"];

	        if (fromInput && toInput) {
	            fromInput.value = formatDate(firstDay);
	            toInput.value = formatDate(today);
	        }
	    });
	}
}