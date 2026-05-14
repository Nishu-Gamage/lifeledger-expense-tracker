document.addEventListener("DOMContentLoaded", function () {

    console.log("expense-list-capture.js loaded");

    /* =========================================
       GET TODAY DATE
    ========================================= */

    function getTodayDate() {

        return new Date()
            .toISOString()
            .split("T")[0];

    }

    /* =========================================
       LOAD MAIN CATEGORIES
    ========================================= */

    function loadMainCategories(mainSelect) {

        mainSelect.innerHTML = "";

        const defaultOption =
            document.createElement("option");

        defaultOption.value = "";
        defaultOption.textContent = "Select";

        mainSelect.appendChild(defaultOption);

        Object.keys(window.subcategories)
            .forEach(category => {

                const option =
                    document.createElement("option");

                option.value = category;
                option.textContent = category;

                mainSelect.appendChild(option);

            });

    }

    /* =========================================
       LOAD SUB CATEGORIES
    ========================================= */

    function loadSubCategories(
        subCategorySelect,
        selectedCategory = ""
    ) {

        subCategorySelect.innerHTML = "";

        const defaultOption =
            document.createElement("option");

        defaultOption.value = "";
        defaultOption.textContent = "Select";

        subCategorySelect.appendChild(defaultOption);

        /* MAIN CATEGORY SELECTED */

        if (
            selectedCategory &&
            window.subcategories[selectedCategory]
        ) {

            window.subcategories[selectedCategory]
                .forEach(sub => {

                    const option =
                        document.createElement("option");

                    option.value = sub;
                    option.textContent = sub;

                    subCategorySelect.appendChild(option);

                });

        }

        /* NO MAIN CATEGORY */

        else {

            Object.keys(window.subcategories)
                .forEach(category => {

                    window.subcategories[category]
                        .forEach(sub => {

                            const option =
                                document.createElement("option");

                            option.value = sub;
                            option.textContent = sub;

                            subCategorySelect.appendChild(option);

                        });

                });

        }

    }

    /* =========================================
       INITIAL LOAD
    ========================================= */

    document.querySelectorAll(
        "#searchAddListExModal tbody tr"
    ).forEach(row => {

        const mainCategorySelect =
            row.querySelector(".main-category");

        const subCategorySelect =
            row.querySelector(".sub-category");

        if (mainCategorySelect) {

            loadMainCategories(
                mainCategorySelect
            );

        }

        if (subCategorySelect) {

            loadSubCategories(
                subCategorySelect
            );

        }

    });

    /* =========================================
       MAIN CATEGORY CHANGE
    ========================================= */

    document.addEventListener("change", function (e) {

        if (
            !e.target.classList.contains(
                "main-category"
            )
        ) {
            return;
        }

        const mainSelect =
            e.target;

        const row =
            mainSelect.closest("tr");

        const subCategorySelect =
            row.querySelector(".sub-category");

        const selectedCategory =
            mainSelect.value;

        loadSubCategories(
            subCategorySelect,
            selectedCategory
        );

        const noteInput =
            row.querySelector(
                'input[name="note"]'
            );

        if (selectedCategory === "Other") {

            subCategorySelect.value = "Other";

            noteInput.required = true;

            noteInput.placeholder =
                "Add a note for the future";

        }
        else {

            noteInput.required = false;

            noteInput.placeholder =
                "Add note here";

        }

    });

    /* =========================================
       SUB CATEGORY CHANGE
    ========================================= */

    document.addEventListener("change", function (e) {

        if (
            !e.target.classList.contains(
                "sub-category"
            )
        ) {
            return;
        }

        const subCategorySelect =
            e.target;

        const selectedSubCategory =
            subCategorySelect.value;

        const row =
            subCategorySelect.closest("tr");

        const mainCategorySelect =
            row.querySelector(".main-category");

        Object.keys(window.subcategories)
            .forEach(category => {

                if (
                    window.subcategories[category]
                        .includes(selectedSubCategory)
                ) {

                    mainCategorySelect.value =
                        category;

                }

            });

    });

    /* =========================================
       SET TODAY DATE
    ========================================= */

    document.querySelectorAll(
        'input[name="expenseDate"]'
    ).forEach(input => {

        input.value = getTodayDate();

    });

    /* =========================================
       ADD NEW ROW
    ========================================= */

    const addButton =
        document.querySelector(
            '#searchAddListExModal .btn-secondary'
        );

    const tableBody =
        document.querySelector(
            "#searchAddListExModal tbody"
        );

    if (addButton && tableBody) {

        addButton.addEventListener(
            "click",
            function () {

                const newRow =
                    document.createElement("tr");

                newRow.innerHTML = `

                    <!-- DATE -->
                    <td>
                        <input type="date"
                               name="expenseDate"
                               class="form-control shadow-sm"
                               value="${getTodayDate()}"
                               required>
                    </td>

                    <!-- COST -->
                    <td>

                        <input type="text"
                               class="form-control text-end shadow-sm list-amount"
                               placeholder="0"
                               inputmode="numeric"
                               autocomplete="off"
                               required>

                        <input type="hidden"
                               name="amount">

                    </td>

                    <!-- MAIN CATEGORY -->
                    <td>
                        <select class="form-select main-category"
                                name="mainCategory"
                                required>
                        </select>
                    </td>

                    <!-- SUB CATEGORY -->
                    <td>
                        <select class="form-select sub-category"
                                name="subCategory"
                                required>
                        </select>
                    </td>

                    <!-- NOTE -->
                    <td>
                        <input type="text"
                               class="form-control"
                               name="note"
                               placeholder="Add note here">
                    </td>

                    <!-- DELETE -->
                    <td class="text-center">
                        <button type="button"
                                class="btn btn-danger btn-sm delete-row">
                            削除
                        </button>
                    </td>
                `;

                tableBody.appendChild(newRow);

                const mainCategorySelect =
                    newRow.querySelector(
                        ".main-category"
                    );

                const subCategorySelect =
                    newRow.querySelector(
                        ".sub-category"
                    );

                loadMainCategories(
                    mainCategorySelect
                );

                loadSubCategories(
                    subCategorySelect
                );

            });

    }

    /* =========================================
       CLEAR ALL ROWS
    ========================================= */

    const clearButton =
        document.querySelector(
            ".clear-all-rows"
        );

    if (clearButton && tableBody) {

        clearButton.addEventListener(
            "click",
            function () {

                tableBody.innerHTML = "";

                const emptyRow =
                    document.createElement("tr");

                emptyRow.innerHTML = `

                    <!-- DATE -->
                    <td>
                        <input type="date"
                               name="expenseDate"
                               class="form-control shadow-sm"
                               value="${getTodayDate()}"
                               required>
                    </td>

                    <!-- COST -->
                    <td>

                        <input type="text"
                               class="form-control text-end shadow-sm list-amount"
                               placeholder="0"
                               inputmode="numeric"
                               autocomplete="off"
                               required>

                        <input type="hidden"
                               name="amount">

                    </td>

                    <!-- MAIN CATEGORY -->
                    <td>
                        <select class="form-select main-category"
                                name="mainCategory"
                                required>
                        </select>
                    </td>

                    <!-- SUB CATEGORY -->
                    <td>
                        <select class="form-select sub-category"
                                name="subCategory"
                                required>
                        </select>
                    </td>

                    <!-- NOTE -->
                    <td>
                        <input type="text"
                               class="form-control"
                               name="note"
                               placeholder="Add note here">
                    </td>

                    <!-- DELETE -->
                    <td class="text-center">
                        <button type="button"
                                class="btn btn-danger btn-sm delete-row">
                            削除
                        </button>
                    </td>
                `;

                tableBody.appendChild(emptyRow);

                const mainCategorySelect =
                    emptyRow.querySelector(
                        ".main-category"
                    );

                const subCategorySelect =
                    emptyRow.querySelector(
                        ".sub-category"
                    );

                loadMainCategories(
                    mainCategorySelect
                );

                loadSubCategories(
                    subCategorySelect
                );

            });

    }

    /* =========================================
       DELETE ROW
    ========================================= */

    document.addEventListener("click", function (e) {

        if (
            !e.target.classList.contains(
                "delete-row"
            )
        ) {
            return;
        }

        const row =
            e.target.closest("tr");

        const tbody =
            row.closest("tbody");

        if (tbody.rows.length > 1) {

            row.remove();

        }
        else {

            alert(
                "At least one row is required."
            );

        }

    });

    /* =========================================
       NUMERIC ONLY + COMMA FORMAT
    ========================================= */

    document.addEventListener("input", function (e) {

        if (
            e.target.classList.contains(
                "list-amount"
            )
        ) {

            const visibleInput =
                e.target;

            const row =
                visibleInput.closest("tr");

            const hiddenInput =
                row.querySelector(
                    'input[type="hidden"][name="amount"]'
                );

            if (!hiddenInput) {
                return;
            }

            let rawValue =
                visibleInput.value.replace(
                    /\D/g,
                    ""
                );

            if (rawValue === "") {

                visibleInput.value = "";
                hiddenInput.value = "";

                return;

            }

            hiddenInput.value = rawValue;

            visibleInput.value =
                parseInt(rawValue, 10)
                    .toLocaleString();

        }

    });

});