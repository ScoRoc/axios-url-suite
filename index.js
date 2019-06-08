const axios = require('axios')
// exports.axiosUrlSuite = function({ url, name }) {

// capitalizeFirstLetter :: String -> String
const capitalizeFirstLetter = word => {
  const validChars = /^[a-zA-Z]/
  if (!validChars.test(word[0])) throw `The first character of ${word} is invalid. It must be a letter a-z or A-Z.`
  return word.replace(/^\w/, c => c.toUpperCase())
}

// makeAxiosFn :: String -> String -> (Object, Object) -> Object
const makeAxiosFn = method => url => (data, config) => axios({ method, url, data, config })

const getWithAxios = makeAxiosFn('get')
const postWithAxios = makeAxiosFn('post')
const putWithAxios = makeAxiosFn('put')
const deleteWithAxios = makeAxiosFn('delete')

// makeHttpRequestNames :: String -> Object
const makeHttpRequestNames = name => {
  // Error checks
  if (typeof name !== 'string') throw `The name must be a string. You passed ${name}`
  const possibleInvalidChars = name.match(/\W/g)
  if (possibleInvalidChars) throw `The name ${name} contains invalid characters at ${possibleInvalidChars.join(', ')}. Please use only regular variable characters, such as letters and numbers.`

  // makeName :: String -> String
  const makeName = type => {
    return type !== 'find'
                ? `${type}${capitalizeFirstLetter(name)}`
                : `${type}${capitalizeFirstLetter(name)}s`
  }
  return {
    get: makeName('get'),
    find: makeName('find'),
    post: makeName('post'),
    put: makeName('put'),
    del: makeName('delete'),
  }
}

// makeAxiosFixedUrlSuite :: Object<url: String, name: String> -> Object<Fn...>
const makeAxiosFixedUrlSuite = ({ url, name }) => {
  const { get, find, post, put, del } = makeHttpRequestNames(name)
  return {
    [get]: getWithAxios(url),
    [find]: getWithAxios(url),
    [post]: postWithAxios(url),
    [put]: putWithAxios(url),
    [del]: deleteWithAxios(url),
  }
}

module.exports = function({ url, name }) {
  return makeAxiosFixedUrlSuite({ url, name });
};

exports.getWithAxios = function() { return makeAxiosFn('get') }
exports.postWithAxios = function() { return makeAxiosFn('post') }
exports.putWithAxios = function() { return makeAxiosFn('put') }
exports.deleteWithAxios = function() { return makeAxiosFn('delete') }
