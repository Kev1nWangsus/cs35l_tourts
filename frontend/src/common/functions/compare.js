import {region, in_region} from './function';

function sortByRatingAsc(user, apps) {

    function compare(a, b) {
        if (Math.abs(a.rating - user.rating) < Math.abs(b.rating - user.rating)) {
            return -1;
        }
        else if (Math.abs(a.rating - user.rating) > Math.abs(b.rating - user.rating)) {
            return 1;
        }
        else {
            return 0;
        }
    }

    return (apps.sort(compare));

}


function sortByRatingDesc(user, apps) {

    function compare(a, b) {
        if (Math.abs(a.rating - user.rating) < Math.abs(b.rating - user.rating)) {
            return 1;
        }
        else if (Math.abs(a.rating - user.rating) > Math.abs(b.rating - user.rating)) {
            return -1;
        }
        else {
            return 0;
        }
    }

    return (apps.sort(compare));

}


function sortByRegiongAsc(user, apps) {

    user_region_large = region(user.region);

    var in_reg = [];
    var not_in_reg = [];

    for (let i = 0; i < apps.length; i++) {
        if (in_region(apps[i].region, user_region_large)) {
            in_reg.push(apps[i]);
        }
        else {
            not_in_reg.push(apps[i]);
        }
    }

    function compare(a, b) {
        
        if (a.region < b.region) {
            return -1;
        }
        else if (a.region > b.region) {
            return 1;
        }
        else {
            return 0;
        }
    }

    sorted_apps = in_reg.sort(compare).concat(not_in_reg.sort(compare));
    return sorted_apps;

}

function sortByRegiongDesc(user, apps) {

    user_region_large = region(user.region);

    var in_reg = [];
    var not_in_reg = [];

    for (let i = 0; i < apps.length; i++) {
        if (in_region(apps[i].region, user_region_large)) {
            in_reg.push(apps[i]);
        }
        else {
            not_in_reg.push(apps[i]);
        }
    }

    result_apps = not_in_reg.concat(in_reg);

    return result_apps;

}

