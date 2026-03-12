const string = 'hello'
let reverse =''
for(i=string.length-1; i>=0; i--){
    reverse += string[i]

}
console.log(reverse)

const parenthis = "abcdcba"
let palidrom = true
for( i = 0; i<= parenthis.length/2; i++){
    if(parenthis[i]!==parenthis[parenthis.length-1-i]){
         palidrom = false
    }
}
console.log(palidrom)