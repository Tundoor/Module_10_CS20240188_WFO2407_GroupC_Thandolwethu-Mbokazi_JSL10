document.addEventListener("DOMContentLoaded", () => {
    // Changed Id from solveRoom 
    document.getElementById("solveRoom1").addEventListener("click", () => {
        fetch('books.json') 
            .then(response => response.json())
            .then(books => {
                const mostRecentBook = findMostRecentBook(books);
                // Changed ID from resultRoom1
                document.getElementById("room1Result").textContent = `The key to the next room is: ${mostRecentBook.title}`;
            });
    });

    document.getElementById("solveRoom2").addEventListener("click", () => {
        const jsConcepts = new Set(['closure', 'scope', 'hoisting', 'async' ]);
        // Async was missing
        const reactConcepts = new Set(['components', 'jsx', 'hooks', 'async']);
        // 🪲 Corrected varieble reactConcepts
        const commonConcepts = findIntersection(jsConcepts, reactConcepts);
        document.getElementById("room2Result").textContent = `The code to unlock the door is: ${Array.from(commonConcepts).join(', ')}`;
    });

    // 🪲 Bug: Asynchronous function ?
    document.getElementById("solveRoom3").addEventListener("click", () => {
        fetch('directions.json') 
            .then(response => response.json())
            .then(directions => {
                navigateLabyrinth(directions)
                  .then (message => {
                        // 🪲 Bug: Incorrect method
                        document.getElementById("room3Result").innerHTML = message;
                    });
            });
    });
});

function findMostRecentBook(books) {
    // Changed the position of most recent and book in ternary
    return books.reduce((mostRecent, book) => 
        new Date(book.published) < new Date(mostRecent.published) ? mostRecent : book);
}

function findIntersection(setA, setB) {
    // Created new array for set B
    const setBArr = [...setB]
    // intersection checks for similarities in setA and set B
    const intersection =  new Set([...setA].filter(item => setBArr.includes(item)));
    return intersection;
}

async function navigateLabyrinth(directions) {
    for (let direction of directions) {
        // Added await since this is an async function
        await new Promise (resolve => setTimeout(resolve, 1000));
         console.log(`Navigating: ${direction.step}`);
    }
    return "Congratulations! You've mastered the essentials of Vanilla JavaScript. Welcome to the world of React, where you'll build powerful and dynamic web applications. Let's dive in!";
}

