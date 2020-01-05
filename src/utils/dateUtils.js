
export const formateDate = (time, separator = '-', type) => {
  let tempArray = []
  // 定义补0 函数
  let tf = (i) => i< 10 ? `0${i}` : i
  let date = new Date(time)
  let yea = date.getFullYear()
  let mon = tf(date.getMonth() + 1)
  let day = tf(date.getDate())
  let hou = tf(date.getHours())
  let min = tf(date.getMinutes())
  let sec = tf(date.getSeconds()) 
  switch (type) {
      case 'YY-MM-DD':
        tempArray = [yea, mon, day]
        break
      case 'YY-MM':
        tempArray = [yea, mon]
        break
      case 'MM-DD':
        tempArray = [mon, day]
        break
      case 'hh-mm-ss':
        tempArray = [hou, min, sec]
        break
      case 'hh-mm':
        tempArray = [hou, min]
        break
      default:
        let temp = day + '\xa0\xa0\xa0' + [hou, min, sec].join(':')
        tempArray = [yea, mon, temp]
  }
  return tempArray.join(separator)
}