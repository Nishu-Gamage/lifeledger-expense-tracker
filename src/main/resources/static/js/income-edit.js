document
    .querySelectorAll(".incomeEditBtn")
    .forEach(button => {

        button.addEventListener(
            "click",
            function () {

                document.getElementById(
                    "editIncomeId")
                    .value =
                    this.dataset.id;

                document.getElementById(
                    "editIncomeDate")
                    .value =
                    this.dataset.date;

                document.getElementById(
                    "editIncomeCategory")
                    .value =
                    this.dataset.category;

                document.getElementById(
                    "editIncomeAmount")
                    .value =
                    this.dataset.amount;

                document.getElementById(
                    "editIncomeNote")
                    .value =
                    this.dataset.note || "";
            });
    });