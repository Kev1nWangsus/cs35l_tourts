
function sortByRatingAsc(user, apps) {
    usr_rating = user.rating;

    function compare(a, b) {
        if (Math.abs(a.rating - usr_rating) < Math.abs(b.rating - usr_rating)) {
            return -1;
        }
        else if (Math.abs(a.rating - usr_rating) > Math.abs(b.rating - usr_rating)) {
            return 1;
        }
        else {
            return 0;
        }
    }

    return (apps.sort(compare));

}


function sortByRatingDesc(user, apps) {
    usr_rating = user.rating;

    function compare(a, b) {
        if (Math.abs(a.rating - usr_rating) < Math.abs(b.rating - usr_rating)) {
            return 1;
        }
        else if (Math.abs(a.rating - usr_rating) > Math.abs(b.rating - usr_rating)) {
            return -1;
        }
        else {
            return 0;
        }
    }

    return (apps.sort(compare));

}



//let result = sortByRatingDesc({test: 't', rating: 3}, [{test: '2', rating: 0}, {test: '2', rating: 2}, {test: '2', rating: 5}]);
//console.log(result);