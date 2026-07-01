document.addEventListener("DOMContentLoaded", function () {

	initCategoryDropdown(
	    "mainCategoryFilter",
	    "subCategoryFilter",
	    "filterForm"
	);
	
	initCategoryDropdown(
	    "dailyMainCategoryFilter",
	    "dailySubCategoryFilter",
	    "dailyFilterForm"
	);

});
	
function initCategoryDropdown(mainId, subId, formId) {
	
	const mainSelect = document.getElementById(mainId)	;
    const subSelect = document.getElementById(subId);

    if (!mainSelect || !subSelect || !window.subcategories) {
        return;
    }
	
	const params = new URLSearchParams(window.location.search);

	const selectedMain = params.get("mainCategory") || "";
	const selectedSub = params.get("subCategory") || "";
	
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

		document.getElementById(formId)?.submit();
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

	    document.getElementById("formId").submit();
	});
	
}