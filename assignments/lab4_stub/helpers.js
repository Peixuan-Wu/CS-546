//You can add and export any helper functions you want here. If you aren't using any, then you can just leave this file as is.
function checkIsProperString(str,strName){
    if(typeof str !== String || str === null || str=== undefined){
        throw `the provided argument should be string`
    }
}