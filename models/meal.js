module.exports = (mongoose) => {
    const mealSchema = mongoose.Schema({
        mealTime: {
            type: String
        },
        proteins: {
            type: String
        },
        fats: {
            type: String
        },
        carbohydrates: {
            type: String
        },
        waterAmount: {
            type: String
        },
        calories: {
            type: String
        },
        iron: {
            type: String
        }
    });

    return mongoose.model('meals', mealSchema);
};