document.addEventListener("DOMContentLoaded", function () {

    const mainSelect =
        document.getElementById("mainCategoryFilter");

    const subSelect =
        document.getElementById("subCategoryFilter");

    if (!mainSelect || !subSelect || !window.subcategories) {
        return;
    }
		
    /* =========================
       LOAD MAIN CATEGORIES
    ========================= */

	const params = new URLSearchParams(window.location.search);

	const selectedMain = params.get("mainCategory") || "";
	const selectedSub = params.get("subCategory") || "";

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
        subSelect.innerHTML =
            '<option value="">全て</option>';

        if (!selectedMain) {

            // ALL SUB CATEGORIES

            Object.values(window.subcategories)
                .flat()
                .forEach(sub => {

					const option = document.createElement("option");

					option.value = sub;
					option.textContent = sub;

					if (sub === selectedSub) {
					    option.selected = true;
					}

					subSelect.appendChild(option);
                });

        } else {

            window.subcategories[selectedMain]
                .forEach(sub => {

					const option = document.createElement("option");

					option.value = sub;
					option.textContent = sub;

					if (sub === selectedSub) {
					    option.selected = true;
					}

					subSelect.appendChild(option);
                });
        }
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

	    document.getElementById("filterForm").submit();
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

	    document.getElementById("filterForm").submit();
	});
	
});