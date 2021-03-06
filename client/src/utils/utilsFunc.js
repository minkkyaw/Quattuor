export const getDuration = input => {
  let timeDiff = (new Date(Date.now()) - new Date(input)) / 1000 / 60;
  let roundTimeDiff = Math.round(timeDiff);

  return timeDiff < 1
    ? `${timeDiff < 0.5 ? "now" : Math.round(timeDiff * 60) + "sec ago"}`
    : timeDiff < 2
    ? `1 min ago`
    : timeDiff < 60
    ? `${roundTimeDiff} mins ago`
    : timeDiff < 120
    ? `1 hour ago`
    : timeDiff < 60 * 24
    ? `${Math.round(roundTimeDiff / 60)} hours ago`
    : timeDiff < 60 * 24 * 2
    ? `1 day ago`
    : `${Math.round(roundTimeDiff / 60 / 24)} days ago `;
};

export const arrObjToString = input => {
  let output = input.map(obj => {
    let arr = [];
    for (let key in obj) {
      if (key !== "_id") arr.push(obj[key]);
    }
    let x = arr[0];
    arr[0] = arr[1];
    arr[1] = x;
    return arr.join(" ");
  });
  return output.join(" ");
};

export const objToQueryString = obj => {
  let query = "";
  let index = 0;
  for (let key in obj) {
    if (index === 0) {
      query += "?";
      index++;
    } else query += "&";
    query += `${key}=${obj[key]}`;
  }
  return query;
};

export const changeDateToMMDDYYY = date => {
  date = new Date(date);
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
};
