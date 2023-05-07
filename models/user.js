module.exports = (mongoose) => {
    const userSchema = mongoose.Schema({
        username: {
            type: String
        },
        displayName: {
            type: String
        },
        gender: {
            type: String
        },
        password: {
            type: String
        },
        email: {
            type: String
        },
        phoneNumber: {
            type: String
        },
        location: {
            type: String
        }
    });

    return mongoose.model('users', userSchema);
};