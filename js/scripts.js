
document.addEventListener("DOMContentLoaded", function () {
    // Load recipes dynamically
    function loadRecipes(category = "") {
        const recipeContainer = document.getElementById("recipeContainer");
        recipeContainer.innerHTML = "";

        fetch("./recipes.json")
            .then((response) => response.json())
            .then((recipes) => {
                recipes.forEach((recipe) => {
                    if (category === "" || recipe.category.toLowerCase() === category.toLowerCase()) {
                        const recipeCard = document.createElement("div");
                        recipeCard.className = "recipe-card";
                        recipeCard.innerHTML = `
                            <h3>${recipe.name}</h3>
                            <p><strong>Category:</strong> ${recipe.category}</p>
                            <button class="view-recipe" data-id="${recipe.id}">View Recipe</button>
                        `;
                        recipeContainer.appendChild(recipeCard);
                    }
                });

                // Add event listeners to view recipe buttons
                document.querySelectorAll(".view-recipe").forEach((button) => {
                    button.addEventListener("click", function () {
                        const recipeId = this.getAttribute("data-id");
                        window.location.href = `top-recipes.html?recipeId=${recipeId}`;
                    });
                });
            });
    }

    // Category navigation
    document.querySelectorAll(".category-link").forEach((link) => {
        link.addEventListener("click", function () {
            const category = this.getAttribute("data-category");
            loadRecipes(category);
        });
    });

    // Load all recipes on page load
    loadRecipes();
});
