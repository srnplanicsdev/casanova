function twoSum(nums, target) {
  const n = nums.length
  for (let i = 0; i < n; i++) {
  for (let j = i + 1; j < n; j++) {
    if (nums[i] + nums[j] === target) {
      return [i, j];
    }
  }
}
}

function lengthOfLongestSubstring(s) {
    let str = ""
    for (let i = 0; i < s.length; i++) {
        for (let j = i; j < s.length; j++) {
            if(s[i] !==s[j]){
                str +=s[i]
            }else{
                str = temp
                str = ''
            }
            if(temp.length >str.length){
                return temp
            }else{
                return str
            }     
            
        }
        
    }
}


