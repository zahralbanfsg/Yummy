"use strict"
window.addEventListener("load", function () {
    $(".lds-roller").fadeOut(function () {
        $(".loadingPage").addClass("d-none");
        $("body").removeClass("overflow-hidden");
    });
})

let sideBarWordsWidth = $(".sideBarWords").innerWidth();
$("#sideBar").css("left", -sideBarWordsWidth);


async function getMealsByName() {
    let inputMealName = document.querySelector(".inputMealName input")

    if (inputMealName.value !== "") {
        let responce = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputMealName.value}`);
        let data = await responce.json();
        let mealNames = data.meals;
        let meal = ``;
        if (mealNames.length <= 20) {
            for (let i = 0; i < mealNames.length; i++) {
                meal += `<div class="col-lg-3 col-md-4 mealsBox overflow-hidden position-relative">
                <img src="${mealNames[i].strMealThumb}" class="w-100 rounded rounded-4" alt="">
                <div class="titleHover d-flex justify-content-start align-items-center rounded rounded-4 p-2"><h2 class="m-0">${mealNames[i].strMeal}</h2>
                </div>
            </div>`
            }
            $("#mealsStorge").html(meal);
        } else if (mealNames.length > 20) {
            let mealNamesAfterUpdate = mealNames.splice(0, 20);
            for (let i = 0; i < mealNamesAfterUpdate.length; i++) {
                meal += `<div class="col-lg-3 col-md-4 mealsBox overflow-hidden position-relative">
                <img src="${mealNamesAfterUpdate[i].strMealThumb}" class="w-100 rounded rounded-4" alt="">
                <div class="titleHover d-flex justify-content-start align-items-center rounded rounded-4 p-2"><h2 class="m-0">${mealNamesAfterUpdate[i].strMeal}</h2>
                </div>
            </div>`
            }
            $("#mealsStorge").html(meal);
        }
    }


    $(".mealsBox").click(async function (eventInfo) {
        $(".mealsBox").addClass("d-none");
        let countName = $(eventInfo.target).text();
        let responce = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${countName}`);
        let data = await responce.json();
        let countryMeals = data.meals;
        console.log(countryMeals)
        let tagsWord;
        let cartona;
        if (!countryMeals[0].strTags == null) {
            let tags = countryMeals[0].strTags;
            tagsWord = tags.split(",");
            cartona = ``;
            for (let i = 0; i < tagsWord.length; i++) {
                cartona += `<li class="btn text-black me-2">${tagsWord[i]}</li>`
            }
        }
        let tank = ``;
        let recipeName = [];
        let recipeAmount = [];
        for (let i = 1; i <= 20; i++) {
            recipeName.push(countryMeals[0][`strIngredient${i}`])
            recipeAmount.push(countryMeals[0][`strMeasure${i}`])
        }

        for (let i = 0; i < recipeName.length; i++) {
            if (!recipeName[i] == " ") {
                tank += `<li class="btn text-black me-2 mb-2"><span id="amount">${recipeAmount[i]}</span> ${recipeName[i]}</li>`
            }
        }

        let meals;
        meals =
            `<div class="col-lg-6 col-md-12 mealDetailsImage">
                    <img src="${countryMeals[0].strMealThumb}" class="w-100 rounded rounded-4 mb-2" alt="">
                    <h2 class="text-white">${countryMeals[0].strMeal}</h2>
                    </div>
                    <div class="col-lg-6 col-md-12 mealDetailsInfo text-white">
                    <h2>Instructions</h2>
                    <p>${countryMeals[0].strInstructions}</p>
                    <h3>Area :<span> ${countryMeals[0].strArea}</span></h3>
                    <h3>Category :<span> ${countryMeals[0].strCategory}</span></h3>
                    <h3>Recipes :</h3>
                    <ul class="d-flex justify-content-start align-items-center flex-wrap ps-0" id="tankStorage">

                    </ul>
                    <h3 class="mb-3">Tags :</h3>
                    <ul class="d-flex justify-content-start align-items-center" id="tagsWords">
                    </ul>
                    <a href="${countryMeals[0].strSource}" target="_blank" class="btn btn-success">Source</a>
                    <a href="${countryMeals[0].strYoutube}" target="_blank" class="btn btn-danger">Youtube</a>
                    </div>`;
        $("#mealBoxOfStorage").html(meals);
        $("#tagsWords").html(cartona);
        $("#tankStorage").html(tank);
    })
}

async function getMealsByFirstName() {
    let inputMealNameFirstLitter = document.querySelector(".inputMealNameFirstLitter input");
    if (inputMealNameFirstLitter.value !== "") {
        let responce = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${inputMealNameFirstLitter.value}`);
        let data = await responce.json();
        let mealNames = data.meals;
        let meal = ``;
        for (let i = 0; i < mealNames.length; i++) {
            meal += `<div class="col-lg-3 col-md-4 mealsBox overflow-hidden position-relative">
                <img src="${mealNames[i].strMealThumb}" class="w-100 rounded rounded-4" alt="">
                <div class="titleHover d-flex justify-content-start align-items-center rounded rounded-4 p-2"><h2 class="m-0">${mealNames[i].strMeal}</h2>
                </div>
            </div>`
        }
        $("#mealsStorge").html(meal);
    }
    $(".mealsBox").click(async function (eventInfo) {
        $(".mealsBox").addClass("d-none");
        let countName = $(eventInfo.target).text();
        let responce = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${countName}`);
        let data = await responce.json();
        let countryMeals = data.meals;
        let tagsWord;
        let cartona;
        if (!countryMeals[0].strTags == null) {
            let tags = countryMeals[0].strTags;
            tagsWord = tags.split(",");
            cartona = ``;
            for (let i = 0; i < tagsWord.length; i++) {
                cartona += `<li class="btn text-black me-2">${tagsWord[i]}</li>`
            }
        }
        let tank = ``;
        let recipeName = [];
        let recipeAmount = [];
        for (let i = 1; i <= 20; i++) {
            recipeName.push(countryMeals[0][`strIngredient${i}`])
            recipeAmount.push(countryMeals[0][`strMeasure${i}`])
        }

        for (let i = 0; i < recipeName.length; i++) {
            if (!recipeName[i] == " ") {
                tank += `<li class="btn text-black me-2 mb-2"><span id="amount">${recipeAmount[i]}</span> ${recipeName[i]}</li>`
            }
        }

        let meals;
        meals =
            `<div class="col-lg-6 col-md-12 mealDetailsImage">
                <img src="${countryMeals[0].strMealThumb}" class="w-100 rounded rounded-4 mb-2" alt="">
                <h2 class="text-white">${countryMeals[0].strMeal}</h2>
                </div>
                <div class="col-lg-6 col-md-12 mealDetailsInfo text-white">
                <h2>Instructions</h2>
                <p>${countryMeals[0].strInstructions}</p>
                <h3>Area :<span> ${countryMeals[0].strArea}</span></h3>
                <h3>Category :<span> ${countryMeals[0].strCategory}</span></h3>
                <h3>Recipes :</h3>
                <ul class="d-flex justify-content-start align-items-center flex-wrap ps-0" id="tankStorage">
                
                </ul>
                <h3 class="mb-3">Tags :</h3>
                <ul class="d-flex justify-content-start align-items-center" id="tagsWords">

                </ul>
                <a href="${countryMeals[0].strSource}" target="_blank" class="btn btn-success">Source</a>
                <a href="${countryMeals[0].strYoutube}" target="_blank" class="btn btn-danger">Youtube</a>
                </div>`;
        $("#mealBoxOfStorage").html(meals);
        $("#tagsWords").html(cartona);
        $("#tankStorage").html(tank);
    })
}

async function getData() {
    let responce = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`);
    let data = await responce.json();
    let dataForOneMeal = data.meals;
    let meals = ``;

    for (let i = 0; i < dataForOneMeal.length; i++) {
        meals += `
            <div class="col-lg-3 col-md-4 mealsBox overflow-hidden position-relative">
                <img src="${dataForOneMeal[i].strMealThumb}" class="w-100 rounded rounded-4" alt="">
                <div class="titleHover d-flex justify-content-start align-items-center rounded rounded-4 p-2"><h2 class="m-0">${dataForOneMeal[i].strMeal}</h2>
                </div>
            </div>
            `
    }
    $("#mealBoxOfStorage").html(meals);

    $(".mealsBox div").click(async function (eventInfo) {
        $(".mealDetailsImage").addClass("d-none");
        $(".mealDetailsInfo").addClass("d-none");
        let countName = $(eventInfo.target).text();;
        let responce = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${countName}`);
        let data = await responce.json();
        let countryMeals = data.meals;
        let tagsWord;
        let cartona;
        if (!countryMeals[0].strTags == null) {
            let tags = countryMeals[0].strTags;
            tagsWord = tags.split(",");
            cartona = ``;
            for (let i = 0; i < tagsWord.length; i++) {
                cartona += `<li class="btn text-black me-2">${tagsWord[i]}</li>`
            }
        }
        let tank = ``;
        let recipeName = [];
        let recipeAmount = [];
        for (let i = 1; i <= 20; i++) {
            recipeName.push(countryMeals[0][`strIngredient${i}`])
            recipeAmount.push(countryMeals[0][`strMeasure${i}`])
        }

        for (let i = 0; i < recipeName.length; i++) {
            if (!recipeName[i] == " ") {
                tank += `<li class="btn text-black me-2 mb-2"><span id="amount">${recipeAmount[i]}</span> ${recipeName[i]}</li>`
            }
        }

        let meals;
        meals =
            `<div class="col-lg-6 col-md-12 mealDetailImage">
                    <img src="${countryMeals[0].strMealThumb}" class="w-100 rounded rounded-4 mb-2" alt="">
                    <h2 class="text-white">${countryMeals[0].strMeal}</h2>
                    </div>
                    <div class="col-lg-6 col-md-12 mealDetailInfo text-white">
                    <h2>Instructions</h2>
                    <p>${countryMeals[0].strInstructions}</p>
                    <h3>Area :<span> ${countryMeals[0].strArea}</span></h3>
                    <h3>Category :<span> ${countryMeals[0].strCategory}</span></h3>
                    <h3>Recipes :</h3>
                    <ul class="d-flex justify-content-start align-items-center flex-wrap ps-0" id="tankStorage">
                    </ul>
                    <h3 class="mb-3">Tags :</h3>
                    <ul class="d-flex justify-content-start align-items-center" id="tagsWords">
                    </ul>
                    <a href="${countryMeals[0].strSource}" target="_blank" class="btn btn-success">Source</a>
                    <a href="${countryMeals[0].strYoutube}" target="_blank" class="btn btn-danger">Youtube</a>
                    </div>`;
        $("#mealBoxOfStorage").html(meals);
        $("#tagsWords").html(cartona);
        $("#tankStorage").html(tank);

    })
}

getData();

$("#togglrIconOpen").click(function () {
    $("#sideBar").animate({ left: 0 }, 1000);
    $("#togglrIconOpen").addClass("d-none");
    $("#togglrIconClose").removeClass("d-none");
    // $("#innerSideBar .words li").animate({ bottom: 0 }, 500)
    // $("#innerSideBar .words .search").animate({ bottom: 0 }, 500, function () {
    //     $("#innerSideBar .words .categories").animate({ bottom: 0 }, 500, function () {
    //         $("#innerSideBar .words .area").animate({ bottom: 0 }, 500, function () {
    //             $("#innerSideBar .words .ingredients").animate({ bottom: 0 }, 500, function () {
    //                 $("#innerSideBar .words .contact-us").animate({ bottom: 0 }, 500, function () {
    //                 })
    //             })
    //         })
    //     })
    // })
})

$("#togglrIconClose").click(function () {
    $("#sideBar").animate({ left: -sideBarWordsWidth }, 1000);
    $("#togglrIconClose").addClass("d-none");
    $("#togglrIconOpen").removeClass("d-none");
})

$(".area").click(async function () {
    $(".mealsBox").addClass("d-none");
    $("#sideBar").animate({ left: -sideBarWordsWidth }, 1000);
    $("#togglrIconOpen").removeClass("d-none");
    $("#togglrIconClose").addClass("d-none");
    let responce = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
    let data = await responce.json();
    let countryName = data.meals;
    let names = ``;
    for (let i = 0; i < 20; i++) {
        names += `
            <div class="col-lg-3 col-md-4 text-center text-white mb-5 selectCountry">
            <i class="fa-solid fa-house-laptop fa-4x"></i>
            <h2 class="m-0">${countryName[i].strArea}</h2>
            </div>`
    }

    $("#mealBoxOfStorage").html(names);


    $(".selectCountry h2").click(async function (eventInfo) {
        $(".selectCountry").addClass("d-none")
        let countName = eventInfo.target.innerHTML;
        if (!countName == "") {
            let responce = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${countName}`);
            let data = await responce.json();
            let countryMeals = data.meals;


            let meals = ``;

            if (countryMeals.length <= 20) {
                for (let i = 0; i < countryMeals.length; i++) {
                    meals += `<div class="col-lg-3 col-md-4 mealsBox overflow-hidden position-relative selectDetailsForMeal">
                <img src="${countryMeals[i].strMealThumb}" class="w-100 rounded rounded-4 " alt="">
                <div class="titleHover d-flex justify-content-start align-items-center rounded rounded-4 p-2"><h2 class="m-0">${countryMeals[i].strMeal}</h2>
                </div>
                </div>`
                }
                $("#mealBoxOfStorage").html(meals);
            } else if (countryMeals.length > 20) {
                let countryMealsAfterUpdate = countryMeals.splice(0, 20);
                for (let i = 0; i < countryMealsAfterUpdate.length; i++) {
                    meals += `<div class="col-lg-3 col-md-4 mealsBox overflow-hidden position-relative selectDetailsForMeal">
                <img src="${countryMealsAfterUpdate[i].strMealThumb}" class="w-100 rounded rounded-4 " alt="">
                <div class="titleHover d-flex justify-content-start align-items-center rounded rounded-4 p-2"><h2 class="m-0">${countryMealsAfterUpdate[i].strMeal}</h2>
                </div>
                </div>`
                }
                $("#mealBoxOfStorage").html(meals);
            }
        }

        $(".selectDetailsForMeal div").click(async function (eventInfo) {
            $(".selectDetailsForMeal").addClass("d-none");
            let countName = $(eventInfo.target).text();;
            let responce = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${countName}`);
            let data = await responce.json();
            let countryMeals = data.meals;
            let tagsWord;
            let cartona;
            if (!countryMeals[0].strTags == null) {
                let tags = countryMeals[0].strTags;
                tagsWord = tags.split(",");
                cartona = ``;
                for (let i = 0; i < tagsWord.length; i++) {
                    cartona += `<li class="btn text-black me-2">${tagsWord[i]}</li>`
                }
            }
            let tank = ``;
            let recipeName = [];
            let recipeAmount = [];
            for (let i = 1; i <= 20; i++) {
                recipeName.push(countryMeals[0][`strIngredient${i}`])
                recipeAmount.push(countryMeals[0][`strMeasure${i}`])
            }

            for (let i = 0; i < recipeName.length; i++) {
                if (!recipeName[i] == " ") {
                    tank += `<li class="btn text-black me-2 mb-2"><span id="amount">${recipeAmount[i]}</span> ${recipeName[i]}</li>`
                }
            }
            let meals;
            meals =
                `<div class="col-lg-6 col-md-12 mealDetailsImage">
                    <img src="${countryMeals[0].strMealThumb}" class="w-100 rounded rounded-4 mb-2" alt="">
                    <h2 class="text-white">${countryMeals[0].strMeal}</h2>
                    </div>
                    <div class="col-lg-6 col-md-12 mealDetailsInfo text-white">
                    <h2>Instructions</h2>
                    <p>${countryMeals[0].strInstructions}</p>
                    <h3>Area :<span> ${countryMeals[0].strArea}</span></h3>
                    <h3>Category :<span> ${countryMeals[0].strCategory}</span></h3>
                    <h3>Recipes :</h3>
                    <ul class="d-flex justify-content-start align-items-center ps-0 flex-wrap" id="tankStorage">
                    </ul>
                    <h3 class="mb-3">Tags :</h3>
                    <ul class="d-flex justify-content-start align-items-center" id="tagsWords">
                    </ul>
                    <a href="${countryMeals[0].strSource}" target="_blank" class="btn btn-success">Source</a>
                    <a href="${countryMeals[0].strYoutube}" target="_blank" class="btn btn-danger">Youtube</a>
                    </div>`;
            $("#mealBoxOfStorage").html(meals);
            $("#tagsWords").html(cartona);
            $("#tankStorage").html(tank);

        })
    })
})

$(".categories").click(async function () {
    $(".mealsBox").addClass("d-none");
    $(".mealDetailImage").addClass("d-none");
    $(".mealDetailInfo").addClass("d-none");
    $(".selectCountry").addClass("d-none");
    $(".selectDetailsForMeal").addClass("d-none");
    $(".mealDetailsImage").addClass("d-none");
    $(".mealDetailsInfo").addClass("d-none");
    $("#sideBar").animate({ left: -sideBarWordsWidth }, 1000);
    $("#togglrIconOpen").removeClass("d-none");
    $("#togglrIconClose").addClass("d-none");
    let responce = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
    let data = await responce.json();
    let category = data.categories;
    let categories = ``;
    for (let i = 0; i < category.length; i++) {
        categories += `
            <div class="col-lg-3 col-md-4 mealsBox overflow-hidden position-relative">
                <img src="${category[i].strCategoryThumb}" class="w-100 rounded rounded-4" alt="">
                <div class="titleHover text-center rounded rounded-4 p-2"><h2 class="m-0 text-decoration-underline">${category[i].strCategory}</h2>
                <p>${category[i].strCategoryDescription}</p>
                </div>
            </div>`
    }
    $("#mealBoxOfStorage").html(categories);

    $(".mealsBox div h2").click(async function (eventInfo) {
        $(".mealsBox").addClass("d-none");
        let categoryName = $(eventInfo.target).text();
        let responce = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`);
        let data = await responce.json();
        let category = data.meals;
        let meals = ``;

        if (category.length <= 20) {
            for (let i = 0; i < category.length; i++) {
                meals += `
            <div class="col-lg-3 col-md-4 mealsBox overflow-hidden position-relative">
                <img src="${category[i].strMealThumb}" class="w-100 rounded rounded-4" alt="">
                <div class="titleHover d-flex justify-content-start align-items-center rounded rounded-4 p-2"><h2 class="m-0">${category[i].strMeal}</h2>
                </div>
            </div>
            `
            }
            $("#mealBoxOfStorage").html(meals);
        } else if (category.length > 20) {
            let categoryAfterUpdate = category.splice(0, 20);
            for (let i = 0; i < categoryAfterUpdate.length; i++) {
                meals += `
                <div class="col-lg-3 col-md-4 mealsBox overflow-hidden position-relative">
                    <img src="${categoryAfterUpdate[i].strMealThumb}" class="w-100 rounded rounded-4" alt="">
                    <div class="titleHover d-flex justify-content-start align-items-center rounded rounded-4 p-2"><h2 class="m-0">${categoryAfterUpdate[i].strMeal}</h2>
                    </div>
                </div>
                `
            }
            $("#mealBoxOfStorage").html(meals);
        }


        $(".mealsBox div").click(async function (eventInfo) {
            $(".mealsBox").addClass("d-none");
            let countName = $(eventInfo.target).text();
            let responce = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${countName}`);
            let data = await responce.json();
            let countryMeals = data.meals;
            let tagsWord;
            let cartona;
            if (!countryMeals[0].strTags == null) {
                let tags = countryMeals[0].strTags;
                tagsWord = tags.split(",");
                cartona = ``;
                for (let i = 0; i < tagsWord.length; i++) {
                    cartona += `<li class="btn text-black me-2">${tagsWord[i]}</li>`
                }
            }

            let tank = ``;
            let recipeName = [];
            let recipeAmount = [];
            for (let i = 1; i <= 20; i++) {
                recipeName.push(countryMeals[0][`strIngredient${i}`])
                recipeAmount.push(countryMeals[0][`strMeasure${i}`])
            }

            for (let i = 0; i < recipeName.length; i++) {
                if (!recipeName[i] == " ") {
                    tank += `<li class="btn text-black me-2 mb-2"><span id="amount">${recipeAmount[i]}</span> ${recipeName[i]}</li>`
                }
            }
            let meals;
            meals =
                `<div class="col-lg-6 col-md-12 mealDetailsImage">
                        <img src="${countryMeals[0].strMealThumb}" class="w-100 rounded rounded-4 mb-2" alt="">
                        <h2 class="text-white">${countryMeals[0].strMeal}</h2>
                        </div>
                        <div class="col-lg-6 col-md-12 mealDetailsInfo text-white">
                        <h2>Instructions</h2>
                        <p>${countryMeals[0].strInstructions}</p>
                        <h3>Area :<span> ${countryMeals[0].strArea}</span></h3>
                        <h3>Category :<span> ${countryMeals[0].strCategory}</span></h3>
                        <h3>Recipes :</h3>
                        <ul class="d-flex justify-content-start align-items-center flex-wrap ps-0" id="tankStorage">
                        </ul>
                        <h3 class="mb-3">Tags :</h3>
                        <ul class="d-flex justify-content-start align-items-center" id="tagsWords">
                        </ul>
                        <a href="${countryMeals[0].strSource}" target="_blank" class="btn btn-success">Source</a>
                        <a href="${countryMeals[0].strYoutube}" target="_blank" class="btn btn-danger">Youtube</a>
                        </div>`;
            $("#mealBoxOfStorage").html(meals);
            $("#tagsWords").html(cartona);
            $("#tankStorage").html(tank);

        })
    })
})

$(".search").click(async function () {
    $(".mealsBox").addClass("d-none");
    $(".mealDetailImage").addClass("d-none");
    $(".mealDetailInfo").addClass("d-none");
    $(".selectCountry").addClass("d-none");
    $(".selectDetailsForMeal").addClass("d-none");
    $(".mealDetailsImage").addClass("d-none");
    $(".mealDetailsInfo").addClass("d-none");
    $("#sideBar").animate({ left: -sideBarWordsWidth }, 1000);
    $("#togglrIconOpen").removeClass("d-none");
    $("#togglrIconClose").addClass("d-none");
    let inputs;
    inputs = ` <div class="col-lg-6 inputMealName mb-3">
            <input type="text" name="mealName" placeholder="Search by name" class="form-control bg-black" oninput="getMealsByName()"/>
            </div>
        <div class="col-lg-6 inputMealNameFirstLitter mb-3">
        <input type="text" name="mealNameFirstLitter" placeholder="Search by first Litter" oninput="getMealsByFirstName()"
            class="form-control bg-black" maxlength="1" />
    </div>
    <div class="col-lg-12 mealStorges">
    <div class="row g-3" id="mealsStorge">

    </div></div>`

    $("#mealBoxOfStorage").html(inputs);
})

$(".ingredients").click(async function () {
    $(".mealsBox").addClass("d-none");
    $(".mealDetailImage").addClass("d-none");
    $(".mealDetailInfo").addClass("d-none");
    $(".selectCountry").addClass("d-none");
    $(".selectDetailsForMeal").addClass("d-none");
    $(".mealDetailsImage").addClass("d-none");
    $(".mealDetailsInfo").addClass("d-none");
    $("#sideBar").animate({ left: -sideBarWordsWidth }, 1000);
    $("#togglrIconOpen").removeClass("d-none");
    $("#togglrIconClose").addClass("d-none");
    let responce = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
    let data = await responce.json();
    let countryName = data.meals;
    let names = ``;
    for (let i = 0; i < 20; i++) {
        names += `
            <div class="col-lg-3 col-md-4 text-center text-white mb-5 selectCountry overflow-hidden">
            <i class="fa-solid fa-drumstick-bite fa-4x""></i>
            <h2>${countryName[i].strIngredient}</h2>
            <p class="m-0">${countryName[i].strDescription}</p>
            </div>`
    }
    $("#mealBoxOfStorage").html(names);


    $(".selectCountry h2").click(async function (eventInfo) {
        $(".selectCountry").addClass("d-none")
        let countName = eventInfo.target.innerHTML;
        let responce = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${countName}`);
        let data = await responce.json();
        let countryMeals = data.meals;
        let meals = ``;

        if (countryMeals.length <= 20) {
            for (let i = 0; i < countryMeals.length; i++) {
                meals += `<div class="col-lg-3 col-md-4 mealsBox overflow-hidden position-relative selectDetailsForMeal">
                <img src="${countryMeals[i].strMealThumb}" class="w-100 rounded rounded-4 " alt="">
                <div class="titleHover d-flex justify-content-start align-items-center rounded rounded-4 p-2"><h2 class="m-0">${countryMeals[i].strMeal}</h2>
                </div>
                </div>`
            }
            $("#mealBoxOfStorage").html(meals);
        } else if (countryMeals.length > 20) {
            let countryMealsAfterUpdate = countryMeals.splice(0, 20);
            for (let i = 0; i < countryMealsAfterUpdate.length; i++) {
                meals += `<div class="col-lg-3 col-md-4 mealsBox overflow-hidden position-relative selectDetailsForMeal">
                <img src="${countryMealsAfterUpdate[i].strMealThumb}" class="w-100 rounded rounded-4 " alt="">
                <div class="titleHover d-flex justify-content-start align-items-center rounded rounded-4 p-2"><h2 class="m-0">${countryMealsAfterUpdate[i].strMeal}</h2>
                </div>
                </div>`
            }
            $("#mealBoxOfStorage").html(meals);
        }

        $(".selectDetailsForMeal div").click(async function (eventInfo) {
            $(".selectDetailsForMeal").addClass("d-none");
            let countName = $(eventInfo.target).text();;
            let responce = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${countName}`);
            let data = await responce.json();
            let countryMeals = data.meals;
            let tagsWord;
            let cartona;
            if (!countryMeals[0].strTags == null) {
                let tags = countryMeals[0].strTags;
                tagsWord = tags.split(",");
                cartona = ``;
                for (let i = 0; i < tagsWord.length; i++) {
                    cartona += `<li class="btn text-black me-2">${tagsWord[i]}</li>`
                }
            }
            let tank = ``;
            let recipeName = [];
            let recipeAmount = [];
            for (let i = 1; i <= 20; i++) {
                recipeName.push(countryMeals[0][`strIngredient${i}`])
                recipeAmount.push(countryMeals[0][`strMeasure${i}`])
            }

            for (let i = 0; i < recipeName.length; i++) {
                if (!recipeName[i] == " ") {
                    tank += `<li class="btn text-black me-2 mb-2"><span id="amount">${recipeAmount[i]}</span> ${recipeName[i]}</li>`
                }
            }
            let meals;
            meals =
                `<div class="col-lg-6 col-md-12 mealDetailsImage">
                <img src="${countryMeals[0].strMealThumb}" class="w-100 rounded rounded-4 mb-2" alt="">
                <h2 class="text-white">${countryMeals[0].strMeal}</h2>
                </div>
                <div class="col-lg-6 col-md-12 mealDetailsInfo text-white">
                <h2>Instructions</h2>
                <p>${countryMeals[0].strInstructions}</p>
                <h3>Area :<span> ${countryMeals[0].strArea}</span></h3>
                <h3>Category :<span> ${countryMeals[0].strCategory}</span></h3>
                <h3>Recipes :</h3>
                <ul class="d-flex justify-content-start align-items-center flex-wrap ps-0" id="tankStorage">
                </ul>
                <h3 class="mb-3">Tags :</h3>
                <ul class="d-flex justify-content-start align-items-center" id="tagsWords">
                </ul>
                <a href="${countryMeals[0].strSource}" target="_blank" class="btn btn-success">Source</a>
                <a href="${countryMeals[0].strYoutube}" target="_blank" class="btn btn-danger">Youtube</a>
                </div>`;
            $("#mealBoxOfStorage").html(meals);
            $("#tagsWords").html(cartona);
            $("#tankStorage").html(tank);

        })
    })
})

function nameValidate() {
    let userName = document.querySelector(".userName")
    var regex = /^[A-Z][a-z]{3,8}$/;
    if (regex.test(userName.value) === true) {
        $("#invalidName").addClass("d-none");
        return true;
    } else {
        $("#invalidName").removeClass("d-none");
        return false;
    }
}

function emailValidate() {
    let userEmail = document.querySelector(".userEmail")
    var regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/;
    if (regex.test(userEmail.value) === true) {
        $("#invalidEmail").addClass("d-none");
        return true;
    } else {
        $("#invalidEmail").removeClass("d-none");
        return false;
    }
}

function phoneValidate() {
    let userPhone = document.querySelector(".userPhone")
    var regex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,8}$/;
    if (regex.test(userPhone.value) === true) {
        $("#invalidPN").addClass("d-none");
        return true;
    } else {
        $("#invalidPN").removeClass("d-none");
        return false;
    }
}

function ageValidate() {
    let userAge = document.querySelector(".userAge")
    var regex = /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/;
    if (regex.test(userAge.value) === true) {
        $("#invalidAge").addClass("d-none");
        return true;
    } else {
        $("#invalidAge").removeClass("d-none");
        return false;
    }
}


function passValidate() {
    let userPass = document.querySelector(".userPass")
    var regex = /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/;
    if (regex.test(userPass.value) == true) {
        $("#invalidPass").addClass("d-none");
        console.log("true")
        return true;
    } else {
        $("#invalidPass").removeClass("d-none");
        return false;
    }
}


function checkPassValidate() {
    let userPass = document.querySelector(".userPass")
    let checkPassword = document.querySelector(".checkPassword")
    if (checkPassword.value === userPass.value) {
        $("#invalidRPass").addClass("d-none");
        checkInputs()
        return true
    } else {
        $("#invalidRPass").removeClass("d-none");
        return false
    }
}

function checkInputs() {
    let submitBtn = document.querySelector("#submitBtn")
    if (nameValidate() == true || emailValidate() == true || phoneValidate() == true || ageValidate() == true || passValidate() == true || checkPassValidate() == true) {
        submitBtn.removeAttribute("disabled")
    }
}

$(".contact-us").click(async function () {
    $(".mealsBox").addClass("d-none");
    $(".mealDetailImage").addClass("d-none");
    $(".mealDetailInfo").addClass("d-none");
    $(".selectCountry").addClass("d-none");
    $(".selectDetailsForMeal").addClass("d-none");
    $(".mealDetailsImage").addClass("d-none");
    $(".mealDetailsInfo").addClass("d-none");
    $("#sideBar").animate({ left: -sideBarWordsWidth }, 1000);
    $("#togglrIconOpen").removeClass("d-none");
    $("#togglrIconClose").addClass("d-none");
    $(".inputMealName").addClass("d-none");
    $(".inputMealNameFirstLitter").addClass("d-none");
    $(".mealStorges").addClass("d-none");
    let forms = ` <div class="col-6">
    <input type="text" name="nameUser" class="form-control userName" placeholder="Enter Your Name" oninput="nameValidate()">
    <p id="invalidName" class="alert alert-danger w-100 d-none">❌ You Must Start With Capital letter also Special Characters and Numbers are not allowed</p>
</div>
<div class="col-6">
    <input type="email" name="emailUser" class="form-control userEmail" placeholder="Enter Your Email" oninput="emailValidate()">
    <p id="invalidEmail" class="alert alert-danger w-100 d-none">❌ Email not Valid *Exemple@yyy.com</p>
</div>
<div class="col-6">
    <input type="tel" name="phoneUser" class="form-control userPhone" placeholder="Enter Your Phone" oninput="phoneValidate()">
    <p id="invalidPN" class="alert alert-danger w-100 d-none">❌ Enter Valid Phone Number</p>
</div>
<div class="col-6">
    <input type="text" name="ageUser" class="form-control userAge" placeholder="Enter your Age" oninput="ageValidate()">
    <p id="invalidAge" class="alert alert-danger w-100 d-none">❌ Enter Valid age</p>
</div>
<div class="col-6">
    <input type="password" name="passUser" class="form-control userPass" placeholder="Enter Your Password" oninput="passValidate()">
    <p id="invalidPass" class="alert alert-danger w-100 d-none">❌ Enter Valid Password</p>
</div>
<div class="col-6">
    <input type="password" name="repassUser" class="form-control checkPassword" placeholder="Repassword" oninput="checkPassValidate()">
    <p id="invalidRPass" class="alert alert-danger w-100 d-none">❌ Your Password Dos not Match</p>
</div>
<div class="col-12 text-center">
    <button type="submit" class="btn btn-outline-danger" disabled id="submitBtn">Submit</button>
</div>`

    $("#mealBoxOfStorage").html(forms);

})







