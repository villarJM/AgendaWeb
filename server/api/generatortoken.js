var rand = function() {
    return Math.random().toString(36).substring(2); // remove `0.`
};

const token = () => {
    return rand() + rand() + rand() + "-" + rand() + rand() + rand(); // to make it longer
}
module.exports = token
