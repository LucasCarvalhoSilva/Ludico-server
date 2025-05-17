const playedTime = (startTime, endTime) => {
  return Math.floor((endTime - startTime) / 1000 /60)
}

export default playedTime