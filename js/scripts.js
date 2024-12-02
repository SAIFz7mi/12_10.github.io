document.addEventListener("DOMContentLoaded", function () {
    const recipeForm = document.getElementById("recipeForm");
    if (recipeForm) {
        recipeForm.addEventListener("submit", function (e) {
            e.preventDefault();
            if (validateRecipeForm()) {
                const newRecipe = {
                    name: document.getElementById("recipeName").value,
                    category: document.getElementById("category").value,
                    ingredients: document.getElementById("ingredients").value,
                    instructions: document.getElementById("instructions").value,
                    authorName: document.getElementById("authorName").value,
                    authorEmail: document.getElementById("authorEmail").value,
                };

                let recipes = JSON.parse(localStorage.getItem('recipes')) || [];
                recipes.push(newRecipe);
                localStorage.setItem('recipes', JSON.stringify(recipes));

                document.getElementById("submissionMessage").textContent = "Recipe submitted successfully!";
                recipeForm.reset();
                loadRecipes();
            }
        });
    }

    loadRecipes();

    document.getElementById('allRecipes').addEventListener('click', () => loadRecipes());
    document.getElementById('breakfast').addEventListener('click', () => loadRecipes('breakfast'));
    document.getElementById('lunch').addEventListener('click', () => loadRecipes('lunch'));
    document.getElementById('dinner').addEventListener('click', () => loadRecipes('dinner'));
    document.getElementById('dessert').addEventListener('click', () => loadRecipes('dessert'));

    function loadRecipes(category = '') {
        const recipeList = document.getElementById('recipeList');
        recipeList.innerHTML = '';

        fetch('recipes.json')
            .then(response => response.json())
            .then(jsonRecipes => {
                const localRecipes = JSON.parse(localStorage.getItem('recipes')) || [];
                const allRecipes = [...jsonRecipes, ...localRecipes];

                allRecipes.forEach(recipe => {
                    if (category === '' || recipe.category.toLowerCase() === category.toLowerCase()) {
                        const recipeCard = document.createElement('div');
                        recipeCard.className = 'recipe-card';
                        recipeCard.innerHTML = `
                            <div class="recipe-info">
                                <h3>${recipe.name}</h3>
                                <p><strong>Category:</strong> ${recipe.category}</p>
                                <p><strong>Ingredients:</strong> ${recipe.ingredients}</p>
                                <p><strong>Instructions:</strong> ${recipe.instructions}</p>
                                <p><strong>Submitted by:</strong> ${recipe.authorName} (${recipe.authorEmail})</p>
                            </div>
                        `;
                        recipeList.appendChild(recipeCard);
                    }
                });
            })
            .catch(error => console.error('Error loading recipes:', error));
    }

    function validateRecipeForm() {
        let isValid = true;
        const fields = ["recipeName", "category", "ingredients", "instructions", "authorName", "authorEmail"];

        fields.forEach((field) => {
            const value = document.getElementById(field).value.trim();
            const errorElement = document.getElementById(`${field}Error`);

            if (!value) {
                isValid = false;
                errorElement.textContent = "This field is required.";
            } else {
                errorElement.textContent = "";
            }
        });

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const email = document.getElementById("authorEmail").value.trim();
        if (email && !emailRegex.test(email)) {
            isValid = false;
            document.getElementById("authorEmailError").textContent = "Please enter a valid email address.";
        }

        return isValid;
    }
});