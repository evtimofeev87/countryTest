export const debounce = (mainFunction, delay) => {
    // Declare a variable called 'timer' to store the timer ID
    let timer;
    console.log(1)
    // Return an anonymous function that takes in any number of arguments
    return function (...args) {
        console.log(2)
        // Clear the previous timer to prevent the execution of 'mainFunction'
        clearTimeout(timer);

        // Set a new timer that will execute 'mainFunction' after the specified delay
        timer = setTimeout(() => {
            console.log(3)
            mainFunction(...args);
        }, delay);
    };
};
