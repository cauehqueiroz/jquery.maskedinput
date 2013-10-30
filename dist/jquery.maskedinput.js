/*
    jQuery Masked Input Plugin
    Copyright (c) 2007 - 2013 Josh Bush (digitalbush.com)
    Licensed under the MIT license (http://digitalbush.com/projects/masked-input-plugin/#license)
    Version: 1.3.0
*/
!function(a) {
    function b() {
        var a = document.createElement("input"), b = "onpaste";
        return a.setAttribute(b, ""), "function" == typeof a[b] ? "paste" : "input";
    }
    var c, d = b() + ".mask", e = navigator.userAgent, f = /iphone/i.test(e), g = /chrome/i.test(e), h = /android/i.test(e);
    a.mask = {
        definitions: {
            "9": "[0-9]",
            a: "[A-Za-z]",
            "*": "[A-Za-z0-9]"
        },
        dataName: "rawMaskFn",
        placeholder: "_"
    }, a.fn.extend({
        caret: function(a, b) {
            var c;
            if (0 !== this.length && !this.is(":hidden")) return "number" == typeof a ? (b = "number" == typeof b ? b : a, 
            this.each(function() {
                this.setSelectionRange ? this.setSelectionRange(a, b) : this.createTextRange && (c = this.createTextRange(), 
                c.collapse(!0), c.moveEnd("character", b), c.moveStart("character", a), c.select());
            })) : (this[0].setSelectionRange ? (a = this[0].selectionStart, b = this[0].selectionEnd) : document.selection && document.selection.createRange && (c = document.selection.createRange(), 
            a = 0 - c.duplicate().moveStart("character", -1e5), b = a + c.text.length), {
                begin: a,
                end: b
            });
        },
        unmask: function() {
            return this.trigger("unmask");
        },
        mask: function(b, e) {
            var i, j, k, l, m, n;
            return !b && this.length > 0 ? (i = a(this[0]), i.data(a.mask.dataName)()) : (e = a.extend({
                placeholder: a.mask.placeholder,
                completed: null
            }, e), j = a.mask.definitions, k = [], l = n = b.length, m = null, a.each(b.split(""), function(a, b) {
                "?" == b ? (n--, l = a) : j[b] ? (k.push(new RegExp(j[b])), null === m && (m = k.length - 1)) : k.push(null);
            }), this.trigger("unmask").each(function() {
                function i(a) {
                    for (;++a < n && !k[a]; ) ;
                    return a;
                }
                function o(a) {
                    for (;--a >= 0 && !k[a]; ) ;
                    return a;
                }
                function p(a, b) {
                    var c, d;
                    if (!(0 > a)) {
                        for (c = a, d = i(b); n > c; c++) if (k[c]) {
                            if (!(n > d && k[c].test(x[d]))) break;
                            x[c] = x[d], x[d] = e.placeholder, d = i(d);
                        }
                        u(), w.caret(Math.max(m, a));
                    }
                }
                function q(a) {
                    var b, c, d, f;
                    for (b = a, c = e.placeholder; n > b; b++) if (k[b]) {
                        if (d = i(b), f = x[b], x[b] = c, !(n > d && k[d].test(f))) break;
                        c = f;
                    }
                }
                function r(a) {
                    var b, c, d, e = a.which;
                    8 === e || 46 === e || f && 127 === e ? (b = w.caret(), c = b.begin, d = b.end, 
                    0 === d - c && (c = 46 !== e ? o(c) : d = i(c - 1), d = 46 === e ? i(d) : d), t(c, d), 
                    p(c, d - 1), a.preventDefault()) : 27 == e && (w.val(y), w.caret(0, v()), a.preventDefault());
                }
                function s(b) {
                    var c, d, f, g = b.which, j = w.caret();
                    if (0 == g) {
                        if (j.begin >= n) return w.val(w.val().substr(0, n)), b.preventDefault(), !1;
                        j.begin == j.end && (g = w.val().charCodeAt(j.begin - 1), j.begin--, j.end--);
                    }
                    b.ctrlKey || b.altKey || b.metaKey || 32 > g || g && (0 !== j.end - j.begin && (t(j.begin, j.end), 
                    p(j.begin, j.end - 1)), c = i(j.begin - 1), n > c && (d = String.fromCharCode(g), 
                    k[c].test(d) && (q(c), x[c] = d, u(), f = i(c), h ? setTimeout(a.proxy(a.fn.caret, w, f), 0) : w.caret(f), 
                    e.completed && f >= n && e.completed.call(w))), b.preventDefault());
                }
                function t(a, b) {
                    var c;
                    for (c = a; b > c && n > c; c++) k[c] && (x[c] = e.placeholder);
                }
                function u() {
                    w.val(x.join(""));
                }
                function v(a) {
                    var b, c, d, f = w.val(), g = -1;
                    for (b = 0, d = 0; n > b; b++) if (k[b]) {
                        for (x[b] = e.placeholder; d++ < f.length; ) if (c = f.charAt(d - 1), k[b].test(c)) {
                            x[b] = c, g = b;
                            break;
                        }
                        if (d > f.length) break;
                    } else x[b] === f.charAt(d) && b !== l && (d++, g = b);
                    return a ? u() : l > g + 1 ? (w.val(""), t(0, n)) : (u(), w.val(w.val().substring(0, g + 1))), 
                    l ? b : m;
                }
                var w = a(this), x = a.map(b.split(""), function(a) {
                    return "?" != a ? j[a] ? e.placeholder : a : void 0;
                }), y = w.val();
                w.data(a.mask.dataName, function() {
                    return a.map(x, function(a, b) {
                        return k[b] && a != e.placeholder ? a : null;
                    }).join("");
                }), w.attr("readonly") || w.one("unmask", function() {
                    w.unbind(".mask").removeData(a.mask.dataName);
                }).bind("focus.mask", function() {
                    clearTimeout(c);
                    var a;
                    y = w.val(), a = v(), c = setTimeout(function() {
                        u(), a == b.length ? w.caret(0, a) : w.caret(a);
                    }, 10);
                }).bind("blur.mask", function() {
                    v(), w.val() != y && w.change();
                }).bind("keydown.mask", r).bind("keypress.mask", s).bind(d, function() {
                    setTimeout(function() {
                        var a = v(!0);
                        w.caret(a), e.completed && a == w.val().length && e.completed.call(w);
                    }, 0);
                }), g && h && w.bind("keyup.mask", s), v();
            }));
        }
    });
}(jQuery);