//TODO needs option so we can map the fields
export function treeToPath(a, prefix = '') {
  return a.reduce(function (flattened, { name, id, deleted_on, children }) {
    name = prefix + '/' + name;
    return flattened
      .concat([{ name, id, deleted_on }])
      .concat(children ? treeToPath(children, name) : []);
  }, []);
}

export function listToTree(arr, parent) {
  //http://oskarhane.com/create-a-nested-array-recursively-in-javascript/
  var out = []
  for(var i in arr) {
      if(arr[i].parent_id == parent) {
          var children = listToTree(arr, arr[i].id)

          if(children.length) {
              arr[i].children = children
          }
          out.push(arr[i])
      }
  }
  return out
}

export function cloneArray(arr) {
  if (!arr) return [];
  return JSON.parse(JSON.stringify(arr));
}

export function cloneObj(obj) {
  if (!obj) return {};
  return JSON.parse(JSON.stringify(obj));
}

export function parseNullToString(value)
{
    return value === null || value === undefined ? '' : value;
}

export function debounce(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this, args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};

export function debounceLeading(func, timeout = 300){
    let timer;
    return (...args) => {
        if (!timer) {
            func.apply(this, args);
        }
        clearTimeout(timer);
        timer = setTimeout(() => {
            timer = undefined;
        }, timeout);
    };
}

export function resolve(path, obj=self, separator='.') {
    const properties = Array.isArray(path) ? path : path.split(separator)
    return properties.reduce((prev, curr) => prev && prev[curr], obj)
}

export function setPathValue(path, obj, value) {
    var schema = obj;  // a moving reference to internal objects within obj
    var pList = path.split('.');
    var len = pList.length;
    for(var i = 0; i < len-1; i++) {
        var elem = pList[i];
        if( !schema[elem] ) schema[elem] = {}
        schema = schema[elem];
    }

    schema[pList[len-1]] = value;
}

export function hasAccess(roles) {
    if (!roles) return true;

    const arrayRoles = roles.split(",");
    return window.currentUser.roles.some(r=> arrayRoles.includes(r.trim()));
}