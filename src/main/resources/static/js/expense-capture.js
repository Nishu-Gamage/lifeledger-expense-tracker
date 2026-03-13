document.addEventListener("DOMContentLoaded", function () {

    /* ---------------------------
       SUBCATEGORY DATA
    --------------------------- */

    const subcategories = {
        General: ["Repairs", "Services", "Unexpected Expenses"],
        Housing: ["Rent", "Mortgage", "Maintenance / Repair", "Property Tax", "Home Insurance", "Furniture"],
        Fixed: ["Electricity Bill", "Gas Bill", "Water Bill", "Internet Bill", "Phone Bill", "Streaming Services", "Loan Payments", "Credit Card Payments", "Taxes"],
        Personal: ["Hair Salon", "Gym", "Hobbies", "Entertainment"],
        FamilyKids: ["Baby Supplies", "Toys", "School Activities", "Allowance", "Childcare"],
        Education: ["School Fees", "Books", "Online Courses", "Exam Fees", "School Supplies"],
        Pet: ["Pet Food", "Vet", "Grooming", "Pet Accessories"],
        Medical: ["Doctor visit", "Hospital", "Medicine / Pharmacy", "Health Insurance", "Therapy / Check-ups", "Dental", "Glasses / Contact Lenses"],
        Shopping: ["Electronics", "Household Items", "Accessories", "Online Shopping", "Clothing", "Cosmetics"],
        Food: ["Groceries", "Eating Out", "Coffee / Snacks", "Delivery"],
        Gift: ["Birthday Gifts", "Holiday Gifts", "Donations", "Charity"],
        Transportation: ["Train / Bus", "Fuel", "Taxi", "Car Loan", "Car Insurance", "Rent Car", "Parking", "Maintenance", "Vehicle Maintenance / Repair"],
        Travel: ["Flights", "Hotels", "Visa", "Travel Insurance", "Local Transport"],
        Other: ["Other"]
    };

    /* ---------------------------
       MODAL ELEMENTS
    --------------------------- */

    const expenseModal = document.getElementById("searchErrorModal");

    if (!expenseModal) return;

	const subcatSelect = expenseModal.querySelector("#subcategory");
	const subcategoryLabel = expenseModal.querySelector("#subcategoryLabel");
	const categoryError = expenseModal.querySelector("#categoryError");
	const subNoteError = expenseModal.querySelector("#subNoteError");
	
	const noteInput = expenseModal.querySelector('input[name="note"]');
	const noteLabel = expenseModal.querySelector('label[for="note"]');

    /* ---------------------------
       CREATE DEFAULT SUBCATEGORY LIST
    --------------------------- */

    const allSubcategories = [
		...subcategories.General,
		...subcategories.Housing,
		...subcategories.Fixed,
		...subcategories.Personal,
		...subcategories.FamilyKids,
		...subcategories.Education,
		...subcategories.Pet,
		...subcategories.Medical,
		...subcategories.Shopping,
        ...subcategories.Food,
        ...subcategories.Gift,
		...subcategories.Transportation,
		...subcategories.Travel,
        ...subcategories.Other
    ];


    function populateSubcategories(list) {

        subcatSelect.innerHTML = '<option value="">Select a subcategory</option>';

        list.forEach(sub => {

            const option = document.createElement("option");

            option.value = sub;
            option.textContent = sub;

            subcatSelect.appendChild(option);

        });

    }

    populateSubcategories(allSubcategories);


    /* ---------------------------
       CATEGORY CLICK EVENT
    --------------------------- */

	expenseModal.querySelectorAll(".category-card").forEach(card => {

	    card.addEventListener("click", function () {

	        const radio = this.querySelector('input[type="radio"]');
	        radio.checked = true;

	        categoryError.style.display = "none";

	        const category = radio.value;

	        // enable dropdown
	        subcatSelect.disabled = false;

			if (category === "Other") {

			    subcategoryLabel.textContent = "Subcategory";
			    subcategoryLabel.classList.remove("text-primary");
			    subcategoryLabel.classList.add("text-dark");

			    // show only Other
			    populateSubcategories(["Other"]);
			    subcatSelect.value = "Other";

			    // change note label
			    if (noteLabel) {
			        noteLabel.textContent = "Note for the future";
					noteLabel.classList.remove("text-dark");
					noteLabel.classList.add("text-primary");
			    }

			    // make note required
			    noteInput.required = true;

			} else {

			    subcategoryLabel.textContent = "Now you can select a subcategory";
			    subcategoryLabel.classList.remove("text-dark");
			    subcategoryLabel.classList.add("text-primary");

			    populateSubcategories(subcategories[category]);

			    // restore normal note label
			    if (noteLabel) {
			        noteLabel.textContent = "Note";
			    }

			    // note optional
			    noteInput.required = false;
			}

	    });

	});


    /* ---------------------------
       SUBCATEGORY → AUTO CATEGORY SELECT
    --------------------------- */

    subcatSelect.addEventListener("change", function () {

        const selectedSub = this.value;

        for (const category in subcategories) {

            if (subcategories[category].includes(selectedSub)) {

                const radio = expenseModal.querySelector(
                    `input[name="item"][value="${category}"]`
                );

                if (radio) {

                    radio.checked = true;

                }

            }

        }

    });
	
	noteInput.addEventListener("input", function () {
	    subNoteError.style.display = "none";
	});


    /* ---------------------------
       FORM VALIDATION
    --------------------------- */

	const form = expenseModal.querySelector("form");

	form.addEventListener("submit", function(e) {

	    const category = expenseModal.querySelector('input[name="item"]:checked');
	    const subcategory = subcatSelect.value;
	    const note = noteInput.value.trim();

	    if (!category) {

	        e.preventDefault();
	        categoryError.style.display = "block";
	        return;

	    }

	    categoryError.style.display = "none";

	    /* OTHER CATEGORY VALIDATION */

	    if (category.value === "Other") {

	        if (note === "") {

	            e.preventDefault();
	            alert("Please add a note for 'Other' expenses.");

	        }

	        return;
	    }

	    /* NORMAL CATEGORY VALIDATION */

		if (subcategory === "" && note === "") {

		    e.preventDefault();
		    subNoteError.style.display = "block";

		} else {

		    subNoteError.style.display = "none";

		}

	});

    /* ---------------------------
       AMOUNT INPUT FORMAT
    --------------------------- */

	const amountInput = document.getElementById("amount");

	if (amountInput) {

	    amountInput.addEventListener("input", function () {

	        // remove everything except numbers
	        let value = this.value.replace(/[^0-9]/g, "");

	        if (value === "") {
	            this.value = "";
	            return;
	        }

	        // format number with commas
	        this.value = Number(value).toLocaleString();

	    });

	}

});