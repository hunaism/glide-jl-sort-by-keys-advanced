window.function = function (data, sort_keys, delimiter, return_delimiter, sort_type, sort_order, limit) {
  if (data.value === undefined) return undefined;
  if (sort_keys.value === undefined) return undefined;
  var delim = delimiter.value ? delimiter.value : ',';
  var return_delim = return_delimiter.value ? return_delimiter.value : '';
  var sorttype = sort_type.value ? sort_type.value : 'numerical';
  var ordering = sort_order.value ? sort_order.value : 'desc';

  var data_arr = data.value.split(delim);
  var keys_arr = sort_keys.value.split(delim);
  if (ordering === 'asc') {
    data_arr = data_arr.reverse();
    keys_arr = keys_arr.reverse();
  }
  var obj = {};
  for (i=0; i<data_arr.length; i++) {
    obj[data_arr[i]] = keys_arr[i];
  }
  var sorted;
  if (sorttype === 'lexical') {
    sorted = Object.keys(obj).sort((a,b) => (obj[b] > obj[a]) ? 1 : ((obj[a] > obj[b]) ? -1 : 0));
  }
  else {
    sorted = Object.keys(obj).sort(function(a,b){return obj[b]-obj[a]});
  }
  if (ordering === 'asc') {
    sorted = sorted.reverse();
    var joined = sorted.join(',');
  }
  if (limit.value) {
    sorted = sorted.splice(0, limit.value);
  }
  var joined = sorted.join(return_delim);

  return joined;
}
