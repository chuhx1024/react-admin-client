
export const formateDate = (time, separator = '-', type) => {
  if (!time && typeof (time) !== 'number') {
      return ''
  }
  // 后台返回的时间戳可能是字符串类型的可能是几个时间戳
  let tempArray = []
  let date
  if (time instanceof Date) {} else {
      time = time && parseInt(time)
  }
  date = new Date(time)
  let year = date.getFullYear()
  let month = date.getMonth() < 9 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
  let day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
  let hour = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()
  let min = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
  let sec = date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds()
  switch (type) {
      case 'YY-MM-DD':
        tempArray = [year, month, day]
        break
      case 'YY-MM':
        tempArray = [year, month]
        break
      case 'MM-DD':
        tempArray = [month, day]
        break
      case 'hh-mm-ss':
        tempArray = [hour, min, sec]
        break
      case 'hh-mm':
        tempArray = [hour, min]
        break
      default:
        let temp = day + '\xa0\xa0\xa0' + [hour, min, sec].join(':')
        tempArray = [year, month, temp]
        
  }
  return tempArray.join(separator)
}