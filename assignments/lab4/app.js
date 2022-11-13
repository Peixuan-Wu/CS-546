/*
1. Create a Movie of your choice.
2. Log the newly created Movie. (Just that movie, not all movies)
3. Create another movie of your choice.
4. Query all movies, and log them all
5. Create the 3rd movie of your choice.
6. Log the newly created 3rd movie. (Just that movie, not all movies)
7. Rename the first movie
8. Log the first movie with the updated name. 
9. Remove the second movie you created.
10. Query all movies, and log them all
11. Try to create a movie with bad input parameters to make sure it throws errors.
12. Try to remove a movie that does not exist to make sure it throws errors.
13. Try to rename a movie that does not exist to make sure it throws errors.
14. Try to rename a movie passing in invalid data for the newName parameter to make sure it throws errors.
15. Try getting a movie by ID that does not exist to make sure it throws errors.

*/

const movies = require('./data/movies');
const connection = require('./config/mongoConnection');


const main = async () => {
    const db = await connection.dbConnection();
    await db.dropDatabase();
    let hackers;
    let breakfast;
    let fortyTwo;
    let updateHacker;

    


    //1. Create a Movie of your choice.
    try{
        hackers = await movies.createMovie("Hackers", "Hackers are blamed for making a virus that will capsize five oil tankers.", ["Crime", "Drama", "Romance"], "PG-13", "United Artists", "Iain Softley", ["Jonny Miller", "Angelina Jolie", "Matthew Lillard", "Fisher Stevens"], "09/15/1995", "1h 45min");
    }catch(e){
        console.log(e);
    }

    //2. Log the newly created Movie. (Just that movie, not all movies) 
    try{
        console.log(hackers);
    }catch(e){
        console.log(e);
    }

    // 3. Create another movie of your choice.
    try{
        breakfast = await movies.createMovie("The Breakfast Club", "Five high school students meet in Saturday detention and discover how they have a lot more in common than they thought.", ["Comedy", "Drama"], "R", "Universal Pictures", "John Hughes", ["Judd Nelson", "Molly Ringwald", "Ally Sheedy", "Anthony Hall", "Emilio Estevez"], "02/07/1985", "1h 37min");
    }catch(e){
        console.log(e);
    }
    
    // 4. Query all movies, and log them all
    try{
        console.log(await movies.getAllMovies());
    }catch(e){
        console.log(e);
    }
        

    // 5. Create the 3rd movie of your choice.
    try{
        fortyTwo = await movies.createMovie("42", "In 1947, Jackie Robinson becomes the first African-American to play in Major League Baseball in the modern era when he was signed by the Brooklyn Dodgers and faces considerable racism in the process.", ["Biography", "Drama", "Sport"],"PG-13","Warner Brothers","Brian Helgeland",["Chadwick Boseman", "Harrison Ford", "Nicole Beharie", "Christopher Meloni"], "04/09/2013", "2h 8min");
    }catch(e){
        console.log(e);
    }
        
    
    // 6. Log the newly created 3rd movie. (Just that movie, not all movies)
    try{
        console.log(fortyTwo);
    }catch(e){
        console.log(e);
    }

    // 7. Rename the first movie
    try{
        updateHacker =await movies.renameMovie(hackers._id,"newHackers");
    }catch(e){
        console.log(e);
    }
    
    // 8. Log the first movie with the updated name. 
    try{
        console.log(updateHacker);
    }catch(e){
        console.log(e);
    }
        
    // 9. Remove the second movie you created.
    try{
        console.log(await movies.removeMovie(breakfast._id));
    }catch(e){
        console.log(e);
    }

    // 10. Query all movies, and log them all
    try{
        console.log(await movies.getAllMovies());
    }catch(e){
        console.log(e);
    }

    // 11. Try to create a movie with bad input parameters to make sure it throws errors.
    // error-test: return:rating is not valid
    try {
        const nweMovie = await movies.createMovie("Hackers", "Hackers are blamed for making a virus that will capsize five oil tankers.", ["Crdsaf", "sdfsdg", "Romance"], "PG3", "United Artists", "Iain Softley", ["Jonny Miller", "Angelina Jolie", "Matthew Lillard", "Fisher Stevens"], "09/15/1995", "1h 45min");
        console.log(nweMovie);
    } catch (e) {
        console.log(e);
    }

    // 12. Try to remove a movie that does not exist to make sure it throws errors.
    // error-test: return:No movie with that id
    try {
        await movies.removeMovie("6344a84393a42dbef4ed9972");
    } catch (e) {
        console.log(e);
    }

    // 13. Try to rename a movie that does not exist to make sure it throws errors.
    // error-test: return:No movie with that id
    try {
        await movies.renameMovie("6344a84393a42dbef4ed9972","12314");
    } catch (e) {
        console.log(e);
    }

    // 14. Try to rename a movie passing in invalid data for the newName parameter to make sure it throws errors.
    // error-test: return:newName must be at least two characters
    try {
        const updatedBreakfast = await movies.renameMovie(fortyTwo._id,"");
    } catch (e) {
        console.log(e);
    }

    // 15. Try getting a movie by ID that does not exist to make sure it throws errors.
    // error-test: return:No movie with that id
    try {
        const testMovie = await movies.getMovieById("6344a84393a42dbef4ed9972");
    } catch (e) {
        console.log(e);
    }


    // // just for test some edge case and should all be failed
    // // error-test: return:The provided title has spaces in front or end
    // try {
    //     const hackers = await movies.createMovie("Hackers  ", "Hackers are blamed for making a virus that will capsize five oil tankers.", ["Crime1", "Drama", "Romance"], "PG-13", "United Artists", "Iain Softley", ["Jonny Miller", "Angelina Jolie", "Matthew Lillard", "Fisher Stevens"], "09/15/2080", "1h 45min");
    //     console.log(hackers);
    // } catch (e) {
    //     console.log(e);
    // } 
    // // error-test: return:plot cannot be empty or all spaces
    // try {
    //     const hackers = await movies.createMovie("Hackers", "", ["Crime", "Drama", "Romance"], "PG-13", "United Artists", "Iain Softley", ["Jonny Miller", "Angelina Jolie", "Matthew Lillard", "Fisher Stevens"], "09/15/2080", "1h 45min");
    //     console.log(hackers);
    // } catch (e) {
    //     console.log(e);
    // }
    // // error-test: return:genres's element should be string
    // try {
    //     const hackers = await movies.createMovie("Hackers", "Hackers are blamed for making a virus that will capsize five oil tankers.", ["Crdsaf", [], "Romance"], "PG-13", "United Artists", "Iain Softley", ["Jonny Miller", "Angelina Jolie", "Matthew Lillard", "Fisher Stevens"], "09/15/1995", "1h 45min");
    //     console.log(hackers);
    // } catch (e) {
    //     console.log(e);
    // }
    // // error-test: return:rating is not valid
    // try {
    //     const hackers = await movies.createMovie("Hackers", "Hackers are blamed for making a virus that will capsize five oil tankers.", ["Crdsaf", "sdfsdg", "Romance"], "PG3", "United Artists", "Iain Softley", ["Jonny Miller", "Angelina Jolie", "Matthew Lillard", "Fisher Stevens"], "09/15/1995", "1h 45min");
    //     console.log(hackers);
    // } catch (e) {
    //     console.log(e);
    // }
    // // error-test: return:studio must be at least 5 characters long
    // try {
    //     const hackers = await movies.createMovie("Hackers", "Hackers are blamed for making a virus that will capsize five oil tankers.", ["Crdsaf", "sdfsdg", "Romance"], "PG", "Un", "Iain Softley", ["Jonny Miller", "Angelina Jolie", "Matthew Lillard", "Fisher Stevens"], "09/15/1995", "1h 45min");
    //     console.log(hackers);
    // } catch (e) {
    //     console.log(e);
    // }
    // // error-test: return:studio must be at least 5 characters long
    // try {
    //     const hackers = await movies.createMovie("Hackers", "Hackers are blamed for making a virus that will capsize five oil tankers.", ["Crdsaf", "sdfsdg", "Romance"], "PG", "United Artists fdsf", "Ia Softley", ["Jonny Miller", "Angelina Jolie", "Matthew Lillard", "Fisher Stevens"], "09/15/1995", "1h 45min");
    //     console.log(hackers);
    // } catch (e) {
    //     console.log(e);
    // }
    // // error-test: return:director should only contain one space
    // try {
    //     const hackers = await movies.createMovie("Hackers", "Hackers are blamed for making a virus that will capsize five oil tankers.", ["Crime", "Drama", "Romance"], "PG-13", "United Artists", "Iain Softley dgfg", ["Jonny Miller", "Angelina Jolie", "Matthew Lillard", "Fisher Stevens"], "09/15/1995", "1h 45min");
    //     console.log(hackers);
    // } catch (e) {
    //     console.log(e);
    // }
    // // error-test: return:director should only contain letters
    // try {
    //     const hackers = await movies.createMovie("Hackers", "Hackers are blamed for making a virus that will capsize five oil tankers.", ["Crime", "Drama", "Romance"], "PG-13", "United Artists", "Iain Softley3", ["Jonny Miller", "Angelina Jolie", "Matthew Lillard", "Fisher Stevens"], "09/15/1995", "1h 45min");
    //     console.log(hackers);
    // } catch (e) {
    //     console.log(e);
    // }
    // // error-test: return:castMember's name in array should only contain letters
    // try {
    //     const hackers = await movies.createMovie("Hackers", "Hackers are blamed for making a virus that will capsize five oil tankers.", ["Crime", "Drama", "Romance"], "PG-13", "United Artists", "Iain Softley", ["Jonny3 Miller", "Angelina Jolie", "Matthew Lillard", "Fisher Stevens"], "09/15/1995", "1h 45min");
    //     console.log(hackers);
    // } catch (e) {
    //     console.log(e);
    // }
    // // error-test: return:first or last name must at least be 3 characters long
    // try {
    //     const hackers = await movies.createMovie("Hackers", "Hackers are blamed for making a virus that will capsize five oil tankers.", ["Crime", "Drama", "Romance"], "PG-13", "United Artists", "Iain Softley", ["Jo Miller", "Angelina Jolie", "Matthew Lillard", "Fisher Stevens"], "09/15/1995", "1h 45min");
    //     console.log(hackers);
    // } catch (e) {
    //     console.log(e);
    // }
    // // error-test: return:castMember's name in array cannot be empty or all spaces
    // try {
    //     const hackers = await movies.createMovie("Hackers", "Hackers are blamed for making a virus that will capsize five oil tankers.", ["Crime", "Drama", "Romance"], "PG-13", "United Artists", "Iain Softley", ["Jonny Miller", "Angelina Jolie", "Matthew Lillard",""], "09/15/1995", "1h 45min");
    //     console.log(hackers);
    // } catch (e) {
    //     console.log(e);
    // }
    // // error-test: return:castMembers must have at leat on element
    // try {
    //     const hackers = await movies.createMovie("Hackers", "Hackers are blamed for making a virus that will capsize five oil tankers.", ["Crime", "Drama", "Romance"], "PG-13", "United Artists", "Iain Softley", [], "09/15/1995", "1h 45min");
    //     console.log(hackers);
    // } catch (e) {
    //     console.log(e);
    // }
    // // error-test: return:provided day is not valid
    // try {
    //     const hackers = await movies.createMovie("Hackers", "Hackers are blamed for making a virus that will capsize five oil tankers.", ["Crime", "Drama", "Romance"], "PG-13", "United Artists", "Iain Softley", ["Jonny Miller", "Angelina Jolie", "Matthew Lillard", "Fisher Stevens"], "02/29/1995", "1h 45min");
    //     console.log(hackers);
    // } catch (e) {
    //     console.log(e);
    // }
    // // error-test: return:provided year is not valid
    // try {
    //     const hackers = await movies.createMovie("Hackers", "Hackers are blamed for making a virus that will capsize five oil tankers.", ["Crime", "Drama", "Romance"], "PG-13", "United Artists", "Iain Softley", ["Jonny Miller", "Angelina Jolie", "Matthew Lillard", "Fisher Stevens"], "09/15/2025", "1h 45min");
    //     console.log(hackers);
    // } catch (e) {
    //     console.log(e);
    // }
    // // error-test: return:provided date format is not valid
    // try {
    //     const hackers = await movies.createMovie("Hackers", "Hackers are blamed for making a virus that will capsize five oil tankers.", ["Crime", "Drama", "Romance"], "PG-13", "United Artists", "Iain Softley", ["Jonny Miller", "Angelina Jolie", "Matthew Lillard", "Fisher Stevens"], "09/15/", "1h 45min");
    //     console.log(hackers);
    // } catch (e) {
    //     console.log(e);
    // }
    // // error-test: return:hour is not only numbers
    // try {
    //     const hackers = await movies.createMovie("Hackers", "Hackers are blamed for making a virus that will capsize five oil tankers.", ["Crime", "Drama", "Romance"], "PG-13", "United Artists", "Iain Softley", ["Jonny Miller", "Angelina Jolie", "Matthew Lillard", "Fisher Stevens"], "09/15/1995", "-1h 45min");
    //     console.log(hackers);
    // } catch (e) {
    //     console.log(e);
    // }
    // // error-test: return:hour is not only numbers
    // try {
    //     const hackers = await movies.createMovie("Hackers", "Hackers are blamed for making a virus that will capsize five oil tankers.", ["Crime", "Drama", "Romance"], "PG-13", "United Artists", "Iain Softley", ["Jonny Miller", "Angelina Jolie", "Matthew Lillard", "Fisher Stevens"], "09/15/1995", "1h min");
    //     console.log(hackers);
    // } catch (e) {
    //     console.log(e);
    // }
    // // error-test: return:provided runtime is not valid
    // try {
    //     const hackers = await movies.createMovie("Hackers", "Hackers are blamed for making a virus that will capsize five oil tankers.", ["Crime", "Drama", "Romance"], "PG-13", "United Artists", "Iain Softley", ["Jonny Miller", "Angelina Jolie", "Matthew Lillard", "Fisher Stevens"], "09/15/1995", "0h 30min");
    //     console.log(hackers);
    // } catch (e) {
    //     console.log(e);
    // }
    // // error-test: return:hour is not only numbers
    // try {
    //     const hackers = await movies.createMovie("Hackers", "Hackers are blamed for making a virus that will capsize five oil tankers.", ["Crime", "Drama", "Romance"], "PG-13", "United Artists", "Iain Softley", ["Jonny Miller", "Angelina Jolie", "Matthew Lillard", "Fisher Stevens"], "09/15/1995", "3.5h 30min");
    //     console.log(hackers);
    // } catch (e) {
    //     console.log(e);
    // }

}

main();