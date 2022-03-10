import { region, in_region } from './function';

function ratingMatch(user_rating, app) {
  return Math.abs(user_rating - app.rating);
}

// return 1 if user and app are in the same region,
// otherwise return 0
function regionMatch(user_region, app) {
  let user_region_large = region(user_region);
  if (in_region(app.region, user_region_large)) {
    return 1;
  }
  return 0;
}

function timeOverlap(user_start, user_end, app) {
  let user_start_in_min =
    60 * Number(user_start.substring(0, 2)) + Number(user_start.substring(3));
  let user_end_in_min =
    60 * Number(user_end.substring(0, 2)) + Number(user_end.substring(3));

  let app_start_in_min =
    60 * Number(app.start.substring(0, 2)) + Number(app.start.substring(3));
  let app_end_in_min =
    60 * Number(app.end.substring(0, 2)) + Number(app.end.substring(3));

  // no overlap
  if (
    user_start_in_min >= app_end_in_min ||
    app_start_in_min >= user_end_in_min
  ) {
    return 0;
  }

  let user_timeframe = user_end_in_min - user_start_in_min;
  let overlap;

  if (
    user_start_in_min <= app_start_in_min &&
    app_end_in_min <= user_end_in_min
  ) {
    overlap = app_end_in_min - app_start_in_min;
  } else if (
    app_start_in_min <= user_start_in_min &&
    user_end_in_min <= app_end_in_min
  ) {
    overlap = user_timeframe;
  } else if (user_start_in_min <= app_start_in_min) {
    overlap = user_end_in_min - app_start_in_min;
  }

  // app_start_in_min <= user_start_in_min
  else {
    overlap = app_end_in_min - user_start_in_min;
  }

  return overlap / user_timeframe;
}

// sorting criteria 'Best Match': time > rating > region
// sorting criteria 'Skill Level': rating > time > region
// sorting criteria 'Region': region > time > rating
export function sorting(
  user_rating,
  user_region,
  user_start,
  user_end,
  apps,
  criteria
) {
  if (criteria === 'Best Match') {
    function compare(a, b) {
      if (
        timeOverlap(user_start, user_end, a) >
        timeOverlap(user_start, user_end, b)
      ) {
        return -1;
      } else if (
        timeOverlap(user_start, user_end, a) <
        timeOverlap(user_start, user_end, b)
      ) {
        return 1;
      } else {
        if (ratingMatch(user_rating, a) < ratingMatch(user_rating, b)) {
          return -1;
        } else if (ratingMatch(user_rating, a) > ratingMatch(user_rating, b)) {
          return 1;
        } else {
          if (regionMatch(user_region, a) > regionMatch(user_region, b)) {
            return -1;
          } else if (
            regionMatch(user_region, a) < regionMatch(user_region, b)
          ) {
            return 1;
          } else {
            return 0;
          }
        }
      }
    }

    return apps.sort(compare);
  } else if (criteria === 'Skill Level') {
    function compare(a, b) {
      if (ratingMatch(user_rating, a) < ratingMatch(user_rating, b)) {
        return -1;
      } else if (ratingMatch(user_rating, a) > ratingMatch(user_rating, b)) {
        return 1;
      } else {
        if (
          timeOverlap(user_start, user_end, a) >
          timeOverlap(user_start, user_end, b)
        ) {
          return -1;
        } else if (
          timeOverlap(user_start, user_end, a) <
          timeOverlap(user_start, user_end, b)
        ) {
          return 1;
        } else {
          if (regionMatch(user_region, a) > regionMatch(user_region, b)) {
            return -1;
          } else if (
            regionMatch(user_region, a) < regionMatch(user_region, b)
          ) {
            return 1;
          } else {
            return 0;
          }
        }
      }
    }

    return apps.sort(compare);
  } else {
    function compare(a, b) {
      if (regionMatch(user_region, a) > regionMatch(user_region, b)) {
        return -1;
      } else if (regionMatch(user_region, a) < regionMatch(user_region, b)) {
        return 1;
      } else {
        if (
          timeOverlap(user_start, user_end, a) >
          timeOverlap(user_start, user_end, b)
        ) {
          return -1;
        } else if (
          timeOverlap(user_start, user_end, a) <
          timeOverlap(user_start, user_end, b)
        ) {
          return 1;
        } else {
          if (ratingMatch(user_rating, a) < ratingMatch(user_rating, b)) {
            return -1;
          } else if (
            ratingMatch(user_rating, a) > ratingMatch(user_rating, b)
          ) {
            return 1;
          } else {
            return 0;
          }
        }
      }
    }

    return apps.sort(compare);
  }
}
