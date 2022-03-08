import {region, in_region} from './function';

function ratingMatch(user, app) {


    return (Math.abs(user.rating - app.rating));

}

// return 1 if user and app are in the same region,
// otherwise return 0
function regionMatch (user, app) {
    user_region_large = region(user.region);
    if (in_region(app.region, user_region_large)) {
        return 1;
    }
    return 0;
}

function timeOverlap(user_start, user_end, app) {
    user_start_in_min = 60 * Number(user_start.substring(0, 2)) + Number(user_start.substring(3));
    user_end_in_min = 60 * Number(user_end.substring(0, 2)) + Number(user_end.substring(3));

    app_start_in_min = 60 * Number(app.start.substring(0, 2)) + Number(app.start.substring(3));
    app_end_in_min = 60 * Number(app.end.substring(0, 2)) + Number(app.end.substring(3));

    // no overlap
    if (user_start_in_min >= app_end_in_min || app_start_in_min >= user_end_in_min) {
        return 0;
    }

    user_timeframe = user_end_in_min - user_start_in_min;

    if (user_start_in_min <= app_start_in_min && app_end_in_min <= user_end_in_min) {
        overlap = app_end_in_min - app_start_in_min;
    }

    else if (app_start_in_min <= user_start_in_min && user_end_in_min <= app_end_in_min) {
        overlap = user_timeframe;
    }

    else if (user_start_in_min <= app_start_in_min) {
        overlap = user_end_in_min - app_start_in_min;
    }

    // app_start_in_min <= user_start_in_min
    else {
        overlap = app_end_in_min - user_start_in_min;
    }

    return (overlap / user_timeframe);
}

// default sorting criteria 0: time > rating > region
// sorting criteria 1: rating > time > region
// sorting criteria 2: region > time > rating
function sorting (user, user_start, user_end, apps, criteria = 0) {
    if (criteria == 0) {
        function compare(a, b) {
            if (timeOverlap(user_start, user_end, a) > timeOverlap(user_start, user_end, b)) {
                return -1;
            }
            else if (timeOverlap(user_start, user_end, a) < timeOverlap(user_start, user_end, b)) {
                return 1;
            }
            else {
                if (ratingMatch(user, a) < ratingMatch(user, b)) {
                    return -1;
                }
                else if (ratingMatch(user, a) > ratingMatch(user, b)) {
                    return 1;
                }
                else {
                    if (regionMatch(user, a) > regionMatch(user, b)) {
                        return -1;
                    }
                    else if (regionMatch(user, a) < regionMatch(user, b)) {
                        return 1;
                    }
                    else {
                        return 0;
                    }
                }
            }
        }

        return (apps.sort(compare));
    }

    else if (criteria == 1) {
        function compare(a, b) {
            if (ratingMatch(user, a) < ratingMatch(user, b)) {
                return -1;
            }
            else if (ratingMatch(user, a) > ratingMatch(user, b)) {
                return 1;
            }
            else {
                if (timeOverlap(user_start, user_end, a) > timeOverlap(user_start, user_end, b)) {
                    return -1;
                }
                else if (timeOverlap(user_start, user_end, a) < timeOverlap(user_start, user_end, b)) {
                    return 1;
                }
                else {
                    if (regionMatch(user, a) > regionMatch(user, b)) {
                        return -1;
                    }
                    else if (regionMatch(user, a) < regionMatch(user, b)) {
                        return 1;
                    }
                    else {
                        return 0;
                    }
                }
            }
        }

        return (apps.sort(compare));
    }

    else {
        function compare(a, b) {
            if (regionMatch(user, a) > regionMatch(user, b)) {
                return -1;
            }
            else if (regionMatch(user, a) < regionMatch(user, b)) {
                return 1;
            }
            else {
                if (timeOverlap(user_start, user_end, a) > timeOverlap(user_start, user_end, b)) {
                    return -1;
                }
                else if (timeOverlap(user_start, user_end, a) < timeOverlap(user_start, user_end, b)) {
                    return 1;
                }
                else {
                    if (ratingMatch(user, a) < ratingMatch(user, b)) {
                        return -1;
                    }
                    else if (ratingMatch(user, a) > ratingMatch(user, b)) {
                        return 1;
                    }
                    else {
                        return 0;
                    }
                }
            }
        }

        return (apps.sort(compare));
    }

}
