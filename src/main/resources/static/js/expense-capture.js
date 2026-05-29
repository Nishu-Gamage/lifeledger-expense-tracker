document.addEventListener("DOMContentLoaded", function () {

    /* ---------------------------
           MODAL ELEMENTS
    --------------------------- */

    const expenseModal = document.getElementById("searchaddExModal");

    if (!expenseModal) return;

    const subcatSelect = expenseModal.querySelector("#subCategory");
    const subcategoryLabel = expenseModal.querySelector("#subcategoryLabel");

    const categoryError = expenseModal.querySelector("#categoryError");
    const subNoteError = expenseModal.querySelector("#subNoteError");

    const noteInput =
        expenseModal.querySelector('input[name="note"]');

    const noteLabel =
        expenseModal.querySelector('label[for="note"]');

    const amountInput =
        document.getElementById("amount");

    /* ---------------------------
           CREATE DEFAULT SUBCATEGORY LIST
    --------------------------- */

	const allSubcategories = [

	    ...window.subcategories["一般事項"],
	    ...window.subcategories["住宅"],
	    ...window.subcategories["修正済み"],
	    ...window.subcategories["個人"],
	    ...window.subcategories["家族・子供"],
	    ...window.subcategories["教育"],
	    ...window.subcategories["ペット"],
	    ...window.subcategories["医療"],
	    ...window.subcategories["買い物"],
	    ...window.subcategories["食費"],
	    ...window.subcategories["ギフト"],
	    ...window.subcategories["交通費"],
	    ...window.subcategories["旅行"],
	    ...window.subcategories["その他"]

	];

    /* ---------------------------
           POPULATE SUBCATEGORY
    --------------------------- */

    function populateSubcategories(list) {

        subcatSelect.innerHTML =
			'<option value="">サブカテゴリーを選択</option>';

        list.forEach(sub => {

            const option = document.createElement("option");

            option.value = sub;
            option.textContent = sub;

            subcatSelect.appendChild(option);

        });

    }

    // INITIAL LOAD
    populateSubcategories(allSubcategories);

    /* ---------------------------
           CATEGORY CLICK EVENT
    --------------------------- */

    expenseModal.querySelectorAll(".category-card")
        .forEach(card => {

            card.addEventListener("click", function () {

                const radio =
                    this.querySelector('input[type="radio"]');

                radio.checked = true;

                categoryError.style.display = "none";

                const category = radio.value;

                // enable dropdown
                subcatSelect.disabled = false;

                /* ---------------------------
                       OTHER CATEGORY
                --------------------------- */

                if (category === "その他") {

                    subcategoryLabel.textContent =
						"サブカテゴリー";

                    subcategoryLabel.classList.remove("text-dark");
                    subcategoryLabel.classList.add("text-primary");

                    populateSubcategories(["その他"]);

                    subcatSelect.value = "その他";

                    if (noteLabel) {

                        noteLabel.textContent =
                            "Note for the future";

                        noteLabel.classList.remove("text-dark");
                        noteLabel.classList.add("text-primary");

                    }

                    noteInput.required = true;

                }

                /* ---------------------------
                       NORMAL CATEGORY
                --------------------------- */

                else {

                    subcategoryLabel.textContent =
						"サブカテゴリーを選択してください";

                    subcategoryLabel.classList.remove("text-dark");
                    subcategoryLabel.classList.add("text-primary");

                    populateSubcategories(
						window.subcategories[category]
                    );

                    if (noteLabel) {

                        noteLabel.textContent = "メモ";

                        noteLabel.classList.remove("text-primary");
                        noteLabel.classList.add("text-dark");

                    }

                    noteInput.required = false;

                }

            });

        });

    /* ---------------------------
       SUBCATEGORY → AUTO CATEGORY
    --------------------------- */

    subcatSelect.addEventListener("change", function () {

        const selectedSub = this.value;

		for (const category in window.subcategories){

            if (
                window.subcategories[category]
                    .includes(selectedSub)
            ) {

                const radio =
                    expenseModal.querySelector(
                        `input[name="mainCategory"][value="${category}"]`
                    );

                if (radio) {

                    radio.checked = true;

                }

            }

        }

    });

    /* ---------------------------
           NOTE INPUT
    --------------------------- */

    noteInput.addEventListener("input", function () {

        subNoteError.style.display = "none";

    });

    /* ---------------------------
           FORM VALIDATION
    --------------------------- */

    const form = expenseModal.querySelector("form");

    form.addEventListener("submit", function (e) {

        const category =
            expenseModal.querySelector(
                'input[name="mainCategory"]:checked'
            );

        const subCategory =
            subcatSelect.value;

        const note =
            noteInput.value.trim();

        /* ---------------------------
               CATEGORY VALIDATION
        --------------------------- */

        if (!category) {

            e.preventDefault();

            categoryError.style.display = "block";

            return;

        }

        categoryError.style.display = "none";

        /* ---------------------------
               OTHER CATEGORY VALIDATION
        --------------------------- */

        if (category.value === "Other") {

            if (note === "") {

                e.preventDefault();

                alert(
                    "「その他」の場合はメモを入力してください。"
                );

                return;

            }

        }

        /* ---------------------------
               SUBCATEGORY VALIDATION
        --------------------------- */

        if (subCategory === "" && note === "") {

            e.preventDefault();

            subNoteError.style.display = "block";

            return;

        }

        subNoteError.style.display = "none";

        /* ---------------------------
               REMOVE COMMAS
        --------------------------- */

        if (amountInput && amountInput.value) {

            amountInput.value =
                amountInput.value.replace(/,/g, "");

        }

    });

    /* ---------------------------
           AMOUNT FORMATTER
    --------------------------- */

    if (amountInput) {

        amountInput.addEventListener("input", function () {

            // numbers only
            let value =
                this.value.replace(/\D/g, "");

            if (value === "") {

                this.value = "";

                return;

            }

            // format with commas
            this.value =
                parseInt(value, 10)
                    .toLocaleString();

        });

    }

    /* ---------------------------
           CLEAR BUTTON
    --------------------------- */

    const clearBtn =
        document.getElementById(
            "clearExpenseFormBtn"
        );

    if (clearBtn) {

        clearBtn.addEventListener("click", function () {

            // reset form
            form.reset();

            // reset dropdown
            populateSubcategories(
                allSubcategories
            );

            // hide errors
            categoryError.style.display = "none";
            subNoteError.style.display = "none";

            // reset labels
            subcategoryLabel.textContent =
                "SubCategory";

            subcategoryLabel.classList.remove(
                "text-primary"
            );

            subcategoryLabel.classList.add(
                "text-dark"
            );

            // reset note label
            if (noteLabel) {

                noteLabel.textContent = "Note";

                noteLabel.classList.remove(
                    "text-primary"
                );

                noteLabel.classList.add(
                    "text-dark"
                );

            }

            // clear radio buttons
            expenseModal
                .querySelectorAll(
                    'input[name="mainCategory"]'
                )
                .forEach(radio => {

                    radio.checked = false;

                });

            // remove active styles
            expenseModal
                .querySelectorAll(".category-card")
                .forEach(card => {

                    card.classList.remove("active");

                });

        });

    }

});