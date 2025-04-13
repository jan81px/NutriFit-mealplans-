document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("mealForm").addEventListener("submit", generateMealPlan);
});

function generateMealPlan(event) {
    event.preventDefault(); // Prevent page reload
    console.log("Generating meal plan...");

    let mealsPerDay = parseInt(document.getElementById("mealsPerDay").value, 10);
    if (isNaN(mealsPerDay) || mealsPerDay < 1) {
        alert("Please select a valid number of meals per day!");
        return;
    }

    let allergies = [];
    document.querySelectorAll("#allergies input[type=checkbox]:checked").forEach(checkbox => {
        allergies.push(checkbox.value.toLowerCase());
    });

    let foodPreferences = [];
    document.querySelectorAll("#preferences input[type=checkbox]:checked").forEach(checkbox => {
        foodPreferences.push(checkbox.value);
    });

    let mealTable = document.getElementById("mealTable").getElementsByTagName("tbody")[0];
    let headerRow = document.getElementById("mealTable").getElementsByTagName("thead")[0].rows[0];

    if (!mealTable) {
        console.error("Meal table not found!");
        return;
    }

    // Clear previous content
    mealTable.innerHTML = "";
    headerRow.innerHTML = "<th>Day</th>"; // Reset table headers

    let days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    
    let mealOptions = {
    "Vegetarian": [
        "Grilled tofu with quinoa", "Vegetable stir-fry with brown rice", "Lentil soup with whole wheat bread",
        "Chickpea curry with basmati rice", "Stuffed bell peppers with feta", "Vegetarian lasagna", "Spinach and ricotta stuffed shells",
        "Caprese salad with balsamic glaze", "Roasted vegetable wrap", "Mushroom risotto", "Eggplant parmesan", "Zucchini noodles with pesto",
        "Greek salad with hummus", "Tomato soup with garlic bread", "Chili sin carne", "Vegetable fajitas", "Sweet potato and black bean tacos",
        "Stuffed acorn squash", "Vegetable sushi rolls", "Cauliflower steak with chimichurri sauce", "Paneer tikka with mint chutney",
        "Avocado toast with cherry tomatoes", "Couscous with roasted vegetables", "Grilled cheese with tomato soup",
        "Spinach and cheese quesadilla", "Pumpkin soup with whole grain crackers", "Bruschetta with white bean spread",
        "Lemon herb quinoa salad", "Falafel wrap with tahini sauce"
    ],
    "Vegan": [
        "Tofu scramble with spinach", "Vegan pancakes with maple syrup", "Lentil dhal with basmati rice", "Chickpea salad wrap",
        "Vegan sushi rolls with avocado", "Stuffed bell peppers with quinoa", "Coconut curry with chickpeas", "Sweet potato and kale stir-fry",
        "BBQ jackfruit sandwich", "Zucchini noodles with cashew cream sauce", "Vegan chili with cornbread", "Roasted brussels sprouts with balsamic glaze",
        "Buddha bowl with tahini dressing", "Grilled eggplant with miso glaze", "Vegan mac and cheese", "Lentil burger with whole wheat bun",
        "Roasted cauliflower tacos", "Vegan pizza with cashew cheese", "Carrot and ginger soup", "Miso soup with tofu and seaweed",
        "Chia pudding with berries", "Vegan pad thai", "Spaghetti with lentil bolognese", "Stuffed zucchini boats",
        "Jackfruit tacos with salsa verde", "Vegan lasagna", "Grilled portobello mushroom burger", "Coconut rice with mango chutney"
    ],
    "High-Protein": [
        "Chicken breast with steamed broccoli", "Salmon with quinoa", "Greek yogurt with mixed nuts", "Egg omelette with spinach and cheese",
        "Steak with mashed sweet potatoes", "Grilled shrimp with garlic butter", "Cottage cheese with berries", "Protein smoothie with peanut butter",
        "Roast turkey with wild rice", "Tuna salad with whole wheat crackers", "Lamb chops with asparagus", "Chicken fajitas with whole wheat tortillas",
        "Beef and broccoli stir-fry", "Seared scallops with quinoa salad", "Baked cod with lemon and herbs", "Hard-boiled eggs with avocado toast",
        "Chia seed pudding with almonds", "Tofu stir-fry with edamame", "Turkey meatballs with marinara sauce", "Pork loin with sautéed spinach"
    ],
    "Low-Carb": [
        "Grilled salmon with zucchini noodles", "Baked chicken thighs with roasted cauliflower", "Egg muffins with cheese and spinach",
        "Avocado and bacon lettuce wrap", "Steak with garlic butter mushrooms", "Shrimp and avocado salad", "Cheese platter with olives",
        "Zucchini lasagna", "Keto pancakes with almond flour", "Cauliflower fried rice with shrimp", "Egg salad lettuce wraps",
        "Keto chocolate mug cake", "Beef and spinach stir-fry", "Tuna salad with celery sticks", "Pulled pork with coleslaw"
    ],
    "Keto": [
        "Bacon and eggs", "Steak with herb butter", "Cheese and almond snack mix", "Baked salmon with cream sauce",
        "Zucchini fritters with sour cream", "Avocado with smoked salmon", "Egg salad with bacon bits", "Grilled chicken with cheesy cauliflower mash",
        "Chorizo and egg breakfast bowl", "Fathead pizza with mozzarella crust", "Buffalo chicken dip with celery", "Pork rinds with guacamole",
        "Broccoli and cheddar soup", "Garlic butter shrimp with sautéed kale", "Lettuce wrap cheeseburgers"
    ]
};

days.forEach(day => {
    let row = mealTable.insertRow();
    row.insertCell(0).textContent = day;
    let usedMeals = new Set();

    for (let i = 0; i < mealsPerDay; i++) {
        let selectedMealCategory = foodPreferences.length
            ? mealOptions[foodPreferences[Math.floor(Math.random() * foodPreferences.length)]]
            : mealOptions["Vegetarian"]; // Default to Vegetarian if no preference

        let availableMeals = selectedMealCategory.filter(meal =>
            !usedMeals.has(meal) && !allergies.some(allergy => meal.toLowerCase().includes(allergy))
        );

        if (availableMeals.length === 0) {
            row.insertCell(i + 1).textContent = "No valid meal";
            continue;
        }

        let meal = availableMeals[Math.floor(Math.random() * availableMeals.length)];
        usedMeals.add(meal);
        row.insertCell(i + 1).textContent = meal;
    }
});

// Adjust headers dynamically
for (let i = 1; i <= mealsPerDay; i++) {
    let th = document.createElement("th");
    th.textContent = `Meal ${i}`;
    headerRow.appendChild(th);
}

// Show the meal plan table
document.getElementById("mealPlan").classList.remove("hidden");
}
function toggleMenu() {
    const navLinks = document.getElementById("navLinks");
    const hamburgerIcon = document.getElementById("hamburgerIcon");

    navLinks.classList.toggle("show");

    // Toggle the hamburger icon between ☰ and ✖
    if (navLinks.classList.contains("show")) {
        hamburgerIcon.textContent = "✖";
    } else {
        hamburgerIcon.textContent = "☰";
    }
}
