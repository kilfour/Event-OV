(function(scope){
'use strict';

function F(arity, fun, wrapper) {
  wrapper.a = arity;
  wrapper.f = fun;
  return wrapper;
}

function F2(fun) {
  return F(2, fun, function(a) { return function(b) { return fun(a,b); }; })
}
function F3(fun) {
  return F(3, fun, function(a) {
    return function(b) { return function(c) { return fun(a, b, c); }; };
  });
}
function F4(fun) {
  return F(4, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return fun(a, b, c, d); }; }; };
  });
}
function F5(fun) {
  return F(5, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return fun(a, b, c, d, e); }; }; }; };
  });
}
function F6(fun) {
  return F(6, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return fun(a, b, c, d, e, f); }; }; }; }; };
  });
}
function F7(fun) {
  return F(7, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return fun(a, b, c, d, e, f, g); }; }; }; }; }; };
  });
}
function F8(fun) {
  return F(8, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) {
    return fun(a, b, c, d, e, f, g, h); }; }; }; }; }; }; };
  });
}
function F9(fun) {
  return F(9, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) { return function(i) {
    return fun(a, b, c, d, e, f, g, h, i); }; }; }; }; }; }; }; };
  });
}

function A2(fun, a, b) {
  return fun.a === 2 ? fun.f(a, b) : fun(a)(b);
}
function A3(fun, a, b, c) {
  return fun.a === 3 ? fun.f(a, b, c) : fun(a)(b)(c);
}
function A4(fun, a, b, c, d) {
  return fun.a === 4 ? fun.f(a, b, c, d) : fun(a)(b)(c)(d);
}
function A5(fun, a, b, c, d, e) {
  return fun.a === 5 ? fun.f(a, b, c, d, e) : fun(a)(b)(c)(d)(e);
}
function A6(fun, a, b, c, d, e, f) {
  return fun.a === 6 ? fun.f(a, b, c, d, e, f) : fun(a)(b)(c)(d)(e)(f);
}
function A7(fun, a, b, c, d, e, f, g) {
  return fun.a === 7 ? fun.f(a, b, c, d, e, f, g) : fun(a)(b)(c)(d)(e)(f)(g);
}
function A8(fun, a, b, c, d, e, f, g, h) {
  return fun.a === 8 ? fun.f(a, b, c, d, e, f, g, h) : fun(a)(b)(c)(d)(e)(f)(g)(h);
}
function A9(fun, a, b, c, d, e, f, g, h, i) {
  return fun.a === 9 ? fun.f(a, b, c, d, e, f, g, h, i) : fun(a)(b)(c)(d)(e)(f)(g)(h)(i);
}




var _JsArray_empty = [];

function _JsArray_singleton(value)
{
    return [value];
}

function _JsArray_length(array)
{
    return array.length;
}

var _JsArray_initialize = F3(function(size, offset, func)
{
    var result = new Array(size);

    for (var i = 0; i < size; i++)
    {
        result[i] = func(offset + i);
    }

    return result;
});

var _JsArray_initializeFromList = F2(function (max, ls)
{
    var result = new Array(max);

    for (var i = 0; i < max && ls.b; i++)
    {
        result[i] = ls.a;
        ls = ls.b;
    }

    result.length = i;
    return _Utils_Tuple2(result, ls);
});

var _JsArray_unsafeGet = F2(function(index, array)
{
    return array[index];
});

var _JsArray_unsafeSet = F3(function(index, value, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[index] = value;
    return result;
});

var _JsArray_push = F2(function(value, array)
{
    var length = array.length;
    var result = new Array(length + 1);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[length] = value;
    return result;
});

var _JsArray_foldl = F3(function(func, acc, array)
{
    var length = array.length;

    for (var i = 0; i < length; i++)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_foldr = F3(function(func, acc, array)
{
    for (var i = array.length - 1; i >= 0; i--)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_map = F2(function(func, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = func(array[i]);
    }

    return result;
});

var _JsArray_indexedMap = F3(function(func, offset, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = A2(func, offset + i, array[i]);
    }

    return result;
});

var _JsArray_slice = F3(function(from, to, array)
{
    return array.slice(from, to);
});

var _JsArray_appendN = F3(function(n, dest, source)
{
    var destLen = dest.length;
    var itemsToCopy = n - destLen;

    if (itemsToCopy > source.length)
    {
        itemsToCopy = source.length;
    }

    var size = destLen + itemsToCopy;
    var result = new Array(size);

    for (var i = 0; i < destLen; i++)
    {
        result[i] = dest[i];
    }

    for (var i = 0; i < itemsToCopy; i++)
    {
        result[i + destLen] = source[i];
    }

    return result;
});



// LOG

var _Debug_log = F2(function(tag, value)
{
	return value;
});

var _Debug_log_UNUSED = F2(function(tag, value)
{
	console.log(tag + ': ' + _Debug_toString(value));
	return value;
});


// TODOS

function _Debug_todo(moduleName, region)
{
	return function(message) {
		_Debug_crash(8, moduleName, region, message);
	};
}

function _Debug_todoCase(moduleName, region, value)
{
	return function(message) {
		_Debug_crash(9, moduleName, region, value, message);
	};
}


// TO STRING

function _Debug_toString(value)
{
	return '<internals>';
}

function _Debug_toString_UNUSED(value)
{
	return _Debug_toAnsiString(false, value);
}

function _Debug_toAnsiString(ansi, value)
{
	if (typeof value === 'function')
	{
		return _Debug_internalColor(ansi, '<function>');
	}

	if (typeof value === 'boolean')
	{
		return _Debug_ctorColor(ansi, value ? 'True' : 'False');
	}

	if (typeof value === 'number')
	{
		return _Debug_numberColor(ansi, value + '');
	}

	if (value instanceof String)
	{
		return _Debug_charColor(ansi, "'" + _Debug_addSlashes(value, true) + "'");
	}

	if (typeof value === 'string')
	{
		return _Debug_stringColor(ansi, '"' + _Debug_addSlashes(value, false) + '"');
	}

	if (typeof value === 'object' && '$' in value)
	{
		var tag = value.$;

		if (typeof tag === 'number')
		{
			return _Debug_internalColor(ansi, '<internals>');
		}

		if (tag[0] === '#')
		{
			var output = [];
			for (var k in value)
			{
				if (k === '$') continue;
				output.push(_Debug_toAnsiString(ansi, value[k]));
			}
			return '(' + output.join(',') + ')';
		}

		if (tag === 'Set_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Set')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Set$toList(value));
		}

		if (tag === 'RBNode_elm_builtin' || tag === 'RBEmpty_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Dict')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Dict$toList(value));
		}

		if (tag === 'Array_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Array')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Array$toList(value));
		}

		if (tag === '::' || tag === '[]')
		{
			var output = '[';

			value.b && (output += _Debug_toAnsiString(ansi, value.a), value = value.b)

			for (; value.b; value = value.b) // WHILE_CONS
			{
				output += ',' + _Debug_toAnsiString(ansi, value.a);
			}
			return output + ']';
		}

		var output = '';
		for (var i in value)
		{
			if (i === '$') continue;
			var str = _Debug_toAnsiString(ansi, value[i]);
			var c0 = str[0];
			var parenless = c0 === '{' || c0 === '(' || c0 === '[' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
			output += ' ' + (parenless ? str : '(' + str + ')');
		}
		return _Debug_ctorColor(ansi, tag) + output;
	}

	if (typeof DataView === 'function' && value instanceof DataView)
	{
		return _Debug_stringColor(ansi, '<' + value.byteLength + ' bytes>');
	}

	if (typeof File !== 'undefined' && value instanceof File)
	{
		return _Debug_internalColor(ansi, '<' + value.name + '>');
	}

	if (typeof value === 'object')
	{
		var output = [];
		for (var key in value)
		{
			var field = key[0] === '_' ? key.slice(1) : key;
			output.push(_Debug_fadeColor(ansi, field) + ' = ' + _Debug_toAnsiString(ansi, value[key]));
		}
		if (output.length === 0)
		{
			return '{}';
		}
		return '{ ' + output.join(', ') + ' }';
	}

	return _Debug_internalColor(ansi, '<internals>');
}

function _Debug_addSlashes(str, isChar)
{
	var s = str
		.replace(/\\/g, '\\\\')
		.replace(/\n/g, '\\n')
		.replace(/\t/g, '\\t')
		.replace(/\r/g, '\\r')
		.replace(/\v/g, '\\v')
		.replace(/\0/g, '\\0');

	if (isChar)
	{
		return s.replace(/\'/g, '\\\'');
	}
	else
	{
		return s.replace(/\"/g, '\\"');
	}
}

function _Debug_ctorColor(ansi, string)
{
	return ansi ? '\x1b[96m' + string + '\x1b[0m' : string;
}

function _Debug_numberColor(ansi, string)
{
	return ansi ? '\x1b[95m' + string + '\x1b[0m' : string;
}

function _Debug_stringColor(ansi, string)
{
	return ansi ? '\x1b[93m' + string + '\x1b[0m' : string;
}

function _Debug_charColor(ansi, string)
{
	return ansi ? '\x1b[92m' + string + '\x1b[0m' : string;
}

function _Debug_fadeColor(ansi, string)
{
	return ansi ? '\x1b[37m' + string + '\x1b[0m' : string;
}

function _Debug_internalColor(ansi, string)
{
	return ansi ? '\x1b[36m' + string + '\x1b[0m' : string;
}

function _Debug_toHexDigit(n)
{
	return String.fromCharCode(n < 10 ? 48 + n : 55 + n);
}


// CRASH


function _Debug_crash(identifier)
{
	throw new Error('https://github.com/elm/core/blob/1.0.0/hints/' + identifier + '.md');
}


function _Debug_crash_UNUSED(identifier, fact1, fact2, fact3, fact4)
{
	switch(identifier)
	{
		case 0:
			throw new Error('What node should I take over? In JavaScript I need something like:\n\n    Elm.Main.init({\n        node: document.getElementById("elm-node")\n    })\n\nYou need to do this with any Browser.sandbox or Browser.element program.');

		case 1:
			throw new Error('Browser.application programs cannot handle URLs like this:\n\n    ' + document.location.href + '\n\nWhat is the root? The root of your file system? Try looking at this program with `elm reactor` or some other server.');

		case 2:
			var jsonErrorString = fact1;
			throw new Error('Problem with the flags given to your Elm program on initialization.\n\n' + jsonErrorString);

		case 3:
			var portName = fact1;
			throw new Error('There can only be one port named `' + portName + '`, but your program has multiple.');

		case 4:
			var portName = fact1;
			var problem = fact2;
			throw new Error('Trying to send an unexpected type of value through port `' + portName + '`:\n' + problem);

		case 5:
			throw new Error('Trying to use `(==)` on functions.\nThere is no way to know if functions are "the same" in the Elm sense.\nRead more about this at https://package.elm-lang.org/packages/elm/core/latest/Basics#== which describes why it is this way and what the better version will look like.');

		case 6:
			var moduleName = fact1;
			throw new Error('Your page is loading multiple Elm scripts with a module named ' + moduleName + '. Maybe a duplicate script is getting loaded accidentally? If not, rename one of them so I know which is which!');

		case 8:
			var moduleName = fact1;
			var region = fact2;
			var message = fact3;
			throw new Error('TODO in module `' + moduleName + '` ' + _Debug_regionToString(region) + '\n\n' + message);

		case 9:
			var moduleName = fact1;
			var region = fact2;
			var value = fact3;
			var message = fact4;
			throw new Error(
				'TODO in module `' + moduleName + '` from the `case` expression '
				+ _Debug_regionToString(region) + '\n\nIt received the following value:\n\n    '
				+ _Debug_toString(value).replace('\n', '\n    ')
				+ '\n\nBut the branch that handles it says:\n\n    ' + message.replace('\n', '\n    ')
			);

		case 10:
			throw new Error('Bug in https://github.com/elm/virtual-dom/issues');

		case 11:
			throw new Error('Cannot perform mod 0. Division by zero error.');
	}
}

function _Debug_regionToString(region)
{
	if (region.cG.bf === region.df.bf)
	{
		return 'on line ' + region.cG.bf;
	}
	return 'on lines ' + region.cG.bf + ' through ' + region.df.bf;
}



// EQUALITY

function _Utils_eq(x, y)
{
	for (
		var pair, stack = [], isEqual = _Utils_eqHelp(x, y, 0, stack);
		isEqual && (pair = stack.pop());
		isEqual = _Utils_eqHelp(pair.a, pair.b, 0, stack)
		)
	{}

	return isEqual;
}

function _Utils_eqHelp(x, y, depth, stack)
{
	if (x === y)
	{
		return true;
	}

	if (typeof x !== 'object' || x === null || y === null)
	{
		typeof x === 'function' && _Debug_crash(5);
		return false;
	}

	if (depth > 100)
	{
		stack.push(_Utils_Tuple2(x,y));
		return true;
	}

	/**_UNUSED/
	if (x.$ === 'Set_elm_builtin')
	{
		x = $elm$core$Set$toList(x);
		y = $elm$core$Set$toList(y);
	}
	if (x.$ === 'RBNode_elm_builtin' || x.$ === 'RBEmpty_elm_builtin')
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	/**/
	if (x.$ < 0)
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	for (var key in x)
	{
		if (!_Utils_eqHelp(x[key], y[key], depth + 1, stack))
		{
			return false;
		}
	}
	return true;
}

var _Utils_equal = F2(_Utils_eq);
var _Utils_notEqual = F2(function(a, b) { return !_Utils_eq(a,b); });



// COMPARISONS

// Code in Generate/JavaScript.hs, Basics.js, and List.js depends on
// the particular integer values assigned to LT, EQ, and GT.

function _Utils_cmp(x, y, ord)
{
	if (typeof x !== 'object')
	{
		return x === y ? /*EQ*/ 0 : x < y ? /*LT*/ -1 : /*GT*/ 1;
	}

	/**_UNUSED/
	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? 0 : a < b ? -1 : 1;
	}
	//*/

	/**/
	if (typeof x.$ === 'undefined')
	//*/
	/**_UNUSED/
	if (x.$[0] === '#')
	//*/
	{
		return (ord = _Utils_cmp(x.a, y.a))
			? ord
			: (ord = _Utils_cmp(x.b, y.b))
				? ord
				: _Utils_cmp(x.c, y.c);
	}

	// traverse conses until end of a list or a mismatch
	for (; x.b && y.b && !(ord = _Utils_cmp(x.a, y.a)); x = x.b, y = y.b) {} // WHILE_CONSES
	return ord || (x.b ? /*GT*/ 1 : y.b ? /*LT*/ -1 : /*EQ*/ 0);
}

var _Utils_lt = F2(function(a, b) { return _Utils_cmp(a, b) < 0; });
var _Utils_le = F2(function(a, b) { return _Utils_cmp(a, b) < 1; });
var _Utils_gt = F2(function(a, b) { return _Utils_cmp(a, b) > 0; });
var _Utils_ge = F2(function(a, b) { return _Utils_cmp(a, b) >= 0; });

var _Utils_compare = F2(function(x, y)
{
	var n = _Utils_cmp(x, y);
	return n < 0 ? $elm$core$Basics$LT : n ? $elm$core$Basics$GT : $elm$core$Basics$EQ;
});


// COMMON VALUES

var _Utils_Tuple0 = 0;
var _Utils_Tuple0_UNUSED = { $: '#0' };

function _Utils_Tuple2(a, b) { return { a: a, b: b }; }
function _Utils_Tuple2_UNUSED(a, b) { return { $: '#2', a: a, b: b }; }

function _Utils_Tuple3(a, b, c) { return { a: a, b: b, c: c }; }
function _Utils_Tuple3_UNUSED(a, b, c) { return { $: '#3', a: a, b: b, c: c }; }

function _Utils_chr(c) { return c; }
function _Utils_chr_UNUSED(c) { return new String(c); }


// RECORDS

function _Utils_update(oldRecord, updatedFields)
{
	var newRecord = {};

	for (var key in oldRecord)
	{
		newRecord[key] = oldRecord[key];
	}

	for (var key in updatedFields)
	{
		newRecord[key] = updatedFields[key];
	}

	return newRecord;
}


// APPEND

var _Utils_append = F2(_Utils_ap);

function _Utils_ap(xs, ys)
{
	// append Strings
	if (typeof xs === 'string')
	{
		return xs + ys;
	}

	// append Lists
	if (!xs.b)
	{
		return ys;
	}
	var root = _List_Cons(xs.a, ys);
	xs = xs.b
	for (var curr = root; xs.b; xs = xs.b) // WHILE_CONS
	{
		curr = curr.b = _List_Cons(xs.a, ys);
	}
	return root;
}



var _List_Nil = { $: 0 };
var _List_Nil_UNUSED = { $: '[]' };

function _List_Cons(hd, tl) { return { $: 1, a: hd, b: tl }; }
function _List_Cons_UNUSED(hd, tl) { return { $: '::', a: hd, b: tl }; }


var _List_cons = F2(_List_Cons);

function _List_fromArray(arr)
{
	var out = _List_Nil;
	for (var i = arr.length; i--; )
	{
		out = _List_Cons(arr[i], out);
	}
	return out;
}

function _List_toArray(xs)
{
	for (var out = []; xs.b; xs = xs.b) // WHILE_CONS
	{
		out.push(xs.a);
	}
	return out;
}

var _List_map2 = F3(function(f, xs, ys)
{
	for (var arr = []; xs.b && ys.b; xs = xs.b, ys = ys.b) // WHILE_CONSES
	{
		arr.push(A2(f, xs.a, ys.a));
	}
	return _List_fromArray(arr);
});

var _List_map3 = F4(function(f, xs, ys, zs)
{
	for (var arr = []; xs.b && ys.b && zs.b; xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A3(f, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map4 = F5(function(f, ws, xs, ys, zs)
{
	for (var arr = []; ws.b && xs.b && ys.b && zs.b; ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A4(f, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map5 = F6(function(f, vs, ws, xs, ys, zs)
{
	for (var arr = []; vs.b && ws.b && xs.b && ys.b && zs.b; vs = vs.b, ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A5(f, vs.a, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_sortBy = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		return _Utils_cmp(f(a), f(b));
	}));
});

var _List_sortWith = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		var ord = A2(f, a, b);
		return ord === $elm$core$Basics$EQ ? 0 : ord === $elm$core$Basics$LT ? -1 : 1;
	}));
});



// MATH

var _Basics_add = F2(function(a, b) { return a + b; });
var _Basics_sub = F2(function(a, b) { return a - b; });
var _Basics_mul = F2(function(a, b) { return a * b; });
var _Basics_fdiv = F2(function(a, b) { return a / b; });
var _Basics_idiv = F2(function(a, b) { return (a / b) | 0; });
var _Basics_pow = F2(Math.pow);

var _Basics_remainderBy = F2(function(b, a) { return a % b; });

// https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/divmodnote-letter.pdf
var _Basics_modBy = F2(function(modulus, x)
{
	var answer = x % modulus;
	return modulus === 0
		? _Debug_crash(11)
		:
	((answer > 0 && modulus < 0) || (answer < 0 && modulus > 0))
		? answer + modulus
		: answer;
});


// TRIGONOMETRY

var _Basics_pi = Math.PI;
var _Basics_e = Math.E;
var _Basics_cos = Math.cos;
var _Basics_sin = Math.sin;
var _Basics_tan = Math.tan;
var _Basics_acos = Math.acos;
var _Basics_asin = Math.asin;
var _Basics_atan = Math.atan;
var _Basics_atan2 = F2(Math.atan2);


// MORE MATH

function _Basics_toFloat(x) { return x; }
function _Basics_truncate(n) { return n | 0; }
function _Basics_isInfinite(n) { return n === Infinity || n === -Infinity; }

var _Basics_ceiling = Math.ceil;
var _Basics_floor = Math.floor;
var _Basics_round = Math.round;
var _Basics_sqrt = Math.sqrt;
var _Basics_log = Math.log;
var _Basics_isNaN = isNaN;


// BOOLEANS

function _Basics_not(bool) { return !bool; }
var _Basics_and = F2(function(a, b) { return a && b; });
var _Basics_or  = F2(function(a, b) { return a || b; });
var _Basics_xor = F2(function(a, b) { return a !== b; });



var _String_cons = F2(function(chr, str)
{
	return chr + str;
});

function _String_uncons(string)
{
	var word = string.charCodeAt(0);
	return !isNaN(word)
		? $elm$core$Maybe$Just(
			0xD800 <= word && word <= 0xDBFF
				? _Utils_Tuple2(_Utils_chr(string[0] + string[1]), string.slice(2))
				: _Utils_Tuple2(_Utils_chr(string[0]), string.slice(1))
		)
		: $elm$core$Maybe$Nothing;
}

var _String_append = F2(function(a, b)
{
	return a + b;
});

function _String_length(str)
{
	return str.length;
}

var _String_map = F2(function(func, string)
{
	var len = string.length;
	var array = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = string.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			array[i] = func(_Utils_chr(string[i] + string[i+1]));
			i += 2;
			continue;
		}
		array[i] = func(_Utils_chr(string[i]));
		i++;
	}
	return array.join('');
});

var _String_filter = F2(function(isGood, str)
{
	var arr = [];
	var len = str.length;
	var i = 0;
	while (i < len)
	{
		var char = str[i];
		var word = str.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += str[i];
			i++;
		}

		if (isGood(_Utils_chr(char)))
		{
			arr.push(char);
		}
	}
	return arr.join('');
});

function _String_reverse(str)
{
	var len = str.length;
	var arr = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = str.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			arr[len - i] = str[i + 1];
			i++;
			arr[len - i] = str[i - 1];
			i++;
		}
		else
		{
			arr[len - i] = str[i];
			i++;
		}
	}
	return arr.join('');
}

var _String_foldl = F3(function(func, state, string)
{
	var len = string.length;
	var i = 0;
	while (i < len)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += string[i];
			i++;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_foldr = F3(function(func, state, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_split = F2(function(sep, str)
{
	return str.split(sep);
});

var _String_join = F2(function(sep, strs)
{
	return strs.join(sep);
});

var _String_slice = F3(function(start, end, str) {
	return str.slice(start, end);
});

function _String_trim(str)
{
	return str.trim();
}

function _String_trimLeft(str)
{
	return str.replace(/^\s+/, '');
}

function _String_trimRight(str)
{
	return str.replace(/\s+$/, '');
}

function _String_words(str)
{
	return _List_fromArray(str.trim().split(/\s+/g));
}

function _String_lines(str)
{
	return _List_fromArray(str.split(/\r\n|\r|\n/g));
}

function _String_toUpper(str)
{
	return str.toUpperCase();
}

function _String_toLower(str)
{
	return str.toLowerCase();
}

var _String_any = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (isGood(_Utils_chr(char)))
		{
			return true;
		}
	}
	return false;
});

var _String_all = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (!isGood(_Utils_chr(char)))
		{
			return false;
		}
	}
	return true;
});

var _String_contains = F2(function(sub, str)
{
	return str.indexOf(sub) > -1;
});

var _String_startsWith = F2(function(sub, str)
{
	return str.indexOf(sub) === 0;
});

var _String_endsWith = F2(function(sub, str)
{
	return str.length >= sub.length &&
		str.lastIndexOf(sub) === str.length - sub.length;
});

var _String_indexes = F2(function(sub, str)
{
	var subLen = sub.length;

	if (subLen < 1)
	{
		return _List_Nil;
	}

	var i = 0;
	var is = [];

	while ((i = str.indexOf(sub, i)) > -1)
	{
		is.push(i);
		i = i + subLen;
	}

	return _List_fromArray(is);
});


// TO STRING

function _String_fromNumber(number)
{
	return number + '';
}


// INT CONVERSIONS

function _String_toInt(str)
{
	var total = 0;
	var code0 = str.charCodeAt(0);
	var start = code0 == 0x2B /* + */ || code0 == 0x2D /* - */ ? 1 : 0;

	for (var i = start; i < str.length; ++i)
	{
		var code = str.charCodeAt(i);
		if (code < 0x30 || 0x39 < code)
		{
			return $elm$core$Maybe$Nothing;
		}
		total = 10 * total + code - 0x30;
	}

	return i == start
		? $elm$core$Maybe$Nothing
		: $elm$core$Maybe$Just(code0 == 0x2D ? -total : total);
}


// FLOAT CONVERSIONS

function _String_toFloat(s)
{
	// check if it is a hex, octal, or binary number
	if (s.length === 0 || /[\sxbo]/.test(s))
	{
		return $elm$core$Maybe$Nothing;
	}
	var n = +s;
	// faster isNaN check
	return n === n ? $elm$core$Maybe$Just(n) : $elm$core$Maybe$Nothing;
}

function _String_fromList(chars)
{
	return _List_toArray(chars).join('');
}




function _Char_toCode(char)
{
	var code = char.charCodeAt(0);
	if (0xD800 <= code && code <= 0xDBFF)
	{
		return (code - 0xD800) * 0x400 + char.charCodeAt(1) - 0xDC00 + 0x10000
	}
	return code;
}

function _Char_fromCode(code)
{
	return _Utils_chr(
		(code < 0 || 0x10FFFF < code)
			? '\uFFFD'
			:
		(code <= 0xFFFF)
			? String.fromCharCode(code)
			:
		(code -= 0x10000,
			String.fromCharCode(Math.floor(code / 0x400) + 0xD800, code % 0x400 + 0xDC00)
		)
	);
}

function _Char_toUpper(char)
{
	return _Utils_chr(char.toUpperCase());
}

function _Char_toLower(char)
{
	return _Utils_chr(char.toLowerCase());
}

function _Char_toLocaleUpper(char)
{
	return _Utils_chr(char.toLocaleUpperCase());
}

function _Char_toLocaleLower(char)
{
	return _Utils_chr(char.toLocaleLowerCase());
}



/**_UNUSED/
function _Json_errorToString(error)
{
	return $elm$json$Json$Decode$errorToString(error);
}
//*/


// CORE DECODERS

function _Json_succeed(msg)
{
	return {
		$: 0,
		a: msg
	};
}

function _Json_fail(msg)
{
	return {
		$: 1,
		a: msg
	};
}

function _Json_decodePrim(decoder)
{
	return { $: 2, b: decoder };
}

var _Json_decodeInt = _Json_decodePrim(function(value) {
	return (typeof value !== 'number')
		? _Json_expecting('an INT', value)
		:
	(-2147483647 < value && value < 2147483647 && (value | 0) === value)
		? $elm$core$Result$Ok(value)
		:
	(isFinite(value) && !(value % 1))
		? $elm$core$Result$Ok(value)
		: _Json_expecting('an INT', value);
});

var _Json_decodeBool = _Json_decodePrim(function(value) {
	return (typeof value === 'boolean')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a BOOL', value);
});

var _Json_decodeFloat = _Json_decodePrim(function(value) {
	return (typeof value === 'number')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a FLOAT', value);
});

var _Json_decodeValue = _Json_decodePrim(function(value) {
	return $elm$core$Result$Ok(_Json_wrap(value));
});

var _Json_decodeString = _Json_decodePrim(function(value) {
	return (typeof value === 'string')
		? $elm$core$Result$Ok(value)
		: (value instanceof String)
			? $elm$core$Result$Ok(value + '')
			: _Json_expecting('a STRING', value);
});

function _Json_decodeList(decoder) { return { $: 3, b: decoder }; }
function _Json_decodeArray(decoder) { return { $: 4, b: decoder }; }

function _Json_decodeNull(value) { return { $: 5, c: value }; }

var _Json_decodeField = F2(function(field, decoder)
{
	return {
		$: 6,
		d: field,
		b: decoder
	};
});

var _Json_decodeIndex = F2(function(index, decoder)
{
	return {
		$: 7,
		e: index,
		b: decoder
	};
});

function _Json_decodeKeyValuePairs(decoder)
{
	return {
		$: 8,
		b: decoder
	};
}

function _Json_mapMany(f, decoders)
{
	return {
		$: 9,
		f: f,
		g: decoders
	};
}

var _Json_andThen = F2(function(callback, decoder)
{
	return {
		$: 10,
		b: decoder,
		h: callback
	};
});

function _Json_oneOf(decoders)
{
	return {
		$: 11,
		g: decoders
	};
}


// DECODING OBJECTS

var _Json_map1 = F2(function(f, d1)
{
	return _Json_mapMany(f, [d1]);
});

var _Json_map2 = F3(function(f, d1, d2)
{
	return _Json_mapMany(f, [d1, d2]);
});

var _Json_map3 = F4(function(f, d1, d2, d3)
{
	return _Json_mapMany(f, [d1, d2, d3]);
});

var _Json_map4 = F5(function(f, d1, d2, d3, d4)
{
	return _Json_mapMany(f, [d1, d2, d3, d4]);
});

var _Json_map5 = F6(function(f, d1, d2, d3, d4, d5)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5]);
});

var _Json_map6 = F7(function(f, d1, d2, d3, d4, d5, d6)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6]);
});

var _Json_map7 = F8(function(f, d1, d2, d3, d4, d5, d6, d7)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7]);
});

var _Json_map8 = F9(function(f, d1, d2, d3, d4, d5, d6, d7, d8)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7, d8]);
});


// DECODE

var _Json_runOnString = F2(function(decoder, string)
{
	try
	{
		var value = JSON.parse(string);
		return _Json_runHelp(decoder, value);
	}
	catch (e)
	{
		return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'This is not valid JSON! ' + e.message, _Json_wrap(string)));
	}
});

var _Json_run = F2(function(decoder, value)
{
	return _Json_runHelp(decoder, _Json_unwrap(value));
});

function _Json_runHelp(decoder, value)
{
	switch (decoder.$)
	{
		case 2:
			return decoder.b(value);

		case 5:
			return (value === null)
				? $elm$core$Result$Ok(decoder.c)
				: _Json_expecting('null', value);

		case 3:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('a LIST', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _List_fromArray);

		case 4:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _Json_toElmArray);

		case 6:
			var field = decoder.d;
			if (typeof value !== 'object' || value === null || !(field in value))
			{
				return _Json_expecting('an OBJECT with a field named `' + field + '`', value);
			}
			var result = _Json_runHelp(decoder.b, value[field]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, field, result.a));

		case 7:
			var index = decoder.e;
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			if (index >= value.length)
			{
				return _Json_expecting('a LONGER array. Need index ' + index + ' but only see ' + value.length + ' entries', value);
			}
			var result = _Json_runHelp(decoder.b, value[index]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, index, result.a));

		case 8:
			if (typeof value !== 'object' || value === null || _Json_isArray(value))
			{
				return _Json_expecting('an OBJECT', value);
			}

			var keyValuePairs = _List_Nil;
			// TODO test perf of Object.keys and switch when support is good enough
			for (var key in value)
			{
				if (value.hasOwnProperty(key))
				{
					var result = _Json_runHelp(decoder.b, value[key]);
					if (!$elm$core$Result$isOk(result))
					{
						return $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, key, result.a));
					}
					keyValuePairs = _List_Cons(_Utils_Tuple2(key, result.a), keyValuePairs);
				}
			}
			return $elm$core$Result$Ok($elm$core$List$reverse(keyValuePairs));

		case 9:
			var answer = decoder.f;
			var decoders = decoder.g;
			for (var i = 0; i < decoders.length; i++)
			{
				var result = _Json_runHelp(decoders[i], value);
				if (!$elm$core$Result$isOk(result))
				{
					return result;
				}
				answer = answer(result.a);
			}
			return $elm$core$Result$Ok(answer);

		case 10:
			var result = _Json_runHelp(decoder.b, value);
			return (!$elm$core$Result$isOk(result))
				? result
				: _Json_runHelp(decoder.h(result.a), value);

		case 11:
			var errors = _List_Nil;
			for (var temp = decoder.g; temp.b; temp = temp.b) // WHILE_CONS
			{
				var result = _Json_runHelp(temp.a, value);
				if ($elm$core$Result$isOk(result))
				{
					return result;
				}
				errors = _List_Cons(result.a, errors);
			}
			return $elm$core$Result$Err($elm$json$Json$Decode$OneOf($elm$core$List$reverse(errors)));

		case 1:
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, decoder.a, _Json_wrap(value)));

		case 0:
			return $elm$core$Result$Ok(decoder.a);
	}
}

function _Json_runArrayDecoder(decoder, value, toElmValue)
{
	var len = value.length;
	var array = new Array(len);
	for (var i = 0; i < len; i++)
	{
		var result = _Json_runHelp(decoder, value[i]);
		if (!$elm$core$Result$isOk(result))
		{
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, i, result.a));
		}
		array[i] = result.a;
	}
	return $elm$core$Result$Ok(toElmValue(array));
}

function _Json_isArray(value)
{
	return Array.isArray(value) || (typeof FileList !== 'undefined' && value instanceof FileList);
}

function _Json_toElmArray(array)
{
	return A2($elm$core$Array$initialize, array.length, function(i) { return array[i]; });
}

function _Json_expecting(type, value)
{
	return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'Expecting ' + type, _Json_wrap(value)));
}


// EQUALITY

function _Json_equality(x, y)
{
	if (x === y)
	{
		return true;
	}

	if (x.$ !== y.$)
	{
		return false;
	}

	switch (x.$)
	{
		case 0:
		case 1:
			return x.a === y.a;

		case 2:
			return x.b === y.b;

		case 5:
			return x.c === y.c;

		case 3:
		case 4:
		case 8:
			return _Json_equality(x.b, y.b);

		case 6:
			return x.d === y.d && _Json_equality(x.b, y.b);

		case 7:
			return x.e === y.e && _Json_equality(x.b, y.b);

		case 9:
			return x.f === y.f && _Json_listEquality(x.g, y.g);

		case 10:
			return x.h === y.h && _Json_equality(x.b, y.b);

		case 11:
			return _Json_listEquality(x.g, y.g);
	}
}

function _Json_listEquality(aDecoders, bDecoders)
{
	var len = aDecoders.length;
	if (len !== bDecoders.length)
	{
		return false;
	}
	for (var i = 0; i < len; i++)
	{
		if (!_Json_equality(aDecoders[i], bDecoders[i]))
		{
			return false;
		}
	}
	return true;
}


// ENCODE

var _Json_encode = F2(function(indentLevel, value)
{
	return JSON.stringify(_Json_unwrap(value), null, indentLevel) + '';
});

function _Json_wrap_UNUSED(value) { return { $: 0, a: value }; }
function _Json_unwrap_UNUSED(value) { return value.a; }

function _Json_wrap(value) { return value; }
function _Json_unwrap(value) { return value; }

function _Json_emptyArray() { return []; }
function _Json_emptyObject() { return {}; }

var _Json_addField = F3(function(key, value, object)
{
	object[key] = _Json_unwrap(value);
	return object;
});

function _Json_addEntry(func)
{
	return F2(function(entry, array)
	{
		array.push(_Json_unwrap(func(entry)));
		return array;
	});
}

var _Json_encodeNull = _Json_wrap(null);



// TASKS

function _Scheduler_succeed(value)
{
	return {
		$: 0,
		a: value
	};
}

function _Scheduler_fail(error)
{
	return {
		$: 1,
		a: error
	};
}

function _Scheduler_binding(callback)
{
	return {
		$: 2,
		b: callback,
		c: null
	};
}

var _Scheduler_andThen = F2(function(callback, task)
{
	return {
		$: 3,
		b: callback,
		d: task
	};
});

var _Scheduler_onError = F2(function(callback, task)
{
	return {
		$: 4,
		b: callback,
		d: task
	};
});

function _Scheduler_receive(callback)
{
	return {
		$: 5,
		b: callback
	};
}


// PROCESSES

var _Scheduler_guid = 0;

function _Scheduler_rawSpawn(task)
{
	var proc = {
		$: 0,
		e: _Scheduler_guid++,
		f: task,
		g: null,
		h: []
	};

	_Scheduler_enqueue(proc);

	return proc;
}

function _Scheduler_spawn(task)
{
	return _Scheduler_binding(function(callback) {
		callback(_Scheduler_succeed(_Scheduler_rawSpawn(task)));
	});
}

function _Scheduler_rawSend(proc, msg)
{
	proc.h.push(msg);
	_Scheduler_enqueue(proc);
}

var _Scheduler_send = F2(function(proc, msg)
{
	return _Scheduler_binding(function(callback) {
		_Scheduler_rawSend(proc, msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});

function _Scheduler_kill(proc)
{
	return _Scheduler_binding(function(callback) {
		var task = proc.f;
		if (task.$ === 2 && task.c)
		{
			task.c();
		}

		proc.f = null;

		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
}


/* STEP PROCESSES

type alias Process =
  { $ : tag
  , id : unique_id
  , root : Task
  , stack : null | { $: SUCCEED | FAIL, a: callback, b: stack }
  , mailbox : [msg]
  }

*/


var _Scheduler_working = false;
var _Scheduler_queue = [];


function _Scheduler_enqueue(proc)
{
	_Scheduler_queue.push(proc);
	if (_Scheduler_working)
	{
		return;
	}
	_Scheduler_working = true;
	while (proc = _Scheduler_queue.shift())
	{
		_Scheduler_step(proc);
	}
	_Scheduler_working = false;
}


function _Scheduler_step(proc)
{
	while (proc.f)
	{
		var rootTag = proc.f.$;
		if (rootTag === 0 || rootTag === 1)
		{
			while (proc.g && proc.g.$ !== rootTag)
			{
				proc.g = proc.g.i;
			}
			if (!proc.g)
			{
				return;
			}
			proc.f = proc.g.b(proc.f.a);
			proc.g = proc.g.i;
		}
		else if (rootTag === 2)
		{
			proc.f.c = proc.f.b(function(newRoot) {
				proc.f = newRoot;
				_Scheduler_enqueue(proc);
			});
			return;
		}
		else if (rootTag === 5)
		{
			if (proc.h.length === 0)
			{
				return;
			}
			proc.f = proc.f.b(proc.h.shift());
		}
		else // if (rootTag === 3 || rootTag === 4)
		{
			proc.g = {
				$: rootTag === 3 ? 0 : 1,
				b: proc.f.b,
				i: proc.g
			};
			proc.f = proc.f.d;
		}
	}
}



function _Process_sleep(time)
{
	return _Scheduler_binding(function(callback) {
		var id = setTimeout(function() {
			callback(_Scheduler_succeed(_Utils_Tuple0));
		}, time);

		return function() { clearTimeout(id); };
	});
}




// PROGRAMS


var _Platform_worker = F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.fe,
		impl.fR,
		impl.fI,
		function() { return function() {} }
	);
});



// INITIALIZE A PROGRAM


function _Platform_initialize(flagDecoder, args, init, update, subscriptions, stepperBuilder)
{
	var result = A2(_Json_run, flagDecoder, _Json_wrap(args ? args['flags'] : undefined));
	$elm$core$Result$isOk(result) || _Debug_crash(2 /**_UNUSED/, _Json_errorToString(result.a) /**/);
	var managers = {};
	var initPair = init(result.a);
	var model = initPair.a;
	var stepper = stepperBuilder(sendToApp, model);
	var ports = _Platform_setupEffects(managers, sendToApp);

	function sendToApp(msg, viewMetadata)
	{
		var pair = A2(update, msg, model);
		stepper(model = pair.a, viewMetadata);
		_Platform_enqueueEffects(managers, pair.b, subscriptions(model));
	}

	_Platform_enqueueEffects(managers, initPair.b, subscriptions(model));

	return ports ? { ports: ports } : {};
}



// TRACK PRELOADS
//
// This is used by code in elm/browser and elm/http
// to register any HTTP requests that are triggered by init.
//


var _Platform_preload;


function _Platform_registerPreload(url)
{
	_Platform_preload.add(url);
}



// EFFECT MANAGERS


var _Platform_effectManagers = {};


function _Platform_setupEffects(managers, sendToApp)
{
	var ports;

	// setup all necessary effect managers
	for (var key in _Platform_effectManagers)
	{
		var manager = _Platform_effectManagers[key];

		if (manager.a)
		{
			ports = ports || {};
			ports[key] = manager.a(key, sendToApp);
		}

		managers[key] = _Platform_instantiateManager(manager, sendToApp);
	}

	return ports;
}


function _Platform_createManager(init, onEffects, onSelfMsg, cmdMap, subMap)
{
	return {
		b: init,
		c: onEffects,
		d: onSelfMsg,
		e: cmdMap,
		f: subMap
	};
}


function _Platform_instantiateManager(info, sendToApp)
{
	var router = {
		g: sendToApp,
		h: undefined
	};

	var onEffects = info.c;
	var onSelfMsg = info.d;
	var cmdMap = info.e;
	var subMap = info.f;

	function loop(state)
	{
		return A2(_Scheduler_andThen, loop, _Scheduler_receive(function(msg)
		{
			var value = msg.a;

			if (msg.$ === 0)
			{
				return A3(onSelfMsg, router, value, state);
			}

			return cmdMap && subMap
				? A4(onEffects, router, value.i, value.j, state)
				: A3(onEffects, router, cmdMap ? value.i : value.j, state);
		}));
	}

	return router.h = _Scheduler_rawSpawn(A2(_Scheduler_andThen, loop, info.b));
}



// ROUTING


var _Platform_sendToApp = F2(function(router, msg)
{
	return _Scheduler_binding(function(callback)
	{
		router.g(msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});


var _Platform_sendToSelf = F2(function(router, msg)
{
	return A2(_Scheduler_send, router.h, {
		$: 0,
		a: msg
	});
});



// BAGS


function _Platform_leaf(home)
{
	return function(value)
	{
		return {
			$: 1,
			k: home,
			l: value
		};
	};
}


function _Platform_batch(list)
{
	return {
		$: 2,
		m: list
	};
}


var _Platform_map = F2(function(tagger, bag)
{
	return {
		$: 3,
		n: tagger,
		o: bag
	}
});



// PIPE BAGS INTO EFFECT MANAGERS
//
// Effects must be queued!
//
// Say your init contains a synchronous command, like Time.now or Time.here
//
//   - This will produce a batch of effects (FX_1)
//   - The synchronous task triggers the subsequent `update` call
//   - This will produce a batch of effects (FX_2)
//
// If we just start dispatching FX_2, subscriptions from FX_2 can be processed
// before subscriptions from FX_1. No good! Earlier versions of this code had
// this problem, leading to these reports:
//
//   https://github.com/elm/core/issues/980
//   https://github.com/elm/core/pull/981
//   https://github.com/elm/compiler/issues/1776
//
// The queue is necessary to avoid ordering issues for synchronous commands.


// Why use true/false here? Why not just check the length of the queue?
// The goal is to detect "are we currently dispatching effects?" If we
// are, we need to bail and let the ongoing while loop handle things.
//
// Now say the queue has 1 element. When we dequeue the final element,
// the queue will be empty, but we are still actively dispatching effects.
// So you could get queue jumping in a really tricky category of cases.
//
var _Platform_effectsQueue = [];
var _Platform_effectsActive = false;


function _Platform_enqueueEffects(managers, cmdBag, subBag)
{
	_Platform_effectsQueue.push({ p: managers, q: cmdBag, r: subBag });

	if (_Platform_effectsActive) return;

	_Platform_effectsActive = true;
	for (var fx; fx = _Platform_effectsQueue.shift(); )
	{
		_Platform_dispatchEffects(fx.p, fx.q, fx.r);
	}
	_Platform_effectsActive = false;
}


function _Platform_dispatchEffects(managers, cmdBag, subBag)
{
	var effectsDict = {};
	_Platform_gatherEffects(true, cmdBag, effectsDict, null);
	_Platform_gatherEffects(false, subBag, effectsDict, null);

	for (var home in managers)
	{
		_Scheduler_rawSend(managers[home], {
			$: 'fx',
			a: effectsDict[home] || { i: _List_Nil, j: _List_Nil }
		});
	}
}


function _Platform_gatherEffects(isCmd, bag, effectsDict, taggers)
{
	switch (bag.$)
	{
		case 1:
			var home = bag.k;
			var effect = _Platform_toEffect(isCmd, home, taggers, bag.l);
			effectsDict[home] = _Platform_insert(isCmd, effect, effectsDict[home]);
			return;

		case 2:
			for (var list = bag.m; list.b; list = list.b) // WHILE_CONS
			{
				_Platform_gatherEffects(isCmd, list.a, effectsDict, taggers);
			}
			return;

		case 3:
			_Platform_gatherEffects(isCmd, bag.o, effectsDict, {
				s: bag.n,
				t: taggers
			});
			return;
	}
}


function _Platform_toEffect(isCmd, home, taggers, value)
{
	function applyTaggers(x)
	{
		for (var temp = taggers; temp; temp = temp.t)
		{
			x = temp.s(x);
		}
		return x;
	}

	var map = isCmd
		? _Platform_effectManagers[home].e
		: _Platform_effectManagers[home].f;

	return A2(map, applyTaggers, value)
}


function _Platform_insert(isCmd, newEffect, effects)
{
	effects = effects || { i: _List_Nil, j: _List_Nil };

	isCmd
		? (effects.i = _List_Cons(newEffect, effects.i))
		: (effects.j = _List_Cons(newEffect, effects.j));

	return effects;
}



// PORTS


function _Platform_checkPortName(name)
{
	if (_Platform_effectManagers[name])
	{
		_Debug_crash(3, name)
	}
}



// OUTGOING PORTS


function _Platform_outgoingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		e: _Platform_outgoingPortMap,
		u: converter,
		a: _Platform_setupOutgoingPort
	};
	return _Platform_leaf(name);
}


var _Platform_outgoingPortMap = F2(function(tagger, value) { return value; });


function _Platform_setupOutgoingPort(name)
{
	var subs = [];
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Process_sleep(0);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, cmdList, state)
	{
		for ( ; cmdList.b; cmdList = cmdList.b) // WHILE_CONS
		{
			// grab a separate reference to subs in case unsubscribe is called
			var currentSubs = subs;
			var value = _Json_unwrap(converter(cmdList.a));
			for (var i = 0; i < currentSubs.length; i++)
			{
				currentSubs[i](value);
			}
		}
		return init;
	});

	// PUBLIC API

	function subscribe(callback)
	{
		subs.push(callback);
	}

	function unsubscribe(callback)
	{
		// copy subs into a new array in case unsubscribe is called within a
		// subscribed callback
		subs = subs.slice();
		var index = subs.indexOf(callback);
		if (index >= 0)
		{
			subs.splice(index, 1);
		}
	}

	return {
		subscribe: subscribe,
		unsubscribe: unsubscribe
	};
}



// INCOMING PORTS


function _Platform_incomingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		f: _Platform_incomingPortMap,
		u: converter,
		a: _Platform_setupIncomingPort
	};
	return _Platform_leaf(name);
}


var _Platform_incomingPortMap = F2(function(tagger, finalTagger)
{
	return function(value)
	{
		return tagger(finalTagger(value));
	};
});


function _Platform_setupIncomingPort(name, sendToApp)
{
	var subs = _List_Nil;
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Scheduler_succeed(null);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, subList, state)
	{
		subs = subList;
		return init;
	});

	// PUBLIC API

	function send(incomingValue)
	{
		var result = A2(_Json_run, converter, _Json_wrap(incomingValue));

		$elm$core$Result$isOk(result) || _Debug_crash(4, name, result.a);

		var value = result.a;
		for (var temp = subs; temp.b; temp = temp.b) // WHILE_CONS
		{
			sendToApp(temp.a(value));
		}
	}

	return { send: send };
}



// EXPORT ELM MODULES
//
// Have DEBUG and PROD versions so that we can (1) give nicer errors in
// debug mode and (2) not pay for the bits needed for that in prod mode.
//


function _Platform_export(exports)
{
	scope['Elm']
		? _Platform_mergeExportsProd(scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsProd(obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6)
				: _Platform_mergeExportsProd(obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}


function _Platform_export_UNUSED(exports)
{
	scope['Elm']
		? _Platform_mergeExportsDebug('Elm', scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsDebug(moduleName, obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6, moduleName)
				: _Platform_mergeExportsDebug(moduleName + '.' + name, obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}




// HELPERS


var _VirtualDom_divertHrefToApp;

var _VirtualDom_doc = typeof document !== 'undefined' ? document : {};


function _VirtualDom_appendChild(parent, child)
{
	parent.appendChild(child);
}

var _VirtualDom_init = F4(function(virtualNode, flagDecoder, debugMetadata, args)
{
	// NOTE: this function needs _Platform_export available to work

	/**/
	var node = args['node'];
	//*/
	/**_UNUSED/
	var node = args && args['node'] ? args['node'] : _Debug_crash(0);
	//*/

	node.parentNode.replaceChild(
		_VirtualDom_render(virtualNode, function() {}),
		node
	);

	return {};
});



// TEXT


function _VirtualDom_text(string)
{
	return {
		$: 0,
		a: string
	};
}



// NODE


var _VirtualDom_nodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 1,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_node = _VirtualDom_nodeNS(undefined);



// KEYED NODE


var _VirtualDom_keyedNodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 2,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_keyedNode = _VirtualDom_keyedNodeNS(undefined);



// CUSTOM


function _VirtualDom_custom(factList, model, render, diff)
{
	return {
		$: 3,
		d: _VirtualDom_organizeFacts(factList),
		g: model,
		h: render,
		i: diff
	};
}



// MAP


var _VirtualDom_map = F2(function(tagger, node)
{
	return {
		$: 4,
		j: tagger,
		k: node,
		b: 1 + (node.b || 0)
	};
});



// LAZY


function _VirtualDom_thunk(refs, thunk)
{
	return {
		$: 5,
		l: refs,
		m: thunk,
		k: undefined
	};
}

var _VirtualDom_lazy = F2(function(func, a)
{
	return _VirtualDom_thunk([func, a], function() {
		return func(a);
	});
});

var _VirtualDom_lazy2 = F3(function(func, a, b)
{
	return _VirtualDom_thunk([func, a, b], function() {
		return A2(func, a, b);
	});
});

var _VirtualDom_lazy3 = F4(function(func, a, b, c)
{
	return _VirtualDom_thunk([func, a, b, c], function() {
		return A3(func, a, b, c);
	});
});

var _VirtualDom_lazy4 = F5(function(func, a, b, c, d)
{
	return _VirtualDom_thunk([func, a, b, c, d], function() {
		return A4(func, a, b, c, d);
	});
});

var _VirtualDom_lazy5 = F6(function(func, a, b, c, d, e)
{
	return _VirtualDom_thunk([func, a, b, c, d, e], function() {
		return A5(func, a, b, c, d, e);
	});
});

var _VirtualDom_lazy6 = F7(function(func, a, b, c, d, e, f)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f], function() {
		return A6(func, a, b, c, d, e, f);
	});
});

var _VirtualDom_lazy7 = F8(function(func, a, b, c, d, e, f, g)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g], function() {
		return A7(func, a, b, c, d, e, f, g);
	});
});

var _VirtualDom_lazy8 = F9(function(func, a, b, c, d, e, f, g, h)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g, h], function() {
		return A8(func, a, b, c, d, e, f, g, h);
	});
});



// FACTS


var _VirtualDom_on = F2(function(key, handler)
{
	return {
		$: 'a0',
		n: key,
		o: handler
	};
});
var _VirtualDom_style = F2(function(key, value)
{
	return {
		$: 'a1',
		n: key,
		o: value
	};
});
var _VirtualDom_property = F2(function(key, value)
{
	return {
		$: 'a2',
		n: key,
		o: value
	};
});
var _VirtualDom_attribute = F2(function(key, value)
{
	return {
		$: 'a3',
		n: key,
		o: value
	};
});
var _VirtualDom_attributeNS = F3(function(namespace, key, value)
{
	return {
		$: 'a4',
		n: key,
		o: { f: namespace, o: value }
	};
});



// XSS ATTACK VECTOR CHECKS
//
// For some reason, tabs can appear in href protocols and it still works.
// So '\tjava\tSCRIPT:alert("!!!")' and 'javascript:alert("!!!")' are the same
// in practice. That is why _VirtualDom_RE_js and _VirtualDom_RE_js_html look
// so freaky.
//
// Pulling the regular expressions out to the top level gives a slight speed
// boost in small benchmarks (4-10%) but hoisting values to reduce allocation
// can be unpredictable in large programs where JIT may have a harder time with
// functions are not fully self-contained. The benefit is more that the js and
// js_html ones are so weird that I prefer to see them near each other.


var _VirtualDom_RE_script = /^script$/i;
var _VirtualDom_RE_on_formAction = /^(on|formAction$)/i;
var _VirtualDom_RE_js = /^\s*j\s*a\s*v\s*a\s*s\s*c\s*r\s*i\s*p\s*t\s*:/i;
var _VirtualDom_RE_js_html = /^\s*(j\s*a\s*v\s*a\s*s\s*c\s*r\s*i\s*p\s*t\s*:|d\s*a\s*t\s*a\s*:\s*t\s*e\s*x\s*t\s*\/\s*h\s*t\s*m\s*l\s*(,|;))/i;


function _VirtualDom_noScript(tag)
{
	return _VirtualDom_RE_script.test(tag) ? 'p' : tag;
}

function _VirtualDom_noOnOrFormAction(key)
{
	return _VirtualDom_RE_on_formAction.test(key) ? 'data-' + key : key;
}

function _VirtualDom_noInnerHtmlOrFormAction(key)
{
	return key == 'innerHTML' || key == 'formAction' ? 'data-' + key : key;
}

function _VirtualDom_noJavaScriptUri(value)
{
	return _VirtualDom_RE_js.test(value)
		? /**/''//*//**_UNUSED/'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'//*/
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlUri(value)
{
	return _VirtualDom_RE_js_html.test(value)
		? /**/''//*//**_UNUSED/'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'//*/
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlJson(value)
{
	return (typeof _Json_unwrap(value) === 'string' && _VirtualDom_RE_js_html.test(_Json_unwrap(value)))
		? _Json_wrap(
			/**/''//*//**_UNUSED/'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'//*/
		) : value;
}



// MAP FACTS


var _VirtualDom_mapAttribute = F2(function(func, attr)
{
	return (attr.$ === 'a0')
		? A2(_VirtualDom_on, attr.n, _VirtualDom_mapHandler(func, attr.o))
		: attr;
});

function _VirtualDom_mapHandler(func, handler)
{
	var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

	// 0 = Normal
	// 1 = MayStopPropagation
	// 2 = MayPreventDefault
	// 3 = Custom

	return {
		$: handler.$,
		a:
			!tag
				? A2($elm$json$Json$Decode$map, func, handler.a)
				:
			A3($elm$json$Json$Decode$map2,
				tag < 3
					? _VirtualDom_mapEventTuple
					: _VirtualDom_mapEventRecord,
				$elm$json$Json$Decode$succeed(func),
				handler.a
			)
	};
}

var _VirtualDom_mapEventTuple = F2(function(func, tuple)
{
	return _Utils_Tuple2(func(tuple.a), tuple.b);
});

var _VirtualDom_mapEventRecord = F2(function(func, record)
{
	return {
		_: func(record._),
		cH: record.cH,
		cC: record.cC
	}
});



// ORGANIZE FACTS


function _VirtualDom_organizeFacts(factList)
{
	for (var facts = {}; factList.b; factList = factList.b) // WHILE_CONS
	{
		var entry = factList.a;

		var tag = entry.$;
		var key = entry.n;
		var value = entry.o;

		if (tag === 'a2')
		{
			(key === 'className')
				? _VirtualDom_addClass(facts, key, _Json_unwrap(value))
				: facts[key] = _Json_unwrap(value);

			continue;
		}

		var subFacts = facts[tag] || (facts[tag] = {});
		(tag === 'a3' && key === 'class')
			? _VirtualDom_addClass(subFacts, key, value)
			: subFacts[key] = value;
	}

	return facts;
}

function _VirtualDom_addClass(object, key, newClass)
{
	var classes = object[key];
	object[key] = classes ? classes + ' ' + newClass : newClass;
}



// RENDER


function _VirtualDom_render(vNode, eventNode)
{
	var tag = vNode.$;

	if (tag === 5)
	{
		return _VirtualDom_render(vNode.k || (vNode.k = vNode.m()), eventNode);
	}

	if (tag === 0)
	{
		return _VirtualDom_doc.createTextNode(vNode.a);
	}

	if (tag === 4)
	{
		var subNode = vNode.k;
		var tagger = vNode.j;

		while (subNode.$ === 4)
		{
			typeof tagger !== 'object'
				? tagger = [tagger, subNode.j]
				: tagger.push(subNode.j);

			subNode = subNode.k;
		}

		var subEventRoot = { j: tagger, p: eventNode };
		var domNode = _VirtualDom_render(subNode, subEventRoot);
		domNode.elm_event_node_ref = subEventRoot;
		return domNode;
	}

	if (tag === 3)
	{
		var domNode = vNode.h(vNode.g);
		_VirtualDom_applyFacts(domNode, eventNode, vNode.d);
		return domNode;
	}

	// at this point `tag` must be 1 or 2

	var domNode = vNode.f
		? _VirtualDom_doc.createElementNS(vNode.f, vNode.c)
		: _VirtualDom_doc.createElement(vNode.c);

	if (_VirtualDom_divertHrefToApp && vNode.c == 'a')
	{
		domNode.addEventListener('click', _VirtualDom_divertHrefToApp(domNode));
	}

	_VirtualDom_applyFacts(domNode, eventNode, vNode.d);

	for (var kids = vNode.e, i = 0; i < kids.length; i++)
	{
		_VirtualDom_appendChild(domNode, _VirtualDom_render(tag === 1 ? kids[i] : kids[i].b, eventNode));
	}

	return domNode;
}



// APPLY FACTS


function _VirtualDom_applyFacts(domNode, eventNode, facts)
{
	for (var key in facts)
	{
		var value = facts[key];

		key === 'a1'
			? _VirtualDom_applyStyles(domNode, value)
			:
		key === 'a0'
			? _VirtualDom_applyEvents(domNode, eventNode, value)
			:
		key === 'a3'
			? _VirtualDom_applyAttrs(domNode, value)
			:
		key === 'a4'
			? _VirtualDom_applyAttrsNS(domNode, value)
			:
		((key !== 'value' && key !== 'checked') || domNode[key] !== value) && (domNode[key] = value);
	}
}



// APPLY STYLES


function _VirtualDom_applyStyles(domNode, styles)
{
	var domNodeStyle = domNode.style;

	for (var key in styles)
	{
		domNodeStyle[key] = styles[key];
	}
}



// APPLY ATTRS


function _VirtualDom_applyAttrs(domNode, attrs)
{
	for (var key in attrs)
	{
		var value = attrs[key];
		typeof value !== 'undefined'
			? domNode.setAttribute(key, value)
			: domNode.removeAttribute(key);
	}
}



// APPLY NAMESPACED ATTRS


function _VirtualDom_applyAttrsNS(domNode, nsAttrs)
{
	for (var key in nsAttrs)
	{
		var pair = nsAttrs[key];
		var namespace = pair.f;
		var value = pair.o;

		typeof value !== 'undefined'
			? domNode.setAttributeNS(namespace, key, value)
			: domNode.removeAttributeNS(namespace, key);
	}
}



// APPLY EVENTS


function _VirtualDom_applyEvents(domNode, eventNode, events)
{
	var allCallbacks = domNode.elmFs || (domNode.elmFs = {});

	for (var key in events)
	{
		var newHandler = events[key];
		var oldCallback = allCallbacks[key];

		if (!newHandler)
		{
			domNode.removeEventListener(key, oldCallback);
			allCallbacks[key] = undefined;
			continue;
		}

		if (oldCallback)
		{
			var oldHandler = oldCallback.q;
			if (oldHandler.$ === newHandler.$)
			{
				oldCallback.q = newHandler;
				continue;
			}
			domNode.removeEventListener(key, oldCallback);
		}

		oldCallback = _VirtualDom_makeCallback(eventNode, newHandler);
		domNode.addEventListener(key, oldCallback,
			_VirtualDom_passiveSupported
			&& { passive: $elm$virtual_dom$VirtualDom$toHandlerInt(newHandler) < 2 }
		);
		allCallbacks[key] = oldCallback;
	}
}



// PASSIVE EVENTS


var _VirtualDom_passiveSupported;

try
{
	window.addEventListener('t', null, Object.defineProperty({}, 'passive', {
		get: function() { _VirtualDom_passiveSupported = true; }
	}));
}
catch(e) {}



// EVENT HANDLERS


function _VirtualDom_makeCallback(eventNode, initialHandler)
{
	function callback(event)
	{
		var handler = callback.q;
		var result = _Json_runHelp(handler.a, event);

		if (!$elm$core$Result$isOk(result))
		{
			return;
		}

		var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

		// 0 = Normal
		// 1 = MayStopPropagation
		// 2 = MayPreventDefault
		// 3 = Custom

		var value = result.a;
		var message = !tag ? value : tag < 3 ? value.a : value._;
		var stopPropagation = tag == 1 ? value.b : tag == 3 && value.cH;
		var currentEventNode = (
			stopPropagation && event.stopPropagation(),
			(tag == 2 ? value.b : tag == 3 && value.cC) && event.preventDefault(),
			eventNode
		);
		var tagger;
		var i;
		while (tagger = currentEventNode.j)
		{
			if (typeof tagger == 'function')
			{
				message = tagger(message);
			}
			else
			{
				for (var i = tagger.length; i--; )
				{
					message = tagger[i](message);
				}
			}
			currentEventNode = currentEventNode.p;
		}
		currentEventNode(message, stopPropagation); // stopPropagation implies isSync
	}

	callback.q = initialHandler;

	return callback;
}

function _VirtualDom_equalEvents(x, y)
{
	return x.$ == y.$ && _Json_equality(x.a, y.a);
}



// DIFF


// TODO: Should we do patches like in iOS?
//
// type Patch
//   = At Int Patch
//   | Batch (List Patch)
//   | Change ...
//
// How could it not be better?
//
function _VirtualDom_diff(x, y)
{
	var patches = [];
	_VirtualDom_diffHelp(x, y, patches, 0);
	return patches;
}


function _VirtualDom_pushPatch(patches, type, index, data)
{
	var patch = {
		$: type,
		r: index,
		s: data,
		t: undefined,
		u: undefined
	};
	patches.push(patch);
	return patch;
}


function _VirtualDom_diffHelp(x, y, patches, index)
{
	if (x === y)
	{
		return;
	}

	var xType = x.$;
	var yType = y.$;

	// Bail if you run into different types of nodes. Implies that the
	// structure has changed significantly and it's not worth a diff.
	if (xType !== yType)
	{
		if (xType === 1 && yType === 2)
		{
			y = _VirtualDom_dekey(y);
			yType = 1;
		}
		else
		{
			_VirtualDom_pushPatch(patches, 0, index, y);
			return;
		}
	}

	// Now we know that both nodes are the same $.
	switch (yType)
	{
		case 5:
			var xRefs = x.l;
			var yRefs = y.l;
			var i = xRefs.length;
			var same = i === yRefs.length;
			while (same && i--)
			{
				same = xRefs[i] === yRefs[i];
			}
			if (same)
			{
				y.k = x.k;
				return;
			}
			y.k = y.m();
			var subPatches = [];
			_VirtualDom_diffHelp(x.k, y.k, subPatches, 0);
			subPatches.length > 0 && _VirtualDom_pushPatch(patches, 1, index, subPatches);
			return;

		case 4:
			// gather nested taggers
			var xTaggers = x.j;
			var yTaggers = y.j;
			var nesting = false;

			var xSubNode = x.k;
			while (xSubNode.$ === 4)
			{
				nesting = true;

				typeof xTaggers !== 'object'
					? xTaggers = [xTaggers, xSubNode.j]
					: xTaggers.push(xSubNode.j);

				xSubNode = xSubNode.k;
			}

			var ySubNode = y.k;
			while (ySubNode.$ === 4)
			{
				nesting = true;

				typeof yTaggers !== 'object'
					? yTaggers = [yTaggers, ySubNode.j]
					: yTaggers.push(ySubNode.j);

				ySubNode = ySubNode.k;
			}

			// Just bail if different numbers of taggers. This implies the
			// structure of the virtual DOM has changed.
			if (nesting && xTaggers.length !== yTaggers.length)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			// check if taggers are "the same"
			if (nesting ? !_VirtualDom_pairwiseRefEqual(xTaggers, yTaggers) : xTaggers !== yTaggers)
			{
				_VirtualDom_pushPatch(patches, 2, index, yTaggers);
			}

			// diff everything below the taggers
			_VirtualDom_diffHelp(xSubNode, ySubNode, patches, index + 1);
			return;

		case 0:
			if (x.a !== y.a)
			{
				_VirtualDom_pushPatch(patches, 3, index, y.a);
			}
			return;

		case 1:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKids);
			return;

		case 2:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKeyedKids);
			return;

		case 3:
			if (x.h !== y.h)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
			factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

			var patch = y.i(x.g, y.g);
			patch && _VirtualDom_pushPatch(patches, 5, index, patch);

			return;
	}
}

// assumes the incoming arrays are the same length
function _VirtualDom_pairwiseRefEqual(as, bs)
{
	for (var i = 0; i < as.length; i++)
	{
		if (as[i] !== bs[i])
		{
			return false;
		}
	}

	return true;
}

function _VirtualDom_diffNodes(x, y, patches, index, diffKids)
{
	// Bail if obvious indicators have changed. Implies more serious
	// structural changes such that it's not worth it to diff.
	if (x.c !== y.c || x.f !== y.f)
	{
		_VirtualDom_pushPatch(patches, 0, index, y);
		return;
	}

	var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
	factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

	diffKids(x, y, patches, index);
}



// DIFF FACTS


// TODO Instead of creating a new diff object, it's possible to just test if
// there *is* a diff. During the actual patch, do the diff again and make the
// modifications directly. This way, there's no new allocations. Worth it?
function _VirtualDom_diffFacts(x, y, category)
{
	var diff;

	// look for changes and removals
	for (var xKey in x)
	{
		if (xKey === 'a1' || xKey === 'a0' || xKey === 'a3' || xKey === 'a4')
		{
			var subDiff = _VirtualDom_diffFacts(x[xKey], y[xKey] || {}, xKey);
			if (subDiff)
			{
				diff = diff || {};
				diff[xKey] = subDiff;
			}
			continue;
		}

		// remove if not in the new facts
		if (!(xKey in y))
		{
			diff = diff || {};
			diff[xKey] =
				!category
					? (typeof x[xKey] === 'string' ? '' : null)
					:
				(category === 'a1')
					? ''
					:
				(category === 'a0' || category === 'a3')
					? undefined
					:
				{ f: x[xKey].f, o: undefined };

			continue;
		}

		var xValue = x[xKey];
		var yValue = y[xKey];

		// reference equal, so don't worry about it
		if (xValue === yValue && xKey !== 'value' && xKey !== 'checked'
			|| category === 'a0' && _VirtualDom_equalEvents(xValue, yValue))
		{
			continue;
		}

		diff = diff || {};
		diff[xKey] = yValue;
	}

	// add new stuff
	for (var yKey in y)
	{
		if (!(yKey in x))
		{
			diff = diff || {};
			diff[yKey] = y[yKey];
		}
	}

	return diff;
}



// DIFF KIDS


function _VirtualDom_diffKids(xParent, yParent, patches, index)
{
	var xKids = xParent.e;
	var yKids = yParent.e;

	var xLen = xKids.length;
	var yLen = yKids.length;

	// FIGURE OUT IF THERE ARE INSERTS OR REMOVALS

	if (xLen > yLen)
	{
		_VirtualDom_pushPatch(patches, 6, index, {
			v: yLen,
			i: xLen - yLen
		});
	}
	else if (xLen < yLen)
	{
		_VirtualDom_pushPatch(patches, 7, index, {
			v: xLen,
			e: yKids
		});
	}

	// PAIRWISE DIFF EVERYTHING ELSE

	for (var minLen = xLen < yLen ? xLen : yLen, i = 0; i < minLen; i++)
	{
		var xKid = xKids[i];
		_VirtualDom_diffHelp(xKid, yKids[i], patches, ++index);
		index += xKid.b || 0;
	}
}



// KEYED DIFF


function _VirtualDom_diffKeyedKids(xParent, yParent, patches, rootIndex)
{
	var localPatches = [];

	var changes = {}; // Dict String Entry
	var inserts = []; // Array { index : Int, entry : Entry }
	// type Entry = { tag : String, vnode : VNode, index : Int, data : _ }

	var xKids = xParent.e;
	var yKids = yParent.e;
	var xLen = xKids.length;
	var yLen = yKids.length;
	var xIndex = 0;
	var yIndex = 0;

	var index = rootIndex;

	while (xIndex < xLen && yIndex < yLen)
	{
		var x = xKids[xIndex];
		var y = yKids[yIndex];

		var xKey = x.a;
		var yKey = y.a;
		var xNode = x.b;
		var yNode = y.b;

		var newMatch = undefined;
		var oldMatch = undefined;

		// check if keys match

		if (xKey === yKey)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNode, localPatches, index);
			index += xNode.b || 0;

			xIndex++;
			yIndex++;
			continue;
		}

		// look ahead 1 to detect insertions and removals.

		var xNext = xKids[xIndex + 1];
		var yNext = yKids[yIndex + 1];

		if (xNext)
		{
			var xNextKey = xNext.a;
			var xNextNode = xNext.b;
			oldMatch = yKey === xNextKey;
		}

		if (yNext)
		{
			var yNextKey = yNext.a;
			var yNextNode = yNext.b;
			newMatch = xKey === yNextKey;
		}


		// swap x and y
		if (newMatch && oldMatch)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			_VirtualDom_insertNode(changes, localPatches, xKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNextNode, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		// insert y
		if (newMatch)
		{
			index++;
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			index += xNode.b || 0;

			xIndex += 1;
			yIndex += 2;
			continue;
		}

		// remove x
		if (oldMatch)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 1;
			continue;
		}

		// remove x, insert y
		if (xNext && xNextKey === yNextKey)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNextNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		break;
	}

	// eat up any remaining nodes with removeNode and insertNode

	while (xIndex < xLen)
	{
		index++;
		var x = xKids[xIndex];
		var xNode = x.b;
		_VirtualDom_removeNode(changes, localPatches, x.a, xNode, index);
		index += xNode.b || 0;
		xIndex++;
	}

	while (yIndex < yLen)
	{
		var endInserts = endInserts || [];
		var y = yKids[yIndex];
		_VirtualDom_insertNode(changes, localPatches, y.a, y.b, undefined, endInserts);
		yIndex++;
	}

	if (localPatches.length > 0 || inserts.length > 0 || endInserts)
	{
		_VirtualDom_pushPatch(patches, 8, rootIndex, {
			w: localPatches,
			x: inserts,
			y: endInserts
		});
	}
}



// CHANGES FROM KEYED DIFF


var _VirtualDom_POSTFIX = '_elmW6BL';


function _VirtualDom_insertNode(changes, localPatches, key, vnode, yIndex, inserts)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		entry = {
			c: 0,
			z: vnode,
			r: yIndex,
			s: undefined
		};

		inserts.push({ r: yIndex, A: entry });
		changes[key] = entry;

		return;
	}

	// this key was removed earlier, a match!
	if (entry.c === 1)
	{
		inserts.push({ r: yIndex, A: entry });

		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(entry.z, vnode, subPatches, entry.r);
		entry.r = yIndex;
		entry.s.s = {
			w: subPatches,
			A: entry
		};

		return;
	}

	// this key has already been inserted or moved, a duplicate!
	_VirtualDom_insertNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, yIndex, inserts);
}


function _VirtualDom_removeNode(changes, localPatches, key, vnode, index)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		var patch = _VirtualDom_pushPatch(localPatches, 9, index, undefined);

		changes[key] = {
			c: 1,
			z: vnode,
			r: index,
			s: patch
		};

		return;
	}

	// this key was inserted earlier, a match!
	if (entry.c === 0)
	{
		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(vnode, entry.z, subPatches, index);

		_VirtualDom_pushPatch(localPatches, 9, index, {
			w: subPatches,
			A: entry
		});

		return;
	}

	// this key has already been removed or moved, a duplicate!
	_VirtualDom_removeNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, index);
}



// ADD DOM NODES
//
// Each DOM node has an "index" assigned in order of traversal. It is important
// to minimize our crawl over the actual DOM, so these indexes (along with the
// descendantsCount of virtual nodes) let us skip touching entire subtrees of
// the DOM if we know there are no patches there.


function _VirtualDom_addDomNodes(domNode, vNode, patches, eventNode)
{
	_VirtualDom_addDomNodesHelp(domNode, vNode, patches, 0, 0, vNode.b, eventNode);
}


// assumes `patches` is non-empty and indexes increase monotonically.
function _VirtualDom_addDomNodesHelp(domNode, vNode, patches, i, low, high, eventNode)
{
	var patch = patches[i];
	var index = patch.r;

	while (index === low)
	{
		var patchType = patch.$;

		if (patchType === 1)
		{
			_VirtualDom_addDomNodes(domNode, vNode.k, patch.s, eventNode);
		}
		else if (patchType === 8)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var subPatches = patch.s.w;
			if (subPatches.length > 0)
			{
				_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
			}
		}
		else if (patchType === 9)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var data = patch.s;
			if (data)
			{
				data.A.s = domNode;
				var subPatches = data.w;
				if (subPatches.length > 0)
				{
					_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
				}
			}
		}
		else
		{
			patch.t = domNode;
			patch.u = eventNode;
		}

		i++;

		if (!(patch = patches[i]) || (index = patch.r) > high)
		{
			return i;
		}
	}

	var tag = vNode.$;

	if (tag === 4)
	{
		var subNode = vNode.k;

		while (subNode.$ === 4)
		{
			subNode = subNode.k;
		}

		return _VirtualDom_addDomNodesHelp(domNode, subNode, patches, i, low + 1, high, domNode.elm_event_node_ref);
	}

	// tag must be 1 or 2 at this point

	var vKids = vNode.e;
	var childNodes = domNode.childNodes;
	for (var j = 0; j < vKids.length; j++)
	{
		low++;
		var vKid = tag === 1 ? vKids[j] : vKids[j].b;
		var nextLow = low + (vKid.b || 0);
		if (low <= index && index <= nextLow)
		{
			i = _VirtualDom_addDomNodesHelp(childNodes[j], vKid, patches, i, low, nextLow, eventNode);
			if (!(patch = patches[i]) || (index = patch.r) > high)
			{
				return i;
			}
		}
		low = nextLow;
	}
	return i;
}



// APPLY PATCHES


function _VirtualDom_applyPatches(rootDomNode, oldVirtualNode, patches, eventNode)
{
	if (patches.length === 0)
	{
		return rootDomNode;
	}

	_VirtualDom_addDomNodes(rootDomNode, oldVirtualNode, patches, eventNode);
	return _VirtualDom_applyPatchesHelp(rootDomNode, patches);
}

function _VirtualDom_applyPatchesHelp(rootDomNode, patches)
{
	for (var i = 0; i < patches.length; i++)
	{
		var patch = patches[i];
		var localDomNode = patch.t
		var newNode = _VirtualDom_applyPatch(localDomNode, patch);
		if (localDomNode === rootDomNode)
		{
			rootDomNode = newNode;
		}
	}
	return rootDomNode;
}

function _VirtualDom_applyPatch(domNode, patch)
{
	switch (patch.$)
	{
		case 0:
			return _VirtualDom_applyPatchRedraw(domNode, patch.s, patch.u);

		case 4:
			_VirtualDom_applyFacts(domNode, patch.u, patch.s);
			return domNode;

		case 3:
			domNode.replaceData(0, domNode.length, patch.s);
			return domNode;

		case 1:
			return _VirtualDom_applyPatchesHelp(domNode, patch.s);

		case 2:
			if (domNode.elm_event_node_ref)
			{
				domNode.elm_event_node_ref.j = patch.s;
			}
			else
			{
				domNode.elm_event_node_ref = { j: patch.s, p: patch.u };
			}
			return domNode;

		case 6:
			var data = patch.s;
			for (var i = 0; i < data.i; i++)
			{
				domNode.removeChild(domNode.childNodes[data.v]);
			}
			return domNode;

		case 7:
			var data = patch.s;
			var kids = data.e;
			var i = data.v;
			var theEnd = domNode.childNodes[i];
			for (; i < kids.length; i++)
			{
				domNode.insertBefore(_VirtualDom_render(kids[i], patch.u), theEnd);
			}
			return domNode;

		case 9:
			var data = patch.s;
			if (!data)
			{
				domNode.parentNode.removeChild(domNode);
				return domNode;
			}
			var entry = data.A;
			if (typeof entry.r !== 'undefined')
			{
				domNode.parentNode.removeChild(domNode);
			}
			entry.s = _VirtualDom_applyPatchesHelp(domNode, data.w);
			return domNode;

		case 8:
			return _VirtualDom_applyPatchReorder(domNode, patch);

		case 5:
			return patch.s(domNode);

		default:
			_Debug_crash(10); // 'Ran into an unknown patch!'
	}
}


function _VirtualDom_applyPatchRedraw(domNode, vNode, eventNode)
{
	var parentNode = domNode.parentNode;
	var newNode = _VirtualDom_render(vNode, eventNode);

	if (!newNode.elm_event_node_ref)
	{
		newNode.elm_event_node_ref = domNode.elm_event_node_ref;
	}

	if (parentNode && newNode !== domNode)
	{
		parentNode.replaceChild(newNode, domNode);
	}
	return newNode;
}


function _VirtualDom_applyPatchReorder(domNode, patch)
{
	var data = patch.s;

	// remove end inserts
	var frag = _VirtualDom_applyPatchReorderEndInsertsHelp(data.y, patch);

	// removals
	domNode = _VirtualDom_applyPatchesHelp(domNode, data.w);

	// inserts
	var inserts = data.x;
	for (var i = 0; i < inserts.length; i++)
	{
		var insert = inserts[i];
		var entry = insert.A;
		var node = entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u);
		domNode.insertBefore(node, domNode.childNodes[insert.r]);
	}

	// add end inserts
	if (frag)
	{
		_VirtualDom_appendChild(domNode, frag);
	}

	return domNode;
}


function _VirtualDom_applyPatchReorderEndInsertsHelp(endInserts, patch)
{
	if (!endInserts)
	{
		return;
	}

	var frag = _VirtualDom_doc.createDocumentFragment();
	for (var i = 0; i < endInserts.length; i++)
	{
		var insert = endInserts[i];
		var entry = insert.A;
		_VirtualDom_appendChild(frag, entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u)
		);
	}
	return frag;
}


function _VirtualDom_virtualize(node)
{
	// TEXT NODES

	if (node.nodeType === 3)
	{
		return _VirtualDom_text(node.textContent);
	}


	// WEIRD NODES

	if (node.nodeType !== 1)
	{
		return _VirtualDom_text('');
	}


	// ELEMENT NODES

	var attrList = _List_Nil;
	var attrs = node.attributes;
	for (var i = attrs.length; i--; )
	{
		var attr = attrs[i];
		var name = attr.name;
		var value = attr.value;
		attrList = _List_Cons( A2(_VirtualDom_attribute, name, value), attrList );
	}

	var tag = node.tagName.toLowerCase();
	var kidList = _List_Nil;
	var kids = node.childNodes;

	for (var i = kids.length; i--; )
	{
		kidList = _List_Cons(_VirtualDom_virtualize(kids[i]), kidList);
	}
	return A3(_VirtualDom_node, tag, attrList, kidList);
}

function _VirtualDom_dekey(keyedNode)
{
	var keyedKids = keyedNode.e;
	var len = keyedKids.length;
	var kids = new Array(len);
	for (var i = 0; i < len; i++)
	{
		kids[i] = keyedKids[i].b;
	}

	return {
		$: 1,
		c: keyedNode.c,
		d: keyedNode.d,
		e: kids,
		f: keyedNode.f,
		b: keyedNode.b
	};
}




// ELEMENT


var _Debugger_element;

var _Browser_element = _Debugger_element || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.fe,
		impl.fR,
		impl.fI,
		function(sendToApp, initialModel) {
			var view = impl.fU;
			/**/
			var domNode = args['node'];
			//*/
			/**_UNUSED/
			var domNode = args && args['node'] ? args['node'] : _Debug_crash(0);
			//*/
			var currNode = _VirtualDom_virtualize(domNode);

			return _Browser_makeAnimator(initialModel, function(model)
			{
				var nextNode = view(model);
				var patches = _VirtualDom_diff(currNode, nextNode);
				domNode = _VirtualDom_applyPatches(domNode, currNode, patches, sendToApp);
				currNode = nextNode;
			});
		}
	);
});



// DOCUMENT


var _Debugger_document;

var _Browser_document = _Debugger_document || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.fe,
		impl.fR,
		impl.fI,
		function(sendToApp, initialModel) {
			var divertHrefToApp = impl.cF && impl.cF(sendToApp)
			var view = impl.fU;
			var title = _VirtualDom_doc.title;
			var bodyNode = _VirtualDom_doc.body;
			var currNode = _VirtualDom_virtualize(bodyNode);
			return _Browser_makeAnimator(initialModel, function(model)
			{
				_VirtualDom_divertHrefToApp = divertHrefToApp;
				var doc = view(model);
				var nextNode = _VirtualDom_node('body')(_List_Nil)(doc.eC);
				var patches = _VirtualDom_diff(currNode, nextNode);
				bodyNode = _VirtualDom_applyPatches(bodyNode, currNode, patches, sendToApp);
				currNode = nextNode;
				_VirtualDom_divertHrefToApp = 0;
				(title !== doc.fO) && (_VirtualDom_doc.title = title = doc.fO);
			});
		}
	);
});



// ANIMATION


var _Browser_cancelAnimationFrame =
	typeof cancelAnimationFrame !== 'undefined'
		? cancelAnimationFrame
		: function(id) { clearTimeout(id); };

var _Browser_requestAnimationFrame =
	typeof requestAnimationFrame !== 'undefined'
		? requestAnimationFrame
		: function(callback) { return setTimeout(callback, 1000 / 60); };


function _Browser_makeAnimator(model, draw)
{
	draw(model);

	var state = 0;

	function updateIfNeeded()
	{
		state = state === 1
			? 0
			: ( _Browser_requestAnimationFrame(updateIfNeeded), draw(model), 1 );
	}

	return function(nextModel, isSync)
	{
		model = nextModel;

		isSync
			? ( draw(model),
				state === 2 && (state = 1)
				)
			: ( state === 0 && _Browser_requestAnimationFrame(updateIfNeeded),
				state = 2
				);
	};
}



// APPLICATION


function _Browser_application(impl)
{
	var onUrlChange = impl.fq;
	var onUrlRequest = impl.fr;
	var key = function() { key.a(onUrlChange(_Browser_getUrl())); };

	return _Browser_document({
		cF: function(sendToApp)
		{
			key.a = sendToApp;
			_Browser_window.addEventListener('popstate', key);
			_Browser_window.navigator.userAgent.indexOf('Trident') < 0 || _Browser_window.addEventListener('hashchange', key);

			return F2(function(domNode, event)
			{
				if (!event.ctrlKey && !event.metaKey && !event.shiftKey && event.button < 1 && !domNode.target && !domNode.hasAttribute('download'))
				{
					event.preventDefault();
					var href = domNode.href;
					var curr = _Browser_getUrl();
					var next = $elm$url$Url$fromString(href).a;
					sendToApp(onUrlRequest(
						(next
							&& curr.d_ === next.d_
							&& curr.dt === next.dt
							&& curr.dV.a === next.dV.a
						)
							? $elm$browser$Browser$Internal(next)
							: $elm$browser$Browser$External(href)
					));
				}
			});
		},
		fe: function(flags)
		{
			return A3(impl.fe, flags, _Browser_getUrl(), key);
		},
		fU: impl.fU,
		fR: impl.fR,
		fI: impl.fI
	});
}

function _Browser_getUrl()
{
	return $elm$url$Url$fromString(_VirtualDom_doc.location.href).a || _Debug_crash(1);
}

var _Browser_go = F2(function(key, n)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		n && history.go(n);
		key();
	}));
});

var _Browser_pushUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.pushState({}, '', url);
		key();
	}));
});

var _Browser_replaceUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.replaceState({}, '', url);
		key();
	}));
});



// GLOBAL EVENTS


var _Browser_fakeNode = { addEventListener: function() {}, removeEventListener: function() {} };
var _Browser_doc = typeof document !== 'undefined' ? document : _Browser_fakeNode;
var _Browser_window = typeof window !== 'undefined' ? window : _Browser_fakeNode;

var _Browser_on = F3(function(node, eventName, sendToSelf)
{
	return _Scheduler_spawn(_Scheduler_binding(function(callback)
	{
		function handler(event)	{ _Scheduler_rawSpawn(sendToSelf(event)); }
		node.addEventListener(eventName, handler, _VirtualDom_passiveSupported && { passive: true });
		return function() { node.removeEventListener(eventName, handler); };
	}));
});

var _Browser_decodeEvent = F2(function(decoder, event)
{
	var result = _Json_runHelp(decoder, event);
	return $elm$core$Result$isOk(result) ? $elm$core$Maybe$Just(result.a) : $elm$core$Maybe$Nothing;
});



// PAGE VISIBILITY


function _Browser_visibilityInfo()
{
	return (typeof _VirtualDom_doc.hidden !== 'undefined')
		? { e9: 'hidden', eF: 'visibilitychange' }
		:
	(typeof _VirtualDom_doc.mozHidden !== 'undefined')
		? { e9: 'mozHidden', eF: 'mozvisibilitychange' }
		:
	(typeof _VirtualDom_doc.msHidden !== 'undefined')
		? { e9: 'msHidden', eF: 'msvisibilitychange' }
		:
	(typeof _VirtualDom_doc.webkitHidden !== 'undefined')
		? { e9: 'webkitHidden', eF: 'webkitvisibilitychange' }
		: { e9: 'hidden', eF: 'visibilitychange' };
}



// ANIMATION FRAMES


function _Browser_rAF()
{
	return _Scheduler_binding(function(callback)
	{
		var id = _Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(Date.now()));
		});

		return function() {
			_Browser_cancelAnimationFrame(id);
		};
	});
}


function _Browser_now()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(Date.now()));
	});
}



// DOM STUFF


function _Browser_withNode(id, doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			var node = document.getElementById(id);
			callback(node
				? _Scheduler_succeed(doStuff(node))
				: _Scheduler_fail($elm$browser$Browser$Dom$NotFound(id))
			);
		});
	});
}


function _Browser_withWindow(doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(doStuff()));
		});
	});
}


// FOCUS and BLUR


var _Browser_call = F2(function(functionName, id)
{
	return _Browser_withNode(id, function(node) {
		node[functionName]();
		return _Utils_Tuple0;
	});
});



// WINDOW VIEWPORT


function _Browser_getViewport()
{
	return {
		d8: _Browser_getScene(),
		eo: {
			er: _Browser_window.pageXOffset,
			es: _Browser_window.pageYOffset,
			fX: _Browser_doc.documentElement.clientWidth,
			e7: _Browser_doc.documentElement.clientHeight
		}
	};
}

function _Browser_getScene()
{
	var body = _Browser_doc.body;
	var elem = _Browser_doc.documentElement;
	return {
		fX: Math.max(body.scrollWidth, body.offsetWidth, elem.scrollWidth, elem.offsetWidth, elem.clientWidth),
		e7: Math.max(body.scrollHeight, body.offsetHeight, elem.scrollHeight, elem.offsetHeight, elem.clientHeight)
	};
}

var _Browser_setViewport = F2(function(x, y)
{
	return _Browser_withWindow(function()
	{
		_Browser_window.scroll(x, y);
		return _Utils_Tuple0;
	});
});



// ELEMENT VIEWPORT


function _Browser_getViewportOf(id)
{
	return _Browser_withNode(id, function(node)
	{
		return {
			d8: {
				fX: node.scrollWidth,
				e7: node.scrollHeight
			},
			eo: {
				er: node.scrollLeft,
				es: node.scrollTop,
				fX: node.clientWidth,
				e7: node.clientHeight
			}
		};
	});
}


var _Browser_setViewportOf = F3(function(id, x, y)
{
	return _Browser_withNode(id, function(node)
	{
		node.scrollLeft = x;
		node.scrollTop = y;
		return _Utils_Tuple0;
	});
});



// ELEMENT


function _Browser_getElement(id)
{
	return _Browser_withNode(id, function(node)
	{
		var rect = node.getBoundingClientRect();
		var x = _Browser_window.pageXOffset;
		var y = _Browser_window.pageYOffset;
		return {
			d8: _Browser_getScene(),
			eo: {
				er: x,
				es: y,
				fX: _Browser_doc.documentElement.clientWidth,
				e7: _Browser_doc.documentElement.clientHeight
			},
			eX: {
				er: x + rect.left,
				es: y + rect.top,
				fX: rect.width,
				e7: rect.height
			}
		};
	});
}



// LOAD and RELOAD


function _Browser_reload(skipCache)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		_VirtualDom_doc.location.reload(skipCache);
	}));
}

function _Browser_load(url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		try
		{
			_Browser_window.location = url;
		}
		catch(err)
		{
			// Only Firefox can throw a NS_ERROR_MALFORMED_URI exception here.
			// Other browsers reload the page, so let's be consistent about that.
			_VirtualDom_doc.location.reload(false);
		}
	}));
}



// SEND REQUEST

var _Http_toTask = F3(function(router, toTask, request)
{
	return _Scheduler_binding(function(callback)
	{
		function done(response) {
			callback(toTask(request.e_.a(response)));
		}

		var xhr = new XMLHttpRequest();
		xhr.addEventListener('error', function() { done($elm$http$Http$NetworkError_); });
		xhr.addEventListener('timeout', function() { done($elm$http$Http$Timeout_); });
		xhr.addEventListener('load', function() { done(_Http_toResponse(request.e_.b, xhr)); });
		$elm$core$Maybe$isJust(request.fQ) && _Http_track(router, xhr, request.fQ.a);

		try {
			xhr.open(request.fl, request.fT, true);
		} catch (e) {
			return done($elm$http$Http$BadUrl_(request.fT));
		}

		_Http_configureRequest(xhr, request);

		request.eC.a && xhr.setRequestHeader('Content-Type', request.eC.a);
		xhr.send(request.eC.b);

		return function() { xhr.c = true; xhr.abort(); };
	});
});


// CONFIGURE

function _Http_configureRequest(xhr, request)
{
	for (var headers = request.e6; headers.b; headers = headers.b) // WHILE_CONS
	{
		xhr.setRequestHeader(headers.a.a, headers.a.b);
	}
	xhr.timeout = request.fN.a || 0;
	xhr.responseType = request.e_.d;
	xhr.withCredentials = request.ew;
}


// RESPONSES

function _Http_toResponse(toBody, xhr)
{
	return A2(
		200 <= xhr.status && xhr.status < 300 ? $elm$http$Http$GoodStatus_ : $elm$http$Http$BadStatus_,
		_Http_toMetadata(xhr),
		toBody(xhr.response)
	);
}


// METADATA

function _Http_toMetadata(xhr)
{
	return {
		fT: xhr.responseURL,
		fF: xhr.status,
		fG: xhr.statusText,
		e6: _Http_parseHeaders(xhr.getAllResponseHeaders())
	};
}


// HEADERS

function _Http_parseHeaders(rawHeaders)
{
	if (!rawHeaders)
	{
		return $elm$core$Dict$empty;
	}

	var headers = $elm$core$Dict$empty;
	var headerPairs = rawHeaders.split('\r\n');
	for (var i = headerPairs.length; i--; )
	{
		var headerPair = headerPairs[i];
		var index = headerPair.indexOf(': ');
		if (index > 0)
		{
			var key = headerPair.substring(0, index);
			var value = headerPair.substring(index + 2);

			headers = A3($elm$core$Dict$update, key, function(oldValue) {
				return $elm$core$Maybe$Just($elm$core$Maybe$isJust(oldValue)
					? value + ', ' + oldValue.a
					: value
				);
			}, headers);
		}
	}
	return headers;
}


// EXPECT

var _Http_expect = F3(function(type, toBody, toValue)
{
	return {
		$: 0,
		d: type,
		b: toBody,
		a: toValue
	};
});

var _Http_mapExpect = F2(function(func, expect)
{
	return {
		$: 0,
		d: expect.d,
		b: expect.b,
		a: function(x) { return func(expect.a(x)); }
	};
});

function _Http_toDataView(arrayBuffer)
{
	return new DataView(arrayBuffer);
}


// BODY and PARTS

var _Http_emptyBody = { $: 0 };
var _Http_pair = F2(function(a, b) { return { $: 0, a: a, b: b }; });

function _Http_toFormData(parts)
{
	for (var formData = new FormData(); parts.b; parts = parts.b) // WHILE_CONS
	{
		var part = parts.a;
		formData.append(part.a, part.b);
	}
	return formData;
}

var _Http_bytesToBlob = F2(function(mime, bytes)
{
	return new Blob([bytes], { type: mime });
});


// PROGRESS

function _Http_track(router, xhr, tracker)
{
	// TODO check out lengthComputable on loadstart event

	xhr.upload.addEventListener('progress', function(event) {
		if (xhr.c) { return; }
		_Scheduler_rawSpawn(A2($elm$core$Platform$sendToSelf, router, _Utils_Tuple2(tracker, $elm$http$Http$Sending({
			fC: event.loaded,
			ea: event.total
		}))));
	});
	xhr.addEventListener('progress', function(event) {
		if (xhr.c) { return; }
		_Scheduler_rawSpawn(A2($elm$core$Platform$sendToSelf, router, _Utils_Tuple2(tracker, $elm$http$Http$Receiving({
			fw: event.loaded,
			ea: event.lengthComputable ? $elm$core$Maybe$Just(event.total) : $elm$core$Maybe$Nothing
		}))));
	});
}

function _Url_percentEncode(string)
{
	return encodeURIComponent(string);
}

function _Url_percentDecode(string)
{
	try
	{
		return $elm$core$Maybe$Just(decodeURIComponent(string));
	}
	catch (e)
	{
		return $elm$core$Maybe$Nothing;
	}
}


var _Bitwise_and = F2(function(a, b)
{
	return a & b;
});

var _Bitwise_or = F2(function(a, b)
{
	return a | b;
});

var _Bitwise_xor = F2(function(a, b)
{
	return a ^ b;
});

function _Bitwise_complement(a)
{
	return ~a;
};

var _Bitwise_shiftLeftBy = F2(function(offset, a)
{
	return a << offset;
});

var _Bitwise_shiftRightBy = F2(function(offset, a)
{
	return a >> offset;
});

var _Bitwise_shiftRightZfBy = F2(function(offset, a)
{
	return a >>> offset;
});




// STRINGS


var _Parser_isSubString = F5(function(smallString, offset, row, col, bigString)
{
	var smallLength = smallString.length;
	var isGood = offset + smallLength <= bigString.length;

	for (var i = 0; isGood && i < smallLength; )
	{
		var code = bigString.charCodeAt(offset);
		isGood =
			smallString[i++] === bigString[offset++]
			&& (
				code === 0x000A /* \n */
					? ( row++, col=1 )
					: ( col++, (code & 0xF800) === 0xD800 ? smallString[i++] === bigString[offset++] : 1 )
			)
	}

	return _Utils_Tuple3(isGood ? offset : -1, row, col);
});



// CHARS


var _Parser_isSubChar = F3(function(predicate, offset, string)
{
	return (
		string.length <= offset
			? -1
			:
		(string.charCodeAt(offset) & 0xF800) === 0xD800
			? (predicate(_Utils_chr(string.substr(offset, 2))) ? offset + 2 : -1)
			:
		(predicate(_Utils_chr(string[offset]))
			? ((string[offset] === '\n') ? -2 : (offset + 1))
			: -1
		)
	);
});


var _Parser_isAsciiCode = F3(function(code, offset, string)
{
	return string.charCodeAt(offset) === code;
});



// NUMBERS


var _Parser_chompBase10 = F2(function(offset, string)
{
	for (; offset < string.length; offset++)
	{
		var code = string.charCodeAt(offset);
		if (code < 0x30 || 0x39 < code)
		{
			return offset;
		}
	}
	return offset;
});


var _Parser_consumeBase = F3(function(base, offset, string)
{
	for (var total = 0; offset < string.length; offset++)
	{
		var digit = string.charCodeAt(offset) - 0x30;
		if (digit < 0 || base <= digit) break;
		total = base * total + digit;
	}
	return _Utils_Tuple2(offset, total);
});


var _Parser_consumeBase16 = F2(function(offset, string)
{
	for (var total = 0; offset < string.length; offset++)
	{
		var code = string.charCodeAt(offset);
		if (0x30 <= code && code <= 0x39)
		{
			total = 16 * total + code - 0x30;
		}
		else if (0x41 <= code && code <= 0x46)
		{
			total = 16 * total + code - 55;
		}
		else if (0x61 <= code && code <= 0x66)
		{
			total = 16 * total + code - 87;
		}
		else
		{
			break;
		}
	}
	return _Utils_Tuple2(offset, total);
});



// FIND STRING


var _Parser_findSubString = F5(function(smallString, offset, row, col, bigString)
{
	var newOffset = bigString.indexOf(smallString, offset);
	var target = newOffset < 0 ? bigString.length : newOffset + smallString.length;

	while (offset < target)
	{
		var code = bigString.charCodeAt(offset++);
		code === 0x000A /* \n */
			? ( col=1, row++ )
			: ( col++, (code & 0xF800) === 0xD800 && offset++ )
	}

	return _Utils_Tuple3(newOffset, row, col);
});




// VIRTUAL-DOM WIDGETS


var _Markdown_toHtml = F3(function(options, factList, rawMarkdown)
{
	return _VirtualDom_custom(
		factList,
		{
			a: options,
			b: rawMarkdown
		},
		_Markdown_render,
		_Markdown_diff
	);
});



// WIDGET IMPLEMENTATION


function _Markdown_render(model)
{
	return A2(_Markdown_replace, model, _VirtualDom_doc.createElement('div'));
}


function _Markdown_diff(x, y)
{
	return x.b === y.b && x.a === y.a
		? false
		: _Markdown_replace(y);
}


var _Markdown_replace = F2(function(model, div)
{
	div.innerHTML = _Markdown_marked(model.b, _Markdown_formatOptions(model.a));
	return div;
});



// ACTUAL MARKDOWN PARSER


var _Markdown_marked = function() {
	// catch the `marked` object regardless of the outer environment.
	// (ex. a CommonJS module compatible environment.)
	// note that this depends on marked's implementation of environment detection.
	var module = {};
	var exports = module.exports = {};

	/**
	 * marked - a markdown parser
	 * Copyright (c) 2011-2014, Christopher Jeffrey. (MIT Licensed)
	 * https://github.com/chjj/marked
	 * commit cd2f6f5b7091154c5526e79b5f3bfb4d15995a51
	 */
	(function(){var block={newline:/^\n+/,code:/^( {4}[^\n]+\n*)+/,fences:noop,hr:/^( *[-*_]){3,} *(?:\n+|$)/,heading:/^ *(#{1,6}) *([^\n]+?) *#* *(?:\n+|$)/,nptable:noop,lheading:/^([^\n]+)\n *(=|-){2,} *(?:\n+|$)/,blockquote:/^( *>[^\n]+(\n(?!def)[^\n]+)*\n*)+/,list:/^( *)(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,html:/^ *(?:comment *(?:\n|\s*$)|closed *(?:\n{2,}|\s*$)|closing *(?:\n{2,}|\s*$))/,def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +["(]([^\n]+)[")])? *(?:\n+|$)/,table:noop,paragraph:/^((?:[^\n]+\n?(?!hr|heading|lheading|blockquote|tag|def))+)\n*/,text:/^[^\n]+/};block.bullet=/(?:[*+-]|\d+\.)/;block.item=/^( *)(bull) [^\n]*(?:\n(?!\1bull )[^\n]*)*/;block.item=replace(block.item,"gm")(/bull/g,block.bullet)();block.list=replace(block.list)(/bull/g,block.bullet)("hr","\\n+(?=\\1?(?:[-*_] *){3,}(?:\\n+|$))")("def","\\n+(?="+block.def.source+")")();block.blockquote=replace(block.blockquote)("def",block.def)();block._tag="(?!(?:"+"a|em|strong|small|s|cite|q|dfn|abbr|data|time|code"+"|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo"+"|span|br|wbr|ins|del|img)\\b)\\w+(?!:/|[^\\w\\s@]*@)\\b";block.html=replace(block.html)("comment",/<!--[\s\S]*?-->/)("closed",/<(tag)[\s\S]+?<\/\1>/)("closing",/<tag(?:"[^"]*"|'[^']*'|[^'">])*?>/)(/tag/g,block._tag)();block.paragraph=replace(block.paragraph)("hr",block.hr)("heading",block.heading)("lheading",block.lheading)("blockquote",block.blockquote)("tag","<"+block._tag)("def",block.def)();block.normal=merge({},block);block.gfm=merge({},block.normal,{fences:/^ *(`{3,}|~{3,})[ \.]*(\S+)? *\n([\s\S]*?)\s*\1 *(?:\n+|$)/,paragraph:/^/,heading:/^ *(#{1,6}) +([^\n]+?) *#* *(?:\n+|$)/});block.gfm.paragraph=replace(block.paragraph)("(?!","(?!"+block.gfm.fences.source.replace("\\1","\\2")+"|"+block.list.source.replace("\\1","\\3")+"|")();block.tables=merge({},block.gfm,{nptable:/^ *(\S.*\|.*)\n *([-:]+ *\|[-| :]*)\n((?:.*\|.*(?:\n|$))*)\n*/,table:/^ *\|(.+)\n *\|( *[-:]+[-| :]*)\n((?: *\|.*(?:\n|$))*)\n*/});function Lexer(options){this.tokens=[];this.tokens.links={};this.options=options||marked.defaults;this.rules=block.normal;if(this.options.gfm){if(this.options.tables){this.rules=block.tables}else{this.rules=block.gfm}}}Lexer.rules=block;Lexer.lex=function(src,options){var lexer=new Lexer(options);return lexer.lex(src)};Lexer.prototype.lex=function(src){src=src.replace(/\r\n|\r/g,"\n").replace(/\t/g,"    ").replace(/\u00a0/g," ").replace(/\u2424/g,"\n");return this.token(src,true)};Lexer.prototype.token=function(src,top,bq){var src=src.replace(/^ +$/gm,""),next,loose,cap,bull,b,item,space,i,l;while(src){if(cap=this.rules.newline.exec(src)){src=src.substring(cap[0].length);if(cap[0].length>1){this.tokens.push({type:"space"})}}if(cap=this.rules.code.exec(src)){src=src.substring(cap[0].length);cap=cap[0].replace(/^ {4}/gm,"");this.tokens.push({type:"code",text:!this.options.pedantic?cap.replace(/\n+$/,""):cap});continue}if(cap=this.rules.fences.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:"code",lang:cap[2],text:cap[3]||""});continue}if(cap=this.rules.heading.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:"heading",depth:cap[1].length,text:cap[2]});continue}if(top&&(cap=this.rules.nptable.exec(src))){src=src.substring(cap[0].length);item={type:"table",header:cap[1].replace(/^ *| *\| *$/g,"").split(/ *\| */),align:cap[2].replace(/^ *|\| *$/g,"").split(/ *\| */),cells:cap[3].replace(/\n$/,"").split("\n")};for(i=0;i<item.align.length;i++){if(/^ *-+: *$/.test(item.align[i])){item.align[i]="right"}else if(/^ *:-+: *$/.test(item.align[i])){item.align[i]="center"}else if(/^ *:-+ *$/.test(item.align[i])){item.align[i]="left"}else{item.align[i]=null}}for(i=0;i<item.cells.length;i++){item.cells[i]=item.cells[i].split(/ *\| */)}this.tokens.push(item);continue}if(cap=this.rules.lheading.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:"heading",depth:cap[2]==="="?1:2,text:cap[1]});continue}if(cap=this.rules.hr.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:"hr"});continue}if(cap=this.rules.blockquote.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:"blockquote_start"});cap=cap[0].replace(/^ *> ?/gm,"");this.token(cap,top,true);this.tokens.push({type:"blockquote_end"});continue}if(cap=this.rules.list.exec(src)){src=src.substring(cap[0].length);bull=cap[2];this.tokens.push({type:"list_start",ordered:bull.length>1});cap=cap[0].match(this.rules.item);next=false;l=cap.length;i=0;for(;i<l;i++){item=cap[i];space=item.length;item=item.replace(/^ *([*+-]|\d+\.) +/,"");if(~item.indexOf("\n ")){space-=item.length;item=!this.options.pedantic?item.replace(new RegExp("^ {1,"+space+"}","gm"),""):item.replace(/^ {1,4}/gm,"")}if(this.options.smartLists&&i!==l-1){b=block.bullet.exec(cap[i+1])[0];if(bull!==b&&!(bull.length>1&&b.length>1)){src=cap.slice(i+1).join("\n")+src;i=l-1}}loose=next||/\n\n(?!\s*$)/.test(item);if(i!==l-1){next=item.charAt(item.length-1)==="\n";if(!loose)loose=next}this.tokens.push({type:loose?"loose_item_start":"list_item_start"});this.token(item,false,bq);this.tokens.push({type:"list_item_end"})}this.tokens.push({type:"list_end"});continue}if(cap=this.rules.html.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:this.options.sanitize?"paragraph":"html",pre:!this.options.sanitizer&&(cap[1]==="pre"||cap[1]==="script"||cap[1]==="style"),text:cap[0]});continue}if(!bq&&top&&(cap=this.rules.def.exec(src))){src=src.substring(cap[0].length);this.tokens.links[cap[1].toLowerCase()]={href:cap[2],title:cap[3]};continue}if(top&&(cap=this.rules.table.exec(src))){src=src.substring(cap[0].length);item={type:"table",header:cap[1].replace(/^ *| *\| *$/g,"").split(/ *\| */),align:cap[2].replace(/^ *|\| *$/g,"").split(/ *\| */),cells:cap[3].replace(/(?: *\| *)?\n$/,"").split("\n")};for(i=0;i<item.align.length;i++){if(/^ *-+: *$/.test(item.align[i])){item.align[i]="right"}else if(/^ *:-+: *$/.test(item.align[i])){item.align[i]="center"}else if(/^ *:-+ *$/.test(item.align[i])){item.align[i]="left"}else{item.align[i]=null}}for(i=0;i<item.cells.length;i++){item.cells[i]=item.cells[i].replace(/^ *\| *| *\| *$/g,"").split(/ *\| */)}this.tokens.push(item);continue}if(top&&(cap=this.rules.paragraph.exec(src))){src=src.substring(cap[0].length);this.tokens.push({type:"paragraph",text:cap[1].charAt(cap[1].length-1)==="\n"?cap[1].slice(0,-1):cap[1]});continue}if(cap=this.rules.text.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:"text",text:cap[0]});continue}if(src){throw new Error("Infinite loop on byte: "+src.charCodeAt(0))}}return this.tokens};var inline={escape:/^\\([\\`*{}\[\]()#+\-.!_>])/,autolink:/^<([^ >]+(@|:\/)[^ >]+)>/,url:noop,tag:/^<!--[\s\S]*?-->|^<\/?\w+(?:"[^"]*"|'[^']*'|[^'">])*?>/,link:/^!?\[(inside)\]\(href\)/,reflink:/^!?\[(inside)\]\s*\[([^\]]*)\]/,nolink:/^!?\[((?:\[[^\]]*\]|[^\[\]])*)\]/,strong:/^_\_([\s\S]+?)_\_(?!_)|^\*\*([\s\S]+?)\*\*(?!\*)/,em:/^\b_((?:[^_]|_\_)+?)_\b|^\*((?:\*\*|[\s\S])+?)\*(?!\*)/,code:/^(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/,br:/^ {2,}\n(?!\s*$)/,del:noop,text:/^[\s\S]+?(?=[\\<!\[_*`]| {2,}\n|$)/};inline._inside=/(?:\[[^\]]*\]|[^\[\]]|\](?=[^\[]*\]))*/;inline._href=/\s*<?([\s\S]*?)>?(?:\s+['"]([\s\S]*?)['"])?\s*/;inline.link=replace(inline.link)("inside",inline._inside)("href",inline._href)();inline.reflink=replace(inline.reflink)("inside",inline._inside)();inline.normal=merge({},inline);inline.pedantic=merge({},inline.normal,{strong:/^_\_(?=\S)([\s\S]*?\S)_\_(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,em:/^_(?=\S)([\s\S]*?\S)_(?!_)|^\*(?=\S)([\s\S]*?\S)\*(?!\*)/});inline.gfm=merge({},inline.normal,{escape:replace(inline.escape)("])","~|])")(),url:/^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/,del:/^~~(?=\S)([\s\S]*?\S)~~/,text:replace(inline.text)("]|","~]|")("|","|https?://|")()});inline.breaks=merge({},inline.gfm,{br:replace(inline.br)("{2,}","*")(),text:replace(inline.gfm.text)("{2,}","*")()});function InlineLexer(links,options){this.options=options||marked.defaults;this.links=links;this.rules=inline.normal;this.renderer=this.options.renderer||new Renderer;this.renderer.options=this.options;if(!this.links){throw new Error("Tokens array requires a `links` property.")}if(this.options.gfm){if(this.options.breaks){this.rules=inline.breaks}else{this.rules=inline.gfm}}else if(this.options.pedantic){this.rules=inline.pedantic}}InlineLexer.rules=inline;InlineLexer.output=function(src,links,options){var inline=new InlineLexer(links,options);return inline.output(src)};InlineLexer.prototype.output=function(src){var out="",link,text,href,cap;while(src){if(cap=this.rules.escape.exec(src)){src=src.substring(cap[0].length);out+=cap[1];continue}if(cap=this.rules.autolink.exec(src)){src=src.substring(cap[0].length);if(cap[2]==="@"){text=cap[1].charAt(6)===":"?this.mangle(cap[1].substring(7)):this.mangle(cap[1]);href=this.mangle("mailto:")+text}else{text=escape(cap[1]);href=text}out+=this.renderer.link(href,null,text);continue}if(!this.inLink&&(cap=this.rules.url.exec(src))){src=src.substring(cap[0].length);text=escape(cap[1]);href=text;out+=this.renderer.link(href,null,text);continue}if(cap=this.rules.tag.exec(src)){if(!this.inLink&&/^<a /i.test(cap[0])){this.inLink=true}else if(this.inLink&&/^<\/a>/i.test(cap[0])){this.inLink=false}src=src.substring(cap[0].length);out+=this.options.sanitize?this.options.sanitizer?this.options.sanitizer(cap[0]):escape(cap[0]):cap[0];continue}if(cap=this.rules.link.exec(src)){src=src.substring(cap[0].length);this.inLink=true;out+=this.outputLink(cap,{href:cap[2],title:cap[3]});this.inLink=false;continue}if((cap=this.rules.reflink.exec(src))||(cap=this.rules.nolink.exec(src))){src=src.substring(cap[0].length);link=(cap[2]||cap[1]).replace(/\s+/g," ");link=this.links[link.toLowerCase()];if(!link||!link.href){out+=cap[0].charAt(0);src=cap[0].substring(1)+src;continue}this.inLink=true;out+=this.outputLink(cap,link);this.inLink=false;continue}if(cap=this.rules.strong.exec(src)){src=src.substring(cap[0].length);out+=this.renderer.strong(this.output(cap[2]||cap[1]));continue}if(cap=this.rules.em.exec(src)){src=src.substring(cap[0].length);out+=this.renderer.em(this.output(cap[2]||cap[1]));continue}if(cap=this.rules.code.exec(src)){src=src.substring(cap[0].length);out+=this.renderer.codespan(escape(cap[2],true));continue}if(cap=this.rules.br.exec(src)){src=src.substring(cap[0].length);out+=this.renderer.br();continue}if(cap=this.rules.del.exec(src)){src=src.substring(cap[0].length);out+=this.renderer.del(this.output(cap[1]));continue}if(cap=this.rules.text.exec(src)){src=src.substring(cap[0].length);out+=this.renderer.text(escape(this.smartypants(cap[0])));continue}if(src){throw new Error("Infinite loop on byte: "+src.charCodeAt(0))}}return out};InlineLexer.prototype.outputLink=function(cap,link){var href=escape(link.href),title=link.title?escape(link.title):null;return cap[0].charAt(0)!=="!"?this.renderer.link(href,title,this.output(cap[1])):this.renderer.image(href,title,escape(cap[1]))};InlineLexer.prototype.smartypants=function(text){if(!this.options.smartypants)return text;return text.replace(/---/g,"—").replace(/--/g,"–").replace(/(^|[-\u2014\/(\[{"\s])'/g,"$1‘").replace(/'/g,"’").replace(/(^|[-\u2014\/(\[{\u2018\s])"/g,"$1“").replace(/"/g,"”").replace(/\.{3}/g,"…")};InlineLexer.prototype.mangle=function(text){if(!this.options.mangle)return text;var out="",l=text.length,i=0,ch;for(;i<l;i++){ch=text.charCodeAt(i);if(Math.random()>.5){ch="x"+ch.toString(16)}out+="&#"+ch+";"}return out};function Renderer(options){this.options=options||{}}Renderer.prototype.code=function(code,lang,escaped){if(this.options.highlight){var out=this.options.highlight(code,lang);if(out!=null&&out!==code){escaped=true;code=out}}if(!lang){return"<pre><code>"+(escaped?code:escape(code,true))+"\n</code></pre>"}return'<pre><code class="'+this.options.langPrefix+escape(lang,true)+'">'+(escaped?code:escape(code,true))+"\n</code></pre>\n"};Renderer.prototype.blockquote=function(quote){return"<blockquote>\n"+quote+"</blockquote>\n"};Renderer.prototype.html=function(html){return html};Renderer.prototype.heading=function(text,level,raw){return"<h"+level+' id="'+this.options.headerPrefix+raw.toLowerCase().replace(/[^\w]+/g,"-")+'">'+text+"</h"+level+">\n"};Renderer.prototype.hr=function(){return this.options.xhtml?"<hr/>\n":"<hr>\n"};Renderer.prototype.list=function(body,ordered){var type=ordered?"ol":"ul";return"<"+type+">\n"+body+"</"+type+">\n"};Renderer.prototype.listitem=function(text){return"<li>"+text+"</li>\n"};Renderer.prototype.paragraph=function(text){return"<p>"+text+"</p>\n"};Renderer.prototype.table=function(header,body){return"<table>\n"+"<thead>\n"+header+"</thead>\n"+"<tbody>\n"+body+"</tbody>\n"+"</table>\n"};Renderer.prototype.tablerow=function(content){return"<tr>\n"+content+"</tr>\n"};Renderer.prototype.tablecell=function(content,flags){var type=flags.header?"th":"td";var tag=flags.align?"<"+type+' style="text-align:'+flags.align+'">':"<"+type+">";return tag+content+"</"+type+">\n"};Renderer.prototype.strong=function(text){return"<strong>"+text+"</strong>"};Renderer.prototype.em=function(text){return"<em>"+text+"</em>"};Renderer.prototype.codespan=function(text){return"<code>"+text+"</code>"};Renderer.prototype.br=function(){return this.options.xhtml?"<br/>":"<br>"};Renderer.prototype.del=function(text){return"<del>"+text+"</del>"};Renderer.prototype.link=function(href,title,text){if(this.options.sanitize){try{var prot=decodeURIComponent(unescape(href)).replace(/[^\w:]/g,"").toLowerCase()}catch(e){return""}if(prot.indexOf("javascript:")===0||prot.indexOf("vbscript:")===0||prot.indexOf("data:")===0){return""}}var out='<a href="'+href+'"';if(title){out+=' title="'+title+'"'}out+=">"+text+"</a>";return out};Renderer.prototype.image=function(href,title,text){var out='<img src="'+href+'" alt="'+text+'"';if(title){out+=' title="'+title+'"'}out+=this.options.xhtml?"/>":">";return out};Renderer.prototype.text=function(text){return text};function Parser(options){this.tokens=[];this.token=null;this.options=options||marked.defaults;this.options.renderer=this.options.renderer||new Renderer;this.renderer=this.options.renderer;this.renderer.options=this.options}Parser.parse=function(src,options,renderer){var parser=new Parser(options,renderer);return parser.parse(src)};Parser.prototype.parse=function(src){this.inline=new InlineLexer(src.links,this.options,this.renderer);this.tokens=src.reverse();var out="";while(this.next()){out+=this.tok()}return out};Parser.prototype.next=function(){return this.token=this.tokens.pop()};Parser.prototype.peek=function(){return this.tokens[this.tokens.length-1]||0};Parser.prototype.parseText=function(){var body=this.token.text;while(this.peek().type==="text"){body+="\n"+this.next().text}return this.inline.output(body)};Parser.prototype.tok=function(){switch(this.token.type){case"space":{return""}case"hr":{return this.renderer.hr()}case"heading":{return this.renderer.heading(this.inline.output(this.token.text),this.token.depth,this.token.text)}case"code":{return this.renderer.code(this.token.text,this.token.lang,this.token.escaped)}case"table":{var header="",body="",i,row,cell,flags,j;cell="";for(i=0;i<this.token.header.length;i++){flags={header:true,align:this.token.align[i]};cell+=this.renderer.tablecell(this.inline.output(this.token.header[i]),{header:true,align:this.token.align[i]})}header+=this.renderer.tablerow(cell);for(i=0;i<this.token.cells.length;i++){row=this.token.cells[i];cell="";for(j=0;j<row.length;j++){cell+=this.renderer.tablecell(this.inline.output(row[j]),{header:false,align:this.token.align[j]})}body+=this.renderer.tablerow(cell)}return this.renderer.table(header,body)}case"blockquote_start":{var body="";while(this.next().type!=="blockquote_end"){body+=this.tok()}return this.renderer.blockquote(body)}case"list_start":{var body="",ordered=this.token.ordered;while(this.next().type!=="list_end"){body+=this.tok()}return this.renderer.list(body,ordered)}case"list_item_start":{var body="";while(this.next().type!=="list_item_end"){body+=this.token.type==="text"?this.parseText():this.tok()}return this.renderer.listitem(body)}case"loose_item_start":{var body="";while(this.next().type!=="list_item_end"){body+=this.tok()}return this.renderer.listitem(body)}case"html":{var html=!this.token.pre&&!this.options.pedantic?this.inline.output(this.token.text):this.token.text;return this.renderer.html(html)}case"paragraph":{return this.renderer.paragraph(this.inline.output(this.token.text))}case"text":{return this.renderer.paragraph(this.parseText())}}};function escape(html,encode){return html.replace(!encode?/&(?!#?\w+;)/g:/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function unescape(html){return html.replace(/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/g,function(_,n){n=n.toLowerCase();if(n==="colon")return":";if(n.charAt(0)==="#"){return n.charAt(1)==="x"?String.fromCharCode(parseInt(n.substring(2),16)):String.fromCharCode(+n.substring(1))}return""})}function replace(regex,opt){regex=regex.source;opt=opt||"";return function self(name,val){if(!name)return new RegExp(regex,opt);val=val.source||val;val=val.replace(/(^|[^\[])\^/g,"$1");regex=regex.replace(name,val);return self}}function noop(){}noop.exec=noop;function merge(obj){var i=1,target,key;for(;i<arguments.length;i++){target=arguments[i];for(key in target){if(Object.prototype.hasOwnProperty.call(target,key)){obj[key]=target[key]}}}return obj}function marked(src,opt,callback){if(callback||typeof opt==="function"){if(!callback){callback=opt;opt=null}opt=merge({},marked.defaults,opt||{});var highlight=opt.highlight,tokens,pending,i=0;try{tokens=Lexer.lex(src,opt)}catch(e){return callback(e)}pending=tokens.length;var done=function(err){if(err){opt.highlight=highlight;return callback(err)}var out;try{out=Parser.parse(tokens,opt)}catch(e){err=e}opt.highlight=highlight;return err?callback(err):callback(null,out)};if(!highlight||highlight.length<3){return done()}delete opt.highlight;if(!pending)return done();for(;i<tokens.length;i++){(function(token){if(token.type!=="code"){return--pending||done()}return highlight(token.text,token.lang,function(err,code){if(err)return done(err);if(code==null||code===token.text){return--pending||done()}token.text=code;token.escaped=true;--pending||done()})})(tokens[i])}return}try{if(opt)opt=merge({},marked.defaults,opt);return Parser.parse(Lexer.lex(src,opt),opt)}catch(e){e.message+="\nPlease report this to https://github.com/chjj/marked.";if((opt||marked.defaults).silent){return"<p>An error occured:</p><pre>"+escape(e.message+"",true)+"</pre>"}throw e}}marked.options=marked.setOptions=function(opt){merge(marked.defaults,opt);return marked};marked.defaults={gfm:true,tables:true,breaks:false,pedantic:false,sanitize:false,sanitizer:null,mangle:true,smartLists:false,silent:false,highlight:null,langPrefix:"lang-",smartypants:false,headerPrefix:"",renderer:new Renderer,xhtml:false};marked.Parser=Parser;marked.parser=Parser.parse;marked.Renderer=Renderer;marked.Lexer=Lexer;marked.lexer=Lexer.lex;marked.InlineLexer=InlineLexer;marked.inlineLexer=InlineLexer.output;marked.parse=marked;if(typeof module!=="undefined"&&typeof exports==="object"){module.exports=marked}else if(typeof define==="function"&&define.amd){define(function(){return marked})}else{this.marked=marked}}).call(function(){return this||(typeof window!=="undefined"?window:global)}());

	return module.exports;
}();


// FORMAT OPTIONS FOR MARKED IMPLEMENTATION

function _Markdown_formatOptions(options)
{
	function toHighlight(code, lang)
	{
		if (!lang && $elm$core$Maybe$isJust(options.dc))
		{
			lang = options.dc.a;
		}

		if (typeof hljs !== 'undefined' && lang && hljs.listLanguages().indexOf(lang) >= 0)
		{
			return hljs.highlight(lang, code, true).value;
		}

		return code;
	}

	var gfm = options.e3.a;

	return {
		highlight: toHighlight,
		gfm: gfm,
		tables: gfm && gfm.fK,
		breaks: gfm && gfm.eD,
		sanitize: options.fz,
		smartypants: options.fE
	};
}


// BYTES

function _Bytes_width(bytes)
{
	return bytes.byteLength;
}

var _Bytes_getHostEndianness = F2(function(le, be)
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(new Uint8Array(new Uint32Array([1]))[0] === 1 ? le : be));
	});
});


// ENCODERS

function _Bytes_encode(encoder)
{
	var mutableBytes = new DataView(new ArrayBuffer($elm$bytes$Bytes$Encode$getWidth(encoder)));
	$elm$bytes$Bytes$Encode$write(encoder)(mutableBytes)(0);
	return mutableBytes;
}


// SIGNED INTEGERS

var _Bytes_write_i8  = F3(function(mb, i, n) { mb.setInt8(i, n); return i + 1; });
var _Bytes_write_i16 = F4(function(mb, i, n, isLE) { mb.setInt16(i, n, isLE); return i + 2; });
var _Bytes_write_i32 = F4(function(mb, i, n, isLE) { mb.setInt32(i, n, isLE); return i + 4; });


// UNSIGNED INTEGERS

var _Bytes_write_u8  = F3(function(mb, i, n) { mb.setUint8(i, n); return i + 1 ;});
var _Bytes_write_u16 = F4(function(mb, i, n, isLE) { mb.setUint16(i, n, isLE); return i + 2; });
var _Bytes_write_u32 = F4(function(mb, i, n, isLE) { mb.setUint32(i, n, isLE); return i + 4; });


// FLOATS

var _Bytes_write_f32 = F4(function(mb, i, n, isLE) { mb.setFloat32(i, n, isLE); return i + 4; });
var _Bytes_write_f64 = F4(function(mb, i, n, isLE) { mb.setFloat64(i, n, isLE); return i + 8; });


// BYTES

var _Bytes_write_bytes = F3(function(mb, offset, bytes)
{
	for (var i = 0, len = bytes.byteLength, limit = len - 4; i <= limit; i += 4)
	{
		mb.setUint32(offset + i, bytes.getUint32(i));
	}
	for (; i < len; i++)
	{
		mb.setUint8(offset + i, bytes.getUint8(i));
	}
	return offset + len;
});


// STRINGS

function _Bytes_getStringWidth(string)
{
	for (var width = 0, i = 0; i < string.length; i++)
	{
		var code = string.charCodeAt(i);
		width +=
			(code < 0x80) ? 1 :
			(code < 0x800) ? 2 :
			(code < 0xD800 || 0xDBFF < code) ? 3 : (i++, 4);
	}
	return width;
}

var _Bytes_write_string = F3(function(mb, offset, string)
{
	for (var i = 0; i < string.length; i++)
	{
		var code = string.charCodeAt(i);
		offset +=
			(code < 0x80)
				? (mb.setUint8(offset, code)
				, 1
				)
				:
			(code < 0x800)
				? (mb.setUint16(offset, 0xC080 /* 0b1100000010000000 */
					| (code >>> 6 & 0x1F /* 0b00011111 */) << 8
					| code & 0x3F /* 0b00111111 */)
				, 2
				)
				:
			(code < 0xD800 || 0xDBFF < code)
				? (mb.setUint16(offset, 0xE080 /* 0b1110000010000000 */
					| (code >>> 12 & 0xF /* 0b00001111 */) << 8
					| code >>> 6 & 0x3F /* 0b00111111 */)
				, mb.setUint8(offset + 2, 0x80 /* 0b10000000 */
					| code & 0x3F /* 0b00111111 */)
				, 3
				)
				:
			(code = (code - 0xD800) * 0x400 + string.charCodeAt(++i) - 0xDC00 + 0x10000
			, mb.setUint32(offset, 0xF0808080 /* 0b11110000100000001000000010000000 */
				| (code >>> 18 & 0x7 /* 0b00000111 */) << 24
				| (code >>> 12 & 0x3F /* 0b00111111 */) << 16
				| (code >>> 6 & 0x3F /* 0b00111111 */) << 8
				| code & 0x3F /* 0b00111111 */)
			, 4
			);
	}
	return offset;
});


// DECODER

var _Bytes_decode = F2(function(decoder, bytes)
{
	try {
		return $elm$core$Maybe$Just(A2(decoder, bytes, 0).b);
	} catch(e) {
		return $elm$core$Maybe$Nothing;
	}
});

var _Bytes_read_i8  = F2(function(      bytes, offset) { return _Utils_Tuple2(offset + 1, bytes.getInt8(offset)); });
var _Bytes_read_i16 = F3(function(isLE, bytes, offset) { return _Utils_Tuple2(offset + 2, bytes.getInt16(offset, isLE)); });
var _Bytes_read_i32 = F3(function(isLE, bytes, offset) { return _Utils_Tuple2(offset + 4, bytes.getInt32(offset, isLE)); });
var _Bytes_read_u8  = F2(function(      bytes, offset) { return _Utils_Tuple2(offset + 1, bytes.getUint8(offset)); });
var _Bytes_read_u16 = F3(function(isLE, bytes, offset) { return _Utils_Tuple2(offset + 2, bytes.getUint16(offset, isLE)); });
var _Bytes_read_u32 = F3(function(isLE, bytes, offset) { return _Utils_Tuple2(offset + 4, bytes.getUint32(offset, isLE)); });
var _Bytes_read_f32 = F3(function(isLE, bytes, offset) { return _Utils_Tuple2(offset + 4, bytes.getFloat32(offset, isLE)); });
var _Bytes_read_f64 = F3(function(isLE, bytes, offset) { return _Utils_Tuple2(offset + 8, bytes.getFloat64(offset, isLE)); });

var _Bytes_read_bytes = F3(function(len, bytes, offset)
{
	return _Utils_Tuple2(offset + len, new DataView(bytes.buffer, bytes.byteOffset + offset, len));
});

var _Bytes_read_string = F3(function(len, bytes, offset)
{
	var string = '';
	var end = offset + len;
	for (; offset < end;)
	{
		var byte = bytes.getUint8(offset++);
		string +=
			(byte < 128)
				? String.fromCharCode(byte)
				:
			((byte & 0xE0 /* 0b11100000 */) === 0xC0 /* 0b11000000 */)
				? String.fromCharCode((byte & 0x1F /* 0b00011111 */) << 6 | bytes.getUint8(offset++) & 0x3F /* 0b00111111 */)
				:
			((byte & 0xF0 /* 0b11110000 */) === 0xE0 /* 0b11100000 */)
				? String.fromCharCode(
					(byte & 0xF /* 0b00001111 */) << 12
					| (bytes.getUint8(offset++) & 0x3F /* 0b00111111 */) << 6
					| bytes.getUint8(offset++) & 0x3F /* 0b00111111 */
				)
				:
				(byte =
					((byte & 0x7 /* 0b00000111 */) << 18
						| (bytes.getUint8(offset++) & 0x3F /* 0b00111111 */) << 12
						| (bytes.getUint8(offset++) & 0x3F /* 0b00111111 */) << 6
						| bytes.getUint8(offset++) & 0x3F /* 0b00111111 */
					) - 0x10000
				, String.fromCharCode(Math.floor(byte / 0x400) + 0xD800, byte % 0x400 + 0xDC00)
				);
	}
	return _Utils_Tuple2(offset, string);
});

var _Bytes_decodeFailure = F2(function() { throw 0; });


// CREATE

var _Regex_never = /.^/;

var _Regex_fromStringWith = F2(function(options, string)
{
	var flags = 'g';
	if (options.fn) { flags += 'm'; }
	if (options.eE) { flags += 'i'; }

	try
	{
		return $elm$core$Maybe$Just(new RegExp(string, flags));
	}
	catch(error)
	{
		return $elm$core$Maybe$Nothing;
	}
});


// USE

var _Regex_contains = F2(function(re, string)
{
	return string.match(re) !== null;
});


var _Regex_findAtMost = F3(function(n, re, str)
{
	var out = [];
	var number = 0;
	var string = str;
	var lastIndex = re.lastIndex;
	var prevLastIndex = -1;
	var result;
	while (number++ < n && (result = re.exec(string)))
	{
		if (prevLastIndex == re.lastIndex) break;
		var i = result.length - 1;
		var subs = new Array(i);
		while (i > 0)
		{
			var submatch = result[i];
			subs[--i] = submatch
				? $elm$core$Maybe$Just(submatch)
				: $elm$core$Maybe$Nothing;
		}
		out.push(A4($elm$regex$Regex$Match, result[0], result.index, number, _List_fromArray(subs)));
		prevLastIndex = re.lastIndex;
	}
	re.lastIndex = lastIndex;
	return _List_fromArray(out);
});


var _Regex_replaceAtMost = F4(function(n, re, replacer, string)
{
	var count = 0;
	function jsReplacer(match)
	{
		if (count++ >= n)
		{
			return match;
		}
		var i = arguments.length - 3;
		var submatches = new Array(i);
		while (i > 0)
		{
			var submatch = arguments[i];
			submatches[--i] = submatch
				? $elm$core$Maybe$Just(submatch)
				: $elm$core$Maybe$Nothing;
		}
		return replacer(A4($elm$regex$Regex$Match, match, arguments[arguments.length - 2], count, _List_fromArray(submatches)));
	}
	return string.replace(re, jsReplacer);
});

var _Regex_splitAtMost = F3(function(n, re, str)
{
	var string = str;
	var out = [];
	var start = re.lastIndex;
	var restoreLastIndex = re.lastIndex;
	while (n--)
	{
		var result = re.exec(string);
		if (!result) break;
		out.push(string.slice(start, result.index));
		start = re.lastIndex;
	}
	out.push(string.slice(start));
	re.lastIndex = restoreLastIndex;
	return _List_fromArray(out);
});

var _Regex_infinity = Infinity;
var $elm$core$List$cons = _List_cons;
var $elm$core$Elm$JsArray$foldr = _JsArray_foldr;
var $elm$core$Array$foldr = F3(
	function (func, baseCase, _v0) {
		var tree = _v0.c;
		var tail = _v0.d;
		var helper = F2(
			function (node, acc) {
				if (!node.$) {
					var subTree = node.a;
					return A3($elm$core$Elm$JsArray$foldr, helper, acc, subTree);
				} else {
					var values = node.a;
					return A3($elm$core$Elm$JsArray$foldr, func, acc, values);
				}
			});
		return A3(
			$elm$core$Elm$JsArray$foldr,
			helper,
			A3($elm$core$Elm$JsArray$foldr, func, baseCase, tail),
			tree);
	});
var $elm$core$Array$toList = function (array) {
	return A3($elm$core$Array$foldr, $elm$core$List$cons, _List_Nil, array);
};
var $elm$core$Dict$foldr = F3(
	function (func, acc, t) {
		foldr:
		while (true) {
			if (t.$ === -2) {
				return acc;
			} else {
				var key = t.b;
				var value = t.c;
				var left = t.d;
				var right = t.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($elm$core$Dict$foldr, func, acc, right)),
					$temp$t = left;
				func = $temp$func;
				acc = $temp$acc;
				t = $temp$t;
				continue foldr;
			}
		}
	});
var $elm$core$Dict$toList = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, list) {
				return A2(
					$elm$core$List$cons,
					_Utils_Tuple2(key, value),
					list);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Dict$keys = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, keyList) {
				return A2($elm$core$List$cons, key, keyList);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Set$toList = function (_v0) {
	var dict = _v0;
	return $elm$core$Dict$keys(dict);
};
var $elm$core$Basics$EQ = 1;
var $elm$core$Basics$GT = 2;
var $elm$core$Basics$LT = 0;
var $author$project$App$HelmsmanMsg = function (a) {
	return {$: 1, a: a};
};
var $author$project$App$LinkClicked = function (a) {
	return {$: 2, a: a};
};
var $author$project$App$SharedMsg = function (a) {
	return {$: 0, a: a};
};
var $author$project$App$UrlChanged = function (a) {
	return {$: 3, a: a};
};
var $elm$core$Result$Err = function (a) {
	return {$: 1, a: a};
};
var $elm$json$Json$Decode$Failure = F2(
	function (a, b) {
		return {$: 3, a: a, b: b};
	});
var $elm$json$Json$Decode$Field = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $elm$json$Json$Decode$Index = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var $elm$core$Result$Ok = function (a) {
	return {$: 0, a: a};
};
var $elm$json$Json$Decode$OneOf = function (a) {
	return {$: 2, a: a};
};
var $elm$core$Basics$False = 1;
var $elm$core$Basics$add = _Basics_add;
var $elm$core$Maybe$Just = function (a) {
	return {$: 0, a: a};
};
var $elm$core$Maybe$Nothing = {$: 1};
var $elm$core$String$all = _String_all;
var $elm$core$Basics$and = _Basics_and;
var $elm$core$Basics$append = _Utils_append;
var $elm$json$Json$Encode$encode = _Json_encode;
var $elm$core$String$fromInt = _String_fromNumber;
var $elm$core$String$join = F2(
	function (sep, chunks) {
		return A2(
			_String_join,
			sep,
			_List_toArray(chunks));
	});
var $elm$core$String$split = F2(
	function (sep, string) {
		return _List_fromArray(
			A2(_String_split, sep, string));
	});
var $elm$json$Json$Decode$indent = function (str) {
	return A2(
		$elm$core$String$join,
		'\n    ',
		A2($elm$core$String$split, '\n', str));
};
var $elm$core$List$foldl = F3(
	function (func, acc, list) {
		foldl:
		while (true) {
			if (!list.b) {
				return acc;
			} else {
				var x = list.a;
				var xs = list.b;
				var $temp$func = func,
					$temp$acc = A2(func, x, acc),
					$temp$list = xs;
				func = $temp$func;
				acc = $temp$acc;
				list = $temp$list;
				continue foldl;
			}
		}
	});
var $elm$core$List$length = function (xs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, i) {
				return i + 1;
			}),
		0,
		xs);
};
var $elm$core$List$map2 = _List_map2;
var $elm$core$Basics$le = _Utils_le;
var $elm$core$Basics$sub = _Basics_sub;
var $elm$core$List$rangeHelp = F3(
	function (lo, hi, list) {
		rangeHelp:
		while (true) {
			if (_Utils_cmp(lo, hi) < 1) {
				var $temp$lo = lo,
					$temp$hi = hi - 1,
					$temp$list = A2($elm$core$List$cons, hi, list);
				lo = $temp$lo;
				hi = $temp$hi;
				list = $temp$list;
				continue rangeHelp;
			} else {
				return list;
			}
		}
	});
var $elm$core$List$range = F2(
	function (lo, hi) {
		return A3($elm$core$List$rangeHelp, lo, hi, _List_Nil);
	});
var $elm$core$List$indexedMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$map2,
			f,
			A2(
				$elm$core$List$range,
				0,
				$elm$core$List$length(xs) - 1),
			xs);
	});
var $elm$core$Char$toCode = _Char_toCode;
var $elm$core$Char$isLower = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (97 <= code) && (code <= 122);
};
var $elm$core$Char$isUpper = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 90) && (65 <= code);
};
var $elm$core$Basics$or = _Basics_or;
var $elm$core$Char$isAlpha = function (_char) {
	return $elm$core$Char$isLower(_char) || $elm$core$Char$isUpper(_char);
};
var $elm$core$Char$isDigit = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 57) && (48 <= code);
};
var $elm$core$Char$isAlphaNum = function (_char) {
	return $elm$core$Char$isLower(_char) || ($elm$core$Char$isUpper(_char) || $elm$core$Char$isDigit(_char));
};
var $elm$core$List$reverse = function (list) {
	return A3($elm$core$List$foldl, $elm$core$List$cons, _List_Nil, list);
};
var $elm$core$String$uncons = _String_uncons;
var $elm$json$Json$Decode$errorOneOf = F2(
	function (i, error) {
		return '\n\n(' + ($elm$core$String$fromInt(i + 1) + (') ' + $elm$json$Json$Decode$indent(
			$elm$json$Json$Decode$errorToString(error))));
	});
var $elm$json$Json$Decode$errorToString = function (error) {
	return A2($elm$json$Json$Decode$errorToStringHelp, error, _List_Nil);
};
var $elm$json$Json$Decode$errorToStringHelp = F2(
	function (error, context) {
		errorToStringHelp:
		while (true) {
			switch (error.$) {
				case 0:
					var f = error.a;
					var err = error.b;
					var isSimple = function () {
						var _v1 = $elm$core$String$uncons(f);
						if (_v1.$ === 1) {
							return false;
						} else {
							var _v2 = _v1.a;
							var _char = _v2.a;
							var rest = _v2.b;
							return $elm$core$Char$isAlpha(_char) && A2($elm$core$String$all, $elm$core$Char$isAlphaNum, rest);
						}
					}();
					var fieldName = isSimple ? ('.' + f) : ('[\'' + (f + '\']'));
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, fieldName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 1:
					var i = error.a;
					var err = error.b;
					var indexName = '[' + ($elm$core$String$fromInt(i) + ']');
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, indexName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 2:
					var errors = error.a;
					if (!errors.b) {
						return 'Ran into a Json.Decode.oneOf with no possibilities' + function () {
							if (!context.b) {
								return '!';
							} else {
								return ' at json' + A2(
									$elm$core$String$join,
									'',
									$elm$core$List$reverse(context));
							}
						}();
					} else {
						if (!errors.b.b) {
							var err = errors.a;
							var $temp$error = err,
								$temp$context = context;
							error = $temp$error;
							context = $temp$context;
							continue errorToStringHelp;
						} else {
							var starter = function () {
								if (!context.b) {
									return 'Json.Decode.oneOf';
								} else {
									return 'The Json.Decode.oneOf at json' + A2(
										$elm$core$String$join,
										'',
										$elm$core$List$reverse(context));
								}
							}();
							var introduction = starter + (' failed in the following ' + ($elm$core$String$fromInt(
								$elm$core$List$length(errors)) + ' ways:'));
							return A2(
								$elm$core$String$join,
								'\n\n',
								A2(
									$elm$core$List$cons,
									introduction,
									A2($elm$core$List$indexedMap, $elm$json$Json$Decode$errorOneOf, errors)));
						}
					}
				default:
					var msg = error.a;
					var json = error.b;
					var introduction = function () {
						if (!context.b) {
							return 'Problem with the given value:\n\n';
						} else {
							return 'Problem with the value at json' + (A2(
								$elm$core$String$join,
								'',
								$elm$core$List$reverse(context)) + ':\n\n    ');
						}
					}();
					return introduction + ($elm$json$Json$Decode$indent(
						A2($elm$json$Json$Encode$encode, 4, json)) + ('\n\n' + msg));
			}
		}
	});
var $elm$core$Array$branchFactor = 32;
var $elm$core$Array$Array_elm_builtin = F4(
	function (a, b, c, d) {
		return {$: 0, a: a, b: b, c: c, d: d};
	});
var $elm$core$Elm$JsArray$empty = _JsArray_empty;
var $elm$core$Basics$ceiling = _Basics_ceiling;
var $elm$core$Basics$fdiv = _Basics_fdiv;
var $elm$core$Basics$logBase = F2(
	function (base, number) {
		return _Basics_log(number) / _Basics_log(base);
	});
var $elm$core$Basics$toFloat = _Basics_toFloat;
var $elm$core$Array$shiftStep = $elm$core$Basics$ceiling(
	A2($elm$core$Basics$logBase, 2, $elm$core$Array$branchFactor));
var $elm$core$Array$empty = A4($elm$core$Array$Array_elm_builtin, 0, $elm$core$Array$shiftStep, $elm$core$Elm$JsArray$empty, $elm$core$Elm$JsArray$empty);
var $elm$core$Elm$JsArray$initialize = _JsArray_initialize;
var $elm$core$Array$Leaf = function (a) {
	return {$: 1, a: a};
};
var $elm$core$Basics$apL = F2(
	function (f, x) {
		return f(x);
	});
var $elm$core$Basics$apR = F2(
	function (x, f) {
		return f(x);
	});
var $elm$core$Basics$eq = _Utils_equal;
var $elm$core$Basics$floor = _Basics_floor;
var $elm$core$Elm$JsArray$length = _JsArray_length;
var $elm$core$Basics$gt = _Utils_gt;
var $elm$core$Basics$max = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) > 0) ? x : y;
	});
var $elm$core$Basics$mul = _Basics_mul;
var $elm$core$Array$SubTree = function (a) {
	return {$: 0, a: a};
};
var $elm$core$Elm$JsArray$initializeFromList = _JsArray_initializeFromList;
var $elm$core$Array$compressNodes = F2(
	function (nodes, acc) {
		compressNodes:
		while (true) {
			var _v0 = A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodes);
			var node = _v0.a;
			var remainingNodes = _v0.b;
			var newAcc = A2(
				$elm$core$List$cons,
				$elm$core$Array$SubTree(node),
				acc);
			if (!remainingNodes.b) {
				return $elm$core$List$reverse(newAcc);
			} else {
				var $temp$nodes = remainingNodes,
					$temp$acc = newAcc;
				nodes = $temp$nodes;
				acc = $temp$acc;
				continue compressNodes;
			}
		}
	});
var $elm$core$Tuple$first = function (_v0) {
	var x = _v0.a;
	return x;
};
var $elm$core$Array$treeFromBuilder = F2(
	function (nodeList, nodeListSize) {
		treeFromBuilder:
		while (true) {
			var newNodeSize = $elm$core$Basics$ceiling(nodeListSize / $elm$core$Array$branchFactor);
			if (newNodeSize === 1) {
				return A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodeList).a;
			} else {
				var $temp$nodeList = A2($elm$core$Array$compressNodes, nodeList, _List_Nil),
					$temp$nodeListSize = newNodeSize;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue treeFromBuilder;
			}
		}
	});
var $elm$core$Array$builderToArray = F2(
	function (reverseNodeList, builder) {
		if (!builder.m) {
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.p),
				$elm$core$Array$shiftStep,
				$elm$core$Elm$JsArray$empty,
				builder.p);
		} else {
			var treeLen = builder.m * $elm$core$Array$branchFactor;
			var depth = $elm$core$Basics$floor(
				A2($elm$core$Basics$logBase, $elm$core$Array$branchFactor, treeLen - 1));
			var correctNodeList = reverseNodeList ? $elm$core$List$reverse(builder.q) : builder.q;
			var tree = A2($elm$core$Array$treeFromBuilder, correctNodeList, builder.m);
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.p) + treeLen,
				A2($elm$core$Basics$max, 5, depth * $elm$core$Array$shiftStep),
				tree,
				builder.p);
		}
	});
var $elm$core$Basics$idiv = _Basics_idiv;
var $elm$core$Basics$lt = _Utils_lt;
var $elm$core$Array$initializeHelp = F5(
	function (fn, fromIndex, len, nodeList, tail) {
		initializeHelp:
		while (true) {
			if (fromIndex < 0) {
				return A2(
					$elm$core$Array$builderToArray,
					false,
					{q: nodeList, m: (len / $elm$core$Array$branchFactor) | 0, p: tail});
			} else {
				var leaf = $elm$core$Array$Leaf(
					A3($elm$core$Elm$JsArray$initialize, $elm$core$Array$branchFactor, fromIndex, fn));
				var $temp$fn = fn,
					$temp$fromIndex = fromIndex - $elm$core$Array$branchFactor,
					$temp$len = len,
					$temp$nodeList = A2($elm$core$List$cons, leaf, nodeList),
					$temp$tail = tail;
				fn = $temp$fn;
				fromIndex = $temp$fromIndex;
				len = $temp$len;
				nodeList = $temp$nodeList;
				tail = $temp$tail;
				continue initializeHelp;
			}
		}
	});
var $elm$core$Basics$remainderBy = _Basics_remainderBy;
var $elm$core$Array$initialize = F2(
	function (len, fn) {
		if (len <= 0) {
			return $elm$core$Array$empty;
		} else {
			var tailLen = len % $elm$core$Array$branchFactor;
			var tail = A3($elm$core$Elm$JsArray$initialize, tailLen, len - tailLen, fn);
			var initialFromIndex = (len - tailLen) - $elm$core$Array$branchFactor;
			return A5($elm$core$Array$initializeHelp, fn, initialFromIndex, len, _List_Nil, tail);
		}
	});
var $elm$core$Basics$True = 0;
var $elm$core$Result$isOk = function (result) {
	if (!result.$) {
		return true;
	} else {
		return false;
	}
};
var $elm$json$Json$Decode$map = _Json_map1;
var $elm$json$Json$Decode$map2 = _Json_map2;
var $elm$json$Json$Decode$succeed = _Json_succeed;
var $elm$virtual_dom$VirtualDom$toHandlerInt = function (handler) {
	switch (handler.$) {
		case 0:
			return 0;
		case 1:
			return 1;
		case 2:
			return 2;
		default:
			return 3;
	}
};
var $elm$browser$Browser$External = function (a) {
	return {$: 1, a: a};
};
var $elm$browser$Browser$Internal = function (a) {
	return {$: 0, a: a};
};
var $elm$core$Basics$identity = function (x) {
	return x;
};
var $elm$browser$Browser$Dom$NotFound = $elm$core$Basics$identity;
var $elm$url$Url$Http = 0;
var $elm$url$Url$Https = 1;
var $elm$url$Url$Url = F6(
	function (protocol, host, port_, path, query, fragment) {
		return {dp: fragment, dt: host, dT: path, dV: port_, d_: protocol, d$: query};
	});
var $elm$core$String$contains = _String_contains;
var $elm$core$String$length = _String_length;
var $elm$core$String$slice = _String_slice;
var $elm$core$String$dropLeft = F2(
	function (n, string) {
		return (n < 1) ? string : A3(
			$elm$core$String$slice,
			n,
			$elm$core$String$length(string),
			string);
	});
var $elm$core$String$indexes = _String_indexes;
var $elm$core$String$isEmpty = function (string) {
	return string === '';
};
var $elm$core$String$left = F2(
	function (n, string) {
		return (n < 1) ? '' : A3($elm$core$String$slice, 0, n, string);
	});
var $elm$core$String$toInt = _String_toInt;
var $elm$url$Url$chompBeforePath = F5(
	function (protocol, path, params, frag, str) {
		if ($elm$core$String$isEmpty(str) || A2($elm$core$String$contains, '@', str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, ':', str);
			if (!_v0.b) {
				return $elm$core$Maybe$Just(
					A6($elm$url$Url$Url, protocol, str, $elm$core$Maybe$Nothing, path, params, frag));
			} else {
				if (!_v0.b.b) {
					var i = _v0.a;
					var _v1 = $elm$core$String$toInt(
						A2($elm$core$String$dropLeft, i + 1, str));
					if (_v1.$ === 1) {
						return $elm$core$Maybe$Nothing;
					} else {
						var port_ = _v1;
						return $elm$core$Maybe$Just(
							A6(
								$elm$url$Url$Url,
								protocol,
								A2($elm$core$String$left, i, str),
								port_,
								path,
								params,
								frag));
					}
				} else {
					return $elm$core$Maybe$Nothing;
				}
			}
		}
	});
var $elm$url$Url$chompBeforeQuery = F4(
	function (protocol, params, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '/', str);
			if (!_v0.b) {
				return A5($elm$url$Url$chompBeforePath, protocol, '/', params, frag, str);
			} else {
				var i = _v0.a;
				return A5(
					$elm$url$Url$chompBeforePath,
					protocol,
					A2($elm$core$String$dropLeft, i, str),
					params,
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompBeforeFragment = F3(
	function (protocol, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '?', str);
			if (!_v0.b) {
				return A4($elm$url$Url$chompBeforeQuery, protocol, $elm$core$Maybe$Nothing, frag, str);
			} else {
				var i = _v0.a;
				return A4(
					$elm$url$Url$chompBeforeQuery,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompAfterProtocol = F2(
	function (protocol, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '#', str);
			if (!_v0.b) {
				return A3($elm$url$Url$chompBeforeFragment, protocol, $elm$core$Maybe$Nothing, str);
			} else {
				var i = _v0.a;
				return A3(
					$elm$url$Url$chompBeforeFragment,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$core$String$startsWith = _String_startsWith;
var $elm$url$Url$fromString = function (str) {
	return A2($elm$core$String$startsWith, 'http://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		0,
		A2($elm$core$String$dropLeft, 7, str)) : (A2($elm$core$String$startsWith, 'https://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		1,
		A2($elm$core$String$dropLeft, 8, str)) : $elm$core$Maybe$Nothing);
};
var $elm$core$Basics$never = function (_v0) {
	never:
	while (true) {
		var nvr = _v0;
		var $temp$_v0 = nvr;
		_v0 = $temp$_v0;
		continue never;
	}
};
var $elm$core$Task$Perform = $elm$core$Basics$identity;
var $elm$core$Task$succeed = _Scheduler_succeed;
var $elm$core$Task$init = $elm$core$Task$succeed(0);
var $elm$core$List$foldrHelper = F4(
	function (fn, acc, ctr, ls) {
		if (!ls.b) {
			return acc;
		} else {
			var a = ls.a;
			var r1 = ls.b;
			if (!r1.b) {
				return A2(fn, a, acc);
			} else {
				var b = r1.a;
				var r2 = r1.b;
				if (!r2.b) {
					return A2(
						fn,
						a,
						A2(fn, b, acc));
				} else {
					var c = r2.a;
					var r3 = r2.b;
					if (!r3.b) {
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(fn, c, acc)));
					} else {
						var d = r3.a;
						var r4 = r3.b;
						var res = (ctr > 500) ? A3(
							$elm$core$List$foldl,
							fn,
							acc,
							$elm$core$List$reverse(r4)) : A4($elm$core$List$foldrHelper, fn, acc, ctr + 1, r4);
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(
									fn,
									c,
									A2(fn, d, res))));
					}
				}
			}
		}
	});
var $elm$core$List$foldr = F3(
	function (fn, acc, ls) {
		return A4($elm$core$List$foldrHelper, fn, acc, 0, ls);
	});
var $elm$core$List$map = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, acc) {
					return A2(
						$elm$core$List$cons,
						f(x),
						acc);
				}),
			_List_Nil,
			xs);
	});
var $elm$core$Task$andThen = _Scheduler_andThen;
var $elm$core$Task$map = F2(
	function (func, taskA) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return $elm$core$Task$succeed(
					func(a));
			},
			taskA);
	});
var $elm$core$Task$map2 = F3(
	function (func, taskA, taskB) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return A2(
					$elm$core$Task$andThen,
					function (b) {
						return $elm$core$Task$succeed(
							A2(func, a, b));
					},
					taskB);
			},
			taskA);
	});
var $elm$core$Task$sequence = function (tasks) {
	return A3(
		$elm$core$List$foldr,
		$elm$core$Task$map2($elm$core$List$cons),
		$elm$core$Task$succeed(_List_Nil),
		tasks);
};
var $elm$core$Platform$sendToApp = _Platform_sendToApp;
var $elm$core$Task$spawnCmd = F2(
	function (router, _v0) {
		var task = _v0;
		return _Scheduler_spawn(
			A2(
				$elm$core$Task$andThen,
				$elm$core$Platform$sendToApp(router),
				task));
	});
var $elm$core$Task$onEffects = F3(
	function (router, commands, state) {
		return A2(
			$elm$core$Task$map,
			function (_v0) {
				return 0;
			},
			$elm$core$Task$sequence(
				A2(
					$elm$core$List$map,
					$elm$core$Task$spawnCmd(router),
					commands)));
	});
var $elm$core$Task$onSelfMsg = F3(
	function (_v0, _v1, _v2) {
		return $elm$core$Task$succeed(0);
	});
var $elm$core$Task$cmdMap = F2(
	function (tagger, _v0) {
		var task = _v0;
		return A2($elm$core$Task$map, tagger, task);
	});
_Platform_effectManagers['Task'] = _Platform_createManager($elm$core$Task$init, $elm$core$Task$onEffects, $elm$core$Task$onSelfMsg, $elm$core$Task$cmdMap);
var $elm$core$Task$command = _Platform_leaf('Task');
var $elm$core$Task$perform = F2(
	function (toMessage, task) {
		return $elm$core$Task$command(
			A2($elm$core$Task$map, toMessage, task));
	});
var $elm$browser$Browser$application = _Browser_application;
var $elm$core$Platform$Sub$batch = _Platform_batch;
var $elm$core$Platform$Cmd$batch = _Platform_batch;
var $author$project$Helmsman$HomePage = function (a) {
	return {$: 2, a: a};
};
var $author$project$Helmsman$InvoiceInfoPage = function (a) {
	return {$: 7, a: a};
};
var $author$project$Helmsman$NotFound = {$: 0};
var $author$project$Helmsman$OrderTicketsMsg = function (a) {
	return {$: 1, a: a};
};
var $author$project$Helmsman$OrderTicketsPage = function (a) {
	return {$: 3, a: a};
};
var $author$project$Helmsman$OrderTicketsTempMsg = function (a) {
	return {$: 7, a: a};
};
var $author$project$Helmsman$OrderTicketsTempPage = function (a) {
	return {$: 9, a: a};
};
var $author$project$Helmsman$PaymentMsg = function (a) {
	return {$: 3, a: a};
};
var $author$project$Helmsman$PaymentPage = function (a) {
	return {$: 5, a: a};
};
var $author$project$Helmsman$PaymentSuccessMsg = function (a) {
	return {$: 2, a: a};
};
var $author$project$Helmsman$PaymentSuccessPage = function (a) {
	return {$: 4, a: a};
};
var $author$project$Helmsman$SplashPage = {$: 1};
var $author$project$Helmsman$TeesAndCeesPage = function (a) {
	return {$: 6, a: a};
};
var $author$project$Helmsman$TicketsMsg = function (a) {
	return {$: 6, a: a};
};
var $author$project$Helmsman$TicketsPage = function (a) {
	return {$: 8, a: a};
};
var $author$project$Pages$Home$init = {};
var $author$project$Pages$InvoiceInfo$init = {cS: '', ax: true, c8: '', aF: true, bG: false, en: '', a1: true};
var $elm$core$Platform$Cmd$none = $elm$core$Platform$Cmd$batch(_List_Nil);
var $author$project$Pages$OrderTickets$init = function (shared) {
	return _Utils_Tuple2(
		{
			eG: '',
			aD: true,
			aG: '',
			aH: true,
			eY: '',
			aJ: true,
			aK: true,
			a7: true,
			ba: '',
			bb: true,
			N: {eS: 'Gratis', dv: 'GR', dN: 0, fu: 0},
			X: 0,
			Y: true,
			fh: '',
			aQ: true,
			E: {eS: 'Leden', dv: 'LID', dN: 0, fu: 40},
			F: {eS: 'Niet-Leden', dv: 'N-LID', dN: 0, fu: 60}
		},
		$elm$core$Platform$Cmd$none);
};
var $author$project$Pages$OrderTicketsTemp$freeTicketsAvailable = 0;
var $author$project$Pages$OrderTicketsTemp$init = function (shared) {
	return _Utils_Tuple2(
		{
			eG: '',
			aD: true,
			aG: '',
			aH: true,
			eY: '',
			aJ: true,
			aK: true,
			a7: true,
			ba: '',
			bb: true,
			N: {eS: 'Gratis', dv: 'GR', dN: 0, fu: 0},
			X: $author$project$Pages$OrderTicketsTemp$freeTicketsAvailable,
			Y: true,
			fh: '',
			aQ: true,
			E: {eS: 'Leden', dv: 'LID', dN: 0, fu: 40},
			F: {eS: 'Niet-Leden', dv: 'N-LID', dN: 0, fu: 60}
		},
		$elm$core$Platform$Cmd$none);
};
var $elm$browser$Browser$Navigation$pushUrl = _Browser_pushUrl;
var $elm$json$Json$Encode$string = _Json_wrap;
var $author$project$Pages$Payment$showSumUpWidget = _Platform_outgoingPort('showSumUpWidget', $elm$json$Json$Encode$string);
var $author$project$Pages$Payment$init = function (shared) {
	return (shared.eN === '') ? _Utils_Tuple2(
		{bk: 0, aY: false},
		A2($elm$browser$Browser$Navigation$pushUrl, shared.fo, '/order-tickets/')) : _Utils_Tuple2(
		{bk: 0, aY: false},
		$author$project$Pages$Payment$showSumUpWidget(shared.c9));
};
var $author$project$Pages$PaymentSuccess$OrderInfoLoaded = function (a) {
	return {$: 1, a: a};
};
var $author$project$Api$GetOrderInfo$Order = F6(
	function (id, code, christianName, lastName, email, tickets) {
		return {eG: christianName, eI: code, eY: email, dv: id, fh: lastName, fM: tickets};
	});
var $elm$json$Json$Decode$list = _Json_decodeList;
var $NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$custom = $elm$json$Json$Decode$map2($elm$core$Basics$apR);
var $elm$json$Json$Decode$field = _Json_decodeField;
var $NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required = F3(
	function (key, valDecoder, decoder) {
		return A2(
			$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$custom,
			A2($elm$json$Json$Decode$field, key, valDecoder),
			decoder);
	});
var $elm$json$Json$Decode$string = _Json_decodeString;
var $author$project$Api$GetOrderInfo$Ticket = F3(
	function (id, description, price) {
		return {eS: description, dv: id, fu: price};
	});
var $elm$json$Json$Decode$float = _Json_decodeFloat;
var $author$project$Api$GetOrderInfo$ticketDecoder = A3(
	$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
	'price',
	$elm$json$Json$Decode$float,
	A3(
		$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
		'description',
		$elm$json$Json$Decode$string,
		A3(
			$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
			'id',
			$elm$json$Json$Decode$string,
			$elm$json$Json$Decode$succeed($author$project$Api$GetOrderInfo$Ticket))));
var $author$project$Api$GetOrderInfo$decoder = A3(
	$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
	'tickets',
	$elm$json$Json$Decode$list($author$project$Api$GetOrderInfo$ticketDecoder),
	A3(
		$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
		'email',
		$elm$json$Json$Decode$string,
		A3(
			$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
			'lastName',
			$elm$json$Json$Decode$string,
			A3(
				$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
				'christianName',
				$elm$json$Json$Decode$string,
				A3(
					$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
					'code',
					$elm$json$Json$Decode$string,
					A3(
						$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
						'id',
						$elm$json$Json$Decode$string,
						$elm$json$Json$Decode$succeed($author$project$Api$GetOrderInfo$Order)))))));
var $elm$json$Json$Decode$decodeString = _Json_runOnString;
var $elm$http$Http$BadStatus_ = F2(
	function (a, b) {
		return {$: 3, a: a, b: b};
	});
var $elm$http$Http$BadUrl_ = function (a) {
	return {$: 0, a: a};
};
var $elm$http$Http$GoodStatus_ = F2(
	function (a, b) {
		return {$: 4, a: a, b: b};
	});
var $elm$http$Http$NetworkError_ = {$: 2};
var $elm$http$Http$Receiving = function (a) {
	return {$: 1, a: a};
};
var $elm$http$Http$Sending = function (a) {
	return {$: 0, a: a};
};
var $elm$http$Http$Timeout_ = {$: 1};
var $elm$core$Dict$RBEmpty_elm_builtin = {$: -2};
var $elm$core$Dict$empty = $elm$core$Dict$RBEmpty_elm_builtin;
var $elm$core$Maybe$isJust = function (maybe) {
	if (!maybe.$) {
		return true;
	} else {
		return false;
	}
};
var $elm$core$Platform$sendToSelf = _Platform_sendToSelf;
var $elm$core$Basics$compare = _Utils_compare;
var $elm$core$Dict$get = F2(
	function (targetKey, dict) {
		get:
		while (true) {
			if (dict.$ === -2) {
				return $elm$core$Maybe$Nothing;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var _v1 = A2($elm$core$Basics$compare, targetKey, key);
				switch (_v1) {
					case 0:
						var $temp$targetKey = targetKey,
							$temp$dict = left;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
					case 1:
						return $elm$core$Maybe$Just(value);
					default:
						var $temp$targetKey = targetKey,
							$temp$dict = right;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
				}
			}
		}
	});
var $elm$core$Dict$Black = 1;
var $elm$core$Dict$RBNode_elm_builtin = F5(
	function (a, b, c, d, e) {
		return {$: -1, a: a, b: b, c: c, d: d, e: e};
	});
var $elm$core$Dict$Red = 0;
var $elm$core$Dict$balance = F5(
	function (color, key, value, left, right) {
		if ((right.$ === -1) && (!right.a)) {
			var _v1 = right.a;
			var rK = right.b;
			var rV = right.c;
			var rLeft = right.d;
			var rRight = right.e;
			if ((left.$ === -1) && (!left.a)) {
				var _v3 = left.a;
				var lK = left.b;
				var lV = left.c;
				var lLeft = left.d;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					0,
					key,
					value,
					A5($elm$core$Dict$RBNode_elm_builtin, 1, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 1, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					color,
					rK,
					rV,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, key, value, left, rLeft),
					rRight);
			}
		} else {
			if ((((left.$ === -1) && (!left.a)) && (left.d.$ === -1)) && (!left.d.a)) {
				var _v5 = left.a;
				var lK = left.b;
				var lV = left.c;
				var _v6 = left.d;
				var _v7 = _v6.a;
				var llK = _v6.b;
				var llV = _v6.c;
				var llLeft = _v6.d;
				var llRight = _v6.e;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					0,
					lK,
					lV,
					A5($elm$core$Dict$RBNode_elm_builtin, 1, llK, llV, llLeft, llRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 1, key, value, lRight, right));
			} else {
				return A5($elm$core$Dict$RBNode_elm_builtin, color, key, value, left, right);
			}
		}
	});
var $elm$core$Dict$insertHelp = F3(
	function (key, value, dict) {
		if (dict.$ === -2) {
			return A5($elm$core$Dict$RBNode_elm_builtin, 0, key, value, $elm$core$Dict$RBEmpty_elm_builtin, $elm$core$Dict$RBEmpty_elm_builtin);
		} else {
			var nColor = dict.a;
			var nKey = dict.b;
			var nValue = dict.c;
			var nLeft = dict.d;
			var nRight = dict.e;
			var _v1 = A2($elm$core$Basics$compare, key, nKey);
			switch (_v1) {
				case 0:
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						A3($elm$core$Dict$insertHelp, key, value, nLeft),
						nRight);
				case 1:
					return A5($elm$core$Dict$RBNode_elm_builtin, nColor, nKey, value, nLeft, nRight);
				default:
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						nLeft,
						A3($elm$core$Dict$insertHelp, key, value, nRight));
			}
		}
	});
var $elm$core$Dict$insert = F3(
	function (key, value, dict) {
		var _v0 = A3($elm$core$Dict$insertHelp, key, value, dict);
		if ((_v0.$ === -1) && (!_v0.a)) {
			var _v1 = _v0.a;
			var k = _v0.b;
			var v = _v0.c;
			var l = _v0.d;
			var r = _v0.e;
			return A5($elm$core$Dict$RBNode_elm_builtin, 1, k, v, l, r);
		} else {
			var x = _v0;
			return x;
		}
	});
var $elm$core$Dict$getMin = function (dict) {
	getMin:
	while (true) {
		if ((dict.$ === -1) && (dict.d.$ === -1)) {
			var left = dict.d;
			var $temp$dict = left;
			dict = $temp$dict;
			continue getMin;
		} else {
			return dict;
		}
	}
};
var $elm$core$Dict$moveRedLeft = function (dict) {
	if (((dict.$ === -1) && (dict.d.$ === -1)) && (dict.e.$ === -1)) {
		if ((dict.e.d.$ === -1) && (!dict.e.d.a)) {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v1 = dict.d;
			var lClr = _v1.a;
			var lK = _v1.b;
			var lV = _v1.c;
			var lLeft = _v1.d;
			var lRight = _v1.e;
			var _v2 = dict.e;
			var rClr = _v2.a;
			var rK = _v2.b;
			var rV = _v2.c;
			var rLeft = _v2.d;
			var _v3 = rLeft.a;
			var rlK = rLeft.b;
			var rlV = rLeft.c;
			var rlL = rLeft.d;
			var rlR = rLeft.e;
			var rRight = _v2.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				0,
				rlK,
				rlV,
				A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					rlL),
				A5($elm$core$Dict$RBNode_elm_builtin, 1, rK, rV, rlR, rRight));
		} else {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v4 = dict.d;
			var lClr = _v4.a;
			var lK = _v4.b;
			var lV = _v4.c;
			var lLeft = _v4.d;
			var lRight = _v4.e;
			var _v5 = dict.e;
			var rClr = _v5.a;
			var rK = _v5.b;
			var rV = _v5.c;
			var rLeft = _v5.d;
			var rRight = _v5.e;
			if (clr === 1) {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var $elm$core$Dict$moveRedRight = function (dict) {
	if (((dict.$ === -1) && (dict.d.$ === -1)) && (dict.e.$ === -1)) {
		if ((dict.d.d.$ === -1) && (!dict.d.d.a)) {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v1 = dict.d;
			var lClr = _v1.a;
			var lK = _v1.b;
			var lV = _v1.c;
			var _v2 = _v1.d;
			var _v3 = _v2.a;
			var llK = _v2.b;
			var llV = _v2.c;
			var llLeft = _v2.d;
			var llRight = _v2.e;
			var lRight = _v1.e;
			var _v4 = dict.e;
			var rClr = _v4.a;
			var rK = _v4.b;
			var rV = _v4.c;
			var rLeft = _v4.d;
			var rRight = _v4.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				0,
				lK,
				lV,
				A5($elm$core$Dict$RBNode_elm_builtin, 1, llK, llV, llLeft, llRight),
				A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					lRight,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight)));
		} else {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v5 = dict.d;
			var lClr = _v5.a;
			var lK = _v5.b;
			var lV = _v5.c;
			var lLeft = _v5.d;
			var lRight = _v5.e;
			var _v6 = dict.e;
			var rClr = _v6.a;
			var rK = _v6.b;
			var rV = _v6.c;
			var rLeft = _v6.d;
			var rRight = _v6.e;
			if (clr === 1) {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var $elm$core$Dict$removeHelpPrepEQGT = F7(
	function (targetKey, dict, color, key, value, left, right) {
		if ((left.$ === -1) && (!left.a)) {
			var _v1 = left.a;
			var lK = left.b;
			var lV = left.c;
			var lLeft = left.d;
			var lRight = left.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				color,
				lK,
				lV,
				lLeft,
				A5($elm$core$Dict$RBNode_elm_builtin, 0, key, value, lRight, right));
		} else {
			_v2$2:
			while (true) {
				if ((right.$ === -1) && (right.a === 1)) {
					if (right.d.$ === -1) {
						if (right.d.a === 1) {
							var _v3 = right.a;
							var _v4 = right.d;
							var _v5 = _v4.a;
							return $elm$core$Dict$moveRedRight(dict);
						} else {
							break _v2$2;
						}
					} else {
						var _v6 = right.a;
						var _v7 = right.d;
						return $elm$core$Dict$moveRedRight(dict);
					}
				} else {
					break _v2$2;
				}
			}
			return dict;
		}
	});
var $elm$core$Dict$removeMin = function (dict) {
	if ((dict.$ === -1) && (dict.d.$ === -1)) {
		var color = dict.a;
		var key = dict.b;
		var value = dict.c;
		var left = dict.d;
		var lColor = left.a;
		var lLeft = left.d;
		var right = dict.e;
		if (lColor === 1) {
			if ((lLeft.$ === -1) && (!lLeft.a)) {
				var _v3 = lLeft.a;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					color,
					key,
					value,
					$elm$core$Dict$removeMin(left),
					right);
			} else {
				var _v4 = $elm$core$Dict$moveRedLeft(dict);
				if (_v4.$ === -1) {
					var nColor = _v4.a;
					var nKey = _v4.b;
					var nValue = _v4.c;
					var nLeft = _v4.d;
					var nRight = _v4.e;
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						$elm$core$Dict$removeMin(nLeft),
						nRight);
				} else {
					return $elm$core$Dict$RBEmpty_elm_builtin;
				}
			}
		} else {
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				color,
				key,
				value,
				$elm$core$Dict$removeMin(left),
				right);
		}
	} else {
		return $elm$core$Dict$RBEmpty_elm_builtin;
	}
};
var $elm$core$Dict$removeHelp = F2(
	function (targetKey, dict) {
		if (dict.$ === -2) {
			return $elm$core$Dict$RBEmpty_elm_builtin;
		} else {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_cmp(targetKey, key) < 0) {
				if ((left.$ === -1) && (left.a === 1)) {
					var _v4 = left.a;
					var lLeft = left.d;
					if ((lLeft.$ === -1) && (!lLeft.a)) {
						var _v6 = lLeft.a;
						return A5(
							$elm$core$Dict$RBNode_elm_builtin,
							color,
							key,
							value,
							A2($elm$core$Dict$removeHelp, targetKey, left),
							right);
					} else {
						var _v7 = $elm$core$Dict$moveRedLeft(dict);
						if (_v7.$ === -1) {
							var nColor = _v7.a;
							var nKey = _v7.b;
							var nValue = _v7.c;
							var nLeft = _v7.d;
							var nRight = _v7.e;
							return A5(
								$elm$core$Dict$balance,
								nColor,
								nKey,
								nValue,
								A2($elm$core$Dict$removeHelp, targetKey, nLeft),
								nRight);
						} else {
							return $elm$core$Dict$RBEmpty_elm_builtin;
						}
					}
				} else {
					return A5(
						$elm$core$Dict$RBNode_elm_builtin,
						color,
						key,
						value,
						A2($elm$core$Dict$removeHelp, targetKey, left),
						right);
				}
			} else {
				return A2(
					$elm$core$Dict$removeHelpEQGT,
					targetKey,
					A7($elm$core$Dict$removeHelpPrepEQGT, targetKey, dict, color, key, value, left, right));
			}
		}
	});
var $elm$core$Dict$removeHelpEQGT = F2(
	function (targetKey, dict) {
		if (dict.$ === -1) {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_eq(targetKey, key)) {
				var _v1 = $elm$core$Dict$getMin(right);
				if (_v1.$ === -1) {
					var minKey = _v1.b;
					var minValue = _v1.c;
					return A5(
						$elm$core$Dict$balance,
						color,
						minKey,
						minValue,
						left,
						$elm$core$Dict$removeMin(right));
				} else {
					return $elm$core$Dict$RBEmpty_elm_builtin;
				}
			} else {
				return A5(
					$elm$core$Dict$balance,
					color,
					key,
					value,
					left,
					A2($elm$core$Dict$removeHelp, targetKey, right));
			}
		} else {
			return $elm$core$Dict$RBEmpty_elm_builtin;
		}
	});
var $elm$core$Dict$remove = F2(
	function (key, dict) {
		var _v0 = A2($elm$core$Dict$removeHelp, key, dict);
		if ((_v0.$ === -1) && (!_v0.a)) {
			var _v1 = _v0.a;
			var k = _v0.b;
			var v = _v0.c;
			var l = _v0.d;
			var r = _v0.e;
			return A5($elm$core$Dict$RBNode_elm_builtin, 1, k, v, l, r);
		} else {
			var x = _v0;
			return x;
		}
	});
var $elm$core$Dict$update = F3(
	function (targetKey, alter, dictionary) {
		var _v0 = alter(
			A2($elm$core$Dict$get, targetKey, dictionary));
		if (!_v0.$) {
			var value = _v0.a;
			return A3($elm$core$Dict$insert, targetKey, value, dictionary);
		} else {
			return A2($elm$core$Dict$remove, targetKey, dictionary);
		}
	});
var $elm$core$Basics$composeR = F3(
	function (f, g, x) {
		return g(
			f(x));
	});
var $elm$http$Http$expectStringResponse = F2(
	function (toMsg, toResult) {
		return A3(
			_Http_expect,
			'',
			$elm$core$Basics$identity,
			A2($elm$core$Basics$composeR, toResult, toMsg));
	});
var $elm$core$Result$mapError = F2(
	function (f, result) {
		if (!result.$) {
			var v = result.a;
			return $elm$core$Result$Ok(v);
		} else {
			var e = result.a;
			return $elm$core$Result$Err(
				f(e));
		}
	});
var $elm$http$Http$BadBody = function (a) {
	return {$: 4, a: a};
};
var $elm$http$Http$BadStatus = function (a) {
	return {$: 3, a: a};
};
var $elm$http$Http$BadUrl = function (a) {
	return {$: 0, a: a};
};
var $elm$http$Http$NetworkError = {$: 2};
var $elm$http$Http$Timeout = {$: 1};
var $elm$http$Http$resolve = F2(
	function (toResult, response) {
		switch (response.$) {
			case 0:
				var url = response.a;
				return $elm$core$Result$Err(
					$elm$http$Http$BadUrl(url));
			case 1:
				return $elm$core$Result$Err($elm$http$Http$Timeout);
			case 2:
				return $elm$core$Result$Err($elm$http$Http$NetworkError);
			case 3:
				var metadata = response.a;
				return $elm$core$Result$Err(
					$elm$http$Http$BadStatus(metadata.fF));
			default:
				var body = response.b;
				return A2(
					$elm$core$Result$mapError,
					$elm$http$Http$BadBody,
					toResult(body));
		}
	});
var $elm$http$Http$expectJson = F2(
	function (toMsg, decoder) {
		return A2(
			$elm$http$Http$expectStringResponse,
			toMsg,
			$elm$http$Http$resolve(
				function (string) {
					return A2(
						$elm$core$Result$mapError,
						$elm$json$Json$Decode$errorToString,
						A2($elm$json$Json$Decode$decodeString, decoder, string));
				}));
	});
var $elm$json$Json$Encode$object = function (pairs) {
	return _Json_wrap(
		A3(
			$elm$core$List$foldl,
			F2(
				function (_v0, obj) {
					var k = _v0.a;
					var v = _v0.b;
					return A3(_Json_addField, k, v, obj);
				}),
			_Json_emptyObject(0),
			pairs));
};
var $author$project$Api$Helpers$ObjectId$objectIdEncoder = function (id) {
	return $elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'id',
				$elm$json$Json$Encode$string(id))
			]));
};
var $elm$http$Http$Request = function (a) {
	return {$: 1, a: a};
};
var $elm$http$Http$State = F2(
	function (reqs, subs) {
		return {d3: reqs, ee: subs};
	});
var $elm$http$Http$init = $elm$core$Task$succeed(
	A2($elm$http$Http$State, $elm$core$Dict$empty, _List_Nil));
var $elm$core$Process$kill = _Scheduler_kill;
var $elm$core$Process$spawn = _Scheduler_spawn;
var $elm$http$Http$updateReqs = F3(
	function (router, cmds, reqs) {
		updateReqs:
		while (true) {
			if (!cmds.b) {
				return $elm$core$Task$succeed(reqs);
			} else {
				var cmd = cmds.a;
				var otherCmds = cmds.b;
				if (!cmd.$) {
					var tracker = cmd.a;
					var _v2 = A2($elm$core$Dict$get, tracker, reqs);
					if (_v2.$ === 1) {
						var $temp$router = router,
							$temp$cmds = otherCmds,
							$temp$reqs = reqs;
						router = $temp$router;
						cmds = $temp$cmds;
						reqs = $temp$reqs;
						continue updateReqs;
					} else {
						var pid = _v2.a;
						return A2(
							$elm$core$Task$andThen,
							function (_v3) {
								return A3(
									$elm$http$Http$updateReqs,
									router,
									otherCmds,
									A2($elm$core$Dict$remove, tracker, reqs));
							},
							$elm$core$Process$kill(pid));
					}
				} else {
					var req = cmd.a;
					return A2(
						$elm$core$Task$andThen,
						function (pid) {
							var _v4 = req.fQ;
							if (_v4.$ === 1) {
								return A3($elm$http$Http$updateReqs, router, otherCmds, reqs);
							} else {
								var tracker = _v4.a;
								return A3(
									$elm$http$Http$updateReqs,
									router,
									otherCmds,
									A3($elm$core$Dict$insert, tracker, pid, reqs));
							}
						},
						$elm$core$Process$spawn(
							A3(
								_Http_toTask,
								router,
								$elm$core$Platform$sendToApp(router),
								req)));
				}
			}
		}
	});
var $elm$http$Http$onEffects = F4(
	function (router, cmds, subs, state) {
		return A2(
			$elm$core$Task$andThen,
			function (reqs) {
				return $elm$core$Task$succeed(
					A2($elm$http$Http$State, reqs, subs));
			},
			A3($elm$http$Http$updateReqs, router, cmds, state.d3));
	});
var $elm$core$List$maybeCons = F3(
	function (f, mx, xs) {
		var _v0 = f(mx);
		if (!_v0.$) {
			var x = _v0.a;
			return A2($elm$core$List$cons, x, xs);
		} else {
			return xs;
		}
	});
var $elm$core$List$filterMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			$elm$core$List$maybeCons(f),
			_List_Nil,
			xs);
	});
var $elm$http$Http$maybeSend = F4(
	function (router, desiredTracker, progress, _v0) {
		var actualTracker = _v0.a;
		var toMsg = _v0.b;
		return _Utils_eq(desiredTracker, actualTracker) ? $elm$core$Maybe$Just(
			A2(
				$elm$core$Platform$sendToApp,
				router,
				toMsg(progress))) : $elm$core$Maybe$Nothing;
	});
var $elm$http$Http$onSelfMsg = F3(
	function (router, _v0, state) {
		var tracker = _v0.a;
		var progress = _v0.b;
		return A2(
			$elm$core$Task$andThen,
			function (_v1) {
				return $elm$core$Task$succeed(state);
			},
			$elm$core$Task$sequence(
				A2(
					$elm$core$List$filterMap,
					A3($elm$http$Http$maybeSend, router, tracker, progress),
					state.ee)));
	});
var $elm$http$Http$Cancel = function (a) {
	return {$: 0, a: a};
};
var $elm$http$Http$cmdMap = F2(
	function (func, cmd) {
		if (!cmd.$) {
			var tracker = cmd.a;
			return $elm$http$Http$Cancel(tracker);
		} else {
			var r = cmd.a;
			return $elm$http$Http$Request(
				{
					ew: r.ew,
					eC: r.eC,
					e_: A2(_Http_mapExpect, func, r.e_),
					e6: r.e6,
					fl: r.fl,
					fN: r.fN,
					fQ: r.fQ,
					fT: r.fT
				});
		}
	});
var $elm$http$Http$MySub = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $elm$http$Http$subMap = F2(
	function (func, _v0) {
		var tracker = _v0.a;
		var toMsg = _v0.b;
		return A2(
			$elm$http$Http$MySub,
			tracker,
			A2($elm$core$Basics$composeR, toMsg, func));
	});
_Platform_effectManagers['Http'] = _Platform_createManager($elm$http$Http$init, $elm$http$Http$onEffects, $elm$http$Http$onSelfMsg, $elm$http$Http$cmdMap, $elm$http$Http$subMap);
var $elm$http$Http$command = _Platform_leaf('Http');
var $elm$http$Http$subscription = _Platform_leaf('Http');
var $elm$http$Http$request = function (r) {
	return $elm$http$Http$command(
		$elm$http$Http$Request(
			{ew: false, eC: r.eC, e_: r.e_, e6: r.e6, fl: r.fl, fN: r.fN, fQ: r.fQ, fT: r.fT}));
};
var $elm$http$Http$stringBody = _Http_pair;
var $author$project$Api$GetOrderInfo$dispatch = F3(
	function (baseApiUrl, id, msg) {
		var jsonPayload = A2(
			$elm$json$Json$Encode$encode,
			0,
			$author$project$Api$Helpers$ObjectId$objectIdEncoder(id));
		var request = $elm$http$Http$request(
			{
				eC: A2($elm$http$Http$stringBody, 'application/json', jsonPayload),
				e_: A2($elm$http$Http$expectJson, msg, $author$project$Api$GetOrderInfo$decoder),
				e6: _List_Nil,
				fl: 'POST',
				fN: $elm$core$Maybe$Nothing,
				fQ: $elm$core$Maybe$Nothing,
				fT: baseApiUrl + 'get-order-info'
			});
		return request;
	});
var $author$project$Pages$PaymentSuccess$emptyModel = {bN: $elm$core$Maybe$Nothing};
var $author$project$Pages$PaymentSuccess$init = function (shared) {
	return (shared.eN === '') ? _Utils_Tuple2(
		$author$project$Pages$PaymentSuccess$emptyModel,
		A2($elm$browser$Browser$Navigation$pushUrl, shared.fo, '/order-tickets/')) : _Utils_Tuple2(
		$author$project$Pages$PaymentSuccess$emptyModel,
		A3($author$project$Api$GetOrderInfo$dispatch, shared.eB, shared.eN, $author$project$Pages$PaymentSuccess$OrderInfoLoaded));
};
var $author$project$Pages$TeesAndCees$init = '# Algemene Voorwaarden\r\n\r\n## 1. Inleiding\r\n\r\nWelkom bij Pequivents (de "Website"). Deze Algemene Voorwaarden zijn van toepassing op uw gebruik van de Website en de aankoop van tickets via de Website. Door toegang te krijgen tot of gebruik te maken van de Website, gaat u akkoord met deze Voorwaarden. Als u niet akkoord gaat met deze Voorwaarden, mag u de Website niet gebruiken.\r\n\r\n## 2. Definities\r\n\r\n- **"Wij," "Ons," "Onze"** verwijst naar [Uw Bedrijfsnaam], de eigenaar en exploitant van de Website.\r\n- **"U," "Uw"** verwijst naar de persoon of entiteit die toegang heeft tot of gebruik maakt van de Website.\r\n- **"Evenement"** verwijst naar het evenement waarvoor tickets worden verkocht via de Website.\r\n- **"Ticket"** verwijst naar de licentie om een Evenement bij te wonen, gekocht via de Website.\r\n\r\n## 3. Gebruik van de Website\r\n\r\n### 3.1 Geschiktheid\r\n\r\nDoor gebruik te maken van de Website, verklaart u dat u ten minste 18 jaar oud bent of de toestemming van een wettelijke voogd heeft.\r\n\r\n### 3.2 Account Aanmaken\r\n\r\nOm tickets te kopen, moet u mogelijk een account aanmaken op de Website. U stemt ermee in om nauwkeurige en volledige informatie te verstrekken tijdens de registratie en om uw accountinformatie up-to-date te houden.\r\n\r\n### 3.3 Verboden Activiteiten\r\n\r\nU stemt ermee in de Website niet te gebruiken voor enig onwettig doel of op een manier die ons, andere gebruikers of de Evenementorganisatoren zou kunnen schaden. Dit omvat, maar is niet beperkt tot, het doorverkopen van tickets, het gebruik van bots om tickets te kopen, of het deelnemen aan frauduleuze activiteiten.\r\n\r\n## 4. Ticket Aankoop\r\n\r\n### 4.1 Prijzen en Beschikbaarheid\r\n\r\nTicketprijzen zijn zoals vermeld op de Website. We behouden ons het recht voor om prijzen op elk moment zonder voorafgaande kennisgeving te wijzigen. Tickets zijn onder voorbehoud van beschikbaarheid, en we garanderen niet dat tickets op elk moment beschikbaar zullen zijn voor aankoop.\r\n\r\n### 4.2 Betaling\r\n\r\nAlle ticketaankopen moeten volledig worden betaald op het moment van aankoop. We accepteren betaalmethoden zoals vermeld op de Website. Door betalingsinformatie te verstrekken, verklaart en garandeert u dat u wettelijk recht hebt om de betaalmethode te gebruiken.\r\n\r\n### 4.3 Orderbevestiging\r\n\r\nZodra uw bestelling succesvol is geplaatst, ontvangt u een orderbevestiging via e-mail. Controleer uw spam- of ongewenste e-mailmap als u de bevestiging niet ontvangt.\r\n\r\n### 4.4 Ticketlevering\r\n\r\nTickets worden elektronisch geleverd naar het e-mailadres dat tijdens de aankoop is opgegeven of beschikbaar gesteld voor download in uw accountdashboard.\r\n\r\n## 5. Restituties en Ruilingen\r\n\r\n### 5.1 Geen Restituties\r\n\r\nAlle ticketverkopen zijn definitief, en we bieden geen restituties of ruilingen aan, tenzij het Evenement wordt geannuleerd, uitgesteld of verplaatst door de Evenementorganisator.\r\n\r\n### 5.2 Annulering van het Evenement\r\n\r\nIn geval van annulering, uitstel, of significante wijziging van het Evenement, zullen we proberen u zo snel mogelijk op de hoogte te stellen. Restituties of ruilingen voor geannuleerde of verplaatste Evenementen worden aangeboden in overeenstemming met het beleid van de Evenementorganisator.\r\n\r\n## 6. Toegang tot het Evenement\r\n\r\n### 6.1 Toelatingsvereisten\r\n\r\nU moet een geldig ticket tonen om toegang te krijgen tot het Evenement. De Evenementorganisator behoudt zich het recht voor om elke persoon zonder restitutie de toegang te weigeren.\r\n\r\n### 6.2 Gedrag op het Evenement\r\n\r\nU stemt ermee in om alle regels en voorschriften van het Evenement na te leven, inclusief die met betrekking tot gedrag, veiligheid en beveiliging. Het niet naleven van deze regels kan resulteren in uw verwijdering van het Evenement zonder restitutie.\r\n\r\n## 7. Intellectueel Eigendom\r\n\r\n### 7.1 Website Inhoud\r\n\r\nAlle inhoud op de Website, inclusief tekst, afbeeldingen, logo\'s en afbeeldingen, is eigendom van [Uw Bedrijfsnaam] of haar licentiegevers en is beschermd door intellectuele eigendomswetten.\r\n\r\n### 7.2 Beperkte Licentie\r\n\r\nU krijgt een beperkte, niet-exclusieve, niet-overdraagbare licentie om toegang te krijgen tot en gebruik te maken van de Website voor persoonlijke, niet-commerciële doeleinden.\r\n\r\n## 8. Afwijzing van Garanties\r\n\r\nDe Website en alle via de Website verkochte tickets worden geleverd "zoals ze zijn" en "zoals beschikbaar" zonder enige vorm van garanties, expliciet of impliciet. We garanderen niet dat de Website foutloos, veilig of vrij van virussen zal zijn.\r\n\r\n## 9. Beperking van Aansprakelijkheid\r\n\r\nVoor zover maximaal toegestaan door de wet, zullen [Uw Bedrijfsnaam] en haar gelieerde ondernemingen niet aansprakelijk zijn voor enige indirecte, incidentele, speciale, gevolg- of bestraffende schade voortvloeiend uit of gerelateerd aan uw gebruik van de Website of uw deelname aan een Evenement.\r\n\r\n## 10. Vrijwaring\r\n\r\nU stemt ermee in [Uw Bedrijfsnaam] en haar gelieerde ondernemingen te vrijwaren en schadeloos te stellen van enige claims, verliezen, schade, aansprakelijkheden, inclusief juridische kosten, voortvloeiend uit uw gebruik van de Website of schending van deze Voorwaarden.\r\n\r\n## 11. Toepasselijk Recht\r\n\r\nDeze Voorwaarden en eventuele geschillen voortvloeiend uit uw gebruik van de Website worden beheerst door en geïnterpreteerd in overeenstemming met de wetten van [Uw Jurisdictie], zonder rekening te houden met conflicten van rechtsprincipes.\r\n\r\n## 12. Wijzigingen in de Voorwaarden\r\n\r\nWe behouden ons het recht voor om deze Voorwaarden op elk moment te wijzigen. Wijzigingen worden onmiddellijk van kracht na plaatsing op de Website. Uw voortgezet gebruik van de Website na plaatsing van wijzigingen houdt in dat u akkoord gaat met de gewijzigde Voorwaarden.\r\n\r\n## 13. Contactinformatie\r\n\r\nAls u vragen heeft over deze Voorwaarden, kunt u contact met ons opnemen via: kilfour@gmail.com\r\n\r\n';
var $author$project$Pages$Tickets$OrderInfoLoaded = function (a) {
	return {$: 1, a: a};
};
var $elm$core$List$drop = F2(
	function (n, list) {
		drop:
		while (true) {
			if (n <= 0) {
				return list;
			} else {
				if (!list.b) {
					return list;
				} else {
					var x = list.a;
					var xs = list.b;
					var $temp$n = n - 1,
						$temp$list = xs;
					n = $temp$n;
					list = $temp$list;
					continue drop;
				}
			}
		}
	});
var $elm$core$List$head = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return $elm$core$Maybe$Just(x);
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $elm$core$Maybe$withDefault = F2(
	function (_default, maybe) {
		if (!maybe.$) {
			var value = maybe.a;
			return value;
		} else {
			return _default;
		}
	});
var $author$project$Pages$Tickets$init = F2(
	function (shared, info) {
		var split = A2($elm$core$String$split, '-', info);
		var id = A2(
			$elm$core$Maybe$withDefault,
			'',
			$elm$core$List$head(split));
		var code = A2(
			$elm$core$Maybe$withDefault,
			'',
			$elm$core$List$head(
				A2($elm$core$List$drop, 1, split)));
		return _Utils_Tuple2(
			{eI: code, dv: id, bI: true, bN: $elm$core$Maybe$Nothing},
			A3($author$project$Api$GetOrderInfo$dispatch, shared.eB, id, $author$project$Pages$Tickets$OrderInfoLoaded));
	});
var $elm$core$Platform$Cmd$map = _Platform_map;
var $author$project$Routes$changeRouteTo = F2(
	function (route, model) {
		switch (route.$) {
			case 0:
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{aP: $author$project$Helmsman$NotFound}),
					$elm$core$Platform$Cmd$none);
			case 1:
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{aP: $author$project$Helmsman$SplashPage}),
					$elm$core$Platform$Cmd$none);
			case 2:
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							aP: $author$project$Helmsman$HomePage($author$project$Pages$Home$init)
						}),
					$elm$core$Platform$Cmd$none);
			case 3:
				var _v1 = $author$project$Pages$OrderTickets$init(model.B);
				var page = _v1.a;
				var cmd = _v1.b;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							aP: $author$project$Helmsman$OrderTicketsPage(page)
						}),
					A2($elm$core$Platform$Cmd$map, $author$project$Helmsman$OrderTicketsMsg, cmd));
			case 4:
				var _v2 = $author$project$Pages$OrderTicketsTemp$init(model.B);
				var page = _v2.a;
				var cmd = _v2.b;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							aP: $author$project$Helmsman$OrderTicketsTempPage(page)
						}),
					A2($elm$core$Platform$Cmd$map, $author$project$Helmsman$OrderTicketsTempMsg, cmd));
			case 5:
				var _v3 = $author$project$Pages$Payment$init(model.B);
				var page = _v3.a;
				var cmd = _v3.b;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							aP: $author$project$Helmsman$PaymentPage(page)
						}),
					A2($elm$core$Platform$Cmd$map, $author$project$Helmsman$PaymentMsg, cmd));
			case 6:
				var _v4 = $author$project$Pages$PaymentSuccess$init(model.B);
				var page = _v4.a;
				var cmd = _v4.b;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							aP: $author$project$Helmsman$PaymentSuccessPage(page)
						}),
					A2($elm$core$Platform$Cmd$map, $author$project$Helmsman$PaymentSuccessMsg, cmd));
			case 7:
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							aP: $author$project$Helmsman$TeesAndCeesPage($author$project$Pages$TeesAndCees$init)
						}),
					$elm$core$Platform$Cmd$none);
			case 8:
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							aP: $author$project$Helmsman$InvoiceInfoPage($author$project$Pages$InvoiceInfo$init)
						}),
					$elm$core$Platform$Cmd$none);
			default:
				var info = route.a;
				var _v5 = A2($author$project$Pages$Tickets$init, model.B, info);
				var page = _v5.a;
				var cmd = _v5.b;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							aP: $author$project$Helmsman$TicketsPage(page)
						}),
					A2($elm$core$Platform$Cmd$map, $author$project$Helmsman$TicketsMsg, cmd));
		}
	});
var $elm$core$Basics$composeL = F3(
	function (g, f, x) {
		return g(
			f(x));
	});
var $author$project$Routes$NotFound = {$: 0};
var $elm$url$Url$Parser$State = F5(
	function (visited, unvisited, params, frag, value) {
		return {ai: frag, am: params, ad: unvisited, S: value, au: visited};
	});
var $elm$url$Url$Parser$getFirstMatch = function (states) {
	getFirstMatch:
	while (true) {
		if (!states.b) {
			return $elm$core$Maybe$Nothing;
		} else {
			var state = states.a;
			var rest = states.b;
			var _v1 = state.ad;
			if (!_v1.b) {
				return $elm$core$Maybe$Just(state.S);
			} else {
				if ((_v1.a === '') && (!_v1.b.b)) {
					return $elm$core$Maybe$Just(state.S);
				} else {
					var $temp$states = rest;
					states = $temp$states;
					continue getFirstMatch;
				}
			}
		}
	}
};
var $elm$url$Url$Parser$removeFinalEmpty = function (segments) {
	if (!segments.b) {
		return _List_Nil;
	} else {
		if ((segments.a === '') && (!segments.b.b)) {
			return _List_Nil;
		} else {
			var segment = segments.a;
			var rest = segments.b;
			return A2(
				$elm$core$List$cons,
				segment,
				$elm$url$Url$Parser$removeFinalEmpty(rest));
		}
	}
};
var $elm$url$Url$Parser$preparePath = function (path) {
	var _v0 = A2($elm$core$String$split, '/', path);
	if (_v0.b && (_v0.a === '')) {
		var segments = _v0.b;
		return $elm$url$Url$Parser$removeFinalEmpty(segments);
	} else {
		var segments = _v0;
		return $elm$url$Url$Parser$removeFinalEmpty(segments);
	}
};
var $elm$url$Url$Parser$addToParametersHelp = F2(
	function (value, maybeList) {
		if (maybeList.$ === 1) {
			return $elm$core$Maybe$Just(
				_List_fromArray(
					[value]));
		} else {
			var list = maybeList.a;
			return $elm$core$Maybe$Just(
				A2($elm$core$List$cons, value, list));
		}
	});
var $elm$url$Url$percentDecode = _Url_percentDecode;
var $elm$url$Url$Parser$addParam = F2(
	function (segment, dict) {
		var _v0 = A2($elm$core$String$split, '=', segment);
		if ((_v0.b && _v0.b.b) && (!_v0.b.b.b)) {
			var rawKey = _v0.a;
			var _v1 = _v0.b;
			var rawValue = _v1.a;
			var _v2 = $elm$url$Url$percentDecode(rawKey);
			if (_v2.$ === 1) {
				return dict;
			} else {
				var key = _v2.a;
				var _v3 = $elm$url$Url$percentDecode(rawValue);
				if (_v3.$ === 1) {
					return dict;
				} else {
					var value = _v3.a;
					return A3(
						$elm$core$Dict$update,
						key,
						$elm$url$Url$Parser$addToParametersHelp(value),
						dict);
				}
			}
		} else {
			return dict;
		}
	});
var $elm$url$Url$Parser$prepareQuery = function (maybeQuery) {
	if (maybeQuery.$ === 1) {
		return $elm$core$Dict$empty;
	} else {
		var qry = maybeQuery.a;
		return A3(
			$elm$core$List$foldr,
			$elm$url$Url$Parser$addParam,
			$elm$core$Dict$empty,
			A2($elm$core$String$split, '&', qry));
	}
};
var $elm$url$Url$Parser$parse = F2(
	function (_v0, url) {
		var parser = _v0;
		return $elm$url$Url$Parser$getFirstMatch(
			parser(
				A5(
					$elm$url$Url$Parser$State,
					_List_Nil,
					$elm$url$Url$Parser$preparePath(url.dT),
					$elm$url$Url$Parser$prepareQuery(url.d$),
					url.dp,
					$elm$core$Basics$identity)));
	});
var $author$project$Routes$Home = {$: 2};
var $author$project$Routes$InvoiceInfo = {$: 8};
var $author$project$Routes$OrderTickets = {$: 3};
var $author$project$Routes$OrderTicketsTemp = {$: 4};
var $author$project$Routes$Payment = {$: 5};
var $author$project$Routes$PaymentSuccess = {$: 6};
var $author$project$Routes$TeesAndCees = {$: 7};
var $author$project$Routes$Tickets = function (a) {
	return {$: 9, a: a};
};
var $elm$url$Url$Parser$Parser = $elm$core$Basics$identity;
var $elm$url$Url$Parser$mapState = F2(
	function (func, _v0) {
		var visited = _v0.au;
		var unvisited = _v0.ad;
		var params = _v0.am;
		var frag = _v0.ai;
		var value = _v0.S;
		return A5(
			$elm$url$Url$Parser$State,
			visited,
			unvisited,
			params,
			frag,
			func(value));
	});
var $elm$url$Url$Parser$map = F2(
	function (subValue, _v0) {
		var parseArg = _v0;
		return function (_v1) {
			var visited = _v1.au;
			var unvisited = _v1.ad;
			var params = _v1.am;
			var frag = _v1.ai;
			var value = _v1.S;
			return A2(
				$elm$core$List$map,
				$elm$url$Url$Parser$mapState(value),
				parseArg(
					A5($elm$url$Url$Parser$State, visited, unvisited, params, frag, subValue)));
		};
	});
var $elm$core$List$append = F2(
	function (xs, ys) {
		if (!ys.b) {
			return xs;
		} else {
			return A3($elm$core$List$foldr, $elm$core$List$cons, ys, xs);
		}
	});
var $elm$core$List$concat = function (lists) {
	return A3($elm$core$List$foldr, $elm$core$List$append, _List_Nil, lists);
};
var $elm$core$List$concatMap = F2(
	function (f, list) {
		return $elm$core$List$concat(
			A2($elm$core$List$map, f, list));
	});
var $elm$url$Url$Parser$oneOf = function (parsers) {
	return function (state) {
		return A2(
			$elm$core$List$concatMap,
			function (_v0) {
				var parser = _v0;
				return parser(state);
			},
			parsers);
	};
};
var $elm$url$Url$Parser$s = function (str) {
	return function (_v0) {
		var visited = _v0.au;
		var unvisited = _v0.ad;
		var params = _v0.am;
		var frag = _v0.ai;
		var value = _v0.S;
		if (!unvisited.b) {
			return _List_Nil;
		} else {
			var next = unvisited.a;
			var rest = unvisited.b;
			return _Utils_eq(next, str) ? _List_fromArray(
				[
					A5(
					$elm$url$Url$Parser$State,
					A2($elm$core$List$cons, next, visited),
					rest,
					params,
					frag,
					value)
				]) : _List_Nil;
		}
	};
};
var $elm$url$Url$Parser$slash = F2(
	function (_v0, _v1) {
		var parseBefore = _v0;
		var parseAfter = _v1;
		return function (state) {
			return A2(
				$elm$core$List$concatMap,
				parseAfter,
				parseBefore(state));
		};
	});
var $elm$url$Url$Parser$custom = F2(
	function (tipe, stringToSomething) {
		return function (_v0) {
			var visited = _v0.au;
			var unvisited = _v0.ad;
			var params = _v0.am;
			var frag = _v0.ai;
			var value = _v0.S;
			if (!unvisited.b) {
				return _List_Nil;
			} else {
				var next = unvisited.a;
				var rest = unvisited.b;
				var _v2 = stringToSomething(next);
				if (!_v2.$) {
					var nextValue = _v2.a;
					return _List_fromArray(
						[
							A5(
							$elm$url$Url$Parser$State,
							A2($elm$core$List$cons, next, visited),
							rest,
							params,
							frag,
							value(nextValue))
						]);
				} else {
					return _List_Nil;
				}
			}
		};
	});
var $elm$url$Url$Parser$string = A2($elm$url$Url$Parser$custom, 'STRING', $elm$core$Maybe$Just);
var $elm$url$Url$Parser$top = function (state) {
	return _List_fromArray(
		[state]);
};
var $author$project$Routes$parser = $elm$url$Url$Parser$oneOf(
	_List_fromArray(
		[
			A2($elm$url$Url$Parser$map, $author$project$Routes$Home, $elm$url$Url$Parser$top),
			A2(
			$elm$url$Url$Parser$map,
			$author$project$Routes$Home,
			$elm$url$Url$Parser$s('home')),
			A2(
			$elm$url$Url$Parser$map,
			$author$project$Routes$OrderTickets,
			$elm$url$Url$Parser$s('order-tickets')),
			A2(
			$elm$url$Url$Parser$map,
			$author$project$Routes$OrderTicketsTemp,
			$elm$url$Url$Parser$s('order-tickets-temp')),
			A2(
			$elm$url$Url$Parser$map,
			$author$project$Routes$Payment,
			$elm$url$Url$Parser$s('payment')),
			A2(
			$elm$url$Url$Parser$map,
			$author$project$Routes$PaymentSuccess,
			$elm$url$Url$Parser$s('payment-success')),
			A2(
			$elm$url$Url$Parser$map,
			$author$project$Routes$TeesAndCees,
			$elm$url$Url$Parser$s('tees-and-cees')),
			A2(
			$elm$url$Url$Parser$map,
			$author$project$Routes$InvoiceInfo,
			$elm$url$Url$Parser$s('invoice-info')),
			A2(
			$elm$url$Url$Parser$map,
			$author$project$Routes$Tickets,
			A2(
				$elm$url$Url$Parser$slash,
				$elm$url$Url$Parser$s('tickets'),
				$elm$url$Url$Parser$string))
		]));
var $author$project$Routes$fromUrl = function (url) {
	return A2(
		$elm$core$Maybe$withDefault,
		$author$project$Routes$NotFound,
		A2($elm$url$Url$Parser$parse, $author$project$Routes$parser, url));
};
var $author$project$Routes$changeRouteToFromUrl = A2($elm$core$Basics$composeL, $author$project$Routes$changeRouteTo, $author$project$Routes$fromUrl);
var $author$project$Helmsman$init = $author$project$Helmsman$SplashPage;
var $author$project$Shared$Desktop = 1;
var $author$project$Shared$GotViewport = function (a) {
	return {$: 0, a: a};
};
var $elm$browser$Browser$Dom$getViewport = _Browser_withWindow(_Browser_getViewport);
var $author$project$Shared$init = F2(
	function (baseApiUrl, navKey) {
		return _Utils_Tuple2(
			{eB: baseApiUrl, c9: '', eN: '', a6: 0, eT: 1, eZ: $elm$core$Maybe$Nothing, fo: navKey, cA: false},
			$elm$core$Platform$Cmd$batch(
				_List_fromArray(
					[
						A2($elm$core$Task$perform, $author$project$Shared$GotViewport, $elm$browser$Browser$Dom$getViewport)
					])));
	});
var $author$project$App$init = F3(
	function (baseApiUrl, url, key) {
		var _v0 = A2($author$project$Shared$init, baseApiUrl, key);
		var shared = _v0.a;
		var sharedCmd = _v0.b;
		var _v1 = A2(
			$author$project$Routes$changeRouteToFromUrl,
			url,
			{aP: $author$project$Helmsman$init, B: shared});
		var model = _v1.a;
		var helmsmanCmd = _v1.b;
		return _Utils_Tuple2(
			model,
			$elm$core$Platform$Cmd$batch(
				_List_fromArray(
					[
						A2($elm$core$Platform$Cmd$map, $author$project$App$HelmsmanMsg, helmsmanCmd),
						A2($elm$core$Platform$Cmd$map, $author$project$App$SharedMsg, sharedCmd)
					])));
	});
var $elm$core$Platform$Sub$map = _Platform_map;
var $elm$core$Platform$Sub$none = $elm$core$Platform$Sub$batch(_List_Nil);
var $author$project$Pages$Payment$SumUpBodyStatusOk = function (a) {
	return {$: 2, a: a};
};
var $author$project$Pages$Payment$SumUpFailed = function (a) {
	return {$: 3, a: a};
};
var $author$project$Pages$Payment$WidgetMounted = function (a) {
	return {$: 1, a: a};
};
var $elm$json$Json$Decode$bool = _Json_decodeBool;
var $author$project$Pages$Payment$sumUpBodyStatusOk = _Platform_incomingPort('sumUpBodyStatusOk', $elm$json$Json$Decode$bool);
var $elm$json$Json$Decode$andThen = _Json_andThen;
var $author$project$Pages$Payment$sumUpFailure = _Platform_incomingPort(
	'sumUpFailure',
	A2(
		$elm$json$Json$Decode$andThen,
		function (failureType) {
			return A2(
				$elm$json$Json$Decode$andThen,
				function (body) {
					return $elm$json$Json$Decode$succeed(
						{eC: body, ck: failureType});
				},
				A2($elm$json$Json$Decode$field, 'body', $elm$json$Json$Decode$string));
		},
		A2($elm$json$Json$Decode$field, 'failureType', $elm$json$Json$Decode$string)));
var $author$project$Pages$Payment$widgetMounted = _Platform_incomingPort('widgetMounted', $elm$json$Json$Decode$bool);
var $author$project$Pages$Payment$subscriptions = function (_v0) {
	return $elm$core$Platform$Sub$batch(
		_List_fromArray(
			[
				$author$project$Pages$Payment$widgetMounted($author$project$Pages$Payment$WidgetMounted),
				$author$project$Pages$Payment$sumUpBodyStatusOk($author$project$Pages$Payment$SumUpBodyStatusOk),
				$author$project$Pages$Payment$sumUpFailure($author$project$Pages$Payment$SumUpFailed)
			]));
};
var $author$project$Helmsman$subscriptions = function (model) {
	if (model.$ === 5) {
		var page = model.a;
		return A2(
			$elm$core$Platform$Sub$map,
			$author$project$Helmsman$PaymentMsg,
			$author$project$Pages$Payment$subscriptions(page));
	} else {
		return $elm$core$Platform$Sub$none;
	}
};
var $author$project$Shared$OnResize = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var $elm$browser$Browser$Events$Window = 1;
var $elm$json$Json$Decode$int = _Json_decodeInt;
var $elm$browser$Browser$Events$MySub = F3(
	function (a, b, c) {
		return {$: 0, a: a, b: b, c: c};
	});
var $elm$browser$Browser$Events$State = F2(
	function (subs, pids) {
		return {dU: pids, ee: subs};
	});
var $elm$browser$Browser$Events$init = $elm$core$Task$succeed(
	A2($elm$browser$Browser$Events$State, _List_Nil, $elm$core$Dict$empty));
var $elm$browser$Browser$Events$nodeToKey = function (node) {
	if (!node) {
		return 'd_';
	} else {
		return 'w_';
	}
};
var $elm$browser$Browser$Events$addKey = function (sub) {
	var node = sub.a;
	var name = sub.b;
	return _Utils_Tuple2(
		_Utils_ap(
			$elm$browser$Browser$Events$nodeToKey(node),
			name),
		sub);
};
var $elm$core$Dict$fromList = function (assocs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, dict) {
				var key = _v0.a;
				var value = _v0.b;
				return A3($elm$core$Dict$insert, key, value, dict);
			}),
		$elm$core$Dict$empty,
		assocs);
};
var $elm$core$Dict$foldl = F3(
	function (func, acc, dict) {
		foldl:
		while (true) {
			if (dict.$ === -2) {
				return acc;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($elm$core$Dict$foldl, func, acc, left)),
					$temp$dict = right;
				func = $temp$func;
				acc = $temp$acc;
				dict = $temp$dict;
				continue foldl;
			}
		}
	});
var $elm$core$Dict$merge = F6(
	function (leftStep, bothStep, rightStep, leftDict, rightDict, initialResult) {
		var stepState = F3(
			function (rKey, rValue, _v0) {
				stepState:
				while (true) {
					var list = _v0.a;
					var result = _v0.b;
					if (!list.b) {
						return _Utils_Tuple2(
							list,
							A3(rightStep, rKey, rValue, result));
					} else {
						var _v2 = list.a;
						var lKey = _v2.a;
						var lValue = _v2.b;
						var rest = list.b;
						if (_Utils_cmp(lKey, rKey) < 0) {
							var $temp$rKey = rKey,
								$temp$rValue = rValue,
								$temp$_v0 = _Utils_Tuple2(
								rest,
								A3(leftStep, lKey, lValue, result));
							rKey = $temp$rKey;
							rValue = $temp$rValue;
							_v0 = $temp$_v0;
							continue stepState;
						} else {
							if (_Utils_cmp(lKey, rKey) > 0) {
								return _Utils_Tuple2(
									list,
									A3(rightStep, rKey, rValue, result));
							} else {
								return _Utils_Tuple2(
									rest,
									A4(bothStep, lKey, lValue, rValue, result));
							}
						}
					}
				}
			});
		var _v3 = A3(
			$elm$core$Dict$foldl,
			stepState,
			_Utils_Tuple2(
				$elm$core$Dict$toList(leftDict),
				initialResult),
			rightDict);
		var leftovers = _v3.a;
		var intermediateResult = _v3.b;
		return A3(
			$elm$core$List$foldl,
			F2(
				function (_v4, result) {
					var k = _v4.a;
					var v = _v4.b;
					return A3(leftStep, k, v, result);
				}),
			intermediateResult,
			leftovers);
	});
var $elm$browser$Browser$Events$Event = F2(
	function (key, event) {
		return {dh: event, dE: key};
	});
var $elm$browser$Browser$Events$spawn = F3(
	function (router, key, _v0) {
		var node = _v0.a;
		var name = _v0.b;
		var actualNode = function () {
			if (!node) {
				return _Browser_doc;
			} else {
				return _Browser_window;
			}
		}();
		return A2(
			$elm$core$Task$map,
			function (value) {
				return _Utils_Tuple2(key, value);
			},
			A3(
				_Browser_on,
				actualNode,
				name,
				function (event) {
					return A2(
						$elm$core$Platform$sendToSelf,
						router,
						A2($elm$browser$Browser$Events$Event, key, event));
				}));
	});
var $elm$core$Dict$union = F2(
	function (t1, t2) {
		return A3($elm$core$Dict$foldl, $elm$core$Dict$insert, t2, t1);
	});
var $elm$browser$Browser$Events$onEffects = F3(
	function (router, subs, state) {
		var stepRight = F3(
			function (key, sub, _v6) {
				var deads = _v6.a;
				var lives = _v6.b;
				var news = _v6.c;
				return _Utils_Tuple3(
					deads,
					lives,
					A2(
						$elm$core$List$cons,
						A3($elm$browser$Browser$Events$spawn, router, key, sub),
						news));
			});
		var stepLeft = F3(
			function (_v4, pid, _v5) {
				var deads = _v5.a;
				var lives = _v5.b;
				var news = _v5.c;
				return _Utils_Tuple3(
					A2($elm$core$List$cons, pid, deads),
					lives,
					news);
			});
		var stepBoth = F4(
			function (key, pid, _v2, _v3) {
				var deads = _v3.a;
				var lives = _v3.b;
				var news = _v3.c;
				return _Utils_Tuple3(
					deads,
					A3($elm$core$Dict$insert, key, pid, lives),
					news);
			});
		var newSubs = A2($elm$core$List$map, $elm$browser$Browser$Events$addKey, subs);
		var _v0 = A6(
			$elm$core$Dict$merge,
			stepLeft,
			stepBoth,
			stepRight,
			state.dU,
			$elm$core$Dict$fromList(newSubs),
			_Utils_Tuple3(_List_Nil, $elm$core$Dict$empty, _List_Nil));
		var deadPids = _v0.a;
		var livePids = _v0.b;
		var makeNewPids = _v0.c;
		return A2(
			$elm$core$Task$andThen,
			function (pids) {
				return $elm$core$Task$succeed(
					A2(
						$elm$browser$Browser$Events$State,
						newSubs,
						A2(
							$elm$core$Dict$union,
							livePids,
							$elm$core$Dict$fromList(pids))));
			},
			A2(
				$elm$core$Task$andThen,
				function (_v1) {
					return $elm$core$Task$sequence(makeNewPids);
				},
				$elm$core$Task$sequence(
					A2($elm$core$List$map, $elm$core$Process$kill, deadPids))));
	});
var $elm$browser$Browser$Events$onSelfMsg = F3(
	function (router, _v0, state) {
		var key = _v0.dE;
		var event = _v0.dh;
		var toMessage = function (_v2) {
			var subKey = _v2.a;
			var _v3 = _v2.b;
			var node = _v3.a;
			var name = _v3.b;
			var decoder = _v3.c;
			return _Utils_eq(subKey, key) ? A2(_Browser_decodeEvent, decoder, event) : $elm$core$Maybe$Nothing;
		};
		var messages = A2($elm$core$List$filterMap, toMessage, state.ee);
		return A2(
			$elm$core$Task$andThen,
			function (_v1) {
				return $elm$core$Task$succeed(state);
			},
			$elm$core$Task$sequence(
				A2(
					$elm$core$List$map,
					$elm$core$Platform$sendToApp(router),
					messages)));
	});
var $elm$browser$Browser$Events$subMap = F2(
	function (func, _v0) {
		var node = _v0.a;
		var name = _v0.b;
		var decoder = _v0.c;
		return A3(
			$elm$browser$Browser$Events$MySub,
			node,
			name,
			A2($elm$json$Json$Decode$map, func, decoder));
	});
_Platform_effectManagers['Browser.Events'] = _Platform_createManager($elm$browser$Browser$Events$init, $elm$browser$Browser$Events$onEffects, $elm$browser$Browser$Events$onSelfMsg, 0, $elm$browser$Browser$Events$subMap);
var $elm$browser$Browser$Events$subscription = _Platform_leaf('Browser.Events');
var $elm$browser$Browser$Events$on = F3(
	function (node, name, decoder) {
		return $elm$browser$Browser$Events$subscription(
			A3($elm$browser$Browser$Events$MySub, node, name, decoder));
	});
var $elm$browser$Browser$Events$onResize = function (func) {
	return A3(
		$elm$browser$Browser$Events$on,
		1,
		'resize',
		A2(
			$elm$json$Json$Decode$field,
			'target',
			A3(
				$elm$json$Json$Decode$map2,
				func,
				A2($elm$json$Json$Decode$field, 'innerWidth', $elm$json$Json$Decode$int),
				A2($elm$json$Json$Decode$field, 'innerHeight', $elm$json$Json$Decode$int))));
};
var $author$project$Shared$subscriptions = function (_v0) {
	return $elm$browser$Browser$Events$onResize(
		F2(
			function (w, h) {
				return A2($author$project$Shared$OnResize, w, h);
			}));
};
var $rtfeldman$elm_css$VirtualDom$Styled$UnscopedStyles = function (a) {
	return {$: 0, a: a};
};
var $elm$core$String$cons = _String_cons;
var $robinheghan$murmur3$Murmur3$HashData = F4(
	function (shift, seed, hash, charsProcessed) {
		return {aC: charsProcessed, aN: hash, ap: seed, aW: shift};
	});
var $robinheghan$murmur3$Murmur3$c1 = 3432918353;
var $robinheghan$murmur3$Murmur3$c2 = 461845907;
var $elm$core$Bitwise$and = _Bitwise_and;
var $elm$core$Bitwise$shiftLeftBy = _Bitwise_shiftLeftBy;
var $elm$core$Bitwise$shiftRightZfBy = _Bitwise_shiftRightZfBy;
var $robinheghan$murmur3$Murmur3$multiplyBy = F2(
	function (b, a) {
		return ((a & 65535) * b) + ((((a >>> 16) * b) & 65535) << 16);
	});
var $elm$core$Basics$neq = _Utils_notEqual;
var $elm$core$Bitwise$or = _Bitwise_or;
var $robinheghan$murmur3$Murmur3$rotlBy = F2(
	function (b, a) {
		return (a << b) | (a >>> (32 - b));
	});
var $elm$core$Bitwise$xor = _Bitwise_xor;
var $robinheghan$murmur3$Murmur3$finalize = function (data) {
	var acc = (!(!data.aN)) ? (data.ap ^ A2(
		$robinheghan$murmur3$Murmur3$multiplyBy,
		$robinheghan$murmur3$Murmur3$c2,
		A2(
			$robinheghan$murmur3$Murmur3$rotlBy,
			15,
			A2($robinheghan$murmur3$Murmur3$multiplyBy, $robinheghan$murmur3$Murmur3$c1, data.aN)))) : data.ap;
	var h0 = acc ^ data.aC;
	var h1 = A2($robinheghan$murmur3$Murmur3$multiplyBy, 2246822507, h0 ^ (h0 >>> 16));
	var h2 = A2($robinheghan$murmur3$Murmur3$multiplyBy, 3266489909, h1 ^ (h1 >>> 13));
	return (h2 ^ (h2 >>> 16)) >>> 0;
};
var $elm$core$String$foldl = _String_foldl;
var $robinheghan$murmur3$Murmur3$mix = F2(
	function (h1, k1) {
		return A2(
			$robinheghan$murmur3$Murmur3$multiplyBy,
			5,
			A2(
				$robinheghan$murmur3$Murmur3$rotlBy,
				13,
				h1 ^ A2(
					$robinheghan$murmur3$Murmur3$multiplyBy,
					$robinheghan$murmur3$Murmur3$c2,
					A2(
						$robinheghan$murmur3$Murmur3$rotlBy,
						15,
						A2($robinheghan$murmur3$Murmur3$multiplyBy, $robinheghan$murmur3$Murmur3$c1, k1))))) + 3864292196;
	});
var $robinheghan$murmur3$Murmur3$hashFold = F2(
	function (c, data) {
		var res = data.aN | ((255 & $elm$core$Char$toCode(c)) << data.aW);
		var _v0 = data.aW;
		if (_v0 === 24) {
			return {
				aC: data.aC + 1,
				aN: 0,
				ap: A2($robinheghan$murmur3$Murmur3$mix, data.ap, res),
				aW: 0
			};
		} else {
			return {aC: data.aC + 1, aN: res, ap: data.ap, aW: data.aW + 8};
		}
	});
var $robinheghan$murmur3$Murmur3$hashString = F2(
	function (seed, str) {
		return $robinheghan$murmur3$Murmur3$finalize(
			A3(
				$elm$core$String$foldl,
				$robinheghan$murmur3$Murmur3$hashFold,
				A4($robinheghan$murmur3$Murmur3$HashData, 0, seed, 0, 0),
				str));
	});
var $rtfeldman$elm_css$Hash$initialSeed = 15739;
var $elm$core$String$fromList = _String_fromList;
var $elm$core$Basics$negate = function (n) {
	return -n;
};
var $elm$core$Basics$modBy = _Basics_modBy;
var $rtfeldman$elm_hex$Hex$unsafeToDigit = function (num) {
	unsafeToDigit:
	while (true) {
		switch (num) {
			case 0:
				return '0';
			case 1:
				return '1';
			case 2:
				return '2';
			case 3:
				return '3';
			case 4:
				return '4';
			case 5:
				return '5';
			case 6:
				return '6';
			case 7:
				return '7';
			case 8:
				return '8';
			case 9:
				return '9';
			case 10:
				return 'a';
			case 11:
				return 'b';
			case 12:
				return 'c';
			case 13:
				return 'd';
			case 14:
				return 'e';
			case 15:
				return 'f';
			default:
				var $temp$num = num;
				num = $temp$num;
				continue unsafeToDigit;
		}
	}
};
var $rtfeldman$elm_hex$Hex$unsafePositiveToDigits = F2(
	function (digits, num) {
		unsafePositiveToDigits:
		while (true) {
			if (num < 16) {
				return A2(
					$elm$core$List$cons,
					$rtfeldman$elm_hex$Hex$unsafeToDigit(num),
					digits);
			} else {
				var $temp$digits = A2(
					$elm$core$List$cons,
					$rtfeldman$elm_hex$Hex$unsafeToDigit(
						A2($elm$core$Basics$modBy, 16, num)),
					digits),
					$temp$num = (num / 16) | 0;
				digits = $temp$digits;
				num = $temp$num;
				continue unsafePositiveToDigits;
			}
		}
	});
var $rtfeldman$elm_hex$Hex$toString = function (num) {
	return $elm$core$String$fromList(
		(num < 0) ? A2(
			$elm$core$List$cons,
			'-',
			A2($rtfeldman$elm_hex$Hex$unsafePositiveToDigits, _List_Nil, -num)) : A2($rtfeldman$elm_hex$Hex$unsafePositiveToDigits, _List_Nil, num));
};
var $rtfeldman$elm_css$Hash$fromString = function (str) {
	return A2(
		$elm$core$String$cons,
		'_',
		$rtfeldman$elm_hex$Hex$toString(
			A2($robinheghan$murmur3$Murmur3$hashString, $rtfeldman$elm_css$Hash$initialSeed, str)));
};
var $rtfeldman$elm_css$VirtualDom$Styled$accumulateStyles = F2(
	function (_v0, styles) {
		var isCssStyles = _v0.b;
		var cssTemplate = _v0.c;
		if (isCssStyles) {
			var _v1 = A2($elm$core$Dict$get, cssTemplate, styles);
			if (!_v1.$) {
				return styles;
			} else {
				return A3(
					$elm$core$Dict$insert,
					cssTemplate,
					$rtfeldman$elm_css$Hash$fromString(cssTemplate),
					styles);
			}
		} else {
			return styles;
		}
	});
var $elm$virtual_dom$VirtualDom$property = F2(
	function (key, value) {
		return A2(
			_VirtualDom_property,
			_VirtualDom_noInnerHtmlOrFormAction(key),
			_VirtualDom_noJavaScriptOrHtmlJson(value));
	});
var $rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttribute = F2(
	function (styles, _v0) {
		var val = _v0.a;
		var isCssStyles = _v0.b;
		var cssTemplate = _v0.c;
		if (isCssStyles) {
			var _v1 = A2($elm$core$Dict$get, cssTemplate, styles);
			if (!_v1.$) {
				var classname = _v1.a;
				return A2(
					$elm$virtual_dom$VirtualDom$property,
					'className',
					$elm$json$Json$Encode$string(classname));
			} else {
				return A2(
					$elm$virtual_dom$VirtualDom$property,
					'className',
					$elm$json$Json$Encode$string('_unstyled'));
			}
		} else {
			return val;
		}
	});
var $elm$virtual_dom$VirtualDom$attribute = F2(
	function (key, value) {
		return A2(
			_VirtualDom_attribute,
			_VirtualDom_noOnOrFormAction(key),
			_VirtualDom_noJavaScriptOrHtmlUri(value));
	});
var $rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttributeNS = F2(
	function (styles, _v0) {
		var val = _v0.a;
		var isCssStyles = _v0.b;
		var cssTemplate = _v0.c;
		if (isCssStyles) {
			var _v1 = A2($elm$core$Dict$get, cssTemplate, styles);
			if (!_v1.$) {
				var classname = _v1.a;
				return A2($elm$virtual_dom$VirtualDom$attribute, 'class', classname);
			} else {
				return A2($elm$virtual_dom$VirtualDom$attribute, 'class', '_unstyled');
			}
		} else {
			return val;
		}
	});
var $elm$virtual_dom$VirtualDom$keyedNode = function (tag) {
	return _VirtualDom_keyedNode(
		_VirtualDom_noScript(tag));
};
var $elm$virtual_dom$VirtualDom$keyedNodeNS = F2(
	function (namespace, tag) {
		return A2(
			_VirtualDom_keyedNodeNS,
			namespace,
			_VirtualDom_noScript(tag));
	});
var $elm$virtual_dom$VirtualDom$node = function (tag) {
	return _VirtualDom_node(
		_VirtualDom_noScript(tag));
};
var $elm$virtual_dom$VirtualDom$nodeNS = F2(
	function (namespace, tag) {
		return A2(
			_VirtualDom_nodeNS,
			namespace,
			_VirtualDom_noScript(tag));
	});
var $rtfeldman$elm_css$VirtualDom$Styled$accumulateKeyedStyledHtml = F2(
	function (_v6, _v7) {
		var key = _v6.a;
		var html = _v6.b;
		var pairs = _v7.a;
		var styles = _v7.b;
		switch (html.$) {
			case 4:
				var vdom = html.a;
				return _Utils_Tuple2(
					A2(
						$elm$core$List$cons,
						_Utils_Tuple2(key, vdom),
						pairs),
					styles);
			case 0:
				var elemType = html.a;
				var properties = html.b;
				var children = html.c;
				var combinedStyles = A3($elm$core$List$foldl, $rtfeldman$elm_css$VirtualDom$Styled$accumulateStyles, styles, properties);
				var _v9 = A3(
					$elm$core$List$foldl,
					$rtfeldman$elm_css$VirtualDom$Styled$accumulateStyledHtml,
					_Utils_Tuple2(_List_Nil, combinedStyles),
					children);
				var childNodes = _v9.a;
				var finalStyles = _v9.b;
				var vdom = A3(
					$elm$virtual_dom$VirtualDom$node,
					elemType,
					A2(
						$elm$core$List$map,
						$rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttribute(finalStyles),
						properties),
					$elm$core$List$reverse(childNodes));
				return _Utils_Tuple2(
					A2(
						$elm$core$List$cons,
						_Utils_Tuple2(key, vdom),
						pairs),
					finalStyles);
			case 1:
				var ns = html.a;
				var elemType = html.b;
				var properties = html.c;
				var children = html.d;
				var combinedStyles = A3($elm$core$List$foldl, $rtfeldman$elm_css$VirtualDom$Styled$accumulateStyles, styles, properties);
				var _v10 = A3(
					$elm$core$List$foldl,
					$rtfeldman$elm_css$VirtualDom$Styled$accumulateStyledHtml,
					_Utils_Tuple2(_List_Nil, combinedStyles),
					children);
				var childNodes = _v10.a;
				var finalStyles = _v10.b;
				var vdom = A4(
					$elm$virtual_dom$VirtualDom$nodeNS,
					ns,
					elemType,
					A2(
						$elm$core$List$map,
						$rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttribute(finalStyles),
						properties),
					$elm$core$List$reverse(childNodes));
				return _Utils_Tuple2(
					A2(
						$elm$core$List$cons,
						_Utils_Tuple2(key, vdom),
						pairs),
					finalStyles);
			case 2:
				var elemType = html.a;
				var properties = html.b;
				var children = html.c;
				var combinedStyles = A3($elm$core$List$foldl, $rtfeldman$elm_css$VirtualDom$Styled$accumulateStyles, styles, properties);
				var _v11 = A3(
					$elm$core$List$foldl,
					$rtfeldman$elm_css$VirtualDom$Styled$accumulateKeyedStyledHtml,
					_Utils_Tuple2(_List_Nil, combinedStyles),
					children);
				var childNodes = _v11.a;
				var finalStyles = _v11.b;
				var vdom = A3(
					$elm$virtual_dom$VirtualDom$keyedNode,
					elemType,
					A2(
						$elm$core$List$map,
						$rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttribute(finalStyles),
						properties),
					$elm$core$List$reverse(childNodes));
				return _Utils_Tuple2(
					A2(
						$elm$core$List$cons,
						_Utils_Tuple2(key, vdom),
						pairs),
					finalStyles);
			default:
				var ns = html.a;
				var elemType = html.b;
				var properties = html.c;
				var children = html.d;
				var combinedStyles = A3($elm$core$List$foldl, $rtfeldman$elm_css$VirtualDom$Styled$accumulateStyles, styles, properties);
				var _v12 = A3(
					$elm$core$List$foldl,
					$rtfeldman$elm_css$VirtualDom$Styled$accumulateKeyedStyledHtml,
					_Utils_Tuple2(_List_Nil, combinedStyles),
					children);
				var childNodes = _v12.a;
				var finalStyles = _v12.b;
				var vdom = A4(
					$elm$virtual_dom$VirtualDom$keyedNodeNS,
					ns,
					elemType,
					A2(
						$elm$core$List$map,
						$rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttribute(finalStyles),
						properties),
					$elm$core$List$reverse(childNodes));
				return _Utils_Tuple2(
					A2(
						$elm$core$List$cons,
						_Utils_Tuple2(key, vdom),
						pairs),
					finalStyles);
		}
	});
var $rtfeldman$elm_css$VirtualDom$Styled$accumulateStyledHtml = F2(
	function (html, _v0) {
		var nodes = _v0.a;
		var styles = _v0.b;
		switch (html.$) {
			case 4:
				var vdomNode = html.a;
				return _Utils_Tuple2(
					A2($elm$core$List$cons, vdomNode, nodes),
					styles);
			case 0:
				var elemType = html.a;
				var properties = html.b;
				var children = html.c;
				var combinedStyles = A3($elm$core$List$foldl, $rtfeldman$elm_css$VirtualDom$Styled$accumulateStyles, styles, properties);
				var _v2 = A3(
					$elm$core$List$foldl,
					$rtfeldman$elm_css$VirtualDom$Styled$accumulateStyledHtml,
					_Utils_Tuple2(_List_Nil, combinedStyles),
					children);
				var childNodes = _v2.a;
				var finalStyles = _v2.b;
				var vdomNode = A3(
					$elm$virtual_dom$VirtualDom$node,
					elemType,
					A2(
						$elm$core$List$map,
						$rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttribute(finalStyles),
						properties),
					$elm$core$List$reverse(childNodes));
				return _Utils_Tuple2(
					A2($elm$core$List$cons, vdomNode, nodes),
					finalStyles);
			case 1:
				var ns = html.a;
				var elemType = html.b;
				var properties = html.c;
				var children = html.d;
				var combinedStyles = A3($elm$core$List$foldl, $rtfeldman$elm_css$VirtualDom$Styled$accumulateStyles, styles, properties);
				var _v3 = A3(
					$elm$core$List$foldl,
					$rtfeldman$elm_css$VirtualDom$Styled$accumulateStyledHtml,
					_Utils_Tuple2(_List_Nil, combinedStyles),
					children);
				var childNodes = _v3.a;
				var finalStyles = _v3.b;
				var vdomNode = A4(
					$elm$virtual_dom$VirtualDom$nodeNS,
					ns,
					elemType,
					A2(
						$elm$core$List$map,
						$rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttributeNS(finalStyles),
						properties),
					$elm$core$List$reverse(childNodes));
				return _Utils_Tuple2(
					A2($elm$core$List$cons, vdomNode, nodes),
					finalStyles);
			case 2:
				var elemType = html.a;
				var properties = html.b;
				var children = html.c;
				var combinedStyles = A3($elm$core$List$foldl, $rtfeldman$elm_css$VirtualDom$Styled$accumulateStyles, styles, properties);
				var _v4 = A3(
					$elm$core$List$foldl,
					$rtfeldman$elm_css$VirtualDom$Styled$accumulateKeyedStyledHtml,
					_Utils_Tuple2(_List_Nil, combinedStyles),
					children);
				var childNodes = _v4.a;
				var finalStyles = _v4.b;
				var vdomNode = A3(
					$elm$virtual_dom$VirtualDom$keyedNode,
					elemType,
					A2(
						$elm$core$List$map,
						$rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttribute(finalStyles),
						properties),
					$elm$core$List$reverse(childNodes));
				return _Utils_Tuple2(
					A2($elm$core$List$cons, vdomNode, nodes),
					finalStyles);
			default:
				var ns = html.a;
				var elemType = html.b;
				var properties = html.c;
				var children = html.d;
				var combinedStyles = A3($elm$core$List$foldl, $rtfeldman$elm_css$VirtualDom$Styled$accumulateStyles, styles, properties);
				var _v5 = A3(
					$elm$core$List$foldl,
					$rtfeldman$elm_css$VirtualDom$Styled$accumulateKeyedStyledHtml,
					_Utils_Tuple2(_List_Nil, combinedStyles),
					children);
				var childNodes = _v5.a;
				var finalStyles = _v5.b;
				var vdomNode = A4(
					$elm$virtual_dom$VirtualDom$keyedNodeNS,
					ns,
					elemType,
					A2(
						$elm$core$List$map,
						$rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttributeNS(finalStyles),
						properties),
					$elm$core$List$reverse(childNodes));
				return _Utils_Tuple2(
					A2($elm$core$List$cons, vdomNode, nodes),
					finalStyles);
		}
	});
var $elm$core$List$singleton = function (value) {
	return _List_fromArray(
		[value]);
};
var $elm$virtual_dom$VirtualDom$text = _VirtualDom_text;
var $rtfeldman$elm_css$VirtualDom$Styled$classnameStandin = '\u0007';
var $elm$core$String$replace = F3(
	function (before, after, string) {
		return A2(
			$elm$core$String$join,
			after,
			A2($elm$core$String$split, before, string));
	});
var $rtfeldman$elm_css$VirtualDom$Styled$styleToDeclaration = F3(
	function (template, classname, declaration) {
		return declaration + ('\n' + A3($elm$core$String$replace, $rtfeldman$elm_css$VirtualDom$Styled$classnameStandin, classname, template));
	});
var $rtfeldman$elm_css$VirtualDom$Styled$toDeclaration = function (dict) {
	return A3($elm$core$Dict$foldl, $rtfeldman$elm_css$VirtualDom$Styled$styleToDeclaration, '', dict);
};
var $rtfeldman$elm_css$VirtualDom$Styled$toScopedDeclaration = F2(
	function (scopingPrefix, dict) {
		return A3(
			$elm$core$Dict$foldl,
			F3(
				function (template, classname, declaration) {
					return declaration + ('\n' + A3($elm$core$String$replace, '.' + $rtfeldman$elm_css$VirtualDom$Styled$classnameStandin, '#' + (scopingPrefix + ('.' + classname)), template));
				}),
			'',
			dict);
	});
var $rtfeldman$elm_css$VirtualDom$Styled$toStyleNode = F2(
	function (maybeNonce, accumulatedStyles) {
		var cssText = function () {
			if (!accumulatedStyles.$) {
				var allStyles = accumulatedStyles.a;
				return $rtfeldman$elm_css$VirtualDom$Styled$toDeclaration(allStyles);
			} else {
				var scope = accumulatedStyles.a;
				var rootStyles = accumulatedStyles.b;
				var descendantStyles = accumulatedStyles.c;
				return A2($rtfeldman$elm_css$VirtualDom$Styled$toScopedDeclaration, scope, rootStyles) + ('\n' + A2($rtfeldman$elm_css$VirtualDom$Styled$toScopedDeclaration, scope + ' ', descendantStyles));
			}
		}();
		return A3(
			$elm$virtual_dom$VirtualDom$node,
			'span',
			_List_fromArray(
				[
					A2($elm$virtual_dom$VirtualDom$attribute, 'style', 'display: none;'),
					A2($elm$virtual_dom$VirtualDom$attribute, 'class', 'elm-css-style-wrapper')
				]),
			_List_fromArray(
				[
					A3(
					$elm$virtual_dom$VirtualDom$node,
					'style',
					function () {
						if (!maybeNonce.$) {
							var nonce = maybeNonce.a;
							return _List_fromArray(
								[
									A2($elm$virtual_dom$VirtualDom$attribute, 'nonce', nonce)
								]);
						} else {
							return _List_Nil;
						}
					}(),
					$elm$core$List$singleton(
						$elm$virtual_dom$VirtualDom$text(cssText)))
				]));
	});
var $rtfeldman$elm_css$VirtualDom$Styled$unstyle = F4(
	function (maybeNonce, elemType, properties, children) {
		var initialStyles = A3($elm$core$List$foldl, $rtfeldman$elm_css$VirtualDom$Styled$accumulateStyles, $elm$core$Dict$empty, properties);
		var _v0 = A3(
			$elm$core$List$foldl,
			$rtfeldman$elm_css$VirtualDom$Styled$accumulateStyledHtml,
			_Utils_Tuple2(_List_Nil, initialStyles),
			children);
		var childNodes = _v0.a;
		var styles = _v0.b;
		var styleNode = A2(
			$rtfeldman$elm_css$VirtualDom$Styled$toStyleNode,
			maybeNonce,
			$rtfeldman$elm_css$VirtualDom$Styled$UnscopedStyles(styles));
		var unstyledProperties = A2(
			$elm$core$List$map,
			$rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttribute(styles),
			properties);
		return A3(
			$elm$virtual_dom$VirtualDom$node,
			elemType,
			unstyledProperties,
			A2(
				$elm$core$List$cons,
				styleNode,
				$elm$core$List$reverse(childNodes)));
	});
var $rtfeldman$elm_css$VirtualDom$Styled$containsKey = F2(
	function (key, pairs) {
		containsKey:
		while (true) {
			if (!pairs.b) {
				return false;
			} else {
				var _v1 = pairs.a;
				var str = _v1.a;
				var rest = pairs.b;
				if (_Utils_eq(key, str)) {
					return true;
				} else {
					var $temp$key = key,
						$temp$pairs = rest;
					key = $temp$key;
					pairs = $temp$pairs;
					continue containsKey;
				}
			}
		}
	});
var $rtfeldman$elm_css$VirtualDom$Styled$getUnusedKey = F2(
	function (_default, pairs) {
		getUnusedKey:
		while (true) {
			if (!pairs.b) {
				return _default;
			} else {
				var _v1 = pairs.a;
				var firstKey = _v1.a;
				var rest = pairs.b;
				var newKey = '_' + firstKey;
				if (A2($rtfeldman$elm_css$VirtualDom$Styled$containsKey, newKey, rest)) {
					var $temp$default = newKey,
						$temp$pairs = rest;
					_default = $temp$default;
					pairs = $temp$pairs;
					continue getUnusedKey;
				} else {
					return newKey;
				}
			}
		}
	});
var $rtfeldman$elm_css$VirtualDom$Styled$toKeyedStyleNode = F3(
	function (maybeNonce, accumulatedStyles, keyedChildNodes) {
		var styleNodeKey = A2($rtfeldman$elm_css$VirtualDom$Styled$getUnusedKey, '_', keyedChildNodes);
		var finalNode = A2($rtfeldman$elm_css$VirtualDom$Styled$toStyleNode, maybeNonce, accumulatedStyles);
		return _Utils_Tuple2(styleNodeKey, finalNode);
	});
var $rtfeldman$elm_css$VirtualDom$Styled$unstyleKeyed = F4(
	function (maybeNonce, elemType, properties, keyedChildren) {
		var initialStyles = A3($elm$core$List$foldl, $rtfeldman$elm_css$VirtualDom$Styled$accumulateStyles, $elm$core$Dict$empty, properties);
		var _v0 = A3(
			$elm$core$List$foldl,
			$rtfeldman$elm_css$VirtualDom$Styled$accumulateKeyedStyledHtml,
			_Utils_Tuple2(_List_Nil, initialStyles),
			keyedChildren);
		var keyedChildNodes = _v0.a;
		var styles = _v0.b;
		var keyedStyleNode = A3(
			$rtfeldman$elm_css$VirtualDom$Styled$toKeyedStyleNode,
			maybeNonce,
			$rtfeldman$elm_css$VirtualDom$Styled$UnscopedStyles(styles),
			keyedChildNodes);
		var unstyledProperties = A2(
			$elm$core$List$map,
			$rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttribute(styles),
			properties);
		return A3(
			$elm$virtual_dom$VirtualDom$keyedNode,
			elemType,
			unstyledProperties,
			A2(
				$elm$core$List$cons,
				keyedStyleNode,
				$elm$core$List$reverse(keyedChildNodes)));
	});
var $rtfeldman$elm_css$VirtualDom$Styled$unstyleKeyedNS = F5(
	function (maybeNonce, ns, elemType, properties, keyedChildren) {
		var initialStyles = A3($elm$core$List$foldl, $rtfeldman$elm_css$VirtualDom$Styled$accumulateStyles, $elm$core$Dict$empty, properties);
		var _v0 = A3(
			$elm$core$List$foldl,
			$rtfeldman$elm_css$VirtualDom$Styled$accumulateKeyedStyledHtml,
			_Utils_Tuple2(_List_Nil, initialStyles),
			keyedChildren);
		var keyedChildNodes = _v0.a;
		var styles = _v0.b;
		var keyedStyleNode = A3(
			$rtfeldman$elm_css$VirtualDom$Styled$toKeyedStyleNode,
			maybeNonce,
			$rtfeldman$elm_css$VirtualDom$Styled$UnscopedStyles(styles),
			keyedChildNodes);
		var unstyledProperties = A2(
			$elm$core$List$map,
			$rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttributeNS(styles),
			properties);
		return A4(
			$elm$virtual_dom$VirtualDom$keyedNodeNS,
			ns,
			elemType,
			unstyledProperties,
			A2(
				$elm$core$List$cons,
				keyedStyleNode,
				$elm$core$List$reverse(keyedChildNodes)));
	});
var $rtfeldman$elm_css$VirtualDom$Styled$unstyleNS = F5(
	function (maybeNonce, ns, elemType, properties, children) {
		var initialStyles = A3($elm$core$List$foldl, $rtfeldman$elm_css$VirtualDom$Styled$accumulateStyles, $elm$core$Dict$empty, properties);
		var _v0 = A3(
			$elm$core$List$foldl,
			$rtfeldman$elm_css$VirtualDom$Styled$accumulateStyledHtml,
			_Utils_Tuple2(_List_Nil, initialStyles),
			children);
		var childNodes = _v0.a;
		var styles = _v0.b;
		var styleNode = A2(
			$rtfeldman$elm_css$VirtualDom$Styled$toStyleNode,
			maybeNonce,
			$rtfeldman$elm_css$VirtualDom$Styled$UnscopedStyles(styles));
		var unstyledProperties = A2(
			$elm$core$List$map,
			$rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttributeNS(styles),
			properties);
		return A4(
			$elm$virtual_dom$VirtualDom$nodeNS,
			ns,
			elemType,
			unstyledProperties,
			A2(
				$elm$core$List$cons,
				styleNode,
				$elm$core$List$reverse(childNodes)));
	});
var $rtfeldman$elm_css$VirtualDom$Styled$toUnstyled = function (vdom) {
	switch (vdom.$) {
		case 4:
			var plainNode = vdom.a;
			return plainNode;
		case 0:
			var elemType = vdom.a;
			var properties = vdom.b;
			var children = vdom.c;
			return A4($rtfeldman$elm_css$VirtualDom$Styled$unstyle, $elm$core$Maybe$Nothing, elemType, properties, children);
		case 1:
			var ns = vdom.a;
			var elemType = vdom.b;
			var properties = vdom.c;
			var children = vdom.d;
			return A5($rtfeldman$elm_css$VirtualDom$Styled$unstyleNS, $elm$core$Maybe$Nothing, ns, elemType, properties, children);
		case 2:
			var elemType = vdom.a;
			var properties = vdom.b;
			var children = vdom.c;
			return A4($rtfeldman$elm_css$VirtualDom$Styled$unstyleKeyed, $elm$core$Maybe$Nothing, elemType, properties, children);
		default:
			var ns = vdom.a;
			var elemType = vdom.b;
			var properties = vdom.c;
			var children = vdom.d;
			return A5($rtfeldman$elm_css$VirtualDom$Styled$unstyleKeyedNS, $elm$core$Maybe$Nothing, ns, elemType, properties, children);
	}
};
var $rtfeldman$elm_css$Html$Styled$toUnstyled = $rtfeldman$elm_css$VirtualDom$Styled$toUnstyled;
var $author$project$Lib$Effect$Batch = function (a) {
	return {$: 4, a: a};
};
var $author$project$Lib$Effect$batch = $author$project$Lib$Effect$Batch;
var $author$project$Lib$Effect$flattenHelper = F2(
	function (queue, flat) {
		flattenHelper:
		while (true) {
			if (!queue.b) {
				return flat;
			} else {
				switch (queue.a.$) {
					case 0:
						var _v1 = queue.a;
						var tail = queue.b;
						var $temp$queue = tail,
							$temp$flat = flat;
						queue = $temp$queue;
						flat = $temp$flat;
						continue flattenHelper;
					case 4:
						var list = queue.a.a;
						var tail = queue.b;
						var $temp$queue = _Utils_ap(list, tail),
							$temp$flat = flat;
						queue = $temp$queue;
						flat = $temp$flat;
						continue flattenHelper;
					default:
						var any = queue.a;
						var tail = queue.b;
						var $temp$queue = tail,
							$temp$flat = A2($elm$core$List$cons, any, flat);
						queue = $temp$queue;
						flat = $temp$flat;
						continue flattenHelper;
				}
			}
		}
	});
var $author$project$Lib$Effect$flatten = function (effect) {
	return A2(
		$author$project$Lib$Effect$flattenHelper,
		_List_fromArray(
			[effect]),
		_List_Nil);
};
var $elm$core$Tuple$mapSecond = F2(
	function (func, _v0) {
		var x = _v0.a;
		var y = _v0.b;
		return _Utils_Tuple2(
			x,
			func(y));
	});
var $author$project$Lib$Effect$extractShared = A2(
	$elm$core$Basics$composeR,
	$author$project$Lib$Effect$flatten,
	A2(
		$elm$core$Basics$composeR,
		A2(
			$elm$core$List$foldl,
			F2(
				function (effect, _v0) {
					var sharedList = _v0.a;
					var otherList = _v0.b;
					if (effect.$ === 3) {
						var sharedMsg = effect.a;
						return _Utils_Tuple2(
							A2($elm$core$List$cons, sharedMsg, sharedList),
							otherList);
					} else {
						return _Utils_Tuple2(
							sharedList,
							A2($elm$core$List$cons, effect, otherList));
					}
				}),
			_Utils_Tuple2(_List_Nil, _List_Nil)),
		$elm$core$Tuple$mapSecond($author$project$Lib$Effect$batch)));
var $author$project$Lib$Effect$toCmd = F2(
	function (_v0, effect) {
		var fromSharedMsg = _v0.a;
		var fromSubMsg = _v0.b;
		var _v1 = A2(
			$elm$core$List$filterMap,
			function (e) {
				switch (e.$) {
					case 0:
						return $elm$core$Maybe$Nothing;
					case 1:
						var cmd = e.a;
						return $elm$core$Maybe$Just(
							A2($elm$core$Platform$Cmd$map, fromSubMsg, cmd));
					case 2:
						var cmd = e.a;
						return $elm$core$Maybe$Just(
							A2($elm$core$Platform$Cmd$map, fromSharedMsg, cmd));
					case 3:
						var msg = e.a;
						return $elm$core$Maybe$Just(
							A2(
								$elm$core$Task$perform,
								fromSharedMsg,
								$elm$core$Task$succeed(msg)));
					default:
						return $elm$core$Maybe$Nothing;
				}
			},
			$author$project$Lib$Effect$flatten(effect));
		if (!_v1.b) {
			return $elm$core$Platform$Cmd$none;
		} else {
			if (!_v1.b.b) {
				var single = _v1.a;
				return single;
			} else {
				var multiple = _v1;
				return $elm$core$Platform$Cmd$batch(multiple);
			}
		}
	});
var $author$project$Shared$CheckOutCreated = function (a) {
	return {$: 5, a: a};
};
var $author$project$Shared$OrderConfirmed = function (a) {
	return {$: 7, a: a};
};
var $author$project$Shared$OrderInfoEnteredSaved = function (a) {
	return {$: 4, a: a};
};
var $author$project$Shared$StuffLogged = function (a) {
	return {$: 9, a: a};
};
var $elm$json$Json$Encode$float = _Json_wrap;
var $author$project$Api$CreateCheckOut$encoder = F2(
	function (orderId, amount) {
		return $elm$json$Json$Encode$object(
			_List_fromArray(
				[
					_Utils_Tuple2(
					'orderId',
					$elm$json$Json$Encode$string(orderId)),
					_Utils_Tuple2(
					'amount',
					$elm$json$Json$Encode$float(amount))
				]));
	});
var $author$project$Api$Helpers$ObjectId$Id = function (id) {
	return {dv: id};
};
var $author$project$Api$Helpers$ObjectId$objectIdDecoder = A3(
	$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
	'id',
	$elm$json$Json$Decode$string,
	$elm$json$Json$Decode$succeed($author$project$Api$Helpers$ObjectId$Id));
var $author$project$Api$CreateCheckOut$dispatch = F4(
	function (baseApiUrl, id, amount, msg) {
		var jsonPayload = A2(
			$elm$json$Json$Encode$encode,
			0,
			A2($author$project$Api$CreateCheckOut$encoder, id, amount));
		var request = $elm$http$Http$request(
			{
				eC: A2($elm$http$Http$stringBody, 'application/json', jsonPayload),
				e_: A2($elm$http$Http$expectJson, msg, $author$project$Api$Helpers$ObjectId$objectIdDecoder),
				e6: _List_Nil,
				fl: 'POST',
				fN: $elm$core$Maybe$Nothing,
				fQ: $elm$core$Maybe$Nothing,
				fT: baseApiUrl + 'create-checkout'
			});
		return request;
	});
var $author$project$Api$LogToServer$requestEncoder = function (message) {
	return $elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'message',
				$elm$json$Json$Encode$string(message))
			]));
};
var $author$project$Api$LogToServer$Response = function (success) {
	return {fJ: success};
};
var $author$project$Api$LogToServer$responseDecoder = A3(
	$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
	'success',
	$elm$json$Json$Decode$bool,
	$elm$json$Json$Decode$succeed($author$project$Api$LogToServer$Response));
var $author$project$Api$LogToServer$dispatch = F3(
	function (baseApiUrl, message, msg) {
		var jsonPayload = A2(
			$elm$json$Json$Encode$encode,
			0,
			$author$project$Api$LogToServer$requestEncoder(message));
		var request = $elm$http$Http$request(
			{
				eC: A2($elm$http$Http$stringBody, 'application/json', jsonPayload),
				e_: A2($elm$http$Http$expectJson, msg, $author$project$Api$LogToServer$responseDecoder),
				e6: _List_Nil,
				fl: 'POST',
				fN: $elm$core$Maybe$Nothing,
				fQ: $elm$core$Maybe$Nothing,
				fT: baseApiUrl + 'log-to-server'
			});
		return request;
	});
var $author$project$Api$OrderConfirmed$dispatch = F3(
	function (baseApiUrl, id, msg) {
		var jsonPayload = A2(
			$elm$json$Json$Encode$encode,
			0,
			$author$project$Api$Helpers$ObjectId$objectIdEncoder(id));
		var request = $elm$http$Http$request(
			{
				eC: A2($elm$http$Http$stringBody, 'application/json', jsonPayload),
				e_: A2($elm$http$Http$expectJson, msg, $author$project$Api$Helpers$ObjectId$objectIdDecoder),
				e6: _List_Nil,
				fl: 'POST',
				fN: $elm$core$Maybe$Nothing,
				fQ: $elm$core$Maybe$Nothing,
				fT: baseApiUrl + 'confirm-order'
			});
		return request;
	});
var $elm$json$Json$Encode$list = F2(
	function (func, entries) {
		return _Json_wrap(
			A3(
				$elm$core$List$foldl,
				_Json_addEntry(func),
				_Json_emptyArray(0),
				entries));
	});
var $elm$json$Json$Encode$int = _Json_wrap;
var $author$project$Api$OrderInfoEntered$ticketEncoder = function (ticketInfo) {
	return $elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'id',
				$elm$json$Json$Encode$string(ticketInfo.dv)),
				_Utils_Tuple2(
				'description',
				$elm$json$Json$Encode$string(ticketInfo.eS)),
				_Utils_Tuple2(
				'price',
				$elm$json$Json$Encode$float(ticketInfo.fu)),
				_Utils_Tuple2(
				'numberOfTickets',
				$elm$json$Json$Encode$int(ticketInfo.dN))
			]));
};
var $author$project$Api$OrderInfoEntered$encoder = function (orderInfo) {
	return $elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'christianName',
				$elm$json$Json$Encode$string(orderInfo.eG)),
				_Utils_Tuple2(
				'lastName',
				$elm$json$Json$Encode$string(orderInfo.fh)),
				_Utils_Tuple2(
				'email',
				$elm$json$Json$Encode$string(orderInfo.eY)),
				_Utils_Tuple2(
				'ticketsInfo',
				A2($elm$json$Json$Encode$list, $author$project$Api$OrderInfoEntered$ticketEncoder, orderInfo.ei))
			]));
};
var $author$project$Api$OrderInfoEntered$dispatch = F3(
	function (baseApiUrl, evt, msg) {
		var jsonPayload = A2(
			$elm$json$Json$Encode$encode,
			0,
			$author$project$Api$OrderInfoEntered$encoder(evt));
		var request = $elm$http$Http$request(
			{
				eC: A2($elm$http$Http$stringBody, 'application/json', jsonPayload),
				e_: A2($elm$http$Http$expectJson, msg, $author$project$Api$Helpers$ObjectId$objectIdDecoder),
				e6: _List_Nil,
				fl: 'POST',
				fN: $elm$core$Maybe$Nothing,
				fQ: $elm$core$Maybe$Nothing,
				fT: baseApiUrl + 'order-info-entered'
			});
		return request;
	});
var $author$project$Shared$Phone = 0;
var $author$project$Shared$getDevice = F2(
	function (width, height) {
		return (_Utils_cmp(width, height) < 0) ? 0 : 1;
	});
var $elm$core$Basics$round = _Basics_round;
var $author$project$Shared$update = F2(
	function (msg, model) {
		switch (msg.$) {
			case 0:
				var viewport = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							eT: A2(
								$author$project$Shared$getDevice,
								$elm$core$Basics$round(viewport.eo.fX),
								$elm$core$Basics$round(viewport.eo.e7))
						}),
					$elm$core$Platform$Cmd$none);
			case 1:
				var w = msg.a;
				var h = msg.b;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							eT: A2($author$project$Shared$getDevice, w, h)
						}),
					$elm$core$Platform$Cmd$none);
			case 2:
				var err = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							eZ: $elm$core$Maybe$Just(err)
						}),
					$elm$core$Platform$Cmd$none);
			case 3:
				var evt = msg.a;
				var total = msg.b;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{a6: total}),
					A3($author$project$Api$OrderInfoEntered$dispatch, model.eB, evt, $author$project$Shared$OrderInfoEnteredSaved));
			case 4:
				if (!msg.a.$) {
					var objectId = msg.a.a;
					var cmd = (!model.a6) ? A3($author$project$Api$OrderConfirmed$dispatch, model.eB, objectId.dv, $author$project$Shared$OrderConfirmed) : A4($author$project$Api$CreateCheckOut$dispatch, model.eB, objectId.dv, model.a6, $author$project$Shared$CheckOutCreated);
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{eN: objectId.dv}),
						cmd);
				} else {
					var error = msg.a.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								eZ: $elm$core$Maybe$Just(error)
							}),
						$elm$core$Platform$Cmd$none);
				}
			case 5:
				if (!msg.a.$) {
					var objectId = msg.a.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{c9: objectId.dv}),
						A2($elm$browser$Browser$Navigation$pushUrl, model.fo, '/payment/'));
				} else {
					var err = msg.a.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								eZ: $elm$core$Maybe$Just(err)
							}),
						$elm$core$Platform$Cmd$none);
				}
			case 6:
				return _Utils_Tuple2(
					model,
					A3($author$project$Api$OrderConfirmed$dispatch, model.eB, model.eN, $author$project$Shared$OrderConfirmed));
			case 7:
				if (!msg.a.$) {
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{cA: true}),
						A2($elm$browser$Browser$Navigation$pushUrl, model.fo, '/payment-success/'));
				} else {
					var err = msg.a.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								eZ: $elm$core$Maybe$Just(err)
							}),
						$elm$core$Platform$Cmd$none);
				}
			case 8:
				var info = msg.a;
				return _Utils_Tuple2(
					model,
					A3($author$project$Api$LogToServer$dispatch, model.eB, info, $author$project$Shared$StuffLogged));
			default:
				if (!msg.a.$) {
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				} else {
					var err = msg.a.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								eZ: $elm$core$Maybe$Just(err)
							}),
						$elm$core$Platform$Cmd$none);
				}
		}
	});
var $author$project$App$applyEffect = F2(
	function (effect, model) {
		var _v0 = $author$project$Lib$Effect$extractShared(effect);
		var sharedMsgList = _v0.a;
		var otherEffect = _v0.b;
		var _v1 = A3(
			$elm$core$List$foldl,
			F2(
				function (sharedMsg, _v2) {
					var prevModel = _v2.a;
					var prevCmd = _v2.b;
					var _v3 = A2($author$project$Shared$update, sharedMsg, prevModel);
					var nextModel = _v3.a;
					var nextCmd = _v3.b;
					return _Utils_Tuple2(
						nextModel,
						A2($elm$core$List$cons, nextCmd, prevCmd));
				}),
			_Utils_Tuple2(model, _List_Nil),
			sharedMsgList);
		var newModel = _v1.a;
		var cmd = _v1.b;
		return _Utils_Tuple2(
			newModel,
			$elm$core$Platform$Cmd$batch(
				A2(
					$elm$core$List$cons,
					A2(
						$author$project$Lib$Effect$toCmd,
						_Utils_Tuple2($author$project$App$SharedMsg, $author$project$App$HelmsmanMsg),
						otherEffect),
					A2(
						$elm$core$List$map,
						$elm$core$Platform$Cmd$map($author$project$App$SharedMsg),
						cmd))));
	});
var $elm$browser$Browser$Navigation$load = _Browser_load;
var $elm$url$Url$addPort = F2(
	function (maybePort, starter) {
		if (maybePort.$ === 1) {
			return starter;
		} else {
			var port_ = maybePort.a;
			return starter + (':' + $elm$core$String$fromInt(port_));
		}
	});
var $elm$url$Url$addPrefixed = F3(
	function (prefix, maybeSegment, starter) {
		if (maybeSegment.$ === 1) {
			return starter;
		} else {
			var segment = maybeSegment.a;
			return _Utils_ap(
				starter,
				_Utils_ap(prefix, segment));
		}
	});
var $elm$url$Url$toString = function (url) {
	var http = function () {
		var _v0 = url.d_;
		if (!_v0) {
			return 'http://';
		} else {
			return 'https://';
		}
	}();
	return A3(
		$elm$url$Url$addPrefixed,
		'#',
		url.dp,
		A3(
			$elm$url$Url$addPrefixed,
			'?',
			url.d$,
			_Utils_ap(
				A2(
					$elm$url$Url$addPort,
					url.dV,
					_Utils_ap(http, url.dt)),
				url.dT)));
};
var $author$project$Helmsman$HomeMsg = function (a) {
	return {$: 0, a: a};
};
var $author$project$Helmsman$InvoiceInfoMsg = function (a) {
	return {$: 5, a: a};
};
var $author$project$Helmsman$TeesAndCeesMsg = function (a) {
	return {$: 4, a: a};
};
var $author$project$Lib$Effect$Cmd = function (a) {
	return {$: 1, a: a};
};
var $author$project$Lib$Effect$None = {$: 0};
var $author$project$Lib$Effect$Shared = function (a) {
	return {$: 3, a: a};
};
var $author$project$Lib$Effect$SharedCmd = function (a) {
	return {$: 2, a: a};
};
var $author$project$Lib$Effect$map = function (fn) {
	return A2(
		$elm$core$Basics$composeR,
		$author$project$Lib$Effect$flatten,
		A2(
			$elm$core$Basics$composeR,
			$elm$core$List$map(
				function (eff) {
					switch (eff.$) {
						case 0:
							return $author$project$Lib$Effect$None;
						case 1:
							var cmd = eff.a;
							return $author$project$Lib$Effect$Cmd(
								A2($elm$core$Platform$Cmd$map, fn, cmd));
						case 2:
							var cmd = eff.a;
							return $author$project$Lib$Effect$SharedCmd(cmd);
						case 3:
							var msg = eff.a;
							return $author$project$Lib$Effect$Shared(msg);
						default:
							return $author$project$Lib$Effect$None;
					}
				}),
			function (list) {
				if (!list.b) {
					return $author$project$Lib$Effect$None;
				} else {
					if (!list.b.b) {
						var single = list.a;
						return single;
					} else {
						var multiple = list;
						return $author$project$Lib$Effect$Batch(multiple);
					}
				}
			}));
};
var $author$project$Lib$Effect$none = $author$project$Lib$Effect$None;
var $author$project$Pages$Home$update = F3(
	function (msg, shared, model) {
		return _Utils_Tuple2(
			model,
			$author$project$Lib$Effect$Cmd(
				A2($elm$browser$Browser$Navigation$pushUrl, shared.fo, '/order-tickets/')));
	});
var $author$project$Shared$Error = function (a) {
	return {$: 2, a: a};
};
var $author$project$Pages$InvoiceInfo$InvoiceInfoSaved = function (a) {
	return {$: 4, a: a};
};
var $author$project$Api$SaveInvoiceInfo$encoder = function (invoiceInfo) {
	return $elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'orderId',
				$elm$json$Json$Encode$string(invoiceInfo.dQ)),
				_Utils_Tuple2(
				'companyName',
				$elm$json$Json$Encode$string(invoiceInfo.c8)),
				_Utils_Tuple2(
				'vatNumber',
				$elm$json$Json$Encode$string(invoiceInfo.en)),
				_Utils_Tuple2(
				'address',
				$elm$json$Json$Encode$string(invoiceInfo.cS))
			]));
};
var $author$project$Api$SaveInvoiceInfo$dispatch = F3(
	function (baseApiUrl, info, msg) {
		var jsonPayload = A2(
			$elm$json$Json$Encode$encode,
			0,
			$author$project$Api$SaveInvoiceInfo$encoder(info));
		var request = $elm$http$Http$request(
			{
				eC: A2($elm$http$Http$stringBody, 'application/json', jsonPayload),
				e_: A2($elm$http$Http$expectJson, msg, $author$project$Api$Helpers$ObjectId$objectIdDecoder),
				e6: _List_Nil,
				fl: 'POST',
				fN: $elm$core$Maybe$Nothing,
				fQ: $elm$core$Maybe$Nothing,
				fT: baseApiUrl + 'save-invoice-info'
			});
		return request;
	});
var $elm$core$Basics$not = _Basics_not;
var $author$project$Pages$InvoiceInfo$update = F3(
	function (msg, shared, model) {
		switch (msg.$) {
			case 0:
				var str = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							c8: str,
							aF: !$elm$core$String$isEmpty(str)
						}),
					$author$project$Lib$Effect$None);
			case 1:
				var str = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							cS: str,
							ax: !$elm$core$String$isEmpty(str)
						}),
					$author$project$Lib$Effect$None);
			case 2:
				var str = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							en: str,
							a1: !$elm$core$String$isEmpty(str)
						}),
					$author$project$Lib$Effect$None);
			case 3:
				var updatedModel = _Utils_update(
					model,
					{
						ax: !$elm$core$String$isEmpty(model.cS),
						aF: !$elm$core$String$isEmpty(model.c8),
						a1: !$elm$core$String$isEmpty(model.en)
					});
				var isValid = updatedModel.aF && (updatedModel.ax && updatedModel.a1);
				var effect = function () {
					if (isValid) {
						var info = {cS: model.cS, c8: model.c8, dQ: shared.eN, en: model.en};
						return $author$project$Lib$Effect$Cmd(
							A3($author$project$Api$SaveInvoiceInfo$dispatch, shared.eB, info, $author$project$Pages$InvoiceInfo$InvoiceInfoSaved));
					} else {
						return $author$project$Lib$Effect$None;
					}
				}();
				return _Utils_Tuple2(updatedModel, effect);
			default:
				if (!msg.a.$) {
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{bG: true}),
						$author$project$Lib$Effect$none);
				} else {
					var err = msg.a.a;
					return _Utils_Tuple2(
						model,
						$author$project$Lib$Effect$Shared(
							$author$project$Shared$Error(err)));
				}
		}
	});
var $author$project$Shared$OrderInfoEntered = F2(
	function (a, b) {
		return {$: 3, a: a, b: b};
	});
var $elm$parser$Parser$Done = function (a) {
	return {$: 1, a: a};
};
var $elm$parser$Parser$Loop = function (a) {
	return {$: 0, a: a};
};
var $elm$parser$Parser$ExpectingEnd = {$: 10};
var $elm$parser$Parser$Advanced$Bad = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var $elm$parser$Parser$Advanced$Good = F3(
	function (a, b, c) {
		return {$: 0, a: a, b: b, c: c};
	});
var $elm$parser$Parser$Advanced$Parser = $elm$core$Basics$identity;
var $elm$parser$Parser$Advanced$AddRight = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var $elm$parser$Parser$Advanced$DeadEnd = F4(
	function (row, col, problem, contextStack) {
		return {c5: col, eL: contextStack, dX: problem, ao: row};
	});
var $elm$parser$Parser$Advanced$Empty = {$: 0};
var $elm$parser$Parser$Advanced$fromState = F2(
	function (s, x) {
		return A2(
			$elm$parser$Parser$Advanced$AddRight,
			$elm$parser$Parser$Advanced$Empty,
			A4($elm$parser$Parser$Advanced$DeadEnd, s.ao, s.c5, x, s.g));
	});
var $elm$parser$Parser$Advanced$end = function (x) {
	return function (s) {
		return _Utils_eq(
			$elm$core$String$length(s.b),
			s.c) ? A3($elm$parser$Parser$Advanced$Good, false, 0, s) : A2(
			$elm$parser$Parser$Advanced$Bad,
			false,
			A2($elm$parser$Parser$Advanced$fromState, s, x));
	};
};
var $elm$parser$Parser$end = $elm$parser$Parser$Advanced$end($elm$parser$Parser$ExpectingEnd);
var $elm$core$String$fromChar = function (_char) {
	return A2($elm$core$String$cons, _char, '');
};
var $elm$core$Basics$always = F2(
	function (a, _v0) {
		return a;
	});
var $elm$parser$Parser$Advanced$map2 = F3(
	function (func, _v0, _v1) {
		var parseA = _v0;
		var parseB = _v1;
		return function (s0) {
			var _v2 = parseA(s0);
			if (_v2.$ === 1) {
				var p = _v2.a;
				var x = _v2.b;
				return A2($elm$parser$Parser$Advanced$Bad, p, x);
			} else {
				var p1 = _v2.a;
				var a = _v2.b;
				var s1 = _v2.c;
				var _v3 = parseB(s1);
				if (_v3.$ === 1) {
					var p2 = _v3.a;
					var x = _v3.b;
					return A2($elm$parser$Parser$Advanced$Bad, p1 || p2, x);
				} else {
					var p2 = _v3.a;
					var b = _v3.b;
					var s2 = _v3.c;
					return A3(
						$elm$parser$Parser$Advanced$Good,
						p1 || p2,
						A2(func, a, b),
						s2);
				}
			}
		};
	});
var $elm$parser$Parser$Advanced$ignorer = F2(
	function (keepParser, ignoreParser) {
		return A3($elm$parser$Parser$Advanced$map2, $elm$core$Basics$always, keepParser, ignoreParser);
	});
var $elm$parser$Parser$ignorer = $elm$parser$Parser$Advanced$ignorer;
var $elm$parser$Parser$Advanced$keeper = F2(
	function (parseFunc, parseArg) {
		return A3($elm$parser$Parser$Advanced$map2, $elm$core$Basics$apL, parseFunc, parseArg);
	});
var $elm$parser$Parser$keeper = $elm$parser$Parser$Advanced$keeper;
var $elm$parser$Parser$Advanced$loopHelp = F4(
	function (p, state, callback, s0) {
		loopHelp:
		while (true) {
			var _v0 = callback(state);
			var parse = _v0;
			var _v1 = parse(s0);
			if (!_v1.$) {
				var p1 = _v1.a;
				var step = _v1.b;
				var s1 = _v1.c;
				if (!step.$) {
					var newState = step.a;
					var $temp$p = p || p1,
						$temp$state = newState,
						$temp$callback = callback,
						$temp$s0 = s1;
					p = $temp$p;
					state = $temp$state;
					callback = $temp$callback;
					s0 = $temp$s0;
					continue loopHelp;
				} else {
					var result = step.a;
					return A3($elm$parser$Parser$Advanced$Good, p || p1, result, s1);
				}
			} else {
				var p1 = _v1.a;
				var x = _v1.b;
				return A2($elm$parser$Parser$Advanced$Bad, p || p1, x);
			}
		}
	});
var $elm$parser$Parser$Advanced$loop = F2(
	function (state, callback) {
		return function (s) {
			return A4($elm$parser$Parser$Advanced$loopHelp, false, state, callback, s);
		};
	});
var $elm$parser$Parser$Advanced$map = F2(
	function (func, _v0) {
		var parse = _v0;
		return function (s0) {
			var _v1 = parse(s0);
			if (!_v1.$) {
				var p = _v1.a;
				var a = _v1.b;
				var s1 = _v1.c;
				return A3(
					$elm$parser$Parser$Advanced$Good,
					p,
					func(a),
					s1);
			} else {
				var p = _v1.a;
				var x = _v1.b;
				return A2($elm$parser$Parser$Advanced$Bad, p, x);
			}
		};
	});
var $elm$parser$Parser$map = $elm$parser$Parser$Advanced$map;
var $elm$parser$Parser$Advanced$Done = function (a) {
	return {$: 1, a: a};
};
var $elm$parser$Parser$Advanced$Loop = function (a) {
	return {$: 0, a: a};
};
var $elm$parser$Parser$toAdvancedStep = function (step) {
	if (!step.$) {
		var s = step.a;
		return $elm$parser$Parser$Advanced$Loop(s);
	} else {
		var a = step.a;
		return $elm$parser$Parser$Advanced$Done(a);
	}
};
var $elm$parser$Parser$loop = F2(
	function (state, callback) {
		return A2(
			$elm$parser$Parser$Advanced$loop,
			state,
			function (s) {
				return A2(
					$elm$parser$Parser$map,
					$elm$parser$Parser$toAdvancedStep,
					callback(s));
			});
	});
var $elm$parser$Parser$Advanced$Append = F2(
	function (a, b) {
		return {$: 2, a: a, b: b};
	});
var $elm$parser$Parser$Advanced$oneOfHelp = F3(
	function (s0, bag, parsers) {
		oneOfHelp:
		while (true) {
			if (!parsers.b) {
				return A2($elm$parser$Parser$Advanced$Bad, false, bag);
			} else {
				var parse = parsers.a;
				var remainingParsers = parsers.b;
				var _v1 = parse(s0);
				if (!_v1.$) {
					var step = _v1;
					return step;
				} else {
					var step = _v1;
					var p = step.a;
					var x = step.b;
					if (p) {
						return step;
					} else {
						var $temp$s0 = s0,
							$temp$bag = A2($elm$parser$Parser$Advanced$Append, bag, x),
							$temp$parsers = remainingParsers;
						s0 = $temp$s0;
						bag = $temp$bag;
						parsers = $temp$parsers;
						continue oneOfHelp;
					}
				}
			}
		}
	});
var $elm$parser$Parser$Advanced$oneOf = function (parsers) {
	return function (s) {
		return A3($elm$parser$Parser$Advanced$oneOfHelp, s, $elm$parser$Parser$Advanced$Empty, parsers);
	};
};
var $elm$parser$Parser$oneOf = $elm$parser$Parser$Advanced$oneOf;
var $elm$parser$Parser$Advanced$andThen = F2(
	function (callback, _v0) {
		var parseA = _v0;
		return function (s0) {
			var _v1 = parseA(s0);
			if (_v1.$ === 1) {
				var p = _v1.a;
				var x = _v1.b;
				return A2($elm$parser$Parser$Advanced$Bad, p, x);
			} else {
				var p1 = _v1.a;
				var a = _v1.b;
				var s1 = _v1.c;
				var _v2 = callback(a);
				var parseB = _v2;
				var _v3 = parseB(s1);
				if (_v3.$ === 1) {
					var p2 = _v3.a;
					var x = _v3.b;
					return A2($elm$parser$Parser$Advanced$Bad, p1 || p2, x);
				} else {
					var p2 = _v3.a;
					var b = _v3.b;
					var s2 = _v3.c;
					return A3($elm$parser$Parser$Advanced$Good, p1 || p2, b, s2);
				}
			}
		};
	});
var $elm$parser$Parser$andThen = $elm$parser$Parser$Advanced$andThen;
var $elm$parser$Parser$Advanced$isSubChar = _Parser_isSubChar;
var $elm$parser$Parser$Advanced$chompWhileHelp = F5(
	function (isGood, offset, row, col, s0) {
		chompWhileHelp:
		while (true) {
			var newOffset = A3($elm$parser$Parser$Advanced$isSubChar, isGood, offset, s0.b);
			if (_Utils_eq(newOffset, -1)) {
				return A3(
					$elm$parser$Parser$Advanced$Good,
					_Utils_cmp(s0.c, offset) < 0,
					0,
					{c5: col, g: s0.g, h: s0.h, c: offset, ao: row, b: s0.b});
			} else {
				if (_Utils_eq(newOffset, -2)) {
					var $temp$isGood = isGood,
						$temp$offset = offset + 1,
						$temp$row = row + 1,
						$temp$col = 1,
						$temp$s0 = s0;
					isGood = $temp$isGood;
					offset = $temp$offset;
					row = $temp$row;
					col = $temp$col;
					s0 = $temp$s0;
					continue chompWhileHelp;
				} else {
					var $temp$isGood = isGood,
						$temp$offset = newOffset,
						$temp$row = row,
						$temp$col = col + 1,
						$temp$s0 = s0;
					isGood = $temp$isGood;
					offset = $temp$offset;
					row = $temp$row;
					col = $temp$col;
					s0 = $temp$s0;
					continue chompWhileHelp;
				}
			}
		}
	});
var $elm$parser$Parser$Advanced$chompWhile = function (isGood) {
	return function (s) {
		return A5($elm$parser$Parser$Advanced$chompWhileHelp, isGood, s.c, s.ao, s.c5, s);
	};
};
var $elm$parser$Parser$chompWhile = $elm$parser$Parser$Advanced$chompWhile;
var $elm$parser$Parser$Advanced$mapChompedString = F2(
	function (func, _v0) {
		var parse = _v0;
		return function (s0) {
			var _v1 = parse(s0);
			if (_v1.$ === 1) {
				var p = _v1.a;
				var x = _v1.b;
				return A2($elm$parser$Parser$Advanced$Bad, p, x);
			} else {
				var p = _v1.a;
				var a = _v1.b;
				var s1 = _v1.c;
				return A3(
					$elm$parser$Parser$Advanced$Good,
					p,
					A2(
						func,
						A3($elm$core$String$slice, s0.c, s1.c, s0.b),
						a),
					s1);
			}
		};
	});
var $elm$parser$Parser$Advanced$getChompedString = function (parser) {
	return A2($elm$parser$Parser$Advanced$mapChompedString, $elm$core$Basics$always, parser);
};
var $elm$parser$Parser$getChompedString = $elm$parser$Parser$Advanced$getChompedString;
var $elm$parser$Parser$Problem = function (a) {
	return {$: 12, a: a};
};
var $elm$parser$Parser$Advanced$problem = function (x) {
	return function (s) {
		return A2(
			$elm$parser$Parser$Advanced$Bad,
			false,
			A2($elm$parser$Parser$Advanced$fromState, s, x));
	};
};
var $elm$parser$Parser$problem = function (msg) {
	return $elm$parser$Parser$Advanced$problem(
		$elm$parser$Parser$Problem(msg));
};
var $elm$parser$Parser$Advanced$succeed = function (a) {
	return function (s) {
		return A3($elm$parser$Parser$Advanced$Good, false, a, s);
	};
};
var $elm$parser$Parser$succeed = $elm$parser$Parser$Advanced$succeed;
var $bellroy$elm_email$Email$parseDomain = A2(
	$elm$parser$Parser$andThen,
	function (a) {
		return ($elm$core$String$length(a) < 1) ? $elm$parser$Parser$problem('Domain has to be at least 1 character long.') : $elm$parser$Parser$succeed(a);
	},
	$elm$parser$Parser$getChompedString(
		A2(
			$elm$parser$Parser$ignorer,
			$elm$parser$Parser$succeed(0),
			$elm$parser$Parser$chompWhile(
				function (a) {
					return ($elm$core$Char$isAlphaNum(a) || (a === '-')) && ((a !== '@') && (a !== '.'));
				}))));
var $elm$core$String$endsWith = _String_endsWith;
var $elm$core$String$trim = _String_trim;
var $bellroy$elm_email$Email$parseLocalPart = A2(
	$elm$parser$Parser$andThen,
	function (localPart) {
		return (A2($elm$core$String$startsWith, '.', localPart) || (A2($elm$core$String$endsWith, '.', localPart) || A2($elm$core$String$contains, '..', localPart))) ? $elm$parser$Parser$problem('Local part can\'t start or end with a dot, nor can there be double dots.') : ((!_Utils_eq(
			$elm$core$String$trim(localPart),
			localPart)) ? $elm$parser$Parser$problem('Local part can\'t be wrapped with whitespace.') : $elm$parser$Parser$succeed(localPart));
	},
	$elm$parser$Parser$getChompedString(
		A2(
			$elm$parser$Parser$ignorer,
			$elm$parser$Parser$succeed(0),
			$elm$parser$Parser$chompWhile(
				function (a) {
					return (a !== '+') && ((a !== '@') && ((a !== '\\') && (a !== '\"')));
				}))));
var $elm$core$Basics$ge = _Utils_ge;
var $bellroy$elm_email$Email$parseTld = A2(
	$elm$parser$Parser$andThen,
	function (a) {
		return ($elm$core$String$length(a) >= 2) ? $elm$parser$Parser$succeed(a) : $elm$parser$Parser$problem('TLD needs to be at least 2 character long.');
	},
	$elm$parser$Parser$getChompedString(
		A2(
			$elm$parser$Parser$ignorer,
			$elm$parser$Parser$succeed(0),
			$elm$parser$Parser$chompWhile(
				function (a) {
					return $elm$core$Char$isUpper(a) || ($elm$core$Char$isLower(a) || (a === '-'));
				}))));
var $elm$parser$Parser$ExpectingSymbol = function (a) {
	return {$: 8, a: a};
};
var $elm$parser$Parser$Advanced$Token = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $elm$parser$Parser$Advanced$isSubString = _Parser_isSubString;
var $elm$parser$Parser$Advanced$token = function (_v0) {
	var str = _v0.a;
	var expecting = _v0.b;
	var progress = !$elm$core$String$isEmpty(str);
	return function (s) {
		var _v1 = A5($elm$parser$Parser$Advanced$isSubString, str, s.c, s.ao, s.c5, s.b);
		var newOffset = _v1.a;
		var newRow = _v1.b;
		var newCol = _v1.c;
		return _Utils_eq(newOffset, -1) ? A2(
			$elm$parser$Parser$Advanced$Bad,
			false,
			A2($elm$parser$Parser$Advanced$fromState, s, expecting)) : A3(
			$elm$parser$Parser$Advanced$Good,
			progress,
			0,
			{c5: newCol, g: s.g, h: s.h, c: newOffset, ao: newRow, b: s.b});
	};
};
var $elm$parser$Parser$Advanced$symbol = $elm$parser$Parser$Advanced$token;
var $elm$parser$Parser$symbol = function (str) {
	return $elm$parser$Parser$Advanced$symbol(
		A2(
			$elm$parser$Parser$Advanced$Token,
			str,
			$elm$parser$Parser$ExpectingSymbol(str)));
};
var $bellroy$elm_email$Email$parseEmail = function () {
	var split = F2(
		function (_char, parser) {
			return A2(
				$elm$parser$Parser$loop,
				_List_Nil,
				function (r) {
					return $elm$parser$Parser$oneOf(
						_List_fromArray(
							[
								A2(
								$elm$parser$Parser$keeper,
								A2(
									$elm$parser$Parser$ignorer,
									$elm$parser$Parser$succeed(
										function (tld) {
											return $elm$parser$Parser$Loop(
												A2($elm$core$List$cons, tld, r));
										}),
									$elm$parser$Parser$symbol(
										$elm$core$String$fromChar(_char))),
								parser),
								A2(
								$elm$parser$Parser$map,
								function (_v1) {
									return $elm$parser$Parser$Done(
										$elm$core$List$reverse(r));
								},
								$elm$parser$Parser$succeed(0))
							]));
				});
		});
	return A2(
		$elm$parser$Parser$keeper,
		A2(
			$elm$parser$Parser$keeper,
			A2(
				$elm$parser$Parser$keeper,
				A2(
					$elm$parser$Parser$keeper,
					$elm$parser$Parser$succeed(
						F4(
							function (localPart, tags, domain, tlds) {
								var fullLocalPart = A2(
									$elm$core$String$join,
									'',
									_List_fromArray(
										[
											localPart,
											function () {
											if (!tags.b) {
												return '';
											} else {
												return '+' + A2($elm$core$String$join, '+', tags);
											}
										}()
										]));
								return ($elm$core$String$length(fullLocalPart) > 64) ? $elm$core$Maybe$Nothing : (($elm$core$List$length(tlds) < 1) ? $elm$core$Maybe$Nothing : $elm$core$Maybe$Just(
									{ch: domain, ct: localPart, cJ: tags, cM: tlds}));
							})),
					$bellroy$elm_email$Email$parseLocalPart),
				A2(
					$elm$parser$Parser$ignorer,
					A2(split, '+', $bellroy$elm_email$Email$parseLocalPart),
					$elm$parser$Parser$symbol('@'))),
			$bellroy$elm_email$Email$parseDomain),
		A2(
			$elm$parser$Parser$ignorer,
			A2(split, '.', $bellroy$elm_email$Email$parseTld),
			$elm$parser$Parser$end));
}();
var $elm$parser$Parser$DeadEnd = F3(
	function (row, col, problem) {
		return {c5: col, dX: problem, ao: row};
	});
var $elm$parser$Parser$problemToDeadEnd = function (p) {
	return A3($elm$parser$Parser$DeadEnd, p.ao, p.c5, p.dX);
};
var $elm$parser$Parser$Advanced$bagToList = F2(
	function (bag, list) {
		bagToList:
		while (true) {
			switch (bag.$) {
				case 0:
					return list;
				case 1:
					var bag1 = bag.a;
					var x = bag.b;
					var $temp$bag = bag1,
						$temp$list = A2($elm$core$List$cons, x, list);
					bag = $temp$bag;
					list = $temp$list;
					continue bagToList;
				default:
					var bag1 = bag.a;
					var bag2 = bag.b;
					var $temp$bag = bag1,
						$temp$list = A2($elm$parser$Parser$Advanced$bagToList, bag2, list);
					bag = $temp$bag;
					list = $temp$list;
					continue bagToList;
			}
		}
	});
var $elm$parser$Parser$Advanced$run = F2(
	function (_v0, src) {
		var parse = _v0;
		var _v1 = parse(
			{c5: 1, g: _List_Nil, h: 1, c: 0, ao: 1, b: src});
		if (!_v1.$) {
			var value = _v1.b;
			return $elm$core$Result$Ok(value);
		} else {
			var bag = _v1.b;
			return $elm$core$Result$Err(
				A2($elm$parser$Parser$Advanced$bagToList, bag, _List_Nil));
		}
	});
var $elm$parser$Parser$run = F2(
	function (parser, source) {
		var _v0 = A2($elm$parser$Parser$Advanced$run, parser, source);
		if (!_v0.$) {
			var a = _v0.a;
			return $elm$core$Result$Ok(a);
		} else {
			var problems = _v0.a;
			return $elm$core$Result$Err(
				A2($elm$core$List$map, $elm$parser$Parser$problemToDeadEnd, problems));
		}
	});
var $bellroy$elm_email$Email$fromString = function (string) {
	var _v0 = A2($elm$parser$Parser$run, $bellroy$elm_email$Email$parseEmail, string);
	if (!_v0.$) {
		var result = _v0.a;
		return result;
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $elm$core$Basics$min = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) < 0) ? x : y;
	});
var $author$project$Pages$OrderTickets$totalAmount = function (model) {
	var nonMemberTotal = model.F.dN * model.F.fu;
	var memberTotal = model.E.dN * model.E.fu;
	return memberTotal + nonMemberTotal;
};
var $author$project$Pages$OrderTickets$update = F3(
	function (msg, _v0, model) {
		switch (msg.$) {
			case 0:
				return _Utils_Tuple2(model, $author$project$Lib$Effect$None);
			case 1:
				if (!msg.a.$) {
					var response = msg.a.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{X: response.ex}),
						$author$project$Lib$Effect$none);
				} else {
					var error = msg.a.a;
					return _Utils_Tuple2(
						model,
						$author$project$Lib$Effect$Shared(
							$author$project$Shared$Error(error)));
				}
			case 2:
				var str = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							eG: str,
							aD: !$elm$core$String$isEmpty(str)
						}),
					$author$project$Lib$Effect$None);
			case 3:
				var str = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							fh: str,
							aQ: !$elm$core$String$isEmpty(str)
						}),
					$author$project$Lib$Effect$None);
			case 4:
				var str = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							eY: str,
							aJ: !$elm$core$String$isEmpty(str),
							aK: true
						}),
					$author$project$Lib$Effect$None);
			case 5:
				var str = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							aG: str,
							aH: !$elm$core$String$isEmpty(str)
						}),
					$author$project$Lib$Effect$None);
			case 6:
				var str = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							ba: str,
							bb: !$elm$core$String$isEmpty(str)
						}),
					$author$project$Lib$Effect$None);
			case 13:
				var totalNumberOfTickets = (model.E.dN + model.F.dN) + model.N.dN;
				var updatedModel = _Utils_update(
					model,
					{
						aD: !$elm$core$String$isEmpty(model.eG),
						aH: !$elm$core$String$isEmpty(model.aG),
						aJ: !$elm$core$String$isEmpty(model.eY),
						aK: function () {
							var _v2 = $bellroy$elm_email$Email$fromString(model.eY);
							if (!_v2.$) {
								return true;
							} else {
								return false;
							}
						}(),
						a7: _Utils_eq(model.eY, model.aG),
						Y: totalNumberOfTickets > 0,
						aQ: !$elm$core$String$isEmpty(model.fh)
					});
				var isValid = updatedModel.aD && (updatedModel.aQ && (updatedModel.aJ && (updatedModel.aK && (updatedModel.aH && (updatedModel.a7 && updatedModel.Y)))));
				var effect = isValid ? $author$project$Lib$Effect$Shared(
					A2(
						$author$project$Shared$OrderInfoEntered,
						{
							eG: model.eG,
							eY: model.eY,
							fh: model.fh,
							ei: _List_fromArray(
								[model.E, model.F, model.N])
						},
						$author$project$Pages$OrderTickets$totalAmount(model))) : $author$project$Lib$Effect$None;
				return _Utils_Tuple2(updatedModel, effect);
			case 7:
				var info = model.E;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							Y: true,
							E: _Utils_update(
								info,
								{dN: info.dN + 1})
						}),
					$author$project$Lib$Effect$None);
			case 8:
				var info = model.E;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							E: _Utils_update(
								info,
								{
									dN: A2($elm$core$Basics$max, 0, info.dN - 1)
								})
						}),
					$author$project$Lib$Effect$None);
			case 9:
				var info = model.F;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							Y: true,
							F: _Utils_update(
								info,
								{dN: info.dN + 1})
						}),
					$author$project$Lib$Effect$None);
			case 10:
				var info = model.F;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							F: _Utils_update(
								info,
								{
									dN: A2($elm$core$Basics$max, 0, info.dN - 1)
								})
						}),
					$author$project$Lib$Effect$None);
			case 11:
				var info = model.N;
				var freeTicketMax = A2($elm$core$Basics$min, model.X, 2);
				var freeTicketCodeMatches = model.ba === 'MMOKT0724';
				return freeTicketCodeMatches ? _Utils_Tuple2(
					_Utils_update(
						model,
						{
							N: _Utils_update(
								info,
								{
									dN: A2($elm$core$Basics$min, freeTicketMax, info.dN + 1)
								}),
							Y: true
						}),
					$author$project$Lib$Effect$None) : _Utils_Tuple2(
					_Utils_update(
						model,
						{bb: false}),
					$author$project$Lib$Effect$none);
			default:
				var info = model.N;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							N: _Utils_update(
								info,
								{
									dN: A2($elm$core$Basics$max, 0, info.dN - 1)
								})
						}),
					$author$project$Lib$Effect$None);
		}
	});
var $author$project$Pages$OrderTicketsTemp$totalAmount = function (model) {
	return 666;
};
var $author$project$Pages$OrderTicketsTemp$update = F3(
	function (msg, _v0, model) {
		switch (msg.$) {
			case 0:
				return _Utils_Tuple2(model, $author$project$Lib$Effect$None);
			case 1:
				if (!msg.a.$) {
					var response = msg.a.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{X: response.ex}),
						$author$project$Lib$Effect$none);
				} else {
					var error = msg.a.a;
					return _Utils_Tuple2(
						model,
						$author$project$Lib$Effect$Shared(
							$author$project$Shared$Error(error)));
				}
			case 2:
				var str = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							eG: str,
							aD: !$elm$core$String$isEmpty(str)
						}),
					$author$project$Lib$Effect$None);
			case 3:
				var str = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							fh: str,
							aQ: !$elm$core$String$isEmpty(str)
						}),
					$author$project$Lib$Effect$None);
			case 4:
				var str = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							eY: str,
							aJ: !$elm$core$String$isEmpty(str),
							aK: true
						}),
					$author$project$Lib$Effect$None);
			case 5:
				var str = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							aG: str,
							aH: !$elm$core$String$isEmpty(str)
						}),
					$author$project$Lib$Effect$None);
			case 6:
				var str = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							ba: str,
							bb: !$elm$core$String$isEmpty(str)
						}),
					$author$project$Lib$Effect$None);
			case 13:
				var totalNumberOfTickets = (model.E.dN + model.F.dN) + model.N.dN;
				var updatedModel = _Utils_update(
					model,
					{
						aD: !$elm$core$String$isEmpty(model.eG),
						aH: !$elm$core$String$isEmpty(model.aG),
						aJ: !$elm$core$String$isEmpty(model.eY),
						aK: function () {
							var _v2 = $bellroy$elm_email$Email$fromString(model.eY);
							if (!_v2.$) {
								return true;
							} else {
								return false;
							}
						}(),
						a7: _Utils_eq(model.eY, model.aG),
						Y: totalNumberOfTickets > 0,
						aQ: !$elm$core$String$isEmpty(model.fh)
					});
				var isValid = updatedModel.aD && (updatedModel.aQ && (updatedModel.aJ && (updatedModel.aK && (updatedModel.aH && (updatedModel.a7 && updatedModel.Y)))));
				var effect = isValid ? $author$project$Lib$Effect$Shared(
					A2(
						$author$project$Shared$OrderInfoEntered,
						{
							eG: model.eG,
							eY: model.eY,
							fh: model.fh,
							ei: _List_fromArray(
								[model.E, model.F, model.N])
						},
						$author$project$Pages$OrderTicketsTemp$totalAmount(model))) : $author$project$Lib$Effect$None;
				return _Utils_Tuple2(updatedModel, effect);
			case 7:
				var info = model.E;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							Y: true,
							E: _Utils_update(
								info,
								{dN: info.dN + 1})
						}),
					$author$project$Lib$Effect$None);
			case 8:
				var info = model.E;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							E: _Utils_update(
								info,
								{
									dN: A2($elm$core$Basics$max, 0, info.dN - 1)
								})
						}),
					$author$project$Lib$Effect$None);
			case 9:
				var info = model.F;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							Y: true,
							F: _Utils_update(
								info,
								{dN: info.dN + 1})
						}),
					$author$project$Lib$Effect$None);
			case 10:
				var info = model.F;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							F: _Utils_update(
								info,
								{
									dN: A2($elm$core$Basics$max, 0, info.dN - 1)
								})
						}),
					$author$project$Lib$Effect$None);
			case 11:
				var info = model.N;
				var freeTicketMax = A2($elm$core$Basics$min, model.X, 2);
				var freeTicketCodeMatches = model.ba === 'MMOKT0724';
				return freeTicketCodeMatches ? _Utils_Tuple2(
					_Utils_update(
						model,
						{
							N: _Utils_update(
								info,
								{
									dN: A2($elm$core$Basics$min, freeTicketMax, info.dN + 1)
								}),
							Y: true
						}),
					$author$project$Lib$Effect$None) : _Utils_Tuple2(
					_Utils_update(
						model,
						{bb: false}),
					$author$project$Lib$Effect$none);
			default:
				var info = model.N;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							N: _Utils_update(
								info,
								{
									dN: A2($elm$core$Basics$max, 0, info.dN - 1)
								})
						}),
					$author$project$Lib$Effect$None);
		}
	});
var $author$project$Shared$ConfirmOrder = {$: 6};
var $author$project$Shared$LogToServer = function (a) {
	return {$: 8, a: a};
};
var $author$project$Pages$Payment$update = F3(
	function (msg, shared, model) {
		switch (msg.$) {
			case 0:
				return _Utils_Tuple2(model, $author$project$Lib$Effect$None);
			case 1:
				var succes = msg.a;
				if (succes) {
					return _Utils_Tuple2(
						model,
						$author$project$Lib$Effect$Shared(
							$author$project$Shared$LogToServer('Widget Mounted.')));
				} else {
					var retried = model.bk;
					var effect = (retried < 3) ? $author$project$Lib$Effect$Batch(
						_List_fromArray(
							[
								$author$project$Lib$Effect$Shared(
								$author$project$Shared$LogToServer('Sumup failed to mount, retrying.')),
								$author$project$Lib$Effect$Cmd(
								$author$project$Pages$Payment$showSumUpWidget(shared.c9))
							])) : $author$project$Lib$Effect$none;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{bk: retried + 1}),
						effect);
				}
			case 2:
				var succes = msg.a;
				return succes ? _Utils_Tuple2(
					model,
					$author$project$Lib$Effect$Shared($author$project$Shared$ConfirmOrder)) : _Utils_Tuple2(
					_Utils_update(
						model,
						{aY: true}),
					$author$project$Lib$Effect$none);
			default:
				var failure = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{aY: true}),
					$author$project$Lib$Effect$Shared(
						$author$project$Shared$LogToServer(failure.ck + (' :  ' + failure.eC))));
		}
	});
var $author$project$Pages$PaymentSuccess$MailSend = function (a) {
	return {$: 2, a: a};
};
var $author$project$Api$SendMail$MailResult = function (success) {
	return {fJ: success};
};
var $author$project$Api$SendMail$decoder = A3(
	$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
	'success',
	$elm$json$Json$Decode$bool,
	$elm$json$Json$Decode$succeed($author$project$Api$SendMail$MailResult));
var $author$project$Api$SendMail$encoder = function (payload) {
	return $elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'email',
				$elm$json$Json$Encode$string(payload.eY)),
				_Utils_Tuple2(
				'orderId',
				$elm$json$Json$Encode$string(payload.dQ)),
				_Utils_Tuple2(
				'total',
				$elm$json$Json$Encode$float(payload.ej)),
				_Utils_Tuple2(
				'url',
				$elm$json$Json$Encode$string(payload.fT))
			]));
};
var $author$project$Api$SendMail$dispatch = F3(
	function (baseApiUrl, payload, msg) {
		var jsonPayload = A2(
			$elm$json$Json$Encode$encode,
			0,
			$author$project$Api$SendMail$encoder(payload));
		var request = $elm$http$Http$request(
			{
				eC: A2($elm$http$Http$stringBody, 'application/json', jsonPayload),
				e_: A2($elm$http$Http$expectJson, msg, $author$project$Api$SendMail$decoder),
				e6: _List_Nil,
				fl: 'POST',
				fN: $elm$core$Maybe$Nothing,
				fQ: $elm$core$Maybe$Nothing,
				fT: baseApiUrl + 'send-mail'
			});
		return request;
	});
var $elm$core$List$sum = function (numbers) {
	return A3($elm$core$List$foldl, $elm$core$Basics$add, 0, numbers);
};
var $author$project$Pages$PaymentSuccess$totalAmount = function (orderInfo) {
	return $elm$core$List$sum(
		A2(
			$elm$core$List$map,
			function (a) {
				return a.fu;
			},
			orderInfo.fM));
};
var $author$project$Pages$PaymentSuccess$update = F3(
	function (msg, shared, model) {
		switch (msg.$) {
			case 0:
				return _Utils_Tuple2(model, $author$project$Lib$Effect$None);
			case 1:
				if (!msg.a.$) {
					var orderInfo = msg.a.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								bN: $elm$core$Maybe$Just(orderInfo)
							}),
						$author$project$Lib$Effect$Cmd(
							A3(
								$author$project$Api$SendMail$dispatch,
								shared.eB,
								{
									eY: orderInfo.eY,
									dQ: orderInfo.dv,
									ej: $author$project$Pages$PaymentSuccess$totalAmount(orderInfo),
									fT: 'https://pequivents.netlify.app/tickets/' + (orderInfo.dv + ('-' + orderInfo.eI))
								},
								$author$project$Pages$PaymentSuccess$MailSend)));
				} else {
					var error = msg.a.a;
					return _Utils_Tuple2(
						model,
						$author$project$Lib$Effect$Shared(
							$author$project$Shared$Error(error)));
				}
			default:
				if (!msg.a.$) {
					return _Utils_Tuple2(model, $author$project$Lib$Effect$none);
				} else {
					var error = msg.a.a;
					return _Utils_Tuple2(
						model,
						$author$project$Lib$Effect$Shared(
							$author$project$Shared$Error(error)));
				}
		}
	});
var $elm$browser$Browser$Navigation$back = F2(
	function (key, n) {
		return A2(_Browser_go, key, -n);
	});
var $author$project$Pages$TeesAndCees$update = F3(
	function (msg, shared, model) {
		return _Utils_Tuple2(
			model,
			$author$project$Lib$Effect$Cmd(
				A2($elm$browser$Browser$Navigation$back, shared.fo, 1)));
	});
var $author$project$Pages$Tickets$update = F3(
	function (msg, _v0, model) {
		if (!msg.$) {
			return _Utils_Tuple2(model, $author$project$Lib$Effect$None);
		} else {
			if (!msg.a.$) {
				var orderInfo = msg.a.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							bI: _Utils_eq(orderInfo.eI, model.eI),
							bN: $elm$core$Maybe$Just(orderInfo)
						}),
					$author$project$Lib$Effect$none);
			} else {
				var error = msg.a.a;
				return _Utils_Tuple2(
					model,
					$author$project$Lib$Effect$Shared(
						$author$project$Shared$Error(error)));
			}
		}
	});
var $author$project$Helmsman$update = F3(
	function (msg, shared, model) {
		var _v0 = _Utils_Tuple2(msg, model);
		_v0$8:
		while (true) {
			switch (_v0.a.$) {
				case 0:
					if (_v0.b.$ === 2) {
						var pageMsg = _v0.a.a;
						var page = _v0.b.a;
						var _v1 = A3($author$project$Pages$Home$update, pageMsg, shared, page);
						var updatedPage = _v1.a;
						var effect = _v1.b;
						return _Utils_Tuple2(
							$author$project$Helmsman$HomePage(updatedPage),
							A2($author$project$Lib$Effect$map, $author$project$Helmsman$HomeMsg, effect));
					} else {
						break _v0$8;
					}
				case 1:
					if (_v0.b.$ === 3) {
						var pageMsg = _v0.a.a;
						var page = _v0.b.a;
						var _v2 = A3($author$project$Pages$OrderTickets$update, pageMsg, shared, page);
						var updatedPage = _v2.a;
						var effect = _v2.b;
						return _Utils_Tuple2(
							$author$project$Helmsman$OrderTicketsPage(updatedPage),
							A2($author$project$Lib$Effect$map, $author$project$Helmsman$OrderTicketsMsg, effect));
					} else {
						break _v0$8;
					}
				case 2:
					if (_v0.b.$ === 4) {
						var pageMsg = _v0.a.a;
						var page = _v0.b.a;
						var _v3 = A3($author$project$Pages$PaymentSuccess$update, pageMsg, shared, page);
						var updatedPage = _v3.a;
						var effect = _v3.b;
						return _Utils_Tuple2(
							$author$project$Helmsman$PaymentSuccessPage(updatedPage),
							A2($author$project$Lib$Effect$map, $author$project$Helmsman$PaymentSuccessMsg, effect));
					} else {
						break _v0$8;
					}
				case 3:
					if (_v0.b.$ === 5) {
						var pageMsg = _v0.a.a;
						var page = _v0.b.a;
						var _v4 = A3($author$project$Pages$Payment$update, pageMsg, shared, page);
						var updatedPage = _v4.a;
						var effect = _v4.b;
						return _Utils_Tuple2(
							$author$project$Helmsman$PaymentPage(updatedPage),
							A2($author$project$Lib$Effect$map, $author$project$Helmsman$PaymentMsg, effect));
					} else {
						break _v0$8;
					}
				case 4:
					if (_v0.b.$ === 6) {
						var pageMsg = _v0.a.a;
						var page = _v0.b.a;
						var _v5 = A3($author$project$Pages$TeesAndCees$update, pageMsg, shared, page);
						var updatedPage = _v5.a;
						var effect = _v5.b;
						return _Utils_Tuple2(
							$author$project$Helmsman$TeesAndCeesPage(updatedPage),
							A2($author$project$Lib$Effect$map, $author$project$Helmsman$TeesAndCeesMsg, effect));
					} else {
						break _v0$8;
					}
				case 5:
					if (_v0.b.$ === 7) {
						var pageMsg = _v0.a.a;
						var page = _v0.b.a;
						var _v6 = A3($author$project$Pages$InvoiceInfo$update, pageMsg, shared, page);
						var updatedPage = _v6.a;
						var effect = _v6.b;
						return _Utils_Tuple2(
							$author$project$Helmsman$InvoiceInfoPage(updatedPage),
							A2($author$project$Lib$Effect$map, $author$project$Helmsman$InvoiceInfoMsg, effect));
					} else {
						break _v0$8;
					}
				case 6:
					if (_v0.b.$ === 8) {
						var pageMsg = _v0.a.a;
						var page = _v0.b.a;
						var _v7 = A3($author$project$Pages$Tickets$update, pageMsg, shared, page);
						var updatedPage = _v7.a;
						var effect = _v7.b;
						return _Utils_Tuple2(
							$author$project$Helmsman$TicketsPage(updatedPage),
							A2($author$project$Lib$Effect$map, $author$project$Helmsman$TicketsMsg, effect));
					} else {
						break _v0$8;
					}
				default:
					if (_v0.b.$ === 9) {
						var pageMsg = _v0.a.a;
						var page = _v0.b.a;
						var _v8 = A3($author$project$Pages$OrderTicketsTemp$update, pageMsg, shared, page);
						var updatedPage = _v8.a;
						var effect = _v8.b;
						return _Utils_Tuple2(
							$author$project$Helmsman$OrderTicketsTempPage(updatedPage),
							A2($author$project$Lib$Effect$map, $author$project$Helmsman$OrderTicketsTempMsg, effect));
					} else {
						break _v0$8;
					}
			}
		}
		return _Utils_Tuple2(model, $author$project$Lib$Effect$none);
	});
var $author$project$App$update = F2(
	function (msg, model) {
		switch (msg.$) {
			case 0:
				var sharedMsg = msg.a;
				var _v1 = A2($author$project$Shared$update, sharedMsg, model.B);
				var shared = _v1.a;
				var cmd = _v1.b;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{B: shared}),
					A2($elm$core$Platform$Cmd$map, $author$project$App$SharedMsg, cmd));
			case 1:
				var helmsmanMsg = msg.a;
				var _v2 = A3($author$project$Helmsman$update, helmsmanMsg, model.B, model.aP);
				var helmsman = _v2.a;
				var effect = _v2.b;
				var _v3 = A2($author$project$App$applyEffect, effect, model.B);
				var shared = _v3.a;
				var cmd = _v3.b;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{aP: helmsman, B: shared}),
					cmd);
			case 2:
				var urlRequest = msg.a;
				if (!urlRequest.$) {
					var url = urlRequest.a;
					return _Utils_Tuple2(
						model,
						A2(
							$elm$browser$Browser$Navigation$pushUrl,
							model.B.fo,
							$elm$url$Url$toString(url)));
				} else {
					var href = urlRequest.a;
					return _Utils_Tuple2(
						model,
						$elm$browser$Browser$Navigation$load(href));
				}
			default:
				var url = msg.a;
				var _v5 = A2($author$project$Routes$changeRouteToFromUrl, url, model);
				var model_ = _v5.a;
				var helmsmanCmd = _v5.b;
				return _Utils_Tuple2(
					model_,
					A2($elm$core$Platform$Cmd$map, $author$project$App$HelmsmanMsg, helmsmanCmd));
		}
	});
var $rtfeldman$elm_css$VirtualDom$Styled$Node = F3(
	function (a, b, c) {
		return {$: 0, a: a, b: b, c: c};
	});
var $rtfeldman$elm_css$VirtualDom$Styled$node = $rtfeldman$elm_css$VirtualDom$Styled$Node;
var $rtfeldman$elm_css$Html$Styled$node = $rtfeldman$elm_css$VirtualDom$Styled$node;
var $rtfeldman$elm_css$Html$Styled$div = $rtfeldman$elm_css$Html$Styled$node('div');
var $author$project$App$errorToString = function (err) {
	switch (err.$) {
		case 1:
			return 'Timeout exceeded';
		case 2:
			return 'Network error';
		case 3:
			var status = err.a;
			return 'Bad Status' + $elm$core$String$fromInt(status);
		case 4:
			var text = err.a;
			return 'Unexpected response from api: ' + text;
		default:
			var url = err.a;
			return 'Malformed url: ' + url;
	}
};
var $rtfeldman$elm_css$Css$Preprocess$AppendProperty = function (a) {
	return {$: 0, a: a};
};
var $rtfeldman$elm_css$Css$Structure$Property = $elm$core$Basics$identity;
var $rtfeldman$elm_css$Css$property = F2(
	function (key, value) {
		return $rtfeldman$elm_css$Css$Preprocess$AppendProperty(key + (':' + value));
	});
var $rtfeldman$elm_css$Css$prop1 = F2(
	function (key, arg) {
		return A2($rtfeldman$elm_css$Css$property, key, arg.S);
	});
var $elm$core$List$isEmpty = function (xs) {
	if (!xs.b) {
		return true;
	} else {
		return false;
	}
};
var $rtfeldman$elm_css$Css$stringsToValue = function (list) {
	return $elm$core$List$isEmpty(list) ? {S: 'none'} : {
		S: A2($elm$core$String$join, ', ', list)
	};
};
var $rtfeldman$elm_css$Css$fontFamilies = A2(
	$elm$core$Basics$composeL,
	$rtfeldman$elm_css$Css$prop1('font-family'),
	$rtfeldman$elm_css$Css$stringsToValue);
var $rtfeldman$elm_css$Css$fontSize = $rtfeldman$elm_css$Css$prop1('font-size');
var $rtfeldman$elm_css$Css$fontWeight = function (_v0) {
	var value = _v0.S;
	return A2($rtfeldman$elm_css$Css$property, 'font-weight', value);
};
var $rtfeldman$elm_css$VirtualDom$Styled$KeyedNode = F3(
	function (a, b, c) {
		return {$: 2, a: a, b: b, c: c};
	});
var $rtfeldman$elm_css$VirtualDom$Styled$KeyedNodeNS = F4(
	function (a, b, c, d) {
		return {$: 3, a: a, b: b, c: c, d: d};
	});
var $rtfeldman$elm_css$VirtualDom$Styled$NodeNS = F4(
	function (a, b, c, d) {
		return {$: 1, a: a, b: b, c: c, d: d};
	});
var $rtfeldman$elm_css$VirtualDom$Styled$Unstyled = function (a) {
	return {$: 4, a: a};
};
var $elm$virtual_dom$VirtualDom$map = _VirtualDom_map;
var $rtfeldman$elm_css$VirtualDom$Styled$Attribute = F3(
	function (a, b, c) {
		return {$: 0, a: a, b: b, c: c};
	});
var $elm$virtual_dom$VirtualDom$mapAttribute = _VirtualDom_mapAttribute;
var $rtfeldman$elm_css$VirtualDom$Styled$mapAttribute = F2(
	function (transform, _v0) {
		var prop = _v0.a;
		var isCssStyle = _v0.b;
		var cssTemplate = _v0.c;
		return A3(
			$rtfeldman$elm_css$VirtualDom$Styled$Attribute,
			A2($elm$virtual_dom$VirtualDom$mapAttribute, transform, prop),
			isCssStyle,
			cssTemplate);
	});
var $rtfeldman$elm_css$VirtualDom$Styled$map = F2(
	function (transform, vdomNode) {
		switch (vdomNode.$) {
			case 0:
				var elemType = vdomNode.a;
				var properties = vdomNode.b;
				var children = vdomNode.c;
				return A3(
					$rtfeldman$elm_css$VirtualDom$Styled$Node,
					elemType,
					A2(
						$elm$core$List$map,
						$rtfeldman$elm_css$VirtualDom$Styled$mapAttribute(transform),
						properties),
					A2(
						$elm$core$List$map,
						$rtfeldman$elm_css$VirtualDom$Styled$map(transform),
						children));
			case 1:
				var ns = vdomNode.a;
				var elemType = vdomNode.b;
				var properties = vdomNode.c;
				var children = vdomNode.d;
				return A4(
					$rtfeldman$elm_css$VirtualDom$Styled$NodeNS,
					ns,
					elemType,
					A2(
						$elm$core$List$map,
						$rtfeldman$elm_css$VirtualDom$Styled$mapAttribute(transform),
						properties),
					A2(
						$elm$core$List$map,
						$rtfeldman$elm_css$VirtualDom$Styled$map(transform),
						children));
			case 2:
				var elemType = vdomNode.a;
				var properties = vdomNode.b;
				var children = vdomNode.c;
				return A3(
					$rtfeldman$elm_css$VirtualDom$Styled$KeyedNode,
					elemType,
					A2(
						$elm$core$List$map,
						$rtfeldman$elm_css$VirtualDom$Styled$mapAttribute(transform),
						properties),
					A2(
						$elm$core$List$map,
						function (_v1) {
							var key = _v1.a;
							var child = _v1.b;
							return _Utils_Tuple2(
								key,
								A2($rtfeldman$elm_css$VirtualDom$Styled$map, transform, child));
						},
						children));
			case 3:
				var ns = vdomNode.a;
				var elemType = vdomNode.b;
				var properties = vdomNode.c;
				var children = vdomNode.d;
				return A4(
					$rtfeldman$elm_css$VirtualDom$Styled$KeyedNodeNS,
					ns,
					elemType,
					A2(
						$elm$core$List$map,
						$rtfeldman$elm_css$VirtualDom$Styled$mapAttribute(transform),
						properties),
					A2(
						$elm$core$List$map,
						function (_v2) {
							var key = _v2.a;
							var child = _v2.b;
							return _Utils_Tuple2(
								key,
								A2($rtfeldman$elm_css$VirtualDom$Styled$map, transform, child));
						},
						children));
			default:
				var vdom = vdomNode.a;
				return $rtfeldman$elm_css$VirtualDom$Styled$Unstyled(
					A2($elm$virtual_dom$VirtualDom$map, transform, vdom));
		}
	});
var $rtfeldman$elm_css$Html$Styled$map = $rtfeldman$elm_css$VirtualDom$Styled$map;
var $rtfeldman$elm_css$Css$Structure$Compatible = 0;
var $rtfeldman$elm_css$Css$normal = {dm: 0, a9: 0, ah: 0, aU: 0, dS: 0, S: 'normal', aw: 0};
var $rtfeldman$elm_css$Css$PxUnits = 0;
var $elm$core$String$fromFloat = _String_fromNumber;
var $rtfeldman$elm_css$Css$Internal$lengthConverter = F3(
	function (units, unitLabel, numericValue) {
		return {
			cQ: 0,
			c2: 0,
			aL: 0,
			u: 0,
			be: 0,
			aR: 0,
			Z: 0,
			aS: 0,
			aT: 0,
			aj: 0,
			ak: 0,
			P: 0,
			aU: 0,
			aa: numericValue,
			a_: 0,
			a0: unitLabel,
			bq: units,
			S: _Utils_ap(
				$elm$core$String$fromFloat(numericValue),
				unitLabel)
		};
	});
var $rtfeldman$elm_css$Css$px = A2($rtfeldman$elm_css$Css$Internal$lengthConverter, 0, 'px');
var $elm$core$List$any = F2(
	function (isOkay, list) {
		any:
		while (true) {
			if (!list.b) {
				return false;
			} else {
				var x = list.a;
				var xs = list.b;
				if (isOkay(x)) {
					return true;
				} else {
					var $temp$isOkay = isOkay,
						$temp$list = xs;
					isOkay = $temp$isOkay;
					list = $temp$list;
					continue any;
				}
			}
		}
	});
var $elm$core$List$all = F2(
	function (isOkay, list) {
		return !A2(
			$elm$core$List$any,
			A2($elm$core$Basics$composeL, $elm$core$Basics$not, isOkay),
			list);
	});
var $rtfeldman$elm_css$Css$Structure$compactHelp = F2(
	function (declaration, _v0) {
		var keyframesByName = _v0.a;
		var declarations = _v0.b;
		switch (declaration.$) {
			case 0:
				var _v2 = declaration.a;
				var properties = _v2.c;
				return $elm$core$List$isEmpty(properties) ? _Utils_Tuple2(keyframesByName, declarations) : _Utils_Tuple2(
					keyframesByName,
					A2($elm$core$List$cons, declaration, declarations));
			case 1:
				var styleBlocks = declaration.b;
				return A2(
					$elm$core$List$all,
					function (_v3) {
						var properties = _v3.c;
						return $elm$core$List$isEmpty(properties);
					},
					styleBlocks) ? _Utils_Tuple2(keyframesByName, declarations) : _Utils_Tuple2(
					keyframesByName,
					A2($elm$core$List$cons, declaration, declarations));
			case 2:
				var otherDeclarations = declaration.b;
				return $elm$core$List$isEmpty(otherDeclarations) ? _Utils_Tuple2(keyframesByName, declarations) : _Utils_Tuple2(
					keyframesByName,
					A2($elm$core$List$cons, declaration, declarations));
			case 3:
				return _Utils_Tuple2(
					keyframesByName,
					A2($elm$core$List$cons, declaration, declarations));
			case 4:
				var properties = declaration.a;
				return $elm$core$List$isEmpty(properties) ? _Utils_Tuple2(keyframesByName, declarations) : _Utils_Tuple2(
					keyframesByName,
					A2($elm$core$List$cons, declaration, declarations));
			case 5:
				var properties = declaration.a;
				return $elm$core$List$isEmpty(properties) ? _Utils_Tuple2(keyframesByName, declarations) : _Utils_Tuple2(
					keyframesByName,
					A2($elm$core$List$cons, declaration, declarations));
			case 6:
				var record = declaration.a;
				return $elm$core$String$isEmpty(record.eP) ? _Utils_Tuple2(keyframesByName, declarations) : _Utils_Tuple2(
					A3($elm$core$Dict$insert, record.dK, record.eP, keyframesByName),
					declarations);
			case 7:
				var properties = declaration.a;
				return $elm$core$List$isEmpty(properties) ? _Utils_Tuple2(keyframesByName, declarations) : _Utils_Tuple2(
					keyframesByName,
					A2($elm$core$List$cons, declaration, declarations));
			case 8:
				var properties = declaration.a;
				return $elm$core$List$isEmpty(properties) ? _Utils_Tuple2(keyframesByName, declarations) : _Utils_Tuple2(
					keyframesByName,
					A2($elm$core$List$cons, declaration, declarations));
			default:
				var tuples = declaration.a;
				return A2(
					$elm$core$List$all,
					function (_v4) {
						var properties = _v4.b;
						return $elm$core$List$isEmpty(properties);
					},
					tuples) ? _Utils_Tuple2(keyframesByName, declarations) : _Utils_Tuple2(
					keyframesByName,
					A2($elm$core$List$cons, declaration, declarations));
		}
	});
var $rtfeldman$elm_css$Css$Structure$Keyframes = function (a) {
	return {$: 6, a: a};
};
var $rtfeldman$elm_css$Css$Structure$withKeyframeDeclarations = F2(
	function (keyframesByName, compactedDeclarations) {
		return A2(
			$elm$core$List$append,
			A2(
				$elm$core$List$map,
				function (_v0) {
					var name = _v0.a;
					var decl = _v0.b;
					return $rtfeldman$elm_css$Css$Structure$Keyframes(
						{eP: decl, dK: name});
				},
				$elm$core$Dict$toList(keyframesByName)),
			compactedDeclarations);
	});
var $rtfeldman$elm_css$Css$Structure$compactDeclarations = function (declarations) {
	var _v0 = A3(
		$elm$core$List$foldr,
		$rtfeldman$elm_css$Css$Structure$compactHelp,
		_Utils_Tuple2($elm$core$Dict$empty, _List_Nil),
		declarations);
	var keyframesByName = _v0.a;
	var compactedDeclarations = _v0.b;
	return A2($rtfeldman$elm_css$Css$Structure$withKeyframeDeclarations, keyframesByName, compactedDeclarations);
};
var $rtfeldman$elm_css$Css$Structure$compactStylesheet = function (_v0) {
	var charset = _v0.c4;
	var imports = _v0.dy;
	var namespaces = _v0.dL;
	var declarations = _v0.eQ;
	return {
		c4: charset,
		eQ: $rtfeldman$elm_css$Css$Structure$compactDeclarations(declarations),
		dy: imports,
		dL: namespaces
	};
};
var $elm$core$Maybe$map = F2(
	function (f, maybe) {
		if (!maybe.$) {
			var value = maybe.a;
			return $elm$core$Maybe$Just(
				f(value));
		} else {
			return $elm$core$Maybe$Nothing;
		}
	});
var $rtfeldman$elm_css$Css$Structure$Output$charsetToString = function (charset) {
	return A2(
		$elm$core$Maybe$withDefault,
		'',
		A2(
			$elm$core$Maybe$map,
			function (str) {
				return '@charset \"' + (str + '\"');
			},
			charset));
};
var $rtfeldman$elm_css$Css$String$mapJoinHelp = F4(
	function (map, sep, strs, result) {
		mapJoinHelp:
		while (true) {
			if (!strs.b) {
				return result;
			} else {
				if (!strs.b.b) {
					var first = strs.a;
					return result + (map(first) + '');
				} else {
					var first = strs.a;
					var rest = strs.b;
					var $temp$map = map,
						$temp$sep = sep,
						$temp$strs = rest,
						$temp$result = result + (map(first) + (sep + ''));
					map = $temp$map;
					sep = $temp$sep;
					strs = $temp$strs;
					result = $temp$result;
					continue mapJoinHelp;
				}
			}
		}
	});
var $rtfeldman$elm_css$Css$String$mapJoin = F3(
	function (map, sep, strs) {
		return A4($rtfeldman$elm_css$Css$String$mapJoinHelp, map, sep, strs, '');
	});
var $rtfeldman$elm_css$Css$Structure$Output$mediaExpressionToString = function (expression) {
	return '(' + (expression.dl + (A2(
		$elm$core$Maybe$withDefault,
		'',
		A2(
			$elm$core$Maybe$map,
			$elm$core$Basics$append(': '),
			expression.S)) + ')'));
};
var $rtfeldman$elm_css$Css$Structure$Output$mediaTypeToString = function (mediaType) {
	switch (mediaType) {
		case 0:
			return 'print';
		case 1:
			return 'screen';
		default:
			return 'speech';
	}
};
var $rtfeldman$elm_css$Css$Structure$Output$mediaQueryToString = function (mediaQuery) {
	var prefixWith = F3(
		function (str, mediaType, expressions) {
			return str + (' ' + A2(
				$elm$core$String$join,
				' and ',
				A2(
					$elm$core$List$cons,
					$rtfeldman$elm_css$Css$Structure$Output$mediaTypeToString(mediaType),
					A2($elm$core$List$map, $rtfeldman$elm_css$Css$Structure$Output$mediaExpressionToString, expressions))));
		});
	switch (mediaQuery.$) {
		case 0:
			var expressions = mediaQuery.a;
			return A3($rtfeldman$elm_css$Css$String$mapJoin, $rtfeldman$elm_css$Css$Structure$Output$mediaExpressionToString, ' and ', expressions);
		case 1:
			var mediaType = mediaQuery.a;
			var expressions = mediaQuery.b;
			return A3(prefixWith, 'only', mediaType, expressions);
		case 2:
			var mediaType = mediaQuery.a;
			var expressions = mediaQuery.b;
			return A3(prefixWith, 'not', mediaType, expressions);
		default:
			var str = mediaQuery.a;
			return str;
	}
};
var $rtfeldman$elm_css$Css$Structure$Output$importMediaQueryToString = F2(
	function (name, mediaQuery) {
		return '@import \"' + (name + ($rtfeldman$elm_css$Css$Structure$Output$mediaQueryToString(mediaQuery) + '\"'));
	});
var $rtfeldman$elm_css$Css$Structure$Output$importToString = function (_v0) {
	var name = _v0.a;
	var mediaQueries = _v0.b;
	return A3(
		$rtfeldman$elm_css$Css$String$mapJoin,
		$rtfeldman$elm_css$Css$Structure$Output$importMediaQueryToString(name),
		'\n',
		mediaQueries);
};
var $rtfeldman$elm_css$Css$Structure$Output$namespaceToString = function (_v0) {
	var prefix = _v0.a;
	var str = _v0.b;
	return '@namespace ' + (prefix + ('\"' + (str + '\"')));
};
var $rtfeldman$elm_css$Css$Structure$Output$emitProperties = function (properties) {
	return A3(
		$rtfeldman$elm_css$Css$String$mapJoin,
		function (_v0) {
			var prop = _v0;
			return prop + ';';
		},
		'',
		properties);
};
var $elm$core$String$append = _String_append;
var $rtfeldman$elm_css$Css$Structure$Output$pseudoElementToString = function (_v0) {
	var str = _v0;
	return '::' + str;
};
var $rtfeldman$elm_css$Css$Structure$Output$combinatorToString = function (combinator) {
	switch (combinator) {
		case 0:
			return '+';
		case 1:
			return '~';
		case 2:
			return '>';
		default:
			return '';
	}
};
var $rtfeldman$elm_css$Css$Structure$Output$repeatableSimpleSelectorToString = function (repeatableSimpleSelector) {
	switch (repeatableSimpleSelector.$) {
		case 0:
			var str = repeatableSimpleSelector.a;
			return '.' + str;
		case 1:
			var str = repeatableSimpleSelector.a;
			return '#' + str;
		case 2:
			var str = repeatableSimpleSelector.a;
			return ':' + str;
		default:
			var str = repeatableSimpleSelector.a;
			return '[' + (str + ']');
	}
};
var $rtfeldman$elm_css$Css$Structure$Output$simpleSelectorSequenceToString = function (simpleSelectorSequence) {
	switch (simpleSelectorSequence.$) {
		case 0:
			var str = simpleSelectorSequence.a;
			var repeatableSimpleSelectors = simpleSelectorSequence.b;
			return _Utils_ap(
				str,
				A3($rtfeldman$elm_css$Css$String$mapJoin, $rtfeldman$elm_css$Css$Structure$Output$repeatableSimpleSelectorToString, '', repeatableSimpleSelectors));
		case 1:
			var repeatableSimpleSelectors = simpleSelectorSequence.a;
			return $elm$core$List$isEmpty(repeatableSimpleSelectors) ? '*' : A3($rtfeldman$elm_css$Css$String$mapJoin, $rtfeldman$elm_css$Css$Structure$Output$repeatableSimpleSelectorToString, '', repeatableSimpleSelectors);
		default:
			var str = simpleSelectorSequence.a;
			var repeatableSimpleSelectors = simpleSelectorSequence.b;
			return _Utils_ap(
				str,
				A3($rtfeldman$elm_css$Css$String$mapJoin, $rtfeldman$elm_css$Css$Structure$Output$repeatableSimpleSelectorToString, '', repeatableSimpleSelectors));
	}
};
var $rtfeldman$elm_css$Css$Structure$Output$selectorChainToString = function (_v0) {
	var combinator = _v0.a;
	var sequence = _v0.b;
	return $rtfeldman$elm_css$Css$Structure$Output$combinatorToString(combinator) + (' ' + $rtfeldman$elm_css$Css$Structure$Output$simpleSelectorSequenceToString(sequence));
};
var $rtfeldman$elm_css$Css$Structure$Output$selectorToString = function (_v0) {
	var simpleSelectorSequence = _v0.a;
	var chain = _v0.b;
	var pseudoElement = _v0.c;
	var segments = A2(
		$elm$core$List$cons,
		$rtfeldman$elm_css$Css$Structure$Output$simpleSelectorSequenceToString(simpleSelectorSequence),
		A2($elm$core$List$map, $rtfeldman$elm_css$Css$Structure$Output$selectorChainToString, chain));
	var pseudoElementsString = A2(
		$elm$core$Maybe$withDefault,
		'',
		A2($elm$core$Maybe$map, $rtfeldman$elm_css$Css$Structure$Output$pseudoElementToString, pseudoElement));
	return A2(
		$elm$core$String$append,
		A2($elm$core$String$join, ' ', segments),
		pseudoElementsString);
};
var $rtfeldman$elm_css$Css$Structure$Output$prettyPrintStyleBlock = function (_v0) {
	var firstSelector = _v0.a;
	var otherSelectors = _v0.b;
	var properties = _v0.c;
	var selectorStr = A3(
		$rtfeldman$elm_css$Css$String$mapJoin,
		$rtfeldman$elm_css$Css$Structure$Output$selectorToString,
		',',
		A2($elm$core$List$cons, firstSelector, otherSelectors));
	return selectorStr + ('{' + ($rtfeldman$elm_css$Css$Structure$Output$emitProperties(properties) + '}'));
};
var $rtfeldman$elm_css$Css$Structure$Output$prettyPrintDeclaration = function (decl) {
	switch (decl.$) {
		case 0:
			var styleBlock = decl.a;
			return $rtfeldman$elm_css$Css$Structure$Output$prettyPrintStyleBlock(styleBlock);
		case 1:
			var mediaQueries = decl.a;
			var styleBlocks = decl.b;
			var query = A3($rtfeldman$elm_css$Css$String$mapJoin, $rtfeldman$elm_css$Css$Structure$Output$mediaQueryToString, ', ', mediaQueries);
			var blocks = A3($rtfeldman$elm_css$Css$String$mapJoin, $rtfeldman$elm_css$Css$Structure$Output$prettyPrintStyleBlock, '\n', styleBlocks);
			return '@media ' + (query + ('{' + (blocks + '}')));
		case 2:
			return 'TODO';
		case 3:
			return 'TODO';
		case 4:
			return 'TODO';
		case 5:
			return 'TODO';
		case 6:
			var name = decl.a.dK;
			var declaration = decl.a.eP;
			return '@keyframes ' + (name + ('{' + (declaration + '}')));
		case 7:
			return 'TODO';
		case 8:
			return 'TODO';
		default:
			return 'TODO';
	}
};
var $rtfeldman$elm_css$Css$Structure$Output$prettyPrint = function (_v0) {
	var charset = _v0.c4;
	var imports = _v0.dy;
	var namespaces = _v0.dL;
	var declarations = _v0.eQ;
	return $rtfeldman$elm_css$Css$Structure$Output$charsetToString(charset) + (A3($rtfeldman$elm_css$Css$String$mapJoin, $rtfeldman$elm_css$Css$Structure$Output$importToString, '\n', imports) + (A3($rtfeldman$elm_css$Css$String$mapJoin, $rtfeldman$elm_css$Css$Structure$Output$namespaceToString, '\n', namespaces) + (A3($rtfeldman$elm_css$Css$String$mapJoin, $rtfeldman$elm_css$Css$Structure$Output$prettyPrintDeclaration, '\n', declarations) + '')));
};
var $rtfeldman$elm_css$Css$Structure$CounterStyle = function (a) {
	return {$: 8, a: a};
};
var $rtfeldman$elm_css$Css$Structure$FontFace = function (a) {
	return {$: 5, a: a};
};
var $rtfeldman$elm_css$Css$Structure$PageRule = function (a) {
	return {$: 4, a: a};
};
var $rtfeldman$elm_css$Css$Structure$Selector = F3(
	function (a, b, c) {
		return {$: 0, a: a, b: b, c: c};
	});
var $rtfeldman$elm_css$Css$Structure$StyleBlock = F3(
	function (a, b, c) {
		return {$: 0, a: a, b: b, c: c};
	});
var $rtfeldman$elm_css$Css$Structure$StyleBlockDeclaration = function (a) {
	return {$: 0, a: a};
};
var $rtfeldman$elm_css$Css$Structure$SupportsRule = F2(
	function (a, b) {
		return {$: 2, a: a, b: b};
	});
var $rtfeldman$elm_css$Css$Structure$Viewport = function (a) {
	return {$: 7, a: a};
};
var $rtfeldman$elm_css$Css$Structure$MediaRule = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var $rtfeldman$elm_css$Css$Structure$mapLast = F2(
	function (update, list) {
		if (!list.b) {
			return list;
		} else {
			if (!list.b.b) {
				var only = list.a;
				return _List_fromArray(
					[
						update(only)
					]);
			} else {
				var first = list.a;
				var rest = list.b;
				return A2(
					$elm$core$List$cons,
					first,
					A2($rtfeldman$elm_css$Css$Structure$mapLast, update, rest));
			}
		}
	});
var $rtfeldman$elm_css$Css$Structure$withPropertyAppended = F2(
	function (property, _v0) {
		var firstSelector = _v0.a;
		var otherSelectors = _v0.b;
		var properties = _v0.c;
		return A3(
			$rtfeldman$elm_css$Css$Structure$StyleBlock,
			firstSelector,
			otherSelectors,
			_Utils_ap(
				properties,
				_List_fromArray(
					[property])));
	});
var $rtfeldman$elm_css$Css$Structure$appendProperty = F2(
	function (property, declarations) {
		if (!declarations.b) {
			return declarations;
		} else {
			if (!declarations.b.b) {
				switch (declarations.a.$) {
					case 0:
						var styleBlock = declarations.a.a;
						return _List_fromArray(
							[
								$rtfeldman$elm_css$Css$Structure$StyleBlockDeclaration(
								A2($rtfeldman$elm_css$Css$Structure$withPropertyAppended, property, styleBlock))
							]);
					case 1:
						var _v1 = declarations.a;
						var mediaQueries = _v1.a;
						var styleBlocks = _v1.b;
						return _List_fromArray(
							[
								A2(
								$rtfeldman$elm_css$Css$Structure$MediaRule,
								mediaQueries,
								A2(
									$rtfeldman$elm_css$Css$Structure$mapLast,
									$rtfeldman$elm_css$Css$Structure$withPropertyAppended(property),
									styleBlocks))
							]);
					default:
						return declarations;
				}
			} else {
				var first = declarations.a;
				var rest = declarations.b;
				return A2(
					$elm$core$List$cons,
					first,
					A2($rtfeldman$elm_css$Css$Structure$appendProperty, property, rest));
			}
		}
	});
var $rtfeldman$elm_css$Css$Structure$appendToLastSelector = F2(
	function (f, styleBlock) {
		if (!styleBlock.b.b) {
			var only = styleBlock.a;
			var properties = styleBlock.c;
			return _List_fromArray(
				[
					A3($rtfeldman$elm_css$Css$Structure$StyleBlock, only, _List_Nil, properties),
					A3(
					$rtfeldman$elm_css$Css$Structure$StyleBlock,
					f(only),
					_List_Nil,
					_List_Nil)
				]);
		} else {
			var first = styleBlock.a;
			var rest = styleBlock.b;
			var properties = styleBlock.c;
			var newRest = A2($elm$core$List$map, f, rest);
			var newFirst = f(first);
			return _List_fromArray(
				[
					A3($rtfeldman$elm_css$Css$Structure$StyleBlock, first, rest, properties),
					A3($rtfeldman$elm_css$Css$Structure$StyleBlock, newFirst, newRest, _List_Nil)
				]);
		}
	});
var $rtfeldman$elm_css$Css$Structure$applyPseudoElement = F2(
	function (pseudo, _v0) {
		var sequence = _v0.a;
		var selectors = _v0.b;
		return A3(
			$rtfeldman$elm_css$Css$Structure$Selector,
			sequence,
			selectors,
			$elm$core$Maybe$Just(pseudo));
	});
var $rtfeldman$elm_css$Css$Structure$appendPseudoElementToLastSelector = F2(
	function (pseudo, styleBlock) {
		return A2(
			$rtfeldman$elm_css$Css$Structure$appendToLastSelector,
			$rtfeldman$elm_css$Css$Structure$applyPseudoElement(pseudo),
			styleBlock);
	});
var $rtfeldman$elm_css$Css$Structure$CustomSelector = F2(
	function (a, b) {
		return {$: 2, a: a, b: b};
	});
var $rtfeldman$elm_css$Css$Structure$TypeSelectorSequence = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $rtfeldman$elm_css$Css$Structure$UniversalSelectorSequence = function (a) {
	return {$: 1, a: a};
};
var $rtfeldman$elm_css$Css$Structure$appendRepeatable = F2(
	function (selector, sequence) {
		switch (sequence.$) {
			case 0:
				var typeSelector = sequence.a;
				var list = sequence.b;
				return A2(
					$rtfeldman$elm_css$Css$Structure$TypeSelectorSequence,
					typeSelector,
					_Utils_ap(
						list,
						_List_fromArray(
							[selector])));
			case 1:
				var list = sequence.a;
				return $rtfeldman$elm_css$Css$Structure$UniversalSelectorSequence(
					_Utils_ap(
						list,
						_List_fromArray(
							[selector])));
			default:
				var str = sequence.a;
				var list = sequence.b;
				return A2(
					$rtfeldman$elm_css$Css$Structure$CustomSelector,
					str,
					_Utils_ap(
						list,
						_List_fromArray(
							[selector])));
		}
	});
var $rtfeldman$elm_css$Css$Structure$appendRepeatableWithCombinator = F2(
	function (selector, list) {
		if (!list.b) {
			return _List_Nil;
		} else {
			if (!list.b.b) {
				var _v1 = list.a;
				var combinator = _v1.a;
				var sequence = _v1.b;
				return _List_fromArray(
					[
						_Utils_Tuple2(
						combinator,
						A2($rtfeldman$elm_css$Css$Structure$appendRepeatable, selector, sequence))
					]);
			} else {
				var first = list.a;
				var rest = list.b;
				return A2(
					$elm$core$List$cons,
					first,
					A2($rtfeldman$elm_css$Css$Structure$appendRepeatableWithCombinator, selector, rest));
			}
		}
	});
var $rtfeldman$elm_css$Css$Structure$appendRepeatableSelector = F2(
	function (repeatableSimpleSelector, selector) {
		if (!selector.b.b) {
			var sequence = selector.a;
			var pseudoElement = selector.c;
			return A3(
				$rtfeldman$elm_css$Css$Structure$Selector,
				A2($rtfeldman$elm_css$Css$Structure$appendRepeatable, repeatableSimpleSelector, sequence),
				_List_Nil,
				pseudoElement);
		} else {
			var firstSelector = selector.a;
			var tuples = selector.b;
			var pseudoElement = selector.c;
			return A3(
				$rtfeldman$elm_css$Css$Structure$Selector,
				firstSelector,
				A2($rtfeldman$elm_css$Css$Structure$appendRepeatableWithCombinator, repeatableSimpleSelector, tuples),
				pseudoElement);
		}
	});
var $rtfeldman$elm_css$Css$Structure$appendRepeatableToLastSelector = F2(
	function (selector, styleBlock) {
		return A2(
			$rtfeldman$elm_css$Css$Structure$appendToLastSelector,
			$rtfeldman$elm_css$Css$Structure$appendRepeatableSelector(selector),
			styleBlock);
	});
var $rtfeldman$elm_css$Css$Preprocess$Resolve$collectSelectors = function (declarations) {
	collectSelectors:
	while (true) {
		if (!declarations.b) {
			return _List_Nil;
		} else {
			if (!declarations.a.$) {
				var _v1 = declarations.a.a;
				var firstSelector = _v1.a;
				var otherSelectors = _v1.b;
				var rest = declarations.b;
				return _Utils_ap(
					A2($elm$core$List$cons, firstSelector, otherSelectors),
					$rtfeldman$elm_css$Css$Preprocess$Resolve$collectSelectors(rest));
			} else {
				var rest = declarations.b;
				var $temp$declarations = rest;
				declarations = $temp$declarations;
				continue collectSelectors;
			}
		}
	}
};
var $rtfeldman$elm_css$Css$Structure$DocumentRule = F5(
	function (a, b, c, d, e) {
		return {$: 3, a: a, b: b, c: c, d: d, e: e};
	});
var $rtfeldman$elm_css$Css$Structure$concatMapLastStyleBlock = F2(
	function (update, declarations) {
		_v0$12:
		while (true) {
			if (!declarations.b) {
				return declarations;
			} else {
				if (!declarations.b.b) {
					switch (declarations.a.$) {
						case 0:
							var styleBlock = declarations.a.a;
							return A2(
								$elm$core$List$map,
								$rtfeldman$elm_css$Css$Structure$StyleBlockDeclaration,
								update(styleBlock));
						case 1:
							if (declarations.a.b.b) {
								if (!declarations.a.b.b.b) {
									var _v1 = declarations.a;
									var mediaQueries = _v1.a;
									var _v2 = _v1.b;
									var styleBlock = _v2.a;
									return _List_fromArray(
										[
											A2(
											$rtfeldman$elm_css$Css$Structure$MediaRule,
											mediaQueries,
											update(styleBlock))
										]);
								} else {
									var _v3 = declarations.a;
									var mediaQueries = _v3.a;
									var _v4 = _v3.b;
									var first = _v4.a;
									var rest = _v4.b;
									var _v5 = A2(
										$rtfeldman$elm_css$Css$Structure$concatMapLastStyleBlock,
										update,
										_List_fromArray(
											[
												A2($rtfeldman$elm_css$Css$Structure$MediaRule, mediaQueries, rest)
											]));
									if ((_v5.b && (_v5.a.$ === 1)) && (!_v5.b.b)) {
										var _v6 = _v5.a;
										var newMediaQueries = _v6.a;
										var newStyleBlocks = _v6.b;
										return _List_fromArray(
											[
												A2(
												$rtfeldman$elm_css$Css$Structure$MediaRule,
												newMediaQueries,
												A2($elm$core$List$cons, first, newStyleBlocks))
											]);
									} else {
										var newDeclarations = _v5;
										return newDeclarations;
									}
								}
							} else {
								break _v0$12;
							}
						case 2:
							var _v7 = declarations.a;
							var str = _v7.a;
							var nestedDeclarations = _v7.b;
							return _List_fromArray(
								[
									A2(
									$rtfeldman$elm_css$Css$Structure$SupportsRule,
									str,
									A2($rtfeldman$elm_css$Css$Structure$concatMapLastStyleBlock, update, nestedDeclarations))
								]);
						case 3:
							var _v8 = declarations.a;
							var str1 = _v8.a;
							var str2 = _v8.b;
							var str3 = _v8.c;
							var str4 = _v8.d;
							var styleBlock = _v8.e;
							return A2(
								$elm$core$List$map,
								A4($rtfeldman$elm_css$Css$Structure$DocumentRule, str1, str2, str3, str4),
								update(styleBlock));
						case 4:
							return declarations;
						case 5:
							return declarations;
						case 6:
							return declarations;
						case 7:
							return declarations;
						case 8:
							return declarations;
						default:
							return declarations;
					}
				} else {
					break _v0$12;
				}
			}
		}
		var first = declarations.a;
		var rest = declarations.b;
		return A2(
			$elm$core$List$cons,
			first,
			A2($rtfeldman$elm_css$Css$Structure$concatMapLastStyleBlock, update, rest));
	});
var $rtfeldman$elm_css$Css$Preprocess$Resolve$last = function (list) {
	last:
	while (true) {
		if (!list.b) {
			return $elm$core$Maybe$Nothing;
		} else {
			if (!list.b.b) {
				var singleton = list.a;
				return $elm$core$Maybe$Just(singleton);
			} else {
				var rest = list.b;
				var $temp$list = rest;
				list = $temp$list;
				continue last;
			}
		}
	}
};
var $rtfeldman$elm_css$Css$Preprocess$Resolve$lastDeclaration = function (declarations) {
	lastDeclaration:
	while (true) {
		if (!declarations.b) {
			return $elm$core$Maybe$Nothing;
		} else {
			if (!declarations.b.b) {
				var x = declarations.a;
				return $elm$core$Maybe$Just(
					_List_fromArray(
						[x]));
			} else {
				var xs = declarations.b;
				var $temp$declarations = xs;
				declarations = $temp$declarations;
				continue lastDeclaration;
			}
		}
	}
};
var $rtfeldman$elm_css$Css$Preprocess$Resolve$oneOf = function (maybes) {
	oneOf:
	while (true) {
		if (!maybes.b) {
			return $elm$core$Maybe$Nothing;
		} else {
			var maybe = maybes.a;
			var rest = maybes.b;
			if (maybe.$ === 1) {
				var $temp$maybes = rest;
				maybes = $temp$maybes;
				continue oneOf;
			} else {
				return maybe;
			}
		}
	}
};
var $rtfeldman$elm_css$Css$Structure$FontFeatureValues = function (a) {
	return {$: 9, a: a};
};
var $rtfeldman$elm_css$Css$Preprocess$Resolve$resolveFontFeatureValues = function (tuples) {
	var expandTuples = function (tuplesToExpand) {
		if (!tuplesToExpand.b) {
			return _List_Nil;
		} else {
			var properties = tuplesToExpand.a;
			var rest = tuplesToExpand.b;
			return A2(
				$elm$core$List$cons,
				properties,
				expandTuples(rest));
		}
	};
	var newTuples = expandTuples(tuples);
	return _List_fromArray(
		[
			$rtfeldman$elm_css$Css$Structure$FontFeatureValues(newTuples)
		]);
};
var $rtfeldman$elm_css$Css$Structure$styleBlockToMediaRule = F2(
	function (mediaQueries, declaration) {
		if (!declaration.$) {
			var styleBlock = declaration.a;
			return A2(
				$rtfeldman$elm_css$Css$Structure$MediaRule,
				mediaQueries,
				_List_fromArray(
					[styleBlock]));
		} else {
			return declaration;
		}
	});
var $elm$core$List$tail = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return $elm$core$Maybe$Just(xs);
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $elm$core$List$takeReverse = F3(
	function (n, list, kept) {
		takeReverse:
		while (true) {
			if (n <= 0) {
				return kept;
			} else {
				if (!list.b) {
					return kept;
				} else {
					var x = list.a;
					var xs = list.b;
					var $temp$n = n - 1,
						$temp$list = xs,
						$temp$kept = A2($elm$core$List$cons, x, kept);
					n = $temp$n;
					list = $temp$list;
					kept = $temp$kept;
					continue takeReverse;
				}
			}
		}
	});
var $elm$core$List$takeTailRec = F2(
	function (n, list) {
		return $elm$core$List$reverse(
			A3($elm$core$List$takeReverse, n, list, _List_Nil));
	});
var $elm$core$List$takeFast = F3(
	function (ctr, n, list) {
		if (n <= 0) {
			return _List_Nil;
		} else {
			var _v0 = _Utils_Tuple2(n, list);
			_v0$1:
			while (true) {
				_v0$5:
				while (true) {
					if (!_v0.b.b) {
						return list;
					} else {
						if (_v0.b.b.b) {
							switch (_v0.a) {
								case 1:
									break _v0$1;
								case 2:
									var _v2 = _v0.b;
									var x = _v2.a;
									var _v3 = _v2.b;
									var y = _v3.a;
									return _List_fromArray(
										[x, y]);
								case 3:
									if (_v0.b.b.b.b) {
										var _v4 = _v0.b;
										var x = _v4.a;
										var _v5 = _v4.b;
										var y = _v5.a;
										var _v6 = _v5.b;
										var z = _v6.a;
										return _List_fromArray(
											[x, y, z]);
									} else {
										break _v0$5;
									}
								default:
									if (_v0.b.b.b.b && _v0.b.b.b.b.b) {
										var _v7 = _v0.b;
										var x = _v7.a;
										var _v8 = _v7.b;
										var y = _v8.a;
										var _v9 = _v8.b;
										var z = _v9.a;
										var _v10 = _v9.b;
										var w = _v10.a;
										var tl = _v10.b;
										return (ctr > 1000) ? A2(
											$elm$core$List$cons,
											x,
											A2(
												$elm$core$List$cons,
												y,
												A2(
													$elm$core$List$cons,
													z,
													A2(
														$elm$core$List$cons,
														w,
														A2($elm$core$List$takeTailRec, n - 4, tl))))) : A2(
											$elm$core$List$cons,
											x,
											A2(
												$elm$core$List$cons,
												y,
												A2(
													$elm$core$List$cons,
													z,
													A2(
														$elm$core$List$cons,
														w,
														A3($elm$core$List$takeFast, ctr + 1, n - 4, tl)))));
									} else {
										break _v0$5;
									}
							}
						} else {
							if (_v0.a === 1) {
								break _v0$1;
							} else {
								break _v0$5;
							}
						}
					}
				}
				return list;
			}
			var _v1 = _v0.b;
			var x = _v1.a;
			return _List_fromArray(
				[x]);
		}
	});
var $elm$core$List$take = F2(
	function (n, list) {
		return A3($elm$core$List$takeFast, 0, n, list);
	});
var $rtfeldman$elm_css$Css$Preprocess$Resolve$toDocumentRule = F5(
	function (str1, str2, str3, str4, declaration) {
		if (!declaration.$) {
			var structureStyleBlock = declaration.a;
			return A5($rtfeldman$elm_css$Css$Structure$DocumentRule, str1, str2, str3, str4, structureStyleBlock);
		} else {
			return declaration;
		}
	});
var $rtfeldman$elm_css$Css$Preprocess$Resolve$toMediaRule = F2(
	function (mediaQueries, declaration) {
		switch (declaration.$) {
			case 0:
				var structureStyleBlock = declaration.a;
				return A2(
					$rtfeldman$elm_css$Css$Structure$MediaRule,
					mediaQueries,
					_List_fromArray(
						[structureStyleBlock]));
			case 1:
				var newMediaQueries = declaration.a;
				var structureStyleBlocks = declaration.b;
				return A2(
					$rtfeldman$elm_css$Css$Structure$MediaRule,
					_Utils_ap(mediaQueries, newMediaQueries),
					structureStyleBlocks);
			case 2:
				var str = declaration.a;
				var declarations = declaration.b;
				return A2(
					$rtfeldman$elm_css$Css$Structure$SupportsRule,
					str,
					A2(
						$elm$core$List$map,
						$rtfeldman$elm_css$Css$Preprocess$Resolve$toMediaRule(mediaQueries),
						declarations));
			case 3:
				var str1 = declaration.a;
				var str2 = declaration.b;
				var str3 = declaration.c;
				var str4 = declaration.d;
				var structureStyleBlock = declaration.e;
				return A5($rtfeldman$elm_css$Css$Structure$DocumentRule, str1, str2, str3, str4, structureStyleBlock);
			case 4:
				return declaration;
			case 5:
				return declaration;
			case 6:
				return declaration;
			case 7:
				return declaration;
			case 8:
				return declaration;
			default:
				return declaration;
		}
	});
var $rtfeldman$elm_css$Css$Preprocess$unwrapSnippet = function (_v0) {
	var declarations = _v0;
	return declarations;
};
var $rtfeldman$elm_css$Css$Preprocess$Resolve$applyNestedStylesToLast = F4(
	function (nestedStyles, rest, f, declarations) {
		var withoutParent = function (decls) {
			return A2(
				$elm$core$Maybe$withDefault,
				_List_Nil,
				$elm$core$List$tail(decls));
		};
		var nextResult = A2(
			$rtfeldman$elm_css$Css$Preprocess$Resolve$applyStyles,
			rest,
			A2(
				$elm$core$Maybe$withDefault,
				_List_Nil,
				$rtfeldman$elm_css$Css$Preprocess$Resolve$lastDeclaration(declarations)));
		var newDeclarations = function () {
			var _v14 = _Utils_Tuple2(
				$elm$core$List$head(nextResult),
				$rtfeldman$elm_css$Css$Preprocess$Resolve$last(declarations));
			if ((!_v14.a.$) && (!_v14.b.$)) {
				var nextResultParent = _v14.a.a;
				var originalParent = _v14.b.a;
				return _Utils_ap(
					A2(
						$elm$core$List$take,
						$elm$core$List$length(declarations) - 1,
						declarations),
					_List_fromArray(
						[
							(!_Utils_eq(originalParent, nextResultParent)) ? nextResultParent : originalParent
						]));
			} else {
				return declarations;
			}
		}();
		var insertStylesToNestedDecl = function (lastDecl) {
			return $elm$core$List$concat(
				A2(
					$rtfeldman$elm_css$Css$Structure$mapLast,
					$rtfeldman$elm_css$Css$Preprocess$Resolve$applyStyles(nestedStyles),
					A2(
						$elm$core$List$map,
						$elm$core$List$singleton,
						A2($rtfeldman$elm_css$Css$Structure$concatMapLastStyleBlock, f, lastDecl))));
		};
		var initialResult = A2(
			$elm$core$Maybe$withDefault,
			_List_Nil,
			A2(
				$elm$core$Maybe$map,
				insertStylesToNestedDecl,
				$rtfeldman$elm_css$Css$Preprocess$Resolve$lastDeclaration(declarations)));
		return _Utils_ap(
			newDeclarations,
			_Utils_ap(
				withoutParent(initialResult),
				withoutParent(nextResult)));
	});
var $rtfeldman$elm_css$Css$Preprocess$Resolve$applyStyles = F2(
	function (styles, declarations) {
		if (!styles.b) {
			return declarations;
		} else {
			switch (styles.a.$) {
				case 0:
					var property = styles.a.a;
					var rest = styles.b;
					return A2(
						$rtfeldman$elm_css$Css$Preprocess$Resolve$applyStyles,
						rest,
						A2($rtfeldman$elm_css$Css$Structure$appendProperty, property, declarations));
				case 1:
					var _v4 = styles.a;
					var selector = _v4.a;
					var nestedStyles = _v4.b;
					var rest = styles.b;
					return A4(
						$rtfeldman$elm_css$Css$Preprocess$Resolve$applyNestedStylesToLast,
						nestedStyles,
						rest,
						$rtfeldman$elm_css$Css$Structure$appendRepeatableToLastSelector(selector),
						declarations);
				case 2:
					var _v5 = styles.a;
					var selectorCombinator = _v5.a;
					var snippets = _v5.b;
					var rest = styles.b;
					var chain = F2(
						function (_v9, _v10) {
							var originalSequence = _v9.a;
							var originalTuples = _v9.b;
							var originalPseudoElement = _v9.c;
							var newSequence = _v10.a;
							var newTuples = _v10.b;
							var newPseudoElement = _v10.c;
							return A3(
								$rtfeldman$elm_css$Css$Structure$Selector,
								originalSequence,
								_Utils_ap(
									originalTuples,
									A2(
										$elm$core$List$cons,
										_Utils_Tuple2(selectorCombinator, newSequence),
										newTuples)),
								$rtfeldman$elm_css$Css$Preprocess$Resolve$oneOf(
									_List_fromArray(
										[newPseudoElement, originalPseudoElement])));
						});
					var expandDeclaration = function (declaration) {
						switch (declaration.$) {
							case 0:
								var _v7 = declaration.a;
								var firstSelector = _v7.a;
								var otherSelectors = _v7.b;
								var nestedStyles = _v7.c;
								var newSelectors = A2(
									$elm$core$List$concatMap,
									function (originalSelector) {
										return A2(
											$elm$core$List$map,
											chain(originalSelector),
											A2($elm$core$List$cons, firstSelector, otherSelectors));
									},
									$rtfeldman$elm_css$Css$Preprocess$Resolve$collectSelectors(declarations));
								var newDeclarations = function () {
									if (!newSelectors.b) {
										return _List_Nil;
									} else {
										var first = newSelectors.a;
										var remainder = newSelectors.b;
										return _List_fromArray(
											[
												$rtfeldman$elm_css$Css$Structure$StyleBlockDeclaration(
												A3($rtfeldman$elm_css$Css$Structure$StyleBlock, first, remainder, _List_Nil))
											]);
									}
								}();
								return A2($rtfeldman$elm_css$Css$Preprocess$Resolve$applyStyles, nestedStyles, newDeclarations);
							case 1:
								var mediaQueries = declaration.a;
								var styleBlocks = declaration.b;
								return A2($rtfeldman$elm_css$Css$Preprocess$Resolve$resolveMediaRule, mediaQueries, styleBlocks);
							case 2:
								var str = declaration.a;
								var otherSnippets = declaration.b;
								return A2($rtfeldman$elm_css$Css$Preprocess$Resolve$resolveSupportsRule, str, otherSnippets);
							case 3:
								var str1 = declaration.a;
								var str2 = declaration.b;
								var str3 = declaration.c;
								var str4 = declaration.d;
								var styleBlock = declaration.e;
								return A2(
									$elm$core$List$map,
									A4($rtfeldman$elm_css$Css$Preprocess$Resolve$toDocumentRule, str1, str2, str3, str4),
									$rtfeldman$elm_css$Css$Preprocess$Resolve$expandStyleBlock(styleBlock));
							case 4:
								var properties = declaration.a;
								return _List_fromArray(
									[
										$rtfeldman$elm_css$Css$Structure$PageRule(properties)
									]);
							case 5:
								var properties = declaration.a;
								return _List_fromArray(
									[
										$rtfeldman$elm_css$Css$Structure$FontFace(properties)
									]);
							case 6:
								var properties = declaration.a;
								return _List_fromArray(
									[
										$rtfeldman$elm_css$Css$Structure$Viewport(properties)
									]);
							case 7:
								var properties = declaration.a;
								return _List_fromArray(
									[
										$rtfeldman$elm_css$Css$Structure$CounterStyle(properties)
									]);
							default:
								var tuples = declaration.a;
								return $rtfeldman$elm_css$Css$Preprocess$Resolve$resolveFontFeatureValues(tuples);
						}
					};
					return $elm$core$List$concat(
						_Utils_ap(
							_List_fromArray(
								[
									A2($rtfeldman$elm_css$Css$Preprocess$Resolve$applyStyles, rest, declarations)
								]),
							A2(
								$elm$core$List$map,
								expandDeclaration,
								A2($elm$core$List$concatMap, $rtfeldman$elm_css$Css$Preprocess$unwrapSnippet, snippets))));
				case 3:
					var _v11 = styles.a;
					var pseudoElement = _v11.a;
					var nestedStyles = _v11.b;
					var rest = styles.b;
					return A4(
						$rtfeldman$elm_css$Css$Preprocess$Resolve$applyNestedStylesToLast,
						nestedStyles,
						rest,
						$rtfeldman$elm_css$Css$Structure$appendPseudoElementToLastSelector(pseudoElement),
						declarations);
				case 5:
					var str = styles.a.a;
					var rest = styles.b;
					var name = $rtfeldman$elm_css$Hash$fromString(str);
					var newProperty = 'animation-name:' + name;
					var newDeclarations = A2(
						$rtfeldman$elm_css$Css$Preprocess$Resolve$applyStyles,
						rest,
						A2($rtfeldman$elm_css$Css$Structure$appendProperty, newProperty, declarations));
					return A2(
						$elm$core$List$append,
						newDeclarations,
						_List_fromArray(
							[
								$rtfeldman$elm_css$Css$Structure$Keyframes(
								{eP: str, dK: name})
							]));
				case 4:
					var _v12 = styles.a;
					var mediaQueries = _v12.a;
					var nestedStyles = _v12.b;
					var rest = styles.b;
					var extraDeclarations = function () {
						var _v13 = $rtfeldman$elm_css$Css$Preprocess$Resolve$collectSelectors(declarations);
						if (!_v13.b) {
							return _List_Nil;
						} else {
							var firstSelector = _v13.a;
							var otherSelectors = _v13.b;
							return A2(
								$elm$core$List$map,
								$rtfeldman$elm_css$Css$Structure$styleBlockToMediaRule(mediaQueries),
								A2(
									$rtfeldman$elm_css$Css$Preprocess$Resolve$applyStyles,
									nestedStyles,
									$elm$core$List$singleton(
										$rtfeldman$elm_css$Css$Structure$StyleBlockDeclaration(
											A3($rtfeldman$elm_css$Css$Structure$StyleBlock, firstSelector, otherSelectors, _List_Nil)))));
						}
					}();
					return _Utils_ap(
						A2($rtfeldman$elm_css$Css$Preprocess$Resolve$applyStyles, rest, declarations),
						extraDeclarations);
				default:
					var otherStyles = styles.a.a;
					var rest = styles.b;
					return A2(
						$rtfeldman$elm_css$Css$Preprocess$Resolve$applyStyles,
						_Utils_ap(otherStyles, rest),
						declarations);
			}
		}
	});
var $rtfeldman$elm_css$Css$Preprocess$Resolve$expandStyleBlock = function (_v2) {
	var firstSelector = _v2.a;
	var otherSelectors = _v2.b;
	var styles = _v2.c;
	return A2(
		$rtfeldman$elm_css$Css$Preprocess$Resolve$applyStyles,
		styles,
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$Structure$StyleBlockDeclaration(
				A3($rtfeldman$elm_css$Css$Structure$StyleBlock, firstSelector, otherSelectors, _List_Nil))
			]));
};
var $rtfeldman$elm_css$Css$Preprocess$Resolve$extract = function (snippetDeclarations) {
	if (!snippetDeclarations.b) {
		return _List_Nil;
	} else {
		var first = snippetDeclarations.a;
		var rest = snippetDeclarations.b;
		return _Utils_ap(
			$rtfeldman$elm_css$Css$Preprocess$Resolve$toDeclarations(first),
			$rtfeldman$elm_css$Css$Preprocess$Resolve$extract(rest));
	}
};
var $rtfeldman$elm_css$Css$Preprocess$Resolve$resolveMediaRule = F2(
	function (mediaQueries, styleBlocks) {
		var handleStyleBlock = function (styleBlock) {
			return A2(
				$elm$core$List$map,
				$rtfeldman$elm_css$Css$Preprocess$Resolve$toMediaRule(mediaQueries),
				$rtfeldman$elm_css$Css$Preprocess$Resolve$expandStyleBlock(styleBlock));
		};
		return A2($elm$core$List$concatMap, handleStyleBlock, styleBlocks);
	});
var $rtfeldman$elm_css$Css$Preprocess$Resolve$resolveSupportsRule = F2(
	function (str, snippets) {
		var declarations = $rtfeldman$elm_css$Css$Preprocess$Resolve$extract(
			A2($elm$core$List$concatMap, $rtfeldman$elm_css$Css$Preprocess$unwrapSnippet, snippets));
		return _List_fromArray(
			[
				A2($rtfeldman$elm_css$Css$Structure$SupportsRule, str, declarations)
			]);
	});
var $rtfeldman$elm_css$Css$Preprocess$Resolve$toDeclarations = function (snippetDeclaration) {
	switch (snippetDeclaration.$) {
		case 0:
			var styleBlock = snippetDeclaration.a;
			return $rtfeldman$elm_css$Css$Preprocess$Resolve$expandStyleBlock(styleBlock);
		case 1:
			var mediaQueries = snippetDeclaration.a;
			var styleBlocks = snippetDeclaration.b;
			return A2($rtfeldman$elm_css$Css$Preprocess$Resolve$resolveMediaRule, mediaQueries, styleBlocks);
		case 2:
			var str = snippetDeclaration.a;
			var snippets = snippetDeclaration.b;
			return A2($rtfeldman$elm_css$Css$Preprocess$Resolve$resolveSupportsRule, str, snippets);
		case 3:
			var str1 = snippetDeclaration.a;
			var str2 = snippetDeclaration.b;
			var str3 = snippetDeclaration.c;
			var str4 = snippetDeclaration.d;
			var styleBlock = snippetDeclaration.e;
			return A2(
				$elm$core$List$map,
				A4($rtfeldman$elm_css$Css$Preprocess$Resolve$toDocumentRule, str1, str2, str3, str4),
				$rtfeldman$elm_css$Css$Preprocess$Resolve$expandStyleBlock(styleBlock));
		case 4:
			var properties = snippetDeclaration.a;
			return _List_fromArray(
				[
					$rtfeldman$elm_css$Css$Structure$PageRule(properties)
				]);
		case 5:
			var properties = snippetDeclaration.a;
			return _List_fromArray(
				[
					$rtfeldman$elm_css$Css$Structure$FontFace(properties)
				]);
		case 6:
			var properties = snippetDeclaration.a;
			return _List_fromArray(
				[
					$rtfeldman$elm_css$Css$Structure$Viewport(properties)
				]);
		case 7:
			var properties = snippetDeclaration.a;
			return _List_fromArray(
				[
					$rtfeldman$elm_css$Css$Structure$CounterStyle(properties)
				]);
		default:
			var tuples = snippetDeclaration.a;
			return $rtfeldman$elm_css$Css$Preprocess$Resolve$resolveFontFeatureValues(tuples);
	}
};
var $rtfeldman$elm_css$Css$Preprocess$Resolve$toStructure = function (_v0) {
	var charset = _v0.c4;
	var imports = _v0.dy;
	var namespaces = _v0.dL;
	var snippets = _v0.eb;
	var declarations = $rtfeldman$elm_css$Css$Preprocess$Resolve$extract(
		A2($elm$core$List$concatMap, $rtfeldman$elm_css$Css$Preprocess$unwrapSnippet, snippets));
	return {c4: charset, eQ: declarations, dy: imports, dL: namespaces};
};
var $rtfeldman$elm_css$Css$Preprocess$Resolve$compile = function (sheet) {
	return $rtfeldman$elm_css$Css$Structure$Output$prettyPrint(
		$rtfeldman$elm_css$Css$Structure$compactStylesheet(
			$rtfeldman$elm_css$Css$Preprocess$Resolve$toStructure(sheet)));
};
var $rtfeldman$elm_css$Css$Preprocess$Snippet = $elm$core$Basics$identity;
var $rtfeldman$elm_css$Css$Preprocess$StyleBlock = F3(
	function (a, b, c) {
		return {$: 0, a: a, b: b, c: c};
	});
var $rtfeldman$elm_css$Css$Preprocess$StyleBlockDeclaration = function (a) {
	return {$: 0, a: a};
};
var $rtfeldman$elm_css$VirtualDom$Styled$makeSnippet = F2(
	function (styles, sequence) {
		var selector = A3($rtfeldman$elm_css$Css$Structure$Selector, sequence, _List_Nil, $elm$core$Maybe$Nothing);
		return _List_fromArray(
			[
				$rtfeldman$elm_css$Css$Preprocess$StyleBlockDeclaration(
				A3($rtfeldman$elm_css$Css$Preprocess$StyleBlock, selector, _List_Nil, styles))
			]);
	});
var $rtfeldman$elm_css$Css$Preprocess$stylesheet = function (snippets) {
	return {c4: $elm$core$Maybe$Nothing, dy: _List_Nil, dL: _List_Nil, eb: snippets};
};
var $rtfeldman$elm_css$Css$Structure$ClassSelector = function (a) {
	return {$: 0, a: a};
};
var $rtfeldman$elm_css$VirtualDom$Styled$templateSelector = $rtfeldman$elm_css$Css$Structure$UniversalSelectorSequence(
	_List_fromArray(
		[
			$rtfeldman$elm_css$Css$Structure$ClassSelector($rtfeldman$elm_css$VirtualDom$Styled$classnameStandin)
		]));
var $rtfeldman$elm_css$VirtualDom$Styled$getCssTemplate = function (styles) {
	if (!styles.b) {
		return '';
	} else {
		var otherwise = styles;
		return $rtfeldman$elm_css$Css$Preprocess$Resolve$compile(
			$rtfeldman$elm_css$Css$Preprocess$stylesheet(
				_List_fromArray(
					[
						A2($rtfeldman$elm_css$VirtualDom$Styled$makeSnippet, styles, $rtfeldman$elm_css$VirtualDom$Styled$templateSelector)
					])));
	}
};
var $rtfeldman$elm_css$Html$Styled$Internal$css = function (styles) {
	var cssTemplate = $rtfeldman$elm_css$VirtualDom$Styled$getCssTemplate(styles);
	var classProperty = A2($elm$virtual_dom$VirtualDom$attribute, '', '');
	return A3($rtfeldman$elm_css$VirtualDom$Styled$Attribute, classProperty, true, cssTemplate);
};
var $rtfeldman$elm_css$Html$Styled$styled = F4(
	function (fn, styles, attrs, children) {
		return A2(
			fn,
			A2(
				$elm$core$List$cons,
				$rtfeldman$elm_css$Html$Styled$Internal$css(styles),
				attrs),
			children);
	});
var $rtfeldman$elm_css$VirtualDom$Styled$text = function (str) {
	return $rtfeldman$elm_css$VirtualDom$Styled$Unstyled(
		$elm$virtual_dom$VirtualDom$text(str));
};
var $rtfeldman$elm_css$Html$Styled$text = $rtfeldman$elm_css$VirtualDom$Styled$text;
var $rtfeldman$elm_css$Css$withPrecedingHash = function (str) {
	return A2($elm$core$String$startsWith, '#', str) ? str : A2($elm$core$String$cons, '#', str);
};
var $rtfeldman$elm_css$Css$erroneousHex = function (str) {
	return {
		ay: 1,
		b9: 0,
		bx: 0,
		co: 0,
		cD: 0,
		S: $rtfeldman$elm_css$Css$withPrecedingHash(str)
	};
};
var $elm$core$String$foldr = _String_foldr;
var $elm$core$String$toList = function (string) {
	return A3($elm$core$String$foldr, $elm$core$List$cons, _List_Nil, string);
};
var $elm$core$Basics$pow = _Basics_pow;
var $rtfeldman$elm_hex$Hex$fromStringHelp = F3(
	function (position, chars, accumulated) {
		fromStringHelp:
		while (true) {
			if (!chars.b) {
				return $elm$core$Result$Ok(accumulated);
			} else {
				var _char = chars.a;
				var rest = chars.b;
				switch (_char) {
					case '0':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated;
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case '1':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + A2($elm$core$Basics$pow, 16, position);
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case '2':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (2 * A2($elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case '3':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (3 * A2($elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case '4':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (4 * A2($elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case '5':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (5 * A2($elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case '6':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (6 * A2($elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case '7':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (7 * A2($elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case '8':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (8 * A2($elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case '9':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (9 * A2($elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case 'a':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (10 * A2($elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case 'b':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (11 * A2($elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case 'c':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (12 * A2($elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case 'd':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (13 * A2($elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case 'e':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (14 * A2($elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case 'f':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (15 * A2($elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					default:
						var nonHex = _char;
						return $elm$core$Result$Err(
							$elm$core$String$fromChar(nonHex) + ' is not a valid hexadecimal character.');
				}
			}
		}
	});
var $elm$core$Result$map = F2(
	function (func, ra) {
		if (!ra.$) {
			var a = ra.a;
			return $elm$core$Result$Ok(
				func(a));
		} else {
			var e = ra.a;
			return $elm$core$Result$Err(e);
		}
	});
var $rtfeldman$elm_hex$Hex$fromString = function (str) {
	if ($elm$core$String$isEmpty(str)) {
		return $elm$core$Result$Err('Empty strings are not valid hexadecimal strings.');
	} else {
		var result = function () {
			if (A2($elm$core$String$startsWith, '-', str)) {
				var list = A2(
					$elm$core$Maybe$withDefault,
					_List_Nil,
					$elm$core$List$tail(
						$elm$core$String$toList(str)));
				return A2(
					$elm$core$Result$map,
					$elm$core$Basics$negate,
					A3(
						$rtfeldman$elm_hex$Hex$fromStringHelp,
						$elm$core$List$length(list) - 1,
						list,
						0));
			} else {
				return A3(
					$rtfeldman$elm_hex$Hex$fromStringHelp,
					$elm$core$String$length(str) - 1,
					$elm$core$String$toList(str),
					0);
			}
		}();
		var formatError = function (err) {
			return A2(
				$elm$core$String$join,
				' ',
				_List_fromArray(
					['\"' + (str + '\"'), 'is not a valid hexadecimal string because', err]));
		};
		return A2($elm$core$Result$mapError, formatError, result);
	}
};
var $elm$core$String$toLower = _String_toLower;
var $rtfeldman$elm_css$Css$validHex = F5(
	function (str, _v0, _v1, _v2, _v3) {
		var r1 = _v0.a;
		var r2 = _v0.b;
		var g1 = _v1.a;
		var g2 = _v1.b;
		var b1 = _v2.a;
		var b2 = _v2.b;
		var a1 = _v3.a;
		var a2 = _v3.b;
		var toResult = A2(
			$elm$core$Basics$composeR,
			$elm$core$String$fromList,
			A2($elm$core$Basics$composeR, $elm$core$String$toLower, $rtfeldman$elm_hex$Hex$fromString));
		var results = _Utils_Tuple2(
			_Utils_Tuple2(
				toResult(
					_List_fromArray(
						[r1, r2])),
				toResult(
					_List_fromArray(
						[g1, g2]))),
			_Utils_Tuple2(
				toResult(
					_List_fromArray(
						[b1, b2])),
				toResult(
					_List_fromArray(
						[a1, a2]))));
		if ((((!results.a.a.$) && (!results.a.b.$)) && (!results.b.a.$)) && (!results.b.b.$)) {
			var _v5 = results.a;
			var red = _v5.a.a;
			var green = _v5.b.a;
			var _v6 = results.b;
			var blue = _v6.a.a;
			var alpha = _v6.b.a;
			return {
				ay: alpha / 255,
				b9: blue,
				bx: 0,
				co: green,
				cD: red,
				S: $rtfeldman$elm_css$Css$withPrecedingHash(str)
			};
		} else {
			return $rtfeldman$elm_css$Css$erroneousHex(str);
		}
	});
var $rtfeldman$elm_css$Css$hex = function (str) {
	var withoutHash = A2($elm$core$String$startsWith, '#', str) ? A2($elm$core$String$dropLeft, 1, str) : str;
	var _v0 = $elm$core$String$toList(withoutHash);
	_v0$4:
	while (true) {
		if ((_v0.b && _v0.b.b) && _v0.b.b.b) {
			if (!_v0.b.b.b.b) {
				var r = _v0.a;
				var _v1 = _v0.b;
				var g = _v1.a;
				var _v2 = _v1.b;
				var b = _v2.a;
				return A5(
					$rtfeldman$elm_css$Css$validHex,
					str,
					_Utils_Tuple2(r, r),
					_Utils_Tuple2(g, g),
					_Utils_Tuple2(b, b),
					_Utils_Tuple2('f', 'f'));
			} else {
				if (!_v0.b.b.b.b.b) {
					var r = _v0.a;
					var _v3 = _v0.b;
					var g = _v3.a;
					var _v4 = _v3.b;
					var b = _v4.a;
					var _v5 = _v4.b;
					var a = _v5.a;
					return A5(
						$rtfeldman$elm_css$Css$validHex,
						str,
						_Utils_Tuple2(r, r),
						_Utils_Tuple2(g, g),
						_Utils_Tuple2(b, b),
						_Utils_Tuple2(a, a));
				} else {
					if (_v0.b.b.b.b.b.b) {
						if (!_v0.b.b.b.b.b.b.b) {
							var r1 = _v0.a;
							var _v6 = _v0.b;
							var r2 = _v6.a;
							var _v7 = _v6.b;
							var g1 = _v7.a;
							var _v8 = _v7.b;
							var g2 = _v8.a;
							var _v9 = _v8.b;
							var b1 = _v9.a;
							var _v10 = _v9.b;
							var b2 = _v10.a;
							return A5(
								$rtfeldman$elm_css$Css$validHex,
								str,
								_Utils_Tuple2(r1, r2),
								_Utils_Tuple2(g1, g2),
								_Utils_Tuple2(b1, b2),
								_Utils_Tuple2('f', 'f'));
						} else {
							if (_v0.b.b.b.b.b.b.b.b && (!_v0.b.b.b.b.b.b.b.b.b)) {
								var r1 = _v0.a;
								var _v11 = _v0.b;
								var r2 = _v11.a;
								var _v12 = _v11.b;
								var g1 = _v12.a;
								var _v13 = _v12.b;
								var g2 = _v13.a;
								var _v14 = _v13.b;
								var b1 = _v14.a;
								var _v15 = _v14.b;
								var b2 = _v15.a;
								var _v16 = _v15.b;
								var a1 = _v16.a;
								var _v17 = _v16.b;
								var a2 = _v17.a;
								return A5(
									$rtfeldman$elm_css$Css$validHex,
									str,
									_Utils_Tuple2(r1, r2),
									_Utils_Tuple2(g1, g2),
									_Utils_Tuple2(b1, b2),
									_Utils_Tuple2(a1, a2));
							} else {
								break _v0$4;
							}
						}
					} else {
						break _v0$4;
					}
				}
			}
		} else {
			break _v0$4;
		}
	}
	return $rtfeldman$elm_css$Css$erroneousHex(str);
};
var $author$project$Style$theme = {
	b6: $rtfeldman$elm_css$Css$hex('fff'),
	e1: _List_fromArray(
		['Roboto']),
	aO: $rtfeldman$elm_css$Css$hex('49586d'),
	bR: $rtfeldman$elm_css$Css$hex('999'),
	dW: $rtfeldman$elm_css$Css$hex('e9eef3')
};
var $rtfeldman$elm_css$Html$Styled$h1 = $rtfeldman$elm_css$Html$Styled$node('h1');
var $author$project$Pages$Home$GotoTickets = 0;
var $rtfeldman$elm_css$Html$Styled$a = $rtfeldman$elm_css$Html$Styled$node('a');
var $rtfeldman$elm_css$Css$color = function (c) {
	return A2($rtfeldman$elm_css$Css$property, 'color', c.S);
};
var $rtfeldman$elm_css$Css$prop2 = F3(
	function (key, argA, argB) {
		return A2($rtfeldman$elm_css$Css$property, key, argA.S + (' ' + argB.S));
	});
var $rtfeldman$elm_css$Css$margin2 = $rtfeldman$elm_css$Css$prop2('margin');
var $rtfeldman$elm_css$Css$pre = {S: 'pre', aw: 0};
var $rtfeldman$elm_css$Css$VwUnits = 0;
var $rtfeldman$elm_css$Css$vw = A2($rtfeldman$elm_css$Css$Internal$lengthConverter, 0, 'vw');
var $rtfeldman$elm_css$Css$whiteSpace = $rtfeldman$elm_css$Css$prop1('white-space');
var $rtfeldman$elm_css$Css$UnitlessInteger = 0;
var $rtfeldman$elm_css$Css$zero = {be: 0, aR: 0, Z: 0, aS: 0, aT: 0, aj: 0, ak: 0, fp: 0, aa: 0, bQ: 0, a0: '', bq: 0, S: '0'};
var $author$project$Style$address = _List_fromArray(
	[
		A2(
		$rtfeldman$elm_css$Css$margin2,
		$rtfeldman$elm_css$Css$zero,
		$rtfeldman$elm_css$Css$vw(1)),
		$rtfeldman$elm_css$Css$color(
		$rtfeldman$elm_css$Css$hex('222')),
		$rtfeldman$elm_css$Css$fontWeight($rtfeldman$elm_css$Css$normal),
		$rtfeldman$elm_css$Css$whiteSpace($rtfeldman$elm_css$Css$pre)
	]);
var $rtfeldman$elm_css$Html$Styled$br = $rtfeldman$elm_css$Html$Styled$node('br');
var $rtfeldman$elm_css$Css$auto = {ev: 0, d: 0, aL: 0, bH: 0, fg: 0, aR: 0, Z: 0, P: 0, aV: 0, K: 0, bY: 0, a$: 0, C: 0, S: 'auto'};
var $rtfeldman$elm_css$Css$maxWidth = $rtfeldman$elm_css$Css$prop1('max-width');
var $rtfeldman$elm_css$Css$width = $rtfeldman$elm_css$Css$prop1('width');
var $author$project$Style$container = _List_fromArray(
	[
		$rtfeldman$elm_css$Css$maxWidth(
		$rtfeldman$elm_css$Css$vw(80)),
		$rtfeldman$elm_css$Css$width(
		$rtfeldman$elm_css$Css$vw(80)),
		A2($rtfeldman$elm_css$Css$margin2, $rtfeldman$elm_css$Css$zero, $rtfeldman$elm_css$Css$auto)
	]);
var $author$project$Domain$Event$dateTimeString = function (evt) {
	return evt.ce + (' om ' + (evt.cL + ' uur.'));
};
var $rtfeldman$elm_css$Css$EmUnits = 0;
var $rtfeldman$elm_css$Css$em = A2($rtfeldman$elm_css$Css$Internal$lengthConverter, 0, 'em');
var $rtfeldman$elm_css$Html$Styled$h2 = $rtfeldman$elm_css$Html$Styled$node('h2');
var $rtfeldman$elm_css$Html$Styled$h4 = $rtfeldman$elm_css$Html$Styled$node('h4');
var $rtfeldman$elm_css$VirtualDom$Styled$property = F2(
	function (key, value) {
		return A3(
			$rtfeldman$elm_css$VirtualDom$Styled$Attribute,
			A2($elm$virtual_dom$VirtualDom$property, key, value),
			false,
			'');
	});
var $rtfeldman$elm_css$Html$Styled$Attributes$stringProperty = F2(
	function (key, string) {
		return A2(
			$rtfeldman$elm_css$VirtualDom$Styled$property,
			key,
			$elm$json$Json$Encode$string(string));
	});
var $rtfeldman$elm_css$Html$Styled$Attributes$href = function (url) {
	return A2($rtfeldman$elm_css$Html$Styled$Attributes$stringProperty, 'href', url);
};
var $rtfeldman$elm_css$Css$Preprocess$ApplyStyles = function (a) {
	return {$: 6, a: a};
};
var $rtfeldman$elm_css$Css$batch = $rtfeldman$elm_css$Css$Preprocess$ApplyStyles;
var $rtfeldman$elm_css$Css$Transitions$BoxShadow = 25;
var $rtfeldman$elm_css$Css$Transitions$Transition = $elm$core$Basics$identity;
var $rtfeldman$elm_css$Css$Transitions$durationTransition = F2(
	function (animation, duration) {
		return {bs: animation, bA: $elm$core$Maybe$Nothing, dd: duration, bZ: $elm$core$Maybe$Nothing};
	});
var $rtfeldman$elm_css$Css$Transitions$boxShadow = $rtfeldman$elm_css$Css$Transitions$durationTransition(25);
var $rtfeldman$elm_css$Css$prop6 = F7(
	function (key, argA, argB, argC, argD, argE, argF) {
		return A2($rtfeldman$elm_css$Css$property, key, argA.S + (' ' + (argB.S + (' ' + (argC.S + (' ' + (argD.S + (' ' + (argE.S + (' ' + argF.S))))))))));
	});
var $rtfeldman$elm_css$Css$boxShadow6 = $rtfeldman$elm_css$Css$prop6('box-shadow');
var $rtfeldman$elm_css$Css$Transitions$Color = 29;
var $rtfeldman$elm_css$Css$Transitions$color = $rtfeldman$elm_css$Css$Transitions$durationTransition(29);
var $rtfeldman$elm_css$Css$cursor = $rtfeldman$elm_css$Css$prop1('cursor');
var $rtfeldman$elm_css$Css$Transitions$EaseIn = {$: 2};
var $rtfeldman$elm_css$Css$Transitions$easeIn = $rtfeldman$elm_css$Css$Transitions$EaseIn;
var $rtfeldman$elm_css$Css$Preprocess$ExtendSelector = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var $rtfeldman$elm_css$Css$Structure$PseudoClassSelector = function (a) {
	return {$: 2, a: a};
};
var $rtfeldman$elm_css$Css$pseudoClass = function (_class) {
	return $rtfeldman$elm_css$Css$Preprocess$ExtendSelector(
		$rtfeldman$elm_css$Css$Structure$PseudoClassSelector(_class));
};
var $rtfeldman$elm_css$Css$hover = $rtfeldman$elm_css$Css$pseudoClass('hover');
var $rtfeldman$elm_css$Css$inset = {w: 0, S: 'inset'};
var $rtfeldman$elm_css$Css$margin = $rtfeldman$elm_css$Css$prop1('margin');
var $rtfeldman$elm_css$Css$none = {az: 0, c$: 0, w: 0, d: 0, l: 0, fa: 0, dz: 0, cs: 0, aT: 0, aj: 0, P: 0, f: 0, e: 0, cw: 0, bQ: 0, ft: 0, K: 0, bU: 0, fA: 0, aZ: 0, at: 0, C: 0, j: 0, fS: 0, S: 'none'};
var $rtfeldman$elm_css$Css$prop4 = F5(
	function (key, argA, argB, argC, argD) {
		return A2($rtfeldman$elm_css$Css$property, key, argA.S + (' ' + (argB.S + (' ' + (argC.S + (' ' + argD.S))))));
	});
var $rtfeldman$elm_css$Css$padding4 = $rtfeldman$elm_css$Css$prop4('padding');
var $rtfeldman$elm_css$Css$pointer = {d: 0, S: 'pointer'};
var $rtfeldman$elm_css$Css$textDecoration = $rtfeldman$elm_css$Css$prop1('text-decoration');
var $rtfeldman$elm_css$Css$Transitions$Transform = 89;
var $rtfeldman$elm_css$Css$Transitions$fullTransition = F4(
	function (animation, duration, delay, timing) {
		return {
			bs: animation,
			bA: $elm$core$Maybe$Just(delay),
			dd: duration,
			bZ: $elm$core$Maybe$Just(timing)
		};
	});
var $rtfeldman$elm_css$Css$Transitions$transform3 = $rtfeldman$elm_css$Css$Transitions$fullTransition(89);
var $rtfeldman$elm_css$Css$Transitions$propToString = function (prop) {
	switch (prop) {
		case 0:
			return 'background';
		case 1:
			return 'background-color';
		case 2:
			return 'background-position';
		case 3:
			return 'background-size';
		case 4:
			return 'border';
		case 5:
			return 'border-bottom';
		case 6:
			return 'border-bottom-color';
		case 7:
			return 'border-bottom-left-radius';
		case 8:
			return 'border-bottom-right-radius';
		case 9:
			return 'border-bottom-width';
		case 10:
			return 'border-color';
		case 11:
			return 'border-left';
		case 12:
			return 'border-left-color';
		case 13:
			return 'border-left-width';
		case 14:
			return 'border-radius';
		case 15:
			return 'border-right';
		case 16:
			return 'border-right-color';
		case 17:
			return 'border-right-width';
		case 18:
			return 'border-top';
		case 19:
			return 'border-top-color';
		case 20:
			return 'border-top-left-radius';
		case 21:
			return 'border-top-right-radius';
		case 22:
			return 'border-top-width';
		case 23:
			return 'border-width';
		case 24:
			return 'bottom';
		case 25:
			return 'box-shadow';
		case 26:
			return 'caret-color';
		case 27:
			return 'clip';
		case 28:
			return 'clip-path';
		case 29:
			return 'color';
		case 30:
			return 'column-count';
		case 31:
			return 'column-gap';
		case 32:
			return 'column-rule';
		case 33:
			return 'column-rule-color';
		case 34:
			return 'column-rule-width';
		case 35:
			return 'column-width';
		case 36:
			return 'columns';
		case 37:
			return 'filter';
		case 38:
			return 'flex';
		case 39:
			return 'flex-basis';
		case 40:
			return 'flex-grow';
		case 41:
			return 'flex-shrink';
		case 42:
			return 'font';
		case 43:
			return 'font-size';
		case 44:
			return 'font-size-adjust';
		case 45:
			return 'font-stretch';
		case 46:
			return 'font-variation-settings';
		case 47:
			return 'font-weight';
		case 48:
			return 'grid-column-gap';
		case 49:
			return 'grid-gap';
		case 50:
			return 'grid-row-gap';
		case 51:
			return 'height';
		case 52:
			return 'left';
		case 53:
			return 'letter-spacing';
		case 54:
			return 'line-height';
		case 55:
			return 'margin';
		case 56:
			return 'margin-bottom';
		case 57:
			return 'margin-left';
		case 58:
			return 'margin-right';
		case 59:
			return 'margin-top';
		case 60:
			return 'mask';
		case 61:
			return 'mask-position';
		case 62:
			return 'mask-size';
		case 63:
			return 'max-height';
		case 64:
			return 'max-width';
		case 65:
			return 'min-height';
		case 66:
			return 'min-width';
		case 67:
			return 'object-position';
		case 68:
			return 'offset';
		case 69:
			return 'offset-anchor';
		case 70:
			return 'offset-distance';
		case 71:
			return 'offset-path';
		case 72:
			return 'offset-rotate';
		case 73:
			return 'opacity';
		case 74:
			return 'order';
		case 75:
			return 'outline';
		case 76:
			return 'outline-color';
		case 77:
			return 'outline-offset';
		case 78:
			return 'outline-width';
		case 79:
			return 'padding';
		case 80:
			return 'padding-bottom';
		case 81:
			return 'padding-left';
		case 82:
			return 'padding-right';
		case 83:
			return 'padding-top';
		case 84:
			return 'right';
		case 85:
			return 'tab-size';
		case 86:
			return 'text-indent';
		case 87:
			return 'text-shadow';
		case 88:
			return 'top';
		case 89:
			return 'transform';
		case 90:
			return 'transform-origin';
		case 91:
			return 'vertical-align';
		case 92:
			return 'visibility';
		case 93:
			return 'width';
		case 94:
			return 'word-spacing';
		default:
			return 'z-index';
	}
};
var $rtfeldman$elm_css$Css$Transitions$timeToString = function (time) {
	return $elm$core$String$fromFloat(time) + 'ms';
};
var $rtfeldman$elm_css$Css$Transitions$timingFunctionToString = function (tf) {
	switch (tf.$) {
		case 0:
			return 'ease';
		case 1:
			return 'linear';
		case 2:
			return 'ease-in';
		case 3:
			return 'ease-out';
		case 4:
			return 'ease-in-out';
		case 5:
			return 'step-start';
		case 6:
			return 'step-end';
		default:
			var _float = tf.a;
			var float2 = tf.b;
			var float3 = tf.c;
			var float4 = tf.d;
			return 'cubic-bezier(' + ($elm$core$String$fromFloat(_float) + (' , ' + ($elm$core$String$fromFloat(float2) + (' , ' + ($elm$core$String$fromFloat(float3) + (' , ' + ($elm$core$String$fromFloat(float4) + ')')))))));
	}
};
var $rtfeldman$elm_css$Css$Transitions$transition = function (options) {
	var v = A3(
		$elm$core$String$slice,
		0,
		-1,
		A3(
			$elm$core$List$foldl,
			F2(
				function (_v0, s) {
					var animation = _v0.bs;
					var duration = _v0.dd;
					var delay = _v0.bA;
					var timing = _v0.bZ;
					return s + ($rtfeldman$elm_css$Css$Transitions$propToString(animation) + (' ' + ($rtfeldman$elm_css$Css$Transitions$timeToString(duration) + (' ' + (A2(
						$elm$core$Maybe$withDefault,
						'',
						A2($elm$core$Maybe$map, $rtfeldman$elm_css$Css$Transitions$timeToString, delay)) + (' ' + (A2(
						$elm$core$Maybe$withDefault,
						'',
						A2($elm$core$Maybe$map, $rtfeldman$elm_css$Css$Transitions$timingFunctionToString, timing)) + ',')))))));
				}),
			'',
			options));
	return A2($rtfeldman$elm_css$Css$property, 'transition', v);
};
var $author$project$Style$hyperLink = $rtfeldman$elm_css$Css$batch(
	_List_fromArray(
		[
			$rtfeldman$elm_css$Css$margin(
			$rtfeldman$elm_css$Css$em(0.25)),
			$rtfeldman$elm_css$Css$textDecoration($rtfeldman$elm_css$Css$none),
			$rtfeldman$elm_css$Css$color($author$project$Style$theme.aO),
			A6($rtfeldman$elm_css$Css$boxShadow6, $rtfeldman$elm_css$Css$inset, $rtfeldman$elm_css$Css$zero, $rtfeldman$elm_css$Css$zero, $rtfeldman$elm_css$Css$zero, $rtfeldman$elm_css$Css$zero, $author$project$Style$theme.aO),
			$rtfeldman$elm_css$Css$Transitions$transition(
			_List_fromArray(
				[
					A3($rtfeldman$elm_css$Css$Transitions$transform3, 0, 0, $rtfeldman$elm_css$Css$Transitions$easeIn),
					$rtfeldman$elm_css$Css$Transitions$boxShadow(500),
					$rtfeldman$elm_css$Css$Transitions$color(500)
				])),
			$rtfeldman$elm_css$Css$hover(
			_List_fromArray(
				[
					$rtfeldman$elm_css$Css$color(
					$rtfeldman$elm_css$Css$hex('fff')),
					A6(
					$rtfeldman$elm_css$Css$boxShadow6,
					$rtfeldman$elm_css$Css$inset,
					$rtfeldman$elm_css$Css$em(12),
					$rtfeldman$elm_css$Css$zero,
					$rtfeldman$elm_css$Css$zero,
					$rtfeldman$elm_css$Css$zero,
					$author$project$Style$theme.bR)
				])),
			$rtfeldman$elm_css$Css$fontSize(
			$rtfeldman$elm_css$Css$em(0.8)),
			A4(
			$rtfeldman$elm_css$Css$padding4,
			$rtfeldman$elm_css$Css$em(0),
			$rtfeldman$elm_css$Css$em(0.1),
			$rtfeldman$elm_css$Css$em(0.1),
			$rtfeldman$elm_css$Css$em(0.1)),
			$rtfeldman$elm_css$Css$cursor($rtfeldman$elm_css$Css$pointer)
		]));
var $rtfeldman$elm_css$Css$marginBottom = $rtfeldman$elm_css$Css$prop1('margin-bottom');
var $rtfeldman$elm_css$Css$marginLeft = $rtfeldman$elm_css$Css$prop1('margin-left');
var $rtfeldman$elm_css$Css$marginTop = $rtfeldman$elm_css$Css$prop1('margin-top');
var $author$project$Style$pageHeader = _List_fromArray(
	[
		A2(
		$rtfeldman$elm_css$Css$margin2,
		$rtfeldman$elm_css$Css$zero,
		$rtfeldman$elm_css$Css$vw(1)),
		$rtfeldman$elm_css$Css$color(
		$rtfeldman$elm_css$Css$hex('222')),
		$rtfeldman$elm_css$Css$fontWeight($rtfeldman$elm_css$Css$normal)
	]);
var $elm$core$Basics$abs = function (n) {
	return (n < 0) ? (-n) : n;
};
var $myrho$elm_round$Round$addSign = F2(
	function (signed, str) {
		var isNotZero = A2(
			$elm$core$List$any,
			function (c) {
				return (c !== '0') && (c !== '.');
			},
			$elm$core$String$toList(str));
		return _Utils_ap(
			(signed && isNotZero) ? '-' : '',
			str);
	});
var $elm$core$Char$fromCode = _Char_fromCode;
var $myrho$elm_round$Round$increaseNum = function (_v0) {
	var head = _v0.a;
	var tail = _v0.b;
	if (head === '9') {
		var _v1 = $elm$core$String$uncons(tail);
		if (_v1.$ === 1) {
			return '01';
		} else {
			var headtail = _v1.a;
			return A2(
				$elm$core$String$cons,
				'0',
				$myrho$elm_round$Round$increaseNum(headtail));
		}
	} else {
		var c = $elm$core$Char$toCode(head);
		return ((c >= 48) && (c < 57)) ? A2(
			$elm$core$String$cons,
			$elm$core$Char$fromCode(c + 1),
			tail) : '0';
	}
};
var $elm$core$Basics$isInfinite = _Basics_isInfinite;
var $elm$core$Basics$isNaN = _Basics_isNaN;
var $elm$core$Bitwise$shiftRightBy = _Bitwise_shiftRightBy;
var $elm$core$String$repeatHelp = F3(
	function (n, chunk, result) {
		return (n <= 0) ? result : A3(
			$elm$core$String$repeatHelp,
			n >> 1,
			_Utils_ap(chunk, chunk),
			(!(n & 1)) ? result : _Utils_ap(result, chunk));
	});
var $elm$core$String$repeat = F2(
	function (n, chunk) {
		return A3($elm$core$String$repeatHelp, n, chunk, '');
	});
var $elm$core$String$padRight = F3(
	function (n, _char, string) {
		return _Utils_ap(
			string,
			A2(
				$elm$core$String$repeat,
				n - $elm$core$String$length(string),
				$elm$core$String$fromChar(_char)));
	});
var $elm$core$String$reverse = _String_reverse;
var $myrho$elm_round$Round$splitComma = function (str) {
	var _v0 = A2($elm$core$String$split, '.', str);
	if (_v0.b) {
		if (_v0.b.b) {
			var before = _v0.a;
			var _v1 = _v0.b;
			var after = _v1.a;
			return _Utils_Tuple2(before, after);
		} else {
			var before = _v0.a;
			return _Utils_Tuple2(before, '0');
		}
	} else {
		return _Utils_Tuple2('0', '0');
	}
};
var $elm$core$Tuple$mapFirst = F2(
	function (func, _v0) {
		var x = _v0.a;
		var y = _v0.b;
		return _Utils_Tuple2(
			func(x),
			y);
	});
var $myrho$elm_round$Round$toDecimal = function (fl) {
	var _v0 = A2(
		$elm$core$String$split,
		'e',
		$elm$core$String$fromFloat(
			$elm$core$Basics$abs(fl)));
	if (_v0.b) {
		if (_v0.b.b) {
			var num = _v0.a;
			var _v1 = _v0.b;
			var exp = _v1.a;
			var e = A2(
				$elm$core$Maybe$withDefault,
				0,
				$elm$core$String$toInt(
					A2($elm$core$String$startsWith, '+', exp) ? A2($elm$core$String$dropLeft, 1, exp) : exp));
			var _v2 = $myrho$elm_round$Round$splitComma(num);
			var before = _v2.a;
			var after = _v2.b;
			var total = _Utils_ap(before, after);
			var zeroed = (e < 0) ? A2(
				$elm$core$Maybe$withDefault,
				'0',
				A2(
					$elm$core$Maybe$map,
					function (_v3) {
						var a = _v3.a;
						var b = _v3.b;
						return a + ('.' + b);
					},
					A2(
						$elm$core$Maybe$map,
						$elm$core$Tuple$mapFirst($elm$core$String$fromChar),
						$elm$core$String$uncons(
							_Utils_ap(
								A2(
									$elm$core$String$repeat,
									$elm$core$Basics$abs(e),
									'0'),
								total))))) : A3($elm$core$String$padRight, e + 1, '0', total);
			return _Utils_ap(
				(fl < 0) ? '-' : '',
				zeroed);
		} else {
			var num = _v0.a;
			return _Utils_ap(
				(fl < 0) ? '-' : '',
				num);
		}
	} else {
		return '';
	}
};
var $myrho$elm_round$Round$roundFun = F3(
	function (functor, s, fl) {
		if ($elm$core$Basics$isInfinite(fl) || $elm$core$Basics$isNaN(fl)) {
			return $elm$core$String$fromFloat(fl);
		} else {
			var signed = fl < 0;
			var _v0 = $myrho$elm_round$Round$splitComma(
				$myrho$elm_round$Round$toDecimal(
					$elm$core$Basics$abs(fl)));
			var before = _v0.a;
			var after = _v0.b;
			var r = $elm$core$String$length(before) + s;
			var normalized = _Utils_ap(
				A2($elm$core$String$repeat, (-r) + 1, '0'),
				A3(
					$elm$core$String$padRight,
					r,
					'0',
					_Utils_ap(before, after)));
			var totalLen = $elm$core$String$length(normalized);
			var roundDigitIndex = A2($elm$core$Basics$max, 1, r);
			var increase = A2(
				functor,
				signed,
				A3($elm$core$String$slice, roundDigitIndex, totalLen, normalized));
			var remains = A3($elm$core$String$slice, 0, roundDigitIndex, normalized);
			var num = increase ? $elm$core$String$reverse(
				A2(
					$elm$core$Maybe$withDefault,
					'1',
					A2(
						$elm$core$Maybe$map,
						$myrho$elm_round$Round$increaseNum,
						$elm$core$String$uncons(
							$elm$core$String$reverse(remains))))) : remains;
			var numLen = $elm$core$String$length(num);
			var numZeroed = (num === '0') ? num : ((s <= 0) ? _Utils_ap(
				num,
				A2(
					$elm$core$String$repeat,
					$elm$core$Basics$abs(s),
					'0')) : ((_Utils_cmp(
				s,
				$elm$core$String$length(after)) < 0) ? (A3($elm$core$String$slice, 0, numLen - s, num) + ('.' + A3($elm$core$String$slice, numLen - s, numLen, num))) : _Utils_ap(
				before + '.',
				A3($elm$core$String$padRight, s, '0', after))));
			return A2($myrho$elm_round$Round$addSign, signed, numZeroed);
		}
	});
var $myrho$elm_round$Round$round = $myrho$elm_round$Round$roundFun(
	F2(
		function (signed, str) {
			var _v0 = $elm$core$String$uncons(str);
			if (_v0.$ === 1) {
				return false;
			} else {
				if ('5' === _v0.a.a) {
					if (_v0.a.b === '') {
						var _v1 = _v0.a;
						return !signed;
					} else {
						var _v2 = _v0.a;
						return true;
					}
				} else {
					var _v3 = _v0.a;
					var _int = _v3.a;
					return function (i) {
						return ((i > 53) && signed) || ((i >= 53) && (!signed));
					}(
						$elm$core$Char$toCode(_int));
				}
			}
		}));
var $author$project$Domain$Event$theEvent = {
	cS: 'Maneblusser City\nNora Tilleylaan 28\n2800 Mechelen',
	ce: 'Donderdag 9 Januari 2025',
	dk: 'Gratis parkeren.\nDrank en gerechtjes inbegrepen tot 21u30.',
	dv: $elm$core$Maybe$Nothing,
	dK: 'Event Ondernemend Mechelen',
	eh: _List_fromArray(
		[
			{eS: 'Standaard', dv: 'VVK', cq: '', fu: 60},
			{eS: 'Vip Tafel', dv: 'VIP', cq: 'Voor zes personen plus fles Champagne.\nSponsor logo getoond op afzonderlijke tafel en geprojecteerd op scherm.', fu: 500}
		]),
	cL: '18:30'
};
var $rtfeldman$elm_css$Css$absolute = {bj: 0, S: 'absolute'};
var $rtfeldman$elm_css$Css$backgroundImage = $rtfeldman$elm_css$Css$prop1('background-image');
var $rtfeldman$elm_css$Css$backgroundPosition2 = $rtfeldman$elm_css$Css$prop2('background-position');
var $rtfeldman$elm_css$Css$backgroundRepeat = $rtfeldman$elm_css$Css$prop1('background-repeat');
var $rtfeldman$elm_css$Css$backgroundSize = $rtfeldman$elm_css$Css$prop1('background-size');
var $rtfeldman$elm_css$Css$block = {l: 0, S: 'block'};
var $rtfeldman$elm_css$Css$borderRadius = $rtfeldman$elm_css$Css$prop1('border-radius');
var $rtfeldman$elm_css$Css$cover = {Z: 0, S: 'cover'};
var $rtfeldman$elm_css$Css$display = $rtfeldman$elm_css$Css$prop1('display');
var $rtfeldman$elm_css$Css$height = $rtfeldman$elm_css$Css$prop1('height');
var $rtfeldman$elm_css$Css$hidden = {w: 0, aV: 0, S: 'hidden', br: 0};
var $rtfeldman$elm_css$Html$Styled$img = $rtfeldman$elm_css$Html$Styled$node('img');
var $rtfeldman$elm_css$Css$int = function (val) {
	return {
		ah: 0,
		bH: 0,
		ak: 0,
		P: 0,
		fp: 0,
		bM: 0,
		aa: val,
		a0: '',
		bq: 0,
		S: $elm$core$String$fromInt(val)
	};
};
var $rtfeldman$elm_css$Css$maxHeight = $rtfeldman$elm_css$Css$prop1('max-height');
var $rtfeldman$elm_css$Css$noRepeat = {aA: 0, U: 0, S: 'no-repeat'};
var $rtfeldman$elm_css$Css$overflow = $rtfeldman$elm_css$Css$prop1('overflow');
var $rtfeldman$elm_css$Css$PercentageUnits = 0;
var $rtfeldman$elm_css$Css$pct = A2($rtfeldman$elm_css$Css$Internal$lengthConverter, 0, '%');
var $rtfeldman$elm_css$Css$position = $rtfeldman$elm_css$Css$prop1('position');
var $rtfeldman$elm_css$Css$relative = {bj: 0, S: 'relative'};
var $rtfeldman$elm_css$Html$Styled$Attributes$src = function (url) {
	return A2($rtfeldman$elm_css$Html$Styled$Attributes$stringProperty, 'src', url);
};
var $rtfeldman$elm_css$Css$url = function (urlValue) {
	return {az: 0, S: 'url(' + (urlValue + ')')};
};
var $rtfeldman$elm_css$Css$VhUnits = 0;
var $rtfeldman$elm_css$Css$vh = A2($rtfeldman$elm_css$Css$Internal$lengthConverter, 0, 'vh');
var $rtfeldman$elm_css$Css$zIndex = $rtfeldman$elm_css$Css$prop1('z-index');
var $author$project$Pages$ViewParts$Banner$view = function (device) {
	var imgHeightPx = function () {
		if (!device) {
			return $rtfeldman$elm_css$Css$vh(15);
		} else {
			return $rtfeldman$elm_css$Css$vh(35);
		}
	}();
	var imgFrontStyle = _List_fromArray(
		[
			$rtfeldman$elm_css$Css$maxWidth(
			$rtfeldman$elm_css$Css$vw(75)),
			$rtfeldman$elm_css$Css$width($rtfeldman$elm_css$Css$auto),
			$rtfeldman$elm_css$Css$height(imgHeightPx),
			$rtfeldman$elm_css$Css$display($rtfeldman$elm_css$Css$block),
			A2($rtfeldman$elm_css$Css$margin2, $rtfeldman$elm_css$Css$zero, $rtfeldman$elm_css$Css$auto),
			A2($rtfeldman$elm_css$Css$property, 'aspect-ratio', '980 / 417')
		]);
	var imgContainerStyle = _List_fromArray(
		[
			$rtfeldman$elm_css$Css$maxWidth(
			$rtfeldman$elm_css$Css$vw(80)),
			$rtfeldman$elm_css$Css$maxHeight(imgHeightPx),
			$rtfeldman$elm_css$Css$width(
			$rtfeldman$elm_css$Css$pct(100)),
			A2($rtfeldman$elm_css$Css$margin2, $rtfeldman$elm_css$Css$zero, $rtfeldman$elm_css$Css$auto),
			$rtfeldman$elm_css$Css$position($rtfeldman$elm_css$Css$relative),
			$rtfeldman$elm_css$Css$overflow($rtfeldman$elm_css$Css$hidden),
			$rtfeldman$elm_css$Css$borderRadius(
			$rtfeldman$elm_css$Css$em(1.5)),
			$rtfeldman$elm_css$Css$marginTop(
			$rtfeldman$elm_css$Css$em(0.75))
		]);
	var imgBackStyle = _List_fromArray(
		[
			$rtfeldman$elm_css$Css$maxWidth(
			$rtfeldman$elm_css$Css$vw(80)),
			$rtfeldman$elm_css$Css$height(imgHeightPx),
			A2($rtfeldman$elm_css$Css$margin2, $rtfeldman$elm_css$Css$zero, $rtfeldman$elm_css$Css$auto),
			$rtfeldman$elm_css$Css$position($rtfeldman$elm_css$Css$absolute),
			$rtfeldman$elm_css$Css$backgroundImage(
			$rtfeldman$elm_css$Css$url('/event-back.jpg')),
			$rtfeldman$elm_css$Css$width(
			$rtfeldman$elm_css$Css$pct(100)),
			A2(
			$rtfeldman$elm_css$Css$backgroundPosition2,
			$rtfeldman$elm_css$Css$pct(50),
			$rtfeldman$elm_css$Css$zero),
			$rtfeldman$elm_css$Css$backgroundRepeat($rtfeldman$elm_css$Css$noRepeat),
			$rtfeldman$elm_css$Css$backgroundSize($rtfeldman$elm_css$Css$cover),
			A2($rtfeldman$elm_css$Css$property, 'filter', 'blur(2vw) brightness(.9)'),
			$rtfeldman$elm_css$Css$zIndex(
			$rtfeldman$elm_css$Css$int(-1))
		]);
	return A4(
		$rtfeldman$elm_css$Html$Styled$styled,
		$rtfeldman$elm_css$Html$Styled$div,
		imgContainerStyle,
		_List_Nil,
		_List_fromArray(
			[
				A4($rtfeldman$elm_css$Html$Styled$styled, $rtfeldman$elm_css$Html$Styled$div, imgBackStyle, _List_Nil, _List_Nil),
				A4(
				$rtfeldman$elm_css$Html$Styled$styled,
				$rtfeldman$elm_css$Html$Styled$img,
				imgFrontStyle,
				_List_fromArray(
					[
						$rtfeldman$elm_css$Html$Styled$Attributes$src('/event-front.jpg')
					]),
				_List_Nil),
				A4(
				$rtfeldman$elm_css$Html$Styled$styled,
				$rtfeldman$elm_css$Html$Styled$img,
				imgFrontStyle,
				_List_fromArray(
					[
						$rtfeldman$elm_css$Html$Styled$Attributes$src('')
					]),
				_List_Nil)
			]));
};
var $rtfeldman$elm_css$Css$backgroundColor = function (c) {
	return A2($rtfeldman$elm_css$Css$property, 'background-color', c.S);
};
var $rtfeldman$elm_css$Css$prop3 = F4(
	function (key, argA, argB, argC) {
		return A2($rtfeldman$elm_css$Css$property, key, argA.S + (' ' + (argB.S + (' ' + argC.S))));
	});
var $rtfeldman$elm_css$Css$border3 = $rtfeldman$elm_css$Css$prop3('border');
var $rtfeldman$elm_css$Css$bottom = $rtfeldman$elm_css$Css$prop1('bottom');
var $rtfeldman$elm_css$Html$Styled$button = $rtfeldman$elm_css$Html$Styled$node('button');
var $elm$virtual_dom$VirtualDom$Normal = function (a) {
	return {$: 0, a: a};
};
var $elm$virtual_dom$VirtualDom$on = _VirtualDom_on;
var $rtfeldman$elm_css$VirtualDom$Styled$on = F2(
	function (eventName, handler) {
		return A3(
			$rtfeldman$elm_css$VirtualDom$Styled$Attribute,
			A2($elm$virtual_dom$VirtualDom$on, eventName, handler),
			false,
			'');
	});
var $rtfeldman$elm_css$Html$Styled$Events$on = F2(
	function (event, decoder) {
		return A2(
			$rtfeldman$elm_css$VirtualDom$Styled$on,
			event,
			$elm$virtual_dom$VirtualDom$Normal(decoder));
	});
var $rtfeldman$elm_css$Html$Styled$Events$onClick = function (msg) {
	return A2(
		$rtfeldman$elm_css$Html$Styled$Events$on,
		'click',
		$elm$json$Json$Decode$succeed(msg));
};
var $author$project$UI$UI$button = F3(
	function (buttonStyle, action, label) {
		return A4(
			$rtfeldman$elm_css$Html$Styled$styled,
			$rtfeldman$elm_css$Html$Styled$button,
			buttonStyle,
			_List_fromArray(
				[
					$rtfeldman$elm_css$Html$Styled$Events$onClick(action)
				]),
			_List_fromArray(
				[
					$rtfeldman$elm_css$Html$Styled$text(label)
				]));
	});
var $rtfeldman$elm_css$Css$fixed = {a5: 0, bj: 0, bY: 0, S: 'fixed'};
var $rtfeldman$elm_css$Css$inlineBlock = {l: 0, S: 'inline-block'};
var $rtfeldman$elm_css$Css$left = $rtfeldman$elm_css$Css$prop1('left');
var $rtfeldman$elm_css$Css$padding = $rtfeldman$elm_css$Css$prop1('padding');
var $rtfeldman$elm_css$Css$solid = {w: 0, as: 0, S: 'solid'};
var $rtfeldman$elm_css$Css$bold = {ah: 0, S: 'bold'};
var $rtfeldman$elm_css$Css$border = $rtfeldman$elm_css$Css$prop1('border');
var $rtfeldman$elm_css$Css$padding2 = $rtfeldman$elm_css$Css$prop2('padding');
var $author$project$Style$textButton = _List_fromArray(
	[
		$rtfeldman$elm_css$Css$backgroundColor(
		$rtfeldman$elm_css$Css$hex('d1410c')),
		$rtfeldman$elm_css$Css$color(
		$rtfeldman$elm_css$Css$hex('fff')),
		$rtfeldman$elm_css$Css$fontWeight($rtfeldman$elm_css$Css$bold),
		$rtfeldman$elm_css$Css$fontSize(
		$rtfeldman$elm_css$Css$em(1)),
		A2(
		$rtfeldman$elm_css$Css$padding2,
		$rtfeldman$elm_css$Css$em(0.75),
		$rtfeldman$elm_css$Css$em(4)),
		$rtfeldman$elm_css$Css$borderRadius(
		$rtfeldman$elm_css$Css$em(0.4)),
		$rtfeldman$elm_css$Css$border($rtfeldman$elm_css$Css$zero),
		$rtfeldman$elm_css$Css$cursor($rtfeldman$elm_css$Css$pointer)
	]);
var $rtfeldman$elm_css$Css$valuesOrNone = function (list) {
	return $elm$core$List$isEmpty(list) ? {S: 'none'} : {
		S: A3(
			$rtfeldman$elm_css$Css$String$mapJoin,
			function ($) {
				return $.S;
			},
			' ',
			list)
	};
};
var $rtfeldman$elm_css$Css$transforms = A2(
	$elm$core$Basics$composeL,
	$rtfeldman$elm_css$Css$prop1('transform'),
	$rtfeldman$elm_css$Css$valuesOrNone);
var $rtfeldman$elm_css$Css$transform = function (only) {
	return $rtfeldman$elm_css$Css$transforms(
		_List_fromArray(
			[only]));
};
var $rtfeldman$elm_css$Css$cssFunction = F2(
	function (funcName, args) {
		return funcName + ('(' + (A2($elm$core$String$join, ',', args) + ')'));
	});
var $rtfeldman$elm_css$Css$translate2 = F2(
	function (tx, ty) {
		return {
			j: 0,
			S: A2(
				$rtfeldman$elm_css$Css$cssFunction,
				'translate',
				_List_fromArray(
					[tx.S, ty.S]))
		};
	});
var $author$project$Pages$ViewParts$BottomFixedButton$view = F2(
	function (action, buttonText) {
		var buttonContainerStyle = _List_fromArray(
			[
				$rtfeldman$elm_css$Css$left(
				$rtfeldman$elm_css$Css$pct(50)),
				$rtfeldman$elm_css$Css$transform(
				A2(
					$rtfeldman$elm_css$Css$translate2,
					$rtfeldman$elm_css$Css$pct(-50),
					$rtfeldman$elm_css$Css$zero)),
				$rtfeldman$elm_css$Css$padding(
				$rtfeldman$elm_css$Css$em(1)),
				A3(
				$rtfeldman$elm_css$Css$border3,
				$rtfeldman$elm_css$Css$em(0.1),
				$rtfeldman$elm_css$Css$solid,
				$rtfeldman$elm_css$Css$hex('ccc')),
				$rtfeldman$elm_css$Css$display($rtfeldman$elm_css$Css$inlineBlock),
				$rtfeldman$elm_css$Css$position($rtfeldman$elm_css$Css$relative),
				$rtfeldman$elm_css$Css$marginBottom(
				$rtfeldman$elm_css$Css$em(1))
			]);
		var bottomFixedStyle = _List_fromArray(
			[
				$rtfeldman$elm_css$Css$position($rtfeldman$elm_css$Css$fixed),
				$rtfeldman$elm_css$Css$bottom(
				$rtfeldman$elm_css$Css$em(0)),
				$rtfeldman$elm_css$Css$width(
				$rtfeldman$elm_css$Css$vw(80)),
				$rtfeldman$elm_css$Css$backgroundColor(
				$rtfeldman$elm_css$Css$hex('fff'))
			]);
		return A4(
			$rtfeldman$elm_css$Html$Styled$styled,
			$rtfeldman$elm_css$Html$Styled$div,
			bottomFixedStyle,
			_List_Nil,
			_List_fromArray(
				[
					A4(
					$rtfeldman$elm_css$Html$Styled$styled,
					$rtfeldman$elm_css$Html$Styled$div,
					buttonContainerStyle,
					_List_Nil,
					_List_fromArray(
						[
							A3($author$project$UI$UI$button, $author$project$Style$textButton, action, buttonText)
						]))
				]));
	});
var $author$project$UI$DivTable$customizeTableStyle = F2(
	function (style, cfg) {
		var table = cfg.bl;
		return _Utils_update(
			cfg,
			{
				bl: $rtfeldman$elm_css$Css$batch(
					A2($elm$core$List$cons, table, style))
			});
	});
var $author$project$UI$DivTable$emptyStyle = {
	aB: $rtfeldman$elm_css$Css$batch(_List_Nil),
	bD: $rtfeldman$elm_css$Css$batch(_List_Nil),
	bc: $rtfeldman$elm_css$Css$batch(_List_Nil),
	ao: $rtfeldman$elm_css$Css$batch(_List_Nil),
	bl: $rtfeldman$elm_css$Css$batch(_List_Nil)
};
var $rtfeldman$elm_css$Html$Styled$h3 = $rtfeldman$elm_css$Html$Styled$node('h3');
var $author$project$UI$DivTable$fromBody = function (bodyRows) {
	return {eC: bodyRows, bC: _List_Nil};
};
var $rtfeldman$elm_css$Css$tableCell = {l: 0, S: 'table-cell'};
var $author$project$UI$DivTable$renderCell = F2(
	function (tableStyleConfig, content) {
		var cellStyle = $rtfeldman$elm_css$Css$batch(
			_List_fromArray(
				[
					$rtfeldman$elm_css$Css$display($rtfeldman$elm_css$Css$tableCell),
					tableStyleConfig.aB
				]));
		return A4(
			$rtfeldman$elm_css$Html$Styled$styled,
			$rtfeldman$elm_css$Html$Styled$div,
			_List_fromArray(
				[cellStyle]),
			_List_Nil,
			content);
	});
var $rtfeldman$elm_css$Css$tableRow = {l: 0, S: 'table-row'};
var $author$project$UI$DivTable$renderRow = F2(
	function (tableStyleConfig, cells) {
		var rowStyle = $rtfeldman$elm_css$Css$batch(
			_List_fromArray(
				[
					$rtfeldman$elm_css$Css$display($rtfeldman$elm_css$Css$tableRow),
					tableStyleConfig.ao
				]));
		return A4(
			$rtfeldman$elm_css$Html$Styled$styled,
			$rtfeldman$elm_css$Html$Styled$div,
			_List_fromArray(
				[rowStyle]),
			_List_Nil,
			A2(
				$elm$core$List$map,
				$author$project$UI$DivTable$renderCell(tableStyleConfig),
				cells));
	});
var $author$project$UI$DivTable$renderBodyInternal = F2(
	function (tableStyleConfig, rows) {
		return A2(
			$elm$core$List$map,
			$author$project$UI$DivTable$renderRow(tableStyleConfig),
			rows);
	});
var $author$project$UI$DivTable$renderHeaderCell = F2(
	function (tableStyleConfig, content) {
		var cellStyle = $rtfeldman$elm_css$Css$batch(
			_List_fromArray(
				[
					$rtfeldman$elm_css$Css$display($rtfeldman$elm_css$Css$tableCell),
					tableStyleConfig.bD
				]));
		return A4(
			$rtfeldman$elm_css$Html$Styled$styled,
			$rtfeldman$elm_css$Html$Styled$div,
			_List_fromArray(
				[cellStyle]),
			_List_Nil,
			content);
	});
var $author$project$UI$DivTable$renderHeader = F2(
	function (tableStyleConfig, cells) {
		var headerStyle = $rtfeldman$elm_css$Css$batch(
			_List_fromArray(
				[
					$rtfeldman$elm_css$Css$display($rtfeldman$elm_css$Css$tableRow),
					tableStyleConfig.bc
				]));
		if (!cells.b) {
			return $rtfeldman$elm_css$Html$Styled$text('');
		} else {
			return A4(
				$rtfeldman$elm_css$Html$Styled$styled,
				$rtfeldman$elm_css$Html$Styled$div,
				_List_fromArray(
					[headerStyle]),
				_List_Nil,
				A2(
					$elm$core$List$map,
					$author$project$UI$DivTable$renderHeaderCell(tableStyleConfig),
					cells));
		}
	});
var $rtfeldman$elm_css$Css$table = {l: 0, S: 'table'};
var $author$project$UI$DivTable$render = F2(
	function (tableStyleConfig, table) {
		var tableStyle = $rtfeldman$elm_css$Css$batch(
			_List_fromArray(
				[
					$rtfeldman$elm_css$Css$display($rtfeldman$elm_css$Css$table),
					tableStyleConfig.bl
				]));
		return A4(
			$rtfeldman$elm_css$Html$Styled$styled,
			$rtfeldman$elm_css$Html$Styled$div,
			_List_fromArray(
				[tableStyle]),
			_List_Nil,
			A2(
				$elm$core$List$cons,
				A2($author$project$UI$DivTable$renderHeader, tableStyleConfig, table.bC),
				A2($author$project$UI$DivTable$renderBodyInternal, tableStyleConfig, table.eC)));
	});
var $author$project$UI$DivTable$renderBody = F2(
	function (tableStyleConfig, body) {
		return A2(
			$author$project$UI$DivTable$render,
			tableStyleConfig,
			$author$project$UI$DivTable$fromBody(body));
	});
var $rtfeldman$elm_css$Css$right = $rtfeldman$elm_css$Css$prop1('right');
var $rtfeldman$elm_css$Css$Internal$property = F2(
	function (key, value) {
		return $rtfeldman$elm_css$Css$Preprocess$AppendProperty(key + (':' + value));
	});
var $rtfeldman$elm_css$Css$Internal$getOverloadedProperty = F3(
	function (functionName, desiredKey, style) {
		getOverloadedProperty:
		while (true) {
			switch (style.$) {
				case 0:
					var str = style.a;
					var key = A2(
						$elm$core$Maybe$withDefault,
						'',
						$elm$core$List$head(
							A2($elm$core$String$split, ':', str)));
					return A2($rtfeldman$elm_css$Css$Internal$property, desiredKey, key);
				case 1:
					var selector = style.a;
					return A2($rtfeldman$elm_css$Css$Internal$property, desiredKey, 'elm-css-error-cannot-apply-' + (functionName + '-with-inapplicable-Style-for-selector'));
				case 2:
					var combinator = style.a;
					return A2($rtfeldman$elm_css$Css$Internal$property, desiredKey, 'elm-css-error-cannot-apply-' + (functionName + '-with-inapplicable-Style-for-combinator'));
				case 3:
					var pseudoElement = style.a;
					return A2($rtfeldman$elm_css$Css$Internal$property, desiredKey, 'elm-css-error-cannot-apply-' + (functionName + '-with-inapplicable-Style-for-pseudo-element setter'));
				case 4:
					return A2($rtfeldman$elm_css$Css$Internal$property, desiredKey, 'elm-css-error-cannot-apply-' + (functionName + '-with-inapplicable-Style-for-media-query'));
				case 5:
					return A2($rtfeldman$elm_css$Css$Internal$property, desiredKey, 'elm-css-error-cannot-apply-' + (functionName + '-with-inapplicable-Style-for-keyframes'));
				default:
					if (!style.a.b) {
						return A2($rtfeldman$elm_css$Css$Internal$property, desiredKey, 'elm-css-error-cannot-apply-' + (functionName + '-with-empty-Style'));
					} else {
						if (!style.a.b.b) {
							var _v1 = style.a;
							var only = _v1.a;
							var $temp$functionName = functionName,
								$temp$desiredKey = desiredKey,
								$temp$style = only;
							functionName = $temp$functionName;
							desiredKey = $temp$desiredKey;
							style = $temp$style;
							continue getOverloadedProperty;
						} else {
							var _v2 = style.a;
							var first = _v2.a;
							var rest = _v2.b;
							var $temp$functionName = functionName,
								$temp$desiredKey = desiredKey,
								$temp$style = $rtfeldman$elm_css$Css$Preprocess$ApplyStyles(rest);
							functionName = $temp$functionName;
							desiredKey = $temp$desiredKey;
							style = $temp$style;
							continue getOverloadedProperty;
						}
					}
			}
		}
	});
var $rtfeldman$elm_css$Css$Internal$IncompatibleUnits = 0;
var $rtfeldman$elm_css$Css$Internal$lengthForOverloadedProperty = A3($rtfeldman$elm_css$Css$Internal$lengthConverter, 0, '', 0);
var $rtfeldman$elm_css$Css$textAlign = function (fn) {
	return A3(
		$rtfeldman$elm_css$Css$Internal$getOverloadedProperty,
		'textAlign',
		'text-align',
		fn($rtfeldman$elm_css$Css$Internal$lengthForOverloadedProperty));
};
var $author$project$Pages$ViewParts$HeaderAndButton$view = F3(
	function (headerText, action, buttonText) {
		var tableStyle = A2(
			$author$project$UI$DivTable$customizeTableStyle,
			_List_fromArray(
				[
					$rtfeldman$elm_css$Css$width(
					$rtfeldman$elm_css$Css$pct(100))
				]),
			$author$project$UI$DivTable$emptyStyle);
		return A2(
			$author$project$UI$DivTable$renderBody,
			tableStyle,
			_List_fromArray(
				[
					_List_fromArray(
					[
						_List_fromArray(
						[
							A4(
							$rtfeldman$elm_css$Html$Styled$styled,
							$rtfeldman$elm_css$Html$Styled$h3,
							$author$project$Style$pageHeader,
							_List_Nil,
							_List_fromArray(
								[
									$rtfeldman$elm_css$Html$Styled$text(headerText)
								]))
						]),
						_List_fromArray(
						[
							A4(
							$rtfeldman$elm_css$Html$Styled$styled,
							$rtfeldman$elm_css$Html$Styled$div,
							_List_fromArray(
								[
									$rtfeldman$elm_css$Css$textAlign($rtfeldman$elm_css$Css$right)
								]),
							_List_Nil,
							_List_fromArray(
								[
									A3($author$project$UI$UI$button, $author$project$Style$textButton, action, buttonText)
								]))
						])
					])
				]));
	});
var $author$project$Pages$Home$view = F2(
	function (shared, _v0) {
		var ticketTypes = function (ticketType) {
			return A2(
				$rtfeldman$elm_css$Html$Styled$div,
				_List_Nil,
				_List_fromArray(
					[
						A2(
						$rtfeldman$elm_css$Html$Styled$div,
						_List_Nil,
						_List_fromArray(
							[
								$rtfeldman$elm_css$Html$Styled$text(
								ticketType.eS + (' - ' + (A2($myrho$elm_round$Round$round, 2, ticketType.fu) + ' €')))
							])),
						A4(
						$rtfeldman$elm_css$Html$Styled$styled,
						$rtfeldman$elm_css$Html$Styled$div,
						_List_fromArray(
							[
								$rtfeldman$elm_css$Css$marginLeft(
								$rtfeldman$elm_css$Css$em(1)),
								$rtfeldman$elm_css$Css$whiteSpace($rtfeldman$elm_css$Css$pre),
								$rtfeldman$elm_css$Css$fontSize(
								$rtfeldman$elm_css$Css$em(0.85))
							]),
						_List_Nil,
						_List_fromArray(
							[
								$rtfeldman$elm_css$Html$Styled$text(ticketType.cq)
							]))
					]));
		};
		var maybeMargin = function () {
			var _v3 = shared.eT;
			if (!_v3) {
				return A4(
					$rtfeldman$elm_css$Html$Styled$styled,
					$rtfeldman$elm_css$Html$Styled$div,
					_List_fromArray(
						[
							$rtfeldman$elm_css$Css$marginBottom(
							$rtfeldman$elm_css$Css$em(6))
						]),
					_List_Nil,
					_List_fromArray(
						[
							A4(
							$rtfeldman$elm_css$Html$Styled$styled,
							$rtfeldman$elm_css$Html$Styled$a,
							_List_fromArray(
								[
									$author$project$Style$hyperLink,
									$rtfeldman$elm_css$Css$fontSize(
									$rtfeldman$elm_css$Css$em(0.4))
								]),
							_List_fromArray(
								[
									$rtfeldman$elm_css$Html$Styled$Attributes$href('/tees-and-cees')
								]),
							_List_fromArray(
								[
									$rtfeldman$elm_css$Html$Styled$text('Algemene Voorwaarden')
								]))
						]));
			} else {
				return A4(
					$rtfeldman$elm_css$Html$Styled$styled,
					$rtfeldman$elm_css$Html$Styled$a,
					_List_fromArray(
						[$author$project$Style$hyperLink]),
					_List_fromArray(
						[
							$rtfeldman$elm_css$Html$Styled$Attributes$href('/tees-and-cees')
						]),
					_List_fromArray(
						[
							$rtfeldman$elm_css$Html$Styled$text('Algemene Voorwaarden')
						]));
			}
		}();
		var maybeBottomButton = function () {
			var _v2 = shared.eT;
			if (!_v2) {
				return A2($author$project$Pages$ViewParts$BottomFixedButton$view, 0, 'Tickets Bestellen');
			} else {
				return $rtfeldman$elm_css$Html$Styled$text('');
			}
		}();
		var evt = $author$project$Domain$Event$theEvent;
		var dateTimeRow = function () {
			var _v1 = shared.eT;
			if (!_v1) {
				return A2(
					$rtfeldman$elm_css$Html$Styled$div,
					_List_Nil,
					_List_fromArray(
						[
							A4(
							$rtfeldman$elm_css$Html$Styled$styled,
							$rtfeldman$elm_css$Html$Styled$h4,
							$author$project$Style$pageHeader,
							_List_Nil,
							_List_fromArray(
								[
									$rtfeldman$elm_css$Html$Styled$text(evt.ce)
								])),
							A4(
							$rtfeldman$elm_css$Html$Styled$styled,
							$rtfeldman$elm_css$Html$Styled$div,
							_List_fromArray(
								[
									$rtfeldman$elm_css$Css$marginLeft(
									$rtfeldman$elm_css$Css$em(1)),
									$rtfeldman$elm_css$Css$marginBottom(
									$rtfeldman$elm_css$Css$em(1))
								]),
							_List_Nil,
							_List_fromArray(
								[
									$rtfeldman$elm_css$Html$Styled$text(evt.cL + ' uur')
								]))
						]));
			} else {
				return A3(
					$author$project$Pages$ViewParts$HeaderAndButton$view,
					$author$project$Domain$Event$dateTimeString(evt),
					0,
					'Tickets Bestellen');
			}
		}();
		return A2(
			$rtfeldman$elm_css$Html$Styled$div,
			_List_Nil,
			_List_fromArray(
				[
					$author$project$Pages$ViewParts$Banner$view(shared.eT),
					A4(
					$rtfeldman$elm_css$Html$Styled$styled,
					$rtfeldman$elm_css$Html$Styled$div,
					$author$project$Style$container,
					_List_Nil,
					_List_fromArray(
						[
							A4(
							$rtfeldman$elm_css$Html$Styled$styled,
							$rtfeldman$elm_css$Html$Styled$h1,
							_Utils_ap(
								$author$project$Style$pageHeader,
								_List_fromArray(
									[
										$rtfeldman$elm_css$Css$marginTop(
										$rtfeldman$elm_css$Css$em(0.3))
									])),
							_List_Nil,
							_List_fromArray(
								[
									$rtfeldman$elm_css$Html$Styled$text(evt.dK)
								])),
							A2(
							$rtfeldman$elm_css$Html$Styled$div,
							_List_Nil,
							_List_fromArray(
								[
									A4(
									$rtfeldman$elm_css$Html$Styled$styled,
									$rtfeldman$elm_css$Html$Styled$h4,
									$author$project$Style$pageHeader,
									_List_Nil,
									_List_fromArray(
										[
											$rtfeldman$elm_css$Html$Styled$text(evt.ce)
										])),
									A4(
									$rtfeldman$elm_css$Html$Styled$styled,
									$rtfeldman$elm_css$Html$Styled$div,
									_List_fromArray(
										[
											$rtfeldman$elm_css$Css$marginLeft(
											$rtfeldman$elm_css$Css$em(1)),
											$rtfeldman$elm_css$Css$marginBottom(
											$rtfeldman$elm_css$Css$em(1))
										]),
									_List_Nil,
									_List_fromArray(
										[
											$rtfeldman$elm_css$Html$Styled$text(evt.cL + ' uur')
										]))
								])),
							A4(
							$rtfeldman$elm_css$Html$Styled$styled,
							$rtfeldman$elm_css$Html$Styled$h2,
							$author$project$Style$pageHeader,
							_List_Nil,
							_List_fromArray(
								[
									$rtfeldman$elm_css$Html$Styled$text('Locatie')
								])),
							A4(
							$rtfeldman$elm_css$Html$Styled$styled,
							$rtfeldman$elm_css$Html$Styled$div,
							_Utils_ap(
								$author$project$Style$address,
								_List_fromArray(
									[
										$rtfeldman$elm_css$Css$marginLeft(
										$rtfeldman$elm_css$Css$em(1)),
										$rtfeldman$elm_css$Css$marginBottom(
										$rtfeldman$elm_css$Css$em(1))
									])),
							_List_Nil,
							_List_fromArray(
								[
									$rtfeldman$elm_css$Html$Styled$text(evt.cS)
								])),
							A4(
							$rtfeldman$elm_css$Html$Styled$styled,
							$rtfeldman$elm_css$Html$Styled$h2,
							$author$project$Style$pageHeader,
							_List_Nil,
							_List_fromArray(
								[
									$rtfeldman$elm_css$Html$Styled$text('Extra Info')
								])),
							A4(
							$rtfeldman$elm_css$Html$Styled$styled,
							$rtfeldman$elm_css$Html$Styled$div,
							_Utils_ap(
								$author$project$Style$address,
								_List_fromArray(
									[
										$rtfeldman$elm_css$Css$marginLeft(
										$rtfeldman$elm_css$Css$em(1)),
										$rtfeldman$elm_css$Css$marginBottom(
										$rtfeldman$elm_css$Css$em(1))
									])),
							_List_Nil,
							_List_fromArray(
								[
									$rtfeldman$elm_css$Html$Styled$text(evt.dk)
								])),
							A4(
							$rtfeldman$elm_css$Html$Styled$styled,
							$rtfeldman$elm_css$Html$Styled$h2,
							$author$project$Style$pageHeader,
							_List_Nil,
							_List_fromArray(
								[
									$rtfeldman$elm_css$Html$Styled$text('Tickets')
								])),
							A4(
							$rtfeldman$elm_css$Html$Styled$styled,
							$rtfeldman$elm_css$Html$Styled$div,
							_List_fromArray(
								[
									$rtfeldman$elm_css$Css$marginLeft(
									$rtfeldman$elm_css$Css$em(1)),
									$rtfeldman$elm_css$Css$marginBottom(
									$rtfeldman$elm_css$Css$em(1))
								]),
							_List_Nil,
							A2($elm$core$List$map, ticketTypes, evt.eh)),
							A2($rtfeldman$elm_css$Html$Styled$br, _List_Nil, _List_Nil),
							A2($rtfeldman$elm_css$Html$Styled$br, _List_Nil, _List_Nil),
							maybeMargin
						]))
				]));
	});
var $author$project$Pages$InvoiceInfo$SaveInfo = {$: 3};
var $author$project$Pages$InvoiceInfo$UpdateAddress = function (a) {
	return {$: 1, a: a};
};
var $author$project$Pages$InvoiceInfo$UpdateCompanyName = function (a) {
	return {$: 0, a: a};
};
var $author$project$Pages$InvoiceInfo$UpdateVatNumber = function (a) {
	return {$: 2, a: a};
};
var $author$project$UI$DivTable$customizeCellStyle = F2(
	function (style, cfg) {
		var cell = cfg.aB;
		return _Utils_update(
			cfg,
			{
				aB: $rtfeldman$elm_css$Css$batch(
					A2($elm$core$List$cons, cell, style))
			});
	});
var $rtfeldman$elm_css$Html$Styled$input = $rtfeldman$elm_css$Html$Styled$node('input');
var $rtfeldman$elm_css$Css$borderColor = function (c) {
	return A2($rtfeldman$elm_css$Css$property, 'border-color', c.S);
};
var $rtfeldman$elm_css$Css$Transitions$BorderColor = 10;
var $rtfeldman$elm_css$Css$Transitions$borderColor3 = $rtfeldman$elm_css$Css$Transitions$fullTransition(10);
var $rtfeldman$elm_css$Css$Transitions$BorderRadius = 14;
var $rtfeldman$elm_css$Css$Transitions$borderRadius3 = $rtfeldman$elm_css$Css$Transitions$fullTransition(14);
var $rtfeldman$elm_css$Css$borderStyle = $rtfeldman$elm_css$Css$prop1('border-style');
var $rtfeldman$elm_css$Css$Transitions$CubicBezier = F4(
	function (a, b, c, d) {
		return {$: 7, a: a, b: b, c: c, d: d};
	});
var $rtfeldman$elm_css$Css$Transitions$cubicBezier = F4(
	function (f1, f2, f3, f4) {
		return A4($rtfeldman$elm_css$Css$Transitions$CubicBezier, f1, f2, f3, f4);
	});
var $rtfeldman$elm_css$Css$focus = $rtfeldman$elm_css$Css$pseudoClass('focus');
var $rtfeldman$elm_css$Css$Structure$GeneralSibling = 1;
var $rtfeldman$elm_css$Css$Preprocess$NestSnippet = F2(
	function (a, b) {
		return {$: 2, a: a, b: b};
	});
var $rtfeldman$elm_css$Css$Global$generalSiblings = $rtfeldman$elm_css$Css$Preprocess$NestSnippet(1);
var $rtfeldman$elm_css$Css$outline = $rtfeldman$elm_css$Css$prop1('outline');
var $rtfeldman$elm_css$Css$paddingBottom = $rtfeldman$elm_css$Css$prop1('padding-bottom');
var $rtfeldman$elm_css$Css$paddingLeft = $rtfeldman$elm_css$Css$prop1('padding-left');
var $rtfeldman$elm_css$Css$paddingTop = $rtfeldman$elm_css$Css$prop1('padding-top');
var $rtfeldman$elm_css$Css$scale = function (x) {
	return {
		j: 0,
		S: A2(
			$rtfeldman$elm_css$Css$cssFunction,
			'scale',
			_List_fromArray(
				[
					$elm$core$String$fromFloat(x)
				]))
	};
};
var $rtfeldman$elm_css$Css$top = $rtfeldman$elm_css$Css$prop1('top');
var $rtfeldman$elm_css$Css$translateY = function (_v0) {
	var value = _v0.S;
	return {
		j: 0,
		S: A2(
			$rtfeldman$elm_css$Css$cssFunction,
			'translateY',
			_List_fromArray(
				[value]))
	};
};
var $rtfeldman$elm_css$Css$transparent = {bx: 0, S: 'transparent'};
var $rtfeldman$elm_css$Css$Structure$TypeSelector = $elm$core$Basics$identity;
var $rtfeldman$elm_css$Css$Global$typeSelector = F2(
	function (selectorStr, styles) {
		var sequence = A2($rtfeldman$elm_css$Css$Structure$TypeSelectorSequence, selectorStr, _List_Nil);
		var sel = A3($rtfeldman$elm_css$Css$Structure$Selector, sequence, _List_Nil, $elm$core$Maybe$Nothing);
		return _List_fromArray(
			[
				$rtfeldman$elm_css$Css$Preprocess$StyleBlockDeclaration(
				A3($rtfeldman$elm_css$Css$Preprocess$StyleBlock, sel, _List_Nil, styles))
			]);
	});
var $rtfeldman$elm_css$Css$valid = $rtfeldman$elm_css$Css$pseudoClass('valid');
var $author$project$Style$input = function () {
	var popoutLabelStyle = $rtfeldman$elm_css$Css$batch(
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$borderColor($author$project$Style$theme.aO),
				$rtfeldman$elm_css$Css$borderRadius(
				$rtfeldman$elm_css$Css$em(0.75)),
				$rtfeldman$elm_css$Css$color(
				$rtfeldman$elm_css$Css$hex('000')),
				$rtfeldman$elm_css$Css$Global$generalSiblings(
				_List_fromArray(
					[
						A2(
						$rtfeldman$elm_css$Css$Global$typeSelector,
						'label',
						_List_fromArray(
							[
								$rtfeldman$elm_css$Css$transforms(
								_List_fromArray(
									[
										$rtfeldman$elm_css$Css$translateY(
										$rtfeldman$elm_css$Css$pct(-50)),
										$rtfeldman$elm_css$Css$scale(0.9)
									])),
								$rtfeldman$elm_css$Css$backgroundColor($author$project$Style$theme.b6),
								$rtfeldman$elm_css$Css$color($author$project$Style$theme.aO),
								$rtfeldman$elm_css$Css$top($rtfeldman$elm_css$Css$zero),
								$rtfeldman$elm_css$Css$padding($rtfeldman$elm_css$Css$zero)
							]))
					])),
				$rtfeldman$elm_css$Css$fontSize(
				$rtfeldman$elm_css$Css$em(1))
			]));
	return _List_fromArray(
		[
			$rtfeldman$elm_css$Css$borderStyle($rtfeldman$elm_css$Css$solid),
			$rtfeldman$elm_css$Css$color($rtfeldman$elm_css$Css$transparent),
			$rtfeldman$elm_css$Css$width(
			$rtfeldman$elm_css$Css$pct(100)),
			$rtfeldman$elm_css$Css$outline($rtfeldman$elm_css$Css$none),
			$rtfeldman$elm_css$Css$paddingTop(
			$rtfeldman$elm_css$Css$em(0.5)),
			$rtfeldman$elm_css$Css$paddingLeft(
			$rtfeldman$elm_css$Css$em(0.25)),
			$rtfeldman$elm_css$Css$paddingBottom(
			$rtfeldman$elm_css$Css$em(0.375)),
			$rtfeldman$elm_css$Css$borderRadius(
			$rtfeldman$elm_css$Css$em(0.5)),
			$rtfeldman$elm_css$Css$Transitions$transition(
			_List_fromArray(
				[
					A3(
					$rtfeldman$elm_css$Css$Transitions$borderColor3,
					150,
					0,
					A4($rtfeldman$elm_css$Css$Transitions$cubicBezier, 0.4, 0, 0.2, 1)),
					A3(
					$rtfeldman$elm_css$Css$Transitions$borderRadius3,
					150,
					0,
					A4($rtfeldman$elm_css$Css$Transitions$cubicBezier, 0.4, 0, 0.2, 1))
				])),
			$rtfeldman$elm_css$Css$focus(
			_List_fromArray(
				[popoutLabelStyle])),
			$rtfeldman$elm_css$Css$valid(
			_List_fromArray(
				[popoutLabelStyle])),
			$rtfeldman$elm_css$Css$fontSize(
			$rtfeldman$elm_css$Css$em(1))
		]);
}();
var $author$project$Style$inputLabelContainer = _List_fromArray(
	[
		$rtfeldman$elm_css$Css$position($rtfeldman$elm_css$Css$relative),
		$rtfeldman$elm_css$Css$display($rtfeldman$elm_css$Css$inlineBlock),
		$rtfeldman$elm_css$Css$width(
		$rtfeldman$elm_css$Css$em(16))
	]);
var $rtfeldman$elm_css$Html$Styled$label = $rtfeldman$elm_css$Html$Styled$node('label');
var $rtfeldman$elm_css$Css$pointerEvents = $rtfeldman$elm_css$Css$prop1('pointer-events');
var $author$project$Style$label = _List_fromArray(
	[
		$rtfeldman$elm_css$Css$position($rtfeldman$elm_css$Css$absolute),
		$rtfeldman$elm_css$Css$top(
		$rtfeldman$elm_css$Css$em(0.5)),
		$rtfeldman$elm_css$Css$left(
		$rtfeldman$elm_css$Css$em(0.5)),
		$rtfeldman$elm_css$Css$color($author$project$Style$theme.bR),
		$rtfeldman$elm_css$Css$pointerEvents($rtfeldman$elm_css$Css$none),
		$rtfeldman$elm_css$Css$Transitions$transition(
		_List_fromArray(
			[
				A3(
				$rtfeldman$elm_css$Css$Transitions$transform3,
				150,
				0,
				A4($rtfeldman$elm_css$Css$Transitions$cubicBezier, 0.4, 0, 0.2, 1))
			])),
		$rtfeldman$elm_css$Css$fontSize(
		$rtfeldman$elm_css$Css$em(1))
	]);
var $rtfeldman$elm_css$Html$Styled$Events$alwaysStop = function (x) {
	return _Utils_Tuple2(x, true);
};
var $elm$virtual_dom$VirtualDom$MayStopPropagation = function (a) {
	return {$: 1, a: a};
};
var $rtfeldman$elm_css$Html$Styled$Events$stopPropagationOn = F2(
	function (event, decoder) {
		return A2(
			$rtfeldman$elm_css$VirtualDom$Styled$on,
			event,
			$elm$virtual_dom$VirtualDom$MayStopPropagation(decoder));
	});
var $elm$json$Json$Decode$at = F2(
	function (fields, decoder) {
		return A3($elm$core$List$foldr, $elm$json$Json$Decode$field, decoder, fields);
	});
var $rtfeldman$elm_css$Html$Styled$Events$targetValue = A2(
	$elm$json$Json$Decode$at,
	_List_fromArray(
		['target', 'value']),
	$elm$json$Json$Decode$string);
var $rtfeldman$elm_css$Html$Styled$Events$onInput = function (tagger) {
	return A2(
		$rtfeldman$elm_css$Html$Styled$Events$stopPropagationOn,
		'input',
		A2(
			$elm$json$Json$Decode$map,
			$rtfeldman$elm_css$Html$Styled$Events$alwaysStop,
			A2($elm$json$Json$Decode$map, tagger, $rtfeldman$elm_css$Html$Styled$Events$targetValue)));
};
var $elm$json$Json$Encode$bool = _Json_wrap;
var $rtfeldman$elm_css$Html$Styled$Attributes$boolProperty = F2(
	function (key, bool) {
		return A2(
			$rtfeldman$elm_css$VirtualDom$Styled$property,
			key,
			$elm$json$Json$Encode$bool(bool));
	});
var $rtfeldman$elm_css$Html$Styled$Attributes$required = $rtfeldman$elm_css$Html$Styled$Attributes$boolProperty('required');
var $rtfeldman$elm_css$VirtualDom$Styled$attribute = F2(
	function (key, value) {
		return A3(
			$rtfeldman$elm_css$VirtualDom$Styled$Attribute,
			A2($elm$virtual_dom$VirtualDom$attribute, key, value),
			false,
			'');
	});
var $rtfeldman$elm_css$Html$Styled$Attributes$rows = function (n) {
	return A2(
		$rtfeldman$elm_css$VirtualDom$Styled$attribute,
		'rows',
		$elm$core$String$fromInt(n));
};
var $author$project$Lib$ViewHelpers$showIf = F2(
	function (predicate, content) {
		return predicate ? content : $rtfeldman$elm_css$Html$Styled$text('');
	});
var $author$project$Lib$ViewHelpers$showIfNot = F2(
	function (predicate, content) {
		return A2($author$project$Lib$ViewHelpers$showIf, !predicate, content);
	});
var $rtfeldman$elm_css$Html$Styled$textarea = $rtfeldman$elm_css$Html$Styled$node('textarea');
var $author$project$Style$validation = _List_fromArray(
	[
		$rtfeldman$elm_css$Css$fontSize(
		$rtfeldman$elm_css$Css$em(0.75)),
		$rtfeldman$elm_css$Css$color(
		$rtfeldman$elm_css$Css$hex('e00')),
		$rtfeldman$elm_css$Css$paddingLeft(
		$rtfeldman$elm_css$Css$em(0.25))
	]);
var $rtfeldman$elm_css$Html$Styled$Attributes$value = $rtfeldman$elm_css$Html$Styled$Attributes$stringProperty('value');
var $author$project$Pages$InvoiceInfo$view = F2(
	function (shared, model) {
		var ticketLink = A4(
			$rtfeldman$elm_css$Html$Styled$styled,
			$rtfeldman$elm_css$Html$Styled$a,
			_List_fromArray(
				[$author$project$Style$hyperLink]),
			_List_fromArray(
				[
					$rtfeldman$elm_css$Html$Styled$Attributes$href('/payment-success')
				]),
			_List_fromArray(
				[
					$rtfeldman$elm_css$Html$Styled$text('Terug naar tickets.')
				]));
		var renderTextArea = F5(
			function (labelText, val, action, pred, validationMessage) {
				return _List_fromArray(
					[
						A4(
						$rtfeldman$elm_css$Html$Styled$styled,
						$rtfeldman$elm_css$Html$Styled$div,
						$author$project$Style$inputLabelContainer,
						_List_Nil,
						_List_fromArray(
							[
								A4(
								$rtfeldman$elm_css$Html$Styled$styled,
								$rtfeldman$elm_css$Html$Styled$textarea,
								$author$project$Style$input,
								_List_fromArray(
									[
										$rtfeldman$elm_css$Html$Styled$Attributes$value(val),
										$rtfeldman$elm_css$Html$Styled$Attributes$required(true),
										$rtfeldman$elm_css$Html$Styled$Events$onInput(action),
										$rtfeldman$elm_css$Html$Styled$Attributes$rows(4)
									]),
								_List_Nil),
								A4(
								$rtfeldman$elm_css$Html$Styled$styled,
								$rtfeldman$elm_css$Html$Styled$label,
								$author$project$Style$label,
								_List_Nil,
								_List_fromArray(
									[
										$rtfeldman$elm_css$Html$Styled$text(labelText)
									]))
							])),
						A2(
						$author$project$Lib$ViewHelpers$showIfNot,
						pred,
						A4(
							$rtfeldman$elm_css$Html$Styled$styled,
							$rtfeldman$elm_css$Html$Styled$div,
							$author$project$Style$validation,
							_List_Nil,
							_List_fromArray(
								[
									$rtfeldman$elm_css$Html$Styled$text(validationMessage)
								])))
					]);
			});
		var renderInput = F5(
			function (labelText, val, action, pred, validationMessage) {
				return _List_fromArray(
					[
						A4(
						$rtfeldman$elm_css$Html$Styled$styled,
						$rtfeldman$elm_css$Html$Styled$div,
						$author$project$Style$inputLabelContainer,
						_List_Nil,
						_List_fromArray(
							[
								A4(
								$rtfeldman$elm_css$Html$Styled$styled,
								$rtfeldman$elm_css$Html$Styled$input,
								$author$project$Style$input,
								_List_fromArray(
									[
										$rtfeldman$elm_css$Html$Styled$Attributes$value(val),
										$rtfeldman$elm_css$Html$Styled$Attributes$required(true),
										$rtfeldman$elm_css$Html$Styled$Events$onInput(action)
									]),
								_List_Nil),
								A4(
								$rtfeldman$elm_css$Html$Styled$styled,
								$rtfeldman$elm_css$Html$Styled$label,
								$author$project$Style$label,
								_List_Nil,
								_List_fromArray(
									[
										$rtfeldman$elm_css$Html$Styled$text(labelText)
									]))
							])),
						A2(
						$author$project$Lib$ViewHelpers$showIfNot,
						pred,
						A4(
							$rtfeldman$elm_css$Html$Styled$styled,
							$rtfeldman$elm_css$Html$Styled$div,
							$author$project$Style$validation,
							_List_Nil,
							_List_fromArray(
								[
									$rtfeldman$elm_css$Html$Styled$text(validationMessage)
								])))
					]);
			});
		var maybeTopButton = function () {
			var _v2 = shared.eT;
			if (!_v2) {
				return $rtfeldman$elm_css$Html$Styled$text('Fakturatie Gegevens');
			} else {
				return A3($author$project$Pages$ViewParts$HeaderAndButton$view, 'Fakturatie Gegevens', $author$project$Pages$InvoiceInfo$SaveInfo, 'Opslaan');
			}
		}();
		var maybeMargin = function () {
			var _v1 = shared.eT;
			if (!_v1) {
				return A4(
					$rtfeldman$elm_css$Html$Styled$styled,
					$rtfeldman$elm_css$Html$Styled$div,
					_List_fromArray(
						[
							$rtfeldman$elm_css$Css$marginBottom(
							$rtfeldman$elm_css$Css$em(6))
						]),
					_List_Nil,
					_List_fromArray(
						[
							$rtfeldman$elm_css$Html$Styled$text('')
						]));
			} else {
				return $rtfeldman$elm_css$Html$Styled$text('');
			}
		}();
		var maybeBottomButton = function () {
			var _v0 = shared.eT;
			if (!_v0) {
				return A2($author$project$Pages$ViewParts$BottomFixedButton$view, $author$project$Pages$InvoiceInfo$SaveInfo, 'Opslaan');
			} else {
				return $rtfeldman$elm_css$Html$Styled$text('');
			}
		}();
		var formTableStyle = A2(
			$author$project$UI$DivTable$customizeCellStyle,
			_List_fromArray(
				[
					A2(
					$rtfeldman$elm_css$Css$padding2,
					$rtfeldman$elm_css$Css$em(0.375),
					$rtfeldman$elm_css$Css$em(0.5))
				]),
			A2(
				$author$project$UI$DivTable$customizeTableStyle,
				_List_fromArray(
					[
						$rtfeldman$elm_css$Css$marginTop(
						$rtfeldman$elm_css$Css$em(0.25))
					]),
				$author$project$UI$DivTable$emptyStyle));
		var infoForm = function () {
			var vatNumberInput = A5(renderInput, 'BTW Nummer', model.en, $author$project$Pages$InvoiceInfo$UpdateVatNumber, model.a1, 'BTW Nummer is verplicht.');
			var companyNameInput = A5(renderInput, 'Bedrijfsnaam', model.c8, $author$project$Pages$InvoiceInfo$UpdateCompanyName, model.aF, 'Bedrijfsnaam is verplicht.');
			var addressInput = A5(renderTextArea, 'Adres', model.cS, $author$project$Pages$InvoiceInfo$UpdateAddress, model.ax, 'Adres is verplicht.');
			return A2(
				$author$project$UI$DivTable$renderBody,
				formTableStyle,
				_List_fromArray(
					[
						_List_fromArray(
						[companyNameInput]),
						_List_fromArray(
						[vatNumberInput]),
						_List_fromArray(
						[addressInput])
					]));
		}();
		var evt = $author$project$Domain$Event$theEvent;
		return model.bG ? A2(
			$rtfeldman$elm_css$Html$Styled$div,
			_List_Nil,
			_List_fromArray(
				[
					$author$project$Pages$ViewParts$Banner$view(shared.eT),
					A4(
					$rtfeldman$elm_css$Html$Styled$styled,
					$rtfeldman$elm_css$Html$Styled$div,
					$author$project$Style$container,
					_List_Nil,
					_List_fromArray(
						[
							A4(
							$rtfeldman$elm_css$Html$Styled$styled,
							$rtfeldman$elm_css$Html$Styled$h1,
							_Utils_ap(
								$author$project$Style$pageHeader,
								_List_fromArray(
									[
										$rtfeldman$elm_css$Css$marginTop(
										$rtfeldman$elm_css$Css$em(0.3))
									])),
							_List_Nil,
							_List_fromArray(
								[
									$rtfeldman$elm_css$Html$Styled$text(evt.dK)
								])),
							A4(
							$rtfeldman$elm_css$Html$Styled$styled,
							$rtfeldman$elm_css$Html$Styled$div,
							_List_fromArray(
								[
									$rtfeldman$elm_css$Css$paddingLeft(
									$rtfeldman$elm_css$Css$em(1))
								]),
							_List_Nil,
							_List_fromArray(
								[
									$rtfeldman$elm_css$Html$Styled$text('Uw gegevens werden opgeslagen. Uw ontvangt binnenkort uw factuur via email.')
								])),
							ticketLink
						]))
				])) : A2(
			$rtfeldman$elm_css$Html$Styled$div,
			_List_Nil,
			_List_fromArray(
				[
					$author$project$Pages$ViewParts$Banner$view(shared.eT),
					A4(
					$rtfeldman$elm_css$Html$Styled$styled,
					$rtfeldman$elm_css$Html$Styled$div,
					$author$project$Style$container,
					_List_Nil,
					_List_fromArray(
						[
							A4(
							$rtfeldman$elm_css$Html$Styled$styled,
							$rtfeldman$elm_css$Html$Styled$h1,
							_Utils_ap(
								$author$project$Style$pageHeader,
								_List_fromArray(
									[
										$rtfeldman$elm_css$Css$marginTop(
										$rtfeldman$elm_css$Css$em(0.3))
									])),
							_List_Nil,
							_List_fromArray(
								[
									$rtfeldman$elm_css$Html$Styled$text(evt.dK)
								])),
							maybeTopButton,
							infoForm,
							ticketLink,
							maybeMargin,
							maybeBottomButton
						]))
				]));
	});
var $author$project$Pages$OrderTickets$AddFreeTicket = {$: 11};
var $author$project$Pages$OrderTickets$AddMemberTicket = {$: 7};
var $author$project$Pages$OrderTickets$AddNonMemberTicket = {$: 9};
var $author$project$Pages$OrderTickets$GotoPayment = {$: 13};
var $author$project$Pages$OrderTickets$RemoveFreeTicket = {$: 12};
var $author$project$Pages$OrderTickets$RemoveMemberTicket = {$: 8};
var $author$project$Pages$OrderTickets$RemoveNonMemberTicket = {$: 10};
var $author$project$Pages$OrderTickets$UpdateChristianName = function (a) {
	return {$: 2, a: a};
};
var $author$project$Pages$OrderTickets$UpdateConfirmEmail = function (a) {
	return {$: 5, a: a};
};
var $author$project$Pages$OrderTickets$UpdateEmail = function (a) {
	return {$: 4, a: a};
};
var $author$project$Pages$OrderTickets$UpdateFreeTicketCode = function (a) {
	return {$: 6, a: a};
};
var $author$project$Pages$OrderTickets$UpdateLastName = function (a) {
	return {$: 3, a: a};
};
var $rtfeldman$elm_css$Css$center = $rtfeldman$elm_css$Css$prop1('center');
var $rtfeldman$elm_css$Css$paddingRight = $rtfeldman$elm_css$Css$prop1('padding-right');
var $author$project$Style$symbolButton = _List_fromArray(
	[
		$rtfeldman$elm_css$Css$backgroundColor(
		$rtfeldman$elm_css$Css$hex('0c41d1')),
		$rtfeldman$elm_css$Css$color(
		$rtfeldman$elm_css$Css$hex('fff')),
		$rtfeldman$elm_css$Css$fontWeight($rtfeldman$elm_css$Css$bold),
		$rtfeldman$elm_css$Css$fontSize(
		$rtfeldman$elm_css$Css$em(1)),
		A2(
		$rtfeldman$elm_css$Css$padding2,
		$rtfeldman$elm_css$Css$em(0.6),
		$rtfeldman$elm_css$Css$em(1)),
		$rtfeldman$elm_css$Css$borderRadius(
		$rtfeldman$elm_css$Css$em(0.4)),
		$rtfeldman$elm_css$Css$border($rtfeldman$elm_css$Css$zero),
		$rtfeldman$elm_css$Css$cursor($rtfeldman$elm_css$Css$pointer)
	]);
var $author$project$Pages$OrderTickets$view = F2(
	function (shared, model) {
		var totalString = '€' + A2(
			$myrho$elm_round$Round$round,
			2,
			$author$project$Pages$OrderTickets$totalAmount(model));
		var ticketTableStyle = A2(
			$author$project$UI$DivTable$customizeCellStyle,
			_List_fromArray(
				[
					$rtfeldman$elm_css$Css$paddingLeft(
					$rtfeldman$elm_css$Css$em(0.5)),
					$rtfeldman$elm_css$Css$paddingTop(
					$rtfeldman$elm_css$Css$em(0.25))
				]),
			A2(
				$author$project$UI$DivTable$customizeTableStyle,
				_List_fromArray(
					[
						$rtfeldman$elm_css$Css$paddingLeft(
						$rtfeldman$elm_css$Css$em(0.75))
					]),
				$author$project$UI$DivTable$emptyStyle));
		var ticketForm = F3(
			function (ticketInfo, add, remove) {
				return _List_fromArray(
					[
						_List_fromArray(
						[
							$rtfeldman$elm_css$Html$Styled$text(
							ticketInfo.eS + (' - €' + A2($myrho$elm_round$Round$round, 2, ticketInfo.fu)))
						]),
						_List_fromArray(
						[
							A4(
							$rtfeldman$elm_css$Html$Styled$styled,
							$rtfeldman$elm_css$Html$Styled$button,
							$author$project$Style$symbolButton,
							_List_fromArray(
								[
									$rtfeldman$elm_css$Html$Styled$Events$onClick(remove)
								]),
							_List_fromArray(
								[
									$rtfeldman$elm_css$Html$Styled$text('-')
								]))
						]),
						_List_fromArray(
						[
							A4(
							$rtfeldman$elm_css$Html$Styled$styled,
							$rtfeldman$elm_css$Html$Styled$div,
							_List_fromArray(
								[
									$rtfeldman$elm_css$Css$width(
									$rtfeldman$elm_css$Css$em(1.5)),
									$rtfeldman$elm_css$Css$textAlign($rtfeldman$elm_css$Css$center)
								]),
							_List_Nil,
							_List_fromArray(
								[
									$rtfeldman$elm_css$Html$Styled$text(
									$elm$core$String$fromInt(ticketInfo.dN))
								]))
						]),
						_List_fromArray(
						[
							A4(
							$rtfeldman$elm_css$Html$Styled$styled,
							$rtfeldman$elm_css$Html$Styled$button,
							$author$project$Style$symbolButton,
							_List_fromArray(
								[
									$rtfeldman$elm_css$Html$Styled$Events$onClick(add)
								]),
							_List_fromArray(
								[
									$rtfeldman$elm_css$Html$Styled$text('+')
								]))
						])
					]);
			});
		var renderInput = F5(
			function (labelText, val, action, pred, validationMessage) {
				return _List_fromArray(
					[
						A4(
						$rtfeldman$elm_css$Html$Styled$styled,
						$rtfeldman$elm_css$Html$Styled$div,
						$author$project$Style$inputLabelContainer,
						_List_Nil,
						_List_fromArray(
							[
								A4(
								$rtfeldman$elm_css$Html$Styled$styled,
								$rtfeldman$elm_css$Html$Styled$input,
								$author$project$Style$input,
								_List_fromArray(
									[
										$rtfeldman$elm_css$Html$Styled$Attributes$value(val),
										$rtfeldman$elm_css$Html$Styled$Attributes$required(true),
										$rtfeldman$elm_css$Html$Styled$Events$onInput(action)
									]),
								_List_Nil),
								A4(
								$rtfeldman$elm_css$Html$Styled$styled,
								$rtfeldman$elm_css$Html$Styled$label,
								$author$project$Style$label,
								_List_Nil,
								_List_fromArray(
									[
										$rtfeldman$elm_css$Html$Styled$text(labelText)
									]))
							])),
						A2(
						$author$project$Lib$ViewHelpers$showIfNot,
						pred,
						A4(
							$rtfeldman$elm_css$Html$Styled$styled,
							$rtfeldman$elm_css$Html$Styled$div,
							$author$project$Style$validation,
							_List_Nil,
							_List_fromArray(
								[
									$rtfeldman$elm_css$Html$Styled$text(validationMessage)
								])))
					]);
			});
		var maybeMargin = function () {
			var _v3 = shared.eT;
			if (!_v3) {
				return A4(
					$rtfeldman$elm_css$Html$Styled$styled,
					$rtfeldman$elm_css$Html$Styled$div,
					_List_fromArray(
						[
							$rtfeldman$elm_css$Css$marginBottom(
							$rtfeldman$elm_css$Css$em(6))
						]),
					_List_Nil,
					_List_fromArray(
						[
							$rtfeldman$elm_css$Html$Styled$text('')
						]));
			} else {
				return $rtfeldman$elm_css$Html$Styled$text('');
			}
		}();
		var maybeBottomButton = function () {
			var _v2 = shared.eT;
			if (!_v2) {
				return A2($author$project$Pages$ViewParts$BottomFixedButton$view, $author$project$Pages$OrderTickets$GotoPayment, 'Tickets Aankopen');
			} else {
				return $rtfeldman$elm_css$Html$Styled$text('');
			}
		}();
		var maxFreeTickets = $elm$core$String$fromInt(
			A2($elm$core$Basics$min, model.X, 2));
		var formTableStyle = A2(
			$author$project$UI$DivTable$customizeCellStyle,
			_List_fromArray(
				[
					A2(
					$rtfeldman$elm_css$Css$padding2,
					$rtfeldman$elm_css$Css$em(0.375),
					$rtfeldman$elm_css$Css$em(0.5))
				]),
			A2(
				$author$project$UI$DivTable$customizeTableStyle,
				_List_fromArray(
					[
						$rtfeldman$elm_css$Css$marginTop(
						$rtfeldman$elm_css$Css$em(0.25))
					]),
				$author$project$UI$DivTable$emptyStyle));
		var infoForm = function () {
			var lastNameInput = A5(renderInput, 'Achternaam', model.fh, $author$project$Pages$OrderTickets$UpdateLastName, model.aQ, 'Achternaam is verplicht.');
			var emailInput = A5(renderInput, 'E-mailadres', model.eY, $author$project$Pages$OrderTickets$UpdateEmail, model.aJ && model.aK, 'Geef een geldig e-mailadres.');
			var confirmEmailInput = A5(renderInput, 'E-mail Bevestigen', model.aG, $author$project$Pages$OrderTickets$UpdateConfirmEmail, model.aH && model.a7, 'E-mailadressen komen niet overeen.');
			var christianNameInput = A5(renderInput, 'Voornaam', model.eG, $author$project$Pages$OrderTickets$UpdateChristianName, model.aD, 'Voornaam is verplicht.');
			var _v1 = shared.eT;
			if (!_v1) {
				return A2(
					$author$project$UI$DivTable$renderBody,
					formTableStyle,
					_List_fromArray(
						[
							_List_fromArray(
							[christianNameInput]),
							_List_fromArray(
							[lastNameInput]),
							_List_fromArray(
							[emailInput]),
							_List_fromArray(
							[confirmEmailInput])
						]));
			} else {
				return A2(
					$author$project$UI$DivTable$renderBody,
					formTableStyle,
					_List_fromArray(
						[
							_List_fromArray(
							[christianNameInput, lastNameInput]),
							_List_fromArray(
							[emailInput, confirmEmailInput])
						]));
			}
		}();
		var evt = $author$project$Domain$Event$theEvent;
		var dateTimeRow = function () {
			var _v0 = shared.eT;
			if (!_v0) {
				return A4(
					$rtfeldman$elm_css$Html$Styled$styled,
					$rtfeldman$elm_css$Html$Styled$h3,
					$author$project$Style$pageHeader,
					_List_Nil,
					_List_fromArray(
						[
							$rtfeldman$elm_css$Html$Styled$text(
							$author$project$Domain$Event$dateTimeString(evt))
						]));
			} else {
				return A3(
					$author$project$Pages$ViewParts$HeaderAndButton$view,
					$author$project$Domain$Event$dateTimeString(evt),
					$author$project$Pages$OrderTickets$GotoPayment,
					'Tickets Aankopen');
			}
		}();
		return A2(
			$rtfeldman$elm_css$Html$Styled$div,
			_List_Nil,
			_List_fromArray(
				[
					$author$project$Pages$ViewParts$Banner$view(shared.eT),
					A4(
					$rtfeldman$elm_css$Html$Styled$styled,
					$rtfeldman$elm_css$Html$Styled$div,
					$author$project$Style$container,
					_List_Nil,
					_List_fromArray(
						[
							A4(
							$rtfeldman$elm_css$Html$Styled$styled,
							$rtfeldman$elm_css$Html$Styled$h1,
							$author$project$Style$pageHeader,
							_List_Nil,
							_List_fromArray(
								[
									$rtfeldman$elm_css$Html$Styled$text(evt.dK)
								])),
							A4(
							$rtfeldman$elm_css$Html$Styled$styled,
							$rtfeldman$elm_css$Html$Styled$h3,
							$author$project$Style$pageHeader,
							_List_Nil,
							_List_fromArray(
								[
									$rtfeldman$elm_css$Html$Styled$text(
									$author$project$Domain$Event$dateTimeString(evt))
								])),
							A4(
							$rtfeldman$elm_css$Html$Styled$styled,
							$rtfeldman$elm_css$Html$Styled$h2,
							A2(
								$elm$core$List$cons,
								$rtfeldman$elm_css$Css$marginBottom(
									$rtfeldman$elm_css$Css$em(0.375)),
								$author$project$Style$pageHeader),
							_List_Nil,
							_List_fromArray(
								[
									$rtfeldman$elm_css$Html$Styled$text('Gegevens')
								])),
							infoForm,
							A4(
							$rtfeldman$elm_css$Html$Styled$styled,
							$rtfeldman$elm_css$Html$Styled$h2,
							$author$project$Style$pageHeader,
							_List_Nil,
							_List_fromArray(
								[
									$rtfeldman$elm_css$Html$Styled$text('Tickets')
								])),
							A2(
							$author$project$UI$DivTable$renderBody,
							ticketTableStyle,
							_List_fromArray(
								[
									_List_fromArray(
									[
										_List_fromArray(
										[
											$rtfeldman$elm_css$Html$Styled$text('Totaal: ')
										]),
										_List_fromArray(
										[
											A2(
											$rtfeldman$elm_css$Html$Styled$div,
											_List_Nil,
											_List_fromArray(
												[
													$rtfeldman$elm_css$Html$Styled$text(totalString)
												]))
										])
									])
								])),
							A2($rtfeldman$elm_css$Html$Styled$br, _List_Nil, _List_Nil),
							A2(
							$author$project$Lib$ViewHelpers$showIfNot,
							model.Y,
							A4(
								$rtfeldman$elm_css$Html$Styled$styled,
								$rtfeldman$elm_css$Html$Styled$div,
								$author$project$Style$validation,
								_List_Nil,
								_List_fromArray(
									[
										$rtfeldman$elm_css$Html$Styled$text('Gelieve minstens één ticket te selecteren.')
									]))),
							A2(
							$author$project$UI$DivTable$renderBody,
							ticketTableStyle,
							_List_fromArray(
								[
									A3(ticketForm, model.E, $author$project$Pages$OrderTickets$AddMemberTicket, $author$project$Pages$OrderTickets$RemoveMemberTicket),
									A3(ticketForm, model.F, $author$project$Pages$OrderTickets$AddNonMemberTicket, $author$project$Pages$OrderTickets$RemoveNonMemberTicket)
								])),
							A2(
							$author$project$Lib$ViewHelpers$showIf,
							model.X > 0,
							A4(
								$rtfeldman$elm_css$Html$Styled$styled,
								$rtfeldman$elm_css$Html$Styled$div,
								_List_fromArray(
									[
										A2(
										$rtfeldman$elm_css$Css$padding2,
										$rtfeldman$elm_css$Css$em(0.5),
										$rtfeldman$elm_css$Css$zero)
									]),
								_List_Nil,
								_List_fromArray(
									[
										$rtfeldman$elm_css$Html$Styled$text('Voer uw code in voor gratis tickets (max ' + (maxFreeTickets + ')'))
									]))),
							A2(
							$author$project$Lib$ViewHelpers$showIf,
							model.X > 0,
							A2(
								$author$project$UI$DivTable$renderBody,
								ticketTableStyle,
								_List_fromArray(
									[
										_List_fromArray(
										[
											_List_fromArray(
											[
												A4(
												$rtfeldman$elm_css$Html$Styled$styled,
												$rtfeldman$elm_css$Html$Styled$div,
												_List_fromArray(
													[
														$rtfeldman$elm_css$Css$paddingRight(
														$rtfeldman$elm_css$Css$em(0.5))
													]),
												_List_Nil,
												A5(renderInput, 'Code', model.ba, $author$project$Pages$OrderTickets$UpdateFreeTicketCode, model.bb, 'Onbekende code.'))
											]),
											_List_fromArray(
											[
												A4(
												$rtfeldman$elm_css$Html$Styled$styled,
												$rtfeldman$elm_css$Html$Styled$button,
												$author$project$Style$symbolButton,
												_List_fromArray(
													[
														$rtfeldman$elm_css$Html$Styled$Events$onClick($author$project$Pages$OrderTickets$RemoveFreeTicket)
													]),
												_List_fromArray(
													[
														$rtfeldman$elm_css$Html$Styled$text('-')
													]))
											]),
											_List_fromArray(
											[
												A4(
												$rtfeldman$elm_css$Html$Styled$styled,
												$rtfeldman$elm_css$Html$Styled$div,
												_List_fromArray(
													[
														$rtfeldman$elm_css$Css$width(
														$rtfeldman$elm_css$Css$em(1.5)),
														$rtfeldman$elm_css$Css$textAlign($rtfeldman$elm_css$Css$center)
													]),
												_List_Nil,
												_List_fromArray(
													[
														$rtfeldman$elm_css$Html$Styled$text(
														$elm$core$String$fromInt(model.N.dN))
													]))
											]),
											_List_fromArray(
											[
												A4(
												$rtfeldman$elm_css$Html$Styled$styled,
												$rtfeldman$elm_css$Html$Styled$button,
												$author$project$Style$symbolButton,
												_List_fromArray(
													[
														$rtfeldman$elm_css$Html$Styled$Events$onClick($author$project$Pages$OrderTickets$AddFreeTicket)
													]),
												_List_fromArray(
													[
														$rtfeldman$elm_css$Html$Styled$text('+')
													]))
											])
										])
									]))),
							A2(
							$author$project$Lib$ViewHelpers$showIf,
							model.X <= 0,
							A4(
								$rtfeldman$elm_css$Html$Styled$styled,
								$rtfeldman$elm_css$Html$Styled$div,
								_List_fromArray(
									[
										A2(
										$rtfeldman$elm_css$Css$padding2,
										$rtfeldman$elm_css$Css$em(0.5),
										$rtfeldman$elm_css$Css$em(1))
									]),
								_List_Nil,
								_List_fromArray(
									[
										$rtfeldman$elm_css$Html$Styled$text('De tickets met code zijn niet meer beschikbaar.')
									]))),
							maybeMargin
						]))
				]));
	});
var $author$project$Pages$OrderTicketsTemp$AddFreeTicket = {$: 11};
var $author$project$Pages$OrderTicketsTemp$AddMemberTicket = {$: 7};
var $author$project$Pages$OrderTicketsTemp$AddNonMemberTicket = {$: 9};
var $author$project$Pages$OrderTicketsTemp$GotoPayment = {$: 13};
var $author$project$Pages$OrderTicketsTemp$RemoveFreeTicket = {$: 12};
var $author$project$Pages$OrderTicketsTemp$RemoveMemberTicket = {$: 8};
var $author$project$Pages$OrderTicketsTemp$RemoveNonMemberTicket = {$: 10};
var $author$project$Pages$OrderTicketsTemp$UpdateChristianName = function (a) {
	return {$: 2, a: a};
};
var $author$project$Pages$OrderTicketsTemp$UpdateConfirmEmail = function (a) {
	return {$: 5, a: a};
};
var $author$project$Pages$OrderTicketsTemp$UpdateEmail = function (a) {
	return {$: 4, a: a};
};
var $author$project$Pages$OrderTicketsTemp$UpdateFreeTicketCode = function (a) {
	return {$: 6, a: a};
};
var $author$project$Pages$OrderTicketsTemp$UpdateLastName = function (a) {
	return {$: 3, a: a};
};
var $author$project$Pages$OrderTicketsTemp$view = F2(
	function (shared, model) {
		var totalString = '€' + A2(
			$myrho$elm_round$Round$round,
			2,
			$author$project$Pages$OrderTicketsTemp$totalAmount(model));
		var ticketTableStyle = A2(
			$author$project$UI$DivTable$customizeCellStyle,
			_List_fromArray(
				[
					$rtfeldman$elm_css$Css$paddingLeft(
					$rtfeldman$elm_css$Css$em(0.5)),
					$rtfeldman$elm_css$Css$paddingTop(
					$rtfeldman$elm_css$Css$em(0.25))
				]),
			A2(
				$author$project$UI$DivTable$customizeTableStyle,
				_List_fromArray(
					[
						$rtfeldman$elm_css$Css$paddingLeft(
						$rtfeldman$elm_css$Css$em(0.75))
					]),
				$author$project$UI$DivTable$emptyStyle));
		var ticketForm = F3(
			function (ticketInfo, add, remove) {
				return _List_fromArray(
					[
						_List_fromArray(
						[
							$rtfeldman$elm_css$Html$Styled$text(
							ticketInfo.eS + (' - €' + A2($myrho$elm_round$Round$round, 2, ticketInfo.fu)))
						]),
						_List_fromArray(
						[
							A4(
							$rtfeldman$elm_css$Html$Styled$styled,
							$rtfeldman$elm_css$Html$Styled$button,
							$author$project$Style$symbolButton,
							_List_fromArray(
								[
									$rtfeldman$elm_css$Html$Styled$Events$onClick(remove)
								]),
							_List_fromArray(
								[
									$rtfeldman$elm_css$Html$Styled$text('-')
								]))
						]),
						_List_fromArray(
						[
							A4(
							$rtfeldman$elm_css$Html$Styled$styled,
							$rtfeldman$elm_css$Html$Styled$div,
							_List_fromArray(
								[
									$rtfeldman$elm_css$Css$width(
									$rtfeldman$elm_css$Css$em(1.5)),
									$rtfeldman$elm_css$Css$textAlign($rtfeldman$elm_css$Css$center)
								]),
							_List_Nil,
							_List_fromArray(
								[
									$rtfeldman$elm_css$Html$Styled$text(
									$elm$core$String$fromInt(ticketInfo.dN))
								]))
						]),
						_List_fromArray(
						[
							A4(
							$rtfeldman$elm_css$Html$Styled$styled,
							$rtfeldman$elm_css$Html$Styled$button,
							$author$project$Style$symbolButton,
							_List_fromArray(
								[
									$rtfeldman$elm_css$Html$Styled$Events$onClick(add)
								]),
							_List_fromArray(
								[
									$rtfeldman$elm_css$Html$Styled$text('+')
								]))
						])
					]);
			});
		var renderInput = F5(
			function (labelText, val, action, pred, validationMessage) {
				return _List_fromArray(
					[
						A4(
						$rtfeldman$elm_css$Html$Styled$styled,
						$rtfeldman$elm_css$Html$Styled$div,
						$author$project$Style$inputLabelContainer,
						_List_Nil,
						_List_fromArray(
							[
								A4(
								$rtfeldman$elm_css$Html$Styled$styled,
								$rtfeldman$elm_css$Html$Styled$input,
								$author$project$Style$input,
								_List_fromArray(
									[
										$rtfeldman$elm_css$Html$Styled$Attributes$value(val),
										$rtfeldman$elm_css$Html$Styled$Attributes$required(true),
										$rtfeldman$elm_css$Html$Styled$Events$onInput(action)
									]),
								_List_Nil),
								A4(
								$rtfeldman$elm_css$Html$Styled$styled,
								$rtfeldman$elm_css$Html$Styled$label,
								$author$project$Style$label,
								_List_Nil,
								_List_fromArray(
									[
										$rtfeldman$elm_css$Html$Styled$text(labelText)
									]))
							])),
						A2(
						$author$project$Lib$ViewHelpers$showIfNot,
						pred,
						A4(
							$rtfeldman$elm_css$Html$Styled$styled,
							$rtfeldman$elm_css$Html$Styled$div,
							$author$project$Style$validation,
							_List_Nil,
							_List_fromArray(
								[
									$rtfeldman$elm_css$Html$Styled$text(validationMessage)
								])))
					]);
			});
		var maybeMargin = function () {
			var _v3 = shared.eT;
			if (!_v3) {
				return A4(
					$rtfeldman$elm_css$Html$Styled$styled,
					$rtfeldman$elm_css$Html$Styled$div,
					_List_fromArray(
						[
							$rtfeldman$elm_css$Css$marginBottom(
							$rtfeldman$elm_css$Css$em(6))
						]),
					_List_Nil,
					_List_fromArray(
						[
							$rtfeldman$elm_css$Html$Styled$text('')
						]));
			} else {
				return $rtfeldman$elm_css$Html$Styled$text('');
			}
		}();
		var maybeBottomButton = function () {
			var _v2 = shared.eT;
			if (!_v2) {
				return A2($author$project$Pages$ViewParts$BottomFixedButton$view, $author$project$Pages$OrderTicketsTemp$GotoPayment, 'Tickets Aankopen');
			} else {
				return $rtfeldman$elm_css$Html$Styled$text('');
			}
		}();
		var maxFreeTickets = $elm$core$String$fromInt(
			A2($elm$core$Basics$min, model.X, 2));
		var formTableStyle = A2(
			$author$project$UI$DivTable$customizeCellStyle,
			_List_fromArray(
				[
					A2(
					$rtfeldman$elm_css$Css$padding2,
					$rtfeldman$elm_css$Css$em(0.375),
					$rtfeldman$elm_css$Css$em(0.5))
				]),
			A2(
				$author$project$UI$DivTable$customizeTableStyle,
				_List_fromArray(
					[
						$rtfeldman$elm_css$Css$marginTop(
						$rtfeldman$elm_css$Css$em(0.25))
					]),
				$author$project$UI$DivTable$emptyStyle));
		var infoForm = function () {
			var lastNameInput = A5(renderInput, 'Achternaam', model.fh, $author$project$Pages$OrderTicketsTemp$UpdateLastName, model.aQ, 'Achternaam is verplicht.');
			var emailInput = A5(renderInput, 'E-mailadres', model.eY, $author$project$Pages$OrderTicketsTemp$UpdateEmail, model.aJ && model.aK, 'Geef een geldig e-mailadres.');
			var confirmEmailInput = A5(renderInput, 'E-mail Bevestigen', model.aG, $author$project$Pages$OrderTicketsTemp$UpdateConfirmEmail, model.aH && model.a7, 'E-mailadressen komen niet overeen.');
			var christianNameInput = A5(renderInput, 'Voornaam', model.eG, $author$project$Pages$OrderTicketsTemp$UpdateChristianName, model.aD, 'Voornaam is verplicht.');
			var _v1 = shared.eT;
			if (!_v1) {
				return A2(
					$author$project$UI$DivTable$renderBody,
					formTableStyle,
					_List_fromArray(
						[
							_List_fromArray(
							[christianNameInput]),
							_List_fromArray(
							[lastNameInput]),
							_List_fromArray(
							[emailInput]),
							_List_fromArray(
							[confirmEmailInput])
						]));
			} else {
				return A2(
					$author$project$UI$DivTable$renderBody,
					formTableStyle,
					_List_fromArray(
						[
							_List_fromArray(
							[christianNameInput, lastNameInput]),
							_List_fromArray(
							[emailInput, confirmEmailInput])
						]));
			}
		}();
		var evt = $author$project$Domain$Event$theEvent;
		var dateTimeRow = function () {
			var _v0 = shared.eT;
			if (!_v0) {
				return A4(
					$rtfeldman$elm_css$Html$Styled$styled,
					$rtfeldman$elm_css$Html$Styled$h3,
					$author$project$Style$pageHeader,
					_List_Nil,
					_List_fromArray(
						[
							$rtfeldman$elm_css$Html$Styled$text(
							$author$project$Domain$Event$dateTimeString(evt))
						]));
			} else {
				return A3(
					$author$project$Pages$ViewParts$HeaderAndButton$view,
					$author$project$Domain$Event$dateTimeString(evt),
					$author$project$Pages$OrderTicketsTemp$GotoPayment,
					'Tickets Aankopen');
			}
		}();
		return A2(
			$rtfeldman$elm_css$Html$Styled$div,
			_List_Nil,
			_List_fromArray(
				[
					$author$project$Pages$ViewParts$Banner$view(shared.eT),
					A4(
					$rtfeldman$elm_css$Html$Styled$styled,
					$rtfeldman$elm_css$Html$Styled$div,
					$author$project$Style$container,
					_List_Nil,
					_List_fromArray(
						[
							A4(
							$rtfeldman$elm_css$Html$Styled$styled,
							$rtfeldman$elm_css$Html$Styled$h1,
							$author$project$Style$pageHeader,
							_List_Nil,
							_List_fromArray(
								[
									$rtfeldman$elm_css$Html$Styled$text(evt.dK)
								])),
							dateTimeRow,
							A4(
							$rtfeldman$elm_css$Html$Styled$styled,
							$rtfeldman$elm_css$Html$Styled$h2,
							A2(
								$elm$core$List$cons,
								$rtfeldman$elm_css$Css$marginBottom(
									$rtfeldman$elm_css$Css$em(0.375)),
								$author$project$Style$pageHeader),
							_List_Nil,
							_List_fromArray(
								[
									$rtfeldman$elm_css$Html$Styled$text('Gegevens')
								])),
							infoForm,
							A4(
							$rtfeldman$elm_css$Html$Styled$styled,
							$rtfeldman$elm_css$Html$Styled$h2,
							$author$project$Style$pageHeader,
							_List_Nil,
							_List_fromArray(
								[
									$rtfeldman$elm_css$Html$Styled$text('Tickets')
								])),
							A2(
							$author$project$UI$DivTable$renderBody,
							ticketTableStyle,
							_List_fromArray(
								[
									_List_fromArray(
									[
										_List_fromArray(
										[
											$rtfeldman$elm_css$Html$Styled$text('Totaal: ')
										]),
										_List_fromArray(
										[
											A2(
											$rtfeldman$elm_css$Html$Styled$div,
											_List_Nil,
											_List_fromArray(
												[
													$rtfeldman$elm_css$Html$Styled$text(totalString)
												]))
										])
									])
								])),
							A2($rtfeldman$elm_css$Html$Styled$br, _List_Nil, _List_Nil),
							A2(
							$author$project$Lib$ViewHelpers$showIfNot,
							model.Y,
							A4(
								$rtfeldman$elm_css$Html$Styled$styled,
								$rtfeldman$elm_css$Html$Styled$div,
								$author$project$Style$validation,
								_List_Nil,
								_List_fromArray(
									[
										$rtfeldman$elm_css$Html$Styled$text('Gelieve minstens één ticket te selecteren.')
									]))),
							A2(
							$author$project$UI$DivTable$renderBody,
							ticketTableStyle,
							_List_fromArray(
								[
									A3(ticketForm, model.E, $author$project$Pages$OrderTicketsTemp$AddMemberTicket, $author$project$Pages$OrderTicketsTemp$RemoveMemberTicket),
									A3(ticketForm, model.F, $author$project$Pages$OrderTicketsTemp$AddNonMemberTicket, $author$project$Pages$OrderTicketsTemp$RemoveNonMemberTicket)
								])),
							A2(
							$author$project$Lib$ViewHelpers$showIf,
							model.X > 0,
							A4(
								$rtfeldman$elm_css$Html$Styled$styled,
								$rtfeldman$elm_css$Html$Styled$div,
								_List_fromArray(
									[
										A2(
										$rtfeldman$elm_css$Css$padding2,
										$rtfeldman$elm_css$Css$em(0.5),
										$rtfeldman$elm_css$Css$zero)
									]),
								_List_Nil,
								_List_fromArray(
									[
										$rtfeldman$elm_css$Html$Styled$text('Voer uw code in voor gratis tickets (max ' + (maxFreeTickets + ')'))
									]))),
							A2(
							$author$project$Lib$ViewHelpers$showIf,
							model.X > 0,
							A2(
								$author$project$UI$DivTable$renderBody,
								ticketTableStyle,
								_List_fromArray(
									[
										_List_fromArray(
										[
											_List_fromArray(
											[
												A4(
												$rtfeldman$elm_css$Html$Styled$styled,
												$rtfeldman$elm_css$Html$Styled$div,
												_List_fromArray(
													[
														$rtfeldman$elm_css$Css$paddingRight(
														$rtfeldman$elm_css$Css$em(0.5))
													]),
												_List_Nil,
												A5(renderInput, 'Code', model.ba, $author$project$Pages$OrderTicketsTemp$UpdateFreeTicketCode, model.bb, 'Onbekende code.'))
											]),
											_List_fromArray(
											[
												A4(
												$rtfeldman$elm_css$Html$Styled$styled,
												$rtfeldman$elm_css$Html$Styled$button,
												$author$project$Style$symbolButton,
												_List_fromArray(
													[
														$rtfeldman$elm_css$Html$Styled$Events$onClick($author$project$Pages$OrderTicketsTemp$RemoveFreeTicket)
													]),
												_List_fromArray(
													[
														$rtfeldman$elm_css$Html$Styled$text('-')
													]))
											]),
											_List_fromArray(
											[
												A4(
												$rtfeldman$elm_css$Html$Styled$styled,
												$rtfeldman$elm_css$Html$Styled$div,
												_List_fromArray(
													[
														$rtfeldman$elm_css$Css$width(
														$rtfeldman$elm_css$Css$em(1.5)),
														$rtfeldman$elm_css$Css$textAlign($rtfeldman$elm_css$Css$center)
													]),
												_List_Nil,
												_List_fromArray(
													[
														$rtfeldman$elm_css$Html$Styled$text(
														$elm$core$String$fromInt(model.N.dN))
													]))
											]),
											_List_fromArray(
											[
												A4(
												$rtfeldman$elm_css$Html$Styled$styled,
												$rtfeldman$elm_css$Html$Styled$button,
												$author$project$Style$symbolButton,
												_List_fromArray(
													[
														$rtfeldman$elm_css$Html$Styled$Events$onClick($author$project$Pages$OrderTicketsTemp$AddFreeTicket)
													]),
												_List_fromArray(
													[
														$rtfeldman$elm_css$Html$Styled$text('+')
													]))
											])
										])
									]))),
							A2(
							$author$project$Lib$ViewHelpers$showIf,
							model.X <= 0,
							A4(
								$rtfeldman$elm_css$Html$Styled$styled,
								$rtfeldman$elm_css$Html$Styled$div,
								_List_fromArray(
									[
										A2(
										$rtfeldman$elm_css$Css$padding2,
										$rtfeldman$elm_css$Css$em(0.5),
										$rtfeldman$elm_css$Css$em(1))
									]),
								_List_Nil,
								_List_fromArray(
									[
										$rtfeldman$elm_css$Html$Styled$text('De tickets met code zijn niet meer beschikbaar.')
									]))),
							maybeMargin,
							maybeBottomButton
						]))
				]));
	});
var $rtfeldman$elm_css$Html$Styled$Attributes$id = $rtfeldman$elm_css$Html$Styled$Attributes$stringProperty('id');
var $author$project$Pages$Payment$view = F2(
	function (shared, model) {
		var maybeMargin = function () {
			var _v0 = shared.eT;
			if (!_v0) {
				return A4(
					$rtfeldman$elm_css$Html$Styled$styled,
					$rtfeldman$elm_css$Html$Styled$div,
					_List_fromArray(
						[
							$rtfeldman$elm_css$Css$marginBottom(
							$rtfeldman$elm_css$Css$em(6))
						]),
					_List_Nil,
					_List_fromArray(
						[
							$rtfeldman$elm_css$Html$Styled$text('')
						]));
			} else {
				return $rtfeldman$elm_css$Html$Styled$text('');
			}
		}();
		var evt = $author$project$Domain$Event$theEvent;
		return A2(
			$rtfeldman$elm_css$Html$Styled$div,
			_List_Nil,
			_List_fromArray(
				[
					$author$project$Pages$ViewParts$Banner$view(shared.eT),
					A4(
					$rtfeldman$elm_css$Html$Styled$styled,
					$rtfeldman$elm_css$Html$Styled$div,
					$author$project$Style$container,
					_List_Nil,
					_List_fromArray(
						[
							A4(
							$rtfeldman$elm_css$Html$Styled$styled,
							$rtfeldman$elm_css$Html$Styled$h1,
							$author$project$Style$pageHeader,
							_List_Nil,
							_List_fromArray(
								[
									$rtfeldman$elm_css$Html$Styled$text(evt.dK)
								])),
							A2(
							$author$project$Lib$ViewHelpers$showIf,
							model.aY,
							A4(
								$rtfeldman$elm_css$Html$Styled$styled,
								$rtfeldman$elm_css$Html$Styled$div,
								_Utils_ap(
									$author$project$Style$validation,
									_List_fromArray(
										[
											$rtfeldman$elm_css$Css$fontSize(
											$rtfeldman$elm_css$Css$em(1.25)),
											$rtfeldman$elm_css$Css$paddingLeft(
											$rtfeldman$elm_css$Css$em(2))
										])),
								_List_Nil,
								_List_fromArray(
									[
										$rtfeldman$elm_css$Html$Styled$text('Uw kaart informatie kon niet geverifiëerd worden. Gelieve de gegevens te controleren.')
									]))),
							A4(
							$rtfeldman$elm_css$Html$Styled$styled,
							$rtfeldman$elm_css$Html$Styled$div,
							_List_fromArray(
								[
									$rtfeldman$elm_css$Css$fontSize(
									$rtfeldman$elm_css$Css$em(1.25)),
									$rtfeldman$elm_css$Css$paddingLeft(
									$rtfeldman$elm_css$Css$em(2))
								]),
							_List_Nil,
							_List_fromArray(
								[
									$rtfeldman$elm_css$Html$Styled$text('Opgelet SumUp ondersteunt enkel deze onderstaande kaarten.')
								])),
							A2(
							$rtfeldman$elm_css$Html$Styled$div,
							_List_fromArray(
								[
									$rtfeldman$elm_css$Html$Styled$Attributes$id('sumup-card')
								]),
							_List_Nil),
							maybeMargin
						]))
				]));
	});
var $author$project$Pages$PaymentSuccess$view = F2(
	function (shared, model) {
		var _v0 = model.bN;
		if (_v0.$ === 1) {
			return A2(
				$rtfeldman$elm_css$Html$Styled$div,
				_List_Nil,
				_List_fromArray(
					[
						$author$project$Pages$ViewParts$Banner$view(shared.eT)
					]));
		} else {
			var orderInfo = _v0.a;
			var ticketHref = '/tickets/' + (orderInfo.dv + ('-' + orderInfo.eI));
			var maybeInvoiceInfoLink = ($author$project$Pages$PaymentSuccess$totalAmount(orderInfo) > 0) ? _List_fromArray(
				[
					A2(
					$rtfeldman$elm_css$Html$Styled$div,
					_List_Nil,
					_List_fromArray(
						[
							$rtfeldman$elm_css$Html$Styled$text('Indien u een faktuur vereist, gelieve uw bedrijfs informatie in te geven via het volgende formulier :')
						])),
					A2(
					$rtfeldman$elm_css$Html$Styled$div,
					_List_Nil,
					_List_fromArray(
						[
							A4(
							$rtfeldman$elm_css$Html$Styled$styled,
							$rtfeldman$elm_css$Html$Styled$a,
							_List_fromArray(
								[
									$author$project$Style$hyperLink,
									$rtfeldman$elm_css$Css$fontSize(
									$rtfeldman$elm_css$Css$em(1.25))
								]),
							_List_fromArray(
								[
									$rtfeldman$elm_css$Html$Styled$Attributes$href('/invoice-info')
								]),
							_List_fromArray(
								[
									$rtfeldman$elm_css$Html$Styled$text('Fakturatie gegevens')
								]))
						])),
					A2($rtfeldman$elm_css$Html$Styled$br, _List_Nil, _List_Nil)
				]) : _List_Nil;
			return A2(
				$rtfeldman$elm_css$Html$Styled$div,
				_List_Nil,
				_List_fromArray(
					[
						$author$project$Pages$ViewParts$Banner$view(shared.eT),
						A4(
						$rtfeldman$elm_css$Html$Styled$styled,
						$rtfeldman$elm_css$Html$Styled$div,
						$author$project$Style$container,
						_List_Nil,
						_List_fromArray(
							[
								A4(
								$rtfeldman$elm_css$Html$Styled$styled,
								$rtfeldman$elm_css$Html$Styled$h2,
								_Utils_ap(
									_List_fromArray(
										[
											$rtfeldman$elm_css$Css$marginBottom(
											$rtfeldman$elm_css$Css$em(0.375)),
											$rtfeldman$elm_css$Css$paddingBottom(
											$rtfeldman$elm_css$Css$em(0.5))
										]),
									$author$project$Style$pageHeader),
								_List_Nil,
								_List_fromArray(
									[
										$rtfeldman$elm_css$Html$Styled$text('Tickets Aangekocht')
									])),
								A4(
								$rtfeldman$elm_css$Html$Styled$styled,
								$rtfeldman$elm_css$Html$Styled$div,
								_List_fromArray(
									[
										$rtfeldman$elm_css$Css$paddingLeft(
										$rtfeldman$elm_css$Css$em(1)),
										$rtfeldman$elm_css$Css$paddingBottom(
										$rtfeldman$elm_css$Css$em(1.5))
									]),
								_List_Nil,
								_Utils_ap(
									maybeInvoiceInfoLink,
									_List_fromArray(
										[
											A2(
											$rtfeldman$elm_css$Html$Styled$div,
											_List_Nil,
											_List_fromArray(
												[
													$rtfeldman$elm_css$Html$Styled$text('Hieronder vind u een link naar de aangekochte tickets. ' + 'U kan deze afdrukken, bewaren als pdf (via \'Print to Pdf\'), of u kan ook deze pagina rechtstreeks gebruiken als toegang op het event.')
												])),
											A2($rtfeldman$elm_css$Html$Styled$br, _List_Nil, _List_Nil),
											A2(
											$rtfeldman$elm_css$Html$Styled$div,
											_List_Nil,
											_List_fromArray(
												[
													$rtfeldman$elm_css$Html$Styled$text('Een kopie van deze informatie inclusief link naar afdrukbare pagina is naar ' + (orderInfo.eY + ' verstuurd.'))
												])),
											A2($rtfeldman$elm_css$Html$Styled$br, _List_Nil, _List_Nil),
											A2(
											$rtfeldman$elm_css$Html$Styled$div,
											_List_Nil,
											_List_fromArray(
												[
													A4(
													$rtfeldman$elm_css$Html$Styled$styled,
													$rtfeldman$elm_css$Html$Styled$a,
													_List_fromArray(
														[
															$author$project$Style$hyperLink,
															$rtfeldman$elm_css$Css$fontSize(
															$rtfeldman$elm_css$Css$em(1.25))
														]),
													_List_fromArray(
														[
															$rtfeldman$elm_css$Html$Styled$Attributes$href(ticketHref)
														]),
													_List_fromArray(
														[
															$rtfeldman$elm_css$Html$Styled$text('Tickets Weergeven')
														]))
												]))
										])))
							]))
					]));
		}
	});
var $author$project$Pages$TeesAndCees$Back = 0;
var $rtfeldman$elm_css$VirtualDom$Styled$unstyledNode = $rtfeldman$elm_css$VirtualDom$Styled$Unstyled;
var $rtfeldman$elm_css$Html$Styled$fromUnstyled = $rtfeldman$elm_css$VirtualDom$Styled$unstyledNode;
var $elm_explorations$markdown$Markdown$defaultOptions = {
	dc: $elm$core$Maybe$Nothing,
	e3: $elm$core$Maybe$Just(
		{eD: false, fK: false}),
	fz: true,
	fE: false
};
var $elm_explorations$markdown$Markdown$toHtmlWith = _Markdown_toHtml;
var $elm_explorations$markdown$Markdown$toHtml = $elm_explorations$markdown$Markdown$toHtmlWith($elm_explorations$markdown$Markdown$defaultOptions);
var $author$project$Pages$TeesAndCees$view = F2(
	function (_v0, model) {
		return A2(
			$rtfeldman$elm_css$Html$Styled$div,
			_List_Nil,
			_List_fromArray(
				[
					A4(
					$rtfeldman$elm_css$Html$Styled$styled,
					$rtfeldman$elm_css$Html$Styled$div,
					$author$project$Style$container,
					_List_Nil,
					_List_fromArray(
						[
							A4(
							$rtfeldman$elm_css$Html$Styled$styled,
							$rtfeldman$elm_css$Html$Styled$a,
							_List_fromArray(
								[$author$project$Style$hyperLink]),
							_List_fromArray(
								[
									$rtfeldman$elm_css$Html$Styled$Events$onClick(0)
								]),
							_List_fromArray(
								[
									$rtfeldman$elm_css$Html$Styled$text('Terug')
								])),
							$rtfeldman$elm_css$Html$Styled$fromUnstyled(
							A2($elm_explorations$markdown$Markdown$toHtml, _List_Nil, model))
						]))
				]));
	});
var $author$project$Lib$DivTable$Cell = function (a) {
	return {$: 0, a: a};
};
var $author$project$Lib$DivTable$StyledCell = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var $rtfeldman$elm_css$Css$borderBottom3 = $rtfeldman$elm_css$Css$prop3('border-bottom');
var $rtfeldman$elm_css$Css$borderCollapse = $rtfeldman$elm_css$Css$prop1('border-collapse');
var $rtfeldman$elm_css$Css$borderTop3 = $rtfeldman$elm_css$Css$prop3('border-top');
var $rtfeldman$elm_css$Css$collapse = {c0: 0, S: 'collapse', br: 0};
var $author$project$Lib$DivTable$customizeCellStyle = F2(
	function (style, cfg) {
		var cell = cfg.aB;
		return _Utils_update(
			cfg,
			{
				aB: $rtfeldman$elm_css$Css$batch(
					A2($elm$core$List$cons, cell, style))
			});
	});
var $author$project$Lib$DivTable$customizeTableStyle = F2(
	function (style, cfg) {
		var table = cfg.bl;
		return _Utils_update(
			cfg,
			{
				bl: $rtfeldman$elm_css$Css$batch(
					A2($elm$core$List$cons, table, style))
			});
	});
var $rtfeldman$elm_css$Css$dashed = {w: 0, as: 0, S: 'dashed'};
var $author$project$Lib$DivTable$emptyStyle = {
	aB: $rtfeldman$elm_css$Css$batch(_List_Nil),
	bD: $rtfeldman$elm_css$Css$batch(_List_Nil),
	bc: $rtfeldman$elm_css$Css$batch(_List_Nil),
	ac: $elm$core$Maybe$Nothing,
	ao: $rtfeldman$elm_css$Css$batch(_List_Nil),
	bl: $rtfeldman$elm_css$Css$batch(_List_Nil)
};
var $rtfeldman$elm_css$Css$noWrap = {a8: 0, bB: 0, S: 'nowrap', aw: 0};
var $pablohirafuji$elm_qrcode$QRCode$Quartile = 2;
var $pablohirafuji$elm_qrcode$QRCode$QRCode = $elm$core$Basics$identity;
var $elm$core$Result$andThen = F2(
	function (callback, result) {
		if (!result.$) {
			var value = result.a;
			return callback(value);
		} else {
			var msg = result.a;
			return $elm$core$Result$Err(msg);
		}
	});
var $elm$core$Array$bitMask = 4294967295 >>> (32 - $elm$core$Array$shiftStep);
var $elm$core$Elm$JsArray$unsafeGet = _JsArray_unsafeGet;
var $elm$core$Array$getHelp = F3(
	function (shift, index, tree) {
		getHelp:
		while (true) {
			var pos = $elm$core$Array$bitMask & (index >>> shift);
			var _v0 = A2($elm$core$Elm$JsArray$unsafeGet, pos, tree);
			if (!_v0.$) {
				var subTree = _v0.a;
				var $temp$shift = shift - $elm$core$Array$shiftStep,
					$temp$index = index,
					$temp$tree = subTree;
				shift = $temp$shift;
				index = $temp$index;
				tree = $temp$tree;
				continue getHelp;
			} else {
				var values = _v0.a;
				return A2($elm$core$Elm$JsArray$unsafeGet, $elm$core$Array$bitMask & index, values);
			}
		}
	});
var $elm$core$Array$tailIndex = function (len) {
	return (len >>> 5) << 5;
};
var $elm$core$Array$get = F2(
	function (index, _v0) {
		var len = _v0.a;
		var startShift = _v0.b;
		var tree = _v0.c;
		var tail = _v0.d;
		return ((index < 0) || (_Utils_cmp(index, len) > -1)) ? $elm$core$Maybe$Nothing : ((_Utils_cmp(
			index,
			$elm$core$Array$tailIndex(len)) > -1) ? $elm$core$Maybe$Just(
			A2($elm$core$Elm$JsArray$unsafeGet, $elm$core$Array$bitMask & index, tail)) : $elm$core$Maybe$Just(
			A3($elm$core$Array$getHelp, startShift, index, tree)));
	});
var $pablohirafuji$elm_qrcode$QRCode$Matrix$getIndex = F3(
	function (size, row, col) {
		return (size * row) + col;
	});
var $pablohirafuji$elm_qrcode$QRCode$Matrix$isOccupy = F4(
	function (row, col, size, matrix) {
		var _v0 = A2(
			$elm$core$Array$get,
			A3($pablohirafuji$elm_qrcode$QRCode$Matrix$getIndex, size, row, col),
			matrix);
		if ((!_v0.$) && (!_v0.a.$)) {
			return true;
		} else {
			return false;
		}
	});
var $pablohirafuji$elm_qrcode$QRCode$Matrix$nextModule = function (placement) {
	var row = placement.ao;
	var col = placement.c5;
	var isRight = placement.O;
	var isUp = placement.bd;
	return isRight ? _Utils_update(
		placement,
		{c5: col - 1, O: false}) : (isUp ? _Utils_update(
		placement,
		{c5: col + 1, O: true, ao: row - 1}) : _Utils_update(
		placement,
		{c5: col + 1, O: true, ao: row + 1}));
};
var $pablohirafuji$elm_qrcode$QRCode$Matrix$bitToColor = F2(
	function (_byte, offset) {
		return (1 & (_byte >> (7 - offset))) === 1;
	});
var $elm$core$Elm$JsArray$unsafeSet = _JsArray_unsafeSet;
var $elm$core$Array$setHelp = F4(
	function (shift, index, value, tree) {
		var pos = $elm$core$Array$bitMask & (index >>> shift);
		var _v0 = A2($elm$core$Elm$JsArray$unsafeGet, pos, tree);
		if (!_v0.$) {
			var subTree = _v0.a;
			var newSub = A4($elm$core$Array$setHelp, shift - $elm$core$Array$shiftStep, index, value, subTree);
			return A3(
				$elm$core$Elm$JsArray$unsafeSet,
				pos,
				$elm$core$Array$SubTree(newSub),
				tree);
		} else {
			var values = _v0.a;
			var newLeaf = A3($elm$core$Elm$JsArray$unsafeSet, $elm$core$Array$bitMask & index, value, values);
			return A3(
				$elm$core$Elm$JsArray$unsafeSet,
				pos,
				$elm$core$Array$Leaf(newLeaf),
				tree);
		}
	});
var $elm$core$Array$set = F3(
	function (index, value, array) {
		var len = array.a;
		var startShift = array.b;
		var tree = array.c;
		var tail = array.d;
		return ((index < 0) || (_Utils_cmp(index, len) > -1)) ? array : ((_Utils_cmp(
			index,
			$elm$core$Array$tailIndex(len)) > -1) ? A4(
			$elm$core$Array$Array_elm_builtin,
			len,
			startShift,
			tree,
			A3($elm$core$Elm$JsArray$unsafeSet, $elm$core$Array$bitMask & index, value, tail)) : A4(
			$elm$core$Array$Array_elm_builtin,
			len,
			startShift,
			A4($elm$core$Array$setHelp, startShift, index, value, tree),
			tail));
	});
var $pablohirafuji$elm_qrcode$QRCode$Matrix$setDataModule = F3(
	function (_v0, _byte, offset) {
		var size = _v0.ea;
		var row = _v0.ao;
		var col = _v0.c5;
		return A2(
			$elm$core$Array$set,
			A3($pablohirafuji$elm_qrcode$QRCode$Matrix$getIndex, size, row, col),
			$elm$core$Maybe$Just(
				_Utils_Tuple2(
					false,
					A2($pablohirafuji$elm_qrcode$QRCode$Matrix$bitToColor, _byte, offset))));
	});
var $pablohirafuji$elm_qrcode$QRCode$Matrix$addDataModule = F4(
	function (placement, bytes, offset, matrix) {
		addDataModule:
		while (true) {
			var size = placement.ea;
			var row = placement.ao;
			var col = placement.c5;
			if (!bytes.b) {
				return matrix;
			} else {
				var head = bytes.a;
				var tail = bytes.b;
				if (offset >= 8) {
					var $temp$placement = placement,
						$temp$bytes = tail,
						$temp$offset = 0,
						$temp$matrix = matrix;
					placement = $temp$placement;
					bytes = $temp$bytes;
					offset = $temp$offset;
					matrix = $temp$matrix;
					continue addDataModule;
				} else {
					if (col === 6) {
						var $temp$placement = _Utils_update(
							placement,
							{c5: col - 1, O: true}),
							$temp$bytes = bytes,
							$temp$offset = offset,
							$temp$matrix = matrix;
						placement = $temp$placement;
						bytes = $temp$bytes;
						offset = $temp$offset;
						matrix = $temp$matrix;
						continue addDataModule;
					} else {
						if (row < 0) {
							var $temp$placement = _Utils_update(
								placement,
								{c5: col - 2, O: true, bd: false, ao: 0}),
								$temp$bytes = bytes,
								$temp$offset = offset,
								$temp$matrix = matrix;
							placement = $temp$placement;
							bytes = $temp$bytes;
							offset = $temp$offset;
							matrix = $temp$matrix;
							continue addDataModule;
						} else {
							if (_Utils_cmp(row, size) > -1) {
								var $temp$placement = _Utils_update(
									placement,
									{c5: col - 2, O: true, bd: true, ao: size - 1}),
									$temp$bytes = bytes,
									$temp$offset = offset,
									$temp$matrix = matrix;
								placement = $temp$placement;
								bytes = $temp$bytes;
								offset = $temp$offset;
								matrix = $temp$matrix;
								continue addDataModule;
							} else {
								if (A4($pablohirafuji$elm_qrcode$QRCode$Matrix$isOccupy, row, col, size, matrix)) {
									var $temp$placement = $pablohirafuji$elm_qrcode$QRCode$Matrix$nextModule(placement),
										$temp$bytes = bytes,
										$temp$offset = offset,
										$temp$matrix = matrix;
									placement = $temp$placement;
									bytes = $temp$bytes;
									offset = $temp$offset;
									matrix = $temp$matrix;
									continue addDataModule;
								} else {
									var $temp$placement = $pablohirafuji$elm_qrcode$QRCode$Matrix$nextModule(placement),
										$temp$bytes = bytes,
										$temp$offset = offset + 1,
										$temp$matrix = A4($pablohirafuji$elm_qrcode$QRCode$Matrix$setDataModule, placement, head, offset, matrix);
									placement = $temp$placement;
									bytes = $temp$bytes;
									offset = $temp$offset;
									matrix = $temp$matrix;
									continue addDataModule;
								}
							}
						}
					}
				}
			}
		}
	});
var $pablohirafuji$elm_qrcode$QRCode$Matrix$initPlacement = function (size) {
	return {c5: size + 1, O: true, bd: true, ao: size + 1, ea: size};
};
var $pablohirafuji$elm_qrcode$QRCode$Matrix$addData = F3(
	function (size, bytes, matrix) {
		return A4(
			$pablohirafuji$elm_qrcode$QRCode$Matrix$addDataModule,
			$pablohirafuji$elm_qrcode$QRCode$Matrix$initPlacement(size),
			bytes,
			0,
			matrix);
	});
var $pablohirafuji$elm_qrcode$QRCode$Error$AlignmentPatternNotFound = {$: 0};
var $elm$core$Array$fromListHelp = F3(
	function (list, nodeList, nodeListSize) {
		fromListHelp:
		while (true) {
			var _v0 = A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, list);
			var jsArray = _v0.a;
			var remainingItems = _v0.b;
			if (_Utils_cmp(
				$elm$core$Elm$JsArray$length(jsArray),
				$elm$core$Array$branchFactor) < 0) {
				return A2(
					$elm$core$Array$builderToArray,
					true,
					{q: nodeList, m: nodeListSize, p: jsArray});
			} else {
				var $temp$list = remainingItems,
					$temp$nodeList = A2(
					$elm$core$List$cons,
					$elm$core$Array$Leaf(jsArray),
					nodeList),
					$temp$nodeListSize = nodeListSize + 1;
				list = $temp$list;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue fromListHelp;
			}
		}
	});
var $elm$core$Array$fromList = function (list) {
	if (!list.b) {
		return $elm$core$Array$empty;
	} else {
		return A3($elm$core$Array$fromListHelp, list, _List_Nil, 0);
	}
};
var $pablohirafuji$elm_qrcode$QRCode$Matrix$alignmentPatternData = $elm$core$Array$fromList(
	_List_fromArray(
		[
			_List_Nil,
			_List_fromArray(
			[6, 18]),
			_List_fromArray(
			[6, 22]),
			_List_fromArray(
			[6, 26]),
			_List_fromArray(
			[6, 30]),
			_List_fromArray(
			[6, 34]),
			_List_fromArray(
			[6, 22, 38]),
			_List_fromArray(
			[6, 24, 42]),
			_List_fromArray(
			[6, 26, 46]),
			_List_fromArray(
			[6, 28, 50]),
			_List_fromArray(
			[6, 30, 54]),
			_List_fromArray(
			[6, 32, 58]),
			_List_fromArray(
			[6, 34, 62]),
			_List_fromArray(
			[6, 26, 46, 66]),
			_List_fromArray(
			[6, 26, 48, 70]),
			_List_fromArray(
			[6, 26, 50, 74]),
			_List_fromArray(
			[6, 30, 54, 78]),
			_List_fromArray(
			[6, 30, 56, 82]),
			_List_fromArray(
			[6, 30, 58, 86]),
			_List_fromArray(
			[6, 34, 62, 90]),
			_List_fromArray(
			[6, 28, 50, 72, 94]),
			_List_fromArray(
			[6, 26, 50, 74, 98]),
			_List_fromArray(
			[6, 30, 54, 78, 102]),
			_List_fromArray(
			[6, 28, 54, 80, 106]),
			_List_fromArray(
			[6, 32, 58, 84, 110]),
			_List_fromArray(
			[6, 30, 58, 86, 114]),
			_List_fromArray(
			[6, 34, 62, 90, 118]),
			_List_fromArray(
			[6, 26, 50, 74, 98, 122]),
			_List_fromArray(
			[6, 30, 54, 78, 102, 126]),
			_List_fromArray(
			[6, 26, 52, 78, 104, 130]),
			_List_fromArray(
			[6, 30, 56, 82, 108, 134]),
			_List_fromArray(
			[6, 34, 60, 86, 112, 138]),
			_List_fromArray(
			[6, 30, 58, 86, 114, 142]),
			_List_fromArray(
			[6, 34, 62, 90, 118, 146]),
			_List_fromArray(
			[6, 30, 54, 78, 102, 126, 150]),
			_List_fromArray(
			[6, 24, 50, 76, 102, 128, 154]),
			_List_fromArray(
			[6, 28, 54, 80, 106, 132, 158]),
			_List_fromArray(
			[6, 32, 58, 84, 110, 136, 162]),
			_List_fromArray(
			[6, 26, 54, 82, 110, 138, 166]),
			_List_fromArray(
			[6, 30, 58, 86, 114, 142, 170])
		]));
var $elm$core$Result$fromMaybe = F2(
	function (err, maybe) {
		if (!maybe.$) {
			var v = maybe.a;
			return $elm$core$Result$Ok(v);
		} else {
			return $elm$core$Result$Err(err);
		}
	});
var $elm$core$List$filter = F2(
	function (isGood, list) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, xs) {
					return isGood(x) ? A2($elm$core$List$cons, x, xs) : xs;
				}),
			_List_Nil,
			list);
	});
var $pablohirafuji$elm_qrcode$QRCode$Matrix$getAreaCoord = F2(
	function (rows, cols) {
		return A3(
			$elm$core$List$foldl,
			F2(
				function (row, list) {
					return A3(
						$elm$core$List$foldl,
						F2(
							function (col, list_) {
								return A2(
									$elm$core$List$cons,
									_Utils_Tuple2(row, col),
									list_);
							}),
						list,
						cols);
				}),
			_List_Nil,
			rows);
	});
var $pablohirafuji$elm_qrcode$QRCode$Matrix$isValidAlign = F2(
	function (size, _v0) {
		var row = _v0.a;
		var col = _v0.b;
		return ((row > 10) || ((10 < col) && (_Utils_cmp(col, size - 10) < 0))) && ((_Utils_cmp(row, size - 10) < 0) || (col > 10));
	});
var $pablohirafuji$elm_qrcode$QRCode$Matrix$alignmentRange = A2($elm$core$List$range, -2, 2);
var $pablohirafuji$elm_qrcode$QRCode$Matrix$alignmentColor = F2(
	function (row, col) {
		return (_Utils_eq(row, -2) || ((row === 2) || (_Utils_eq(col, -2) || ((col === 2) || ((!row) && (!col)))))) ? $elm$core$Maybe$Just(
			_Utils_Tuple2(true, true)) : $elm$core$Maybe$Just(
			_Utils_Tuple2(true, false));
	});
var $pablohirafuji$elm_qrcode$QRCode$Matrix$setAlignModule = F4(
	function (size, rowPos, colPos, _v0) {
		var row = _v0.a;
		var col = _v0.b;
		return A2(
			$elm$core$Array$set,
			A3($pablohirafuji$elm_qrcode$QRCode$Matrix$getIndex, size, row + rowPos, col + colPos),
			A2($pablohirafuji$elm_qrcode$QRCode$Matrix$alignmentColor, row, col));
	});
var $pablohirafuji$elm_qrcode$QRCode$Matrix$setAlignment = F3(
	function (size, _v0, matrix) {
		var row = _v0.a;
		var col = _v0.b;
		return A3(
			$elm$core$List$foldl,
			A3($pablohirafuji$elm_qrcode$QRCode$Matrix$setAlignModule, size, row, col),
			matrix,
			A2($pablohirafuji$elm_qrcode$QRCode$Matrix$getAreaCoord, $pablohirafuji$elm_qrcode$QRCode$Matrix$alignmentRange, $pablohirafuji$elm_qrcode$QRCode$Matrix$alignmentRange));
	});
var $pablohirafuji$elm_qrcode$QRCode$Matrix$setAlignments = F3(
	function (size, locations, matrix) {
		return A3(
			$elm$core$List$foldl,
			$pablohirafuji$elm_qrcode$QRCode$Matrix$setAlignment(size),
			matrix,
			A2(
				$elm$core$List$filter,
				$pablohirafuji$elm_qrcode$QRCode$Matrix$isValidAlign(size),
				A2($pablohirafuji$elm_qrcode$QRCode$Matrix$getAreaCoord, locations, locations)));
	});
var $pablohirafuji$elm_qrcode$QRCode$Matrix$alignmentPattern = F3(
	function (version, size, matrix) {
		return A2(
			$elm$core$Result$map,
			function (a) {
				return A3($pablohirafuji$elm_qrcode$QRCode$Matrix$setAlignments, size, a, matrix);
			},
			A2(
				$elm$core$Result$fromMaybe,
				$pablohirafuji$elm_qrcode$QRCode$Error$AlignmentPatternNotFound,
				A2($elm$core$Array$get, version - 1, $pablohirafuji$elm_qrcode$QRCode$Matrix$alignmentPatternData)));
	});
var $pablohirafuji$elm_qrcode$QRCode$Matrix$darkModule = F2(
	function (version, size) {
		return A2(
			$elm$core$Array$set,
			A3($pablohirafuji$elm_qrcode$QRCode$Matrix$getIndex, size, (4 * version) + 9, 8),
			$elm$core$Maybe$Just(
				_Utils_Tuple2(true, true)));
	});
var $pablohirafuji$elm_qrcode$QRCode$Matrix$finderRange = A2($elm$core$List$range, 0, 8);
var $pablohirafuji$elm_qrcode$QRCode$Matrix$finderColor = F2(
	function (row, col) {
		return ((1 <= row) && ((row <= 7) && ((col === 1) || (col === 7)))) || (((1 <= col) && ((col <= 7) && ((row === 1) || (row === 7)))) || ((3 <= row) && ((row <= 5) && ((3 <= col) && (col <= 5)))));
	});
var $pablohirafuji$elm_qrcode$QRCode$Matrix$setFinder = F5(
	function (size, rowOffset, colOffset, _v0, matrix) {
		var row = _v0.a;
		var col = _v0.b;
		var finalRow = row + rowOffset;
		var finalCol = col + colOffset;
		return ((finalRow < 0) || ((finalCol < 0) || ((_Utils_cmp(finalRow, size) > -1) || (_Utils_cmp(finalCol, size) > -1)))) ? matrix : A3(
			$elm$core$Array$set,
			A3($pablohirafuji$elm_qrcode$QRCode$Matrix$getIndex, size, finalRow, finalCol),
			$elm$core$Maybe$Just(
				_Utils_Tuple2(
					true,
					A2($pablohirafuji$elm_qrcode$QRCode$Matrix$finderColor, row, col))),
			matrix);
	});
var $pablohirafuji$elm_qrcode$QRCode$Matrix$finderPattern = F4(
	function (size, rowOffset, colOffset, matrix) {
		return A3(
			$elm$core$List$foldl,
			A3($pablohirafuji$elm_qrcode$QRCode$Matrix$setFinder, size, rowOffset, colOffset),
			matrix,
			A2($pablohirafuji$elm_qrcode$QRCode$Matrix$getAreaCoord, $pablohirafuji$elm_qrcode$QRCode$Matrix$finderRange, $pablohirafuji$elm_qrcode$QRCode$Matrix$finderRange));
	});
var $pablohirafuji$elm_qrcode$QRCode$Matrix$applyMaskColor = F2(
	function (maybeModule, isChange) {
		if (isChange) {
			if ((!maybeModule.$) && (!maybeModule.a.a)) {
				var _v1 = maybeModule.a;
				var isDark = _v1.b;
				return $elm$core$Maybe$Just(
					_Utils_Tuple2(false, !isDark));
			} else {
				return maybeModule;
			}
		} else {
			return maybeModule;
		}
	});
var $pablohirafuji$elm_qrcode$QRCode$Matrix$getCoord = F2(
	function (size, index) {
		return _Utils_Tuple2(
			(index / size) | 0,
			A2($elm$core$Basics$modBy, size, index));
	});
var $pablohirafuji$elm_qrcode$QRCode$Matrix$applyMaskFunction = F4(
	function (_function, size, index, maybeModule) {
		return A2(
			$pablohirafuji$elm_qrcode$QRCode$Matrix$applyMaskColor,
			maybeModule,
			_function(
				A2($pablohirafuji$elm_qrcode$QRCode$Matrix$getCoord, size, index)));
	});
var $elm$core$Elm$JsArray$foldl = _JsArray_foldl;
var $elm$core$Elm$JsArray$indexedMap = _JsArray_indexedMap;
var $elm$core$Array$indexedMap = F2(
	function (func, _v0) {
		var len = _v0.a;
		var tree = _v0.c;
		var tail = _v0.d;
		var initialBuilder = {
			q: _List_Nil,
			m: 0,
			p: A3(
				$elm$core$Elm$JsArray$indexedMap,
				func,
				$elm$core$Array$tailIndex(len),
				tail)
		};
		var helper = F2(
			function (node, builder) {
				if (!node.$) {
					var subTree = node.a;
					return A3($elm$core$Elm$JsArray$foldl, helper, builder, subTree);
				} else {
					var leaf = node.a;
					var offset = builder.m * $elm$core$Array$branchFactor;
					var mappedLeaf = $elm$core$Array$Leaf(
						A3($elm$core$Elm$JsArray$indexedMap, func, offset, leaf));
					return {
						q: A2($elm$core$List$cons, mappedLeaf, builder.q),
						m: builder.m + 1,
						p: builder.p
					};
				}
			});
		return A2(
			$elm$core$Array$builderToArray,
			true,
			A3($elm$core$Elm$JsArray$foldl, helper, initialBuilder, tree));
	});
var $pablohirafuji$elm_qrcode$QRCode$Matrix$maskFunction = function (mask) {
	switch (mask) {
		case 0:
			return function (_v1) {
				var row = _v1.a;
				var col = _v1.b;
				return !A2($elm$core$Basics$modBy, 2, row + col);
			};
		case 1:
			return function (_v2) {
				var row = _v2.a;
				return !A2($elm$core$Basics$modBy, 2, row);
			};
		case 2:
			return function (_v3) {
				var col = _v3.b;
				return !A2($elm$core$Basics$modBy, 3, col);
			};
		case 3:
			return function (_v4) {
				var row = _v4.a;
				var col = _v4.b;
				return !A2($elm$core$Basics$modBy, 3, row + col);
			};
		case 4:
			return function (_v5) {
				var row = _v5.a;
				var col = _v5.b;
				return !A2(
					$elm$core$Basics$modBy,
					2,
					$elm$core$Basics$floor(row / 2) + $elm$core$Basics$floor(col / 3));
			};
		case 5:
			return function (_v6) {
				var row = _v6.a;
				var col = _v6.b;
				return !(A2($elm$core$Basics$modBy, 2, row * col) + A2($elm$core$Basics$modBy, 3, row * col));
			};
		case 6:
			return function (_v7) {
				var row = _v7.a;
				var col = _v7.b;
				return !A2(
					$elm$core$Basics$modBy,
					2,
					A2($elm$core$Basics$modBy, 2, row * col) + A2($elm$core$Basics$modBy, 3, row * col));
			};
		default:
			return function (_v8) {
				var row = _v8.a;
				var col = _v8.b;
				return !A2(
					$elm$core$Basics$modBy,
					2,
					A2($elm$core$Basics$modBy, 3, row * col) + A2($elm$core$Basics$modBy, 2, row + col));
			};
	}
};
var $pablohirafuji$elm_qrcode$QRCode$Matrix$applyMask = F3(
	function (size, mask, matrix) {
		return A2(
			$elm$core$Array$indexedMap,
			A2(
				$pablohirafuji$elm_qrcode$QRCode$Matrix$applyMaskFunction,
				$pablohirafuji$elm_qrcode$QRCode$Matrix$maskFunction(mask),
				size),
			matrix);
	});
var $pablohirafuji$elm_qrcode$QRCode$Matrix$breakList = F3(
	function (width, list, acc) {
		breakList:
		while (true) {
			if (!list.b) {
				return $elm$core$List$reverse(acc);
			} else {
				var $temp$width = width,
					$temp$list = A2($elm$core$List$drop, width, list),
					$temp$acc = A2(
					$elm$core$List$cons,
					A2($elm$core$List$take, width, list),
					acc);
				width = $temp$width;
				list = $temp$list;
				acc = $temp$acc;
				continue breakList;
			}
		}
	});
var $elm$core$Tuple$second = function (_v0) {
	var y = _v0.b;
	return y;
};
var $pablohirafuji$elm_qrcode$QRCode$Matrix$isDarkModule = A2(
	$elm$core$Basics$composeR,
	$elm$core$Maybe$map($elm$core$Tuple$second),
	$elm$core$Maybe$withDefault(false));
var $pablohirafuji$elm_qrcode$QRCode$Matrix$rule1Score_ = F2(
	function (simplifiedList, _v0) {
		rule1Score_:
		while (true) {
			var last = _v0.a;
			var partialScore = _v0.b;
			var score = _v0.c;
			if (!simplifiedList.b) {
				return (partialScore >= 5) ? ((score + partialScore) - 2) : score;
			} else {
				var head = simplifiedList.a;
				var tail = simplifiedList.b;
				if (_Utils_eq(last, head)) {
					var $temp$simplifiedList = tail,
						$temp$_v0 = _Utils_Tuple3(last, partialScore + 1, score);
					simplifiedList = $temp$simplifiedList;
					_v0 = $temp$_v0;
					continue rule1Score_;
				} else {
					if (partialScore >= 5) {
						var $temp$simplifiedList = tail,
							$temp$_v0 = _Utils_Tuple3(head, 0, (score + partialScore) - 2);
						simplifiedList = $temp$simplifiedList;
						_v0 = $temp$_v0;
						continue rule1Score_;
					} else {
						var $temp$simplifiedList = tail,
							$temp$_v0 = _Utils_Tuple3(head, 0, score);
						simplifiedList = $temp$simplifiedList;
						_v0 = $temp$_v0;
						continue rule1Score_;
					}
				}
			}
		}
	});
var $pablohirafuji$elm_qrcode$QRCode$Matrix$rule1Score = A2(
	$elm$core$Basics$composeR,
	$elm$core$List$map(
		function (a) {
			return A2(
				$pablohirafuji$elm_qrcode$QRCode$Matrix$rule1Score_,
				a,
				_Utils_Tuple3(false, 0, 0));
		}),
	$elm$core$List$sum);
var $pablohirafuji$elm_qrcode$QRCode$Matrix$rule2Score_ = F4(
	function (row1, row2, maybeLast, score) {
		rule2Score_:
		while (true) {
			if (!row1.b) {
				return score;
			} else {
				var head = row1.a;
				var tail = row1.b;
				if (!row2.b) {
					return score;
				} else {
					var head2 = row2.a;
					var tail2 = row2.b;
					if (_Utils_eq(head, head2)) {
						if (_Utils_eq(
							$elm$core$Maybe$Just(head),
							maybeLast)) {
							var $temp$row1 = tail,
								$temp$row2 = tail2,
								$temp$maybeLast = $elm$core$Maybe$Just(head),
								$temp$score = score + 3;
							row1 = $temp$row1;
							row2 = $temp$row2;
							maybeLast = $temp$maybeLast;
							score = $temp$score;
							continue rule2Score_;
						} else {
							var $temp$row1 = tail,
								$temp$row2 = tail2,
								$temp$maybeLast = $elm$core$Maybe$Just(head),
								$temp$score = score;
							row1 = $temp$row1;
							row2 = $temp$row2;
							maybeLast = $temp$maybeLast;
							score = $temp$score;
							continue rule2Score_;
						}
					} else {
						var $temp$row1 = tail,
							$temp$row2 = tail2,
							$temp$maybeLast = $elm$core$Maybe$Nothing,
							$temp$score = score;
						row1 = $temp$row1;
						row2 = $temp$row2;
						maybeLast = $temp$maybeLast;
						score = $temp$score;
						continue rule2Score_;
					}
				}
			}
		}
	});
var $pablohirafuji$elm_qrcode$QRCode$Matrix$rule2Score = F2(
	function (list, score) {
		rule2Score:
		while (true) {
			if (list.b && list.b.b) {
				var head1 = list.a;
				var _v1 = list.b;
				var head2 = _v1.a;
				var tail = _v1.b;
				var $temp$list = tail,
					$temp$score = score + A4($pablohirafuji$elm_qrcode$QRCode$Matrix$rule2Score_, head1, head2, $elm$core$Maybe$Nothing, 0);
				list = $temp$list;
				score = $temp$score;
				continue rule2Score;
			} else {
				return score;
			}
		}
	});
var $pablohirafuji$elm_qrcode$QRCode$Matrix$rule3Score_ = F2(
	function (simplifiedList, score) {
		rule3Score_:
		while (true) {
			_v0$3:
			while (true) {
				if (!simplifiedList.b) {
					return score;
				} else {
					if (!simplifiedList.a) {
						if (((((((((((((((((((simplifiedList.b.b && (!simplifiedList.b.a)) && simplifiedList.b.b.b) && (!simplifiedList.b.b.a)) && simplifiedList.b.b.b.b) && (!simplifiedList.b.b.b.a)) && simplifiedList.b.b.b.b.b) && simplifiedList.b.b.b.b.a) && simplifiedList.b.b.b.b.b.b) && (!simplifiedList.b.b.b.b.b.a)) && simplifiedList.b.b.b.b.b.b.b) && simplifiedList.b.b.b.b.b.b.a) && simplifiedList.b.b.b.b.b.b.b.b) && simplifiedList.b.b.b.b.b.b.b.a) && simplifiedList.b.b.b.b.b.b.b.b.b) && simplifiedList.b.b.b.b.b.b.b.b.a) && simplifiedList.b.b.b.b.b.b.b.b.b.b) && (!simplifiedList.b.b.b.b.b.b.b.b.b.a)) && simplifiedList.b.b.b.b.b.b.b.b.b.b.b) && simplifiedList.b.b.b.b.b.b.b.b.b.b.a) {
							var _v1 = simplifiedList.b;
							var _v2 = _v1.b;
							var _v3 = _v2.b;
							var _v4 = _v3.b;
							var _v5 = _v4.b;
							var _v6 = _v5.b;
							var _v7 = _v6.b;
							var _v8 = _v7.b;
							var _v9 = _v8.b;
							var _v10 = _v9.b;
							var tail = _v10.b;
							var $temp$simplifiedList = tail,
								$temp$score = score + 40;
							simplifiedList = $temp$simplifiedList;
							score = $temp$score;
							continue rule3Score_;
						} else {
							break _v0$3;
						}
					} else {
						if (((((((((((((((((((simplifiedList.b.b && (!simplifiedList.b.a)) && simplifiedList.b.b.b) && simplifiedList.b.b.a) && simplifiedList.b.b.b.b) && simplifiedList.b.b.b.a) && simplifiedList.b.b.b.b.b) && simplifiedList.b.b.b.b.a) && simplifiedList.b.b.b.b.b.b) && (!simplifiedList.b.b.b.b.b.a)) && simplifiedList.b.b.b.b.b.b.b) && simplifiedList.b.b.b.b.b.b.a) && simplifiedList.b.b.b.b.b.b.b.b) && (!simplifiedList.b.b.b.b.b.b.b.a)) && simplifiedList.b.b.b.b.b.b.b.b.b) && (!simplifiedList.b.b.b.b.b.b.b.b.a)) && simplifiedList.b.b.b.b.b.b.b.b.b.b) && (!simplifiedList.b.b.b.b.b.b.b.b.b.a)) && simplifiedList.b.b.b.b.b.b.b.b.b.b.b) && (!simplifiedList.b.b.b.b.b.b.b.b.b.b.a)) {
							var _v11 = simplifiedList.b;
							var _v12 = _v11.b;
							var _v13 = _v12.b;
							var _v14 = _v13.b;
							var _v15 = _v14.b;
							var _v16 = _v15.b;
							var _v17 = _v16.b;
							var _v18 = _v17.b;
							var _v19 = _v18.b;
							var _v20 = _v19.b;
							var tail = _v20.b;
							var $temp$simplifiedList = tail,
								$temp$score = score + 40;
							simplifiedList = $temp$simplifiedList;
							score = $temp$score;
							continue rule3Score_;
						} else {
							break _v0$3;
						}
					}
				}
			}
			var head = simplifiedList.a;
			var tail = simplifiedList.b;
			var $temp$simplifiedList = tail,
				$temp$score = score;
			simplifiedList = $temp$simplifiedList;
			score = $temp$score;
			continue rule3Score_;
		}
	});
var $pablohirafuji$elm_qrcode$QRCode$Matrix$rule3Score = A2($elm$core$List$foldl, $pablohirafuji$elm_qrcode$QRCode$Matrix$rule3Score_, 0);
var $pablohirafuji$elm_qrcode$QRCode$Matrix$rule4Score = F2(
	function (size, simplifiedList) {
		var moduleCount = size * size;
		var darkCount = $elm$core$List$length(
			A2($elm$core$List$filter, $elm$core$Basics$identity, simplifiedList));
		var darkPerc = $elm$core$Basics$round((100 * darkCount) / moduleCount);
		var remOf5 = darkPerc % 5;
		var nextMult5 = $elm$core$Basics$round(
			$elm$core$Basics$abs((darkPerc + (5 - remOf5)) - 50) / 5);
		var prevMult5 = $elm$core$Basics$round(
			$elm$core$Basics$abs((darkPerc - remOf5) - 50) / 5);
		return A2($elm$core$Basics$min, prevMult5, nextMult5) * 10;
	});
var $pablohirafuji$elm_qrcode$QRCode$Helpers$transpose = function (ll) {
	transpose:
	while (true) {
		if (!ll.b) {
			return _List_Nil;
		} else {
			if (!ll.a.b) {
				var xss = ll.b;
				var $temp$ll = xss;
				ll = $temp$ll;
				continue transpose;
			} else {
				var _v1 = ll.a;
				var x = _v1.a;
				var xs = _v1.b;
				var xss = ll.b;
				var tails = A2($elm$core$List$filterMap, $elm$core$List$tail, xss);
				var heads = A2($elm$core$List$filterMap, $elm$core$List$head, xss);
				return A2(
					$elm$core$List$cons,
					A2($elm$core$List$cons, x, heads),
					$pablohirafuji$elm_qrcode$QRCode$Helpers$transpose(
						A2($elm$core$List$cons, xs, tails)));
			}
		}
	}
};
var $pablohirafuji$elm_qrcode$QRCode$Matrix$getMaskScore = F2(
	function (size, matrix) {
		var list = A2(
			$elm$core$List$map,
			$pablohirafuji$elm_qrcode$QRCode$Matrix$isDarkModule,
			$elm$core$Array$toList(matrix));
		var rowList = A3($pablohirafuji$elm_qrcode$QRCode$Matrix$breakList, size, list, _List_Nil);
		var transposedRowList = $pablohirafuji$elm_qrcode$QRCode$Helpers$transpose(rowList);
		return function (b) {
			return _Utils_Tuple2(rowList, b);
		}(
			A2($pablohirafuji$elm_qrcode$QRCode$Matrix$rule4Score, size, list) + ($pablohirafuji$elm_qrcode$QRCode$Matrix$rule3Score(transposedRowList) + ($pablohirafuji$elm_qrcode$QRCode$Matrix$rule3Score(rowList) + (A2($pablohirafuji$elm_qrcode$QRCode$Matrix$rule2Score, rowList, 0) + ($pablohirafuji$elm_qrcode$QRCode$Matrix$rule1Score(transposedRowList) + $pablohirafuji$elm_qrcode$QRCode$Matrix$rule1Score(rowList))))));
	});
var $pablohirafuji$elm_qrcode$QRCode$Matrix$ecLevelToInt = function (ecLevel) {
	switch (ecLevel) {
		case 0:
			return 1;
		case 1:
			return 0;
		case 2:
			return 3;
		default:
			return 2;
	}
};
var $pablohirafuji$elm_qrcode$QRCode$Matrix$getBCHDigit = function (_int) {
	var helper = F2(
		function (digit, int_) {
			helper:
			while (true) {
				if (!(!int_)) {
					var $temp$digit = digit + 1,
						$temp$int_ = int_ >>> 1;
					digit = $temp$digit;
					int_ = $temp$int_;
					continue helper;
				} else {
					return digit;
				}
			}
		});
	return A2(helper, 0, _int);
};
var $pablohirafuji$elm_qrcode$QRCode$Matrix$maskToInt = function (mask) {
	switch (mask) {
		case 0:
			return 0;
		case 1:
			return 1;
		case 2:
			return 2;
		case 3:
			return 3;
		case 4:
			return 4;
		case 5:
			return 5;
		case 6:
			return 6;
		default:
			return 7;
	}
};
var $pablohirafuji$elm_qrcode$QRCode$Matrix$encodeFormatInfo = F2(
	function (ecLevel, mask) {
		var g15Mask = 21522;
		var g15Int = 1335;
		var g15Digit = $pablohirafuji$elm_qrcode$QRCode$Matrix$getBCHDigit(g15Int);
		var formatInfoInt = $pablohirafuji$elm_qrcode$QRCode$Matrix$maskToInt(mask) | ($pablohirafuji$elm_qrcode$QRCode$Matrix$ecLevelToInt(ecLevel) << 3);
		var helper = function (d_) {
			helper:
			while (true) {
				if (($pablohirafuji$elm_qrcode$QRCode$Matrix$getBCHDigit(d_) - g15Digit) >= 0) {
					var $temp$d_ = d_ ^ (g15Int << ($pablohirafuji$elm_qrcode$QRCode$Matrix$getBCHDigit(d_) - g15Digit));
					d_ = $temp$d_;
					continue helper;
				} else {
					return g15Mask ^ (d_ | (formatInfoInt << 10));
				}
			}
		};
		var d = formatInfoInt << 10;
		return helper(d);
	});
var $pablohirafuji$elm_qrcode$QRCode$Matrix$formatInfoHorizontal = F2(
	function (size, count) {
		return (count < 8) ? _Utils_Tuple2(8, (size - count) - 1) : ((count < 9) ? _Utils_Tuple2(8, 15 - count) : _Utils_Tuple2(8, (15 - count) - 1));
	});
var $pablohirafuji$elm_qrcode$QRCode$Matrix$formatInfoVertical = F2(
	function (size, count) {
		return (count < 6) ? _Utils_Tuple2(count, 8) : ((count < 8) ? _Utils_Tuple2(count + 1, 8) : _Utils_Tuple2((size - 15) + count, 8));
	});
var $pablohirafuji$elm_qrcode$QRCode$Matrix$setFormatModule = F4(
	function (size, isBlack, row, col) {
		return A2(
			$elm$core$Array$set,
			A3($pablohirafuji$elm_qrcode$QRCode$Matrix$getIndex, size, row, col),
			$elm$core$Maybe$Just(
				_Utils_Tuple2(true, isBlack)));
	});
var $pablohirafuji$elm_qrcode$QRCode$Matrix$setFormatInfo_ = F4(
	function (size, isBlackFn, count, matrix) {
		setFormatInfo_:
		while (true) {
			if (count < 15) {
				var isBlack = isBlackFn(count);
				var _v0 = A2($pablohirafuji$elm_qrcode$QRCode$Matrix$formatInfoVertical, size, count);
				var x2 = _v0.a;
				var y2 = _v0.b;
				var _v1 = A2($pablohirafuji$elm_qrcode$QRCode$Matrix$formatInfoHorizontal, size, count);
				var x1 = _v1.a;
				var y1 = _v1.b;
				var $temp$size = size,
					$temp$isBlackFn = isBlackFn,
					$temp$count = count + 1,
					$temp$matrix = A5(
					$pablohirafuji$elm_qrcode$QRCode$Matrix$setFormatModule,
					size,
					isBlack,
					x2,
					y2,
					A5($pablohirafuji$elm_qrcode$QRCode$Matrix$setFormatModule, size, isBlack, x1, y1, matrix));
				size = $temp$size;
				isBlackFn = $temp$isBlackFn;
				count = $temp$count;
				matrix = $temp$matrix;
				continue setFormatInfo_;
			} else {
				return matrix;
			}
		}
	});
var $pablohirafuji$elm_qrcode$QRCode$Matrix$setFormatInfo = F4(
	function (ecLevel, size, mask, matrix) {
		var isBlack = F2(
			function (bits_, count) {
				return (1 & (bits_ >> count)) === 1;
			});
		var bits = A2($pablohirafuji$elm_qrcode$QRCode$Matrix$encodeFormatInfo, ecLevel, mask);
		return A4(
			$pablohirafuji$elm_qrcode$QRCode$Matrix$setFormatInfo_,
			size,
			isBlack(bits),
			0,
			matrix);
	});
var $pablohirafuji$elm_qrcode$QRCode$Matrix$getBestMask_ = F5(
	function (ecLevel, size, matrix, mask, _v0) {
		var minSMatrix = _v0.a;
		var minScore = _v0.b;
		var maskedMatrix = A4(
			$pablohirafuji$elm_qrcode$QRCode$Matrix$setFormatInfo,
			ecLevel,
			size,
			mask,
			A3($pablohirafuji$elm_qrcode$QRCode$Matrix$applyMask, size, mask, matrix));
		var _v1 = A2($pablohirafuji$elm_qrcode$QRCode$Matrix$getMaskScore, size, maskedMatrix);
		var maskSMatrix = _v1.a;
		var maskScore = _v1.b;
		return ((_Utils_cmp(minScore, maskScore) < 0) && (!_Utils_eq(minScore, -1))) ? _Utils_Tuple2(minSMatrix, minScore) : _Utils_Tuple2(maskSMatrix, maskScore);
	});
var $pablohirafuji$elm_qrcode$QRCode$Matrix$Pattern0 = 0;
var $pablohirafuji$elm_qrcode$QRCode$Matrix$Pattern1 = 1;
var $pablohirafuji$elm_qrcode$QRCode$Matrix$Pattern2 = 2;
var $pablohirafuji$elm_qrcode$QRCode$Matrix$Pattern3 = 3;
var $pablohirafuji$elm_qrcode$QRCode$Matrix$Pattern4 = 4;
var $pablohirafuji$elm_qrcode$QRCode$Matrix$Pattern5 = 5;
var $pablohirafuji$elm_qrcode$QRCode$Matrix$Pattern6 = 6;
var $pablohirafuji$elm_qrcode$QRCode$Matrix$Pattern7 = 7;
var $pablohirafuji$elm_qrcode$QRCode$Matrix$patternList = _List_fromArray(
	[0, 1, 2, 3, 4, 5, 6, 7]);
var $pablohirafuji$elm_qrcode$QRCode$Matrix$getBestMask = F3(
	function (ecLevel, size, matrix) {
		return A3(
			$elm$core$List$foldl,
			A3($pablohirafuji$elm_qrcode$QRCode$Matrix$getBestMask_, ecLevel, size, matrix),
			_Utils_Tuple2(_List_Nil, -1),
			$pablohirafuji$elm_qrcode$QRCode$Matrix$patternList).a;
	});
var $pablohirafuji$elm_qrcode$QRCode$Matrix$reserveFormatInfo = F2(
	function (size, matrix) {
		return A4(
			$pablohirafuji$elm_qrcode$QRCode$Matrix$setFormatInfo_,
			size,
			$elm$core$Basics$always(true),
			0,
			matrix);
	});
var $pablohirafuji$elm_qrcode$QRCode$Matrix$encodeVersionInfo = function (version) {
	var g18Int = 7973;
	var g18Digit = $pablohirafuji$elm_qrcode$QRCode$Matrix$getBCHDigit(g18Int);
	var helper = function (d_) {
		helper:
		while (true) {
			if (($pablohirafuji$elm_qrcode$QRCode$Matrix$getBCHDigit(d_) - g18Digit) >= 0) {
				var $temp$d_ = d_ ^ (g18Int << ($pablohirafuji$elm_qrcode$QRCode$Matrix$getBCHDigit(d_) - g18Digit));
				d_ = $temp$d_;
				continue helper;
			} else {
				return d_ | (version << 12);
			}
		}
	};
	var d = version << 12;
	return helper(d);
};
var $pablohirafuji$elm_qrcode$QRCode$Matrix$setVersionModule = F3(
	function (size, isBlack, _v0) {
		var row = _v0.a;
		var col = _v0.b;
		return A2(
			$elm$core$Array$set,
			A3($pablohirafuji$elm_qrcode$QRCode$Matrix$getIndex, size, row, col),
			$elm$core$Maybe$Just(
				_Utils_Tuple2(true, isBlack)));
	});
var $pablohirafuji$elm_qrcode$QRCode$Matrix$setVersionInfo_ = F4(
	function (size, isBlackFn, count, matrix) {
		setVersionInfo_:
		while (true) {
			if (count < 18) {
				var topRight = _Utils_Tuple2(
					$elm$core$Basics$floor(count / 3),
					((A2($elm$core$Basics$modBy, 3, count) + size) - 8) - 3);
				var isBlack = isBlackFn(count);
				var bottomLeft = _Utils_Tuple2(
					((A2($elm$core$Basics$modBy, 3, count) + size) - 8) - 3,
					$elm$core$Basics$floor(count / 3));
				var $temp$size = size,
					$temp$isBlackFn = isBlackFn,
					$temp$count = count + 1,
					$temp$matrix = A4(
					$pablohirafuji$elm_qrcode$QRCode$Matrix$setVersionModule,
					size,
					isBlack,
					bottomLeft,
					A4($pablohirafuji$elm_qrcode$QRCode$Matrix$setVersionModule, size, isBlack, topRight, matrix));
				size = $temp$size;
				isBlackFn = $temp$isBlackFn;
				count = $temp$count;
				matrix = $temp$matrix;
				continue setVersionInfo_;
			} else {
				return matrix;
			}
		}
	});
var $pablohirafuji$elm_qrcode$QRCode$Matrix$setVersionInfo = F3(
	function (version, size, matrix) {
		if (version >= 7) {
			var isBlack = F2(
				function (bits_, count) {
					return (1 & (bits_ >> count)) === 1;
				});
			var bits = $pablohirafuji$elm_qrcode$QRCode$Matrix$encodeVersionInfo(version);
			return A4(
				$pablohirafuji$elm_qrcode$QRCode$Matrix$setVersionInfo_,
				size,
				isBlack(bits),
				0,
				matrix);
		} else {
			return matrix;
		}
	});
var $pablohirafuji$elm_qrcode$QRCode$Matrix$timingColor = F2(
	function (row, col) {
		return (!A2($elm$core$Basics$modBy, 2, row + col)) ? $elm$core$Maybe$Just(
			_Utils_Tuple2(true, true)) : $elm$core$Maybe$Just(
			_Utils_Tuple2(true, false));
	});
var $pablohirafuji$elm_qrcode$QRCode$Matrix$setTiming = F3(
	function (size, row, col) {
		return A2(
			$elm$core$Array$set,
			A3($pablohirafuji$elm_qrcode$QRCode$Matrix$getIndex, size, row, col),
			A2($pablohirafuji$elm_qrcode$QRCode$Matrix$timingColor, row, col));
	});
var $pablohirafuji$elm_qrcode$QRCode$Matrix$timingPattern = F2(
	function (size, matrix) {
		var range = A2($elm$core$List$range, 8, size - 9);
		return A3(
			$elm$core$List$foldl,
			function (b) {
				return A3($pablohirafuji$elm_qrcode$QRCode$Matrix$setTiming, size, b, 6);
			},
			A3(
				$elm$core$List$foldl,
				A2($pablohirafuji$elm_qrcode$QRCode$Matrix$setTiming, size, 6),
				matrix,
				range),
			range);
	});
var $pablohirafuji$elm_qrcode$QRCode$Matrix$apply = function (_v0) {
	var ecLevel = _v0.a.de;
	var groupInfo = _v0.a.e4;
	var bytes = _v0.b;
	var version = groupInfo.cN;
	var size = ((version - 1) * 4) + 21;
	return A2(
		$elm$core$Result$map,
		A2($pablohirafuji$elm_qrcode$QRCode$Matrix$getBestMask, ecLevel, size),
		A2(
			$elm$core$Result$map,
			A2($pablohirafuji$elm_qrcode$QRCode$Matrix$addData, size, bytes),
			A3(
				$pablohirafuji$elm_qrcode$QRCode$Matrix$alignmentPattern,
				version,
				size,
				A2(
					$pablohirafuji$elm_qrcode$QRCode$Matrix$timingPattern,
					size,
					A3(
						$pablohirafuji$elm_qrcode$QRCode$Matrix$darkModule,
						version,
						size,
						A3(
							$pablohirafuji$elm_qrcode$QRCode$Matrix$setVersionInfo,
							version,
							size,
							A2(
								$pablohirafuji$elm_qrcode$QRCode$Matrix$reserveFormatInfo,
								size,
								A4(
									$pablohirafuji$elm_qrcode$QRCode$Matrix$finderPattern,
									size,
									-1,
									size - 8,
									A4(
										$pablohirafuji$elm_qrcode$QRCode$Matrix$finderPattern,
										size,
										size - 8,
										-1,
										A4(
											$pablohirafuji$elm_qrcode$QRCode$Matrix$finderPattern,
											size,
											-1,
											-1,
											A2(
												$elm$core$Array$initialize,
												size * size,
												$elm$core$Basics$always($elm$core$Maybe$Nothing))))))))))));
};
var $pablohirafuji$elm_qrcode$QRCode$ECLevel$H = 3;
var $pablohirafuji$elm_qrcode$QRCode$ECLevel$L = 0;
var $pablohirafuji$elm_qrcode$QRCode$ECLevel$M = 1;
var $pablohirafuji$elm_qrcode$QRCode$ECLevel$Q = 2;
var $pablohirafuji$elm_qrcode$QRCode$convertEC = function (ec) {
	switch (ec) {
		case 0:
			return 0;
		case 1:
			return 1;
		case 2:
			return 2;
		default:
			return 3;
	}
};
var $pablohirafuji$elm_qrcode$QRCode$AlignmentPatternNotFound = {$: 0};
var $pablohirafuji$elm_qrcode$QRCode$InputLengthOverflow = {$: 7};
var $pablohirafuji$elm_qrcode$QRCode$InvalidAlphanumericChar = {$: 2};
var $pablohirafuji$elm_qrcode$QRCode$InvalidNumericChar = {$: 1};
var $pablohirafuji$elm_qrcode$QRCode$InvalidUTF8Char = {$: 3};
var $pablohirafuji$elm_qrcode$QRCode$LogTableException = function (a) {
	return {$: 4, a: a};
};
var $pablohirafuji$elm_qrcode$QRCode$PolynomialModException = {$: 6};
var $pablohirafuji$elm_qrcode$QRCode$PolynomialMultiplyException = {$: 5};
var $pablohirafuji$elm_qrcode$QRCode$convertError = function (e) {
	switch (e.$) {
		case 0:
			return $pablohirafuji$elm_qrcode$QRCode$AlignmentPatternNotFound;
		case 1:
			return $pablohirafuji$elm_qrcode$QRCode$InvalidNumericChar;
		case 2:
			return $pablohirafuji$elm_qrcode$QRCode$InvalidAlphanumericChar;
		case 3:
			return $pablohirafuji$elm_qrcode$QRCode$InvalidUTF8Char;
		case 4:
			var n = e.a;
			return $pablohirafuji$elm_qrcode$QRCode$LogTableException(n);
		case 5:
			return $pablohirafuji$elm_qrcode$QRCode$PolynomialMultiplyException;
		case 6:
			return $pablohirafuji$elm_qrcode$QRCode$PolynomialModException;
		default:
			return $pablohirafuji$elm_qrcode$QRCode$InputLengthOverflow;
	}
};
var $pablohirafuji$elm_qrcode$QRCode$Encode$firstFillerByte = 236;
var $elm$core$List$repeatHelp = F3(
	function (result, n, value) {
		repeatHelp:
		while (true) {
			if (n <= 0) {
				return result;
			} else {
				var $temp$result = A2($elm$core$List$cons, value, result),
					$temp$n = n - 1,
					$temp$value = value;
				result = $temp$result;
				n = $temp$n;
				value = $temp$value;
				continue repeatHelp;
			}
		}
	});
var $elm$core$List$repeat = F2(
	function (n, value) {
		return A3($elm$core$List$repeatHelp, _List_Nil, n, value);
	});
var $pablohirafuji$elm_qrcode$QRCode$Encode$secondFillerByte = 17;
var $pablohirafuji$elm_qrcode$QRCode$Encode$addFiller = F2(
	function (capacity, bytes) {
		var fillerLength = ((capacity / 8) | 0) - $elm$core$List$length(bytes);
		var ns = $elm$core$List$concat(
			A2(
				$elm$core$List$repeat,
				(fillerLength / 2) | 0,
				_List_fromArray(
					[$pablohirafuji$elm_qrcode$QRCode$Encode$firstFillerByte, $pablohirafuji$elm_qrcode$QRCode$Encode$secondFillerByte])));
		return (!A2($elm$core$Basics$modBy, 2, fillerLength)) ? _Utils_ap(bytes, ns) : _Utils_ap(
			bytes,
			_Utils_ap(
				ns,
				_List_fromArray(
					[$pablohirafuji$elm_qrcode$QRCode$Encode$firstFillerByte])));
	});
var $pablohirafuji$elm_qrcode$QRCode$Encode$addTerminator = F3(
	function (capacity, bitsCount, bits) {
		return _Utils_ap(
			bits,
			_List_fromArray(
				[
					_Utils_Tuple2(
					0,
					A2($elm$core$Basics$min, 4, capacity - bitsCount))
				]));
	});
var $pablohirafuji$elm_qrcode$QRCode$Encode$bitsToBytes3 = function (_v0) {
	bitsToBytes3:
	while (true) {
		var _v1 = _v0.a;
		var bits = _v1.a;
		var length = _v1.b;
		var bytes = _v0.b;
		if (length >= 8) {
			var remLength = length - 8;
			var remBits = bits & ((1 << remLength) - 1);
			var _byte = bits >> remLength;
			var $temp$_v0 = _Utils_Tuple2(
				_Utils_Tuple2(remBits, remLength),
				A2($elm$core$List$cons, _byte, bytes));
			_v0 = $temp$_v0;
			continue bitsToBytes3;
		} else {
			return _Utils_Tuple2(
				_Utils_Tuple2(bits, length),
				bytes);
		}
	}
};
var $pablohirafuji$elm_qrcode$QRCode$Encode$bitsToBytes2 = F2(
	function (_v0, _v1) {
		var curBits = _v0.a;
		var curLength = _v0.b;
		var _v2 = _v1.a;
		var remBits = _v2.a;
		var remLength = _v2.b;
		var bytes = _v1.b;
		var lengthSum = curLength + remLength;
		var bitsSum = curBits | (remBits << curLength);
		return $pablohirafuji$elm_qrcode$QRCode$Encode$bitsToBytes3(
			_Utils_Tuple2(
				_Utils_Tuple2(bitsSum, lengthSum),
				bytes));
	});
var $pablohirafuji$elm_qrcode$QRCode$Encode$bitsToBytes1 = F2(
	function (bits, _v0) {
		bitsToBytes1:
		while (true) {
			var _v1 = _v0.a;
			var remBits = _v1.a;
			var remLength = _v1.b;
			var bytes = _v0.b;
			if (bits.b) {
				var head = bits.a;
				var tail = bits.b;
				var $temp$bits = tail,
					$temp$_v0 = A2(
					$pablohirafuji$elm_qrcode$QRCode$Encode$bitsToBytes2,
					head,
					_Utils_Tuple2(
						_Utils_Tuple2(remBits, remLength),
						bytes));
				bits = $temp$bits;
				_v0 = $temp$_v0;
				continue bitsToBytes1;
			} else {
				return (!remLength) ? $elm$core$List$reverse(bytes) : $elm$core$List$reverse(
					A2($elm$core$List$cons, remBits << (8 - remLength), bytes));
			}
		}
	});
var $pablohirafuji$elm_qrcode$QRCode$Encode$bitsToBytes = function (bits) {
	return A2(
		$pablohirafuji$elm_qrcode$QRCode$Encode$bitsToBytes1,
		bits,
		_Utils_Tuple2(
			_Utils_Tuple2(0, 0),
			_List_Nil));
};
var $pablohirafuji$elm_qrcode$QRCode$Encode$UTF8 = 3;
var $pablohirafuji$elm_qrcode$QRCode$Encode$charCountIndicatorLength = F2(
	function (mode, version) {
		if (version <= 9) {
			switch (mode) {
				case 0:
					return 10;
				case 1:
					return 9;
				case 2:
					return 8;
				default:
					return 8;
			}
		} else {
			if (version <= 26) {
				switch (mode) {
					case 0:
						return 12;
					case 1:
						return 11;
					case 2:
						return 16;
					default:
						return 16;
				}
			} else {
				switch (mode) {
					case 0:
						return 14;
					case 1:
						return 13;
					case 2:
						return 16;
					default:
						return 16;
				}
			}
		}
	});
var $pablohirafuji$elm_qrcode$QRCode$Encode$charCountIndicator = F2(
	function (_v0, bits) {
		var groupInfo = _v0.e4;
		var inputStr = _v0.cr;
		var mode = _v0.bK;
		var length = A2($pablohirafuji$elm_qrcode$QRCode$Encode$charCountIndicatorLength, mode, groupInfo.cN);
		var charCount = (mode === 3) ? $elm$core$List$length(bits) : $elm$core$String$length(inputStr);
		return _Utils_Tuple2(charCount, length);
	});
var $pablohirafuji$elm_qrcode$QRCode$Encode$modeIndicator = function (mode) {
	switch (mode) {
		case 0:
			return 1;
		case 1:
			return 2;
		case 2:
			return 4;
		default:
			return 4;
	}
};
var $pablohirafuji$elm_qrcode$QRCode$Encode$addInfoAndFinalBits = function (_v0) {
	var bits = _v0.a;
	var model = _v0.b;
	return _Utils_Tuple2(
		model,
		A2(
			$pablohirafuji$elm_qrcode$QRCode$Encode$addFiller,
			model.e4.bv,
			$pablohirafuji$elm_qrcode$QRCode$Encode$bitsToBytes(
				A3(
					$pablohirafuji$elm_qrcode$QRCode$Encode$addTerminator,
					model.e4.bv,
					model.b8,
					A2(
						$elm$core$List$cons,
						_Utils_Tuple2(
							$pablohirafuji$elm_qrcode$QRCode$Encode$modeIndicator(model.bK),
							4),
						A2(
							$elm$core$List$cons,
							A2($pablohirafuji$elm_qrcode$QRCode$Encode$charCountIndicator, model, bits),
							bits))))));
};
var $pablohirafuji$elm_qrcode$QRCode$Encode$concatTranspose = function (_v0) {
	var model = _v0.a;
	var dataBlocks = _v0.b;
	var ecBlocks = _v0.c;
	return _Utils_Tuple2(
		model,
		$elm$core$List$concat(
			_Utils_ap(
				$pablohirafuji$elm_qrcode$QRCode$Helpers$transpose(dataBlocks),
				$pablohirafuji$elm_qrcode$QRCode$Helpers$transpose(ecBlocks))));
};
var $elm_community$list_extra$List$Extra$greedyGroupsOfWithStep = F3(
	function (size, step, list) {
		if ((size <= 0) || (step <= 0)) {
			return _List_Nil;
		} else {
			var go = F2(
				function (xs, acc) {
					go:
					while (true) {
						if ($elm$core$List$isEmpty(xs)) {
							return $elm$core$List$reverse(acc);
						} else {
							var $temp$xs = A2($elm$core$List$drop, step, xs),
								$temp$acc = A2(
								$elm$core$List$cons,
								A2($elm$core$List$take, size, xs),
								acc);
							xs = $temp$xs;
							acc = $temp$acc;
							continue go;
						}
					}
				});
			return A2(go, list, _List_Nil);
		}
	});
var $elm_community$list_extra$List$Extra$greedyGroupsOf = F2(
	function (size, xs) {
		return A3($elm_community$list_extra$List$Extra$greedyGroupsOfWithStep, size, size, xs);
	});
var $elm$core$Result$map2 = F3(
	function (func, ra, rb) {
		if (ra.$ === 1) {
			var x = ra.a;
			return $elm$core$Result$Err(x);
		} else {
			var a = ra.a;
			if (rb.$ === 1) {
				var x = rb.a;
				return $elm$core$Result$Err(x);
			} else {
				var b = rb.a;
				return $elm$core$Result$Ok(
					A2(func, a, b));
			}
		}
	});
var $pablohirafuji$elm_qrcode$QRCode$Error$InvalidAlphanumericChar = {$: 2};
var $pablohirafuji$elm_qrcode$QRCode$Encode$Alphanumeric$alphanumericCodes = $elm$core$Dict$fromList(
	_List_fromArray(
		[
			_Utils_Tuple2('0', 0),
			_Utils_Tuple2('1', 1),
			_Utils_Tuple2('2', 2),
			_Utils_Tuple2('3', 3),
			_Utils_Tuple2('4', 4),
			_Utils_Tuple2('5', 5),
			_Utils_Tuple2('6', 6),
			_Utils_Tuple2('7', 7),
			_Utils_Tuple2('8', 8),
			_Utils_Tuple2('9', 9),
			_Utils_Tuple2('A', 10),
			_Utils_Tuple2('B', 11),
			_Utils_Tuple2('C', 12),
			_Utils_Tuple2('D', 13),
			_Utils_Tuple2('E', 14),
			_Utils_Tuple2('F', 15),
			_Utils_Tuple2('G', 16),
			_Utils_Tuple2('H', 17),
			_Utils_Tuple2('I', 18),
			_Utils_Tuple2('J', 19),
			_Utils_Tuple2('K', 20),
			_Utils_Tuple2('L', 21),
			_Utils_Tuple2('M', 22),
			_Utils_Tuple2('N', 23),
			_Utils_Tuple2('O', 24),
			_Utils_Tuple2('P', 25),
			_Utils_Tuple2('Q', 26),
			_Utils_Tuple2('R', 27),
			_Utils_Tuple2('S', 28),
			_Utils_Tuple2('T', 29),
			_Utils_Tuple2('U', 30),
			_Utils_Tuple2('V', 31),
			_Utils_Tuple2('W', 32),
			_Utils_Tuple2('X', 33),
			_Utils_Tuple2('Y', 34),
			_Utils_Tuple2('Z', 35),
			_Utils_Tuple2(' ', 36),
			_Utils_Tuple2('$', 37),
			_Utils_Tuple2('%', 38),
			_Utils_Tuple2('*', 39),
			_Utils_Tuple2('+', 40),
			_Utils_Tuple2('-', 41),
			_Utils_Tuple2('.', 42),
			_Utils_Tuple2('/', 43),
			_Utils_Tuple2(':', 44)
		]));
var $pablohirafuji$elm_qrcode$QRCode$Encode$Alphanumeric$toAlphanumericCode = function (_char) {
	return A2(
		$elm$core$Result$fromMaybe,
		$pablohirafuji$elm_qrcode$QRCode$Error$InvalidAlphanumericChar,
		A2($elm$core$Dict$get, _char, $pablohirafuji$elm_qrcode$QRCode$Encode$Alphanumeric$alphanumericCodes));
};
var $pablohirafuji$elm_qrcode$QRCode$Encode$Alphanumeric$toBinary = function (chars) {
	_v0$2:
	while (true) {
		if (chars.b) {
			if (chars.b.b) {
				if (!chars.b.b.b) {
					var firstChar = chars.a;
					var _v1 = chars.b;
					var secondChar = _v1.a;
					return A3(
						$elm$core$Result$map2,
						F2(
							function (firstCode, secondCode) {
								return _Utils_Tuple2((firstCode * 45) + secondCode, 11);
							}),
						$pablohirafuji$elm_qrcode$QRCode$Encode$Alphanumeric$toAlphanumericCode(firstChar),
						$pablohirafuji$elm_qrcode$QRCode$Encode$Alphanumeric$toAlphanumericCode(secondChar));
				} else {
					break _v0$2;
				}
			} else {
				var _char = chars.a;
				return A2(
					$elm$core$Result$map,
					function (a) {
						return _Utils_Tuple2(a, 6);
					},
					$pablohirafuji$elm_qrcode$QRCode$Encode$Alphanumeric$toAlphanumericCode(_char));
			}
		} else {
			break _v0$2;
		}
	}
	return $elm$core$Result$Err($pablohirafuji$elm_qrcode$QRCode$Error$InvalidAlphanumericChar);
};
var $pablohirafuji$elm_qrcode$QRCode$Encode$Alphanumeric$encode = function (str) {
	return A3(
		$elm$core$List$foldr,
		$elm$core$Result$map2($elm$core$List$cons),
		$elm$core$Result$Ok(_List_Nil),
		A2(
			$elm$core$List$map,
			$pablohirafuji$elm_qrcode$QRCode$Encode$Alphanumeric$toBinary,
			A2(
				$elm_community$list_extra$List$Extra$greedyGroupsOf,
				2,
				$elm$core$String$toList(str))));
};
var $pablohirafuji$elm_qrcode$QRCode$Encode$Byte$encode = function (str) {
	return $elm$core$Result$Ok(
		A2(
			$elm$core$List$map,
			function (a) {
				return _Utils_Tuple2(
					$elm$core$Char$toCode(a),
					8);
			},
			$elm$core$String$toList(str)));
};
var $pablohirafuji$elm_qrcode$QRCode$Error$InvalidNumericChar = {$: 1};
var $pablohirafuji$elm_qrcode$QRCode$Encode$Numeric$numericLength = function (str) {
	var _v0 = $elm$core$String$length(str);
	switch (_v0) {
		case 1:
			return 4;
		case 2:
			return 7;
		default:
			return 10;
	}
};
var $pablohirafuji$elm_qrcode$QRCode$Encode$Numeric$encodeHelp = function (chars) {
	var str = $elm$core$String$fromList(chars);
	return A2(
		$elm$core$Result$fromMaybe,
		$pablohirafuji$elm_qrcode$QRCode$Error$InvalidNumericChar,
		A2(
			$elm$core$Maybe$map,
			function (a) {
				return _Utils_Tuple2(
					a,
					$pablohirafuji$elm_qrcode$QRCode$Encode$Numeric$numericLength(str));
			},
			$elm$core$String$toInt(str)));
};
var $pablohirafuji$elm_qrcode$QRCode$Encode$Numeric$encode = function (str) {
	return A3(
		$elm$core$List$foldr,
		$elm$core$Result$map2($elm$core$List$cons),
		$elm$core$Result$Ok(_List_Nil),
		A2(
			$elm$core$List$map,
			$pablohirafuji$elm_qrcode$QRCode$Encode$Numeric$encodeHelp,
			A2(
				$elm_community$list_extra$List$Extra$greedyGroupsOf,
				3,
				$elm$core$String$toList(str))));
};
var $pablohirafuji$elm_qrcode$QRCode$Error$InvalidUTF8Char = {$: 3};
var $elm$bytes$Bytes$Encode$getWidth = function (builder) {
	switch (builder.$) {
		case 0:
			return 1;
		case 1:
			return 2;
		case 2:
			return 4;
		case 3:
			return 1;
		case 4:
			return 2;
		case 5:
			return 4;
		case 6:
			return 4;
		case 7:
			return 8;
		case 8:
			var w = builder.a;
			return w;
		case 9:
			var w = builder.a;
			return w;
		default:
			var bs = builder.a;
			return _Bytes_width(bs);
	}
};
var $elm$bytes$Bytes$LE = 0;
var $elm$bytes$Bytes$Encode$write = F3(
	function (builder, mb, offset) {
		switch (builder.$) {
			case 0:
				var n = builder.a;
				return A3(_Bytes_write_i8, mb, offset, n);
			case 1:
				var e = builder.a;
				var n = builder.b;
				return A4(_Bytes_write_i16, mb, offset, n, !e);
			case 2:
				var e = builder.a;
				var n = builder.b;
				return A4(_Bytes_write_i32, mb, offset, n, !e);
			case 3:
				var n = builder.a;
				return A3(_Bytes_write_u8, mb, offset, n);
			case 4:
				var e = builder.a;
				var n = builder.b;
				return A4(_Bytes_write_u16, mb, offset, n, !e);
			case 5:
				var e = builder.a;
				var n = builder.b;
				return A4(_Bytes_write_u32, mb, offset, n, !e);
			case 6:
				var e = builder.a;
				var n = builder.b;
				return A4(_Bytes_write_f32, mb, offset, n, !e);
			case 7:
				var e = builder.a;
				var n = builder.b;
				return A4(_Bytes_write_f64, mb, offset, n, !e);
			case 8:
				var bs = builder.b;
				return A3($elm$bytes$Bytes$Encode$writeSequence, bs, mb, offset);
			case 9:
				var s = builder.b;
				return A3(_Bytes_write_string, mb, offset, s);
			default:
				var bs = builder.a;
				return A3(_Bytes_write_bytes, mb, offset, bs);
		}
	});
var $elm$bytes$Bytes$Encode$writeSequence = F3(
	function (builders, mb, offset) {
		writeSequence:
		while (true) {
			if (!builders.b) {
				return offset;
			} else {
				var b = builders.a;
				var bs = builders.b;
				var $temp$builders = bs,
					$temp$mb = mb,
					$temp$offset = A3($elm$bytes$Bytes$Encode$write, b, mb, offset);
				builders = $temp$builders;
				mb = $temp$mb;
				offset = $temp$offset;
				continue writeSequence;
			}
		}
	});
var $elm$bytes$Bytes$Decode$decode = F2(
	function (_v0, bs) {
		var decoder = _v0;
		return A2(_Bytes_decode, decoder, bs);
	});
var $elm$bytes$Bytes$Encode$encode = _Bytes_encode;
var $elm$bytes$Bytes$Encode$getStringWidth = _Bytes_getStringWidth;
var $elm$bytes$Bytes$Decode$Decoder = $elm$core$Basics$identity;
var $elm$bytes$Bytes$Decode$loopHelp = F4(
	function (state, callback, bites, offset) {
		loopHelp:
		while (true) {
			var _v0 = callback(state);
			var decoder = _v0;
			var _v1 = A2(decoder, bites, offset);
			var newOffset = _v1.a;
			var step = _v1.b;
			if (!step.$) {
				var newState = step.a;
				var $temp$state = newState,
					$temp$callback = callback,
					$temp$bites = bites,
					$temp$offset = newOffset;
				state = $temp$state;
				callback = $temp$callback;
				bites = $temp$bites;
				offset = $temp$offset;
				continue loopHelp;
			} else {
				var result = step.a;
				return _Utils_Tuple2(newOffset, result);
			}
		}
	});
var $elm$bytes$Bytes$Decode$loop = F2(
	function (state, callback) {
		return A2($elm$bytes$Bytes$Decode$loopHelp, state, callback);
	});
var $elm$bytes$Bytes$Decode$Done = function (a) {
	return {$: 1, a: a};
};
var $elm$bytes$Bytes$Decode$Loop = function (a) {
	return {$: 0, a: a};
};
var $elm$bytes$Bytes$Decode$map = F2(
	function (func, _v0) {
		var decodeA = _v0;
		return F2(
			function (bites, offset) {
				var _v1 = A2(decodeA, bites, offset);
				var aOffset = _v1.a;
				var a = _v1.b;
				return _Utils_Tuple2(
					aOffset,
					func(a));
			});
	});
var $elm$bytes$Bytes$Decode$succeed = function (a) {
	return F2(
		function (_v0, offset) {
			return _Utils_Tuple2(offset, a);
		});
};
var $elm$bytes$Bytes$Decode$unsignedInt8 = _Bytes_read_u8;
var $pablohirafuji$elm_qrcode$QRCode$Encode$UTF8$step = function (_v0) {
	var n = _v0.a;
	var xs = _v0.b;
	return (n <= 0) ? $elm$bytes$Bytes$Decode$succeed(
		$elm$bytes$Bytes$Decode$Done(
			$elm$core$List$reverse(xs))) : A2(
		$elm$bytes$Bytes$Decode$map,
		function (x) {
			return $elm$bytes$Bytes$Decode$Loop(
				_Utils_Tuple2(
					n - 1,
					A2(
						$elm$core$List$cons,
						_Utils_Tuple2(x, 8),
						xs)));
		},
		$elm$bytes$Bytes$Decode$unsignedInt8);
};
var $elm$bytes$Bytes$Encode$Utf8 = F2(
	function (a, b) {
		return {$: 9, a: a, b: b};
	});
var $elm$bytes$Bytes$Encode$string = function (str) {
	return A2(
		$elm$bytes$Bytes$Encode$Utf8,
		_Bytes_getStringWidth(str),
		str);
};
var $pablohirafuji$elm_qrcode$QRCode$Encode$UTF8$encode = function (str) {
	var utf8BytesWidth = $elm$bytes$Bytes$Encode$getStringWidth(str);
	var decoder = A2(
		$elm$bytes$Bytes$Decode$loop,
		_Utils_Tuple2(utf8BytesWidth, _List_Nil),
		$pablohirafuji$elm_qrcode$QRCode$Encode$UTF8$step);
	return A2(
		$elm$core$Result$fromMaybe,
		$pablohirafuji$elm_qrcode$QRCode$Error$InvalidUTF8Char,
		A2(
			$elm$bytes$Bytes$Decode$decode,
			decoder,
			$elm$bytes$Bytes$Encode$encode(
				$elm$bytes$Bytes$Encode$string(str))));
};
var $pablohirafuji$elm_qrcode$QRCode$Encode$encoder = function (mode) {
	switch (mode) {
		case 0:
			return $pablohirafuji$elm_qrcode$QRCode$Encode$Numeric$encode;
		case 1:
			return $pablohirafuji$elm_qrcode$QRCode$Encode$Alphanumeric$encode;
		case 2:
			return $pablohirafuji$elm_qrcode$QRCode$Encode$Byte$encode;
		default:
			return $pablohirafuji$elm_qrcode$QRCode$Encode$UTF8$encode;
	}
};
var $pablohirafuji$elm_qrcode$QRCode$ErrorCorrection$expTable = $elm$core$Array$fromList(
	_List_fromArray(
		[1, 2, 4, 8, 16, 32, 64, 128, 29, 58, 116, 232, 205, 135, 19, 38, 76, 152, 45, 90, 180, 117, 234, 201, 143, 3, 6, 12, 24, 48, 96, 192, 157, 39, 78, 156, 37, 74, 148, 53, 106, 212, 181, 119, 238, 193, 159, 35, 70, 140, 5, 10, 20, 40, 80, 160, 93, 186, 105, 210, 185, 111, 222, 161, 95, 190, 97, 194, 153, 47, 94, 188, 101, 202, 137, 15, 30, 60, 120, 240, 253, 231, 211, 187, 107, 214, 177, 127, 254, 225, 223, 163, 91, 182, 113, 226, 217, 175, 67, 134, 17, 34, 68, 136, 13, 26, 52, 104, 208, 189, 103, 206, 129, 31, 62, 124, 248, 237, 199, 147, 59, 118, 236, 197, 151, 51, 102, 204, 133, 23, 46, 92, 184, 109, 218, 169, 79, 158, 33, 66, 132, 21, 42, 84, 168, 77, 154, 41, 82, 164, 85, 170, 73, 146, 57, 114, 228, 213, 183, 115, 230, 209, 191, 99, 198, 145, 63, 126, 252, 229, 215, 179, 123, 246, 241, 255, 227, 219, 171, 75, 150, 49, 98, 196, 149, 55, 110, 220, 165, 87, 174, 65, 130, 25, 50, 100, 200, 141, 7, 14, 28, 56, 112, 224, 221, 167, 83, 166, 81, 162, 89, 178, 121, 242, 249, 239, 195, 155, 43, 86, 172, 69, 138, 9, 18, 36, 72, 144, 61, 122, 244, 245, 247, 243, 251, 235, 203, 139, 11, 22, 44, 88, 176, 125, 250, 233, 207, 131, 27, 54, 108, 216, 173, 71, 142, 1]));
var $pablohirafuji$elm_qrcode$QRCode$ErrorCorrection$getExp = function (index) {
	return A2(
		$elm$core$Maybe$withDefault,
		0,
		A2(
			$elm$core$Array$get,
			A2($elm$core$Basics$modBy, 255, index),
			$pablohirafuji$elm_qrcode$QRCode$ErrorCorrection$expTable));
};
var $pablohirafuji$elm_qrcode$QRCode$Error$PolynomialMultiplyException = {$: 5};
var $pablohirafuji$elm_qrcode$QRCode$Error$LogTableException = function (a) {
	return {$: 4, a: a};
};
var $pablohirafuji$elm_qrcode$QRCode$ErrorCorrection$logTable = $elm$core$Array$fromList(
	_List_fromArray(
		[0, 1, 25, 2, 50, 26, 198, 3, 223, 51, 238, 27, 104, 199, 75, 4, 100, 224, 14, 52, 141, 239, 129, 28, 193, 105, 248, 200, 8, 76, 113, 5, 138, 101, 47, 225, 36, 15, 33, 53, 147, 142, 218, 240, 18, 130, 69, 29, 181, 194, 125, 106, 39, 249, 185, 201, 154, 9, 120, 77, 228, 114, 166, 6, 191, 139, 98, 102, 221, 48, 253, 226, 152, 37, 179, 16, 145, 34, 136, 54, 208, 148, 206, 143, 150, 219, 189, 241, 210, 19, 92, 131, 56, 70, 64, 30, 66, 182, 163, 195, 72, 126, 110, 107, 58, 40, 84, 250, 133, 186, 61, 202, 94, 155, 159, 10, 21, 121, 43, 78, 212, 229, 172, 115, 243, 167, 87, 7, 112, 192, 247, 140, 128, 99, 13, 103, 74, 222, 237, 49, 197, 254, 24, 227, 165, 153, 119, 38, 184, 180, 124, 17, 68, 146, 217, 35, 32, 137, 46, 55, 63, 209, 91, 149, 188, 207, 205, 144, 135, 151, 178, 220, 252, 190, 97, 242, 86, 211, 171, 20, 42, 93, 158, 132, 60, 57, 83, 71, 109, 65, 162, 31, 45, 67, 216, 183, 123, 164, 118, 196, 23, 73, 236, 127, 12, 111, 246, 108, 161, 59, 82, 41, 157, 85, 170, 251, 96, 134, 177, 187, 204, 62, 90, 203, 89, 95, 176, 156, 169, 160, 81, 11, 245, 22, 235, 122, 117, 44, 215, 79, 174, 213, 233, 230, 231, 173, 232, 116, 214, 244, 234, 168, 80, 88, 175]));
var $pablohirafuji$elm_qrcode$QRCode$ErrorCorrection$getLog = function (index) {
	return (index < 1) ? $elm$core$Result$Err(
		$pablohirafuji$elm_qrcode$QRCode$Error$LogTableException(index)) : A2(
		$elm$core$Result$fromMaybe,
		$pablohirafuji$elm_qrcode$QRCode$Error$LogTableException(index),
		A2($elm$core$Array$get, index - 1, $pablohirafuji$elm_qrcode$QRCode$ErrorCorrection$logTable));
};
var $elm$core$Array$length = function (_v0) {
	var len = _v0.a;
	return len;
};
var $pablohirafuji$elm_qrcode$QRCode$ErrorCorrection$getOffset = function (_v0) {
	getOffset:
	while (true) {
		var num = _v0.a;
		var offset = _v0.b;
		if (num.b) {
			var head = num.a;
			var tail = num.b;
			if (!head) {
				var $temp$_v0 = _Utils_Tuple2(tail, offset + 1);
				_v0 = $temp$_v0;
				continue getOffset;
			} else {
				return offset;
			}
		} else {
			return offset;
		}
	}
};
var $pablohirafuji$elm_qrcode$QRCode$ErrorCorrection$newPolynomial = F2(
	function (num, shift) {
		var offset = $pablohirafuji$elm_qrcode$QRCode$ErrorCorrection$getOffset(
			_Utils_Tuple2(num, 0));
		var numArray = $elm$core$Array$fromList(num);
		return A2(
			$elm$core$Array$initialize,
			($elm$core$List$length(num) - offset) + shift,
			function (index) {
				return A2(
					$elm$core$Maybe$withDefault,
					0,
					A2($elm$core$Array$get, index + offset, numArray));
			});
	});
var $pablohirafuji$elm_qrcode$QRCode$ErrorCorrection$multiply = F2(
	function (poly1, poly2) {
		var valuesArray = A2(
			$elm$core$List$indexedMap,
			F2(
				function (index1, value1) {
					return A2(
						$elm$core$List$indexedMap,
						F2(
							function (index2, value2) {
								return _Utils_Tuple3(index1 + index2, value1, value2);
							}),
						$elm$core$Array$toList(poly2));
				}),
			$elm$core$Array$toList(poly1));
		var process__ = F3(
			function (indexSum, num_, exp) {
				return A2(
					$elm$core$Result$fromMaybe,
					$pablohirafuji$elm_qrcode$QRCode$Error$PolynomialMultiplyException,
					A2(
						$elm$core$Maybe$map,
						$elm$core$Bitwise$xor(exp),
						A2($elm$core$Array$get, indexSum, num_)));
			});
		var process_ = F2(
			function (_v0, num_) {
				var indexSum = _v0.a;
				var value1 = _v0.b;
				var value2 = _v0.c;
				return A2(
					$elm$core$Result$map,
					function (r) {
						return A3($elm$core$Array$set, indexSum, r, num_);
					},
					A2(
						$elm$core$Result$andThen,
						A2(process__, indexSum, num_),
						A2(
							$elm$core$Result$map,
							$pablohirafuji$elm_qrcode$QRCode$ErrorCorrection$getExp,
							A3(
								$elm$core$Result$map2,
								$elm$core$Basics$add,
								$pablohirafuji$elm_qrcode$QRCode$ErrorCorrection$getLog(value1),
								$pablohirafuji$elm_qrcode$QRCode$ErrorCorrection$getLog(value2)))));
			});
		var process = F2(
			function (args, numResult) {
				return A2(
					$elm$core$Result$andThen,
					process_(args),
					numResult);
			});
		var num = A2(
			$elm$core$Array$initialize,
			($elm$core$Array$length(poly1) + $elm$core$Array$length(poly2)) - 1,
			$elm$core$Basics$always(0));
		return A2(
			$elm$core$Result$map,
			function (a) {
				return A2($pablohirafuji$elm_qrcode$QRCode$ErrorCorrection$newPolynomial, a, 0);
			},
			A2(
				$elm$core$Result$map,
				$elm$core$Array$toList,
				A3(
					$elm$core$List$foldl,
					process,
					$elm$core$Result$Ok(num),
					$elm$core$List$concat(valuesArray))));
	});
var $pablohirafuji$elm_qrcode$QRCode$ErrorCorrection$getECPolynomial = function (ecLength) {
	var generate = F2(
		function (count, polyResult) {
			generate:
			while (true) {
				if (_Utils_cmp(count, ecLength) < 0) {
					var $temp$count = count + 1,
						$temp$polyResult = A2(
						$elm$core$Result$andThen,
						function (a) {
							return A2(
								$pablohirafuji$elm_qrcode$QRCode$ErrorCorrection$multiply,
								a,
								A2(
									$pablohirafuji$elm_qrcode$QRCode$ErrorCorrection$newPolynomial,
									_List_fromArray(
										[
											1,
											$pablohirafuji$elm_qrcode$QRCode$ErrorCorrection$getExp(count)
										]),
									0));
						},
						polyResult);
					count = $temp$count;
					polyResult = $temp$polyResult;
					continue generate;
				} else {
					return polyResult;
				}
			}
		});
	return A2(
		generate,
		0,
		$elm$core$Result$Ok(
			A2(
				$pablohirafuji$elm_qrcode$QRCode$ErrorCorrection$newPolynomial,
				_List_fromArray(
					[1]),
				0)));
};
var $pablohirafuji$elm_qrcode$QRCode$ErrorCorrection$get___ = F2(
	function (ecLength, modPoly) {
		return $elm$core$Array$toList(
			A2(
				$elm$core$Array$initialize,
				ecLength,
				function (index) {
					var modIndex = (index + $elm$core$Array$length(modPoly)) - ecLength;
					return (modIndex >= 0) ? A2(
						$elm$core$Maybe$withDefault,
						0,
						A2($elm$core$Array$get, modIndex, modPoly)) : 0;
				}));
	});
var $pablohirafuji$elm_qrcode$QRCode$Error$PolynomialModException = {$: 6};
var $elm$core$Array$foldl = F3(
	function (func, baseCase, _v0) {
		var tree = _v0.c;
		var tail = _v0.d;
		var helper = F2(
			function (node, acc) {
				if (!node.$) {
					var subTree = node.a;
					return A3($elm$core$Elm$JsArray$foldl, helper, acc, subTree);
				} else {
					var values = node.a;
					return A3($elm$core$Elm$JsArray$foldl, func, acc, values);
				}
			});
		return A3(
			$elm$core$Elm$JsArray$foldl,
			func,
			A3($elm$core$Elm$JsArray$foldl, helper, baseCase, tree),
			tail);
	});
var $pablohirafuji$elm_qrcode$QRCode$ErrorCorrection$mod = F2(
	function (poly1, poly2) {
		if (($elm$core$Array$length(poly1) - $elm$core$Array$length(poly2)) < 0) {
			return $elm$core$Result$Ok(poly1);
		} else {
			var helper_ = F3(
				function (index2, poly1_, exp) {
					return A2(
						$elm$core$Result$fromMaybe,
						$pablohirafuji$elm_qrcode$QRCode$Error$PolynomialModException,
						A2(
							$elm$core$Maybe$map,
							$elm$core$Bitwise$xor(exp),
							A2($elm$core$Array$get, index2, poly1_)));
				});
			var getHead = function (poly) {
				return A2(
					$elm$core$Result$andThen,
					$pablohirafuji$elm_qrcode$QRCode$ErrorCorrection$getLog,
					A2(
						$elm$core$Result$fromMaybe,
						$pablohirafuji$elm_qrcode$QRCode$Error$PolynomialModException,
						A2($elm$core$Array$get, 0, poly)));
			};
			var ratio = A3(
				$elm$core$Result$map2,
				$elm$core$Basics$sub,
				getHead(poly1),
				getHead(poly2));
			var helper = F2(
				function (_v0, poly1_) {
					var index2 = _v0.a;
					var value2 = _v0.b;
					return A2(
						$elm$core$Result$map,
						function (r) {
							return A3($elm$core$Array$set, index2, r, poly1_);
						},
						A2(
							$elm$core$Result$andThen,
							A2(helper_, index2, poly1_),
							A2(
								$elm$core$Result$map,
								$pablohirafuji$elm_qrcode$QRCode$ErrorCorrection$getExp,
								A3(
									$elm$core$Result$map2,
									$elm$core$Basics$add,
									ratio,
									$pablohirafuji$elm_qrcode$QRCode$ErrorCorrection$getLog(value2)))));
				});
			var numFold = F2(
				function (args, poly1Result) {
					return A2(
						$elm$core$Result$andThen,
						helper(args),
						poly1Result);
				});
			var numResult = A3(
				$elm$core$Array$foldl,
				numFold,
				$elm$core$Result$Ok(poly1),
				A2(
					$elm$core$Array$indexedMap,
					F2(
						function (a, b) {
							return _Utils_Tuple2(a, b);
						}),
					poly2));
			return A2(
				$elm$core$Result$andThen,
				function (a) {
					return A2($pablohirafuji$elm_qrcode$QRCode$ErrorCorrection$mod, a, poly2);
				},
				A2(
					$elm$core$Result$map,
					function (a) {
						return A2($pablohirafuji$elm_qrcode$QRCode$ErrorCorrection$newPolynomial, a, 0);
					},
					A2($elm$core$Result$map, $elm$core$Array$toList, numResult)));
		}
	});
var $pablohirafuji$elm_qrcode$QRCode$ErrorCorrection$get__ = F2(
	function (rsPoly, dataCodewords) {
		return A2(
			$elm$core$Result$map,
			$pablohirafuji$elm_qrcode$QRCode$ErrorCorrection$get___(
				$elm$core$Array$length(rsPoly) - 1),
			A2(
				$pablohirafuji$elm_qrcode$QRCode$ErrorCorrection$mod,
				A2(
					$pablohirafuji$elm_qrcode$QRCode$ErrorCorrection$newPolynomial,
					dataCodewords,
					$elm$core$Array$length(rsPoly) - 1),
				rsPoly));
	});
var $pablohirafuji$elm_qrcode$QRCode$Helpers$listResult = F3(
	function (fun, listb, lista) {
		if (lista.b) {
			var head = lista.a;
			var tail = lista.b;
			return A2(
				$elm$core$Result$andThen,
				function (a) {
					return A3($pablohirafuji$elm_qrcode$QRCode$Helpers$listResult, fun, a, tail);
				},
				A2(
					$elm$core$Result$map,
					function (r) {
						return A2($elm$core$List$cons, r, listb);
					},
					fun(head)));
		} else {
			return $elm$core$Result$Ok(
				$elm$core$List$reverse(listb));
		}
	});
var $pablohirafuji$elm_qrcode$QRCode$ErrorCorrection$get_ = F2(
	function (byteBlocks, rsPoly) {
		return A3(
			$pablohirafuji$elm_qrcode$QRCode$Helpers$listResult,
			$pablohirafuji$elm_qrcode$QRCode$ErrorCorrection$get__(rsPoly),
			_List_Nil,
			byteBlocks);
	});
var $pablohirafuji$elm_qrcode$QRCode$ErrorCorrection$get = F2(
	function (ecPerBlock, byteBlocks) {
		return A2(
			$elm$core$Result$andThen,
			$pablohirafuji$elm_qrcode$QRCode$ErrorCorrection$get_(byteBlocks),
			$pablohirafuji$elm_qrcode$QRCode$ErrorCorrection$getECPolynomial(ecPerBlock));
	});
var $pablohirafuji$elm_qrcode$QRCode$Encode$getErrorCorrection = function (_v0) {
	var model = _v0.a;
	var dataBlocks = _v0.b;
	return A2(
		$elm$core$Result$map,
		function (c) {
			return _Utils_Tuple3(model, dataBlocks, c);
		},
		A2($pablohirafuji$elm_qrcode$QRCode$ErrorCorrection$get, model.e4.eW, dataBlocks));
};
var $pablohirafuji$elm_qrcode$QRCode$Encode$Alphanumeric = 1;
var $pablohirafuji$elm_qrcode$QRCode$Encode$Byte = 2;
var $pablohirafuji$elm_qrcode$QRCode$Encode$Numeric = 0;
var $elm$regex$Regex$Match = F4(
	function (match, index, number, submatches) {
		return {fd: index, fj: match, fp: number, fH: submatches};
	});
var $elm$regex$Regex$contains = _Regex_contains;
var $elm$regex$Regex$fromStringWith = _Regex_fromStringWith;
var $pablohirafuji$elm_qrcode$QRCode$Encode$Alphanumeric$onlyAlphanumeric = A2(
	$elm$regex$Regex$fromStringWith,
	{eE: false, fn: false},
	'^[0-9A-Z $%*+\\-.\\/:]+$');
var $pablohirafuji$elm_qrcode$QRCode$Encode$Alphanumeric$isValid = function (input) {
	return A2(
		$elm$core$Maybe$withDefault,
		false,
		A2(
			$elm$core$Maybe$map,
			function (r) {
				return A2($elm$regex$Regex$contains, r, input);
			},
			$pablohirafuji$elm_qrcode$QRCode$Encode$Alphanumeric$onlyAlphanumeric));
};
var $pablohirafuji$elm_qrcode$QRCode$Encode$Byte$only8Bit = A2(
	$elm$regex$Regex$fromStringWith,
	{eE: false, fn: false},
	'^[\\u0000-\\u00ff]+$');
var $pablohirafuji$elm_qrcode$QRCode$Encode$Byte$isValid = function (input) {
	return A2(
		$elm$core$Maybe$withDefault,
		false,
		A2(
			$elm$core$Maybe$map,
			function (r) {
				return A2($elm$regex$Regex$contains, r, input);
			},
			$pablohirafuji$elm_qrcode$QRCode$Encode$Byte$only8Bit));
};
var $pablohirafuji$elm_qrcode$QRCode$Encode$Numeric$onlyNumber = A2(
	$elm$regex$Regex$fromStringWith,
	{eE: false, fn: false},
	'^[0-9]+$');
var $pablohirafuji$elm_qrcode$QRCode$Encode$Numeric$isValid = function (input) {
	return A2(
		$elm$core$Maybe$withDefault,
		false,
		A2(
			$elm$core$Maybe$map,
			function (r) {
				return A2($elm$regex$Regex$contains, r, input);
			},
			$pablohirafuji$elm_qrcode$QRCode$Encode$Numeric$onlyNumber));
};
var $pablohirafuji$elm_qrcode$QRCode$Encode$selectMode = function (input) {
	return $pablohirafuji$elm_qrcode$QRCode$Encode$Numeric$isValid(input) ? 0 : ($pablohirafuji$elm_qrcode$QRCode$Encode$Alphanumeric$isValid(input) ? 1 : ($pablohirafuji$elm_qrcode$QRCode$Encode$Byte$isValid(input) ? 2 : 3));
};
var $pablohirafuji$elm_qrcode$QRCode$Error$InputLengthOverflow = {$: 7};
var $pablohirafuji$elm_qrcode$QRCode$Encode$filterCapacity = F3(
	function (mode, dataLength, _v0) {
		var version = _v0.cN;
		var capacity = _v0.bv;
		return _Utils_cmp(
			A2($pablohirafuji$elm_qrcode$QRCode$Encode$charCountIndicatorLength, mode, version) + dataLength,
			capacity) < 1;
	});
var $pablohirafuji$elm_qrcode$QRCode$GroupInfo$blockByteCapacity = function (_v0) {
	var blockCount = _v0.a;
	var bytePerBlock = _v0.b;
	return blockCount * bytePerBlock;
};
var $pablohirafuji$elm_qrcode$QRCode$GroupInfo$byteCapacity = F2(
	function (group1, maybeGroup2) {
		if (!maybeGroup2.$) {
			var block2 = maybeGroup2.a;
			return $pablohirafuji$elm_qrcode$QRCode$GroupInfo$blockByteCapacity(group1) + $pablohirafuji$elm_qrcode$QRCode$GroupInfo$blockByteCapacity(block2);
		} else {
			return $pablohirafuji$elm_qrcode$QRCode$GroupInfo$blockByteCapacity(group1);
		}
	});
var $pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo = F4(
	function (version, ecPerBlock, group1, maybeGroup2) {
		return {
			bv: A2($pablohirafuji$elm_qrcode$QRCode$GroupInfo$byteCapacity, group1, maybeGroup2) * 8,
			eW: ecPerBlock,
			ds: group1,
			fk: maybeGroup2,
			cN: version
		};
	});
var $pablohirafuji$elm_qrcode$QRCode$GroupInfo$dataH = _List_fromArray(
	[
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		1,
		17,
		_Utils_Tuple2(1, 9),
		$elm$core$Maybe$Nothing),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		2,
		28,
		_Utils_Tuple2(1, 16),
		$elm$core$Maybe$Nothing),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		3,
		22,
		_Utils_Tuple2(2, 13),
		$elm$core$Maybe$Nothing),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		4,
		16,
		_Utils_Tuple2(4, 9),
		$elm$core$Maybe$Nothing),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		5,
		22,
		_Utils_Tuple2(2, 11),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(2, 12))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		6,
		28,
		_Utils_Tuple2(4, 15),
		$elm$core$Maybe$Nothing),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		7,
		26,
		_Utils_Tuple2(4, 13),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(1, 14))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		8,
		26,
		_Utils_Tuple2(4, 14),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(2, 15))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		9,
		24,
		_Utils_Tuple2(4, 12),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(4, 13))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		10,
		28,
		_Utils_Tuple2(6, 15),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(2, 16))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		11,
		24,
		_Utils_Tuple2(3, 12),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(8, 13))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		12,
		28,
		_Utils_Tuple2(7, 14),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(4, 15))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		13,
		22,
		_Utils_Tuple2(12, 11),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(4, 12))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		14,
		24,
		_Utils_Tuple2(11, 12),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(5, 13))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		15,
		24,
		_Utils_Tuple2(11, 12),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(7, 13))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		16,
		30,
		_Utils_Tuple2(3, 15),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(13, 16))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		17,
		28,
		_Utils_Tuple2(2, 14),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(17, 15))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		18,
		28,
		_Utils_Tuple2(2, 14),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(19, 15))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		19,
		26,
		_Utils_Tuple2(9, 13),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(16, 14))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		20,
		28,
		_Utils_Tuple2(15, 15),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(10, 16))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		21,
		30,
		_Utils_Tuple2(19, 16),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(6, 17))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		22,
		24,
		_Utils_Tuple2(34, 13),
		$elm$core$Maybe$Nothing),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		23,
		30,
		_Utils_Tuple2(16, 15),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(14, 16))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		24,
		30,
		_Utils_Tuple2(30, 16),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(2, 17))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		25,
		30,
		_Utils_Tuple2(22, 15),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(13, 16))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		26,
		30,
		_Utils_Tuple2(33, 16),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(4, 17))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		27,
		30,
		_Utils_Tuple2(12, 15),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(28, 16))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		28,
		30,
		_Utils_Tuple2(11, 15),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(31, 16))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		29,
		30,
		_Utils_Tuple2(19, 15),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(26, 16))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		30,
		30,
		_Utils_Tuple2(23, 15),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(25, 16))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		31,
		30,
		_Utils_Tuple2(23, 15),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(28, 16))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		32,
		30,
		_Utils_Tuple2(19, 15),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(35, 16))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		33,
		30,
		_Utils_Tuple2(11, 15),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(46, 16))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		34,
		30,
		_Utils_Tuple2(59, 16),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(1, 17))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		35,
		30,
		_Utils_Tuple2(22, 15),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(41, 16))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		36,
		30,
		_Utils_Tuple2(2, 15),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(64, 16))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		37,
		30,
		_Utils_Tuple2(24, 15),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(46, 16))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		38,
		30,
		_Utils_Tuple2(42, 15),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(32, 16))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		39,
		30,
		_Utils_Tuple2(10, 15),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(67, 16))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		40,
		30,
		_Utils_Tuple2(20, 15),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(61, 16)))
	]);
var $pablohirafuji$elm_qrcode$QRCode$GroupInfo$dataL = _List_fromArray(
	[
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		1,
		7,
		_Utils_Tuple2(1, 19),
		$elm$core$Maybe$Nothing),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		2,
		10,
		_Utils_Tuple2(1, 34),
		$elm$core$Maybe$Nothing),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		3,
		15,
		_Utils_Tuple2(1, 55),
		$elm$core$Maybe$Nothing),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		4,
		20,
		_Utils_Tuple2(1, 80),
		$elm$core$Maybe$Nothing),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		5,
		26,
		_Utils_Tuple2(1, 108),
		$elm$core$Maybe$Nothing),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		6,
		18,
		_Utils_Tuple2(2, 68),
		$elm$core$Maybe$Nothing),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		7,
		20,
		_Utils_Tuple2(2, 78),
		$elm$core$Maybe$Nothing),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		8,
		24,
		_Utils_Tuple2(2, 97),
		$elm$core$Maybe$Nothing),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		9,
		30,
		_Utils_Tuple2(2, 116),
		$elm$core$Maybe$Nothing),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		10,
		18,
		_Utils_Tuple2(2, 68),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(2, 69))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		11,
		20,
		_Utils_Tuple2(4, 81),
		$elm$core$Maybe$Nothing),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		12,
		24,
		_Utils_Tuple2(2, 92),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(2, 93))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		13,
		26,
		_Utils_Tuple2(4, 107),
		$elm$core$Maybe$Nothing),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		14,
		30,
		_Utils_Tuple2(3, 115),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(1, 116))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		15,
		22,
		_Utils_Tuple2(5, 87),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(1, 88))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		16,
		24,
		_Utils_Tuple2(5, 98),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(1, 99))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		17,
		28,
		_Utils_Tuple2(1, 107),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(5, 108))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		18,
		30,
		_Utils_Tuple2(5, 120),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(1, 121))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		19,
		28,
		_Utils_Tuple2(3, 113),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(4, 114))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		20,
		28,
		_Utils_Tuple2(3, 107),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(5, 108))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		21,
		28,
		_Utils_Tuple2(4, 116),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(4, 117))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		22,
		28,
		_Utils_Tuple2(2, 111),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(7, 112))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		23,
		30,
		_Utils_Tuple2(4, 121),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(5, 122))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		24,
		30,
		_Utils_Tuple2(6, 117),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(4, 118))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		25,
		26,
		_Utils_Tuple2(8, 106),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(4, 107))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		26,
		28,
		_Utils_Tuple2(10, 114),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(2, 115))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		27,
		30,
		_Utils_Tuple2(8, 122),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(4, 123))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		28,
		30,
		_Utils_Tuple2(3, 117),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(10, 118))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		29,
		30,
		_Utils_Tuple2(7, 116),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(7, 117))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		30,
		30,
		_Utils_Tuple2(5, 115),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(10, 116))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		31,
		30,
		_Utils_Tuple2(13, 115),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(3, 116))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		32,
		30,
		_Utils_Tuple2(17, 115),
		$elm$core$Maybe$Nothing),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		33,
		30,
		_Utils_Tuple2(17, 115),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(1, 116))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		34,
		30,
		_Utils_Tuple2(13, 115),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(6, 116))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		35,
		30,
		_Utils_Tuple2(12, 121),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(7, 122))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		36,
		30,
		_Utils_Tuple2(6, 121),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(14, 122))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		37,
		30,
		_Utils_Tuple2(17, 122),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(4, 123))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		38,
		30,
		_Utils_Tuple2(4, 122),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(18, 123))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		39,
		30,
		_Utils_Tuple2(20, 117),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(4, 118))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		40,
		30,
		_Utils_Tuple2(19, 118),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(6, 119)))
	]);
var $pablohirafuji$elm_qrcode$QRCode$GroupInfo$dataM = _List_fromArray(
	[
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		1,
		10,
		_Utils_Tuple2(1, 16),
		$elm$core$Maybe$Nothing),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		2,
		16,
		_Utils_Tuple2(1, 28),
		$elm$core$Maybe$Nothing),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		3,
		26,
		_Utils_Tuple2(1, 44),
		$elm$core$Maybe$Nothing),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		4,
		18,
		_Utils_Tuple2(2, 32),
		$elm$core$Maybe$Nothing),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		5,
		24,
		_Utils_Tuple2(2, 43),
		$elm$core$Maybe$Nothing),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		6,
		16,
		_Utils_Tuple2(4, 27),
		$elm$core$Maybe$Nothing),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		7,
		18,
		_Utils_Tuple2(4, 31),
		$elm$core$Maybe$Nothing),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		8,
		22,
		_Utils_Tuple2(2, 38),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(2, 39))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		9,
		22,
		_Utils_Tuple2(3, 36),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(2, 37))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		10,
		26,
		_Utils_Tuple2(4, 43),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(1, 44))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		11,
		30,
		_Utils_Tuple2(1, 50),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(4, 51))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		12,
		22,
		_Utils_Tuple2(6, 36),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(2, 37))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		13,
		22,
		_Utils_Tuple2(8, 37),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(1, 38))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		14,
		24,
		_Utils_Tuple2(4, 40),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(5, 41))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		15,
		24,
		_Utils_Tuple2(5, 41),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(5, 42))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		16,
		28,
		_Utils_Tuple2(7, 45),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(3, 46))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		17,
		28,
		_Utils_Tuple2(10, 46),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(1, 47))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		18,
		26,
		_Utils_Tuple2(9, 43),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(4, 44))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		19,
		26,
		_Utils_Tuple2(3, 44),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(11, 45))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		20,
		26,
		_Utils_Tuple2(3, 41),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(13, 42))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		21,
		26,
		_Utils_Tuple2(17, 42),
		$elm$core$Maybe$Nothing),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		22,
		28,
		_Utils_Tuple2(17, 46),
		$elm$core$Maybe$Nothing),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		23,
		28,
		_Utils_Tuple2(4, 47),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(14, 48))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		24,
		28,
		_Utils_Tuple2(6, 45),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(14, 46))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		25,
		28,
		_Utils_Tuple2(8, 47),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(13, 48))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		26,
		28,
		_Utils_Tuple2(19, 46),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(4, 47))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		27,
		28,
		_Utils_Tuple2(22, 45),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(3, 46))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		28,
		28,
		_Utils_Tuple2(3, 45),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(23, 46))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		29,
		28,
		_Utils_Tuple2(21, 45),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(7, 46))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		30,
		28,
		_Utils_Tuple2(19, 47),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(10, 48))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		31,
		28,
		_Utils_Tuple2(2, 46),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(29, 47))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		32,
		28,
		_Utils_Tuple2(10, 46),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(23, 47))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		33,
		28,
		_Utils_Tuple2(14, 46),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(21, 47))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		34,
		28,
		_Utils_Tuple2(14, 46),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(23, 47))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		35,
		28,
		_Utils_Tuple2(12, 47),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(26, 48))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		36,
		28,
		_Utils_Tuple2(6, 47),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(34, 48))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		37,
		28,
		_Utils_Tuple2(29, 46),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(14, 47))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		38,
		28,
		_Utils_Tuple2(13, 46),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(32, 47))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		39,
		28,
		_Utils_Tuple2(40, 47),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(7, 48))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		40,
		28,
		_Utils_Tuple2(18, 47),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(31, 48)))
	]);
var $pablohirafuji$elm_qrcode$QRCode$GroupInfo$dataQ = _List_fromArray(
	[
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		1,
		13,
		_Utils_Tuple2(1, 13),
		$elm$core$Maybe$Nothing),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		2,
		22,
		_Utils_Tuple2(1, 22),
		$elm$core$Maybe$Nothing),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		3,
		18,
		_Utils_Tuple2(2, 17),
		$elm$core$Maybe$Nothing),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		4,
		26,
		_Utils_Tuple2(2, 24),
		$elm$core$Maybe$Nothing),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		5,
		18,
		_Utils_Tuple2(2, 15),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(2, 16))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		6,
		24,
		_Utils_Tuple2(4, 19),
		$elm$core$Maybe$Nothing),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		7,
		18,
		_Utils_Tuple2(2, 14),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(4, 15))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		8,
		22,
		_Utils_Tuple2(4, 18),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(2, 19))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		9,
		20,
		_Utils_Tuple2(4, 16),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(4, 17))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		10,
		24,
		_Utils_Tuple2(6, 19),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(2, 20))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		11,
		28,
		_Utils_Tuple2(4, 22),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(4, 23))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		12,
		26,
		_Utils_Tuple2(4, 20),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(6, 21))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		13,
		24,
		_Utils_Tuple2(8, 20),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(4, 21))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		14,
		20,
		_Utils_Tuple2(11, 16),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(5, 17))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		15,
		30,
		_Utils_Tuple2(5, 24),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(7, 25))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		16,
		24,
		_Utils_Tuple2(15, 19),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(2, 20))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		17,
		28,
		_Utils_Tuple2(1, 22),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(15, 23))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		18,
		28,
		_Utils_Tuple2(17, 22),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(1, 23))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		19,
		26,
		_Utils_Tuple2(17, 21),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(4, 22))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		20,
		30,
		_Utils_Tuple2(15, 24),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(5, 25))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		21,
		28,
		_Utils_Tuple2(17, 22),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(6, 23))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		22,
		30,
		_Utils_Tuple2(7, 24),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(16, 25))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		23,
		30,
		_Utils_Tuple2(11, 24),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(14, 25))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		24,
		30,
		_Utils_Tuple2(11, 24),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(16, 25))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		25,
		30,
		_Utils_Tuple2(7, 24),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(22, 25))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		26,
		28,
		_Utils_Tuple2(28, 22),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(6, 23))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		27,
		30,
		_Utils_Tuple2(8, 23),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(26, 24))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		28,
		30,
		_Utils_Tuple2(4, 24),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(31, 25))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		29,
		30,
		_Utils_Tuple2(1, 23),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(37, 24))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		30,
		30,
		_Utils_Tuple2(15, 24),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(25, 25))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		31,
		30,
		_Utils_Tuple2(42, 24),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(1, 25))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		32,
		30,
		_Utils_Tuple2(10, 24),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(35, 25))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		33,
		30,
		_Utils_Tuple2(29, 24),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(19, 25))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		34,
		30,
		_Utils_Tuple2(44, 24),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(7, 25))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		35,
		30,
		_Utils_Tuple2(39, 24),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(14, 25))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		36,
		30,
		_Utils_Tuple2(46, 24),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(10, 25))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		37,
		30,
		_Utils_Tuple2(49, 24),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(10, 25))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		38,
		30,
		_Utils_Tuple2(48, 24),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(14, 25))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		39,
		30,
		_Utils_Tuple2(43, 24),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(22, 25))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		40,
		30,
		_Utils_Tuple2(34, 24),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(34, 25)))
	]);
var $pablohirafuji$elm_qrcode$QRCode$GroupInfo$getGroupData = function (ecLevel) {
	switch (ecLevel) {
		case 0:
			return $pablohirafuji$elm_qrcode$QRCode$GroupInfo$dataL;
		case 1:
			return $pablohirafuji$elm_qrcode$QRCode$GroupInfo$dataM;
		case 2:
			return $pablohirafuji$elm_qrcode$QRCode$GroupInfo$dataQ;
		default:
			return $pablohirafuji$elm_qrcode$QRCode$GroupInfo$dataH;
	}
};
var $elm$core$List$sortBy = _List_sortBy;
var $pablohirafuji$elm_qrcode$QRCode$Encode$getVersion = F3(
	function (ecLevel, mode, dataLength) {
		return A2(
			$elm$core$Result$fromMaybe,
			$pablohirafuji$elm_qrcode$QRCode$Error$InputLengthOverflow,
			$elm$core$List$head(
				A2(
					$elm$core$List$sortBy,
					function ($) {
						return $.bv;
					},
					A2(
						$elm$core$List$filter,
						A2($pablohirafuji$elm_qrcode$QRCode$Encode$filterCapacity, mode, dataLength),
						$pablohirafuji$elm_qrcode$QRCode$GroupInfo$getGroupData(ecLevel)))));
	});
var $pablohirafuji$elm_qrcode$QRCode$Encode$versionToModel = F5(
	function (inputStr, ecLevel, mode, partialBitsCount, groupInfo) {
		return {
			b8: partialBitsCount + A2($pablohirafuji$elm_qrcode$QRCode$Encode$charCountIndicatorLength, mode, groupInfo.cN),
			de: ecLevel,
			e4: groupInfo,
			cr: inputStr,
			bK: mode
		};
	});
var $pablohirafuji$elm_qrcode$QRCode$Encode$selectVersion = F4(
	function (inputStr, ecLevel, mode, encodedStr) {
		var partialBitsCount = 4 + A3(
			$elm$core$List$foldl,
			F2(
				function (a, b) {
					return a.b + b;
				}),
			0,
			encodedStr);
		return A2(
			$elm$core$Result$map,
			function (b) {
				return _Utils_Tuple2(encodedStr, b);
			},
			A2(
				$elm$core$Result$map,
				A4($pablohirafuji$elm_qrcode$QRCode$Encode$versionToModel, inputStr, ecLevel, mode, partialBitsCount),
				A3($pablohirafuji$elm_qrcode$QRCode$Encode$getVersion, ecLevel, mode, partialBitsCount)));
	});
var $pablohirafuji$elm_qrcode$QRCode$Encode$breakList = F3(
	function (checkFinish, _v0, _v1) {
		breakList:
		while (true) {
			var times = _v0.a;
			var itemCount = _v0.b;
			var byteList = _v1.a;
			var progress = _v1.b;
			if (times > 0) {
				var remainList = A2($elm$core$List$drop, itemCount, byteList);
				var block = A2($elm$core$List$take, itemCount, byteList);
				var $temp$checkFinish = checkFinish,
					$temp$_v0 = _Utils_Tuple2(times - 1, itemCount),
					$temp$_v1 = _Utils_Tuple2(
					remainList,
					A2($elm$core$List$cons, block, progress));
				checkFinish = $temp$checkFinish;
				_v0 = $temp$_v0;
				_v1 = $temp$_v1;
				continue breakList;
			} else {
				if (checkFinish && ($elm$core$List$length(byteList) > 0)) {
					return $elm$core$Result$Err($pablohirafuji$elm_qrcode$QRCode$Error$InputLengthOverflow);
				} else {
					return $elm$core$Result$Ok(
						_Utils_Tuple2(byteList, progress));
				}
			}
		}
	});
var $pablohirafuji$elm_qrcode$QRCode$Encode$toBlocks = function (_v0) {
	var model = _v0.a;
	var groupInfo = model.e4;
	var byteList = _v0.b;
	var _v1 = groupInfo.fk;
	if (!_v1.$) {
		var group2 = _v1.a;
		return A2(
			$elm$core$Result$map,
			function (b) {
				return _Utils_Tuple2(model, b);
			},
			A2(
				$elm$core$Result$map,
				A2($elm$core$Basics$composeR, $elm$core$Tuple$second, $elm$core$List$reverse),
				A2(
					$elm$core$Result$andThen,
					A2($pablohirafuji$elm_qrcode$QRCode$Encode$breakList, true, group2),
					A3(
						$pablohirafuji$elm_qrcode$QRCode$Encode$breakList,
						false,
						groupInfo.ds,
						_Utils_Tuple2(byteList, _List_Nil)))));
	} else {
		return A2(
			$elm$core$Result$map,
			function (b) {
				return _Utils_Tuple2(model, b);
			},
			A2(
				$elm$core$Result$map,
				A2($elm$core$Basics$composeR, $elm$core$Tuple$second, $elm$core$List$reverse),
				A3(
					$pablohirafuji$elm_qrcode$QRCode$Encode$breakList,
					true,
					groupInfo.ds,
					_Utils_Tuple2(byteList, _List_Nil))));
	}
};
var $pablohirafuji$elm_qrcode$QRCode$Encode$encode = F2(
	function (inputStr, ecLevel) {
		var mode = $pablohirafuji$elm_qrcode$QRCode$Encode$selectMode(inputStr);
		return A2(
			$elm$core$Result$map,
			$pablohirafuji$elm_qrcode$QRCode$Encode$concatTranspose,
			A2(
				$elm$core$Result$andThen,
				$pablohirafuji$elm_qrcode$QRCode$Encode$getErrorCorrection,
				A2(
					$elm$core$Result$andThen,
					$pablohirafuji$elm_qrcode$QRCode$Encode$toBlocks,
					A2(
						$elm$core$Result$map,
						$pablohirafuji$elm_qrcode$QRCode$Encode$addInfoAndFinalBits,
						A2(
							$elm$core$Result$andThen,
							A3($pablohirafuji$elm_qrcode$QRCode$Encode$selectVersion, inputStr, ecLevel, mode),
							A2($pablohirafuji$elm_qrcode$QRCode$Encode$encoder, mode, inputStr))))));
	});
var $pablohirafuji$elm_qrcode$QRCode$fromStringWith = F2(
	function (ecLevel, input) {
		return A2(
			$elm$core$Result$mapError,
			$pablohirafuji$elm_qrcode$QRCode$convertError,
			A2(
				$elm$core$Result$andThen,
				function (_v0) {
					var encodeModel = _v0.a;
					var encodedData = _v0.b;
					return A2(
						$elm$core$Result$map,
						function (matrix) {
							return {bh: matrix, cN: encodeModel.e4.cN};
						},
						$pablohirafuji$elm_qrcode$QRCode$Matrix$apply(
							_Utils_Tuple2(encodeModel, encodedData)));
				},
				A2(
					$pablohirafuji$elm_qrcode$QRCode$Encode$encode,
					input,
					$pablohirafuji$elm_qrcode$QRCode$convertEC(ecLevel))));
	});
var $pablohirafuji$elm_qrcode$QRCode$fromString = $pablohirafuji$elm_qrcode$QRCode$fromStringWith(2);
var $elm$svg$Svg$Attributes$height = _VirtualDom_attribute('height');
var $pablohirafuji$elm_qrcode$QRCode$Render$Svg$moduleSize = 5;
var $pablohirafuji$elm_qrcode$QRCode$Render$Svg$appendLastRect = function (_v0) {
	var lastRect = _v0.a;
	var rowLines = _v0.b;
	return A2(
		$elm$core$List$cons,
		'h' + $elm$core$String$fromInt(lastRect.fX * $pablohirafuji$elm_qrcode$QRCode$Render$Svg$moduleSize),
		rowLines);
};
var $elm$core$String$concat = function (strings) {
	return A2($elm$core$String$join, '', strings);
};
var $elm$svg$Svg$Attributes$d = _VirtualDom_attribute('d');
var $elm$svg$Svg$trustedNode = _VirtualDom_nodeNS('http://www.w3.org/2000/svg');
var $elm$svg$Svg$path = $elm$svg$Svg$trustedNode('path');
var $elm$svg$Svg$Attributes$shapeRendering = _VirtualDom_attribute('shape-rendering');
var $elm$svg$Svg$Attributes$stroke = _VirtualDom_attribute('stroke');
var $elm$svg$Svg$Attributes$strokeWidth = _VirtualDom_attribute('stroke-width');
var $elm$svg$Svg$svg = $elm$svg$Svg$trustedNode('svg');
var $pablohirafuji$elm_qrcode$QRCode$Render$Svg$toRowLines = F2(
	function (isDark, _v0) {
		var lastRect = _v0.a;
		var rowLines = _v0.b;
		return isDark ? ((!lastRect.aq) ? _Utils_Tuple2(
			_Utils_update(
				lastRect,
				{fX: lastRect.fX + 1}),
			rowLines) : _Utils_Tuple2(
			{aq: 0, fX: 1},
			A2(
				$elm$core$List$cons,
				$elm$core$String$concat(
					_List_fromArray(
						[
							(lastRect.fX > 0) ? ('h' + $elm$core$String$fromInt(lastRect.fX * $pablohirafuji$elm_qrcode$QRCode$Render$Svg$moduleSize)) : '',
							'm',
							$elm$core$String$fromInt(lastRect.aq * $pablohirafuji$elm_qrcode$QRCode$Render$Svg$moduleSize),
							' 0'
						])),
				rowLines))) : _Utils_Tuple2(
			_Utils_update(
				lastRect,
				{aq: lastRect.aq + 1}),
			rowLines);
	});
var $elm$svg$Svg$Attributes$transform = _VirtualDom_attribute('transform');
var $elm$svg$Svg$Attributes$viewBox = _VirtualDom_attribute('viewBox');
var $pablohirafuji$elm_qrcode$QRCode$Render$Svg$viewRow = F3(
	function (quietZoneSize, rowIndex, rowLines) {
		return A2(
			$elm$core$List$cons,
			'M0 ',
			A2(
				$elm$core$List$cons,
				$elm$core$String$fromInt(rowIndex * $pablohirafuji$elm_qrcode$QRCode$Render$Svg$moduleSize),
				rowLines));
	});
var $pablohirafuji$elm_qrcode$QRCode$Render$Svg$viewBase = F3(
	function (quietZoneSize, extraAttrs, matrix) {
		var quietZonePx = quietZoneSize * $pablohirafuji$elm_qrcode$QRCode$Render$Svg$moduleSize;
		var sizePx = $elm$core$String$fromInt(
			($elm$core$List$length(matrix) * $pablohirafuji$elm_qrcode$QRCode$Render$Svg$moduleSize) + (2 * quietZonePx));
		return A2(
			$elm$svg$Svg$svg,
			_Utils_ap(
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$viewBox('0 0 ' + (sizePx + (' ' + sizePx))),
						$elm$svg$Svg$Attributes$shapeRendering('crispEdges'),
						$elm$svg$Svg$Attributes$stroke('#000'),
						$elm$svg$Svg$Attributes$strokeWidth(
						$elm$core$String$fromInt($pablohirafuji$elm_qrcode$QRCode$Render$Svg$moduleSize) + 'px')
					]),
				extraAttrs),
			function (d) {
				return _List_fromArray(
					[
						A2(
						$elm$svg$Svg$path,
						_List_fromArray(
							[
								d,
								$elm$svg$Svg$Attributes$transform(
								'translate(' + ($elm$core$String$fromInt(quietZonePx) + (', ' + ($elm$core$String$fromFloat(quietZonePx + ($pablohirafuji$elm_qrcode$QRCode$Render$Svg$moduleSize / 2)) + ')')))),
								$elm$svg$Svg$Attributes$strokeWidth('5px')
							]),
						_List_Nil)
					]);
			}(
				$elm$svg$Svg$Attributes$d(
					$elm$core$String$concat(
						$elm$core$List$concat(
							A2(
								$elm$core$List$indexedMap,
								$pablohirafuji$elm_qrcode$QRCode$Render$Svg$viewRow(quietZoneSize),
								A2(
									$elm$core$List$map,
									A2(
										$elm$core$Basics$composeR,
										A2(
											$elm$core$List$foldl,
											$pablohirafuji$elm_qrcode$QRCode$Render$Svg$toRowLines,
											_Utils_Tuple2(
												{aq: 0, fX: 0},
												_List_Nil)),
										A2($elm$core$Basics$composeR, $pablohirafuji$elm_qrcode$QRCode$Render$Svg$appendLastRect, $elm$core$List$reverse)),
									matrix)))))));
	});
var $pablohirafuji$elm_qrcode$QRCode$Render$Svg$view = $pablohirafuji$elm_qrcode$QRCode$Render$Svg$viewBase(4);
var $pablohirafuji$elm_qrcode$QRCode$toSvg = F2(
	function (extraAttrs, _v0) {
		var matrix = _v0.bh;
		return A2($pablohirafuji$elm_qrcode$QRCode$Render$Svg$view, extraAttrs, matrix);
	});
var $elm$svg$Svg$Attributes$width = _VirtualDom_attribute('width');
var $elm$core$Result$withDefault = F2(
	function (def, result) {
		if (!result.$) {
			var a = result.a;
			return a;
		} else {
			return def;
		}
	});
var $author$project$Pages$Tickets$qrCodeView = function (message) {
	return A2(
		$elm$core$Result$withDefault,
		$rtfeldman$elm_css$Html$Styled$text('Error while encoding to QRCode.'),
		A2(
			$elm$core$Result$map,
			function (a) {
				return $rtfeldman$elm_css$Html$Styled$fromUnstyled(
					A2(
						$pablohirafuji$elm_qrcode$QRCode$toSvg,
						_List_fromArray(
							[
								$elm$svg$Svg$Attributes$width('6.25em'),
								$elm$svg$Svg$Attributes$height('6.25em')
							]),
						a));
			},
			$pablohirafuji$elm_qrcode$QRCode$fromString(message)));
};
var $author$project$Lib$DivTable$fromBody = function (bodyRows) {
	return {eC: bodyRows, bC: _List_Nil};
};
var $author$project$Lib$ListHelpers$mapFML = F2(
	function (_v0, items) {
		var first = _v0.a;
		var middle = _v0.b;
		var last = _v0.c;
		var mapItem = F3(
			function (nrOfItems, index, item) {
				return (!index) ? first(item) : (_Utils_eq(index, nrOfItems) ? last(item) : middle(item));
			});
		return A2(
			$elm$core$List$indexedMap,
			mapItem(
				$elm$core$List$length(items) - 1),
			items);
	});
var $author$project$Lib$ListHelpers$mapML = F2(
	function (_v0, items) {
		var middle = _v0.a;
		var last = _v0.b;
		var mapItem = F3(
			function (nrOfItems, index, item) {
				return _Utils_eq(index, nrOfItems) ? last(item) : middle(item);
			});
		return A2(
			$elm$core$List$indexedMap,
			mapItem(
				$elm$core$List$length(items) - 1),
			items);
	});
var $rtfeldman$elm_css$Css$borderRadius4 = $rtfeldman$elm_css$Css$prop4('border-radius');
var $author$project$Lib$DivTable$renderCell = F2(
	function (tableStyleConfig, cell) {
		var cellStyle = $rtfeldman$elm_css$Css$batch(
			_List_fromArray(
				[
					$rtfeldman$elm_css$Css$display($rtfeldman$elm_css$Css$tableCell),
					tableStyleConfig.aB
				]));
		if (!cell.$) {
			var content = cell.a;
			return A4(
				$rtfeldman$elm_css$Html$Styled$styled,
				$rtfeldman$elm_css$Html$Styled$div,
				_List_fromArray(
					[cellStyle]),
				_List_Nil,
				content);
		} else {
			var style = cell.a;
			var content = cell.b;
			return A4(
				$rtfeldman$elm_css$Html$Styled$styled,
				$rtfeldman$elm_css$Html$Styled$div,
				A2($elm$core$List$cons, cellStyle, style),
				_List_Nil,
				content);
		}
	});
var $author$project$Lib$DivTable$renderCellStyled = F3(
	function (tableStyleConfig, extraStyle, cell) {
		var cellStyle = $rtfeldman$elm_css$Css$batch(
			_List_fromArray(
				[
					$rtfeldman$elm_css$Css$display($rtfeldman$elm_css$Css$tableCell),
					tableStyleConfig.aB
				]));
		if (!cell.$) {
			var content = cell.a;
			return A4(
				$rtfeldman$elm_css$Html$Styled$styled,
				$rtfeldman$elm_css$Html$Styled$div,
				_List_fromArray(
					[cellStyle, extraStyle]),
				_List_Nil,
				content);
		} else {
			var style = cell.a;
			var content = cell.b;
			return A4(
				$rtfeldman$elm_css$Html$Styled$styled,
				$rtfeldman$elm_css$Html$Styled$div,
				_Utils_ap(
					_List_fromArray(
						[cellStyle, extraStyle]),
					style),
				_List_Nil,
				content);
		}
	});
var $author$project$Lib$DivTable$renderFirstRowRounded = F2(
	function (tableStyleConfig, cells) {
		var rowStyle = $rtfeldman$elm_css$Css$batch(
			_List_fromArray(
				[
					$rtfeldman$elm_css$Css$display($rtfeldman$elm_css$Css$tableRow),
					tableStyleConfig.ao
				]));
		var _v0 = tableStyleConfig.ac;
		if (_v0.$ === 1) {
			return A4(
				$rtfeldman$elm_css$Html$Styled$styled,
				$rtfeldman$elm_css$Html$Styled$div,
				_List_fromArray(
					[rowStyle]),
				_List_Nil,
				A2(
					$elm$core$List$map,
					$author$project$Lib$DivTable$renderCell(tableStyleConfig),
					cells));
		} else {
			var x = _v0.a;
			return A4(
				$rtfeldman$elm_css$Html$Styled$styled,
				$rtfeldman$elm_css$Html$Styled$div,
				_List_fromArray(
					[rowStyle]),
				_List_Nil,
				A2(
					$author$project$Lib$ListHelpers$mapFML,
					_Utils_Tuple3(
						A2(
							$author$project$Lib$DivTable$renderCellStyled,
							tableStyleConfig,
							A4(
								$rtfeldman$elm_css$Css$borderRadius4,
								$rtfeldman$elm_css$Css$px(x.b_),
								$rtfeldman$elm_css$Css$zero,
								$rtfeldman$elm_css$Css$zero,
								$rtfeldman$elm_css$Css$zero)),
						$author$project$Lib$DivTable$renderCell(tableStyleConfig),
						A2(
							$author$project$Lib$DivTable$renderCellStyled,
							tableStyleConfig,
							A4(
								$rtfeldman$elm_css$Css$borderRadius4,
								$rtfeldman$elm_css$Css$zero,
								$rtfeldman$elm_css$Css$px(x.b$),
								$rtfeldman$elm_css$Css$zero,
								$rtfeldman$elm_css$Css$zero))),
					cells));
		}
	});
var $author$project$Lib$DivTable$renderLastRowRounded = F2(
	function (tableStyleConfig, cells) {
		var rowStyle = $rtfeldman$elm_css$Css$batch(
			_List_fromArray(
				[
					$rtfeldman$elm_css$Css$display($rtfeldman$elm_css$Css$tableRow),
					tableStyleConfig.ao
				]));
		var _v0 = tableStyleConfig.ac;
		if (_v0.$ === 1) {
			return A4(
				$rtfeldman$elm_css$Html$Styled$styled,
				$rtfeldman$elm_css$Html$Styled$div,
				_List_fromArray(
					[rowStyle]),
				_List_Nil,
				A2(
					$elm$core$List$map,
					$author$project$Lib$DivTable$renderCell(tableStyleConfig),
					cells));
		} else {
			var x = _v0.a;
			return A4(
				$rtfeldman$elm_css$Html$Styled$styled,
				$rtfeldman$elm_css$Html$Styled$div,
				_List_fromArray(
					[rowStyle]),
				_List_Nil,
				A2(
					$author$project$Lib$ListHelpers$mapFML,
					_Utils_Tuple3(
						A2(
							$author$project$Lib$DivTable$renderCellStyled,
							tableStyleConfig,
							A4(
								$rtfeldman$elm_css$Css$borderRadius4,
								$rtfeldman$elm_css$Css$zero,
								$rtfeldman$elm_css$Css$zero,
								$rtfeldman$elm_css$Css$zero,
								$rtfeldman$elm_css$Css$px(x.ca))),
						$author$project$Lib$DivTable$renderCell(tableStyleConfig),
						A2(
							$author$project$Lib$DivTable$renderCellStyled,
							tableStyleConfig,
							A4(
								$rtfeldman$elm_css$Css$borderRadius4,
								$rtfeldman$elm_css$Css$zero,
								$rtfeldman$elm_css$Css$zero,
								$rtfeldman$elm_css$Css$px(x.cb),
								$rtfeldman$elm_css$Css$zero))),
					cells));
		}
	});
var $author$project$Lib$DivTable$renderRow = F2(
	function (tableStyleConfig, cells) {
		var rowStyle = $rtfeldman$elm_css$Css$batch(
			_List_fromArray(
				[
					$rtfeldman$elm_css$Css$display($rtfeldman$elm_css$Css$tableRow),
					tableStyleConfig.ao
				]));
		return A4(
			$rtfeldman$elm_css$Html$Styled$styled,
			$rtfeldman$elm_css$Html$Styled$div,
			_List_fromArray(
				[rowStyle]),
			_List_Nil,
			A2(
				$elm$core$List$map,
				$author$project$Lib$DivTable$renderCell(tableStyleConfig),
				cells));
	});
var $author$project$Lib$DivTable$renderBodyInternal = F3(
	function (withoutHeaders, tableStyleConfig, rows) {
		var _v0 = tableStyleConfig.ac;
		if (_v0.$ === 1) {
			return A2(
				$elm$core$List$map,
				$author$project$Lib$DivTable$renderRow(tableStyleConfig),
				rows);
		} else {
			return withoutHeaders ? A2(
				$author$project$Lib$ListHelpers$mapFML,
				_Utils_Tuple3(
					$author$project$Lib$DivTable$renderFirstRowRounded(tableStyleConfig),
					$author$project$Lib$DivTable$renderRow(tableStyleConfig),
					$author$project$Lib$DivTable$renderLastRowRounded(tableStyleConfig)),
				rows) : A2(
				$author$project$Lib$ListHelpers$mapML,
				_Utils_Tuple2(
					$author$project$Lib$DivTable$renderRow(tableStyleConfig),
					$author$project$Lib$DivTable$renderLastRowRounded(tableStyleConfig)),
				rows);
		}
	});
var $author$project$Lib$DivTable$renderHeaderCell = F2(
	function (tableStyleConfig, cell) {
		var cellStyle = $rtfeldman$elm_css$Css$batch(
			_List_fromArray(
				[
					$rtfeldman$elm_css$Css$display($rtfeldman$elm_css$Css$tableCell),
					tableStyleConfig.bD
				]));
		if (!cell.$) {
			var content = cell.a;
			return A4(
				$rtfeldman$elm_css$Html$Styled$styled,
				$rtfeldman$elm_css$Html$Styled$div,
				_List_fromArray(
					[cellStyle]),
				_List_Nil,
				content);
		} else {
			var style = cell.a;
			var content = cell.b;
			return A4(
				$rtfeldman$elm_css$Html$Styled$styled,
				$rtfeldman$elm_css$Html$Styled$div,
				A2($elm$core$List$cons, cellStyle, style),
				_List_Nil,
				content);
		}
	});
var $author$project$Lib$DivTable$renderHeaderCellStyled = F3(
	function (tableStyleConfig, extraStyle, cell) {
		var cellStyle = $rtfeldman$elm_css$Css$batch(
			_List_fromArray(
				[
					$rtfeldman$elm_css$Css$display($rtfeldman$elm_css$Css$tableCell),
					tableStyleConfig.bD
				]));
		if (!cell.$) {
			var content = cell.a;
			return A4(
				$rtfeldman$elm_css$Html$Styled$styled,
				$rtfeldman$elm_css$Html$Styled$div,
				_List_fromArray(
					[cellStyle, extraStyle]),
				_List_Nil,
				content);
		} else {
			var style = cell.a;
			var content = cell.b;
			return A4(
				$rtfeldman$elm_css$Html$Styled$styled,
				$rtfeldman$elm_css$Html$Styled$div,
				_Utils_ap(
					_List_fromArray(
						[cellStyle, extraStyle]),
					style),
				_List_Nil,
				content);
		}
	});
var $author$project$Lib$DivTable$renderHeader = F2(
	function (tableStyleConfig, cells) {
		var headerStyle = $rtfeldman$elm_css$Css$batch(
			_List_fromArray(
				[
					$rtfeldman$elm_css$Css$display($rtfeldman$elm_css$Css$tableRow),
					tableStyleConfig.bc
				]));
		if (!cells.b) {
			return $rtfeldman$elm_css$Html$Styled$text('');
		} else {
			var _v1 = tableStyleConfig.ac;
			if (_v1.$ === 1) {
				return A4(
					$rtfeldman$elm_css$Html$Styled$styled,
					$rtfeldman$elm_css$Html$Styled$div,
					_List_fromArray(
						[headerStyle]),
					_List_Nil,
					A2(
						$elm$core$List$map,
						$author$project$Lib$DivTable$renderHeaderCell(tableStyleConfig),
						cells));
			} else {
				var x = _v1.a;
				return A4(
					$rtfeldman$elm_css$Html$Styled$styled,
					$rtfeldman$elm_css$Html$Styled$div,
					_List_fromArray(
						[headerStyle]),
					_List_Nil,
					A2(
						$author$project$Lib$ListHelpers$mapFML,
						_Utils_Tuple3(
							A2(
								$author$project$Lib$DivTable$renderHeaderCellStyled,
								tableStyleConfig,
								A4(
									$rtfeldman$elm_css$Css$borderRadius4,
									$rtfeldman$elm_css$Css$px(x.b_),
									$rtfeldman$elm_css$Css$zero,
									$rtfeldman$elm_css$Css$zero,
									$rtfeldman$elm_css$Css$zero)),
							$author$project$Lib$DivTable$renderHeaderCell(tableStyleConfig),
							A2(
								$author$project$Lib$DivTable$renderHeaderCellStyled,
								tableStyleConfig,
								A4(
									$rtfeldman$elm_css$Css$borderRadius4,
									$rtfeldman$elm_css$Css$zero,
									$rtfeldman$elm_css$Css$px(x.b$),
									$rtfeldman$elm_css$Css$zero,
									$rtfeldman$elm_css$Css$zero))),
						cells));
			}
		}
	});
var $author$project$Lib$DivTable$render = F2(
	function (tableStyleConfig, table) {
		var withoutHeaders = $elm$core$List$isEmpty(table.bC);
		var tableStyle = $rtfeldman$elm_css$Css$batch(
			_List_fromArray(
				[
					$rtfeldman$elm_css$Css$display($rtfeldman$elm_css$Css$table),
					tableStyleConfig.bl
				]));
		return A4(
			$rtfeldman$elm_css$Html$Styled$styled,
			$rtfeldman$elm_css$Html$Styled$div,
			_List_fromArray(
				[tableStyle]),
			_List_Nil,
			A2(
				$elm$core$List$cons,
				A2($author$project$Lib$DivTable$renderHeader, tableStyleConfig, table.bC),
				A3($author$project$Lib$DivTable$renderBodyInternal, withoutHeaders, tableStyleConfig, table.eC)));
	});
var $author$project$Lib$DivTable$renderBody = F2(
	function (tableStyleConfig, body) {
		return A2(
			$author$project$Lib$DivTable$render,
			tableStyleConfig,
			$author$project$Lib$DivTable$fromBody(body));
	});
var $author$project$Pages$Tickets$ticketView = F5(
	function (device, name, orderNr, index, ticket) {
		var numberString = orderNr + ('-' + ticket.dv);
		var evt = $author$project$Domain$Event$theEvent;
		if (device === 1) {
			return A2(
				$author$project$Lib$DivTable$renderBody,
				A2(
					$author$project$Lib$DivTable$customizeCellStyle,
					_List_fromArray(
						[
							$rtfeldman$elm_css$Css$width(
							$rtfeldman$elm_css$Css$pct(100))
						]),
					A2(
						$author$project$Lib$DivTable$customizeTableStyle,
						_Utils_ap(
							_List_fromArray(
								[
									$rtfeldman$elm_css$Css$width(
									$rtfeldman$elm_css$Css$vw(80)),
									$rtfeldman$elm_css$Css$maxWidth(
									$rtfeldman$elm_css$Css$vw(80)),
									$rtfeldman$elm_css$Css$margin($rtfeldman$elm_css$Css$auto),
									$rtfeldman$elm_css$Css$whiteSpace($rtfeldman$elm_css$Css$noWrap),
									A3(
									$rtfeldman$elm_css$Css$borderBottom3,
									$rtfeldman$elm_css$Css$em(0.1),
									$rtfeldman$elm_css$Css$dashed,
									$rtfeldman$elm_css$Css$hex('000')),
									$rtfeldman$elm_css$Css$borderCollapse($rtfeldman$elm_css$Css$collapse)
								]),
							(!index) ? _List_fromArray(
								[
									A3(
									$rtfeldman$elm_css$Css$borderTop3,
									$rtfeldman$elm_css$Css$em(0.1),
									$rtfeldman$elm_css$Css$dashed,
									$rtfeldman$elm_css$Css$hex('000'))
								]) : _List_Nil),
						$author$project$Lib$DivTable$emptyStyle)),
				_List_fromArray(
					[
						_List_fromArray(
						[
							$author$project$Lib$DivTable$Cell(
							_List_fromArray(
								[
									A2(
									$author$project$Lib$DivTable$renderBody,
									$author$project$Lib$DivTable$emptyStyle,
									_List_fromArray(
										[
											_List_fromArray(
											[
												$author$project$Lib$DivTable$Cell(
												_List_fromArray(
													[
														A2(
														$rtfeldman$elm_css$Html$Styled$h1,
														_List_Nil,
														_List_fromArray(
															[
																$rtfeldman$elm_css$Html$Styled$text(evt.dK)
															]))
													]))
											]),
											_List_fromArray(
											[
												$author$project$Lib$DivTable$Cell(
												_List_fromArray(
													[
														A4(
														$rtfeldman$elm_css$Html$Styled$styled,
														$rtfeldman$elm_css$Html$Styled$h3,
														_List_fromArray(
															[
																$rtfeldman$elm_css$Css$marginBottom(
																$rtfeldman$elm_css$Css$em(0.25))
															]),
														_List_Nil,
														_List_fromArray(
															[
																$rtfeldman$elm_css$Html$Styled$text(
																$author$project$Domain$Event$dateTimeString(evt))
															]))
													]))
											]),
											_List_fromArray(
											[
												$author$project$Lib$DivTable$Cell(
												_List_fromArray(
													[
														$rtfeldman$elm_css$Html$Styled$text(evt.cS)
													]))
											]),
											_List_fromArray(
											[
												A2(
												$author$project$Lib$DivTable$StyledCell,
												_List_fromArray(
													[
														$rtfeldman$elm_css$Css$paddingTop(
														$rtfeldman$elm_css$Css$em(1.75)),
														$rtfeldman$elm_css$Css$paddingBottom(
														$rtfeldman$elm_css$Css$em(0.735))
													]),
												_List_fromArray(
													[
														$rtfeldman$elm_css$Html$Styled$text(name)
													]))
											])
										]))
								])),
							$author$project$Lib$DivTable$Cell(
							_List_fromArray(
								[
									A2(
									$author$project$Lib$DivTable$renderBody,
									A2(
										$author$project$Lib$DivTable$customizeTableStyle,
										_List_fromArray(
											[
												$rtfeldman$elm_css$Css$textAlign($rtfeldman$elm_css$Css$right)
											]),
										$author$project$Lib$DivTable$emptyStyle),
									_List_fromArray(
										[
											_List_fromArray(
											[
												A2(
												$author$project$Lib$DivTable$StyledCell,
												_List_fromArray(
													[
														$rtfeldman$elm_css$Css$paddingRight(
														$rtfeldman$elm_css$Css$em(1.25))
													]),
												_List_fromArray(
													[
														$rtfeldman$elm_css$Html$Styled$text(
														ticket.eS + (' - €' + A2($myrho$elm_round$Round$round, 2, ticket.fu)))
													]))
											]),
											_List_fromArray(
											[
												$author$project$Lib$DivTable$Cell(
												_List_fromArray(
													[
														$author$project$Pages$Tickets$qrCodeView(numberString)
													]))
											]),
											_List_fromArray(
											[
												A2(
												$author$project$Lib$DivTable$StyledCell,
												_List_fromArray(
													[
														$rtfeldman$elm_css$Css$paddingRight(
														$rtfeldman$elm_css$Css$em(1.25))
													]),
												_List_fromArray(
													[
														$rtfeldman$elm_css$Html$Styled$text(numberString)
													]))
											])
										]))
								]))
						])
					]));
		} else {
			return A2(
				$author$project$Lib$DivTable$renderBody,
				A2(
					$author$project$Lib$DivTable$customizeCellStyle,
					_List_fromArray(
						[
							$rtfeldman$elm_css$Css$width(
							$rtfeldman$elm_css$Css$pct(100))
						]),
					A2(
						$author$project$Lib$DivTable$customizeTableStyle,
						_Utils_ap(
							_List_fromArray(
								[
									$rtfeldman$elm_css$Css$width(
									$rtfeldman$elm_css$Css$vw(80)),
									$rtfeldman$elm_css$Css$maxWidth(
									$rtfeldman$elm_css$Css$vw(80)),
									$rtfeldman$elm_css$Css$margin($rtfeldman$elm_css$Css$auto),
									$rtfeldman$elm_css$Css$whiteSpace($rtfeldman$elm_css$Css$noWrap),
									A3(
									$rtfeldman$elm_css$Css$borderBottom3,
									$rtfeldman$elm_css$Css$em(0.1),
									$rtfeldman$elm_css$Css$dashed,
									$rtfeldman$elm_css$Css$hex('000')),
									$rtfeldman$elm_css$Css$borderCollapse($rtfeldman$elm_css$Css$collapse)
								]),
							(!index) ? _List_fromArray(
								[
									A3(
									$rtfeldman$elm_css$Css$borderTop3,
									$rtfeldman$elm_css$Css$em(0.1),
									$rtfeldman$elm_css$Css$dashed,
									$rtfeldman$elm_css$Css$hex('000'))
								]) : _List_Nil),
						$author$project$Lib$DivTable$emptyStyle)),
				_List_fromArray(
					[
						_List_fromArray(
						[
							$author$project$Lib$DivTable$Cell(
							_List_fromArray(
								[
									A2(
									$author$project$Lib$DivTable$renderBody,
									$author$project$Lib$DivTable$emptyStyle,
									_List_fromArray(
										[
											_List_fromArray(
											[
												$author$project$Lib$DivTable$Cell(
												_List_fromArray(
													[
														A2(
														$rtfeldman$elm_css$Html$Styled$h1,
														_List_Nil,
														_List_fromArray(
															[
																$rtfeldman$elm_css$Html$Styled$text(evt.dK)
															]))
													]))
											]),
											_List_fromArray(
											[
												$author$project$Lib$DivTable$Cell(
												_List_fromArray(
													[
														A4(
														$rtfeldman$elm_css$Html$Styled$styled,
														$rtfeldman$elm_css$Html$Styled$h3,
														_List_fromArray(
															[
																$rtfeldman$elm_css$Css$marginBottom(
																$rtfeldman$elm_css$Css$em(0.25))
															]),
														_List_Nil,
														_List_fromArray(
															[
																$rtfeldman$elm_css$Html$Styled$text(
																$author$project$Domain$Event$dateTimeString(evt))
															]))
													]))
											]),
											_List_fromArray(
											[
												$author$project$Lib$DivTable$Cell(
												_List_fromArray(
													[
														$rtfeldman$elm_css$Html$Styled$text(evt.cS)
													]))
											]),
											_List_fromArray(
											[
												A2(
												$author$project$Lib$DivTable$StyledCell,
												_List_fromArray(
													[
														$rtfeldman$elm_css$Css$paddingTop(
														$rtfeldman$elm_css$Css$em(1.75)),
														$rtfeldman$elm_css$Css$paddingBottom(
														$rtfeldman$elm_css$Css$em(0.735))
													]),
												_List_fromArray(
													[
														$rtfeldman$elm_css$Html$Styled$text(name)
													]))
											])
										]))
								]))
						]),
						_List_fromArray(
						[
							$author$project$Lib$DivTable$Cell(
							_List_fromArray(
								[
									A2(
									$author$project$Lib$DivTable$renderBody,
									A2(
										$author$project$Lib$DivTable$customizeTableStyle,
										_List_fromArray(
											[
												$rtfeldman$elm_css$Css$textAlign($rtfeldman$elm_css$Css$center),
												A2($rtfeldman$elm_css$Css$margin2, $rtfeldman$elm_css$Css$zero, $rtfeldman$elm_css$Css$auto)
											]),
										$author$project$Lib$DivTable$emptyStyle),
									_List_fromArray(
										[
											_List_fromArray(
											[
												A2(
												$author$project$Lib$DivTable$StyledCell,
												_List_fromArray(
													[
														$rtfeldman$elm_css$Css$paddingRight(
														$rtfeldman$elm_css$Css$em(1.25))
													]),
												_List_fromArray(
													[
														$rtfeldman$elm_css$Html$Styled$text(
														ticket.eS + (' - €' + A2($myrho$elm_round$Round$round, 2, ticket.fu)))
													]))
											]),
											_List_fromArray(
											[
												$author$project$Lib$DivTable$Cell(
												_List_fromArray(
													[
														$author$project$Pages$Tickets$qrCodeView(numberString)
													]))
											]),
											_List_fromArray(
											[
												A2(
												$author$project$Lib$DivTable$StyledCell,
												_List_fromArray(
													[
														$rtfeldman$elm_css$Css$paddingRight(
														$rtfeldman$elm_css$Css$em(1.25))
													]),
												_List_fromArray(
													[
														$rtfeldman$elm_css$Html$Styled$text(numberString)
													]))
											])
										]))
								]))
						])
					]));
		}
	});
var $author$project$Pages$Tickets$ticketsView = F4(
	function (device, name, orderNr, tickets) {
		return A2(
			$elm$core$List$indexedMap,
			A3($author$project$Pages$Tickets$ticketView, device, name, orderNr),
			tickets);
	});
var $author$project$Pages$Tickets$view = F2(
	function (shared, model) {
		var _v0 = model.bN;
		if (_v0.$ === 1) {
			return $rtfeldman$elm_css$Html$Styled$text('');
		} else {
			var orderInfo = _v0.a;
			return (!model.bI) ? A2(
				$rtfeldman$elm_css$Html$Styled$h1,
				_List_Nil,
				_List_fromArray(
					[
						$rtfeldman$elm_css$Html$Styled$text('404 : Page Not Found')
					])) : A2(
				$rtfeldman$elm_css$Html$Styled$div,
				_List_Nil,
				_List_fromArray(
					[
						A4(
						$rtfeldman$elm_css$Html$Styled$styled,
						$rtfeldman$elm_css$Html$Styled$div,
						$author$project$Style$container,
						_List_Nil,
						A4($author$project$Pages$Tickets$ticketsView, shared.eT, orderInfo.eG + (' ' + orderInfo.fh), orderInfo.dv, orderInfo.fM))
					]));
		}
	});
var $author$project$Helmsman$view = F2(
	function (shared, model) {
		switch (model.$) {
			case 0:
				return A2(
					$rtfeldman$elm_css$Html$Styled$h1,
					_List_Nil,
					_List_fromArray(
						[
							$rtfeldman$elm_css$Html$Styled$text('404 : Page Not Found')
						]));
			case 1:
				return A2(
					$rtfeldman$elm_css$Html$Styled$h1,
					_List_Nil,
					_List_fromArray(
						[
							$rtfeldman$elm_css$Html$Styled$text('Loading Data')
						]));
			case 2:
				var page = model.a;
				return A2(
					$rtfeldman$elm_css$Html$Styled$map,
					$author$project$Helmsman$HomeMsg,
					A2($author$project$Pages$Home$view, shared, page));
			case 3:
				var page = model.a;
				return A2(
					$rtfeldman$elm_css$Html$Styled$map,
					$author$project$Helmsman$OrderTicketsMsg,
					A2($author$project$Pages$OrderTickets$view, shared, page));
			case 4:
				var page = model.a;
				return A2(
					$rtfeldman$elm_css$Html$Styled$map,
					$author$project$Helmsman$PaymentSuccessMsg,
					A2($author$project$Pages$PaymentSuccess$view, shared, page));
			case 5:
				var page = model.a;
				return A2(
					$rtfeldman$elm_css$Html$Styled$map,
					$author$project$Helmsman$PaymentMsg,
					A2($author$project$Pages$Payment$view, shared, page));
			case 6:
				var page = model.a;
				return A2(
					$rtfeldman$elm_css$Html$Styled$map,
					$author$project$Helmsman$TeesAndCeesMsg,
					A2($author$project$Pages$TeesAndCees$view, shared, page));
			case 7:
				var page = model.a;
				return A2(
					$rtfeldman$elm_css$Html$Styled$map,
					$author$project$Helmsman$InvoiceInfoMsg,
					A2($author$project$Pages$InvoiceInfo$view, shared, page));
			case 8:
				var page = model.a;
				return A2(
					$rtfeldman$elm_css$Html$Styled$map,
					$author$project$Helmsman$TicketsMsg,
					A2($author$project$Pages$Tickets$view, shared, page));
			default:
				var page = model.a;
				return A2(
					$rtfeldman$elm_css$Html$Styled$map,
					$author$project$Helmsman$OrderTicketsTempMsg,
					A2($author$project$Pages$OrderTicketsTemp$view, shared, page));
		}
	});
var $author$project$App$view = function (model) {
	var mainFont = function () {
		var fontSize = function () {
			var _v1 = model.B.eT;
			if (!_v1) {
				return $rtfeldman$elm_css$Css$px(16);
			} else {
				return $rtfeldman$elm_css$Css$px(16);
			}
		}();
		return _List_fromArray(
			[
				$rtfeldman$elm_css$Css$fontFamilies($author$project$Style$theme.e1),
				$rtfeldman$elm_css$Css$fontSize(fontSize),
				$rtfeldman$elm_css$Css$fontWeight($rtfeldman$elm_css$Css$normal)
			]);
	}();
	var _v0 = model.B.eZ;
	if (_v0.$ === 1) {
		return A4(
			$rtfeldman$elm_css$Html$Styled$styled,
			$rtfeldman$elm_css$Html$Styled$div,
			mainFont,
			_List_Nil,
			_List_fromArray(
				[
					A2(
					$rtfeldman$elm_css$Html$Styled$map,
					$author$project$App$HelmsmanMsg,
					A2($author$project$Helmsman$view, model.B, model.aP))
				]));
	} else {
		var err = _v0.a;
		return $rtfeldman$elm_css$Html$Styled$text(
			$author$project$App$errorToString(err));
	}
};
var $author$project$App$main = $elm$browser$Browser$application(
	{
		fe: $author$project$App$init,
		fq: $author$project$App$UrlChanged,
		fr: $author$project$App$LinkClicked,
		fI: function (m) {
			return $elm$core$Platform$Sub$batch(
				_List_fromArray(
					[
						A2(
						$elm$core$Platform$Sub$map,
						$author$project$App$SharedMsg,
						$author$project$Shared$subscriptions(m.B)),
						A2(
						$elm$core$Platform$Sub$map,
						$author$project$App$HelmsmanMsg,
						$author$project$Helmsman$subscriptions(m.aP))
					]));
		},
		fR: $author$project$App$update,
		fU: function (model) {
			return {
				eC: _List_fromArray(
					[
						$rtfeldman$elm_css$Html$Styled$toUnstyled(
						$author$project$App$view(model))
					]),
				fO: 'Events'
			};
		}
	});
_Platform_export({'App':{'init':$author$project$App$main($elm$json$Json$Decode$string)(0)}});}(this));