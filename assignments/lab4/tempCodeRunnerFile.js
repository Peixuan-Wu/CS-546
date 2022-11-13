// 15. Try getting a movie by ID that does not exist to make sure it throws errors.
    try {
        const testMovie = await movies.getMovieById("6344a84393a42dbef4ed9972");
    } catch (e) {
        console.log(e);
    }