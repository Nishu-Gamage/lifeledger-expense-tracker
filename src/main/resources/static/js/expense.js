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

    Object.keys(window.subcategories).forEach(main => {

        const option =
            document.createElement("option");

        option.value = main;
        option.textContent = main;

        mainSelect.appendChild(option);
    });

    /* =========================
       FUNCTION:
       LOAD SUB CATEGORIES
    ========================= */

    function loadSubCategories(selectedMain = "") {

        subSelect.innerHTML =
            '<option value="">全て</option>';

        if (!selectedMain) {

            // ALL SUB CATEGORIES

            Object.values(window.subcategories)
                .flat()
                .forEach(sub => {

                    const option =
                        document.createElement("option");

                    option.value = sub;
                    option.textContent = sub;

                    subSelect.appendChild(option);
                });

        } else {

            window.subcategories[selectedMain]
                .forEach(sub => {

                    const option =
                        document.createElement("option");

                    option.value = sub;
                    option.textContent = sub;

                    subSelect.appendChild(option);
                });
        }
    }

    /* =========================
       INITIAL LOAD
    ========================= */

    loadSubCategories();

    /* =========================
       MAIN CATEGORY CHANGED
    ========================= */

    mainSelect.addEventListener(
        "change",
        function () {

            loadSubCategories(this.value);
        }
    );

    /* =========================
       SUB CATEGORY CHANGED
    ========================= */

    subSelect.addEventListener(
        "change",
        function () {

            const selectedSub =
                this.value;

            if (!selectedSub) {
                mainSelect.value = "";
                return;
            }

            for (const [main, subs] of Object.entries(window.subcategories)) {

                if (subs.includes(selectedSub)) {

                    mainSelect.value = main;
                    break;
                }
            }
        }
    );

});