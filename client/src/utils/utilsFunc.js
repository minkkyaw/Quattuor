const getDuration = input => {
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

export default { getDuration };
