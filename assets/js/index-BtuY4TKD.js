const __vite__mapDeps = (
  i,
  m = __vite__mapDeps,
  d = m.f ||
    (m.f = [
      "assets/js/HomePage-B3lL-twH.js",
      "assets/js/vendor-ui-Db6t6WVF.js",
      "assets/js/vendor-react-CDe1t649.js",
      "assets/js/vendor-leaflet-CtNNul9z.js",
      "assets/js/vendor-supabase-BUo_ywwZ.js",
      "assets/css/HomePage-lDzrbhio.css",
      "assets/js/LoginPage-RfQLUCI4.js",
      "assets/js/AuthForm-DZcghAuT.js",
      "assets/js/RegisterPage-bxGe1Bgj.js",
      "assets/js/SellerDashboardPage-CwKrwNx2.js",
      "assets/js/StandDetailPage-DG4_j9gE.js",
      "assets/js/ProductDetailPage-CYIfGUt6.js",
      "assets/js/NotFoundPage-A3nuzRUi.js",
      "assets/js/SellerRegistrationPage-jvfUM4E_.js",
      "assets/js/ComponentShowcase-dVAFDBrC.js",
      "assets/js/SupabaseTest-DMRb0bvf.js",
    ])
) => i.map((i) => d[i]);
import { j as e, P as t, B as n, L as r } from "./vendor-ui-Db6t6WVF.js";
import {
  r as a,
  a as l,
  g as o,
  N as i,
  O as u,
  u as s,
  L as c,
  B as d,
  d as f,
  e as p,
  R as m,
} from "./vendor-react-CDe1t649.js";
import { c as h, _ as g } from "./vendor-supabase-BUo_ywwZ.js";
!(function () {
  const e = document.createElement("link").relList;
  if (!(e && e.supports && e.supports("modulepreload"))) {
    for (const e of document.querySelectorAll('link[rel="modulepreload"]'))
      t(e);
    new MutationObserver((e) => {
      for (const n of e)
        if ("childList" === n.type)
          for (const e of n.addedNodes)
            "LINK" === e.tagName && "modulepreload" === e.rel && t(e);
    }).observe(document, { childList: !0, subtree: !0 });
  }
  function t(e) {
    if (e.ep) return;
    e.ep = !0;
    const t = (function (e) {
      const t = {};
      return (
        e.integrity && (t.integrity = e.integrity),
        e.referrerPolicy && (t.referrerPolicy = e.referrerPolicy),
        "use-credentials" === e.crossOrigin
          ? (t.credentials = "include")
          : "anonymous" === e.crossOrigin
          ? (t.credentials = "omit")
          : (t.credentials = "same-origin"),
        t
      );
    })(e);
    fetch(e.href, t);
  }
})();
var y = { exports: {} },
  v = {},
  b = { exports: {} },
  k = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
!(function (e) {
  function t(e, t) {
    var n = e.length;
    e.push(t);
    e: for (; 0 < n; ) {
      var r = (n - 1) >>> 1,
        l = e[r];
      if (!(0 < a(l, t))) break e;
      (e[r] = t), (e[n] = l), (n = r);
    }
  }
  function n(e) {
    return 0 === e.length ? null : e[0];
  }
  function r(e) {
    if (0 === e.length) return null;
    var t = e[0],
      n = e.pop();
    if (n !== t) {
      e[0] = n;
      e: for (var r = 0, l = e.length, o = l >>> 1; r < o; ) {
        var i = 2 * (r + 1) - 1,
          u = e[i],
          s = i + 1,
          c = e[s];
        if (0 > a(u, n))
          s < l && 0 > a(c, u)
            ? ((e[r] = c), (e[s] = n), (r = s))
            : ((e[r] = u), (e[i] = n), (r = i));
        else {
          if (!(s < l && 0 > a(c, n))) break e;
          (e[r] = c), (e[s] = n), (r = s);
        }
      }
    }
    return t;
  }
  function a(e, t) {
    var n = e.sortIndex - t.sortIndex;
    return 0 !== n ? n : e.id - t.id;
  }
  if (
    ((e.unstable_now = void 0),
    "object" == typeof performance && "function" == typeof performance.now)
  ) {
    var l = performance;
    e.unstable_now = function () {
      return l.now();
    };
  } else {
    var o = Date,
      i = o.now();
    e.unstable_now = function () {
      return o.now() - i;
    };
  }
  var u = [],
    s = [],
    c = 1,
    d = null,
    f = 3,
    p = !1,
    m = !1,
    h = !1,
    g = !1,
    y = "function" == typeof setTimeout ? setTimeout : null,
    v = "function" == typeof clearTimeout ? clearTimeout : null,
    b = "undefined" != typeof setImmediate ? setImmediate : null;
  function k(e) {
    for (var a = n(s); null !== a; ) {
      if (null === a.callback) r(s);
      else {
        if (!(a.startTime <= e)) break;
        r(s), (a.sortIndex = a.expirationTime), t(u, a);
      }
      a = n(s);
    }
  }
  function w(e) {
    if (((h = !1), k(e), !m))
      if (null !== n(u)) (m = !0), x || ((x = !0), S());
      else {
        var t = n(s);
        null !== t && T(w, t.startTime - e);
      }
  }
  var S,
    x = !1,
    E = -1,
    C = 5,
    P = -1;
  function N() {
    return !!g || !(e.unstable_now() - P < C);
  }
  function z() {
    if (((g = !1), x)) {
      var t = e.unstable_now();
      P = t;
      var a = !0;
      try {
        e: {
          (m = !1), h && ((h = !1), v(E), (E = -1)), (p = !0);
          var l = f;
          try {
            t: {
              for (
                k(t), d = n(u);
                null !== d && !(d.expirationTime > t && N());

              ) {
                var o = d.callback;
                if ("function" == typeof o) {
                  (d.callback = null), (f = d.priorityLevel);
                  var i = o(d.expirationTime <= t);
                  if (((t = e.unstable_now()), "function" == typeof i)) {
                    (d.callback = i), k(t), (a = !0);
                    break t;
                  }
                  d === n(u) && r(u), k(t);
                } else r(u);
                d = n(u);
              }
              if (null !== d) a = !0;
              else {
                var c = n(s);
                null !== c && T(w, c.startTime - t), (a = !1);
              }
            }
            break e;
          } finally {
            (d = null), (f = l), (p = !1);
          }
          a = void 0;
        }
      } finally {
        a ? S() : (x = !1);
      }
    }
  }
  if ("function" == typeof b)
    S = function () {
      b(z);
    };
  else if ("undefined" != typeof MessageChannel) {
    var _ = new MessageChannel(),
      L = _.port2;
    (_.port1.onmessage = z),
      (S = function () {
        L.postMessage(null);
      });
  } else
    S = function () {
      y(z, 0);
    };
  function T(t, n) {
    E = y(function () {
      t(e.unstable_now());
    }, n);
  }
  (e.unstable_IdlePriority = 5),
    (e.unstable_ImmediatePriority = 1),
    (e.unstable_LowPriority = 4),
    (e.unstable_NormalPriority = 3),
    (e.unstable_Profiling = null),
    (e.unstable_UserBlockingPriority = 2),
    (e.unstable_cancelCallback = function (e) {
      e.callback = null;
    }),
    (e.unstable_forceFrameRate = function (e) {
      0 > e || 125 < e || (C = 0 < e ? Math.floor(1e3 / e) : 5);
    }),
    (e.unstable_getCurrentPriorityLevel = function () {
      return f;
    }),
    (e.unstable_next = function (e) {
      switch (f) {
        case 1:
        case 2:
        case 3:
          var t = 3;
          break;
        default:
          t = f;
      }
      var n = f;
      f = t;
      try {
        return e();
      } finally {
        f = n;
      }
    }),
    (e.unstable_requestPaint = function () {
      g = !0;
    }),
    (e.unstable_runWithPriority = function (e, t) {
      switch (e) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          e = 3;
      }
      var n = f;
      f = e;
      try {
        return t();
      } finally {
        f = n;
      }
    }),
    (e.unstable_scheduleCallback = function (r, a, l) {
      var o = e.unstable_now();
      switch (
        ("object" == typeof l && null !== l
          ? (l = "number" == typeof (l = l.delay) && 0 < l ? o + l : o)
          : (l = o),
        r)
      ) {
        case 1:
          var i = -1;
          break;
        case 2:
          i = 250;
          break;
        case 5:
          i = 1073741823;
          break;
        case 4:
          i = 1e4;
          break;
        default:
          i = 5e3;
      }
      return (
        (r = {
          id: c++,
          callback: a,
          priorityLevel: r,
          startTime: l,
          expirationTime: (i = l + i),
          sortIndex: -1,
        }),
        l > o
          ? ((r.sortIndex = l),
            t(s, r),
            null === n(u) &&
              r === n(s) &&
              (h ? (v(E), (E = -1)) : (h = !0), T(w, l - o)))
          : ((r.sortIndex = i),
            t(u, r),
            m || p || ((m = !0), x || ((x = !0), S()))),
        r
      );
    }),
    (e.unstable_shouldYield = N),
    (e.unstable_wrapCallback = function (e) {
      var t = f;
      return function () {
        var n = f;
        f = t;
        try {
          return e.apply(this, arguments);
        } finally {
          f = n;
        }
      };
    });
})(k),
  (b.exports = k);
var w = b.exports,
  S = a,
  x = l;
/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ function E(e) {
  var t = "https://react.dev/errors/" + e;
  if (1 < arguments.length) {
    t += "?args[]=" + encodeURIComponent(arguments[1]);
    for (var n = 2; n < arguments.length; n++)
      t += "&args[]=" + encodeURIComponent(arguments[n]);
  }
  return (
    "Minified React error #" +
    e +
    "; visit " +
    t +
    " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
  );
}
function C(e) {
  return !(!e || (1 !== e.nodeType && 9 !== e.nodeType && 11 !== e.nodeType));
}
function P(e) {
  var t = e,
    n = e;
  if (e.alternate) for (; t.return; ) t = t.return;
  else {
    e = t;
    do {
      !!(4098 & (t = e).flags) && (n = t.return), (e = t.return);
    } while (e);
  }
  return 3 === t.tag ? n : null;
}
function N(e) {
  if (13 === e.tag) {
    var t = e.memoizedState;
    if (
      (null === t && null !== (e = e.alternate) && (t = e.memoizedState),
      null !== t)
    )
      return t.dehydrated;
  }
  return null;
}
function z(e) {
  if (P(e) !== e) throw Error(E(188));
}
function _(e) {
  var t = e.tag;
  if (5 === t || 26 === t || 27 === t || 6 === t) return e;
  for (e = e.child; null !== e; ) {
    if (null !== (t = _(e))) return t;
    e = e.sibling;
  }
  return null;
}
var L = Object.assign,
  T = Symbol.for("react.element"),
  D = Symbol.for("react.transitional.element"),
  O = Symbol.for("react.portal"),
  A = Symbol.for("react.fragment"),
  F = Symbol.for("react.strict_mode"),
  j = Symbol.for("react.profiler"),
  M = Symbol.for("react.provider"),
  I = Symbol.for("react.consumer"),
  R = Symbol.for("react.context"),
  U = Symbol.for("react.forward_ref"),
  V = Symbol.for("react.suspense"),
  $ = Symbol.for("react.suspense_list"),
  H = Symbol.for("react.memo"),
  q = Symbol.for("react.lazy"),
  B = Symbol.for("react.activity"),
  Q = Symbol.for("react.memo_cache_sentinel"),
  W = Symbol.iterator;
function X(e) {
  return null === e || "object" != typeof e
    ? null
    : "function" == typeof (e = (W && e[W]) || e["@@iterator"])
    ? e
    : null;
}
var Y = Symbol.for("react.client.reference");
function K(e) {
  if (null == e) return null;
  if ("function" == typeof e)
    return e.$$typeof === Y ? null : e.displayName || e.name || null;
  if ("string" == typeof e) return e;
  switch (e) {
    case A:
      return "Fragment";
    case j:
      return "Profiler";
    case F:
      return "StrictMode";
    case V:
      return "Suspense";
    case $:
      return "SuspenseList";
    case B:
      return "Activity";
  }
  if ("object" == typeof e)
    switch (e.$$typeof) {
      case O:
        return "Portal";
      case R:
        return (e.displayName || "Context") + ".Provider";
      case I:
        return (e._context.displayName || "Context") + ".Consumer";
      case U:
        var t = e.render;
        return (
          (e = e.displayName) ||
            (e =
              "" !== (e = t.displayName || t.name || "")
                ? "ForwardRef(" + e + ")"
                : "ForwardRef"),
          e
        );
      case H:
        return null !== (t = e.displayName || null) ? t : K(e.type) || "Memo";
      case q:
        (t = e._payload), (e = e._init);
        try {
          return K(e(t));
        } catch (n) {}
    }
  return null;
}
var G = Array.isArray,
  J = S.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
  Z = x.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
  ee = { pending: !1, data: null, method: null, action: null },
  te = [],
  ne = -1;
function re(e) {
  return { current: e };
}
function ae(e) {
  0 > ne || ((e.current = te[ne]), (te[ne] = null), ne--);
}
function le(e, t) {
  ne++, (te[ne] = e.current), (e.current = t);
}
var oe = re(null),
  ie = re(null),
  ue = re(null),
  se = re(null);
function ce(e, t) {
  switch ((le(ue, t), le(ie, e), le(oe, null), t.nodeType)) {
    case 9:
    case 11:
      e = (e = t.documentElement) && (e = e.namespaceURI) ? Sd(e) : 0;
      break;
    default:
      if (((e = t.tagName), (t = t.namespaceURI))) e = xd((t = Sd(t)), e);
      else
        switch (e) {
          case "svg":
            e = 1;
            break;
          case "math":
            e = 2;
            break;
          default:
            e = 0;
        }
  }
  ae(oe), le(oe, e);
}
function de() {
  ae(oe), ae(ie), ae(ue);
}
function fe(e) {
  null !== e.memoizedState && le(se, e);
  var t = oe.current,
    n = xd(t, e.type);
  t !== n && (le(ie, e), le(oe, n));
}
function pe(e) {
  ie.current === e && (ae(oe), ae(ie)),
    se.current === e && (ae(se), (pf._currentValue = ee));
}
var me = Object.prototype.hasOwnProperty,
  he = w.unstable_scheduleCallback,
  ge = w.unstable_cancelCallback,
  ye = w.unstable_shouldYield,
  ve = w.unstable_requestPaint,
  be = w.unstable_now,
  ke = w.unstable_getCurrentPriorityLevel,
  we = w.unstable_ImmediatePriority,
  Se = w.unstable_UserBlockingPriority,
  xe = w.unstable_NormalPriority,
  Ee = w.unstable_LowPriority,
  Ce = w.unstable_IdlePriority,
  Pe = w.log,
  Ne = w.unstable_setDisableYieldValue,
  ze = null,
  _e = null;
function Le(e) {
  if (
    ("function" == typeof Pe && Ne(e),
    _e && "function" == typeof _e.setStrictMode)
  )
    try {
      _e.setStrictMode(ze, e);
    } catch (t) {}
}
var Te = Math.clz32
    ? Math.clz32
    : function (e) {
        return 0 === (e >>>= 0) ? 32 : (31 - ((De(e) / Oe) | 0)) | 0;
      },
  De = Math.log,
  Oe = Math.LN2;
var Ae = 256,
  Fe = 4194304;
function je(e) {
  var t = 42 & e;
  if (0 !== t) return t;
  switch (e & -e) {
    case 1:
      return 1;
    case 2:
      return 2;
    case 4:
      return 4;
    case 8:
      return 8;
    case 16:
      return 16;
    case 32:
      return 32;
    case 64:
      return 64;
    case 128:
      return 128;
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return 4194048 & e;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
      return 62914560 & e;
    case 67108864:
      return 67108864;
    case 134217728:
      return 134217728;
    case 268435456:
      return 268435456;
    case 536870912:
      return 536870912;
    case 1073741824:
      return 0;
    default:
      return e;
  }
}
function Me(e, t, n) {
  var r = e.pendingLanes;
  if (0 === r) return 0;
  var a = 0,
    l = e.suspendedLanes,
    o = e.pingedLanes;
  e = e.warmLanes;
  var i = 134217727 & r;
  return (
    0 !== i
      ? 0 !== (r = i & ~l)
        ? (a = je(r))
        : 0 !== (o &= i)
        ? (a = je(o))
        : n || (0 !== (n = i & ~e) && (a = je(n)))
      : 0 !== (i = r & ~l)
      ? (a = je(i))
      : 0 !== o
      ? (a = je(o))
      : n || (0 !== (n = r & ~e) && (a = je(n))),
    0 === a
      ? 0
      : 0 !== t &&
        t !== a &&
        !(t & l) &&
        ((l = a & -a) >= (n = t & -t) || (32 === l && 4194048 & n))
      ? t
      : a
  );
}
function Ie(e, t) {
  return !(e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t);
}
function Re(e, t) {
  switch (e) {
    case 1:
    case 2:
    case 4:
    case 8:
    case 64:
      return t + 250;
    case 16:
    case 32:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return t + 5e3;
    default:
      return -1;
  }
}
function Ue() {
  var e = Ae;
  return !(4194048 & (Ae <<= 1)) && (Ae = 256), e;
}
function Ve() {
  var e = Fe;
  return !(62914560 & (Fe <<= 1)) && (Fe = 4194304), e;
}
function $e(e) {
  for (var t = [], n = 0; 31 > n; n++) t.push(e);
  return t;
}
function He(e, t) {
  (e.pendingLanes |= t),
    268435456 !== t &&
      ((e.suspendedLanes = 0), (e.pingedLanes = 0), (e.warmLanes = 0));
}
function qe(e, t, n) {
  (e.pendingLanes |= t), (e.suspendedLanes &= ~t);
  var r = 31 - Te(t);
  (e.entangledLanes |= t),
    (e.entanglements[r] = 1073741824 | e.entanglements[r] | (4194090 & n));
}
function Be(e, t) {
  var n = (e.entangledLanes |= t);
  for (e = e.entanglements; n; ) {
    var r = 31 - Te(n),
      a = 1 << r;
    (a & t) | (e[r] & t) && (e[r] |= t), (n &= ~a);
  }
}
function Qe(e) {
  switch (e) {
    case 2:
      e = 1;
      break;
    case 8:
      e = 4;
      break;
    case 32:
      e = 16;
      break;
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
      e = 128;
      break;
    case 268435456:
      e = 134217728;
      break;
    default:
      e = 0;
  }
  return e;
}
function We(e) {
  return 2 < (e &= -e) ? (8 < e ? (134217727 & e ? 32 : 268435456) : 8) : 2;
}
function Xe() {
  var e = Z.p;
  return 0 !== e ? e : void 0 === (e = window.event) ? 32 : zf(e.type);
}
var Ye = Math.random().toString(36).slice(2),
  Ke = "__reactFiber$" + Ye,
  Ge = "__reactProps$" + Ye,
  Je = "__reactContainer$" + Ye,
  Ze = "__reactEvents$" + Ye,
  et = "__reactListeners$" + Ye,
  tt = "__reactHandles$" + Ye,
  nt = "__reactResources$" + Ye,
  rt = "__reactMarker$" + Ye;
function at(e) {
  delete e[Ke], delete e[Ge], delete e[Ze], delete e[et], delete e[tt];
}
function lt(e) {
  var t = e[Ke];
  if (t) return t;
  for (var n = e.parentNode; n; ) {
    if ((t = n[Je] || n[Ke])) {
      if (
        ((n = t.alternate),
        null !== t.child || (null !== n && null !== n.child))
      )
        for (e = Md(e); null !== e; ) {
          if ((n = e[Ke])) return n;
          e = Md(e);
        }
      return t;
    }
    n = (e = n).parentNode;
  }
  return null;
}
function ot(e) {
  if ((e = e[Ke] || e[Je])) {
    var t = e.tag;
    if (5 === t || 6 === t || 13 === t || 26 === t || 27 === t || 3 === t)
      return e;
  }
  return null;
}
function it(e) {
  var t = e.tag;
  if (5 === t || 26 === t || 27 === t || 6 === t) return e.stateNode;
  throw Error(E(33));
}
function ut(e) {
  var t = e[nt];
  return (
    t ||
      (t = e[nt] = { hoistableStyles: new Map(), hoistableScripts: new Map() }),
    t
  );
}
function st(e) {
  e[rt] = !0;
}
var ct = new Set(),
  dt = {};
function ft(e, t) {
  pt(e, t), pt(e + "Capture", t);
}
function pt(e, t) {
  for (dt[e] = t, e = 0; e < t.length; e++) ct.add(t[e]);
}
var mt,
  ht,
  gt = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ),
  yt = {},
  vt = {};
function bt(e, t, n) {
  if (
    ((a = t),
    me.call(vt, a) ||
      (!me.call(yt, a) && (gt.test(a) ? (vt[a] = !0) : ((yt[a] = !0), 0))))
  )
    if (null === n) e.removeAttribute(t);
    else {
      switch (typeof n) {
        case "undefined":
        case "function":
        case "symbol":
          return void e.removeAttribute(t);
        case "boolean":
          var r = t.toLowerCase().slice(0, 5);
          if ("data-" !== r && "aria-" !== r) return void e.removeAttribute(t);
      }
      e.setAttribute(t, "" + n);
    }
  var a;
}
function kt(e, t, n) {
  if (null === n) e.removeAttribute(t);
  else {
    switch (typeof n) {
      case "undefined":
      case "function":
      case "symbol":
      case "boolean":
        return void e.removeAttribute(t);
    }
    e.setAttribute(t, "" + n);
  }
}
function wt(e, t, n, r) {
  if (null === r) e.removeAttribute(n);
  else {
    switch (typeof r) {
      case "undefined":
      case "function":
      case "symbol":
      case "boolean":
        return void e.removeAttribute(n);
    }
    e.setAttributeNS(t, n, "" + r);
  }
}
function St(e) {
  if (void 0 === mt)
    try {
      throw Error();
    } catch (n) {
      var t = n.stack.trim().match(/\n( *(at )?)/);
      (mt = (t && t[1]) || ""),
        (ht =
          -1 < n.stack.indexOf("\n    at")
            ? " (<anonymous>)"
            : -1 < n.stack.indexOf("@")
            ? "@unknown:0:0"
            : "");
    }
  return "\n" + mt + e + ht;
}
var xt = !1;
function Et(e, t) {
  if (!e || xt) return "";
  xt = !0;
  var n = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    var r = {
      DetermineComponentFrameRoot: function () {
        try {
          if (t) {
            var n = function () {
              throw Error();
            };
            if (
              (Object.defineProperty(n.prototype, "props", {
                set: function () {
                  throw Error();
                },
              }),
              "object" == typeof Reflect && Reflect.construct)
            ) {
              try {
                Reflect.construct(n, []);
              } catch (a) {
                var r = a;
              }
              Reflect.construct(e, [], n);
            } else {
              try {
                n.call();
              } catch (l) {
                r = l;
              }
              e.call(n.prototype);
            }
          } else {
            try {
              throw Error();
            } catch (o) {
              r = o;
            }
            (n = e()) &&
              "function" == typeof n.catch &&
              n.catch(function () {});
          }
        } catch (i) {
          if (i && r && "string" == typeof i.stack) return [i.stack, r.stack];
        }
        return [null, null];
      },
    };
    r.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
    var a = Object.getOwnPropertyDescriptor(
      r.DetermineComponentFrameRoot,
      "name"
    );
    a &&
      a.configurable &&
      Object.defineProperty(r.DetermineComponentFrameRoot, "name", {
        value: "DetermineComponentFrameRoot",
      });
    var l = r.DetermineComponentFrameRoot(),
      o = l[0],
      i = l[1];
    if (o && i) {
      var u = o.split("\n"),
        s = i.split("\n");
      for (
        a = r = 0;
        r < u.length && !u[r].includes("DetermineComponentFrameRoot");

      )
        r++;
      for (; a < s.length && !s[a].includes("DetermineComponentFrameRoot"); )
        a++;
      if (r === u.length || a === s.length)
        for (
          r = u.length - 1, a = s.length - 1;
          1 <= r && 0 <= a && u[r] !== s[a];

        )
          a--;
      for (; 1 <= r && 0 <= a; r--, a--)
        if (u[r] !== s[a]) {
          if (1 !== r || 1 !== a)
            do {
              if ((r--, 0 > --a || u[r] !== s[a])) {
                var c = "\n" + u[r].replace(" at new ", " at ");
                return (
                  e.displayName &&
                    c.includes("<anonymous>") &&
                    (c = c.replace("<anonymous>", e.displayName)),
                  c
                );
              }
            } while (1 <= r && 0 <= a);
          break;
        }
    }
  } finally {
    (xt = !1), (Error.prepareStackTrace = n);
  }
  return (n = e ? e.displayName || e.name : "") ? St(n) : "";
}
function Ct(e) {
  switch (e.tag) {
    case 26:
    case 27:
    case 5:
      return St(e.type);
    case 16:
      return St("Lazy");
    case 13:
      return St("Suspense");
    case 19:
      return St("SuspenseList");
    case 0:
    case 15:
      return Et(e.type, !1);
    case 11:
      return Et(e.type.render, !1);
    case 1:
      return Et(e.type, !0);
    case 31:
      return St("Activity");
    default:
      return "";
  }
}
function Pt(e) {
  try {
    var t = "";
    do {
      (t += Ct(e)), (e = e.return);
    } while (e);
    return t;
  } catch (n) {
    return "\nError generating stack: " + n.message + "\n" + n.stack;
  }
}
function Nt(e) {
  switch (typeof e) {
    case "bigint":
    case "boolean":
    case "number":
    case "string":
    case "undefined":
    case "object":
      return e;
    default:
      return "";
  }
}
function zt(e) {
  var t = e.type;
  return (
    (e = e.nodeName) &&
    "input" === e.toLowerCase() &&
    ("checkbox" === t || "radio" === t)
  );
}
function _t(e) {
  e._valueTracker ||
    (e._valueTracker = (function (e) {
      var t = zt(e) ? "checked" : "value",
        n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
        r = "" + e[t];
      if (
        !e.hasOwnProperty(t) &&
        void 0 !== n &&
        "function" == typeof n.get &&
        "function" == typeof n.set
      ) {
        var a = n.get,
          l = n.set;
        return (
          Object.defineProperty(e, t, {
            configurable: !0,
            get: function () {
              return a.call(this);
            },
            set: function (e) {
              (r = "" + e), l.call(this, e);
            },
          }),
          Object.defineProperty(e, t, { enumerable: n.enumerable }),
          {
            getValue: function () {
              return r;
            },
            setValue: function (e) {
              r = "" + e;
            },
            stopTracking: function () {
              (e._valueTracker = null), delete e[t];
            },
          }
        );
      }
    })(e));
}
function Lt(e) {
  if (!e) return !1;
  var t = e._valueTracker;
  if (!t) return !0;
  var n = t.getValue(),
    r = "";
  return (
    e && (r = zt(e) ? (e.checked ? "true" : "false") : e.value),
    (e = r) !== n && (t.setValue(e), !0)
  );
}
function Tt(e) {
  if (
    void 0 === (e = e || ("undefined" != typeof document ? document : void 0))
  )
    return null;
  try {
    return e.activeElement || e.body;
  } catch (t) {
    return e.body;
  }
}
var Dt = /[\n"\\]/g;
function Ot(e) {
  return e.replace(Dt, function (e) {
    return "\\" + e.charCodeAt(0).toString(16) + " ";
  });
}
function At(e, t, n, r, a, l, o, i) {
  (e.name = ""),
    null != o &&
    "function" != typeof o &&
    "symbol" != typeof o &&
    "boolean" != typeof o
      ? (e.type = o)
      : e.removeAttribute("type"),
    null != t
      ? "number" === o
        ? ((0 === t && "" === e.value) || e.value != t) &&
          (e.value = "" + Nt(t))
        : e.value !== "" + Nt(t) && (e.value = "" + Nt(t))
      : ("submit" !== o && "reset" !== o) || e.removeAttribute("value"),
    null != t
      ? jt(e, o, Nt(t))
      : null != n
      ? jt(e, o, Nt(n))
      : null != r && e.removeAttribute("value"),
    null == a && null != l && (e.defaultChecked = !!l),
    null != a &&
      (e.checked = a && "function" != typeof a && "symbol" != typeof a),
    null != i &&
    "function" != typeof i &&
    "symbol" != typeof i &&
    "boolean" != typeof i
      ? (e.name = "" + Nt(i))
      : e.removeAttribute("name");
}
function Ft(e, t, n, r, a, l, o, i) {
  if (
    (null != l &&
      "function" != typeof l &&
      "symbol" != typeof l &&
      "boolean" != typeof l &&
      (e.type = l),
    null != t || null != n)
  ) {
    if (("submit" === l || "reset" === l) && null == t) return;
    (n = null != n ? "" + Nt(n) : ""),
      (t = null != t ? "" + Nt(t) : n),
      i || t === e.value || (e.value = t),
      (e.defaultValue = t);
  }
  (r =
    "function" != typeof (r = null != r ? r : a) &&
    "symbol" != typeof r &&
    !!r),
    (e.checked = i ? e.checked : !!r),
    (e.defaultChecked = !!r),
    null != o &&
      "function" != typeof o &&
      "symbol" != typeof o &&
      "boolean" != typeof o &&
      (e.name = o);
}
function jt(e, t, n) {
  ("number" === t && Tt(e.ownerDocument) === e) ||
    e.defaultValue === "" + n ||
    (e.defaultValue = "" + n);
}
function Mt(e, t, n, r) {
  if (((e = e.options), t)) {
    t = {};
    for (var a = 0; a < n.length; a++) t["$" + n[a]] = !0;
    for (n = 0; n < e.length; n++)
      (a = t.hasOwnProperty("$" + e[n].value)),
        e[n].selected !== a && (e[n].selected = a),
        a && r && (e[n].defaultSelected = !0);
  } else {
    for (n = "" + Nt(n), t = null, a = 0; a < e.length; a++) {
      if (e[a].value === n)
        return (e[a].selected = !0), void (r && (e[a].defaultSelected = !0));
      null !== t || e[a].disabled || (t = e[a]);
    }
    null !== t && (t.selected = !0);
  }
}
function It(e, t, n) {
  null == t || ((t = "" + Nt(t)) !== e.value && (e.value = t), null != n)
    ? (e.defaultValue = null != n ? "" + Nt(n) : "")
    : e.defaultValue !== t && (e.defaultValue = t);
}
function Rt(e, t, n, r) {
  if (null == t) {
    if (null != r) {
      if (null != n) throw Error(E(92));
      if (G(r)) {
        if (1 < r.length) throw Error(E(93));
        r = r[0];
      }
      n = r;
    }
    null == n && (n = ""), (t = n);
  }
  (n = Nt(t)),
    (e.defaultValue = n),
    (r = e.textContent) === n && "" !== r && null !== r && (e.value = r);
}
function Ut(e, t) {
  if (t) {
    var n = e.firstChild;
    if (n && n === e.lastChild && 3 === n.nodeType)
      return void (n.nodeValue = t);
  }
  e.textContent = t;
}
var Vt = new Set(
  "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
    " "
  )
);
function $t(e, t, n) {
  var r = 0 === t.indexOf("--");
  null == n || "boolean" == typeof n || "" === n
    ? r
      ? e.setProperty(t, "")
      : "float" === t
      ? (e.cssFloat = "")
      : (e[t] = "")
    : r
    ? e.setProperty(t, n)
    : "number" != typeof n || 0 === n || Vt.has(t)
    ? "float" === t
      ? (e.cssFloat = n)
      : (e[t] = ("" + n).trim())
    : (e[t] = n + "px");
}
function Ht(e, t, n) {
  if (null != t && "object" != typeof t) throw Error(E(62));
  if (((e = e.style), null != n)) {
    for (var r in n)
      !n.hasOwnProperty(r) ||
        (null != t && t.hasOwnProperty(r)) ||
        (0 === r.indexOf("--")
          ? e.setProperty(r, "")
          : "float" === r
          ? (e.cssFloat = "")
          : (e[r] = ""));
    for (var a in t)
      (r = t[a]), t.hasOwnProperty(a) && n[a] !== r && $t(e, a, r);
  } else for (var l in t) t.hasOwnProperty(l) && $t(e, l, t[l]);
}
function qt(e) {
  if (-1 === e.indexOf("-")) return !1;
  switch (e) {
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      return !1;
    default:
      return !0;
  }
}
var Bt = new Map([
    ["acceptCharset", "accept-charset"],
    ["htmlFor", "for"],
    ["httpEquiv", "http-equiv"],
    ["crossOrigin", "crossorigin"],
    ["accentHeight", "accent-height"],
    ["alignmentBaseline", "alignment-baseline"],
    ["arabicForm", "arabic-form"],
    ["baselineShift", "baseline-shift"],
    ["capHeight", "cap-height"],
    ["clipPath", "clip-path"],
    ["clipRule", "clip-rule"],
    ["colorInterpolation", "color-interpolation"],
    ["colorInterpolationFilters", "color-interpolation-filters"],
    ["colorProfile", "color-profile"],
    ["colorRendering", "color-rendering"],
    ["dominantBaseline", "dominant-baseline"],
    ["enableBackground", "enable-background"],
    ["fillOpacity", "fill-opacity"],
    ["fillRule", "fill-rule"],
    ["floodColor", "flood-color"],
    ["floodOpacity", "flood-opacity"],
    ["fontFamily", "font-family"],
    ["fontSize", "font-size"],
    ["fontSizeAdjust", "font-size-adjust"],
    ["fontStretch", "font-stretch"],
    ["fontStyle", "font-style"],
    ["fontVariant", "font-variant"],
    ["fontWeight", "font-weight"],
    ["glyphName", "glyph-name"],
    ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
    ["glyphOrientationVertical", "glyph-orientation-vertical"],
    ["horizAdvX", "horiz-adv-x"],
    ["horizOriginX", "horiz-origin-x"],
    ["imageRendering", "image-rendering"],
    ["letterSpacing", "letter-spacing"],
    ["lightingColor", "lighting-color"],
    ["markerEnd", "marker-end"],
    ["markerMid", "marker-mid"],
    ["markerStart", "marker-start"],
    ["overlinePosition", "overline-position"],
    ["overlineThickness", "overline-thickness"],
    ["paintOrder", "paint-order"],
    ["panose-1", "panose-1"],
    ["pointerEvents", "pointer-events"],
    ["renderingIntent", "rendering-intent"],
    ["shapeRendering", "shape-rendering"],
    ["stopColor", "stop-color"],
    ["stopOpacity", "stop-opacity"],
    ["strikethroughPosition", "strikethrough-position"],
    ["strikethroughThickness", "strikethrough-thickness"],
    ["strokeDasharray", "stroke-dasharray"],
    ["strokeDashoffset", "stroke-dashoffset"],
    ["strokeLinecap", "stroke-linecap"],
    ["strokeLinejoin", "stroke-linejoin"],
    ["strokeMiterlimit", "stroke-miterlimit"],
    ["strokeOpacity", "stroke-opacity"],
    ["strokeWidth", "stroke-width"],
    ["textAnchor", "text-anchor"],
    ["textDecoration", "text-decoration"],
    ["textRendering", "text-rendering"],
    ["transformOrigin", "transform-origin"],
    ["underlinePosition", "underline-position"],
    ["underlineThickness", "underline-thickness"],
    ["unicodeBidi", "unicode-bidi"],
    ["unicodeRange", "unicode-range"],
    ["unitsPerEm", "units-per-em"],
    ["vAlphabetic", "v-alphabetic"],
    ["vHanging", "v-hanging"],
    ["vIdeographic", "v-ideographic"],
    ["vMathematical", "v-mathematical"],
    ["vectorEffect", "vector-effect"],
    ["vertAdvY", "vert-adv-y"],
    ["vertOriginX", "vert-origin-x"],
    ["vertOriginY", "vert-origin-y"],
    ["wordSpacing", "word-spacing"],
    ["writingMode", "writing-mode"],
    ["xmlnsXlink", "xmlns:xlink"],
    ["xHeight", "x-height"],
  ]),
  Qt =
    /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
function Wt(e) {
  return Qt.test("" + e)
    ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
    : e;
}
var Xt = null;
function Yt(e) {
  return (
    (e = e.target || e.srcElement || window).correspondingUseElement &&
      (e = e.correspondingUseElement),
    3 === e.nodeType ? e.parentNode : e
  );
}
var Kt = null,
  Gt = null;
function Jt(e) {
  var t = ot(e);
  if (t && (e = t.stateNode)) {
    var n = e[Ge] || null;
    e: switch (((e = t.stateNode), t.type)) {
      case "input":
        if (
          (At(
            e,
            n.value,
            n.defaultValue,
            n.defaultValue,
            n.checked,
            n.defaultChecked,
            n.type,
            n.name
          ),
          (t = n.name),
          "radio" === n.type && null != t)
        ) {
          for (n = e; n.parentNode; ) n = n.parentNode;
          for (
            n = n.querySelectorAll(
              'input[name="' + Ot("" + t) + '"][type="radio"]'
            ),
              t = 0;
            t < n.length;
            t++
          ) {
            var r = n[t];
            if (r !== e && r.form === e.form) {
              var a = r[Ge] || null;
              if (!a) throw Error(E(90));
              At(
                r,
                a.value,
                a.defaultValue,
                a.defaultValue,
                a.checked,
                a.defaultChecked,
                a.type,
                a.name
              );
            }
          }
          for (t = 0; t < n.length; t++) (r = n[t]).form === e.form && Lt(r);
        }
        break e;
      case "textarea":
        It(e, n.value, n.defaultValue);
        break e;
      case "select":
        null != (t = n.value) && Mt(e, !!n.multiple, t, !1);
    }
  }
}
var Zt = !1;
function en(e, t, n) {
  if (Zt) return e(t, n);
  Zt = !0;
  try {
    return e(t);
  } finally {
    if (
      ((Zt = !1),
      (null !== Kt || null !== Gt) &&
        (lc(), Kt && ((t = Kt), (e = Gt), (Gt = Kt = null), Jt(t), e)))
    )
      for (t = 0; t < e.length; t++) Jt(e[t]);
  }
}
function tn(e, t) {
  var n = e.stateNode;
  if (null === n) return null;
  var r = n[Ge] || null;
  if (null === r) return null;
  n = r[t];
  e: switch (t) {
    case "onClick":
    case "onClickCapture":
    case "onDoubleClick":
    case "onDoubleClickCapture":
    case "onMouseDown":
    case "onMouseDownCapture":
    case "onMouseMove":
    case "onMouseMoveCapture":
    case "onMouseUp":
    case "onMouseUpCapture":
    case "onMouseEnter":
      (r = !r.disabled) ||
        (r = !(
          "button" === (e = e.type) ||
          "input" === e ||
          "select" === e ||
          "textarea" === e
        )),
        (e = !r);
      break e;
    default:
      e = !1;
  }
  if (e) return null;
  if (n && "function" != typeof n) throw Error(E(231, t, typeof n));
  return n;
}
var nn = !(
    "undefined" == typeof window ||
    void 0 === window.document ||
    void 0 === window.document.createElement
  ),
  rn = !1;
if (nn)
  try {
    var an = {};
    Object.defineProperty(an, "passive", {
      get: function () {
        rn = !0;
      },
    }),
      window.addEventListener("test", an, an),
      window.removeEventListener("test", an, an);
  } catch (tm) {
    rn = !1;
  }
var ln = null,
  on = null,
  un = null;
function sn() {
  if (un) return un;
  var e,
    t,
    n = on,
    r = n.length,
    a = "value" in ln ? ln.value : ln.textContent,
    l = a.length;
  for (e = 0; e < r && n[e] === a[e]; e++);
  var o = r - e;
  for (t = 1; t <= o && n[r - t] === a[l - t]; t++);
  return (un = a.slice(e, 1 < t ? 1 - t : void 0));
}
function cn(e) {
  var t = e.keyCode;
  return (
    "charCode" in e ? 0 === (e = e.charCode) && 13 === t && (e = 13) : (e = t),
    10 === e && (e = 13),
    32 <= e || 13 === e ? e : 0
  );
}
function dn() {
  return !0;
}
function fn() {
  return !1;
}
function pn(e) {
  function t(t, n, r, a, l) {
    for (var o in ((this._reactName = t),
    (this._targetInst = r),
    (this.type = n),
    (this.nativeEvent = a),
    (this.target = l),
    (this.currentTarget = null),
    e))
      e.hasOwnProperty(o) && ((t = e[o]), (this[o] = t ? t(a) : a[o]));
    return (
      (this.isDefaultPrevented = (
        null != a.defaultPrevented ? a.defaultPrevented : !1 === a.returnValue
      )
        ? dn
        : fn),
      (this.isPropagationStopped = fn),
      this
    );
  }
  return (
    L(t.prototype, {
      preventDefault: function () {
        this.defaultPrevented = !0;
        var e = this.nativeEvent;
        e &&
          (e.preventDefault
            ? e.preventDefault()
            : "unknown" != typeof e.returnValue && (e.returnValue = !1),
          (this.isDefaultPrevented = dn));
      },
      stopPropagation: function () {
        var e = this.nativeEvent;
        e &&
          (e.stopPropagation
            ? e.stopPropagation()
            : "unknown" != typeof e.cancelBubble && (e.cancelBubble = !0),
          (this.isPropagationStopped = dn));
      },
      persist: function () {},
      isPersistent: dn,
    }),
    t
  );
}
var mn,
  hn,
  gn,
  yn = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function (e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0,
  },
  vn = pn(yn),
  bn = L({}, yn, { view: 0, detail: 0 }),
  kn = pn(bn),
  wn = L({}, bn, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: Dn,
    button: 0,
    buttons: 0,
    relatedTarget: function (e) {
      return void 0 === e.relatedTarget
        ? e.fromElement === e.srcElement
          ? e.toElement
          : e.fromElement
        : e.relatedTarget;
    },
    movementX: function (e) {
      return "movementX" in e
        ? e.movementX
        : (e !== gn &&
            (gn && "mousemove" === e.type
              ? ((mn = e.screenX - gn.screenX), (hn = e.screenY - gn.screenY))
              : (hn = mn = 0),
            (gn = e)),
          mn);
    },
    movementY: function (e) {
      return "movementY" in e ? e.movementY : hn;
    },
  }),
  Sn = pn(wn),
  xn = pn(L({}, wn, { dataTransfer: 0 })),
  En = pn(L({}, bn, { relatedTarget: 0 })),
  Cn = pn(L({}, yn, { animationName: 0, elapsedTime: 0, pseudoElement: 0 })),
  Pn = pn(
    L({}, yn, {
      clipboardData: function (e) {
        return "clipboardData" in e ? e.clipboardData : window.clipboardData;
      },
    })
  ),
  Nn = pn(L({}, yn, { data: 0 })),
  zn = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified",
  },
  _n = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta",
  },
  Ln = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey",
  };
function Tn(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : !!(e = Ln[e]) && !!t[e];
}
function Dn() {
  return Tn;
}
var On = pn(
    L({}, bn, {
      key: function (e) {
        if (e.key) {
          var t = zn[e.key] || e.key;
          if ("Unidentified" !== t) return t;
        }
        return "keypress" === e.type
          ? 13 === (e = cn(e))
            ? "Enter"
            : String.fromCharCode(e)
          : "keydown" === e.type || "keyup" === e.type
          ? _n[e.keyCode] || "Unidentified"
          : "";
      },
      code: 0,
      location: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      repeat: 0,
      locale: 0,
      getModifierState: Dn,
      charCode: function (e) {
        return "keypress" === e.type ? cn(e) : 0;
      },
      keyCode: function (e) {
        return "keydown" === e.type || "keyup" === e.type ? e.keyCode : 0;
      },
      which: function (e) {
        return "keypress" === e.type
          ? cn(e)
          : "keydown" === e.type || "keyup" === e.type
          ? e.keyCode
          : 0;
      },
    })
  ),
  An = pn(
    L({}, wn, {
      pointerId: 0,
      width: 0,
      height: 0,
      pressure: 0,
      tangentialPressure: 0,
      tiltX: 0,
      tiltY: 0,
      twist: 0,
      pointerType: 0,
      isPrimary: 0,
    })
  ),
  Fn = pn(
    L({}, bn, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: Dn,
    })
  ),
  jn = pn(L({}, yn, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 })),
  Mn = pn(
    L({}, wn, {
      deltaX: function (e) {
        return "deltaX" in e
          ? e.deltaX
          : "wheelDeltaX" in e
          ? -e.wheelDeltaX
          : 0;
      },
      deltaY: function (e) {
        return "deltaY" in e
          ? e.deltaY
          : "wheelDeltaY" in e
          ? -e.wheelDeltaY
          : "wheelDelta" in e
          ? -e.wheelDelta
          : 0;
      },
      deltaZ: 0,
      deltaMode: 0,
    })
  ),
  In = pn(L({}, yn, { newState: 0, oldState: 0 })),
  Rn = [9, 13, 27, 32],
  Un = nn && "CompositionEvent" in window,
  Vn = null;
nn && "documentMode" in document && (Vn = document.documentMode);
var $n = nn && "TextEvent" in window && !Vn,
  Hn = nn && (!Un || (Vn && 8 < Vn && 11 >= Vn)),
  qn = String.fromCharCode(32),
  Bn = !1;
function Qn(e, t) {
  switch (e) {
    case "keyup":
      return -1 !== Rn.indexOf(t.keyCode);
    case "keydown":
      return 229 !== t.keyCode;
    case "keypress":
    case "mousedown":
    case "focusout":
      return !0;
    default:
      return !1;
  }
}
function Wn(e) {
  return "object" == typeof (e = e.detail) && "data" in e ? e.data : null;
}
var Xn = !1;
var Yn = {
  color: !0,
  date: !0,
  datetime: !0,
  "datetime-local": !0,
  email: !0,
  month: !0,
  number: !0,
  password: !0,
  range: !0,
  search: !0,
  tel: !0,
  text: !0,
  time: !0,
  url: !0,
  week: !0,
};
function Kn(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return "input" === t ? !!Yn[e.type] : "textarea" === t;
}
function Gn(e, t, n, r) {
  Kt ? (Gt ? Gt.push(r) : (Gt = [r])) : (Kt = r),
    0 < (t = ud(t, "onChange")).length &&
      ((n = new vn("onChange", "change", null, n, r)),
      e.push({ event: n, listeners: t }));
}
var Jn = null,
  Zn = null;
function er(e) {
  ed(e, 0);
}
function tr(e) {
  if (Lt(it(e))) return e;
}
function nr(e, t) {
  if ("change" === e) return t;
}
var rr = !1;
if (nn) {
  var ar;
  if (nn) {
    var lr = "oninput" in document;
    if (!lr) {
      var or = document.createElement("div");
      or.setAttribute("oninput", "return;"),
        (lr = "function" == typeof or.oninput);
    }
    ar = lr;
  } else ar = !1;
  rr = ar && (!document.documentMode || 9 < document.documentMode);
}
function ir() {
  Jn && (Jn.detachEvent("onpropertychange", ur), (Zn = Jn = null));
}
function ur(e) {
  if ("value" === e.propertyName && tr(Zn)) {
    var t = [];
    Gn(t, Zn, e, Yt(e)), en(er, t);
  }
}
function sr(e, t, n) {
  "focusin" === e
    ? (ir(), (Zn = n), (Jn = t).attachEvent("onpropertychange", ur))
    : "focusout" === e && ir();
}
function cr(e) {
  if ("selectionchange" === e || "keyup" === e || "keydown" === e)
    return tr(Zn);
}
function dr(e, t) {
  if ("click" === e) return tr(t);
}
function fr(e, t) {
  if ("input" === e || "change" === e) return tr(t);
}
var pr =
  "function" == typeof Object.is
    ? Object.is
    : function (e, t) {
        return (e === t && (0 !== e || 1 / e == 1 / t)) || (e != e && t != t);
      };
function mr(e, t) {
  if (pr(e, t)) return !0;
  if ("object" != typeof e || null === e || "object" != typeof t || null === t)
    return !1;
  var n = Object.keys(e),
    r = Object.keys(t);
  if (n.length !== r.length) return !1;
  for (r = 0; r < n.length; r++) {
    var a = n[r];
    if (!me.call(t, a) || !pr(e[a], t[a])) return !1;
  }
  return !0;
}
function hr(e) {
  for (; e && e.firstChild; ) e = e.firstChild;
  return e;
}
function gr(e, t) {
  var n,
    r = hr(e);
  for (e = 0; r; ) {
    if (3 === r.nodeType) {
      if (((n = e + r.textContent.length), e <= t && n >= t))
        return { node: r, offset: t - e };
      e = n;
    }
    e: {
      for (; r; ) {
        if (r.nextSibling) {
          r = r.nextSibling;
          break e;
        }
        r = r.parentNode;
      }
      r = void 0;
    }
    r = hr(r);
  }
}
function yr(e, t) {
  return (
    !(!e || !t) &&
    (e === t ||
      ((!e || 3 !== e.nodeType) &&
        (t && 3 === t.nodeType
          ? yr(e, t.parentNode)
          : "contains" in e
          ? e.contains(t)
          : !!e.compareDocumentPosition &&
            !!(16 & e.compareDocumentPosition(t)))))
  );
}
function vr(e) {
  for (
    var t = Tt(
      (e =
        null != e &&
        null != e.ownerDocument &&
        null != e.ownerDocument.defaultView
          ? e.ownerDocument.defaultView
          : window).document
    );
    t instanceof e.HTMLIFrameElement;

  ) {
    try {
      var n = "string" == typeof t.contentWindow.location.href;
    } catch (r) {
      n = !1;
    }
    if (!n) break;
    t = Tt((e = t.contentWindow).document);
  }
  return t;
}
function br(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return (
    t &&
    (("input" === t &&
      ("text" === e.type ||
        "search" === e.type ||
        "tel" === e.type ||
        "url" === e.type ||
        "password" === e.type)) ||
      "textarea" === t ||
      "true" === e.contentEditable)
  );
}
var kr = nn && "documentMode" in document && 11 >= document.documentMode,
  wr = null,
  Sr = null,
  xr = null,
  Er = !1;
function Cr(e, t, n) {
  var r = n.window === n ? n.document : 9 === n.nodeType ? n : n.ownerDocument;
  Er ||
    null == wr ||
    wr !== Tt(r) ||
    ("selectionStart" in (r = wr) && br(r)
      ? (r = { start: r.selectionStart, end: r.selectionEnd })
      : (r = {
          anchorNode: (r = (
            (r.ownerDocument && r.ownerDocument.defaultView) ||
            window
          ).getSelection()).anchorNode,
          anchorOffset: r.anchorOffset,
          focusNode: r.focusNode,
          focusOffset: r.focusOffset,
        }),
    (xr && mr(xr, r)) ||
      ((xr = r),
      0 < (r = ud(Sr, "onSelect")).length &&
        ((t = new vn("onSelect", "select", null, t, n)),
        e.push({ event: t, listeners: r }),
        (t.target = wr))));
}
function Pr(e, t) {
  var n = {};
  return (
    (n[e.toLowerCase()] = t.toLowerCase()),
    (n["Webkit" + e] = "webkit" + t),
    (n["Moz" + e] = "moz" + t),
    n
  );
}
var Nr = {
    animationend: Pr("Animation", "AnimationEnd"),
    animationiteration: Pr("Animation", "AnimationIteration"),
    animationstart: Pr("Animation", "AnimationStart"),
    transitionrun: Pr("Transition", "TransitionRun"),
    transitionstart: Pr("Transition", "TransitionStart"),
    transitioncancel: Pr("Transition", "TransitionCancel"),
    transitionend: Pr("Transition", "TransitionEnd"),
  },
  zr = {},
  _r = {};
function Lr(e) {
  if (zr[e]) return zr[e];
  if (!Nr[e]) return e;
  var t,
    n = Nr[e];
  for (t in n) if (n.hasOwnProperty(t) && t in _r) return (zr[e] = n[t]);
  return e;
}
nn &&
  ((_r = document.createElement("div").style),
  "AnimationEvent" in window ||
    (delete Nr.animationend.animation,
    delete Nr.animationiteration.animation,
    delete Nr.animationstart.animation),
  "TransitionEvent" in window || delete Nr.transitionend.transition);
var Tr = Lr("animationend"),
  Dr = Lr("animationiteration"),
  Or = Lr("animationstart"),
  Ar = Lr("transitionrun"),
  Fr = Lr("transitionstart"),
  jr = Lr("transitioncancel"),
  Mr = Lr("transitionend"),
  Ir = new Map(),
  Rr =
    "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
      " "
    );
function Ur(e, t) {
  Ir.set(e, t), ft(t, [e]);
}
Rr.push("scrollEnd");
var Vr = new WeakMap();
function $r(e, t) {
  if ("object" == typeof e && null !== e) {
    var n = Vr.get(e);
    return void 0 !== n
      ? n
      : ((t = { value: e, source: t, stack: Pt(t) }), Vr.set(e, t), t);
  }
  return { value: e, source: t, stack: Pt(t) };
}
var Hr = [],
  qr = 0,
  Br = 0;
function Qr() {
  for (var e = qr, t = (Br = qr = 0); t < e; ) {
    var n = Hr[t];
    Hr[t++] = null;
    var r = Hr[t];
    Hr[t++] = null;
    var a = Hr[t];
    Hr[t++] = null;
    var l = Hr[t];
    if (((Hr[t++] = null), null !== r && null !== a)) {
      var o = r.pending;
      null === o ? (a.next = a) : ((a.next = o.next), (o.next = a)),
        (r.pending = a);
    }
    0 !== l && Kr(n, a, l);
  }
}
function Wr(e, t, n, r) {
  (Hr[qr++] = e),
    (Hr[qr++] = t),
    (Hr[qr++] = n),
    (Hr[qr++] = r),
    (Br |= r),
    (e.lanes |= r),
    null !== (e = e.alternate) && (e.lanes |= r);
}
function Xr(e, t, n, r) {
  return Wr(e, t, n, r), Gr(e);
}
function Yr(e, t) {
  return Wr(e, null, null, t), Gr(e);
}
function Kr(e, t, n) {
  e.lanes |= n;
  var r = e.alternate;
  null !== r && (r.lanes |= n);
  for (var a = !1, l = e.return; null !== l; )
    (l.childLanes |= n),
      null !== (r = l.alternate) && (r.childLanes |= n),
      22 === l.tag &&
        (null === (e = l.stateNode) || 1 & e._visibility || (a = !0)),
      (e = l),
      (l = l.return);
  return 3 === e.tag
    ? ((l = e.stateNode),
      a &&
        null !== t &&
        ((a = 31 - Te(n)),
        null === (r = (e = l.hiddenUpdates)[a]) ? (e[a] = [t]) : r.push(t),
        (t.lane = 536870912 | n)),
      l)
    : null;
}
function Gr(e) {
  if (50 < Ks) throw ((Ks = 0), (Gs = null), Error(E(185)));
  for (var t = e.return; null !== t; ) t = (e = t).return;
  return 3 === e.tag ? e.stateNode : null;
}
var Jr = {};
function Zr(e, t, n, r) {
  (this.tag = e),
    (this.key = n),
    (this.sibling =
      this.child =
      this.return =
      this.stateNode =
      this.type =
      this.elementType =
        null),
    (this.index = 0),
    (this.refCleanup = this.ref = null),
    (this.pendingProps = t),
    (this.dependencies =
      this.memoizedState =
      this.updateQueue =
      this.memoizedProps =
        null),
    (this.mode = r),
    (this.subtreeFlags = this.flags = 0),
    (this.deletions = null),
    (this.childLanes = this.lanes = 0),
    (this.alternate = null);
}
function ea(e, t, n, r) {
  return new Zr(e, t, n, r);
}
function ta(e) {
  return !(!(e = e.prototype) || !e.isReactComponent);
}
function na(e, t) {
  var n = e.alternate;
  return (
    null === n
      ? (((n = ea(e.tag, t, e.key, e.mode)).elementType = e.elementType),
        (n.type = e.type),
        (n.stateNode = e.stateNode),
        (n.alternate = e),
        (e.alternate = n))
      : ((n.pendingProps = t),
        (n.type = e.type),
        (n.flags = 0),
        (n.subtreeFlags = 0),
        (n.deletions = null)),
    (n.flags = 65011712 & e.flags),
    (n.childLanes = e.childLanes),
    (n.lanes = e.lanes),
    (n.child = e.child),
    (n.memoizedProps = e.memoizedProps),
    (n.memoizedState = e.memoizedState),
    (n.updateQueue = e.updateQueue),
    (t = e.dependencies),
    (n.dependencies =
      null === t ? null : { lanes: t.lanes, firstContext: t.firstContext }),
    (n.sibling = e.sibling),
    (n.index = e.index),
    (n.ref = e.ref),
    (n.refCleanup = e.refCleanup),
    n
  );
}
function ra(e, t) {
  e.flags &= 65011714;
  var n = e.alternate;
  return (
    null === n
      ? ((e.childLanes = 0),
        (e.lanes = t),
        (e.child = null),
        (e.subtreeFlags = 0),
        (e.memoizedProps = null),
        (e.memoizedState = null),
        (e.updateQueue = null),
        (e.dependencies = null),
        (e.stateNode = null))
      : ((e.childLanes = n.childLanes),
        (e.lanes = n.lanes),
        (e.child = n.child),
        (e.subtreeFlags = 0),
        (e.deletions = null),
        (e.memoizedProps = n.memoizedProps),
        (e.memoizedState = n.memoizedState),
        (e.updateQueue = n.updateQueue),
        (e.type = n.type),
        (t = n.dependencies),
        (e.dependencies =
          null === t
            ? null
            : { lanes: t.lanes, firstContext: t.firstContext })),
    e
  );
}
function aa(e, t, n, r, a, l) {
  var o = 0;
  if (((r = e), "function" == typeof e)) ta(e) && (o = 1);
  else if ("string" == typeof e)
    o = (function (e, t, n) {
      if (1 === n || null != t.itemProp) return !1;
      switch (e) {
        case "meta":
        case "title":
          return !0;
        case "style":
          if (
            "string" != typeof t.precedence ||
            "string" != typeof t.href ||
            "" === t.href
          )
            break;
          return !0;
        case "link":
          if (
            "string" != typeof t.rel ||
            "string" != typeof t.href ||
            "" === t.href ||
            t.onLoad ||
            t.onError
          )
            break;
          return (
            "stylesheet" !== t.rel ||
            ((e = t.disabled), "string" == typeof t.precedence && null == e)
          );
        case "script":
          if (
            t.async &&
            "function" != typeof t.async &&
            "symbol" != typeof t.async &&
            !t.onLoad &&
            !t.onError &&
            t.src &&
            "string" == typeof t.src
          )
            return !0;
      }
      return !1;
    })(e, n, oe.current)
      ? 26
      : "html" === e || "head" === e || "body" === e
      ? 27
      : 5;
  else
    e: switch (e) {
      case B:
        return ((e = ea(31, n, t, a)).elementType = B), (e.lanes = l), e;
      case A:
        return la(n.children, a, l, t);
      case F:
        (o = 8), (a |= 24);
        break;
      case j:
        return ((e = ea(12, n, t, 2 | a)).elementType = j), (e.lanes = l), e;
      case V:
        return ((e = ea(13, n, t, a)).elementType = V), (e.lanes = l), e;
      case $:
        return ((e = ea(19, n, t, a)).elementType = $), (e.lanes = l), e;
      default:
        if ("object" == typeof e && null !== e)
          switch (e.$$typeof) {
            case M:
            case R:
              o = 10;
              break e;
            case I:
              o = 9;
              break e;
            case U:
              o = 11;
              break e;
            case H:
              o = 14;
              break e;
            case q:
              (o = 16), (r = null);
              break e;
          }
        (o = 29),
          (n = Error(E(130, null === e ? "null" : typeof e, ""))),
          (r = null);
    }
  return ((t = ea(o, n, t, a)).elementType = e), (t.type = r), (t.lanes = l), t;
}
function la(e, t, n, r) {
  return ((e = ea(7, e, r, t)).lanes = n), e;
}
function oa(e, t, n) {
  return ((e = ea(6, e, null, t)).lanes = n), e;
}
function ia(e, t, n) {
  return (
    ((t = ea(4, null !== e.children ? e.children : [], e.key, t)).lanes = n),
    (t.stateNode = {
      containerInfo: e.containerInfo,
      pendingChildren: null,
      implementation: e.implementation,
    }),
    t
  );
}
var ua = [],
  sa = 0,
  ca = null,
  da = 0,
  fa = [],
  pa = 0,
  ma = null,
  ha = 1,
  ga = "";
function ya(e, t) {
  (ua[sa++] = da), (ua[sa++] = ca), (ca = e), (da = t);
}
function va(e, t, n) {
  (fa[pa++] = ha), (fa[pa++] = ga), (fa[pa++] = ma), (ma = e);
  var r = ha;
  e = ga;
  var a = 32 - Te(r) - 1;
  (r &= ~(1 << a)), (n += 1);
  var l = 32 - Te(t) + a;
  if (30 < l) {
    var o = a - (a % 5);
    (l = (r & ((1 << o) - 1)).toString(32)),
      (r >>= o),
      (a -= o),
      (ha = (1 << (32 - Te(t) + a)) | (n << a) | r),
      (ga = l + e);
  } else (ha = (1 << l) | (n << a) | r), (ga = e);
}
function ba(e) {
  null !== e.return && (ya(e, 1), va(e, 1, 0));
}
function ka(e) {
  for (; e === ca; )
    (ca = ua[--sa]), (ua[sa] = null), (da = ua[--sa]), (ua[sa] = null);
  for (; e === ma; )
    (ma = fa[--pa]),
      (fa[pa] = null),
      (ga = fa[--pa]),
      (fa[pa] = null),
      (ha = fa[--pa]),
      (fa[pa] = null);
}
var wa = null,
  Sa = null,
  xa = !1,
  Ea = null,
  Ca = !1,
  Pa = Error(E(519));
function Na(e) {
  throw (Oa($r(Error(E(418, "")), e)), Pa);
}
function za(e) {
  var t = e.stateNode,
    n = e.type,
    r = e.memoizedProps;
  switch (((t[Ke] = e), (t[Ge] = r), n)) {
    case "dialog":
      td("cancel", t), td("close", t);
      break;
    case "iframe":
    case "object":
    case "embed":
      td("load", t);
      break;
    case "video":
    case "audio":
      for (n = 0; n < Jc.length; n++) td(Jc[n], t);
      break;
    case "source":
      td("error", t);
      break;
    case "img":
    case "image":
    case "link":
      td("error", t), td("load", t);
      break;
    case "details":
      td("toggle", t);
      break;
    case "input":
      td("invalid", t),
        Ft(
          t,
          r.value,
          r.defaultValue,
          r.checked,
          r.defaultChecked,
          r.type,
          r.name,
          !0
        ),
        _t(t);
      break;
    case "select":
      td("invalid", t);
      break;
    case "textarea":
      td("invalid", t), Rt(t, r.value, r.defaultValue, r.children), _t(t);
  }
  ("string" != typeof (n = r.children) &&
    "number" != typeof n &&
    "bigint" != typeof n) ||
  t.textContent === "" + n ||
  !0 === r.suppressHydrationWarning ||
  md(t.textContent, n)
    ? (null != r.popover && (td("beforetoggle", t), td("toggle", t)),
      null != r.onScroll && td("scroll", t),
      null != r.onScrollEnd && td("scrollend", t),
      null != r.onClick && (t.onclick = hd),
      (t = !0))
    : (t = !1),
    t || Na(e);
}
function _a(e) {
  for (wa = e.return; wa; )
    switch (wa.tag) {
      case 5:
      case 13:
        return void (Ca = !1);
      case 27:
      case 3:
        return void (Ca = !0);
      default:
        wa = wa.return;
    }
}
function La(e) {
  if (e !== wa) return !1;
  if (!xa) return _a(e), (xa = !0), !1;
  var t,
    n = e.tag;
  if (
    ((t = 3 !== n && 27 !== n) &&
      ((t = 5 === n) &&
        (t =
          !("form" !== (t = e.type) && "button" !== t) ||
          Ed(e.type, e.memoizedProps)),
      (t = !t)),
    t && Sa && Na(e),
    _a(e),
    13 === n)
  ) {
    if (!(e = null !== (e = e.memoizedState) ? e.dehydrated : null))
      throw Error(E(317));
    e: {
      for (e = e.nextSibling, n = 0; e; ) {
        if (8 === e.nodeType)
          if ("/$" === (t = e.data)) {
            if (0 === n) {
              Sa = Fd(e.nextSibling);
              break e;
            }
            n--;
          } else ("$" !== t && "$!" !== t && "$?" !== t) || n++;
        e = e.nextSibling;
      }
      Sa = null;
    }
  } else
    27 === n
      ? ((n = Sa), Td(e.type) ? ((e = jd), (jd = null), (Sa = e)) : (Sa = n))
      : (Sa = wa ? Fd(e.stateNode.nextSibling) : null);
  return !0;
}
function Ta() {
  (Sa = wa = null), (xa = !1);
}
function Da() {
  var e = Ea;
  return (
    null !== e && (null === Ms ? (Ms = e) : Ms.push.apply(Ms, e), (Ea = null)),
    e
  );
}
function Oa(e) {
  null === Ea ? (Ea = [e]) : Ea.push(e);
}
var Aa = re(null),
  Fa = null,
  ja = null;
function Ma(e, t, n) {
  le(Aa, t._currentValue), (t._currentValue = n);
}
function Ia(e) {
  (e._currentValue = Aa.current), ae(Aa);
}
function Ra(e, t, n) {
  for (; null !== e; ) {
    var r = e.alternate;
    if (
      ((e.childLanes & t) !== t
        ? ((e.childLanes |= t), null !== r && (r.childLanes |= t))
        : null !== r && (r.childLanes & t) !== t && (r.childLanes |= t),
      e === n)
    )
      break;
    e = e.return;
  }
}
function Ua(e, t, n, r) {
  var a = e.child;
  for (null !== a && (a.return = e); null !== a; ) {
    var l = a.dependencies;
    if (null !== l) {
      var o = a.child;
      l = l.firstContext;
      e: for (; null !== l; ) {
        var i = l;
        l = a;
        for (var u = 0; u < t.length; u++)
          if (i.context === t[u]) {
            (l.lanes |= n),
              null !== (i = l.alternate) && (i.lanes |= n),
              Ra(l.return, n, e),
              r || (o = null);
            break e;
          }
        l = i.next;
      }
    } else if (18 === a.tag) {
      if (null === (o = a.return)) throw Error(E(341));
      (o.lanes |= n),
        null !== (l = o.alternate) && (l.lanes |= n),
        Ra(o, n, e),
        (o = null);
    } else o = a.child;
    if (null !== o) o.return = a;
    else
      for (o = a; null !== o; ) {
        if (o === e) {
          o = null;
          break;
        }
        if (null !== (a = o.sibling)) {
          (a.return = o.return), (o = a);
          break;
        }
        o = o.return;
      }
    a = o;
  }
}
function Va(e, t, n, r) {
  e = null;
  for (var a = t, l = !1; null !== a; ) {
    if (!l)
      if (524288 & a.flags) l = !0;
      else if (262144 & a.flags) break;
    if (10 === a.tag) {
      var o = a.alternate;
      if (null === o) throw Error(E(387));
      if (null !== (o = o.memoizedProps)) {
        var i = a.type;
        pr(a.pendingProps.value, o.value) ||
          (null !== e ? e.push(i) : (e = [i]));
      }
    } else if (a === se.current) {
      if (null === (o = a.alternate)) throw Error(E(387));
      o.memoizedState.memoizedState !== a.memoizedState.memoizedState &&
        (null !== e ? e.push(pf) : (e = [pf]));
    }
    a = a.return;
  }
  null !== e && Ua(t, e, n, r), (t.flags |= 262144);
}
function $a(e) {
  for (e = e.firstContext; null !== e; ) {
    if (!pr(e.context._currentValue, e.memoizedValue)) return !0;
    e = e.next;
  }
  return !1;
}
function Ha(e) {
  (Fa = e),
    (ja = null),
    null !== (e = e.dependencies) && (e.firstContext = null);
}
function qa(e) {
  return Qa(Fa, e);
}
function Ba(e, t) {
  return null === Fa && Ha(e), Qa(e, t);
}
function Qa(e, t) {
  var n = t._currentValue;
  if (((t = { context: t, memoizedValue: n, next: null }), null === ja)) {
    if (null === e) throw Error(E(308));
    (ja = t),
      (e.dependencies = { lanes: 0, firstContext: t }),
      (e.flags |= 524288);
  } else ja = ja.next = t;
  return n;
}
var Wa =
    "undefined" != typeof AbortController
      ? AbortController
      : function () {
          var e = [],
            t = (this.signal = {
              aborted: !1,
              addEventListener: function (t, n) {
                e.push(n);
              },
            });
          this.abort = function () {
            (t.aborted = !0),
              e.forEach(function (e) {
                return e();
              });
          };
        },
  Xa = w.unstable_scheduleCallback,
  Ya = w.unstable_NormalPriority,
  Ka = {
    $$typeof: R,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0,
  };
function Ga() {
  return { controller: new Wa(), data: new Map(), refCount: 0 };
}
function Ja(e) {
  e.refCount--,
    0 === e.refCount &&
      Xa(Ya, function () {
        e.controller.abort();
      });
}
var Za = null,
  el = 0,
  tl = 0,
  nl = null;
function rl() {
  if (0 == --el && null !== Za) {
    null !== nl && (nl.status = "fulfilled");
    var e = Za;
    (Za = null), (tl = 0), (nl = null);
    for (var t = 0; t < e.length; t++) (0, e[t])();
  }
}
var al = J.S;
J.S = function (e, t) {
  "object" == typeof t &&
    null !== t &&
    "function" == typeof t.then &&
    (function (e, t) {
      if (null === Za) {
        var n = (Za = []);
        (el = 0),
          (tl = Wc()),
          (nl = {
            status: "pending",
            value: void 0,
            then: function (e) {
              n.push(e);
            },
          });
      }
      el++, t.then(rl, rl);
    })(0, t),
    null !== al && al(e, t);
};
var ll = re(null);
function ol() {
  var e = ll.current;
  return null !== e ? e : ws.pooledCache;
}
function il(e, t) {
  le(ll, null === t ? ll.current : t.pool);
}
function ul() {
  var e = ol();
  return null === e ? null : { parent: Ka._currentValue, pool: e };
}
var sl = Error(E(460)),
  cl = Error(E(474)),
  dl = Error(E(542)),
  fl = { then: function () {} };
function pl(e) {
  return "fulfilled" === (e = e.status) || "rejected" === e;
}
function ml() {}
function hl(e, t, n) {
  switch (
    (void 0 === (n = e[n]) ? e.push(t) : n !== t && (t.then(ml, ml), (t = n)),
    t.status)
  ) {
    case "fulfilled":
      return t.value;
    case "rejected":
      throw (vl((e = t.reason)), e);
    default:
      if ("string" == typeof t.status) t.then(ml, ml);
      else {
        if (null !== (e = ws) && 100 < e.shellSuspendCounter)
          throw Error(E(482));
        ((e = t).status = "pending"),
          e.then(
            function (e) {
              if ("pending" === t.status) {
                var n = t;
                (n.status = "fulfilled"), (n.value = e);
              }
            },
            function (e) {
              if ("pending" === t.status) {
                var n = t;
                (n.status = "rejected"), (n.reason = e);
              }
            }
          );
      }
      switch (t.status) {
        case "fulfilled":
          return t.value;
        case "rejected":
          throw (vl((e = t.reason)), e);
      }
      throw ((gl = t), sl);
  }
}
var gl = null;
function yl() {
  if (null === gl) throw Error(E(459));
  var e = gl;
  return (gl = null), e;
}
function vl(e) {
  if (e === sl || e === dl) throw Error(E(483));
}
var bl = !1;
function kl(e) {
  e.updateQueue = {
    baseState: e.memoizedState,
    firstBaseUpdate: null,
    lastBaseUpdate: null,
    shared: { pending: null, lanes: 0, hiddenCallbacks: null },
    callbacks: null,
  };
}
function wl(e, t) {
  (e = e.updateQueue),
    t.updateQueue === e &&
      (t.updateQueue = {
        baseState: e.baseState,
        firstBaseUpdate: e.firstBaseUpdate,
        lastBaseUpdate: e.lastBaseUpdate,
        shared: e.shared,
        callbacks: null,
      });
}
function Sl(e) {
  return { lane: e, tag: 0, payload: null, callback: null, next: null };
}
function xl(e, t, n) {
  var r = e.updateQueue;
  if (null === r) return null;
  if (((r = r.shared), 2 & ks)) {
    var a = r.pending;
    return (
      null === a ? (t.next = t) : ((t.next = a.next), (a.next = t)),
      (r.pending = t),
      (t = Gr(e)),
      Kr(e, null, n),
      t
    );
  }
  return Wr(e, r, t, n), Gr(e);
}
function El(e, t, n) {
  if (null !== (t = t.updateQueue) && ((t = t.shared), 4194048 & n)) {
    var r = t.lanes;
    (n |= r &= e.pendingLanes), (t.lanes = n), Be(e, n);
  }
}
function Cl(e, t) {
  var n = e.updateQueue,
    r = e.alternate;
  if (null !== r && n === (r = r.updateQueue)) {
    var a = null,
      l = null;
    if (null !== (n = n.firstBaseUpdate)) {
      do {
        var o = {
          lane: n.lane,
          tag: n.tag,
          payload: n.payload,
          callback: null,
          next: null,
        };
        null === l ? (a = l = o) : (l = l.next = o), (n = n.next);
      } while (null !== n);
      null === l ? (a = l = t) : (l = l.next = t);
    } else a = l = t;
    return (
      (n = {
        baseState: r.baseState,
        firstBaseUpdate: a,
        lastBaseUpdate: l,
        shared: r.shared,
        callbacks: r.callbacks,
      }),
      void (e.updateQueue = n)
    );
  }
  null === (e = n.lastBaseUpdate) ? (n.firstBaseUpdate = t) : (e.next = t),
    (n.lastBaseUpdate = t);
}
var Pl = !1;
function Nl() {
  if (Pl) {
    if (null !== nl) throw nl;
  }
}
function zl(e, t, n, r) {
  Pl = !1;
  var a = e.updateQueue;
  bl = !1;
  var l = a.firstBaseUpdate,
    o = a.lastBaseUpdate,
    i = a.shared.pending;
  if (null !== i) {
    a.shared.pending = null;
    var u = i,
      s = u.next;
    (u.next = null), null === o ? (l = s) : (o.next = s), (o = u);
    var c = e.alternate;
    null !== c &&
      (i = (c = c.updateQueue).lastBaseUpdate) !== o &&
      (null === i ? (c.firstBaseUpdate = s) : (i.next = s),
      (c.lastBaseUpdate = u));
  }
  if (null !== l) {
    var d = a.baseState;
    for (o = 0, c = s = u = null, i = l; ; ) {
      var f = -536870913 & i.lane,
        p = f !== i.lane;
      if (p ? (xs & f) === f : (r & f) === f) {
        0 !== f && f === tl && (Pl = !0),
          null !== c &&
            (c = c.next =
              {
                lane: 0,
                tag: i.tag,
                payload: i.payload,
                callback: null,
                next: null,
              });
        e: {
          var m = e,
            h = i;
          f = t;
          var g = n;
          switch (h.tag) {
            case 1:
              if ("function" == typeof (m = h.payload)) {
                d = m.call(g, d, f);
                break e;
              }
              d = m;
              break e;
            case 3:
              m.flags = (-65537 & m.flags) | 128;
            case 0:
              if (
                null ==
                (f = "function" == typeof (m = h.payload) ? m.call(g, d, f) : m)
              )
                break e;
              d = L({}, d, f);
              break e;
            case 2:
              bl = !0;
          }
        }
        null !== (f = i.callback) &&
          ((e.flags |= 64),
          p && (e.flags |= 8192),
          null === (p = a.callbacks) ? (a.callbacks = [f]) : p.push(f));
      } else
        (p = {
          lane: f,
          tag: i.tag,
          payload: i.payload,
          callback: i.callback,
          next: null,
        }),
          null === c ? ((s = c = p), (u = d)) : (c = c.next = p),
          (o |= f);
      if (null === (i = i.next)) {
        if (null === (i = a.shared.pending)) break;
        (i = (p = i).next),
          (p.next = null),
          (a.lastBaseUpdate = p),
          (a.shared.pending = null);
      }
    }
    null === c && (u = d),
      (a.baseState = u),
      (a.firstBaseUpdate = s),
      (a.lastBaseUpdate = c),
      null === l && (a.shared.lanes = 0),
      (Ts |= o),
      (e.lanes = o),
      (e.memoizedState = d);
  }
}
function _l(e, t) {
  if ("function" != typeof e) throw Error(E(191, e));
  e.call(t);
}
function Ll(e, t) {
  var n = e.callbacks;
  if (null !== n)
    for (e.callbacks = null, e = 0; e < n.length; e++) _l(n[e], t);
}
var Tl = re(null),
  Dl = re(0);
function Ol(e, t) {
  le(Dl, (e = _s)), le(Tl, t), (_s = e | t.baseLanes);
}
function Al() {
  le(Dl, _s), le(Tl, Tl.current);
}
function Fl() {
  (_s = Dl.current), ae(Tl), ae(Dl);
}
var jl = 0,
  Ml = null,
  Il = null,
  Rl = null,
  Ul = !1,
  Vl = !1,
  $l = !1,
  Hl = 0,
  ql = 0,
  Bl = null,
  Ql = 0;
function Wl() {
  throw Error(E(321));
}
function Xl(e, t) {
  if (null === t) return !1;
  for (var n = 0; n < t.length && n < e.length; n++)
    if (!pr(e[n], t[n])) return !1;
  return !0;
}
function Yl(e, t, n, r, a, l) {
  return (
    (jl = l),
    (Ml = t),
    (t.memoizedState = null),
    (t.updateQueue = null),
    (t.lanes = 0),
    (J.H = null === e || null === e.memoizedState ? ci : di),
    ($l = !1),
    (l = n(r, a)),
    ($l = !1),
    Vl && (l = Gl(t, n, r, a)),
    Kl(e),
    l
  );
}
function Kl(e) {
  J.H = si;
  var t = null !== Il && null !== Il.next;
  if (((jl = 0), (Rl = Il = Ml = null), (Ul = !1), (ql = 0), (Bl = null), t))
    throw Error(E(300));
  null === e || Bi || (null !== (e = e.dependencies) && $a(e) && (Bi = !0));
}
function Gl(e, t, n, r) {
  Ml = e;
  var a = 0;
  do {
    if ((Vl && (Bl = null), (ql = 0), (Vl = !1), 25 <= a)) throw Error(E(301));
    if (((a += 1), (Rl = Il = null), null != e.updateQueue)) {
      var l = e.updateQueue;
      (l.lastEffect = null),
        (l.events = null),
        (l.stores = null),
        null != l.memoCache && (l.memoCache.index = 0);
    }
    (J.H = fi), (l = t(n, r));
  } while (Vl);
  return l;
}
function Jl() {
  var e = J.H,
    t = e.useState()[0];
  return (
    (t = "function" == typeof t.then ? ao(t) : t),
    (e = e.useState()[0]),
    (null !== Il ? Il.memoizedState : null) !== e && (Ml.flags |= 1024),
    t
  );
}
function Zl() {
  var e = 0 !== Hl;
  return (Hl = 0), e;
}
function eo(e, t, n) {
  (t.updateQueue = e.updateQueue), (t.flags &= -2053), (e.lanes &= ~n);
}
function to(e) {
  if (Ul) {
    for (e = e.memoizedState; null !== e; ) {
      var t = e.queue;
      null !== t && (t.pending = null), (e = e.next);
    }
    Ul = !1;
  }
  (jl = 0), (Rl = Il = Ml = null), (Vl = !1), (ql = Hl = 0), (Bl = null);
}
function no() {
  var e = {
    memoizedState: null,
    baseState: null,
    baseQueue: null,
    queue: null,
    next: null,
  };
  return null === Rl ? (Ml.memoizedState = Rl = e) : (Rl = Rl.next = e), Rl;
}
function ro() {
  if (null === Il) {
    var e = Ml.alternate;
    e = null !== e ? e.memoizedState : null;
  } else e = Il.next;
  var t = null === Rl ? Ml.memoizedState : Rl.next;
  if (null !== t) (Rl = t), (Il = e);
  else {
    if (null === e) {
      if (null === Ml.alternate) throw Error(E(467));
      throw Error(E(310));
    }
    (e = {
      memoizedState: (Il = e).memoizedState,
      baseState: Il.baseState,
      baseQueue: Il.baseQueue,
      queue: Il.queue,
      next: null,
    }),
      null === Rl ? (Ml.memoizedState = Rl = e) : (Rl = Rl.next = e);
  }
  return Rl;
}
function ao(e) {
  var t = ql;
  return (
    (ql += 1),
    null === Bl && (Bl = []),
    (e = hl(Bl, e, t)),
    (t = Ml),
    null === (null === Rl ? t.memoizedState : Rl.next) &&
      ((t = t.alternate),
      (J.H = null === t || null === t.memoizedState ? ci : di)),
    e
  );
}
function lo(e) {
  if (null !== e && "object" == typeof e) {
    if ("function" == typeof e.then) return ao(e);
    if (e.$$typeof === R) return qa(e);
  }
  throw Error(E(438, String(e)));
}
function oo(e) {
  var t = null,
    n = Ml.updateQueue;
  if ((null !== n && (t = n.memoCache), null == t)) {
    var r = Ml.alternate;
    null !== r &&
      null !== (r = r.updateQueue) &&
      null != (r = r.memoCache) &&
      (t = {
        data: r.data.map(function (e) {
          return e.slice();
        }),
        index: 0,
      });
  }
  if (
    (null == t && (t = { data: [], index: 0 }),
    null === n &&
      ((n = { lastEffect: null, events: null, stores: null, memoCache: null }),
      (Ml.updateQueue = n)),
    (n.memoCache = t),
    void 0 === (n = t.data[t.index]))
  )
    for (n = t.data[t.index] = Array(e), r = 0; r < e; r++) n[r] = Q;
  return t.index++, n;
}
function io(e, t) {
  return "function" == typeof t ? t(e) : t;
}
function uo(e) {
  return so(ro(), Il, e);
}
function so(e, t, n) {
  var r = e.queue;
  if (null === r) throw Error(E(311));
  r.lastRenderedReducer = n;
  var a = e.baseQueue,
    l = r.pending;
  if (null !== l) {
    if (null !== a) {
      var o = a.next;
      (a.next = l.next), (l.next = o);
    }
    (t.baseQueue = a = l), (r.pending = null);
  }
  if (((l = e.baseState), null === a)) e.memoizedState = l;
  else {
    var i = (o = null),
      u = null,
      s = (t = a.next),
      c = !1;
    do {
      var d = -536870913 & s.lane;
      if (d !== s.lane ? (xs & d) === d : (jl & d) === d) {
        var f = s.revertLane;
        if (0 === f)
          null !== u &&
            (u = u.next =
              {
                lane: 0,
                revertLane: 0,
                action: s.action,
                hasEagerState: s.hasEagerState,
                eagerState: s.eagerState,
                next: null,
              }),
            d === tl && (c = !0);
        else {
          if ((jl & f) === f) {
            (s = s.next), f === tl && (c = !0);
            continue;
          }
          (d = {
            lane: 0,
            revertLane: s.revertLane,
            action: s.action,
            hasEagerState: s.hasEagerState,
            eagerState: s.eagerState,
            next: null,
          }),
            null === u ? ((i = u = d), (o = l)) : (u = u.next = d),
            (Ml.lanes |= f),
            (Ts |= f);
        }
        (d = s.action),
          $l && n(l, d),
          (l = s.hasEagerState ? s.eagerState : n(l, d));
      } else
        (f = {
          lane: d,
          revertLane: s.revertLane,
          action: s.action,
          hasEagerState: s.hasEagerState,
          eagerState: s.eagerState,
          next: null,
        }),
          null === u ? ((i = u = f), (o = l)) : (u = u.next = f),
          (Ml.lanes |= d),
          (Ts |= d);
      s = s.next;
    } while (null !== s && s !== t);
    if (
      (null === u ? (o = l) : (u.next = i),
      !pr(l, e.memoizedState) && ((Bi = !0), c && null !== (n = nl)))
    )
      throw n;
    (e.memoizedState = l),
      (e.baseState = o),
      (e.baseQueue = u),
      (r.lastRenderedState = l);
  }
  return null === a && (r.lanes = 0), [e.memoizedState, r.dispatch];
}
function co(e) {
  var t = ro(),
    n = t.queue;
  if (null === n) throw Error(E(311));
  n.lastRenderedReducer = e;
  var r = n.dispatch,
    a = n.pending,
    l = t.memoizedState;
  if (null !== a) {
    n.pending = null;
    var o = (a = a.next);
    do {
      (l = e(l, o.action)), (o = o.next);
    } while (o !== a);
    pr(l, t.memoizedState) || (Bi = !0),
      (t.memoizedState = l),
      null === t.baseQueue && (t.baseState = l),
      (n.lastRenderedState = l);
  }
  return [l, r];
}
function fo(e, t, n) {
  var r = Ml,
    a = ro(),
    l = xa;
  if (l) {
    if (void 0 === n) throw Error(E(407));
    n = n();
  } else n = t();
  var o = !pr((Il || a).memoizedState, n);
  if (
    (o && ((a.memoizedState = n), (Bi = !0)),
    (a = a.queue),
    Fo(2048, 8, ho.bind(null, r, a, e), [e]),
    a.getSnapshot !== t || o || (null !== Rl && 1 & Rl.memoizedState.tag))
  ) {
    if (
      ((r.flags |= 2048),
      Do(
        9,
        { destroy: void 0, resource: void 0 },
        mo.bind(null, r, a, n, t),
        null
      ),
      null === ws)
    )
      throw Error(E(349));
    l || 124 & jl || po(r, t, n);
  }
  return n;
}
function po(e, t, n) {
  (e.flags |= 16384),
    (e = { getSnapshot: t, value: n }),
    null === (t = Ml.updateQueue)
      ? ((t = {
          lastEffect: null,
          events: null,
          stores: null,
          memoCache: null,
        }),
        (Ml.updateQueue = t),
        (t.stores = [e]))
      : null === (n = t.stores)
      ? (t.stores = [e])
      : n.push(e);
}
function mo(e, t, n, r) {
  (t.value = n), (t.getSnapshot = r), go(t) && yo(e);
}
function ho(e, t, n) {
  return n(function () {
    go(t) && yo(e);
  });
}
function go(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !pr(e, n);
  } catch (r) {
    return !0;
  }
}
function yo(e) {
  var t = Yr(e, 2);
  null !== t && ec(t, e, 2);
}
function vo(e) {
  var t = no();
  if ("function" == typeof e) {
    var n = e;
    if (((e = n()), $l)) {
      Le(!0);
      try {
        n();
      } finally {
        Le(!1);
      }
    }
  }
  return (
    (t.memoizedState = t.baseState = e),
    (t.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: io,
      lastRenderedState: e,
    }),
    t
  );
}
function bo(e, t, n, r) {
  return (e.baseState = n), so(e, Il, "function" == typeof r ? r : io);
}
function ko(e, t, n, r, a) {
  if (oi(e)) throw Error(E(485));
  if (null !== (e = t.action)) {
    var l = {
      payload: a,
      action: e,
      next: null,
      isTransition: !0,
      status: "pending",
      value: null,
      reason: null,
      listeners: [],
      then: function (e) {
        l.listeners.push(e);
      },
    };
    null !== J.T ? n(!0) : (l.isTransition = !1),
      r(l),
      null === (n = t.pending)
        ? ((l.next = t.pending = l), wo(t, l))
        : ((l.next = n.next), (t.pending = n.next = l));
  }
}
function wo(e, t) {
  var n = t.action,
    r = t.payload,
    a = e.state;
  if (t.isTransition) {
    var l = J.T,
      o = {};
    J.T = o;
    try {
      var i = n(a, r),
        u = J.S;
      null !== u && u(o, i), So(e, t, i);
    } catch (s) {
      Eo(e, t, s);
    } finally {
      J.T = l;
    }
  } else
    try {
      So(e, t, (l = n(a, r)));
    } catch (c) {
      Eo(e, t, c);
    }
}
function So(e, t, n) {
  null !== n && "object" == typeof n && "function" == typeof n.then
    ? n.then(
        function (n) {
          xo(e, t, n);
        },
        function (n) {
          return Eo(e, t, n);
        }
      )
    : xo(e, t, n);
}
function xo(e, t, n) {
  (t.status = "fulfilled"),
    (t.value = n),
    Co(t),
    (e.state = n),
    null !== (t = e.pending) &&
      ((n = t.next) === t
        ? (e.pending = null)
        : ((n = n.next), (t.next = n), wo(e, n)));
}
function Eo(e, t, n) {
  var r = e.pending;
  if (((e.pending = null), null !== r)) {
    r = r.next;
    do {
      (t.status = "rejected"), (t.reason = n), Co(t), (t = t.next);
    } while (t !== r);
  }
  e.action = null;
}
function Co(e) {
  e = e.listeners;
  for (var t = 0; t < e.length; t++) (0, e[t])();
}
function Po(e, t) {
  return t;
}
function No(e, t) {
  if (xa) {
    var n = ws.formState;
    if (null !== n) {
      e: {
        var r = Ml;
        if (xa) {
          if (Sa) {
            t: {
              for (var a = Sa, l = Ca; 8 !== a.nodeType; ) {
                if (!l) {
                  a = null;
                  break t;
                }
                if (null === (a = Fd(a.nextSibling))) {
                  a = null;
                  break t;
                }
              }
              a = "F!" === (l = a.data) || "F" === l ? a : null;
            }
            if (a) {
              (Sa = Fd(a.nextSibling)), (r = "F!" === a.data);
              break e;
            }
          }
          Na(r);
        }
        r = !1;
      }
      r && (t = n[0]);
    }
  }
  return (
    ((n = no()).memoizedState = n.baseState = t),
    (r = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Po,
      lastRenderedState: t,
    }),
    (n.queue = r),
    (n = ri.bind(null, Ml, r)),
    (r.dispatch = n),
    (r = vo(!1)),
    (l = li.bind(null, Ml, !1, r.queue)),
    (a = { state: t, dispatch: null, action: e, pending: null }),
    ((r = no()).queue = a),
    (n = ko.bind(null, Ml, a, l, n)),
    (a.dispatch = n),
    (r.memoizedState = e),
    [t, n, !1]
  );
}
function zo(e) {
  return _o(ro(), Il, e);
}
function _o(e, t, n) {
  if (
    ((t = so(e, t, Po)[0]),
    (e = uo(io)[0]),
    "object" == typeof t && null !== t && "function" == typeof t.then)
  )
    try {
      var r = ao(t);
    } catch (o) {
      if (o === sl) throw dl;
      throw o;
    }
  else r = t;
  var a = (t = ro()).queue,
    l = a.dispatch;
  return (
    n !== t.memoizedState &&
      ((Ml.flags |= 2048),
      Do(9, { destroy: void 0, resource: void 0 }, Lo.bind(null, a, n), null)),
    [r, l, e]
  );
}
function Lo(e, t) {
  e.action = t;
}
function To(e) {
  var t = ro(),
    n = Il;
  if (null !== n) return _o(t, n, e);
  ro(), (t = t.memoizedState);
  var r = (n = ro()).queue.dispatch;
  return (n.memoizedState = e), [t, r, !1];
}
function Do(e, t, n, r) {
  return (
    (e = { tag: e, create: n, deps: r, inst: t, next: null }),
    null === (t = Ml.updateQueue) &&
      ((t = { lastEffect: null, events: null, stores: null, memoCache: null }),
      (Ml.updateQueue = t)),
    null === (n = t.lastEffect)
      ? (t.lastEffect = e.next = e)
      : ((r = n.next), (n.next = e), (e.next = r), (t.lastEffect = e)),
    e
  );
}
function Oo() {
  return ro().memoizedState;
}
function Ao(e, t, n, r) {
  var a = no();
  (r = void 0 === r ? null : r),
    (Ml.flags |= e),
    (a.memoizedState = Do(1 | t, { destroy: void 0, resource: void 0 }, n, r));
}
function Fo(e, t, n, r) {
  var a = ro();
  r = void 0 === r ? null : r;
  var l = a.memoizedState.inst;
  null !== Il && null !== r && Xl(r, Il.memoizedState.deps)
    ? (a.memoizedState = Do(t, l, n, r))
    : ((Ml.flags |= e), (a.memoizedState = Do(1 | t, l, n, r)));
}
function jo(e, t) {
  Ao(8390656, 8, e, t);
}
function Mo(e, t) {
  Fo(2048, 8, e, t);
}
function Io(e, t) {
  return Fo(4, 2, e, t);
}
function Ro(e, t) {
  return Fo(4, 4, e, t);
}
function Uo(e, t) {
  if ("function" == typeof t) {
    e = e();
    var n = t(e);
    return function () {
      "function" == typeof n ? n() : t(null);
    };
  }
  if (null != t)
    return (
      (e = e()),
      (t.current = e),
      function () {
        t.current = null;
      }
    );
}
function Vo(e, t, n) {
  (n = null != n ? n.concat([e]) : null), Fo(4, 4, Uo.bind(null, t, e), n);
}
function $o() {}
function Ho(e, t) {
  var n = ro();
  t = void 0 === t ? null : t;
  var r = n.memoizedState;
  return null !== t && Xl(t, r[1]) ? r[0] : ((n.memoizedState = [e, t]), e);
}
function qo(e, t) {
  var n = ro();
  t = void 0 === t ? null : t;
  var r = n.memoizedState;
  if (null !== t && Xl(t, r[1])) return r[0];
  if (((r = e()), $l)) {
    Le(!0);
    try {
      e();
    } finally {
      Le(!1);
    }
  }
  return (n.memoizedState = [r, t]), r;
}
function Bo(e, t, n) {
  return void 0 === n || 1073741824 & jl
    ? (e.memoizedState = t)
    : ((e.memoizedState = n), (e = Zs()), (Ml.lanes |= e), (Ts |= e), n);
}
function Qo(e, t, n, r) {
  return pr(n, t)
    ? n
    : null !== Tl.current
    ? ((e = Bo(e, n, r)), pr(e, t) || (Bi = !0), e)
    : 42 & jl
    ? ((e = Zs()), (Ml.lanes |= e), (Ts |= e), t)
    : ((Bi = !0), (e.memoizedState = n));
}
function Wo(e, t, n, r, a) {
  var l = Z.p;
  Z.p = 0 !== l && 8 > l ? l : 8;
  var o,
    i,
    u,
    s = J.T,
    c = {};
  (J.T = c), li(e, !1, t, n);
  try {
    var d = a(),
      f = J.S;
    if (
      (null !== f && f(c, d),
      null !== d && "object" == typeof d && "function" == typeof d.then)
    )
      ai(
        e,
        t,
        ((o = r),
        (i = []),
        (u = {
          status: "pending",
          value: null,
          reason: null,
          then: function (e) {
            i.push(e);
          },
        }),
        d.then(
          function () {
            (u.status = "fulfilled"), (u.value = o);
            for (var e = 0; e < i.length; e++) (0, i[e])(o);
          },
          function (e) {
            for (u.status = "rejected", u.reason = e, e = 0; e < i.length; e++)
              (0, i[e])(void 0);
          }
        ),
        u),
        Js()
      );
    else ai(e, t, r, Js());
  } catch (p) {
    ai(e, t, { then: function () {}, status: "rejected", reason: p }, Js());
  } finally {
    (Z.p = l), (J.T = s);
  }
}
function Xo() {}
function Yo(e, t, n, r) {
  if (5 !== e.tag) throw Error(E(476));
  var a = Ko(e).queue;
  Wo(
    e,
    a,
    t,
    ee,
    null === n
      ? Xo
      : function () {
          return Go(e), n(r);
        }
  );
}
function Ko(e) {
  var t = e.memoizedState;
  if (null !== t) return t;
  var n = {};
  return (
    ((t = {
      memoizedState: ee,
      baseState: ee,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: io,
        lastRenderedState: ee,
      },
      next: null,
    }).next = {
      memoizedState: n,
      baseState: n,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: io,
        lastRenderedState: n,
      },
      next: null,
    }),
    (e.memoizedState = t),
    null !== (e = e.alternate) && (e.memoizedState = t),
    t
  );
}
function Go(e) {
  ai(e, Ko(e).next.queue, {}, Js());
}
function Jo() {
  return qa(pf);
}
function Zo() {
  return ro().memoizedState;
}
function ei() {
  return ro().memoizedState;
}
function ti(e) {
  for (var t = e.return; null !== t; ) {
    switch (t.tag) {
      case 24:
      case 3:
        var n = Js(),
          r = xl(t, (e = Sl(n)), n);
        return (
          null !== r && (ec(r, t, n), El(r, t, n)),
          (t = { cache: Ga() }),
          void (e.payload = t)
        );
    }
    t = t.return;
  }
}
function ni(e, t, n) {
  var r = Js();
  (n = {
    lane: r,
    revertLane: 0,
    action: n,
    hasEagerState: !1,
    eagerState: null,
    next: null,
  }),
    oi(e)
      ? ii(t, n)
      : null !== (n = Xr(e, t, n, r)) && (ec(n, e, r), ui(n, t, r));
}
function ri(e, t, n) {
  ai(e, t, n, Js());
}
function ai(e, t, n, r) {
  var a = {
    lane: r,
    revertLane: 0,
    action: n,
    hasEagerState: !1,
    eagerState: null,
    next: null,
  };
  if (oi(e)) ii(t, a);
  else {
    var l = e.alternate;
    if (
      0 === e.lanes &&
      (null === l || 0 === l.lanes) &&
      null !== (l = t.lastRenderedReducer)
    )
      try {
        var o = t.lastRenderedState,
          i = l(o, n);
        if (((a.hasEagerState = !0), (a.eagerState = i), pr(i, o)))
          return Wr(e, t, a, 0), null === ws && Qr(), !1;
      } catch (u) {}
    if (null !== (n = Xr(e, t, a, r))) return ec(n, e, r), ui(n, t, r), !0;
  }
  return !1;
}
function li(e, t, n, r) {
  if (
    ((r = {
      lane: 2,
      revertLane: Wc(),
      action: r,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
    oi(e))
  ) {
    if (t) throw Error(E(479));
  } else null !== (t = Xr(e, n, r, 2)) && ec(t, e, 2);
}
function oi(e) {
  var t = e.alternate;
  return e === Ml || (null !== t && t === Ml);
}
function ii(e, t) {
  Vl = Ul = !0;
  var n = e.pending;
  null === n ? (t.next = t) : ((t.next = n.next), (n.next = t)),
    (e.pending = t);
}
function ui(e, t, n) {
  if (4194048 & n) {
    var r = t.lanes;
    (n |= r &= e.pendingLanes), (t.lanes = n), Be(e, n);
  }
}
var si = {
    readContext: qa,
    use: lo,
    useCallback: Wl,
    useContext: Wl,
    useEffect: Wl,
    useImperativeHandle: Wl,
    useLayoutEffect: Wl,
    useInsertionEffect: Wl,
    useMemo: Wl,
    useReducer: Wl,
    useRef: Wl,
    useState: Wl,
    useDebugValue: Wl,
    useDeferredValue: Wl,
    useTransition: Wl,
    useSyncExternalStore: Wl,
    useId: Wl,
    useHostTransitionStatus: Wl,
    useFormState: Wl,
    useActionState: Wl,
    useOptimistic: Wl,
    useMemoCache: Wl,
    useCacheRefresh: Wl,
  },
  ci = {
    readContext: qa,
    use: lo,
    useCallback: function (e, t) {
      return (no().memoizedState = [e, void 0 === t ? null : t]), e;
    },
    useContext: qa,
    useEffect: jo,
    useImperativeHandle: function (e, t, n) {
      (n = null != n ? n.concat([e]) : null),
        Ao(4194308, 4, Uo.bind(null, t, e), n);
    },
    useLayoutEffect: function (e, t) {
      return Ao(4194308, 4, e, t);
    },
    useInsertionEffect: function (e, t) {
      Ao(4, 2, e, t);
    },
    useMemo: function (e, t) {
      var n = no();
      t = void 0 === t ? null : t;
      var r = e();
      if ($l) {
        Le(!0);
        try {
          e();
        } finally {
          Le(!1);
        }
      }
      return (n.memoizedState = [r, t]), r;
    },
    useReducer: function (e, t, n) {
      var r = no();
      if (void 0 !== n) {
        var a = n(t);
        if ($l) {
          Le(!0);
          try {
            n(t);
          } finally {
            Le(!1);
          }
        }
      } else a = t;
      return (
        (r.memoizedState = r.baseState = a),
        (e = {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: e,
          lastRenderedState: a,
        }),
        (r.queue = e),
        (e = e.dispatch = ni.bind(null, Ml, e)),
        [r.memoizedState, e]
      );
    },
    useRef: function (e) {
      return (e = { current: e }), (no().memoizedState = e);
    },
    useState: function (e) {
      var t = (e = vo(e)).queue,
        n = ri.bind(null, Ml, t);
      return (t.dispatch = n), [e.memoizedState, n];
    },
    useDebugValue: $o,
    useDeferredValue: function (e, t) {
      return Bo(no(), e, t);
    },
    useTransition: function () {
      var e = vo(!1);
      return (
        (e = Wo.bind(null, Ml, e.queue, !0, !1)),
        (no().memoizedState = e),
        [!1, e]
      );
    },
    useSyncExternalStore: function (e, t, n) {
      var r = Ml,
        a = no();
      if (xa) {
        if (void 0 === n) throw Error(E(407));
        n = n();
      } else {
        if (((n = t()), null === ws)) throw Error(E(349));
        124 & xs || po(r, t, n);
      }
      a.memoizedState = n;
      var l = { value: n, getSnapshot: t };
      return (
        (a.queue = l),
        jo(ho.bind(null, r, l, e), [e]),
        (r.flags |= 2048),
        Do(
          9,
          { destroy: void 0, resource: void 0 },
          mo.bind(null, r, l, n, t),
          null
        ),
        n
      );
    },
    useId: function () {
      var e = no(),
        t = ws.identifierPrefix;
      if (xa) {
        var n = ga;
        (t =
          "«" +
          t +
          "R" +
          (n = (ha & ~(1 << (32 - Te(ha) - 1))).toString(32) + n)),
          0 < (n = Hl++) && (t += "H" + n.toString(32)),
          (t += "»");
      } else t = "«" + t + "r" + (n = Ql++).toString(32) + "»";
      return (e.memoizedState = t);
    },
    useHostTransitionStatus: Jo,
    useFormState: No,
    useActionState: No,
    useOptimistic: function (e) {
      var t = no();
      t.memoizedState = t.baseState = e;
      var n = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null,
      };
      return (
        (t.queue = n), (t = li.bind(null, Ml, !0, n)), (n.dispatch = t), [e, t]
      );
    },
    useMemoCache: oo,
    useCacheRefresh: function () {
      return (no().memoizedState = ti.bind(null, Ml));
    },
  },
  di = {
    readContext: qa,
    use: lo,
    useCallback: Ho,
    useContext: qa,
    useEffect: Mo,
    useImperativeHandle: Vo,
    useInsertionEffect: Io,
    useLayoutEffect: Ro,
    useMemo: qo,
    useReducer: uo,
    useRef: Oo,
    useState: function () {
      return uo(io);
    },
    useDebugValue: $o,
    useDeferredValue: function (e, t) {
      return Qo(ro(), Il.memoizedState, e, t);
    },
    useTransition: function () {
      var e = uo(io)[0],
        t = ro().memoizedState;
      return ["boolean" == typeof e ? e : ao(e), t];
    },
    useSyncExternalStore: fo,
    useId: Zo,
    useHostTransitionStatus: Jo,
    useFormState: zo,
    useActionState: zo,
    useOptimistic: function (e, t) {
      return bo(ro(), 0, e, t);
    },
    useMemoCache: oo,
    useCacheRefresh: ei,
  },
  fi = {
    readContext: qa,
    use: lo,
    useCallback: Ho,
    useContext: qa,
    useEffect: Mo,
    useImperativeHandle: Vo,
    useInsertionEffect: Io,
    useLayoutEffect: Ro,
    useMemo: qo,
    useReducer: co,
    useRef: Oo,
    useState: function () {
      return co(io);
    },
    useDebugValue: $o,
    useDeferredValue: function (e, t) {
      var n = ro();
      return null === Il ? Bo(n, e, t) : Qo(n, Il.memoizedState, e, t);
    },
    useTransition: function () {
      var e = co(io)[0],
        t = ro().memoizedState;
      return ["boolean" == typeof e ? e : ao(e), t];
    },
    useSyncExternalStore: fo,
    useId: Zo,
    useHostTransitionStatus: Jo,
    useFormState: To,
    useActionState: To,
    useOptimistic: function (e, t) {
      var n = ro();
      return null !== Il
        ? bo(n, 0, e, t)
        : ((n.baseState = e), [e, n.queue.dispatch]);
    },
    useMemoCache: oo,
    useCacheRefresh: ei,
  },
  pi = null,
  mi = 0;
function hi(e) {
  var t = mi;
  return (mi += 1), null === pi && (pi = []), hl(pi, e, t);
}
function gi(e, t) {
  (t = t.props.ref), (e.ref = void 0 !== t ? t : null);
}
function yi(e, t) {
  if (t.$$typeof === T) throw Error(E(525));
  throw (
    ((e = Object.prototype.toString.call(t)),
    Error(
      E(
        31,
        "[object Object]" === e
          ? "object with keys {" + Object.keys(t).join(", ") + "}"
          : e
      )
    ))
  );
}
function vi(e) {
  return (0, e._init)(e._payload);
}
function bi(e) {
  function t(t, n) {
    if (e) {
      var r = t.deletions;
      null === r ? ((t.deletions = [n]), (t.flags |= 16)) : r.push(n);
    }
  }
  function n(n, r) {
    if (!e) return null;
    for (; null !== r; ) t(n, r), (r = r.sibling);
    return null;
  }
  function r(e) {
    for (var t = new Map(); null !== e; )
      null !== e.key ? t.set(e.key, e) : t.set(e.index, e), (e = e.sibling);
    return t;
  }
  function a(e, t) {
    return ((e = na(e, t)).index = 0), (e.sibling = null), e;
  }
  function l(t, n, r) {
    return (
      (t.index = r),
      e
        ? null !== (r = t.alternate)
          ? (r = r.index) < n
            ? ((t.flags |= 67108866), n)
            : r
          : ((t.flags |= 67108866), n)
        : ((t.flags |= 1048576), n)
    );
  }
  function o(t) {
    return e && null === t.alternate && (t.flags |= 67108866), t;
  }
  function i(e, t, n, r) {
    return null === t || 6 !== t.tag
      ? (((t = oa(n, e.mode, r)).return = e), t)
      : (((t = a(t, n)).return = e), t);
  }
  function u(e, t, n, r) {
    var l = n.type;
    return l === A
      ? c(e, t, n.props.children, r, n.key)
      : null !== t &&
        (t.elementType === l ||
          ("object" == typeof l &&
            null !== l &&
            l.$$typeof === q &&
            vi(l) === t.type))
      ? (gi((t = a(t, n.props)), n), (t.return = e), t)
      : (gi((t = aa(n.type, n.key, n.props, null, e.mode, r)), n),
        (t.return = e),
        t);
  }
  function s(e, t, n, r) {
    return null === t ||
      4 !== t.tag ||
      t.stateNode.containerInfo !== n.containerInfo ||
      t.stateNode.implementation !== n.implementation
      ? (((t = ia(n, e.mode, r)).return = e), t)
      : (((t = a(t, n.children || [])).return = e), t);
  }
  function c(e, t, n, r, l) {
    return null === t || 7 !== t.tag
      ? (((t = la(n, e.mode, r, l)).return = e), t)
      : (((t = a(t, n)).return = e), t);
  }
  function d(e, t, n) {
    if (
      ("string" == typeof t && "" !== t) ||
      "number" == typeof t ||
      "bigint" == typeof t
    )
      return ((t = oa("" + t, e.mode, n)).return = e), t;
    if ("object" == typeof t && null !== t) {
      switch (t.$$typeof) {
        case D:
          return (
            gi((n = aa(t.type, t.key, t.props, null, e.mode, n)), t),
            (n.return = e),
            n
          );
        case O:
          return ((t = ia(t, e.mode, n)).return = e), t;
        case q:
          return d(e, (t = (0, t._init)(t._payload)), n);
      }
      if (G(t) || X(t)) return ((t = la(t, e.mode, n, null)).return = e), t;
      if ("function" == typeof t.then) return d(e, hi(t), n);
      if (t.$$typeof === R) return d(e, Ba(e, t), n);
      yi(e, t);
    }
    return null;
  }
  function f(e, t, n, r) {
    var a = null !== t ? t.key : null;
    if (
      ("string" == typeof n && "" !== n) ||
      "number" == typeof n ||
      "bigint" == typeof n
    )
      return null !== a ? null : i(e, t, "" + n, r);
    if ("object" == typeof n && null !== n) {
      switch (n.$$typeof) {
        case D:
          return n.key === a ? u(e, t, n, r) : null;
        case O:
          return n.key === a ? s(e, t, n, r) : null;
        case q:
          return f(e, t, (n = (a = n._init)(n._payload)), r);
      }
      if (G(n) || X(n)) return null !== a ? null : c(e, t, n, r, null);
      if ("function" == typeof n.then) return f(e, t, hi(n), r);
      if (n.$$typeof === R) return f(e, t, Ba(e, n), r);
      yi(e, n);
    }
    return null;
  }
  function p(e, t, n, r, a) {
    if (
      ("string" == typeof r && "" !== r) ||
      "number" == typeof r ||
      "bigint" == typeof r
    )
      return i(t, (e = e.get(n) || null), "" + r, a);
    if ("object" == typeof r && null !== r) {
      switch (r.$$typeof) {
        case D:
          return u(t, (e = e.get(null === r.key ? n : r.key) || null), r, a);
        case O:
          return s(t, (e = e.get(null === r.key ? n : r.key) || null), r, a);
        case q:
          return p(e, t, n, (r = (0, r._init)(r._payload)), a);
      }
      if (G(r) || X(r)) return c(t, (e = e.get(n) || null), r, a, null);
      if ("function" == typeof r.then) return p(e, t, n, hi(r), a);
      if (r.$$typeof === R) return p(e, t, n, Ba(t, r), a);
      yi(t, r);
    }
    return null;
  }
  function m(i, u, s, c) {
    if (
      ("object" == typeof s &&
        null !== s &&
        s.type === A &&
        null === s.key &&
        (s = s.props.children),
      "object" == typeof s && null !== s)
    ) {
      switch (s.$$typeof) {
        case D:
          e: {
            for (var h = s.key; null !== u; ) {
              if (u.key === h) {
                if ((h = s.type) === A) {
                  if (7 === u.tag) {
                    n(i, u.sibling),
                      ((c = a(u, s.props.children)).return = i),
                      (i = c);
                    break e;
                  }
                } else if (
                  u.elementType === h ||
                  ("object" == typeof h &&
                    null !== h &&
                    h.$$typeof === q &&
                    vi(h) === u.type)
                ) {
                  n(i, u.sibling),
                    gi((c = a(u, s.props)), s),
                    (c.return = i),
                    (i = c);
                  break e;
                }
                n(i, u);
                break;
              }
              t(i, u), (u = u.sibling);
            }
            s.type === A
              ? (((c = la(s.props.children, i.mode, c, s.key)).return = i),
                (i = c))
              : (gi((c = aa(s.type, s.key, s.props, null, i.mode, c)), s),
                (c.return = i),
                (i = c));
          }
          return o(i);
        case O:
          e: {
            for (h = s.key; null !== u; ) {
              if (u.key === h) {
                if (
                  4 === u.tag &&
                  u.stateNode.containerInfo === s.containerInfo &&
                  u.stateNode.implementation === s.implementation
                ) {
                  n(i, u.sibling),
                    ((c = a(u, s.children || [])).return = i),
                    (i = c);
                  break e;
                }
                n(i, u);
                break;
              }
              t(i, u), (u = u.sibling);
            }
            ((c = ia(s, i.mode, c)).return = i), (i = c);
          }
          return o(i);
        case q:
          return m(i, u, (s = (h = s._init)(s._payload)), c);
      }
      if (G(s))
        return (function (a, o, i, u) {
          for (
            var s = null, c = null, m = o, h = (o = 0), g = null;
            null !== m && h < i.length;
            h++
          ) {
            m.index > h ? ((g = m), (m = null)) : (g = m.sibling);
            var y = f(a, m, i[h], u);
            if (null === y) {
              null === m && (m = g);
              break;
            }
            e && m && null === y.alternate && t(a, m),
              (o = l(y, o, h)),
              null === c ? (s = y) : (c.sibling = y),
              (c = y),
              (m = g);
          }
          if (h === i.length) return n(a, m), xa && ya(a, h), s;
          if (null === m) {
            for (; h < i.length; h++)
              null !== (m = d(a, i[h], u)) &&
                ((o = l(m, o, h)),
                null === c ? (s = m) : (c.sibling = m),
                (c = m));
            return xa && ya(a, h), s;
          }
          for (m = r(m); h < i.length; h++)
            null !== (g = p(m, a, h, i[h], u)) &&
              (e &&
                null !== g.alternate &&
                m.delete(null === g.key ? h : g.key),
              (o = l(g, o, h)),
              null === c ? (s = g) : (c.sibling = g),
              (c = g));
          return (
            e &&
              m.forEach(function (e) {
                return t(a, e);
              }),
            xa && ya(a, h),
            s
          );
        })(i, u, s, c);
      if (X(s)) {
        if ("function" != typeof (h = X(s))) throw Error(E(150));
        return (function (a, o, i, u) {
          if (null == i) throw Error(E(151));
          for (
            var s = null, c = null, m = o, h = (o = 0), g = null, y = i.next();
            null !== m && !y.done;
            h++, y = i.next()
          ) {
            m.index > h ? ((g = m), (m = null)) : (g = m.sibling);
            var v = f(a, m, y.value, u);
            if (null === v) {
              null === m && (m = g);
              break;
            }
            e && m && null === v.alternate && t(a, m),
              (o = l(v, o, h)),
              null === c ? (s = v) : (c.sibling = v),
              (c = v),
              (m = g);
          }
          if (y.done) return n(a, m), xa && ya(a, h), s;
          if (null === m) {
            for (; !y.done; h++, y = i.next())
              null !== (y = d(a, y.value, u)) &&
                ((o = l(y, o, h)),
                null === c ? (s = y) : (c.sibling = y),
                (c = y));
            return xa && ya(a, h), s;
          }
          for (m = r(m); !y.done; h++, y = i.next())
            null !== (y = p(m, a, h, y.value, u)) &&
              (e &&
                null !== y.alternate &&
                m.delete(null === y.key ? h : y.key),
              (o = l(y, o, h)),
              null === c ? (s = y) : (c.sibling = y),
              (c = y));
          return (
            e &&
              m.forEach(function (e) {
                return t(a, e);
              }),
            xa && ya(a, h),
            s
          );
        })(i, u, (s = h.call(s)), c);
      }
      if ("function" == typeof s.then) return m(i, u, hi(s), c);
      if (s.$$typeof === R) return m(i, u, Ba(i, s), c);
      yi(i, s);
    }
    return ("string" == typeof s && "" !== s) ||
      "number" == typeof s ||
      "bigint" == typeof s
      ? ((s = "" + s),
        null !== u && 6 === u.tag
          ? (n(i, u.sibling), ((c = a(u, s)).return = i), (i = c))
          : (n(i, u), ((c = oa(s, i.mode, c)).return = i), (i = c)),
        o(i))
      : n(i, u);
  }
  return function (e, t, n, r) {
    try {
      mi = 0;
      var a = m(e, t, n, r);
      return (pi = null), a;
    } catch (o) {
      if (o === sl || o === dl) throw o;
      var l = ea(29, o, null, e.mode);
      return (l.lanes = r), (l.return = e), l;
    }
  };
}
var ki = bi(!0),
  wi = bi(!1),
  Si = re(null),
  xi = null;
function Ei(e) {
  var t = e.alternate;
  le(zi, 1 & zi.current),
    le(Si, e),
    null === xi &&
      (null === t || null !== Tl.current || null !== t.memoizedState) &&
      (xi = e);
}
function Ci(e) {
  if (22 === e.tag) {
    if ((le(zi, zi.current), le(Si, e), null === xi)) {
      var t = e.alternate;
      null !== t && null !== t.memoizedState && (xi = e);
    }
  } else Pi();
}
function Pi() {
  le(zi, zi.current), le(Si, Si.current);
}
function Ni(e) {
  ae(Si), xi === e && (xi = null), ae(zi);
}
var zi = re(0);
function _i(e) {
  for (var t = e; null !== t; ) {
    if (13 === t.tag) {
      var n = t.memoizedState;
      if (
        null !== n &&
        (null === (n = n.dehydrated) || "$?" === n.data || Ad(n))
      )
        return t;
    } else if (19 === t.tag && void 0 !== t.memoizedProps.revealOrder) {
      if (128 & t.flags) return t;
    } else if (null !== t.child) {
      (t.child.return = t), (t = t.child);
      continue;
    }
    if (t === e) break;
    for (; null === t.sibling; ) {
      if (null === t.return || t.return === e) return null;
      t = t.return;
    }
    (t.sibling.return = t.return), (t = t.sibling);
  }
  return null;
}
function Li(e, t, n, r) {
  (n = null == (n = n(r, (t = e.memoizedState))) ? t : L({}, t, n)),
    (e.memoizedState = n),
    0 === e.lanes && (e.updateQueue.baseState = n);
}
var Ti = {
  enqueueSetState: function (e, t, n) {
    e = e._reactInternals;
    var r = Js(),
      a = Sl(r);
    (a.payload = t),
      null != n && (a.callback = n),
      null !== (t = xl(e, a, r)) && (ec(t, e, r), El(t, e, r));
  },
  enqueueReplaceState: function (e, t, n) {
    e = e._reactInternals;
    var r = Js(),
      a = Sl(r);
    (a.tag = 1),
      (a.payload = t),
      null != n && (a.callback = n),
      null !== (t = xl(e, a, r)) && (ec(t, e, r), El(t, e, r));
  },
  enqueueForceUpdate: function (e, t) {
    e = e._reactInternals;
    var n = Js(),
      r = Sl(n);
    (r.tag = 2),
      null != t && (r.callback = t),
      null !== (t = xl(e, r, n)) && (ec(t, e, n), El(t, e, n));
  },
};
function Di(e, t, n, r, a, l, o) {
  return "function" == typeof (e = e.stateNode).shouldComponentUpdate
    ? e.shouldComponentUpdate(r, l, o)
    : !t.prototype ||
        !t.prototype.isPureReactComponent ||
        !mr(n, r) ||
        !mr(a, l);
}
function Oi(e, t, n, r) {
  (e = t.state),
    "function" == typeof t.componentWillReceiveProps &&
      t.componentWillReceiveProps(n, r),
    "function" == typeof t.UNSAFE_componentWillReceiveProps &&
      t.UNSAFE_componentWillReceiveProps(n, r),
    t.state !== e && Ti.enqueueReplaceState(t, t.state, null);
}
function Ai(e, t) {
  var n = t;
  if ("ref" in t) for (var r in ((n = {}), t)) "ref" !== r && (n[r] = t[r]);
  if ((e = e.defaultProps))
    for (var a in (n === t && (n = L({}, n)), e))
      void 0 === n[a] && (n[a] = e[a]);
  return n;
}
var Fi =
  "function" == typeof reportError
    ? reportError
    : function (e) {
        if (
          "object" == typeof window &&
          "function" == typeof window.ErrorEvent
        ) {
          var t = new window.ErrorEvent("error", {
            bubbles: !0,
            cancelable: !0,
            message:
              "object" == typeof e && null !== e && "string" == typeof e.message
                ? String(e.message)
                : String(e),
            error: e,
          });
          if (!window.dispatchEvent(t)) return;
        } else if (
          "object" == typeof process &&
          "function" == typeof process.emit
        )
          return void process.emit("uncaughtException", e);
      };
function ji(e) {
  Fi(e);
}
function Mi(e) {}
function Ii(e) {
  Fi(e);
}
function Ri(e, t) {
  try {
    (0, e.onUncaughtError)(t.value, { componentStack: t.stack });
  } catch (n) {
    setTimeout(function () {
      throw n;
    });
  }
}
function Ui(e, t, n) {
  try {
    (0, e.onCaughtError)(n.value, {
      componentStack: n.stack,
      errorBoundary: 1 === t.tag ? t.stateNode : null,
    });
  } catch (r) {
    setTimeout(function () {
      throw r;
    });
  }
}
function Vi(e, t, n) {
  return (
    ((n = Sl(n)).tag = 3),
    (n.payload = { element: null }),
    (n.callback = function () {
      Ri(e, t);
    }),
    n
  );
}
function $i(e) {
  return ((e = Sl(e)).tag = 3), e;
}
function Hi(e, t, n, r) {
  var a = n.type.getDerivedStateFromError;
  if ("function" == typeof a) {
    var l = r.value;
    (e.payload = function () {
      return a(l);
    }),
      (e.callback = function () {
        Ui(t, n, r);
      });
  }
  var o = n.stateNode;
  null !== o &&
    "function" == typeof o.componentDidCatch &&
    (e.callback = function () {
      Ui(t, n, r),
        "function" != typeof a &&
          (null === $s ? ($s = new Set([this])) : $s.add(this));
      var e = r.stack;
      this.componentDidCatch(r.value, { componentStack: null !== e ? e : "" });
    });
}
var qi = Error(E(461)),
  Bi = !1;
function Qi(e, t, n, r) {
  t.child = null === e ? wi(t, null, n, r) : ki(t, e.child, n, r);
}
function Wi(e, t, n, r, a) {
  n = n.render;
  var l = t.ref;
  if ("ref" in r) {
    var o = {};
    for (var i in r) "ref" !== i && (o[i] = r[i]);
  } else o = r;
  return (
    Ha(t),
    (r = Yl(e, t, n, o, l, a)),
    (i = Zl()),
    null === e || Bi
      ? (xa && i && ba(t), (t.flags |= 1), Qi(e, t, r, a), t.child)
      : (eo(e, t, a), pu(e, t, a))
  );
}
function Xi(e, t, n, r, a) {
  if (null === e) {
    var l = n.type;
    return "function" != typeof l ||
      ta(l) ||
      void 0 !== l.defaultProps ||
      null !== n.compare
      ? (((e = aa(n.type, null, r, t, t.mode, a)).ref = t.ref),
        (e.return = t),
        (t.child = e))
      : ((t.tag = 15), (t.type = l), Yi(e, t, l, r, a));
  }
  if (((l = e.child), !mu(e, a))) {
    var o = l.memoizedProps;
    if ((n = null !== (n = n.compare) ? n : mr)(o, r) && e.ref === t.ref)
      return pu(e, t, a);
  }
  return (
    (t.flags |= 1), ((e = na(l, r)).ref = t.ref), (e.return = t), (t.child = e)
  );
}
function Yi(e, t, n, r, a) {
  if (null !== e) {
    var l = e.memoizedProps;
    if (mr(l, r) && e.ref === t.ref) {
      if (((Bi = !1), (t.pendingProps = r = l), !mu(e, a)))
        return (t.lanes = e.lanes), pu(e, t, a);
      131072 & e.flags && (Bi = !0);
    }
  }
  return Zi(e, t, n, r, a);
}
function Ki(e, t, n) {
  var r = t.pendingProps,
    a = r.children,
    l = null !== e ? e.memoizedState : null;
  if ("hidden" === r.mode) {
    if (128 & t.flags) {
      if (((r = null !== l ? l.baseLanes | n : n), null !== e)) {
        for (a = t.child = e.child, l = 0; null !== a; )
          (l = l | a.lanes | a.childLanes), (a = a.sibling);
        t.childLanes = l & ~r;
      } else (t.childLanes = 0), (t.child = null);
      return Gi(e, t, r, n);
    }
    if (!(536870912 & n))
      return (
        (t.lanes = t.childLanes = 536870912),
        Gi(e, t, null !== l ? l.baseLanes | n : n, n)
      );
    (t.memoizedState = { baseLanes: 0, cachePool: null }),
      null !== e && il(0, null !== l ? l.cachePool : null),
      null !== l ? Ol(t, l) : Al(),
      Ci(t);
  } else
    null !== l
      ? (il(0, l.cachePool), Ol(t, l), Pi(), (t.memoizedState = null))
      : (null !== e && il(0, null), Al(), Pi());
  return Qi(e, t, a, n), t.child;
}
function Gi(e, t, n, r) {
  var a = ol();
  return (
    (a = null === a ? null : { parent: Ka._currentValue, pool: a }),
    (t.memoizedState = { baseLanes: n, cachePool: a }),
    null !== e && il(0, null),
    Al(),
    Ci(t),
    null !== e && Va(e, t, r, !0),
    null
  );
}
function Ji(e, t) {
  var n = t.ref;
  if (null === n) null !== e && null !== e.ref && (t.flags |= 4194816);
  else {
    if ("function" != typeof n && "object" != typeof n) throw Error(E(284));
    (null !== e && e.ref === n) || (t.flags |= 4194816);
  }
}
function Zi(e, t, n, r, a) {
  return (
    Ha(t),
    (n = Yl(e, t, n, r, void 0, a)),
    (r = Zl()),
    null === e || Bi
      ? (xa && r && ba(t), (t.flags |= 1), Qi(e, t, n, a), t.child)
      : (eo(e, t, a), pu(e, t, a))
  );
}
function eu(e, t, n, r, a, l) {
  return (
    Ha(t),
    (t.updateQueue = null),
    (n = Gl(t, r, n, a)),
    Kl(e),
    (r = Zl()),
    null === e || Bi
      ? (xa && r && ba(t), (t.flags |= 1), Qi(e, t, n, l), t.child)
      : (eo(e, t, l), pu(e, t, l))
  );
}
function tu(e, t, n, r, a) {
  if ((Ha(t), null === t.stateNode)) {
    var l = Jr,
      o = n.contextType;
    "object" == typeof o && null !== o && (l = qa(o)),
      (l = new n(r, l)),
      (t.memoizedState =
        null !== l.state && void 0 !== l.state ? l.state : null),
      (l.updater = Ti),
      (t.stateNode = l),
      (l._reactInternals = t),
      ((l = t.stateNode).props = r),
      (l.state = t.memoizedState),
      (l.refs = {}),
      kl(t),
      (o = n.contextType),
      (l.context = "object" == typeof o && null !== o ? qa(o) : Jr),
      (l.state = t.memoizedState),
      "function" == typeof (o = n.getDerivedStateFromProps) &&
        (Li(t, n, o, r), (l.state = t.memoizedState)),
      "function" == typeof n.getDerivedStateFromProps ||
        "function" == typeof l.getSnapshotBeforeUpdate ||
        ("function" != typeof l.UNSAFE_componentWillMount &&
          "function" != typeof l.componentWillMount) ||
        ((o = l.state),
        "function" == typeof l.componentWillMount && l.componentWillMount(),
        "function" == typeof l.UNSAFE_componentWillMount &&
          l.UNSAFE_componentWillMount(),
        o !== l.state && Ti.enqueueReplaceState(l, l.state, null),
        zl(t, r, l, a),
        Nl(),
        (l.state = t.memoizedState)),
      "function" == typeof l.componentDidMount && (t.flags |= 4194308),
      (r = !0);
  } else if (null === e) {
    l = t.stateNode;
    var i = t.memoizedProps,
      u = Ai(n, i);
    l.props = u;
    var s = l.context,
      c = n.contextType;
    (o = Jr), "object" == typeof c && null !== c && (o = qa(c));
    var d = n.getDerivedStateFromProps;
    (c =
      "function" == typeof d || "function" == typeof l.getSnapshotBeforeUpdate),
      (i = t.pendingProps !== i),
      c ||
        ("function" != typeof l.UNSAFE_componentWillReceiveProps &&
          "function" != typeof l.componentWillReceiveProps) ||
        ((i || s !== o) && Oi(t, l, r, o)),
      (bl = !1);
    var f = t.memoizedState;
    (l.state = f),
      zl(t, r, l, a),
      Nl(),
      (s = t.memoizedState),
      i || f !== s || bl
        ? ("function" == typeof d && (Li(t, n, d, r), (s = t.memoizedState)),
          (u = bl || Di(t, n, u, r, f, s, o))
            ? (c ||
                ("function" != typeof l.UNSAFE_componentWillMount &&
                  "function" != typeof l.componentWillMount) ||
                ("function" == typeof l.componentWillMount &&
                  l.componentWillMount(),
                "function" == typeof l.UNSAFE_componentWillMount &&
                  l.UNSAFE_componentWillMount()),
              "function" == typeof l.componentDidMount && (t.flags |= 4194308))
            : ("function" == typeof l.componentDidMount && (t.flags |= 4194308),
              (t.memoizedProps = r),
              (t.memoizedState = s)),
          (l.props = r),
          (l.state = s),
          (l.context = o),
          (r = u))
        : ("function" == typeof l.componentDidMount && (t.flags |= 4194308),
          (r = !1));
  } else {
    (l = t.stateNode),
      wl(e, t),
      (c = Ai(n, (o = t.memoizedProps))),
      (l.props = c),
      (d = t.pendingProps),
      (f = l.context),
      (s = n.contextType),
      (u = Jr),
      "object" == typeof s && null !== s && (u = qa(s)),
      (s =
        "function" == typeof (i = n.getDerivedStateFromProps) ||
        "function" == typeof l.getSnapshotBeforeUpdate) ||
        ("function" != typeof l.UNSAFE_componentWillReceiveProps &&
          "function" != typeof l.componentWillReceiveProps) ||
        ((o !== d || f !== u) && Oi(t, l, r, u)),
      (bl = !1),
      (f = t.memoizedState),
      (l.state = f),
      zl(t, r, l, a),
      Nl();
    var p = t.memoizedState;
    o !== d ||
    f !== p ||
    bl ||
    (null !== e && null !== e.dependencies && $a(e.dependencies))
      ? ("function" == typeof i && (Li(t, n, i, r), (p = t.memoizedState)),
        (c =
          bl ||
          Di(t, n, c, r, f, p, u) ||
          (null !== e && null !== e.dependencies && $a(e.dependencies)))
          ? (s ||
              ("function" != typeof l.UNSAFE_componentWillUpdate &&
                "function" != typeof l.componentWillUpdate) ||
              ("function" == typeof l.componentWillUpdate &&
                l.componentWillUpdate(r, p, u),
              "function" == typeof l.UNSAFE_componentWillUpdate &&
                l.UNSAFE_componentWillUpdate(r, p, u)),
            "function" == typeof l.componentDidUpdate && (t.flags |= 4),
            "function" == typeof l.getSnapshotBeforeUpdate && (t.flags |= 1024))
          : ("function" != typeof l.componentDidUpdate ||
              (o === e.memoizedProps && f === e.memoizedState) ||
              (t.flags |= 4),
            "function" != typeof l.getSnapshotBeforeUpdate ||
              (o === e.memoizedProps && f === e.memoizedState) ||
              (t.flags |= 1024),
            (t.memoizedProps = r),
            (t.memoizedState = p)),
        (l.props = r),
        (l.state = p),
        (l.context = u),
        (r = c))
      : ("function" != typeof l.componentDidUpdate ||
          (o === e.memoizedProps && f === e.memoizedState) ||
          (t.flags |= 4),
        "function" != typeof l.getSnapshotBeforeUpdate ||
          (o === e.memoizedProps && f === e.memoizedState) ||
          (t.flags |= 1024),
        (r = !1));
  }
  return (
    (l = r),
    Ji(e, t),
    (r = !!(128 & t.flags)),
    l || r
      ? ((l = t.stateNode),
        (n =
          r && "function" != typeof n.getDerivedStateFromError
            ? null
            : l.render()),
        (t.flags |= 1),
        null !== e && r
          ? ((t.child = ki(t, e.child, null, a)), (t.child = ki(t, null, n, a)))
          : Qi(e, t, n, a),
        (t.memoizedState = l.state),
        (e = t.child))
      : (e = pu(e, t, a)),
    e
  );
}
function nu(e, t, n, r) {
  return Ta(), (t.flags |= 256), Qi(e, t, n, r), t.child;
}
var ru = {
  dehydrated: null,
  treeContext: null,
  retryLane: 0,
  hydrationErrors: null,
};
function au(e) {
  return { baseLanes: e, cachePool: ul() };
}
function lu(e, t, n) {
  return (e = null !== e ? e.childLanes & ~n : 0), t && (e |= As), e;
}
function ou(e, t, n) {
  var r,
    a = t.pendingProps,
    l = !1,
    o = !!(128 & t.flags);
  if (
    ((r = o) ||
      (r = (null === e || null !== e.memoizedState) && !!(2 & zi.current)),
    r && ((l = !0), (t.flags &= -129)),
    (r = !!(32 & t.flags)),
    (t.flags &= -33),
    null === e)
  ) {
    if (xa) {
      if ((l ? Ei(t) : Pi(), xa)) {
        var i,
          u = Sa;
        if ((i = u)) {
          e: {
            for (i = u, u = Ca; 8 !== i.nodeType; ) {
              if (!u) {
                u = null;
                break e;
              }
              if (null === (i = Fd(i.nextSibling))) {
                u = null;
                break e;
              }
            }
            u = i;
          }
          null !== u
            ? ((t.memoizedState = {
                dehydrated: u,
                treeContext: null !== ma ? { id: ha, overflow: ga } : null,
                retryLane: 536870912,
                hydrationErrors: null,
              }),
              ((i = ea(18, null, null, 0)).stateNode = u),
              (i.return = t),
              (t.child = i),
              (wa = t),
              (Sa = null),
              (i = !0))
            : (i = !1);
        }
        i || Na(t);
      }
      if (null !== (u = t.memoizedState) && null !== (u = u.dehydrated))
        return Ad(u) ? (t.lanes = 32) : (t.lanes = 536870912), null;
      Ni(t);
    }
    return (
      (u = a.children),
      (a = a.fallback),
      l
        ? (Pi(),
          (u = uu({ mode: "hidden", children: u }, (l = t.mode))),
          (a = la(a, l, n, null)),
          (u.return = t),
          (a.return = t),
          (u.sibling = a),
          (t.child = u),
          ((l = t.child).memoizedState = au(n)),
          (l.childLanes = lu(e, r, n)),
          (t.memoizedState = ru),
          a)
        : (Ei(t), iu(t, u))
    );
  }
  if (null !== (i = e.memoizedState) && null !== (u = i.dehydrated)) {
    if (o)
      256 & t.flags
        ? (Ei(t), (t.flags &= -257), (t = su(e, t, n)))
        : null !== t.memoizedState
        ? (Pi(), (t.child = e.child), (t.flags |= 128), (t = null))
        : (Pi(),
          (l = a.fallback),
          (u = t.mode),
          (a = uu({ mode: "visible", children: a.children }, u)),
          ((l = la(l, u, n, null)).flags |= 2),
          (a.return = t),
          (l.return = t),
          (a.sibling = l),
          (t.child = a),
          ki(t, e.child, null, n),
          ((a = t.child).memoizedState = au(n)),
          (a.childLanes = lu(e, r, n)),
          (t.memoizedState = ru),
          (t = l));
    else if ((Ei(t), Ad(u))) {
      if ((r = u.nextSibling && u.nextSibling.dataset)) var s = r.dgst;
      (r = s),
        ((a = Error(E(419))).stack = ""),
        (a.digest = r),
        Oa({ value: a, source: null, stack: null }),
        (t = su(e, t, n));
    } else if ((Bi || Va(e, t, n, !1), (r = !!(n & e.childLanes)), Bi || r)) {
      if (
        null !== (r = ws) &&
        0 !==
          (a =
            (a = 42 & (a = n & -n) ? 1 : Qe(a)) & (r.suspendedLanes | n)
              ? 0
              : a) &&
        a !== i.retryLane
      )
        throw ((i.retryLane = a), Yr(e, a), ec(r, e, a), qi);
      "$?" === u.data || dc(), (t = su(e, t, n));
    } else
      "$?" === u.data
        ? ((t.flags |= 192), (t.child = e.child), (t = null))
        : ((e = i.treeContext),
          (Sa = Fd(u.nextSibling)),
          (wa = t),
          (xa = !0),
          (Ea = null),
          (Ca = !1),
          null !== e &&
            ((fa[pa++] = ha),
            (fa[pa++] = ga),
            (fa[pa++] = ma),
            (ha = e.id),
            (ga = e.overflow),
            (ma = t)),
          ((t = iu(t, a.children)).flags |= 4096));
    return t;
  }
  return l
    ? (Pi(),
      (l = a.fallback),
      (u = t.mode),
      (s = (i = e.child).sibling),
      ((a = na(i, { mode: "hidden", children: a.children })).subtreeFlags =
        65011712 & i.subtreeFlags),
      null !== s ? (l = na(s, l)) : ((l = la(l, u, n, null)).flags |= 2),
      (l.return = t),
      (a.return = t),
      (a.sibling = l),
      (t.child = a),
      (a = l),
      (l = t.child),
      null === (u = e.child.memoizedState)
        ? (u = au(n))
        : (null !== (i = u.cachePool)
            ? ((s = Ka._currentValue),
              (i = i.parent !== s ? { parent: s, pool: s } : i))
            : (i = ul()),
          (u = { baseLanes: u.baseLanes | n, cachePool: i })),
      (l.memoizedState = u),
      (l.childLanes = lu(e, r, n)),
      (t.memoizedState = ru),
      a)
    : (Ei(t),
      (e = (n = e.child).sibling),
      ((n = na(n, { mode: "visible", children: a.children })).return = t),
      (n.sibling = null),
      null !== e &&
        (null === (r = t.deletions)
          ? ((t.deletions = [e]), (t.flags |= 16))
          : r.push(e)),
      (t.child = n),
      (t.memoizedState = null),
      n);
}
function iu(e, t) {
  return (
    ((t = uu({ mode: "visible", children: t }, e.mode)).return = e),
    (e.child = t)
  );
}
function uu(e, t) {
  return (
    ((e = ea(22, e, null, t)).lanes = 0),
    (e.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null,
    }),
    e
  );
}
function su(e, t, n) {
  return (
    ki(t, e.child, null, n),
    ((e = iu(t, t.pendingProps.children)).flags |= 2),
    (t.memoizedState = null),
    e
  );
}
function cu(e, t, n) {
  e.lanes |= t;
  var r = e.alternate;
  null !== r && (r.lanes |= t), Ra(e.return, t, n);
}
function du(e, t, n, r, a) {
  var l = e.memoizedState;
  null === l
    ? (e.memoizedState = {
        isBackwards: t,
        rendering: null,
        renderingStartTime: 0,
        last: r,
        tail: n,
        tailMode: a,
      })
    : ((l.isBackwards = t),
      (l.rendering = null),
      (l.renderingStartTime = 0),
      (l.last = r),
      (l.tail = n),
      (l.tailMode = a));
}
function fu(e, t, n) {
  var r = t.pendingProps,
    a = r.revealOrder,
    l = r.tail;
  if ((Qi(e, t, r.children, n), 2 & (r = zi.current)))
    (r = (1 & r) | 2), (t.flags |= 128);
  else {
    if (null !== e && 128 & e.flags)
      e: for (e = t.child; null !== e; ) {
        if (13 === e.tag) null !== e.memoizedState && cu(e, n, t);
        else if (19 === e.tag) cu(e, n, t);
        else if (null !== e.child) {
          (e.child.return = e), (e = e.child);
          continue;
        }
        if (e === t) break e;
        for (; null === e.sibling; ) {
          if (null === e.return || e.return === t) break e;
          e = e.return;
        }
        (e.sibling.return = e.return), (e = e.sibling);
      }
    r &= 1;
  }
  switch ((le(zi, r), a)) {
    case "forwards":
      for (n = t.child, a = null; null !== n; )
        null !== (e = n.alternate) && null === _i(e) && (a = n),
          (n = n.sibling);
      null === (n = a)
        ? ((a = t.child), (t.child = null))
        : ((a = n.sibling), (n.sibling = null)),
        du(t, !1, a, n, l);
      break;
    case "backwards":
      for (n = null, a = t.child, t.child = null; null !== a; ) {
        if (null !== (e = a.alternate) && null === _i(e)) {
          t.child = a;
          break;
        }
        (e = a.sibling), (a.sibling = n), (n = a), (a = e);
      }
      du(t, !0, n, null, l);
      break;
    case "together":
      du(t, !1, null, null, void 0);
      break;
    default:
      t.memoizedState = null;
  }
  return t.child;
}
function pu(e, t, n) {
  if (
    (null !== e && (t.dependencies = e.dependencies),
    (Ts |= t.lanes),
    !(n & t.childLanes))
  ) {
    if (null === e) return null;
    if ((Va(e, t, n, !1), !(n & t.childLanes))) return null;
  }
  if (null !== e && t.child !== e.child) throw Error(E(153));
  if (null !== t.child) {
    for (
      n = na((e = t.child), e.pendingProps), t.child = n, n.return = t;
      null !== e.sibling;

    )
      (e = e.sibling), ((n = n.sibling = na(e, e.pendingProps)).return = t);
    n.sibling = null;
  }
  return t.child;
}
function mu(e, t) {
  return !!(e.lanes & t) || !(null === (e = e.dependencies) || !$a(e));
}
function hu(e, t, n) {
  if (null !== e)
    if (e.memoizedProps !== t.pendingProps) Bi = !0;
    else {
      if (!(mu(e, n) || 128 & t.flags))
        return (
          (Bi = !1),
          (function (e, t, n) {
            switch (t.tag) {
              case 3:
                ce(t, t.stateNode.containerInfo),
                  Ma(0, Ka, e.memoizedState.cache),
                  Ta();
                break;
              case 27:
              case 5:
                fe(t);
                break;
              case 4:
                ce(t, t.stateNode.containerInfo);
                break;
              case 10:
                Ma(0, t.type, t.memoizedProps.value);
                break;
              case 13:
                var r = t.memoizedState;
                if (null !== r)
                  return null !== r.dehydrated
                    ? (Ei(t), (t.flags |= 128), null)
                    : n & t.child.childLanes
                    ? ou(e, t, n)
                    : (Ei(t), null !== (e = pu(e, t, n)) ? e.sibling : null);
                Ei(t);
                break;
              case 19:
                var a = !!(128 & e.flags);
                if (
                  ((r = !!(n & t.childLanes)) ||
                    (Va(e, t, n, !1), (r = !!(n & t.childLanes))),
                  a)
                ) {
                  if (r) return fu(e, t, n);
                  t.flags |= 128;
                }
                if (
                  (null !== (a = t.memoizedState) &&
                    ((a.rendering = null),
                    (a.tail = null),
                    (a.lastEffect = null)),
                  le(zi, zi.current),
                  r)
                )
                  break;
                return null;
              case 22:
              case 23:
                return (t.lanes = 0), Ki(e, t, n);
              case 24:
                Ma(0, Ka, e.memoizedState.cache);
            }
            return pu(e, t, n);
          })(e, t, n)
        );
      Bi = !!(131072 & e.flags);
    }
  else (Bi = !1), xa && 1048576 & t.flags && va(t, da, t.index);
  switch (((t.lanes = 0), t.tag)) {
    case 16:
      e: {
        e = t.pendingProps;
        var r = t.elementType,
          a = r._init;
        if (((r = a(r._payload)), (t.type = r), "function" != typeof r)) {
          if (null != r) {
            if ((a = r.$$typeof) === U) {
              (t.tag = 11), (t = Wi(null, t, r, e, n));
              break e;
            }
            if (a === H) {
              (t.tag = 14), (t = Xi(null, t, r, e, n));
              break e;
            }
          }
          throw ((t = K(r) || r), Error(E(306, t, "")));
        }
        ta(r)
          ? ((e = Ai(r, e)), (t.tag = 1), (t = tu(null, t, r, e, n)))
          : ((t.tag = 0), (t = Zi(null, t, r, e, n)));
      }
      return t;
    case 0:
      return Zi(e, t, t.type, t.pendingProps, n);
    case 1:
      return tu(e, t, (r = t.type), (a = Ai(r, t.pendingProps)), n);
    case 3:
      e: {
        if ((ce(t, t.stateNode.containerInfo), null === e)) throw Error(E(387));
        r = t.pendingProps;
        var l = t.memoizedState;
        (a = l.element), wl(e, t), zl(t, r, null, n);
        var o = t.memoizedState;
        if (
          ((r = o.cache),
          Ma(0, Ka, r),
          r !== l.cache && Ua(t, [Ka], n, !0),
          Nl(),
          (r = o.element),
          l.isDehydrated)
        ) {
          if (
            ((l = { element: r, isDehydrated: !1, cache: o.cache }),
            (t.updateQueue.baseState = l),
            (t.memoizedState = l),
            256 & t.flags)
          ) {
            t = nu(e, t, r, n);
            break e;
          }
          if (r !== a) {
            Oa((a = $r(Error(E(424)), t))), (t = nu(e, t, r, n));
            break e;
          }
          if (9 === (e = t.stateNode.containerInfo).nodeType) e = e.body;
          else e = "HTML" === e.nodeName ? e.ownerDocument.body : e;
          for (
            Sa = Fd(e.firstChild),
              wa = t,
              xa = !0,
              Ea = null,
              Ca = !0,
              n = wi(t, null, r, n),
              t.child = n;
            n;

          )
            (n.flags = (-3 & n.flags) | 4096), (n = n.sibling);
        } else {
          if ((Ta(), r === a)) {
            t = pu(e, t, n);
            break e;
          }
          Qi(e, t, r, n);
        }
        t = t.child;
      }
      return t;
    case 26:
      return (
        Ji(e, t),
        null === e
          ? (n = Qd(t.type, null, t.pendingProps, null))
            ? (t.memoizedState = n)
            : xa ||
              ((n = t.type),
              (e = t.pendingProps),
              ((r = wd(ue.current).createElement(n))[Ke] = t),
              (r[Ge] = e),
              vd(r, n, e),
              st(r),
              (t.stateNode = r))
          : (t.memoizedState = Qd(
              t.type,
              e.memoizedProps,
              t.pendingProps,
              e.memoizedState
            )),
        null
      );
    case 27:
      return (
        fe(t),
        null === e &&
          xa &&
          ((r = t.stateNode = Id(t.type, t.pendingProps, ue.current)),
          (wa = t),
          (Ca = !0),
          (a = Sa),
          Td(t.type) ? ((jd = a), (Sa = Fd(r.firstChild))) : (Sa = a)),
        Qi(e, t, t.pendingProps.children, n),
        Ji(e, t),
        null === e && (t.flags |= 4194304),
        t.child
      );
    case 5:
      return (
        null === e &&
          xa &&
          ((a = r = Sa) &&
            (null !==
            (r = (function (e, t, n, r) {
              for (; 1 === e.nodeType; ) {
                var a = n;
                if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
                  if (!r && ("INPUT" !== e.nodeName || "hidden" !== e.type))
                    break;
                } else if (r) {
                  if (!e[rt])
                    switch (t) {
                      case "meta":
                        if (!e.hasAttribute("itemprop")) break;
                        return e;
                      case "link":
                        if (
                          "stylesheet" === (l = e.getAttribute("rel")) &&
                          e.hasAttribute("data-precedence")
                        )
                          break;
                        if (
                          l !== a.rel ||
                          e.getAttribute("href") !==
                            (null == a.href || "" === a.href ? null : a.href) ||
                          e.getAttribute("crossorigin") !==
                            (null == a.crossOrigin ? null : a.crossOrigin) ||
                          e.getAttribute("title") !==
                            (null == a.title ? null : a.title)
                        )
                          break;
                        return e;
                      case "style":
                        if (e.hasAttribute("data-precedence")) break;
                        return e;
                      case "script":
                        if (
                          ((l = e.getAttribute("src")) !==
                            (null == a.src ? null : a.src) ||
                            e.getAttribute("type") !==
                              (null == a.type ? null : a.type) ||
                            e.getAttribute("crossorigin") !==
                              (null == a.crossOrigin ? null : a.crossOrigin)) &&
                          l &&
                          e.hasAttribute("async") &&
                          !e.hasAttribute("itemprop")
                        )
                          break;
                        return e;
                      default:
                        return e;
                    }
                } else {
                  if ("input" !== t || "hidden" !== e.type) return e;
                  var l = null == a.name ? null : "" + a.name;
                  if ("hidden" === a.type && e.getAttribute("name") === l)
                    return e;
                }
                if (null === (e = Fd(e.nextSibling))) break;
              }
              return null;
            })(r, t.type, t.pendingProps, Ca))
              ? ((t.stateNode = r),
                (wa = t),
                (Sa = Fd(r.firstChild)),
                (Ca = !1),
                (a = !0))
              : (a = !1)),
          a || Na(t)),
        fe(t),
        (a = t.type),
        (l = t.pendingProps),
        (o = null !== e ? e.memoizedProps : null),
        (r = l.children),
        Ed(a, l) ? (r = null) : null !== o && Ed(a, o) && (t.flags |= 32),
        null !== t.memoizedState &&
          ((a = Yl(e, t, Jl, null, null, n)), (pf._currentValue = a)),
        Ji(e, t),
        Qi(e, t, r, n),
        t.child
      );
    case 6:
      return (
        null === e &&
          xa &&
          ((e = n = Sa) &&
            (null !==
            (n = (function (e, t, n) {
              if ("" === t) return null;
              for (; 3 !== e.nodeType; ) {
                if (
                  (1 !== e.nodeType ||
                    "INPUT" !== e.nodeName ||
                    "hidden" !== e.type) &&
                  !n
                )
                  return null;
                if (null === (e = Fd(e.nextSibling))) return null;
              }
              return e;
            })(n, t.pendingProps, Ca))
              ? ((t.stateNode = n), (wa = t), (Sa = null), (e = !0))
              : (e = !1)),
          e || Na(t)),
        null
      );
    case 13:
      return ou(e, t, n);
    case 4:
      return (
        ce(t, t.stateNode.containerInfo),
        (r = t.pendingProps),
        null === e ? (t.child = ki(t, null, r, n)) : Qi(e, t, r, n),
        t.child
      );
    case 11:
      return Wi(e, t, t.type, t.pendingProps, n);
    case 7:
      return Qi(e, t, t.pendingProps, n), t.child;
    case 8:
    case 12:
      return Qi(e, t, t.pendingProps.children, n), t.child;
    case 10:
      return (
        (r = t.pendingProps),
        Ma(0, t.type, r.value),
        Qi(e, t, r.children, n),
        t.child
      );
    case 9:
      return (
        (a = t.type._context),
        (r = t.pendingProps.children),
        Ha(t),
        (r = r((a = qa(a)))),
        (t.flags |= 1),
        Qi(e, t, r, n),
        t.child
      );
    case 14:
      return Xi(e, t, t.type, t.pendingProps, n);
    case 15:
      return Yi(e, t, t.type, t.pendingProps, n);
    case 19:
      return fu(e, t, n);
    case 31:
      return (
        (r = t.pendingProps),
        (n = t.mode),
        (r = { mode: r.mode, children: r.children }),
        null === e
          ? (((n = uu(r, n)).ref = t.ref),
            (t.child = n),
            (n.return = t),
            (t = n))
          : (((n = na(e.child, r)).ref = t.ref),
            (t.child = n),
            (n.return = t),
            (t = n)),
        t
      );
    case 22:
      return Ki(e, t, n);
    case 24:
      return (
        Ha(t),
        (r = qa(Ka)),
        null === e
          ? (null === (a = ol()) &&
              ((a = ws),
              (l = Ga()),
              (a.pooledCache = l),
              l.refCount++,
              null !== l && (a.pooledCacheLanes |= n),
              (a = l)),
            (t.memoizedState = { parent: r, cache: a }),
            kl(t),
            Ma(0, Ka, a))
          : (!!(e.lanes & n) && (wl(e, t), zl(t, null, null, n), Nl()),
            (a = e.memoizedState),
            (l = t.memoizedState),
            a.parent !== r
              ? ((a = { parent: r, cache: r }),
                (t.memoizedState = a),
                0 === t.lanes &&
                  (t.memoizedState = t.updateQueue.baseState = a),
                Ma(0, Ka, r))
              : ((r = l.cache),
                Ma(0, Ka, r),
                r !== a.cache && Ua(t, [Ka], n, !0))),
        Qi(e, t, t.pendingProps.children, n),
        t.child
      );
    case 29:
      throw t.pendingProps;
  }
  throw Error(E(156, t.tag));
}
function gu(e) {
  e.flags |= 4;
}
function yu(e, t) {
  if ("stylesheet" !== t.type || 4 & t.state.loading) e.flags &= -16777217;
  else if (((e.flags |= 16777216), !lf(t))) {
    if (
      null !== (t = Si.current) &&
      ((4194048 & xs) === xs
        ? null !== xi
        : ((62914560 & xs) !== xs && !(536870912 & xs)) || t !== xi)
    )
      throw ((gl = fl), cl);
    e.flags |= 8192;
  }
}
function vu(e, t) {
  null !== t && (e.flags |= 4),
    16384 & e.flags &&
      ((t = 22 !== e.tag ? Ve() : 536870912), (e.lanes |= t), (Fs |= t));
}
function bu(e, t) {
  if (!xa)
    switch (e.tailMode) {
      case "hidden":
        t = e.tail;
        for (var n = null; null !== t; )
          null !== t.alternate && (n = t), (t = t.sibling);
        null === n ? (e.tail = null) : (n.sibling = null);
        break;
      case "collapsed":
        n = e.tail;
        for (var r = null; null !== n; )
          null !== n.alternate && (r = n), (n = n.sibling);
        null === r
          ? t || null === e.tail
            ? (e.tail = null)
            : (e.tail.sibling = null)
          : (r.sibling = null);
    }
}
function ku(e) {
  var t = null !== e.alternate && e.alternate.child === e.child,
    n = 0,
    r = 0;
  if (t)
    for (var a = e.child; null !== a; )
      (n |= a.lanes | a.childLanes),
        (r |= 65011712 & a.subtreeFlags),
        (r |= 65011712 & a.flags),
        (a.return = e),
        (a = a.sibling);
  else
    for (a = e.child; null !== a; )
      (n |= a.lanes | a.childLanes),
        (r |= a.subtreeFlags),
        (r |= a.flags),
        (a.return = e),
        (a = a.sibling);
  return (e.subtreeFlags |= r), (e.childLanes = n), t;
}
function wu(e, t, n) {
  var r = t.pendingProps;
  switch ((ka(t), t.tag)) {
    case 31:
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
    case 1:
      return ku(t), null;
    case 3:
      return (
        (n = t.stateNode),
        (r = null),
        null !== e && (r = e.memoizedState.cache),
        t.memoizedState.cache !== r && (t.flags |= 2048),
        Ia(Ka),
        de(),
        n.pendingContext &&
          ((n.context = n.pendingContext), (n.pendingContext = null)),
        (null !== e && null !== e.child) ||
          (La(t)
            ? gu(t)
            : null === e ||
              (e.memoizedState.isDehydrated && !(256 & t.flags)) ||
              ((t.flags |= 1024), Da())),
        ku(t),
        null
      );
    case 26:
      return (
        (n = t.memoizedState),
        null === e
          ? (gu(t),
            null !== n ? (ku(t), yu(t, n)) : (ku(t), (t.flags &= -16777217)))
          : n
          ? n !== e.memoizedState
            ? (gu(t), ku(t), yu(t, n))
            : (ku(t), (t.flags &= -16777217))
          : (e.memoizedProps !== r && gu(t), ku(t), (t.flags &= -16777217)),
        null
      );
    case 27:
      pe(t), (n = ue.current);
      var a = t.type;
      if (null !== e && null != t.stateNode) e.memoizedProps !== r && gu(t);
      else {
        if (!r) {
          if (null === t.stateNode) throw Error(E(166));
          return ku(t), null;
        }
        (e = oe.current),
          La(t) ? za(t) : ((e = Id(a, r, n)), (t.stateNode = e), gu(t));
      }
      return ku(t), null;
    case 5:
      if ((pe(t), (n = t.type), null !== e && null != t.stateNode))
        e.memoizedProps !== r && gu(t);
      else {
        if (!r) {
          if (null === t.stateNode) throw Error(E(166));
          return ku(t), null;
        }
        if (((e = oe.current), La(t))) za(t);
        else {
          switch (((a = wd(ue.current)), e)) {
            case 1:
              e = a.createElementNS("http://www.w3.org/2000/svg", n);
              break;
            case 2:
              e = a.createElementNS("http://www.w3.org/1998/Math/MathML", n);
              break;
            default:
              switch (n) {
                case "svg":
                  e = a.createElementNS("http://www.w3.org/2000/svg", n);
                  break;
                case "math":
                  e = a.createElementNS(
                    "http://www.w3.org/1998/Math/MathML",
                    n
                  );
                  break;
                case "script":
                  ((e = a.createElement("div")).innerHTML =
                    "<script></script>"),
                    (e = e.removeChild(e.firstChild));
                  break;
                case "select":
                  (e =
                    "string" == typeof r.is
                      ? a.createElement("select", { is: r.is })
                      : a.createElement("select")),
                    r.multiple
                      ? (e.multiple = !0)
                      : r.size && (e.size = r.size);
                  break;
                default:
                  e =
                    "string" == typeof r.is
                      ? a.createElement(n, { is: r.is })
                      : a.createElement(n);
              }
          }
          (e[Ke] = t), (e[Ge] = r);
          e: for (a = t.child; null !== a; ) {
            if (5 === a.tag || 6 === a.tag) e.appendChild(a.stateNode);
            else if (4 !== a.tag && 27 !== a.tag && null !== a.child) {
              (a.child.return = a), (a = a.child);
              continue;
            }
            if (a === t) break e;
            for (; null === a.sibling; ) {
              if (null === a.return || a.return === t) break e;
              a = a.return;
            }
            (a.sibling.return = a.return), (a = a.sibling);
          }
          t.stateNode = e;
          e: switch ((vd(e, n, r), n)) {
            case "button":
            case "input":
            case "select":
            case "textarea":
              e = !!r.autoFocus;
              break e;
            case "img":
              e = !0;
              break e;
            default:
              e = !1;
          }
          e && gu(t);
        }
      }
      return ku(t), (t.flags &= -16777217), null;
    case 6:
      if (e && null != t.stateNode) e.memoizedProps !== r && gu(t);
      else {
        if ("string" != typeof r && null === t.stateNode) throw Error(E(166));
        if (((e = ue.current), La(t))) {
          if (
            ((e = t.stateNode),
            (n = t.memoizedProps),
            (r = null),
            null !== (a = wa))
          )
            switch (a.tag) {
              case 27:
              case 5:
                r = a.memoizedProps;
            }
          (e[Ke] = t),
            (e = !!(
              e.nodeValue === n ||
              (null !== r && !0 === r.suppressHydrationWarning) ||
              md(e.nodeValue, n)
            )) || Na(t);
        } else ((e = wd(e).createTextNode(r))[Ke] = t), (t.stateNode = e);
      }
      return ku(t), null;
    case 13:
      if (
        ((r = t.memoizedState),
        null === e ||
          (null !== e.memoizedState && null !== e.memoizedState.dehydrated))
      ) {
        if (((a = La(t)), null !== r && null !== r.dehydrated)) {
          if (null === e) {
            if (!a) throw Error(E(318));
            if (!(a = null !== (a = t.memoizedState) ? a.dehydrated : null))
              throw Error(E(317));
            a[Ke] = t;
          } else
            Ta(), !(128 & t.flags) && (t.memoizedState = null), (t.flags |= 4);
          ku(t), (a = !1);
        } else
          (a = Da()),
            null !== e &&
              null !== e.memoizedState &&
              (e.memoizedState.hydrationErrors = a),
            (a = !0);
        if (!a) return 256 & t.flags ? (Ni(t), t) : (Ni(t), null);
      }
      if ((Ni(t), 128 & t.flags)) return (t.lanes = n), t;
      if (((n = null !== r), (e = null !== e && null !== e.memoizedState), n)) {
        (a = null),
          null !== (r = t.child).alternate &&
            null !== r.alternate.memoizedState &&
            null !== r.alternate.memoizedState.cachePool &&
            (a = r.alternate.memoizedState.cachePool.pool);
        var l = null;
        null !== r.memoizedState &&
          null !== r.memoizedState.cachePool &&
          (l = r.memoizedState.cachePool.pool),
          l !== a && (r.flags |= 2048);
      }
      return (
        n !== e && n && (t.child.flags |= 8192),
        vu(t, t.updateQueue),
        ku(t),
        null
      );
    case 4:
      return de(), null === e && ad(t.stateNode.containerInfo), ku(t), null;
    case 10:
      return Ia(t.type), ku(t), null;
    case 19:
      if ((ae(zi), null === (a = t.memoizedState))) return ku(t), null;
      if (((r = !!(128 & t.flags)), null === (l = a.rendering)))
        if (r) bu(a, !1);
        else {
          if (0 !== Ls || (null !== e && 128 & e.flags))
            for (e = t.child; null !== e; ) {
              if (null !== (l = _i(e))) {
                for (
                  t.flags |= 128,
                    bu(a, !1),
                    e = l.updateQueue,
                    t.updateQueue = e,
                    vu(t, e),
                    t.subtreeFlags = 0,
                    e = n,
                    n = t.child;
                  null !== n;

                )
                  ra(n, e), (n = n.sibling);
                return le(zi, (1 & zi.current) | 2), t.child;
              }
              e = e.sibling;
            }
          null !== a.tail &&
            be() > Us &&
            ((t.flags |= 128), (r = !0), bu(a, !1), (t.lanes = 4194304));
        }
      else {
        if (!r)
          if (null !== (e = _i(l))) {
            if (
              ((t.flags |= 128),
              (r = !0),
              (e = e.updateQueue),
              (t.updateQueue = e),
              vu(t, e),
              bu(a, !0),
              null === a.tail && "hidden" === a.tailMode && !l.alternate && !xa)
            )
              return ku(t), null;
          } else
            2 * be() - a.renderingStartTime > Us &&
              536870912 !== n &&
              ((t.flags |= 128), (r = !0), bu(a, !1), (t.lanes = 4194304));
        a.isBackwards
          ? ((l.sibling = t.child), (t.child = l))
          : (null !== (e = a.last) ? (e.sibling = l) : (t.child = l),
            (a.last = l));
      }
      return null !== a.tail
        ? ((t = a.tail),
          (a.rendering = t),
          (a.tail = t.sibling),
          (a.renderingStartTime = be()),
          (t.sibling = null),
          (e = zi.current),
          le(zi, r ? (1 & e) | 2 : 1 & e),
          t)
        : (ku(t), null);
    case 22:
    case 23:
      return (
        Ni(t),
        Fl(),
        (r = null !== t.memoizedState),
        null !== e
          ? (null !== e.memoizedState) !== r && (t.flags |= 8192)
          : r && (t.flags |= 8192),
        r
          ? !!(536870912 & n) &&
            !(128 & t.flags) &&
            (ku(t), 6 & t.subtreeFlags && (t.flags |= 8192))
          : ku(t),
        null !== (n = t.updateQueue) && vu(t, n.retryQueue),
        (n = null),
        null !== e &&
          null !== e.memoizedState &&
          null !== e.memoizedState.cachePool &&
          (n = e.memoizedState.cachePool.pool),
        (r = null),
        null !== t.memoizedState &&
          null !== t.memoizedState.cachePool &&
          (r = t.memoizedState.cachePool.pool),
        r !== n && (t.flags |= 2048),
        null !== e && ae(ll),
        null
      );
    case 24:
      return (
        (n = null),
        null !== e && (n = e.memoizedState.cache),
        t.memoizedState.cache !== n && (t.flags |= 2048),
        Ia(Ka),
        ku(t),
        null
      );
    case 25:
    case 30:
      return null;
  }
  throw Error(E(156, t.tag));
}
function Su(e, t) {
  switch ((ka(t), t.tag)) {
    case 1:
      return 65536 & (e = t.flags) ? ((t.flags = (-65537 & e) | 128), t) : null;
    case 3:
      return (
        Ia(Ka),
        de(),
        65536 & (e = t.flags) && !(128 & e)
          ? ((t.flags = (-65537 & e) | 128), t)
          : null
      );
    case 26:
    case 27:
    case 5:
      return pe(t), null;
    case 13:
      if ((Ni(t), null !== (e = t.memoizedState) && null !== e.dehydrated)) {
        if (null === t.alternate) throw Error(E(340));
        Ta();
      }
      return 65536 & (e = t.flags) ? ((t.flags = (-65537 & e) | 128), t) : null;
    case 19:
      return ae(zi), null;
    case 4:
      return de(), null;
    case 10:
      return Ia(t.type), null;
    case 22:
    case 23:
      return (
        Ni(t),
        Fl(),
        null !== e && ae(ll),
        65536 & (e = t.flags) ? ((t.flags = (-65537 & e) | 128), t) : null
      );
    case 24:
      return Ia(Ka), null;
    default:
      return null;
  }
}
function xu(e, t) {
  switch ((ka(t), t.tag)) {
    case 3:
      Ia(Ka), de();
      break;
    case 26:
    case 27:
    case 5:
      pe(t);
      break;
    case 4:
      de();
      break;
    case 13:
      Ni(t);
      break;
    case 19:
      ae(zi);
      break;
    case 10:
      Ia(t.type);
      break;
    case 22:
    case 23:
      Ni(t), Fl(), null !== e && ae(ll);
      break;
    case 24:
      Ia(Ka);
  }
}
function Eu(e, t) {
  try {
    var n = t.updateQueue,
      r = null !== n ? n.lastEffect : null;
    if (null !== r) {
      var a = r.next;
      n = a;
      do {
        if ((n.tag & e) === e) {
          r = void 0;
          var l = n.create,
            o = n.inst;
          (r = l()), (o.destroy = r);
        }
        n = n.next;
      } while (n !== a);
    }
  } catch (i) {
    zc(t, t.return, i);
  }
}
function Cu(e, t, n) {
  try {
    var r = t.updateQueue,
      a = null !== r ? r.lastEffect : null;
    if (null !== a) {
      var l = a.next;
      r = l;
      do {
        if ((r.tag & e) === e) {
          var o = r.inst,
            i = o.destroy;
          if (void 0 !== i) {
            (o.destroy = void 0), (a = t);
            var u = n,
              s = i;
            try {
              s();
            } catch (c) {
              zc(a, u, c);
            }
          }
        }
        r = r.next;
      } while (r !== l);
    }
  } catch (c) {
    zc(t, t.return, c);
  }
}
function Pu(e) {
  var t = e.updateQueue;
  if (null !== t) {
    var n = e.stateNode;
    try {
      Ll(t, n);
    } catch (r) {
      zc(e, e.return, r);
    }
  }
}
function Nu(e, t, n) {
  (n.props = Ai(e.type, e.memoizedProps)), (n.state = e.memoizedState);
  try {
    n.componentWillUnmount();
  } catch (r) {
    zc(e, t, r);
  }
}
function zu(e, t) {
  try {
    var n = e.ref;
    if (null !== n) {
      switch (e.tag) {
        case 26:
        case 27:
        case 5:
          var r = e.stateNode;
          break;
        default:
          r = e.stateNode;
      }
      "function" == typeof n ? (e.refCleanup = n(r)) : (n.current = r);
    }
  } catch (a) {
    zc(e, t, a);
  }
}
function _u(e, t) {
  var n = e.ref,
    r = e.refCleanup;
  if (null !== n)
    if ("function" == typeof r)
      try {
        r();
      } catch (a) {
        zc(e, t, a);
      } finally {
        (e.refCleanup = null),
          null != (e = e.alternate) && (e.refCleanup = null);
      }
    else if ("function" == typeof n)
      try {
        n(null);
      } catch (l) {
        zc(e, t, l);
      }
    else n.current = null;
}
function Lu(e) {
  var t = e.type,
    n = e.memoizedProps,
    r = e.stateNode;
  try {
    e: switch (t) {
      case "button":
      case "input":
      case "select":
      case "textarea":
        n.autoFocus && r.focus();
        break e;
      case "img":
        n.src ? (r.src = n.src) : n.srcSet && (r.srcset = n.srcSet);
    }
  } catch (a) {
    zc(e, e.return, a);
  }
}
function Tu(e, t, n) {
  try {
    var r = e.stateNode;
    !(function (e, t, n, r) {
      switch (t) {
        case "div":
        case "span":
        case "svg":
        case "path":
        case "a":
        case "g":
        case "p":
        case "li":
          break;
        case "input":
          var a = null,
            l = null,
            o = null,
            i = null,
            u = null,
            s = null,
            c = null;
          for (p in n) {
            var d = n[p];
            if (n.hasOwnProperty(p) && null != d)
              switch (p) {
                case "checked":
                case "value":
                  break;
                case "defaultValue":
                  u = d;
                default:
                  r.hasOwnProperty(p) || gd(e, t, p, null, r, d);
              }
          }
          for (var f in r) {
            var p = r[f];
            if (((d = n[f]), r.hasOwnProperty(f) && (null != p || null != d)))
              switch (f) {
                case "type":
                  l = p;
                  break;
                case "name":
                  a = p;
                  break;
                case "checked":
                  s = p;
                  break;
                case "defaultChecked":
                  c = p;
                  break;
                case "value":
                  o = p;
                  break;
                case "defaultValue":
                  i = p;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (null != p) throw Error(E(137, t));
                  break;
                default:
                  p !== d && gd(e, t, f, p, r, d);
              }
          }
          return void At(e, o, i, u, s, c, l, a);
        case "select":
          for (l in ((p = o = i = f = null), n))
            if (((u = n[l]), n.hasOwnProperty(l) && null != u))
              switch (l) {
                case "value":
                  break;
                case "multiple":
                  p = u;
                default:
                  r.hasOwnProperty(l) || gd(e, t, l, null, r, u);
              }
          for (a in r)
            if (
              ((l = r[a]),
              (u = n[a]),
              r.hasOwnProperty(a) && (null != l || null != u))
            )
              switch (a) {
                case "value":
                  f = l;
                  break;
                case "defaultValue":
                  i = l;
                  break;
                case "multiple":
                  o = l;
                default:
                  l !== u && gd(e, t, a, l, r, u);
              }
          return (
            (t = i),
            (n = o),
            (r = p),
            void (null != f
              ? Mt(e, !!n, f, !1)
              : !!r != !!n &&
                (null != t ? Mt(e, !!n, t, !0) : Mt(e, !!n, n ? [] : "", !1)))
          );
        case "textarea":
          for (i in ((p = f = null), n))
            if (
              ((a = n[i]),
              n.hasOwnProperty(i) && null != a && !r.hasOwnProperty(i))
            )
              switch (i) {
                case "value":
                case "children":
                  break;
                default:
                  gd(e, t, i, null, r, a);
              }
          for (o in r)
            if (
              ((a = r[o]),
              (l = n[o]),
              r.hasOwnProperty(o) && (null != a || null != l))
            )
              switch (o) {
                case "value":
                  f = a;
                  break;
                case "defaultValue":
                  p = a;
                  break;
                case "children":
                  break;
                case "dangerouslySetInnerHTML":
                  if (null != a) throw Error(E(91));
                  break;
                default:
                  a !== l && gd(e, t, o, a, r, l);
              }
          return void It(e, f, p);
        case "option":
          for (var m in n)
            if (
              ((f = n[m]),
              n.hasOwnProperty(m) && null != f && !r.hasOwnProperty(m))
            )
              if ("selected" === m) e.selected = !1;
              else gd(e, t, m, null, r, f);
          for (u in r)
            if (
              ((f = r[u]),
              (p = n[u]),
              r.hasOwnProperty(u) && f !== p && (null != f || null != p))
            )
              if ("selected" === u)
                e.selected =
                  f && "function" != typeof f && "symbol" != typeof f;
              else gd(e, t, u, f, r, p);
          return;
        case "img":
        case "link":
        case "area":
        case "base":
        case "br":
        case "col":
        case "embed":
        case "hr":
        case "keygen":
        case "meta":
        case "param":
        case "source":
        case "track":
        case "wbr":
        case "menuitem":
          for (var h in n)
            (f = n[h]),
              n.hasOwnProperty(h) &&
                null != f &&
                !r.hasOwnProperty(h) &&
                gd(e, t, h, null, r, f);
          for (s in r)
            if (
              ((f = r[s]),
              (p = n[s]),
              r.hasOwnProperty(s) && f !== p && (null != f || null != p))
            )
              switch (s) {
                case "children":
                case "dangerouslySetInnerHTML":
                  if (null != f) throw Error(E(137, t));
                  break;
                default:
                  gd(e, t, s, f, r, p);
              }
          return;
        default:
          if (qt(t)) {
            for (var g in n)
              (f = n[g]),
                n.hasOwnProperty(g) &&
                  void 0 !== f &&
                  !r.hasOwnProperty(g) &&
                  yd(e, t, g, void 0, r, f);
            for (c in r)
              (f = r[c]),
                (p = n[c]),
                !r.hasOwnProperty(c) ||
                  f === p ||
                  (void 0 === f && void 0 === p) ||
                  yd(e, t, c, f, r, p);
            return;
          }
      }
      for (var y in n)
        (f = n[y]),
          n.hasOwnProperty(y) &&
            null != f &&
            !r.hasOwnProperty(y) &&
            gd(e, t, y, null, r, f);
      for (d in r)
        (f = r[d]),
          (p = n[d]),
          !r.hasOwnProperty(d) ||
            f === p ||
            (null == f && null == p) ||
            gd(e, t, d, f, r, p);
    })(r, e.type, n, t),
      (r[Ge] = t);
  } catch (a) {
    zc(e, e.return, a);
  }
}
function Du(e) {
  return (
    5 === e.tag ||
    3 === e.tag ||
    26 === e.tag ||
    (27 === e.tag && Td(e.type)) ||
    4 === e.tag
  );
}
function Ou(e) {
  e: for (;;) {
    for (; null === e.sibling; ) {
      if (null === e.return || Du(e.return)) return null;
      e = e.return;
    }
    for (
      e.sibling.return = e.return, e = e.sibling;
      5 !== e.tag && 6 !== e.tag && 18 !== e.tag;

    ) {
      if (27 === e.tag && Td(e.type)) continue e;
      if (2 & e.flags) continue e;
      if (null === e.child || 4 === e.tag) continue e;
      (e.child.return = e), (e = e.child);
    }
    if (!(2 & e.flags)) return e.stateNode;
  }
}
function Au(e, t, n) {
  var r = e.tag;
  if (5 === r || 6 === r)
    (e = e.stateNode),
      t
        ? (9 === n.nodeType
            ? n.body
            : "HTML" === n.nodeName
            ? n.ownerDocument.body
            : n
          ).insertBefore(e, t)
        : ((t =
            9 === n.nodeType
              ? n.body
              : "HTML" === n.nodeName
              ? n.ownerDocument.body
              : n).appendChild(e),
          null != (n = n._reactRootContainer) ||
            null !== t.onclick ||
            (t.onclick = hd));
  else if (
    4 !== r &&
    (27 === r && Td(e.type) && ((n = e.stateNode), (t = null)),
    null !== (e = e.child))
  )
    for (Au(e, t, n), e = e.sibling; null !== e; ) Au(e, t, n), (e = e.sibling);
}
function Fu(e, t, n) {
  var r = e.tag;
  if (5 === r || 6 === r)
    (e = e.stateNode), t ? n.insertBefore(e, t) : n.appendChild(e);
  else if (
    4 !== r &&
    (27 === r && Td(e.type) && (n = e.stateNode), null !== (e = e.child))
  )
    for (Fu(e, t, n), e = e.sibling; null !== e; ) Fu(e, t, n), (e = e.sibling);
}
function ju(e) {
  var t = e.stateNode,
    n = e.memoizedProps;
  try {
    for (var r = e.type, a = t.attributes; a.length; )
      t.removeAttributeNode(a[0]);
    vd(t, r, n), (t[Ke] = e), (t[Ge] = n);
  } catch (l) {
    zc(e, e.return, l);
  }
}
var Mu = !1,
  Iu = !1,
  Ru = !1,
  Uu = "function" == typeof WeakSet ? WeakSet : Set,
  Vu = null;
function $u(e, t, n) {
  var r = n.flags;
  switch (n.tag) {
    case 0:
    case 11:
    case 15:
      ts(e, n), 4 & r && Eu(5, n);
      break;
    case 1:
      if ((ts(e, n), 4 & r))
        if (((e = n.stateNode), null === t))
          try {
            e.componentDidMount();
          } catch (o) {
            zc(n, n.return, o);
          }
        else {
          var a = Ai(n.type, t.memoizedProps);
          t = t.memoizedState;
          try {
            e.componentDidUpdate(a, t, e.__reactInternalSnapshotBeforeUpdate);
          } catch (i) {
            zc(n, n.return, i);
          }
        }
      64 & r && Pu(n), 512 & r && zu(n, n.return);
      break;
    case 3:
      if ((ts(e, n), 64 & r && null !== (e = n.updateQueue))) {
        if (((t = null), null !== n.child))
          switch (n.child.tag) {
            case 27:
            case 5:
            case 1:
              t = n.child.stateNode;
          }
        try {
          Ll(e, t);
        } catch (o) {
          zc(n, n.return, o);
        }
      }
      break;
    case 27:
      null === t && 4 & r && ju(n);
    case 26:
    case 5:
      ts(e, n), null === t && 4 & r && Lu(n), 512 & r && zu(n, n.return);
      break;
    case 12:
      ts(e, n);
      break;
    case 13:
      ts(e, n),
        4 & r && Xu(e, n),
        64 & r &&
          null !== (e = n.memoizedState) &&
          null !== (e = e.dehydrated) &&
          (function (e, t) {
            var n = e.ownerDocument;
            if ("$?" !== e.data || "complete" === n.readyState) t();
            else {
              var r = function () {
                t(), n.removeEventListener("DOMContentLoaded", r);
              };
              n.addEventListener("DOMContentLoaded", r), (e._reactRetry = r);
            }
          })(e, (n = Dc.bind(null, n)));
      break;
    case 22:
      if (!(r = null !== n.memoizedState || Mu)) {
        (t = (null !== t && null !== t.memoizedState) || Iu), (a = Mu);
        var l = Iu;
        (Mu = r),
          (Iu = t) && !l ? rs(e, n, !!(8772 & n.subtreeFlags)) : ts(e, n),
          (Mu = a),
          (Iu = l);
      }
      break;
    case 30:
      break;
    default:
      ts(e, n);
  }
}
function Hu(e) {
  var t = e.alternate;
  null !== t && ((e.alternate = null), Hu(t)),
    (e.child = null),
    (e.deletions = null),
    (e.sibling = null),
    5 === e.tag && null !== (t = e.stateNode) && at(t),
    (e.stateNode = null),
    (e.return = null),
    (e.dependencies = null),
    (e.memoizedProps = null),
    (e.memoizedState = null),
    (e.pendingProps = null),
    (e.stateNode = null),
    (e.updateQueue = null);
}
var qu = null,
  Bu = !1;
function Qu(e, t, n) {
  for (n = n.child; null !== n; ) Wu(e, t, n), (n = n.sibling);
}
function Wu(e, t, n) {
  if (_e && "function" == typeof _e.onCommitFiberUnmount)
    try {
      _e.onCommitFiberUnmount(ze, n);
    } catch (l) {}
  switch (n.tag) {
    case 26:
      Iu || _u(n, t),
        Qu(e, t, n),
        n.memoizedState
          ? n.memoizedState.count--
          : n.stateNode && (n = n.stateNode).parentNode.removeChild(n);
      break;
    case 27:
      Iu || _u(n, t);
      var r = qu,
        a = Bu;
      Td(n.type) && ((qu = n.stateNode), (Bu = !1)),
        Qu(e, t, n),
        Rd(n.stateNode),
        (qu = r),
        (Bu = a);
      break;
    case 5:
      Iu || _u(n, t);
    case 6:
      if (
        ((r = qu),
        (a = Bu),
        (qu = null),
        Qu(e, t, n),
        (Bu = a),
        null !== (qu = r))
      )
        if (Bu)
          try {
            (9 === qu.nodeType
              ? qu.body
              : "HTML" === qu.nodeName
              ? qu.ownerDocument.body
              : qu
            ).removeChild(n.stateNode);
          } catch (o) {
            zc(n, t, o);
          }
        else
          try {
            qu.removeChild(n.stateNode);
          } catch (o) {
            zc(n, t, o);
          }
      break;
    case 18:
      null !== qu &&
        (Bu
          ? (Dd(
              9 === (e = qu).nodeType
                ? e.body
                : "HTML" === e.nodeName
                ? e.ownerDocument.body
                : e,
              n.stateNode
            ),
            Qf(e))
          : Dd(qu, n.stateNode));
      break;
    case 4:
      (r = qu),
        (a = Bu),
        (qu = n.stateNode.containerInfo),
        (Bu = !0),
        Qu(e, t, n),
        (qu = r),
        (Bu = a);
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      Iu || Cu(2, n, t), Iu || Cu(4, n, t), Qu(e, t, n);
      break;
    case 1:
      Iu ||
        (_u(n, t),
        "function" == typeof (r = n.stateNode).componentWillUnmount &&
          Nu(n, t, r)),
        Qu(e, t, n);
      break;
    case 21:
      Qu(e, t, n);
      break;
    case 22:
      (Iu = (r = Iu) || null !== n.memoizedState), Qu(e, t, n), (Iu = r);
      break;
    default:
      Qu(e, t, n);
  }
}
function Xu(e, t) {
  if (
    null === t.memoizedState &&
    null !== (e = t.alternate) &&
    null !== (e = e.memoizedState) &&
    null !== (e = e.dehydrated)
  )
    try {
      Qf(e);
    } catch (n) {
      zc(t, t.return, n);
    }
}
function Yu(e, t) {
  var n = (function (e) {
    switch (e.tag) {
      case 13:
      case 19:
        var t = e.stateNode;
        return null === t && (t = e.stateNode = new Uu()), t;
      case 22:
        return (
          null === (t = (e = e.stateNode)._retryCache) &&
            (t = e._retryCache = new Uu()),
          t
        );
      default:
        throw Error(E(435, e.tag));
    }
  })(e);
  t.forEach(function (t) {
    var r = Oc.bind(null, e, t);
    n.has(t) || (n.add(t), t.then(r, r));
  });
}
function Ku(e, t) {
  var n = t.deletions;
  if (null !== n)
    for (var r = 0; r < n.length; r++) {
      var a = n[r],
        l = e,
        o = t,
        i = o;
      e: for (; null !== i; ) {
        switch (i.tag) {
          case 27:
            if (Td(i.type)) {
              (qu = i.stateNode), (Bu = !1);
              break e;
            }
            break;
          case 5:
            (qu = i.stateNode), (Bu = !1);
            break e;
          case 3:
          case 4:
            (qu = i.stateNode.containerInfo), (Bu = !0);
            break e;
        }
        i = i.return;
      }
      if (null === qu) throw Error(E(160));
      Wu(l, o, a),
        (qu = null),
        (Bu = !1),
        null !== (l = a.alternate) && (l.return = null),
        (a.return = null);
    }
  if (13878 & t.subtreeFlags)
    for (t = t.child; null !== t; ) Ju(t, e), (t = t.sibling);
}
var Gu = null;
function Ju(e, t) {
  var n = e.alternate,
    r = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      Ku(t, e),
        Zu(e),
        4 & r && (Cu(3, e, e.return), Eu(3, e), Cu(5, e, e.return));
      break;
    case 1:
      Ku(t, e),
        Zu(e),
        512 & r && (Iu || null === n || _u(n, n.return)),
        64 & r &&
          Mu &&
          null !== (e = e.updateQueue) &&
          null !== (r = e.callbacks) &&
          ((n = e.shared.hiddenCallbacks),
          (e.shared.hiddenCallbacks = null === n ? r : n.concat(r)));
      break;
    case 26:
      var a = Gu;
      if (
        (Ku(t, e),
        Zu(e),
        512 & r && (Iu || null === n || _u(n, n.return)),
        4 & r)
      ) {
        var l = null !== n ? n.memoizedState : null;
        if (((r = e.memoizedState), null === n))
          if (null === r)
            if (null === e.stateNode) {
              e: {
                (r = e.type), (n = e.memoizedProps), (a = a.ownerDocument || a);
                t: switch (r) {
                  case "title":
                    (!(l = a.getElementsByTagName("title")[0]) ||
                      l[rt] ||
                      l[Ke] ||
                      "http://www.w3.org/2000/svg" === l.namespaceURI ||
                      l.hasAttribute("itemprop")) &&
                      ((l = a.createElement(r)),
                      a.head.insertBefore(l, a.querySelector("head > title"))),
                      vd(l, r, n),
                      (l[Ke] = e),
                      st(l),
                      (r = l);
                    break e;
                  case "link":
                    var o = rf("link", "href", a).get(r + (n.href || ""));
                    if (o)
                      for (var i = 0; i < o.length; i++)
                        if (
                          (l = o[i]).getAttribute("href") ===
                            (null == n.href || "" === n.href ? null : n.href) &&
                          l.getAttribute("rel") ===
                            (null == n.rel ? null : n.rel) &&
                          l.getAttribute("title") ===
                            (null == n.title ? null : n.title) &&
                          l.getAttribute("crossorigin") ===
                            (null == n.crossOrigin ? null : n.crossOrigin)
                        ) {
                          o.splice(i, 1);
                          break t;
                        }
                    vd((l = a.createElement(r)), r, n), a.head.appendChild(l);
                    break;
                  case "meta":
                    if (
                      (o = rf("meta", "content", a).get(r + (n.content || "")))
                    )
                      for (i = 0; i < o.length; i++)
                        if (
                          (l = o[i]).getAttribute("content") ===
                            (null == n.content ? null : "" + n.content) &&
                          l.getAttribute("name") ===
                            (null == n.name ? null : n.name) &&
                          l.getAttribute("property") ===
                            (null == n.property ? null : n.property) &&
                          l.getAttribute("http-equiv") ===
                            (null == n.httpEquiv ? null : n.httpEquiv) &&
                          l.getAttribute("charset") ===
                            (null == n.charSet ? null : n.charSet)
                        ) {
                          o.splice(i, 1);
                          break t;
                        }
                    vd((l = a.createElement(r)), r, n), a.head.appendChild(l);
                    break;
                  default:
                    throw Error(E(468, r));
                }
                (l[Ke] = e), st(l), (r = l);
              }
              e.stateNode = r;
            } else af(a, e.type, e.stateNode);
          else e.stateNode = Jd(a, r, e.memoizedProps);
        else
          l !== r
            ? (null === l
                ? null !== n.stateNode &&
                  (n = n.stateNode).parentNode.removeChild(n)
                : l.count--,
              null === r
                ? af(a, e.type, e.stateNode)
                : Jd(a, r, e.memoizedProps))
            : null === r &&
              null !== e.stateNode &&
              Tu(e, e.memoizedProps, n.memoizedProps);
      }
      break;
    case 27:
      Ku(t, e),
        Zu(e),
        512 & r && (Iu || null === n || _u(n, n.return)),
        null !== n && 4 & r && Tu(e, e.memoizedProps, n.memoizedProps);
      break;
    case 5:
      if (
        (Ku(t, e),
        Zu(e),
        512 & r && (Iu || null === n || _u(n, n.return)),
        32 & e.flags)
      ) {
        a = e.stateNode;
        try {
          Ut(a, "");
        } catch (p) {
          zc(e, e.return, p);
        }
      }
      4 & r &&
        null != e.stateNode &&
        Tu(e, (a = e.memoizedProps), null !== n ? n.memoizedProps : a),
        1024 & r && (Ru = !0);
      break;
    case 6:
      if ((Ku(t, e), Zu(e), 4 & r)) {
        if (null === e.stateNode) throw Error(E(162));
        (r = e.memoizedProps), (n = e.stateNode);
        try {
          n.nodeValue = r;
        } catch (p) {
          zc(e, e.return, p);
        }
      }
      break;
    case 3:
      if (
        ((nf = null),
        (a = Gu),
        (Gu = $d(t.containerInfo)),
        Ku(t, e),
        (Gu = a),
        Zu(e),
        4 & r && null !== n && n.memoizedState.isDehydrated)
      )
        try {
          Qf(t.containerInfo);
        } catch (p) {
          zc(e, e.return, p);
        }
      Ru && ((Ru = !1), es(e));
      break;
    case 4:
      (r = Gu), (Gu = $d(e.stateNode.containerInfo)), Ku(t, e), Zu(e), (Gu = r);
      break;
    case 12:
    default:
      Ku(t, e), Zu(e);
      break;
    case 13:
      Ku(t, e),
        Zu(e),
        8192 & e.child.flags &&
          (null !== e.memoizedState) !=
            (null !== n && null !== n.memoizedState) &&
          (Rs = be()),
        4 & r &&
          null !== (r = e.updateQueue) &&
          ((e.updateQueue = null), Yu(e, r));
      break;
    case 22:
      a = null !== e.memoizedState;
      var u = null !== n && null !== n.memoizedState,
        s = Mu,
        c = Iu;
      if (
        ((Mu = s || a),
        (Iu = c || u),
        Ku(t, e),
        (Iu = c),
        (Mu = s),
        Zu(e),
        8192 & r)
      )
        e: for (
          t = e.stateNode,
            t._visibility = a ? -2 & t._visibility : 1 | t._visibility,
            a && (null === n || u || Mu || Iu || ns(e)),
            n = null,
            t = e;
          ;

        ) {
          if (5 === t.tag || 26 === t.tag) {
            if (null === n) {
              u = n = t;
              try {
                if (((l = u.stateNode), a))
                  "function" == typeof (o = l.style).setProperty
                    ? o.setProperty("display", "none", "important")
                    : (o.display = "none");
                else {
                  i = u.stateNode;
                  var d = u.memoizedProps.style,
                    f =
                      null != d && d.hasOwnProperty("display")
                        ? d.display
                        : null;
                  i.style.display =
                    null == f || "boolean" == typeof f ? "" : ("" + f).trim();
                }
              } catch (p) {
                zc(u, u.return, p);
              }
            }
          } else if (6 === t.tag) {
            if (null === n) {
              u = t;
              try {
                u.stateNode.nodeValue = a ? "" : u.memoizedProps;
              } catch (p) {
                zc(u, u.return, p);
              }
            }
          } else if (
            ((22 !== t.tag && 23 !== t.tag) ||
              null === t.memoizedState ||
              t === e) &&
            null !== t.child
          ) {
            (t.child.return = t), (t = t.child);
            continue;
          }
          if (t === e) break e;
          for (; null === t.sibling; ) {
            if (null === t.return || t.return === e) break e;
            n === t && (n = null), (t = t.return);
          }
          n === t && (n = null), (t.sibling.return = t.return), (t = t.sibling);
        }
      4 & r &&
        null !== (r = e.updateQueue) &&
        null !== (n = r.retryQueue) &&
        ((r.retryQueue = null), Yu(e, n));
      break;
    case 19:
      Ku(t, e),
        Zu(e),
        4 & r &&
          null !== (r = e.updateQueue) &&
          ((e.updateQueue = null), Yu(e, r));
    case 30:
    case 21:
  }
}
function Zu(e) {
  var t = e.flags;
  if (2 & t) {
    try {
      for (var n, r = e.return; null !== r; ) {
        if (Du(r)) {
          n = r;
          break;
        }
        r = r.return;
      }
      if (null == n) throw Error(E(160));
      switch (n.tag) {
        case 27:
          var a = n.stateNode;
          Fu(e, Ou(e), a);
          break;
        case 5:
          var l = n.stateNode;
          32 & n.flags && (Ut(l, ""), (n.flags &= -33)), Fu(e, Ou(e), l);
          break;
        case 3:
        case 4:
          var o = n.stateNode.containerInfo;
          Au(e, Ou(e), o);
          break;
        default:
          throw Error(E(161));
      }
    } catch (i) {
      zc(e, e.return, i);
    }
    e.flags &= -3;
  }
  4096 & t && (e.flags &= -4097);
}
function es(e) {
  if (1024 & e.subtreeFlags)
    for (e = e.child; null !== e; ) {
      var t = e;
      es(t),
        5 === t.tag && 1024 & t.flags && t.stateNode.reset(),
        (e = e.sibling);
    }
}
function ts(e, t) {
  if (8772 & t.subtreeFlags)
    for (t = t.child; null !== t; ) $u(e, t.alternate, t), (t = t.sibling);
}
function ns(e) {
  for (e = e.child; null !== e; ) {
    var t = e;
    switch (t.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        Cu(4, t, t.return), ns(t);
        break;
      case 1:
        _u(t, t.return);
        var n = t.stateNode;
        "function" == typeof n.componentWillUnmount && Nu(t, t.return, n),
          ns(t);
        break;
      case 27:
        Rd(t.stateNode);
      case 26:
      case 5:
        _u(t, t.return), ns(t);
        break;
      case 22:
        null === t.memoizedState && ns(t);
        break;
      default:
        ns(t);
    }
    e = e.sibling;
  }
}
function rs(e, t, n) {
  for (n = n && !!(8772 & t.subtreeFlags), t = t.child; null !== t; ) {
    var r = t.alternate,
      a = e,
      l = t,
      o = l.flags;
    switch (l.tag) {
      case 0:
      case 11:
      case 15:
        rs(a, l, n), Eu(4, l);
        break;
      case 1:
        if (
          (rs(a, l, n),
          "function" == typeof (a = (r = l).stateNode).componentDidMount)
        )
          try {
            a.componentDidMount();
          } catch (s) {
            zc(r, r.return, s);
          }
        if (null !== (a = (r = l).updateQueue)) {
          var i = r.stateNode;
          try {
            var u = a.shared.hiddenCallbacks;
            if (null !== u)
              for (a.shared.hiddenCallbacks = null, a = 0; a < u.length; a++)
                _l(u[a], i);
          } catch (s) {
            zc(r, r.return, s);
          }
        }
        n && 64 & o && Pu(l), zu(l, l.return);
        break;
      case 27:
        ju(l);
      case 26:
      case 5:
        rs(a, l, n), n && null === r && 4 & o && Lu(l), zu(l, l.return);
        break;
      case 12:
        rs(a, l, n);
        break;
      case 13:
        rs(a, l, n), n && 4 & o && Xu(a, l);
        break;
      case 22:
        null === l.memoizedState && rs(a, l, n), zu(l, l.return);
        break;
      case 30:
        break;
      default:
        rs(a, l, n);
    }
    t = t.sibling;
  }
}
function as(e, t) {
  var n = null;
  null !== e &&
    null !== e.memoizedState &&
    null !== e.memoizedState.cachePool &&
    (n = e.memoizedState.cachePool.pool),
    (e = null),
    null !== t.memoizedState &&
      null !== t.memoizedState.cachePool &&
      (e = t.memoizedState.cachePool.pool),
    e !== n && (null != e && e.refCount++, null != n && Ja(n));
}
function ls(e, t) {
  (e = null),
    null !== t.alternate && (e = t.alternate.memoizedState.cache),
    (t = t.memoizedState.cache) !== e && (t.refCount++, null != e && Ja(e));
}
function os(e, t, n, r) {
  if (10256 & t.subtreeFlags)
    for (t = t.child; null !== t; ) is(e, t, n, r), (t = t.sibling);
}
function is(e, t, n, r) {
  var a = t.flags;
  switch (t.tag) {
    case 0:
    case 11:
    case 15:
      os(e, t, n, r), 2048 & a && Eu(9, t);
      break;
    case 1:
    case 13:
    default:
      os(e, t, n, r);
      break;
    case 3:
      os(e, t, n, r),
        2048 & a &&
          ((e = null),
          null !== t.alternate && (e = t.alternate.memoizedState.cache),
          (t = t.memoizedState.cache) !== e &&
            (t.refCount++, null != e && Ja(e)));
      break;
    case 12:
      if (2048 & a) {
        os(e, t, n, r), (e = t.stateNode);
        try {
          var l = t.memoizedProps,
            o = l.id,
            i = l.onPostCommit;
          "function" == typeof i &&
            i(
              o,
              null === t.alternate ? "mount" : "update",
              e.passiveEffectDuration,
              -0
            );
        } catch (u) {
          zc(t, t.return, u);
        }
      } else os(e, t, n, r);
      break;
    case 23:
      break;
    case 22:
      (l = t.stateNode),
        (o = t.alternate),
        null !== t.memoizedState
          ? 2 & l._visibility
            ? os(e, t, n, r)
            : ss(e, t)
          : 2 & l._visibility
          ? os(e, t, n, r)
          : ((l._visibility |= 2), us(e, t, n, r, !!(10256 & t.subtreeFlags))),
        2048 & a && as(o, t);
      break;
    case 24:
      os(e, t, n, r), 2048 & a && ls(t.alternate, t);
  }
}
function us(e, t, n, r, a) {
  for (a = a && !!(10256 & t.subtreeFlags), t = t.child; null !== t; ) {
    var l = e,
      o = t,
      i = n,
      u = r,
      s = o.flags;
    switch (o.tag) {
      case 0:
      case 11:
      case 15:
        us(l, o, i, u, a), Eu(8, o);
        break;
      case 23:
        break;
      case 22:
        var c = o.stateNode;
        null !== o.memoizedState
          ? 2 & c._visibility
            ? us(l, o, i, u, a)
            : ss(l, o)
          : ((c._visibility |= 2), us(l, o, i, u, a)),
          a && 2048 & s && as(o.alternate, o);
        break;
      case 24:
        us(l, o, i, u, a), a && 2048 & s && ls(o.alternate, o);
        break;
      default:
        us(l, o, i, u, a);
    }
    t = t.sibling;
  }
}
function ss(e, t) {
  if (10256 & t.subtreeFlags)
    for (t = t.child; null !== t; ) {
      var n = e,
        r = t,
        a = r.flags;
      switch (r.tag) {
        case 22:
          ss(n, r), 2048 & a && as(r.alternate, r);
          break;
        case 24:
          ss(n, r), 2048 & a && ls(r.alternate, r);
          break;
        default:
          ss(n, r);
      }
      t = t.sibling;
    }
}
var cs = 8192;
function ds(e) {
  if (e.subtreeFlags & cs)
    for (e = e.child; null !== e; ) fs(e), (e = e.sibling);
}
function fs(e) {
  switch (e.tag) {
    case 26:
      ds(e),
        e.flags & cs &&
          null !== e.memoizedState &&
          (function (e, t, n) {
            if (null === of) throw Error(E(475));
            var r = of;
            if (
              !(
                "stylesheet" !== t.type ||
                ("string" == typeof n.media &&
                  !1 === matchMedia(n.media).matches) ||
                4 & t.state.loading
              )
            ) {
              if (null === t.instance) {
                var a = Wd(n.href),
                  l = e.querySelector(Xd(a));
                if (l)
                  return (
                    null !== (e = l._p) &&
                      "object" == typeof e &&
                      "function" == typeof e.then &&
                      (r.count++, (r = sf.bind(r)), e.then(r, r)),
                    (t.state.loading |= 4),
                    (t.instance = l),
                    void st(l)
                  );
                (l = e.ownerDocument || e),
                  (n = Yd(n)),
                  (a = Ud.get(a)) && ef(n, a),
                  st((l = l.createElement("link")));
                var o = l;
                (o._p = new Promise(function (e, t) {
                  (o.onload = e), (o.onerror = t);
                })),
                  vd(l, "link", n),
                  (t.instance = l);
              }
              null === r.stylesheets && (r.stylesheets = new Map()),
                r.stylesheets.set(t, e),
                (e = t.state.preload) &&
                  !(3 & t.state.loading) &&
                  (r.count++,
                  (t = sf.bind(r)),
                  e.addEventListener("load", t),
                  e.addEventListener("error", t));
            }
          })(Gu, e.memoizedState, e.memoizedProps);
      break;
    case 5:
    default:
      ds(e);
      break;
    case 3:
    case 4:
      var t = Gu;
      (Gu = $d(e.stateNode.containerInfo)), ds(e), (Gu = t);
      break;
    case 22:
      null === e.memoizedState &&
        (null !== (t = e.alternate) && null !== t.memoizedState
          ? ((t = cs), (cs = 16777216), ds(e), (cs = t))
          : ds(e));
  }
}
function ps(e) {
  var t = e.alternate;
  if (null !== t && null !== (e = t.child)) {
    t.child = null;
    do {
      (t = e.sibling), (e.sibling = null), (e = t);
    } while (null !== e);
  }
}
function ms(e) {
  var t = e.deletions;
  if (16 & e.flags) {
    if (null !== t)
      for (var n = 0; n < t.length; n++) {
        var r = t[n];
        (Vu = r), ys(r, e);
      }
    ps(e);
  }
  if (10256 & e.subtreeFlags)
    for (e = e.child; null !== e; ) hs(e), (e = e.sibling);
}
function hs(e) {
  switch (e.tag) {
    case 0:
    case 11:
    case 15:
      ms(e), 2048 & e.flags && Cu(9, e, e.return);
      break;
    case 3:
    case 12:
    default:
      ms(e);
      break;
    case 22:
      var t = e.stateNode;
      null !== e.memoizedState &&
      2 & t._visibility &&
      (null === e.return || 13 !== e.return.tag)
        ? ((t._visibility &= -3), gs(e))
        : ms(e);
  }
}
function gs(e) {
  var t = e.deletions;
  if (16 & e.flags) {
    if (null !== t)
      for (var n = 0; n < t.length; n++) {
        var r = t[n];
        (Vu = r), ys(r, e);
      }
    ps(e);
  }
  for (e = e.child; null !== e; ) {
    switch ((t = e).tag) {
      case 0:
      case 11:
      case 15:
        Cu(8, t, t.return), gs(t);
        break;
      case 22:
        2 & (n = t.stateNode)._visibility && ((n._visibility &= -3), gs(t));
        break;
      default:
        gs(t);
    }
    e = e.sibling;
  }
}
function ys(e, t) {
  for (; null !== Vu; ) {
    var n = Vu;
    switch (n.tag) {
      case 0:
      case 11:
      case 15:
        Cu(8, n, t);
        break;
      case 23:
      case 22:
        if (null !== n.memoizedState && null !== n.memoizedState.cachePool) {
          var r = n.memoizedState.cachePool.pool;
          null != r && r.refCount++;
        }
        break;
      case 24:
        Ja(n.memoizedState.cache);
    }
    if (null !== (r = n.child)) (r.return = n), (Vu = r);
    else
      e: for (n = e; null !== Vu; ) {
        var a = (r = Vu).sibling,
          l = r.return;
        if ((Hu(r), r === n)) {
          Vu = null;
          break e;
        }
        if (null !== a) {
          (a.return = l), (Vu = a);
          break e;
        }
        Vu = l;
      }
  }
}
var vs = {
    getCacheForType: function (e) {
      var t = qa(Ka),
        n = t.data.get(e);
      return void 0 === n && ((n = e()), t.data.set(e, n)), n;
    },
  },
  bs = "function" == typeof WeakMap ? WeakMap : Map,
  ks = 0,
  ws = null,
  Ss = null,
  xs = 0,
  Es = 0,
  Cs = null,
  Ps = !1,
  Ns = !1,
  zs = !1,
  _s = 0,
  Ls = 0,
  Ts = 0,
  Ds = 0,
  Os = 0,
  As = 0,
  Fs = 0,
  js = null,
  Ms = null,
  Is = !1,
  Rs = 0,
  Us = 1 / 0,
  Vs = null,
  $s = null,
  Hs = 0,
  qs = null,
  Bs = null,
  Qs = 0,
  Ws = 0,
  Xs = null,
  Ys = null,
  Ks = 0,
  Gs = null;
function Js() {
  if (2 & ks && 0 !== xs) return xs & -xs;
  if (null !== J.T) {
    return 0 !== tl ? tl : Wc();
  }
  return Xe();
}
function Zs() {
  0 === As && (As = 536870912 & xs && !xa ? 536870912 : Ue());
  var e = Si.current;
  return null !== e && (e.flags |= 32), As;
}
function ec(e, t, n) {
  ((e !== ws || (2 !== Es && 9 !== Es)) && null === e.cancelPendingCommit) ||
    (ic(e, 0), ac(e, xs, As, !1)),
    He(e, n),
    (2 & ks && e === ws) ||
      (e === ws && (!(2 & ks) && (Ds |= n), 4 === Ls && ac(e, xs, As, !1)),
      Uc(e));
}
function tc(e, t, n) {
  if (6 & ks) throw Error(E(327));
  for (
    var r = (!n && !(124 & t) && !(t & e.expiredLanes)) || Ie(e, t),
      a = r
        ? (function (e, t) {
            var n = ks;
            ks |= 2;
            var r = sc(),
              a = cc();
            ws !== e || xs !== t
              ? ((Vs = null), (Us = be() + 500), ic(e, t))
              : (Ns = Ie(e, t));
            e: for (;;)
              try {
                if (0 !== Es && null !== Ss) {
                  t = Ss;
                  var l = Cs;
                  t: switch (Es) {
                    case 1:
                      (Es = 0), (Cs = null), yc(e, t, l, 1);
                      break;
                    case 2:
                    case 9:
                      if (pl(l)) {
                        (Es = 0), (Cs = null), gc(t);
                        break;
                      }
                      (t = function () {
                        (2 !== Es && 9 !== Es) || ws !== e || (Es = 7), Uc(e);
                      }),
                        l.then(t, t);
                      break e;
                    case 3:
                      Es = 7;
                      break e;
                    case 4:
                      Es = 5;
                      break e;
                    case 7:
                      pl(l)
                        ? ((Es = 0), (Cs = null), gc(t))
                        : ((Es = 0), (Cs = null), yc(e, t, l, 7));
                      break;
                    case 5:
                      var o = null;
                      switch (Ss.tag) {
                        case 26:
                          o = Ss.memoizedState;
                        case 5:
                        case 27:
                          var i = Ss;
                          if (!o || lf(o)) {
                            (Es = 0), (Cs = null);
                            var u = i.sibling;
                            if (null !== u) Ss = u;
                            else {
                              var s = i.return;
                              null !== s ? ((Ss = s), vc(s)) : (Ss = null);
                            }
                            break t;
                          }
                      }
                      (Es = 0), (Cs = null), yc(e, t, l, 5);
                      break;
                    case 6:
                      (Es = 0), (Cs = null), yc(e, t, l, 6);
                      break;
                    case 8:
                      oc(), (Ls = 6);
                      break e;
                    default:
                      throw Error(E(462));
                  }
                }
                mc();
                break;
              } catch (c) {
                uc(e, c);
              }
            return (
              (ja = Fa = null),
              (J.H = r),
              (J.A = a),
              (ks = n),
              null !== Ss ? 0 : ((ws = null), (xs = 0), Qr(), Ls)
            );
          })(e, t)
        : fc(e, t, !0),
      l = r;
    ;

  ) {
    if (0 === a) {
      Ns && !r && ac(e, t, 0, !1);
      break;
    }
    if (((n = e.current.alternate), !l || rc(n))) {
      if (2 === a) {
        if (((l = t), e.errorRecoveryDisabledLanes & l)) var o = 0;
        else
          o =
            0 !== (o = -536870913 & e.pendingLanes)
              ? o
              : 536870912 & o
              ? 536870912
              : 0;
        if (0 !== o) {
          t = o;
          e: {
            var i = e;
            a = js;
            var u = i.current.memoizedState.isDehydrated;
            if ((u && (ic(i, o).flags |= 256), 2 !== (o = fc(i, o, !1)))) {
              if (zs && !u) {
                (i.errorRecoveryDisabledLanes |= l), (Ds |= l), (a = 4);
                break e;
              }
              (l = Ms),
                (Ms = a),
                null !== l && (null === Ms ? (Ms = l) : Ms.push.apply(Ms, l));
            }
            a = o;
          }
          if (((l = !1), 2 !== a)) continue;
        }
      }
      if (1 === a) {
        ic(e, 0), ac(e, t, 0, !0);
        break;
      }
      e: {
        switch (((r = e), (l = a))) {
          case 0:
          case 1:
            throw Error(E(345));
          case 4:
            if ((4194048 & t) !== t) break;
          case 6:
            ac(r, t, As, !Ps);
            break e;
          case 2:
            Ms = null;
            break;
          case 3:
          case 5:
            break;
          default:
            throw Error(E(329));
        }
        if ((62914560 & t) === t && 10 < (a = Rs + 300 - be())) {
          if ((ac(r, t, As, !Ps), 0 !== Me(r, 0, !0))) break e;
          r.timeoutHandle = Pd(
            nc.bind(null, r, n, Ms, Vs, Is, t, As, Ds, Fs, Ps, l, 2, -0, 0),
            a
          );
        } else nc(r, n, Ms, Vs, Is, t, As, Ds, Fs, Ps, l, 0, -0, 0);
      }
      break;
    }
    (a = fc(e, t, !1)), (l = !1);
  }
  Uc(e);
}
function nc(e, t, n, r, a, l, o, i, u, s, c, d, f, p) {
  if (
    ((e.timeoutHandle = -1),
    (8192 & (d = t.subtreeFlags) || !(16785408 & ~d)) &&
      ((of = { stylesheets: null, count: 0, unsuspend: uf }),
      fs(t),
      null !==
        (d = (function () {
          if (null === of) throw Error(E(475));
          var e = of;
          return (
            e.stylesheets && 0 === e.count && df(e, e.stylesheets),
            0 < e.count
              ? function (t) {
                  var n = setTimeout(function () {
                    if ((e.stylesheets && df(e, e.stylesheets), e.unsuspend)) {
                      var t = e.unsuspend;
                      (e.unsuspend = null), t();
                    }
                  }, 6e4);
                  return (
                    (e.unsuspend = t),
                    function () {
                      (e.unsuspend = null), clearTimeout(n);
                    }
                  );
                }
              : null
          );
        })())))
  )
    return (
      (e.cancelPendingCommit = d(
        kc.bind(null, e, t, l, n, r, a, o, i, u, c, 1, f, p)
      )),
      void ac(e, l, o, !s)
    );
  kc(e, t, l, n, r, a, o, i, u);
}
function rc(e) {
  for (var t = e; ; ) {
    var n = t.tag;
    if (
      (0 === n || 11 === n || 15 === n) &&
      16384 & t.flags &&
      null !== (n = t.updateQueue) &&
      null !== (n = n.stores)
    )
      for (var r = 0; r < n.length; r++) {
        var a = n[r],
          l = a.getSnapshot;
        a = a.value;
        try {
          if (!pr(l(), a)) return !1;
        } catch (o) {
          return !1;
        }
      }
    if (((n = t.child), 16384 & t.subtreeFlags && null !== n))
      (n.return = t), (t = n);
    else {
      if (t === e) break;
      for (; null === t.sibling; ) {
        if (null === t.return || t.return === e) return !0;
        t = t.return;
      }
      (t.sibling.return = t.return), (t = t.sibling);
    }
  }
  return !0;
}
function ac(e, t, n, r) {
  (t &= ~Os),
    (t &= ~Ds),
    (e.suspendedLanes |= t),
    (e.pingedLanes &= ~t),
    r && (e.warmLanes |= t),
    (r = e.expirationTimes);
  for (var a = t; 0 < a; ) {
    var l = 31 - Te(a),
      o = 1 << l;
    (r[l] = -1), (a &= ~o);
  }
  0 !== n && qe(e, n, t);
}
function lc() {
  return !!(6 & ks) || (Vc(0), !1);
}
function oc() {
  if (null !== Ss) {
    if (0 === Es) var e = Ss.return;
    else (ja = Fa = null), to((e = Ss)), (pi = null), (mi = 0), (e = Ss);
    for (; null !== e; ) xu(e.alternate, e), (e = e.return);
    Ss = null;
  }
}
function ic(e, t) {
  var n = e.timeoutHandle;
  -1 !== n && ((e.timeoutHandle = -1), Nd(n)),
    null !== (n = e.cancelPendingCommit) &&
      ((e.cancelPendingCommit = null), n()),
    oc(),
    (ws = e),
    (Ss = n = na(e.current, null)),
    (xs = t),
    (Es = 0),
    (Cs = null),
    (Ps = !1),
    (Ns = Ie(e, t)),
    (zs = !1),
    (Fs = As = Os = Ds = Ts = Ls = 0),
    (Ms = js = null),
    (Is = !1),
    8 & t && (t |= 32 & t);
  var r = e.entangledLanes;
  if (0 !== r)
    for (e = e.entanglements, r &= t; 0 < r; ) {
      var a = 31 - Te(r),
        l = 1 << a;
      (t |= e[a]), (r &= ~l);
    }
  return (_s = t), Qr(), n;
}
function uc(e, t) {
  (Ml = null),
    (J.H = si),
    t === sl || t === dl
      ? ((t = yl()), (Es = 3))
      : t === cl
      ? ((t = yl()), (Es = 4))
      : (Es =
          t === qi
            ? 8
            : null !== t && "object" == typeof t && "function" == typeof t.then
            ? 6
            : 1),
    (Cs = t),
    null === Ss && ((Ls = 1), Ri(e, $r(t, e.current)));
}
function sc() {
  var e = J.H;
  return (J.H = si), null === e ? si : e;
}
function cc() {
  var e = J.A;
  return (J.A = vs), e;
}
function dc() {
  (Ls = 4),
    Ps || ((4194048 & xs) !== xs && null !== Si.current) || (Ns = !0),
    (!(134217727 & Ts) && !(134217727 & Ds)) ||
      null === ws ||
      ac(ws, xs, As, !1);
}
function fc(e, t, n) {
  var r = ks;
  ks |= 2;
  var a = sc(),
    l = cc();
  (ws === e && xs === t) || ((Vs = null), ic(e, t)), (t = !1);
  var o = Ls;
  e: for (;;)
    try {
      if (0 !== Es && null !== Ss) {
        var i = Ss,
          u = Cs;
        switch (Es) {
          case 8:
            oc(), (o = 6);
            break e;
          case 3:
          case 2:
          case 9:
          case 6:
            null === Si.current && (t = !0);
            var s = Es;
            if (((Es = 0), (Cs = null), yc(e, i, u, s), n && Ns)) {
              o = 0;
              break e;
            }
            break;
          default:
            (s = Es), (Es = 0), (Cs = null), yc(e, i, u, s);
        }
      }
      pc(), (o = Ls);
      break;
    } catch (c) {
      uc(e, c);
    }
  return (
    t && e.shellSuspendCounter++,
    (ja = Fa = null),
    (ks = r),
    (J.H = a),
    (J.A = l),
    null === Ss && ((ws = null), (xs = 0), Qr()),
    o
  );
}
function pc() {
  for (; null !== Ss; ) hc(Ss);
}
function mc() {
  for (; null !== Ss && !ye(); ) hc(Ss);
}
function hc(e) {
  var t = hu(e.alternate, e, _s);
  (e.memoizedProps = e.pendingProps), null === t ? vc(e) : (Ss = t);
}
function gc(e) {
  var t = e,
    n = t.alternate;
  switch (t.tag) {
    case 15:
    case 0:
      t = eu(n, t, t.pendingProps, t.type, void 0, xs);
      break;
    case 11:
      t = eu(n, t, t.pendingProps, t.type.render, t.ref, xs);
      break;
    case 5:
      to(t);
    default:
      xu(n, t), (t = hu(n, (t = Ss = ra(t, _s)), _s));
  }
  (e.memoizedProps = e.pendingProps), null === t ? vc(e) : (Ss = t);
}
function yc(e, t, n, r) {
  (ja = Fa = null), to(t), (pi = null), (mi = 0);
  var a = t.return;
  try {
    if (
      (function (e, t, n, r, a) {
        if (
          ((n.flags |= 32768),
          null !== r && "object" == typeof r && "function" == typeof r.then)
        ) {
          if (
            (null !== (t = n.alternate) && Va(t, n, a, !0),
            null !== (n = Si.current))
          ) {
            switch (n.tag) {
              case 13:
                return (
                  null === xi
                    ? dc()
                    : null === n.alternate && 0 === Ls && (Ls = 3),
                  (n.flags &= -257),
                  (n.flags |= 65536),
                  (n.lanes = a),
                  r === fl
                    ? (n.flags |= 16384)
                    : (null === (t = n.updateQueue)
                        ? (n.updateQueue = new Set([r]))
                        : t.add(r),
                      _c(e, r, a)),
                  !1
                );
              case 22:
                return (
                  (n.flags |= 65536),
                  r === fl
                    ? (n.flags |= 16384)
                    : (null === (t = n.updateQueue)
                        ? ((t = {
                            transitions: null,
                            markerInstances: null,
                            retryQueue: new Set([r]),
                          }),
                          (n.updateQueue = t))
                        : null === (n = t.retryQueue)
                        ? (t.retryQueue = new Set([r]))
                        : n.add(r),
                      _c(e, r, a)),
                  !1
                );
            }
            throw Error(E(435, n.tag));
          }
          return _c(e, r, a), dc(), !1;
        }
        if (xa)
          return (
            null !== (t = Si.current)
              ? (!(65536 & t.flags) && (t.flags |= 256),
                (t.flags |= 65536),
                (t.lanes = a),
                r !== Pa && Oa($r((e = Error(E(422), { cause: r })), n)))
              : (r !== Pa && Oa($r((t = Error(E(423), { cause: r })), n)),
                ((e = e.current.alternate).flags |= 65536),
                (a &= -a),
                (e.lanes |= a),
                (r = $r(r, n)),
                Cl(e, (a = Vi(e.stateNode, r, a))),
                4 !== Ls && (Ls = 2)),
            !1
          );
        var l = Error(E(520), { cause: r });
        if (
          ((l = $r(l, n)),
          null === js ? (js = [l]) : js.push(l),
          4 !== Ls && (Ls = 2),
          null === t)
        )
          return !0;
        (r = $r(r, n)), (n = t);
        do {
          switch (n.tag) {
            case 3:
              return (
                (n.flags |= 65536),
                (e = a & -a),
                (n.lanes |= e),
                Cl(n, (e = Vi(n.stateNode, r, e))),
                !1
              );
            case 1:
              if (
                ((t = n.type),
                (l = n.stateNode),
                !(
                  128 & n.flags ||
                  ("function" != typeof t.getDerivedStateFromError &&
                    (null === l ||
                      "function" != typeof l.componentDidCatch ||
                      (null !== $s && $s.has(l))))
                ))
              )
                return (
                  (n.flags |= 65536),
                  (a &= -a),
                  (n.lanes |= a),
                  Hi((a = $i(a)), e, n, r),
                  Cl(n, a),
                  !1
                );
          }
          n = n.return;
        } while (null !== n);
        return !1;
      })(e, a, t, n, xs)
    )
      return (Ls = 1), Ri(e, $r(n, e.current)), void (Ss = null);
  } catch (l) {
    if (null !== a) throw ((Ss = a), l);
    return (Ls = 1), Ri(e, $r(n, e.current)), void (Ss = null);
  }
  32768 & t.flags
    ? (xa || 1 === r
        ? (e = !0)
        : Ns || 536870912 & xs
        ? (e = !1)
        : ((Ps = e = !0),
          (2 === r || 9 === r || 3 === r || 6 === r) &&
            null !== (r = Si.current) &&
            13 === r.tag &&
            (r.flags |= 16384)),
      bc(t, e))
    : vc(t);
}
function vc(e) {
  var t = e;
  do {
    if (32768 & t.flags) return void bc(t, Ps);
    e = t.return;
    var n = wu(t.alternate, t, _s);
    if (null !== n) return void (Ss = n);
    if (null !== (t = t.sibling)) return void (Ss = t);
    Ss = t = e;
  } while (null !== t);
  0 === Ls && (Ls = 5);
}
function bc(e, t) {
  do {
    var n = Su(e.alternate, e);
    if (null !== n) return (n.flags &= 32767), void (Ss = n);
    if (
      (null !== (n = e.return) &&
        ((n.flags |= 32768), (n.subtreeFlags = 0), (n.deletions = null)),
      !t && null !== (e = e.sibling))
    )
      return void (Ss = e);
    Ss = e = n;
  } while (null !== e);
  (Ls = 6), (Ss = null);
}
function kc(e, t, n, r, a, l, o, i, u) {
  e.cancelPendingCommit = null;
  do {
    Cc();
  } while (0 !== Hs);
  if (6 & ks) throw Error(E(327));
  if (null !== t) {
    if (t === e.current) throw Error(E(177));
    if (
      ((l = t.lanes | t.childLanes),
      (function (e, t, n, r, a, l) {
        var o = e.pendingLanes;
        (e.pendingLanes = n),
          (e.suspendedLanes = 0),
          (e.pingedLanes = 0),
          (e.warmLanes = 0),
          (e.expiredLanes &= n),
          (e.entangledLanes &= n),
          (e.errorRecoveryDisabledLanes &= n),
          (e.shellSuspendCounter = 0);
        var i = e.entanglements,
          u = e.expirationTimes,
          s = e.hiddenUpdates;
        for (n = o & ~n; 0 < n; ) {
          var c = 31 - Te(n),
            d = 1 << c;
          (i[c] = 0), (u[c] = -1);
          var f = s[c];
          if (null !== f)
            for (s[c] = null, c = 0; c < f.length; c++) {
              var p = f[c];
              null !== p && (p.lane &= -536870913);
            }
          n &= ~d;
        }
        0 !== r && qe(e, r, 0),
          0 !== l &&
            0 === a &&
            0 !== e.tag &&
            (e.suspendedLanes |= l & ~(o & ~t));
      })(e, n, (l |= Br), o, i, u),
      e === ws && ((Ss = ws = null), (xs = 0)),
      (Bs = t),
      (qs = e),
      (Qs = n),
      (Ws = l),
      (Xs = a),
      (Ys = r),
      10256 & t.subtreeFlags || 10256 & t.flags
        ? ((e.callbackNode = null),
          (e.callbackPriority = 0),
          he(xe, function () {
            return Pc(), null;
          }))
        : ((e.callbackNode = null), (e.callbackPriority = 0)),
      (r = !!(13878 & t.flags)),
      13878 & t.subtreeFlags || r)
    ) {
      (r = J.T), (J.T = null), (a = Z.p), (Z.p = 2), (o = ks), (ks |= 4);
      try {
        !(function (e, t) {
          if (((e = e.containerInfo), (bd = wf), br((e = vr(e))))) {
            if ("selectionStart" in e)
              var n = { start: e.selectionStart, end: e.selectionEnd };
            else
              e: {
                var r =
                  (n = ((n = e.ownerDocument) && n.defaultView) || window)
                    .getSelection && n.getSelection();
                if (r && 0 !== r.rangeCount) {
                  n = r.anchorNode;
                  var a = r.anchorOffset,
                    l = r.focusNode;
                  r = r.focusOffset;
                  try {
                    n.nodeType, l.nodeType;
                  } catch (h) {
                    n = null;
                    break e;
                  }
                  var o = 0,
                    i = -1,
                    u = -1,
                    s = 0,
                    c = 0,
                    d = e,
                    f = null;
                  t: for (;;) {
                    for (
                      var p;
                      d !== n || (0 !== a && 3 !== d.nodeType) || (i = o + a),
                        d !== l || (0 !== r && 3 !== d.nodeType) || (u = o + r),
                        3 === d.nodeType && (o += d.nodeValue.length),
                        null !== (p = d.firstChild);

                    )
                      (f = d), (d = p);
                    for (;;) {
                      if (d === e) break t;
                      if (
                        (f === n && ++s === a && (i = o),
                        f === l && ++c === r && (u = o),
                        null !== (p = d.nextSibling))
                      )
                        break;
                      f = (d = f).parentNode;
                    }
                    d = p;
                  }
                  n = -1 === i || -1 === u ? null : { start: i, end: u };
                } else n = null;
              }
            n = n || { start: 0, end: 0 };
          } else n = null;
          for (
            kd = { focusedElem: e, selectionRange: n }, wf = !1, Vu = t;
            null !== Vu;

          )
            if (((e = (t = Vu).child), 1024 & t.subtreeFlags && null !== e))
              (e.return = t), (Vu = e);
            else
              for (; null !== Vu; ) {
                switch (((l = (t = Vu).alternate), (e = t.flags), t.tag)) {
                  case 0:
                  case 11:
                  case 15:
                  case 5:
                  case 26:
                  case 27:
                  case 6:
                  case 4:
                  case 17:
                    break;
                  case 1:
                    if (1024 & e && null !== l) {
                      (e = void 0),
                        (n = t),
                        (a = l.memoizedProps),
                        (l = l.memoizedState),
                        (r = n.stateNode);
                      try {
                        var m = Ai(n.type, a, (n.elementType, n.type));
                        (e = r.getSnapshotBeforeUpdate(m, l)),
                          (r.__reactInternalSnapshotBeforeUpdate = e);
                      } catch (g) {
                        zc(n, n.return, g);
                      }
                    }
                    break;
                  case 3:
                    if (1024 & e)
                      if (9 === (n = (e = t.stateNode.containerInfo).nodeType))
                        Od(e);
                      else if (1 === n)
                        switch (e.nodeName) {
                          case "HEAD":
                          case "HTML":
                          case "BODY":
                            Od(e);
                            break;
                          default:
                            e.textContent = "";
                        }
                    break;
                  default:
                    if (1024 & e) throw Error(E(163));
                }
                if (null !== (e = t.sibling)) {
                  (e.return = t.return), (Vu = e);
                  break;
                }
                Vu = t.return;
              }
        })(e, t);
      } finally {
        (ks = o), (Z.p = a), (J.T = r);
      }
    }
    (Hs = 1), wc(), Sc(), xc();
  }
}
function wc() {
  if (1 === Hs) {
    Hs = 0;
    var e = qs,
      t = Bs,
      n = !!(13878 & t.flags);
    if (13878 & t.subtreeFlags || n) {
      (n = J.T), (J.T = null);
      var r = Z.p;
      Z.p = 2;
      var a = ks;
      ks |= 4;
      try {
        Ju(t, e);
        var l = kd,
          o = vr(e.containerInfo),
          i = l.focusedElem,
          u = l.selectionRange;
        if (
          o !== i &&
          i &&
          i.ownerDocument &&
          yr(i.ownerDocument.documentElement, i)
        ) {
          if (null !== u && br(i)) {
            var s = u.start,
              c = u.end;
            if ((void 0 === c && (c = s), "selectionStart" in i))
              (i.selectionStart = s),
                (i.selectionEnd = Math.min(c, i.value.length));
            else {
              var d = i.ownerDocument || document,
                f = (d && d.defaultView) || window;
              if (f.getSelection) {
                var p = f.getSelection(),
                  m = i.textContent.length,
                  h = Math.min(u.start, m),
                  g = void 0 === u.end ? h : Math.min(u.end, m);
                !p.extend && h > g && ((o = g), (g = h), (h = o));
                var y = gr(i, h),
                  v = gr(i, g);
                if (
                  y &&
                  v &&
                  (1 !== p.rangeCount ||
                    p.anchorNode !== y.node ||
                    p.anchorOffset !== y.offset ||
                    p.focusNode !== v.node ||
                    p.focusOffset !== v.offset)
                ) {
                  var b = d.createRange();
                  b.setStart(y.node, y.offset),
                    p.removeAllRanges(),
                    h > g
                      ? (p.addRange(b), p.extend(v.node, v.offset))
                      : (b.setEnd(v.node, v.offset), p.addRange(b));
                }
              }
            }
          }
          for (d = [], p = i; (p = p.parentNode); )
            1 === p.nodeType &&
              d.push({ element: p, left: p.scrollLeft, top: p.scrollTop });
          for (
            "function" == typeof i.focus && i.focus(), i = 0;
            i < d.length;
            i++
          ) {
            var k = d[i];
            (k.element.scrollLeft = k.left), (k.element.scrollTop = k.top);
          }
        }
        (wf = !!bd), (kd = bd = null);
      } finally {
        (ks = a), (Z.p = r), (J.T = n);
      }
    }
    (e.current = t), (Hs = 2);
  }
}
function Sc() {
  if (2 === Hs) {
    Hs = 0;
    var e = qs,
      t = Bs,
      n = !!(8772 & t.flags);
    if (8772 & t.subtreeFlags || n) {
      (n = J.T), (J.T = null);
      var r = Z.p;
      Z.p = 2;
      var a = ks;
      ks |= 4;
      try {
        $u(e, t.alternate, t);
      } finally {
        (ks = a), (Z.p = r), (J.T = n);
      }
    }
    Hs = 3;
  }
}
function xc() {
  if (4 === Hs || 3 === Hs) {
    (Hs = 0), ve();
    var e = qs,
      t = Bs,
      n = Qs,
      r = Ys;
    10256 & t.subtreeFlags || 10256 & t.flags
      ? (Hs = 5)
      : ((Hs = 0), (Bs = qs = null), Ec(e, e.pendingLanes));
    var a = e.pendingLanes;
    if (
      (0 === a && ($s = null),
      We(n),
      (t = t.stateNode),
      _e && "function" == typeof _e.onCommitFiberRoot)
    )
      try {
        _e.onCommitFiberRoot(ze, t, void 0, !(128 & ~t.current.flags));
      } catch (u) {}
    if (null !== r) {
      (t = J.T), (a = Z.p), (Z.p = 2), (J.T = null);
      try {
        for (var l = e.onRecoverableError, o = 0; o < r.length; o++) {
          var i = r[o];
          l(i.value, { componentStack: i.stack });
        }
      } finally {
        (J.T = t), (Z.p = a);
      }
    }
    3 & Qs && Cc(),
      Uc(e),
      (a = e.pendingLanes),
      4194090 & n && 42 & a
        ? e === Gs
          ? Ks++
          : ((Ks = 0), (Gs = e))
        : (Ks = 0),
      Vc(0);
  }
}
function Ec(e, t) {
  0 == (e.pooledCacheLanes &= t) &&
    null != (t = e.pooledCache) &&
    ((e.pooledCache = null), Ja(t));
}
function Cc(e) {
  return wc(), Sc(), xc(), Pc();
}
function Pc() {
  if (5 !== Hs) return !1;
  var e = qs,
    t = Ws;
  Ws = 0;
  var n = We(Qs),
    r = J.T,
    a = Z.p;
  try {
    (Z.p = 32 > n ? 32 : n), (J.T = null), (n = Xs), (Xs = null);
    var l = qs,
      o = Qs;
    if (((Hs = 0), (Bs = qs = null), (Qs = 0), 6 & ks)) throw Error(E(331));
    var i = ks;
    if (
      ((ks |= 4),
      hs(l.current),
      is(l, l.current, o, n),
      (ks = i),
      Vc(0, !1),
      _e && "function" == typeof _e.onPostCommitFiberRoot)
    )
      try {
        _e.onPostCommitFiberRoot(ze, l);
      } catch (u) {}
    return !0;
  } finally {
    (Z.p = a), (J.T = r), Ec(e, t);
  }
}
function Nc(e, t, n) {
  (t = $r(n, t)),
    null !== (e = xl(e, (t = Vi(e.stateNode, t, 2)), 2)) && (He(e, 2), Uc(e));
}
function zc(e, t, n) {
  if (3 === e.tag) Nc(e, e, n);
  else
    for (; null !== t; ) {
      if (3 === t.tag) {
        Nc(t, e, n);
        break;
      }
      if (1 === t.tag) {
        var r = t.stateNode;
        if (
          "function" == typeof t.type.getDerivedStateFromError ||
          ("function" == typeof r.componentDidCatch &&
            (null === $s || !$s.has(r)))
        ) {
          (e = $r(n, e)),
            null !== (r = xl(t, (n = $i(2)), 2)) &&
              (Hi(n, r, t, e), He(r, 2), Uc(r));
          break;
        }
      }
      t = t.return;
    }
}
function _c(e, t, n) {
  var r = e.pingCache;
  if (null === r) {
    r = e.pingCache = new bs();
    var a = new Set();
    r.set(t, a);
  } else void 0 === (a = r.get(t)) && ((a = new Set()), r.set(t, a));
  a.has(n) || ((zs = !0), a.add(n), (e = Lc.bind(null, e, t, n)), t.then(e, e));
}
function Lc(e, t, n) {
  var r = e.pingCache;
  null !== r && r.delete(t),
    (e.pingedLanes |= e.suspendedLanes & n),
    (e.warmLanes &= ~n),
    ws === e &&
      (xs & n) === n &&
      (4 === Ls || (3 === Ls && (62914560 & xs) === xs && 300 > be() - Rs)
        ? !(2 & ks) && ic(e, 0)
        : (Os |= n),
      Fs === xs && (Fs = 0)),
    Uc(e);
}
function Tc(e, t) {
  0 === t && (t = Ve()), null !== (e = Yr(e, t)) && (He(e, t), Uc(e));
}
function Dc(e) {
  var t = e.memoizedState,
    n = 0;
  null !== t && (n = t.retryLane), Tc(e, n);
}
function Oc(e, t) {
  var n = 0;
  switch (e.tag) {
    case 13:
      var r = e.stateNode,
        a = e.memoizedState;
      null !== a && (n = a.retryLane);
      break;
    case 19:
      r = e.stateNode;
      break;
    case 22:
      r = e.stateNode._retryCache;
      break;
    default:
      throw Error(E(314));
  }
  null !== r && r.delete(t), Tc(e, n);
}
var Ac = null,
  Fc = null,
  jc = !1,
  Mc = !1,
  Ic = !1,
  Rc = 0;
function Uc(e) {
  e !== Fc &&
    null === e.next &&
    (null === Fc ? (Ac = Fc = e) : (Fc = Fc.next = e)),
    (Mc = !0),
    jc ||
      ((jc = !0),
      _d(function () {
        6 & ks ? he(we, $c) : Hc();
      }));
}
function Vc(e, t) {
  if (!Ic && Mc) {
    Ic = !0;
    do {
      for (var n = !1, r = Ac; null !== r; ) {
        if (0 !== e) {
          var a = r.pendingLanes;
          if (0 === a) var l = 0;
          else {
            var o = r.suspendedLanes,
              i = r.pingedLanes;
            (l = (1 << (31 - Te(42 | e) + 1)) - 1),
              (l =
                201326741 & (l &= a & ~(o & ~i))
                  ? (201326741 & l) | 1
                  : l
                  ? 2 | l
                  : 0);
          }
          0 !== l && ((n = !0), Qc(r, l));
        } else
          (l = xs),
            !(
              3 &
              (l = Me(
                r,
                r === ws ? l : 0,
                null !== r.cancelPendingCommit || -1 !== r.timeoutHandle
              ))
            ) ||
              Ie(r, l) ||
              ((n = !0), Qc(r, l));
        r = r.next;
      }
    } while (n);
    Ic = !1;
  }
}
function $c() {
  Hc();
}
function Hc() {
  Mc = jc = !1;
  var e = 0;
  0 !== Rc &&
    ((function () {
      var e = window.event;
      if (e && "popstate" === e.type) return e !== Cd && ((Cd = e), !0);
      return (Cd = null), !1;
    })() && (e = Rc),
    (Rc = 0));
  for (var t = be(), n = null, r = Ac; null !== r; ) {
    var a = r.next,
      l = qc(r, t);
    0 === l
      ? ((r.next = null),
        null === n ? (Ac = a) : (n.next = a),
        null === a && (Fc = n))
      : ((n = r), (0 !== e || 3 & l) && (Mc = !0)),
      (r = a);
  }
  Vc(e);
}
function qc(e, t) {
  for (
    var n = e.suspendedLanes,
      r = e.pingedLanes,
      a = e.expirationTimes,
      l = -62914561 & e.pendingLanes;
    0 < l;

  ) {
    var o = 31 - Te(l),
      i = 1 << o,
      u = a[o];
    -1 === u
      ? (i & n && !(i & r)) || (a[o] = Re(i, t))
      : u <= t && (e.expiredLanes |= i),
      (l &= ~i);
  }
  if (
    ((n = xs),
    (n = Me(
      e,
      e === (t = ws) ? n : 0,
      null !== e.cancelPendingCommit || -1 !== e.timeoutHandle
    )),
    (r = e.callbackNode),
    0 === n ||
      (e === t && (2 === Es || 9 === Es)) ||
      null !== e.cancelPendingCommit)
  )
    return (
      null !== r && null !== r && ge(r),
      (e.callbackNode = null),
      (e.callbackPriority = 0)
    );
  if (!(3 & n) || Ie(e, n)) {
    if ((t = n & -n) === e.callbackPriority) return t;
    switch ((null !== r && ge(r), We(n))) {
      case 2:
      case 8:
        n = Se;
        break;
      case 32:
      default:
        n = xe;
        break;
      case 268435456:
        n = Ce;
    }
    return (
      (r = Bc.bind(null, e)),
      (n = he(n, r)),
      (e.callbackPriority = t),
      (e.callbackNode = n),
      t
    );
  }
  return (
    null !== r && null !== r && ge(r),
    (e.callbackPriority = 2),
    (e.callbackNode = null),
    2
  );
}
function Bc(e, t) {
  if (0 !== Hs && 5 !== Hs)
    return (e.callbackNode = null), (e.callbackPriority = 0), null;
  var n = e.callbackNode;
  if (Cc() && e.callbackNode !== n) return null;
  var r = xs;
  return 0 ===
    (r = Me(
      e,
      e === ws ? r : 0,
      null !== e.cancelPendingCommit || -1 !== e.timeoutHandle
    ))
    ? null
    : (tc(e, r, t),
      qc(e, be()),
      null != e.callbackNode && e.callbackNode === n ? Bc.bind(null, e) : null);
}
function Qc(e, t) {
  if (Cc()) return null;
  tc(e, t, !0);
}
function Wc() {
  return 0 === Rc && (Rc = Ue()), Rc;
}
function Xc(e) {
  return null == e || "symbol" == typeof e || "boolean" == typeof e
    ? null
    : "function" == typeof e
    ? e
    : Wt("" + e);
}
function Yc(e, t) {
  var n = t.ownerDocument.createElement("input");
  return (
    (n.name = t.name),
    (n.value = t.value),
    e.id && n.setAttribute("form", e.id),
    t.parentNode.insertBefore(n, t),
    (e = new FormData(e)),
    n.parentNode.removeChild(n),
    e
  );
}
for (var Kc = 0; Kc < Rr.length; Kc++) {
  var Gc = Rr[Kc];
  Ur(Gc.toLowerCase(), "on" + (Gc[0].toUpperCase() + Gc.slice(1)));
}
Ur(Tr, "onAnimationEnd"),
  Ur(Dr, "onAnimationIteration"),
  Ur(Or, "onAnimationStart"),
  Ur("dblclick", "onDoubleClick"),
  Ur("focusin", "onFocus"),
  Ur("focusout", "onBlur"),
  Ur(Ar, "onTransitionRun"),
  Ur(Fr, "onTransitionStart"),
  Ur(jr, "onTransitionCancel"),
  Ur(Mr, "onTransitionEnd"),
  pt("onMouseEnter", ["mouseout", "mouseover"]),
  pt("onMouseLeave", ["mouseout", "mouseover"]),
  pt("onPointerEnter", ["pointerout", "pointerover"]),
  pt("onPointerLeave", ["pointerout", "pointerover"]),
  ft(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(
      " "
    )
  ),
  ft(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ),
  ft("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]),
  ft(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ),
  ft(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ),
  ft(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
var Jc =
    "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
      " "
    ),
  Zc = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle"
      .split(" ")
      .concat(Jc)
  );
function ed(e, t) {
  t = !!(4 & t);
  for (var n = 0; n < e.length; n++) {
    var r = e[n],
      a = r.event;
    r = r.listeners;
    e: {
      var l = void 0;
      if (t)
        for (var o = r.length - 1; 0 <= o; o--) {
          var i = r[o],
            u = i.instance,
            s = i.currentTarget;
          if (((i = i.listener), u !== l && a.isPropagationStopped())) break e;
          (l = i), (a.currentTarget = s);
          try {
            l(a);
          } catch (c) {
            Fi(c);
          }
          (a.currentTarget = null), (l = u);
        }
      else
        for (o = 0; o < r.length; o++) {
          if (
            ((u = (i = r[o]).instance),
            (s = i.currentTarget),
            (i = i.listener),
            u !== l && a.isPropagationStopped())
          )
            break e;
          (l = i), (a.currentTarget = s);
          try {
            l(a);
          } catch (c) {
            Fi(c);
          }
          (a.currentTarget = null), (l = u);
        }
    }
  }
}
function td(e, t) {
  var n = t[Ze];
  void 0 === n && (n = t[Ze] = new Set());
  var r = e + "__bubble";
  n.has(r) || (ld(t, e, 2, !1), n.add(r));
}
function nd(e, t, n) {
  var r = 0;
  t && (r |= 4), ld(n, e, r, t);
}
var rd = "_reactListening" + Math.random().toString(36).slice(2);
function ad(e) {
  if (!e[rd]) {
    (e[rd] = !0),
      ct.forEach(function (t) {
        "selectionchange" !== t && (Zc.has(t) || nd(t, !1, e), nd(t, !0, e));
      });
    var t = 9 === e.nodeType ? e : e.ownerDocument;
    null === t || t[rd] || ((t[rd] = !0), nd("selectionchange", !1, t));
  }
}
function ld(e, t, n, r) {
  switch (zf(t)) {
    case 2:
      var a = Sf;
      break;
    case 8:
      a = xf;
      break;
    default:
      a = Ef;
  }
  (n = a.bind(null, t, n, e)),
    (a = void 0),
    !rn ||
      ("touchstart" !== t && "touchmove" !== t && "wheel" !== t) ||
      (a = !0),
    r
      ? void 0 !== a
        ? e.addEventListener(t, n, { capture: !0, passive: a })
        : e.addEventListener(t, n, !0)
      : void 0 !== a
      ? e.addEventListener(t, n, { passive: a })
      : e.addEventListener(t, n, !1);
}
function od(e, t, n, r, a) {
  var l = r;
  if (!(1 & t || 2 & t || null === r))
    e: for (;;) {
      if (null === r) return;
      var o = r.tag;
      if (3 === o || 4 === o) {
        var i = r.stateNode.containerInfo;
        if (i === a) break;
        if (4 === o)
          for (o = r.return; null !== o; ) {
            var u = o.tag;
            if ((3 === u || 4 === u) && o.stateNode.containerInfo === a) return;
            o = o.return;
          }
        for (; null !== i; ) {
          if (null === (o = lt(i))) return;
          if (5 === (u = o.tag) || 6 === u || 26 === u || 27 === u) {
            r = l = o;
            continue e;
          }
          i = i.parentNode;
        }
      }
      r = r.return;
    }
  en(function () {
    var r = l,
      a = Yt(n),
      o = [];
    e: {
      var i = Ir.get(e);
      if (void 0 !== i) {
        var u = vn,
          s = e;
        switch (e) {
          case "keypress":
            if (0 === cn(n)) break e;
          case "keydown":
          case "keyup":
            u = On;
            break;
          case "focusin":
            (s = "focus"), (u = En);
            break;
          case "focusout":
            (s = "blur"), (u = En);
            break;
          case "beforeblur":
          case "afterblur":
            u = En;
            break;
          case "click":
            if (2 === n.button) break e;
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            u = Sn;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            u = xn;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            u = Fn;
            break;
          case Tr:
          case Dr:
          case Or:
            u = Cn;
            break;
          case Mr:
            u = jn;
            break;
          case "scroll":
          case "scrollend":
            u = kn;
            break;
          case "wheel":
            u = Mn;
            break;
          case "copy":
          case "cut":
          case "paste":
            u = Pn;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            u = An;
            break;
          case "toggle":
          case "beforetoggle":
            u = In;
        }
        var c = !!(4 & t),
          d = !c && ("scroll" === e || "scrollend" === e),
          f = c ? (null !== i ? i + "Capture" : null) : i;
        c = [];
        for (var p, m = r; null !== m; ) {
          var h = m;
          if (
            ((p = h.stateNode),
            (5 !== (h = h.tag) && 26 !== h && 27 !== h) ||
              null === p ||
              null === f ||
              (null != (h = tn(m, f)) && c.push(id(m, h, p))),
            d)
          )
            break;
          m = m.return;
        }
        0 < c.length &&
          ((i = new u(i, s, null, n, a)), o.push({ event: i, listeners: c }));
      }
    }
    if (!(7 & t)) {
      if (
        ((u = "mouseout" === e || "pointerout" === e),
        (!(i = "mouseover" === e || "pointerover" === e) ||
          n === Xt ||
          !(s = n.relatedTarget || n.fromElement) ||
          (!lt(s) && !s[Je])) &&
          (u || i) &&
          ((i =
            a.window === a
              ? a
              : (i = a.ownerDocument)
              ? i.defaultView || i.parentWindow
              : window),
          u
            ? ((u = r),
              null !==
                (s = (s = n.relatedTarget || n.toElement) ? lt(s) : null) &&
                ((d = P(s)),
                (c = s.tag),
                s !== d || (5 !== c && 27 !== c && 6 !== c)) &&
                (s = null))
            : ((u = null), (s = r)),
          u !== s))
      ) {
        if (
          ((c = Sn),
          (h = "onMouseLeave"),
          (f = "onMouseEnter"),
          (m = "mouse"),
          ("pointerout" !== e && "pointerover" !== e) ||
            ((c = An),
            (h = "onPointerLeave"),
            (f = "onPointerEnter"),
            (m = "pointer")),
          (d = null == u ? i : it(u)),
          (p = null == s ? i : it(s)),
          ((i = new c(h, m + "leave", u, n, a)).target = d),
          (i.relatedTarget = p),
          (h = null),
          lt(a) === r &&
            (((c = new c(f, m + "enter", s, n, a)).target = p),
            (c.relatedTarget = d),
            (h = c)),
          (d = h),
          u && s)
        )
          e: {
            for (f = s, m = 0, p = c = u; p; p = sd(p)) m++;
            for (p = 0, h = f; h; h = sd(h)) p++;
            for (; 0 < m - p; ) (c = sd(c)), m--;
            for (; 0 < p - m; ) (f = sd(f)), p--;
            for (; m--; ) {
              if (c === f || (null !== f && c === f.alternate)) break e;
              (c = sd(c)), (f = sd(f));
            }
            c = null;
          }
        else c = null;
        null !== u && cd(o, i, u, c, !1),
          null !== s && null !== d && cd(o, d, s, c, !0);
      }
      if (
        "select" ===
          (u = (i = r ? it(r) : window).nodeName && i.nodeName.toLowerCase()) ||
        ("input" === u && "file" === i.type)
      )
        var g = nr;
      else if (Kn(i))
        if (rr) g = fr;
        else {
          g = cr;
          var y = sr;
        }
      else
        !(u = i.nodeName) ||
        "input" !== u.toLowerCase() ||
        ("checkbox" !== i.type && "radio" !== i.type)
          ? r && qt(r.elementType) && (g = nr)
          : (g = dr);
      switch (
        (g && (g = g(e, r))
          ? Gn(o, g, n, a)
          : (y && y(e, i, r),
            "focusout" === e &&
              r &&
              "number" === i.type &&
              null != r.memoizedProps.value &&
              jt(i, "number", i.value)),
        (y = r ? it(r) : window),
        e)
      ) {
        case "focusin":
          (Kn(y) || "true" === y.contentEditable) &&
            ((wr = y), (Sr = r), (xr = null));
          break;
        case "focusout":
          xr = Sr = wr = null;
          break;
        case "mousedown":
          Er = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          (Er = !1), Cr(o, n, a);
          break;
        case "selectionchange":
          if (kr) break;
        case "keydown":
        case "keyup":
          Cr(o, n, a);
      }
      var v;
      if (Un)
        e: {
          switch (e) {
            case "compositionstart":
              var b = "onCompositionStart";
              break e;
            case "compositionend":
              b = "onCompositionEnd";
              break e;
            case "compositionupdate":
              b = "onCompositionUpdate";
              break e;
          }
          b = void 0;
        }
      else
        Xn
          ? Qn(e, n) && (b = "onCompositionEnd")
          : "keydown" === e && 229 === n.keyCode && (b = "onCompositionStart");
      b &&
        (Hn &&
          "ko" !== n.locale &&
          (Xn || "onCompositionStart" !== b
            ? "onCompositionEnd" === b && Xn && (v = sn())
            : ((on = "value" in (ln = a) ? ln.value : ln.textContent),
              (Xn = !0))),
        0 < (y = ud(r, b)).length &&
          ((b = new Nn(b, e, null, n, a)),
          o.push({ event: b, listeners: y }),
          v ? (b.data = v) : null !== (v = Wn(n)) && (b.data = v))),
        (v = $n
          ? (function (e, t) {
              switch (e) {
                case "compositionend":
                  return Wn(t);
                case "keypress":
                  return 32 !== t.which ? null : ((Bn = !0), qn);
                case "textInput":
                  return (e = t.data) === qn && Bn ? null : e;
                default:
                  return null;
              }
            })(e, n)
          : (function (e, t) {
              if (Xn)
                return "compositionend" === e || (!Un && Qn(e, t))
                  ? ((e = sn()), (un = on = ln = null), (Xn = !1), e)
                  : null;
              switch (e) {
                case "paste":
                default:
                  return null;
                case "keypress":
                  if (
                    !(t.ctrlKey || t.altKey || t.metaKey) ||
                    (t.ctrlKey && t.altKey)
                  ) {
                    if (t.char && 1 < t.char.length) return t.char;
                    if (t.which) return String.fromCharCode(t.which);
                  }
                  return null;
                case "compositionend":
                  return Hn && "ko" !== t.locale ? null : t.data;
              }
            })(e, n)) &&
          0 < (b = ud(r, "onBeforeInput")).length &&
          ((y = new Nn("onBeforeInput", "beforeinput", null, n, a)),
          o.push({ event: y, listeners: b }),
          (y.data = v)),
        (function (e, t, n, r, a) {
          if ("submit" === t && n && n.stateNode === a) {
            var l = Xc((a[Ge] || null).action),
              o = r.submitter;
            o &&
              null !==
                (t = (t = o[Ge] || null)
                  ? Xc(t.formAction)
                  : o.getAttribute("formAction")) &&
              ((l = t), (o = null));
            var i = new vn("action", "action", null, r, a);
            e.push({
              event: i,
              listeners: [
                {
                  instance: null,
                  listener: function () {
                    if (r.defaultPrevented) {
                      if (0 !== Rc) {
                        var e = o ? Yc(a, o) : new FormData(a);
                        Yo(
                          n,
                          { pending: !0, data: e, method: a.method, action: l },
                          null,
                          e
                        );
                      }
                    } else
                      "function" == typeof l &&
                        (i.preventDefault(),
                        (e = o ? Yc(a, o) : new FormData(a)),
                        Yo(
                          n,
                          { pending: !0, data: e, method: a.method, action: l },
                          l,
                          e
                        ));
                  },
                  currentTarget: a,
                },
              ],
            });
          }
        })(o, e, r, n, a);
    }
    ed(o, t);
  });
}
function id(e, t, n) {
  return { instance: e, listener: t, currentTarget: n };
}
function ud(e, t) {
  for (var n = t + "Capture", r = []; null !== e; ) {
    var a = e,
      l = a.stateNode;
    if (
      ((5 !== (a = a.tag) && 26 !== a && 27 !== a) ||
        null === l ||
        (null != (a = tn(e, n)) && r.unshift(id(e, a, l)),
        null != (a = tn(e, t)) && r.push(id(e, a, l))),
      3 === e.tag)
    )
      return r;
    e = e.return;
  }
  return [];
}
function sd(e) {
  if (null === e) return null;
  do {
    e = e.return;
  } while (e && 5 !== e.tag && 27 !== e.tag);
  return e || null;
}
function cd(e, t, n, r, a) {
  for (var l = t._reactName, o = []; null !== n && n !== r; ) {
    var i = n,
      u = i.alternate,
      s = i.stateNode;
    if (((i = i.tag), null !== u && u === r)) break;
    (5 !== i && 26 !== i && 27 !== i) ||
      null === s ||
      ((u = s),
      a
        ? null != (s = tn(n, l)) && o.unshift(id(n, s, u))
        : a || (null != (s = tn(n, l)) && o.push(id(n, s, u)))),
      (n = n.return);
  }
  0 !== o.length && e.push({ event: t, listeners: o });
}
var dd = /\r\n?/g,
  fd = /\u0000|\uFFFD/g;
function pd(e) {
  return ("string" == typeof e ? e : "" + e).replace(dd, "\n").replace(fd, "");
}
function md(e, t) {
  return (t = pd(t)), pd(e) === t;
}
function hd() {}
function gd(e, t, n, r, a, l) {
  switch (n) {
    case "children":
      "string" == typeof r
        ? "body" === t || ("textarea" === t && "" === r) || Ut(e, r)
        : ("number" == typeof r || "bigint" == typeof r) &&
          "body" !== t &&
          Ut(e, "" + r);
      break;
    case "className":
      kt(e, "class", r);
      break;
    case "tabIndex":
      kt(e, "tabindex", r);
      break;
    case "dir":
    case "role":
    case "viewBox":
    case "width":
    case "height":
      kt(e, n, r);
      break;
    case "style":
      Ht(e, r, l);
      break;
    case "data":
      if ("object" !== t) {
        kt(e, "data", r);
        break;
      }
    case "src":
    case "href":
      if ("" === r && ("a" !== t || "href" !== n)) {
        e.removeAttribute(n);
        break;
      }
      if (
        null == r ||
        "function" == typeof r ||
        "symbol" == typeof r ||
        "boolean" == typeof r
      ) {
        e.removeAttribute(n);
        break;
      }
      (r = Wt("" + r)), e.setAttribute(n, r);
      break;
    case "action":
    case "formAction":
      if ("function" == typeof r) {
        e.setAttribute(
          n,
          "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
        );
        break;
      }
      if (
        ("function" == typeof l &&
          ("formAction" === n
            ? ("input" !== t && gd(e, t, "name", a.name, a, null),
              gd(e, t, "formEncType", a.formEncType, a, null),
              gd(e, t, "formMethod", a.formMethod, a, null),
              gd(e, t, "formTarget", a.formTarget, a, null))
            : (gd(e, t, "encType", a.encType, a, null),
              gd(e, t, "method", a.method, a, null),
              gd(e, t, "target", a.target, a, null))),
        null == r || "symbol" == typeof r || "boolean" == typeof r)
      ) {
        e.removeAttribute(n);
        break;
      }
      (r = Wt("" + r)), e.setAttribute(n, r);
      break;
    case "onClick":
      null != r && (e.onclick = hd);
      break;
    case "onScroll":
      null != r && td("scroll", e);
      break;
    case "onScrollEnd":
      null != r && td("scrollend", e);
      break;
    case "dangerouslySetInnerHTML":
      if (null != r) {
        if ("object" != typeof r || !("__html" in r)) throw Error(E(61));
        if (null != (n = r.__html)) {
          if (null != a.children) throw Error(E(60));
          e.innerHTML = n;
        }
      }
      break;
    case "multiple":
      e.multiple = r && "function" != typeof r && "symbol" != typeof r;
      break;
    case "muted":
      e.muted = r && "function" != typeof r && "symbol" != typeof r;
      break;
    case "suppressContentEditableWarning":
    case "suppressHydrationWarning":
    case "defaultValue":
    case "defaultChecked":
    case "innerHTML":
    case "ref":
    case "autoFocus":
      break;
    case "xlinkHref":
      if (
        null == r ||
        "function" == typeof r ||
        "boolean" == typeof r ||
        "symbol" == typeof r
      ) {
        e.removeAttribute("xlink:href");
        break;
      }
      (n = Wt("" + r)),
        e.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", n);
      break;
    case "contentEditable":
    case "spellCheck":
    case "draggable":
    case "value":
    case "autoReverse":
    case "externalResourcesRequired":
    case "focusable":
    case "preserveAlpha":
      null != r && "function" != typeof r && "symbol" != typeof r
        ? e.setAttribute(n, "" + r)
        : e.removeAttribute(n);
      break;
    case "inert":
    case "allowFullScreen":
    case "async":
    case "autoPlay":
    case "controls":
    case "default":
    case "defer":
    case "disabled":
    case "disablePictureInPicture":
    case "disableRemotePlayback":
    case "formNoValidate":
    case "hidden":
    case "loop":
    case "noModule":
    case "noValidate":
    case "open":
    case "playsInline":
    case "readOnly":
    case "required":
    case "reversed":
    case "scoped":
    case "seamless":
    case "itemScope":
      r && "function" != typeof r && "symbol" != typeof r
        ? e.setAttribute(n, "")
        : e.removeAttribute(n);
      break;
    case "capture":
    case "download":
      !0 === r
        ? e.setAttribute(n, "")
        : !1 !== r &&
          null != r &&
          "function" != typeof r &&
          "symbol" != typeof r
        ? e.setAttribute(n, r)
        : e.removeAttribute(n);
      break;
    case "cols":
    case "rows":
    case "size":
    case "span":
      null != r &&
      "function" != typeof r &&
      "symbol" != typeof r &&
      !isNaN(r) &&
      1 <= r
        ? e.setAttribute(n, r)
        : e.removeAttribute(n);
      break;
    case "rowSpan":
    case "start":
      null == r || "function" == typeof r || "symbol" == typeof r || isNaN(r)
        ? e.removeAttribute(n)
        : e.setAttribute(n, r);
      break;
    case "popover":
      td("beforetoggle", e), td("toggle", e), bt(e, "popover", r);
      break;
    case "xlinkActuate":
      wt(e, "http://www.w3.org/1999/xlink", "xlink:actuate", r);
      break;
    case "xlinkArcrole":
      wt(e, "http://www.w3.org/1999/xlink", "xlink:arcrole", r);
      break;
    case "xlinkRole":
      wt(e, "http://www.w3.org/1999/xlink", "xlink:role", r);
      break;
    case "xlinkShow":
      wt(e, "http://www.w3.org/1999/xlink", "xlink:show", r);
      break;
    case "xlinkTitle":
      wt(e, "http://www.w3.org/1999/xlink", "xlink:title", r);
      break;
    case "xlinkType":
      wt(e, "http://www.w3.org/1999/xlink", "xlink:type", r);
      break;
    case "xmlBase":
      wt(e, "http://www.w3.org/XML/1998/namespace", "xml:base", r);
      break;
    case "xmlLang":
      wt(e, "http://www.w3.org/XML/1998/namespace", "xml:lang", r);
      break;
    case "xmlSpace":
      wt(e, "http://www.w3.org/XML/1998/namespace", "xml:space", r);
      break;
    case "is":
      bt(e, "is", r);
      break;
    case "innerText":
    case "textContent":
      break;
    default:
      (!(2 < n.length) ||
        ("o" !== n[0] && "O" !== n[0]) ||
        ("n" !== n[1] && "N" !== n[1])) &&
        bt(e, (n = Bt.get(n) || n), r);
  }
}
function yd(e, t, n, r, a, l) {
  switch (n) {
    case "style":
      Ht(e, r, l);
      break;
    case "dangerouslySetInnerHTML":
      if (null != r) {
        if ("object" != typeof r || !("__html" in r)) throw Error(E(61));
        if (null != (n = r.__html)) {
          if (null != a.children) throw Error(E(60));
          e.innerHTML = n;
        }
      }
      break;
    case "children":
      "string" == typeof r
        ? Ut(e, r)
        : ("number" == typeof r || "bigint" == typeof r) && Ut(e, "" + r);
      break;
    case "onScroll":
      null != r && td("scroll", e);
      break;
    case "onScrollEnd":
      null != r && td("scrollend", e);
      break;
    case "onClick":
      null != r && (e.onclick = hd);
      break;
    case "suppressContentEditableWarning":
    case "suppressHydrationWarning":
    case "innerHTML":
    case "ref":
    case "innerText":
    case "textContent":
      break;
    default:
      dt.hasOwnProperty(n) ||
        ("o" !== n[0] ||
        "n" !== n[1] ||
        ((a = n.endsWith("Capture")),
        (t = n.slice(2, a ? n.length - 7 : void 0)),
        "function" == typeof (l = null != (l = e[Ge] || null) ? l[n] : null) &&
          e.removeEventListener(t, l, a),
        "function" != typeof r)
          ? n in e
            ? (e[n] = r)
            : !0 === r
            ? e.setAttribute(n, "")
            : bt(e, n, r)
          : ("function" != typeof l &&
              null !== l &&
              (n in e
                ? (e[n] = null)
                : e.hasAttribute(n) && e.removeAttribute(n)),
            e.addEventListener(t, r, a)));
  }
}
function vd(e, t, n) {
  switch (t) {
    case "div":
    case "span":
    case "svg":
    case "path":
    case "a":
    case "g":
    case "p":
    case "li":
      break;
    case "img":
      td("error", e), td("load", e);
      var r,
        a = !1,
        l = !1;
      for (r in n)
        if (n.hasOwnProperty(r)) {
          var o = n[r];
          if (null != o)
            switch (r) {
              case "src":
                a = !0;
                break;
              case "srcSet":
                l = !0;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(E(137, t));
              default:
                gd(e, t, r, o, n, null);
            }
        }
      return (
        l && gd(e, t, "srcSet", n.srcSet, n, null),
        void (a && gd(e, t, "src", n.src, n, null))
      );
    case "input":
      td("invalid", e);
      var i = (r = o = l = null),
        u = null,
        s = null;
      for (a in n)
        if (n.hasOwnProperty(a)) {
          var c = n[a];
          if (null != c)
            switch (a) {
              case "name":
                l = c;
                break;
              case "type":
                o = c;
                break;
              case "checked":
                u = c;
                break;
              case "defaultChecked":
                s = c;
                break;
              case "value":
                r = c;
                break;
              case "defaultValue":
                i = c;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (null != c) throw Error(E(137, t));
                break;
              default:
                gd(e, t, a, c, n, null);
            }
        }
      return Ft(e, r, i, u, s, o, l, !1), void _t(e);
    case "select":
      for (l in (td("invalid", e), (a = o = r = null), n))
        if (n.hasOwnProperty(l) && null != (i = n[l]))
          switch (l) {
            case "value":
              r = i;
              break;
            case "defaultValue":
              o = i;
              break;
            case "multiple":
              a = i;
            default:
              gd(e, t, l, i, n, null);
          }
      return (
        (t = r),
        (n = o),
        (e.multiple = !!a),
        void (null != t ? Mt(e, !!a, t, !1) : null != n && Mt(e, !!a, n, !0))
      );
    case "textarea":
      for (o in (td("invalid", e), (r = l = a = null), n))
        if (n.hasOwnProperty(o) && null != (i = n[o]))
          switch (o) {
            case "value":
              a = i;
              break;
            case "defaultValue":
              l = i;
              break;
            case "children":
              r = i;
              break;
            case "dangerouslySetInnerHTML":
              if (null != i) throw Error(E(91));
              break;
            default:
              gd(e, t, o, i, n, null);
          }
      return Rt(e, a, l, r), void _t(e);
    case "option":
      for (u in n)
        if (n.hasOwnProperty(u) && null != (a = n[u]))
          if ("selected" === u)
            e.selected = a && "function" != typeof a && "symbol" != typeof a;
          else gd(e, t, u, a, n, null);
      return;
    case "dialog":
      td("beforetoggle", e), td("toggle", e), td("cancel", e), td("close", e);
      break;
    case "iframe":
    case "object":
      td("load", e);
      break;
    case "video":
    case "audio":
      for (a = 0; a < Jc.length; a++) td(Jc[a], e);
      break;
    case "image":
      td("error", e), td("load", e);
      break;
    case "details":
      td("toggle", e);
      break;
    case "embed":
    case "source":
    case "link":
      td("error", e), td("load", e);
    case "area":
    case "base":
    case "br":
    case "col":
    case "hr":
    case "keygen":
    case "meta":
    case "param":
    case "track":
    case "wbr":
    case "menuitem":
      for (s in n)
        if (n.hasOwnProperty(s) && null != (a = n[s]))
          switch (s) {
            case "children":
            case "dangerouslySetInnerHTML":
              throw Error(E(137, t));
            default:
              gd(e, t, s, a, n, null);
          }
      return;
    default:
      if (qt(t)) {
        for (c in n)
          n.hasOwnProperty(c) &&
            void 0 !== (a = n[c]) &&
            yd(e, t, c, a, n, void 0);
        return;
      }
  }
  for (i in n)
    n.hasOwnProperty(i) && null != (a = n[i]) && gd(e, t, i, a, n, null);
}
var bd = null,
  kd = null;
function wd(e) {
  return 9 === e.nodeType ? e : e.ownerDocument;
}
function Sd(e) {
  switch (e) {
    case "http://www.w3.org/2000/svg":
      return 1;
    case "http://www.w3.org/1998/Math/MathML":
      return 2;
    default:
      return 0;
  }
}
function xd(e, t) {
  if (0 === e)
    switch (t) {
      case "svg":
        return 1;
      case "math":
        return 2;
      default:
        return 0;
    }
  return 1 === e && "foreignObject" === t ? 0 : e;
}
function Ed(e, t) {
  return (
    "textarea" === e ||
    "noscript" === e ||
    "string" == typeof t.children ||
    "number" == typeof t.children ||
    "bigint" == typeof t.children ||
    ("object" == typeof t.dangerouslySetInnerHTML &&
      null !== t.dangerouslySetInnerHTML &&
      null != t.dangerouslySetInnerHTML.__html)
  );
}
var Cd = null;
var Pd = "function" == typeof setTimeout ? setTimeout : void 0,
  Nd = "function" == typeof clearTimeout ? clearTimeout : void 0,
  zd = "function" == typeof Promise ? Promise : void 0,
  _d =
    "function" == typeof queueMicrotask
      ? queueMicrotask
      : void 0 !== zd
      ? function (e) {
          return zd.resolve(null).then(e).catch(Ld);
        }
      : Pd;
function Ld(e) {
  setTimeout(function () {
    throw e;
  });
}
function Td(e) {
  return "head" === e;
}
function Dd(e, t) {
  var n = t,
    r = 0,
    a = 0;
  do {
    var l = n.nextSibling;
    if ((e.removeChild(n), l && 8 === l.nodeType))
      if ("/$" === (n = l.data)) {
        if (0 < r && 8 > r) {
          n = r;
          var o = e.ownerDocument;
          if ((1 & n && Rd(o.documentElement), 2 & n && Rd(o.body), 4 & n))
            for (Rd((n = o.head)), o = n.firstChild; o; ) {
              var i = o.nextSibling,
                u = o.nodeName;
              o[rt] ||
                "SCRIPT" === u ||
                "STYLE" === u ||
                ("LINK" === u && "stylesheet" === o.rel.toLowerCase()) ||
                n.removeChild(o),
                (o = i);
            }
        }
        if (0 === a) return e.removeChild(l), void Qf(t);
        a--;
      } else
        "$" === n || "$?" === n || "$!" === n
          ? a++
          : (r = n.charCodeAt(0) - 48);
    else r = 0;
    n = l;
  } while (n);
  Qf(t);
}
function Od(e) {
  var t = e.firstChild;
  for (t && 10 === t.nodeType && (t = t.nextSibling); t; ) {
    var n = t;
    switch (((t = t.nextSibling), n.nodeName)) {
      case "HTML":
      case "HEAD":
      case "BODY":
        Od(n), at(n);
        continue;
      case "SCRIPT":
      case "STYLE":
        continue;
      case "LINK":
        if ("stylesheet" === n.rel.toLowerCase()) continue;
    }
    e.removeChild(n);
  }
}
function Ad(e) {
  return (
    "$!" === e.data ||
    ("$?" === e.data && "complete" === e.ownerDocument.readyState)
  );
}
function Fd(e) {
  for (; null != e; e = e.nextSibling) {
    var t = e.nodeType;
    if (1 === t || 3 === t) break;
    if (8 === t) {
      if (
        "$" === (t = e.data) ||
        "$!" === t ||
        "$?" === t ||
        "F!" === t ||
        "F" === t
      )
        break;
      if ("/$" === t) return null;
    }
  }
  return e;
}
var jd = null;
function Md(e) {
  e = e.previousSibling;
  for (var t = 0; e; ) {
    if (8 === e.nodeType) {
      var n = e.data;
      if ("$" === n || "$!" === n || "$?" === n) {
        if (0 === t) return e;
        t--;
      } else "/$" === n && t++;
    }
    e = e.previousSibling;
  }
  return null;
}
function Id(e, t, n) {
  switch (((t = wd(n)), e)) {
    case "html":
      if (!(e = t.documentElement)) throw Error(E(452));
      return e;
    case "head":
      if (!(e = t.head)) throw Error(E(453));
      return e;
    case "body":
      if (!(e = t.body)) throw Error(E(454));
      return e;
    default:
      throw Error(E(451));
  }
}
function Rd(e) {
  for (var t = e.attributes; t.length; ) e.removeAttributeNode(t[0]);
  at(e);
}
var Ud = new Map(),
  Vd = new Set();
function $d(e) {
  return "function" == typeof e.getRootNode
    ? e.getRootNode()
    : 9 === e.nodeType
    ? e
    : e.ownerDocument;
}
var Hd = Z.d;
Z.d = {
  f: function () {
    var e = Hd.f(),
      t = lc();
    return e || t;
  },
  r: function (e) {
    var t = ot(e);
    null !== t && 5 === t.tag && "form" === t.type ? Go(t) : Hd.r(e);
  },
  D: function (e) {
    Hd.D(e), Bd("dns-prefetch", e, null);
  },
  C: function (e, t) {
    Hd.C(e, t), Bd("preconnect", e, t);
  },
  L: function (e, t, n) {
    Hd.L(e, t, n);
    var r = qd;
    if (r && e && t) {
      var a = 'link[rel="preload"][as="' + Ot(t) + '"]';
      "image" === t && n && n.imageSrcSet
        ? ((a += '[imagesrcset="' + Ot(n.imageSrcSet) + '"]'),
          "string" == typeof n.imageSizes &&
            (a += '[imagesizes="' + Ot(n.imageSizes) + '"]'))
        : (a += '[href="' + Ot(e) + '"]');
      var l = a;
      switch (t) {
        case "style":
          l = Wd(e);
          break;
        case "script":
          l = Kd(e);
      }
      Ud.has(l) ||
        ((e = L(
          {
            rel: "preload",
            href: "image" === t && n && n.imageSrcSet ? void 0 : e,
            as: t,
          },
          n
        )),
        Ud.set(l, e),
        null !== r.querySelector(a) ||
          ("style" === t && r.querySelector(Xd(l))) ||
          ("script" === t && r.querySelector(Gd(l))) ||
          (vd((t = r.createElement("link")), "link", e),
          st(t),
          r.head.appendChild(t)));
    }
  },
  m: function (e, t) {
    Hd.m(e, t);
    var n = qd;
    if (n && e) {
      var r = t && "string" == typeof t.as ? t.as : "script",
        a =
          'link[rel="modulepreload"][as="' + Ot(r) + '"][href="' + Ot(e) + '"]',
        l = a;
      switch (r) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          l = Kd(e);
      }
      if (
        !Ud.has(l) &&
        ((e = L({ rel: "modulepreload", href: e }, t)),
        Ud.set(l, e),
        null === n.querySelector(a))
      ) {
        switch (r) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (n.querySelector(Gd(l))) return;
        }
        vd((r = n.createElement("link")), "link", e),
          st(r),
          n.head.appendChild(r);
      }
    }
  },
  X: function (e, t) {
    Hd.X(e, t);
    var n = qd;
    if (n && e) {
      var r = ut(n).hoistableScripts,
        a = Kd(e),
        l = r.get(a);
      l ||
        ((l = n.querySelector(Gd(a))) ||
          ((e = L({ src: e, async: !0 }, t)),
          (t = Ud.get(a)) && tf(e, t),
          st((l = n.createElement("script"))),
          vd(l, "link", e),
          n.head.appendChild(l)),
        (l = { type: "script", instance: l, count: 1, state: null }),
        r.set(a, l));
    }
  },
  S: function (e, t, n) {
    Hd.S(e, t, n);
    var r = qd;
    if (r && e) {
      var a = ut(r).hoistableStyles,
        l = Wd(e);
      t = t || "default";
      var o = a.get(l);
      if (!o) {
        var i = { loading: 0, preload: null };
        if ((o = r.querySelector(Xd(l)))) i.loading = 5;
        else {
          (e = L({ rel: "stylesheet", href: e, "data-precedence": t }, n)),
            (n = Ud.get(l)) && ef(e, n);
          var u = (o = r.createElement("link"));
          st(u),
            vd(u, "link", e),
            (u._p = new Promise(function (e, t) {
              (u.onload = e), (u.onerror = t);
            })),
            u.addEventListener("load", function () {
              i.loading |= 1;
            }),
            u.addEventListener("error", function () {
              i.loading |= 2;
            }),
            (i.loading |= 4),
            Zd(o, t, r);
        }
        (o = { type: "stylesheet", instance: o, count: 1, state: i }),
          a.set(l, o);
      }
    }
  },
  M: function (e, t) {
    Hd.M(e, t);
    var n = qd;
    if (n && e) {
      var r = ut(n).hoistableScripts,
        a = Kd(e),
        l = r.get(a);
      l ||
        ((l = n.querySelector(Gd(a))) ||
          ((e = L({ src: e, async: !0, type: "module" }, t)),
          (t = Ud.get(a)) && tf(e, t),
          st((l = n.createElement("script"))),
          vd(l, "link", e),
          n.head.appendChild(l)),
        (l = { type: "script", instance: l, count: 1, state: null }),
        r.set(a, l));
    }
  },
};
var qd = "undefined" == typeof document ? null : document;
function Bd(e, t, n) {
  var r = qd;
  if (r && "string" == typeof t && t) {
    var a = Ot(t);
    (a = 'link[rel="' + e + '"][href="' + a + '"]'),
      "string" == typeof n && (a += '[crossorigin="' + n + '"]'),
      Vd.has(a) ||
        (Vd.add(a),
        (e = { rel: e, crossOrigin: n, href: t }),
        null === r.querySelector(a) &&
          (vd((t = r.createElement("link")), "link", e),
          st(t),
          r.head.appendChild(t)));
  }
}
function Qd(e, t, n, r) {
  var a,
    l,
    o,
    i,
    u = (u = ue.current) ? $d(u) : null;
  if (!u) throw Error(E(446));
  switch (e) {
    case "meta":
    case "title":
      return null;
    case "style":
      return "string" == typeof n.precedence && "string" == typeof n.href
        ? ((t = Wd(n.href)),
          (r = (n = ut(u).hoistableStyles).get(t)) ||
            ((r = { type: "style", instance: null, count: 0, state: null }),
            n.set(t, r)),
          r)
        : { type: "void", instance: null, count: 0, state: null };
    case "link":
      if (
        "stylesheet" === n.rel &&
        "string" == typeof n.href &&
        "string" == typeof n.precedence
      ) {
        e = Wd(n.href);
        var s = ut(u).hoistableStyles,
          c = s.get(e);
        if (
          (c ||
            ((u = u.ownerDocument || u),
            (c = {
              type: "stylesheet",
              instance: null,
              count: 0,
              state: { loading: 0, preload: null },
            }),
            s.set(e, c),
            (s = u.querySelector(Xd(e))) &&
              !s._p &&
              ((c.instance = s), (c.state.loading = 5)),
            Ud.has(e) ||
              ((n = {
                rel: "preload",
                as: "style",
                href: n.href,
                crossOrigin: n.crossOrigin,
                integrity: n.integrity,
                media: n.media,
                hrefLang: n.hrefLang,
                referrerPolicy: n.referrerPolicy,
              }),
              Ud.set(e, n),
              s ||
                ((a = u),
                (l = e),
                (o = n),
                (i = c.state),
                a.querySelector('link[rel="preload"][as="style"][' + l + "]")
                  ? (i.loading = 1)
                  : ((l = a.createElement("link")),
                    (i.preload = l),
                    l.addEventListener("load", function () {
                      return (i.loading |= 1);
                    }),
                    l.addEventListener("error", function () {
                      return (i.loading |= 2);
                    }),
                    vd(l, "link", o),
                    st(l),
                    a.head.appendChild(l))))),
          t && null === r)
        )
          throw Error(E(528, ""));
        return c;
      }
      if (t && null !== r) throw Error(E(529, ""));
      return null;
    case "script":
      return (
        (t = n.async),
        "string" == typeof (n = n.src) &&
        t &&
        "function" != typeof t &&
        "symbol" != typeof t
          ? ((t = Kd(n)),
            (r = (n = ut(u).hoistableScripts).get(t)) ||
              ((r = { type: "script", instance: null, count: 0, state: null }),
              n.set(t, r)),
            r)
          : { type: "void", instance: null, count: 0, state: null }
      );
    default:
      throw Error(E(444, e));
  }
}
function Wd(e) {
  return 'href="' + Ot(e) + '"';
}
function Xd(e) {
  return 'link[rel="stylesheet"][' + e + "]";
}
function Yd(e) {
  return L({}, e, { "data-precedence": e.precedence, precedence: null });
}
function Kd(e) {
  return '[src="' + Ot(e) + '"]';
}
function Gd(e) {
  return "script[async]" + e;
}
function Jd(e, t, n) {
  if ((t.count++, null === t.instance))
    switch (t.type) {
      case "style":
        var r = e.querySelector('style[data-href~="' + Ot(n.href) + '"]');
        if (r) return (t.instance = r), st(r), r;
        var a = L({}, n, {
          "data-href": n.href,
          "data-precedence": n.precedence,
          href: null,
          precedence: null,
        });
        return (
          st((r = (e.ownerDocument || e).createElement("style"))),
          vd(r, "style", a),
          Zd(r, n.precedence, e),
          (t.instance = r)
        );
      case "stylesheet":
        a = Wd(n.href);
        var l = e.querySelector(Xd(a));
        if (l) return (t.state.loading |= 4), (t.instance = l), st(l), l;
        (r = Yd(n)),
          (a = Ud.get(a)) && ef(r, a),
          st((l = (e.ownerDocument || e).createElement("link")));
        var o = l;
        return (
          (o._p = new Promise(function (e, t) {
            (o.onload = e), (o.onerror = t);
          })),
          vd(l, "link", r),
          (t.state.loading |= 4),
          Zd(l, n.precedence, e),
          (t.instance = l)
        );
      case "script":
        return (
          (l = Kd(n.src)),
          (a = e.querySelector(Gd(l)))
            ? ((t.instance = a), st(a), a)
            : ((r = n),
              (a = Ud.get(l)) && tf((r = L({}, n)), a),
              st((a = (e = e.ownerDocument || e).createElement("script"))),
              vd(a, "link", r),
              e.head.appendChild(a),
              (t.instance = a))
        );
      case "void":
        return null;
      default:
        throw Error(E(443, t.type));
    }
  else
    "stylesheet" === t.type &&
      !(4 & t.state.loading) &&
      ((r = t.instance), (t.state.loading |= 4), Zd(r, n.precedence, e));
  return t.instance;
}
function Zd(e, t, n) {
  for (
    var r = n.querySelectorAll(
        'link[rel="stylesheet"][data-precedence],style[data-precedence]'
      ),
      a = r.length ? r[r.length - 1] : null,
      l = a,
      o = 0;
    o < r.length;
    o++
  ) {
    var i = r[o];
    if (i.dataset.precedence === t) l = i;
    else if (l !== a) break;
  }
  l
    ? l.parentNode.insertBefore(e, l.nextSibling)
    : (t = 9 === n.nodeType ? n.head : n).insertBefore(e, t.firstChild);
}
function ef(e, t) {
  null == e.crossOrigin && (e.crossOrigin = t.crossOrigin),
    null == e.referrerPolicy && (e.referrerPolicy = t.referrerPolicy),
    null == e.title && (e.title = t.title);
}
function tf(e, t) {
  null == e.crossOrigin && (e.crossOrigin = t.crossOrigin),
    null == e.referrerPolicy && (e.referrerPolicy = t.referrerPolicy),
    null == e.integrity && (e.integrity = t.integrity);
}
var nf = null;
function rf(e, t, n) {
  if (null === nf) {
    var r = new Map(),
      a = (nf = new Map());
    a.set(n, r);
  } else (r = (a = nf).get(n)) || ((r = new Map()), a.set(n, r));
  if (r.has(e)) return r;
  for (
    r.set(e, null), n = n.getElementsByTagName(e), a = 0;
    a < n.length;
    a++
  ) {
    var l = n[a];
    if (
      !(
        l[rt] ||
        l[Ke] ||
        ("link" === e && "stylesheet" === l.getAttribute("rel"))
      ) &&
      "http://www.w3.org/2000/svg" !== l.namespaceURI
    ) {
      var o = l.getAttribute(t) || "";
      o = e + o;
      var i = r.get(o);
      i ? i.push(l) : r.set(o, [l]);
    }
  }
  return r;
}
function af(e, t, n) {
  (e = e.ownerDocument || e).head.insertBefore(
    n,
    "title" === t ? e.querySelector("head > title") : null
  );
}
function lf(e) {
  return !!("stylesheet" !== e.type || 3 & e.state.loading);
}
var of = null;
function uf() {}
function sf() {
  if ((this.count--, 0 === this.count))
    if (this.stylesheets) df(this, this.stylesheets);
    else if (this.unsuspend) {
      var e = this.unsuspend;
      (this.unsuspend = null), e();
    }
}
var cf = null;
function df(e, t) {
  (e.stylesheets = null),
    null !== e.unsuspend &&
      (e.count++, (cf = new Map()), t.forEach(ff, e), (cf = null), sf.call(e));
}
function ff(e, t) {
  if (!(4 & t.state.loading)) {
    var n = cf.get(e);
    if (n) var r = n.get(null);
    else {
      (n = new Map()), cf.set(e, n);
      for (
        var a = e.querySelectorAll(
            "link[data-precedence],style[data-precedence]"
          ),
          l = 0;
        l < a.length;
        l++
      ) {
        var o = a[l];
        ("LINK" !== o.nodeName && "not all" === o.getAttribute("media")) ||
          (n.set(o.dataset.precedence, o), (r = o));
      }
      r && n.set(null, r);
    }
    (o = (a = t.instance).getAttribute("data-precedence")),
      (l = n.get(o) || r) === r && n.set(null, a),
      n.set(o, a),
      this.count++,
      (r = sf.bind(this)),
      a.addEventListener("load", r),
      a.addEventListener("error", r),
      l
        ? l.parentNode.insertBefore(a, l.nextSibling)
        : (e = 9 === e.nodeType ? e.head : e).insertBefore(a, e.firstChild),
      (t.state.loading |= 4);
  }
}
var pf = {
  $$typeof: R,
  Provider: null,
  Consumer: null,
  _currentValue: ee,
  _currentValue2: ee,
  _threadCount: 0,
};
function mf(e, t, n, r, a, l, o, i) {
  (this.tag = 1),
    (this.containerInfo = e),
    (this.pingCache = this.current = this.pendingChildren = null),
    (this.timeoutHandle = -1),
    (this.callbackNode =
      this.next =
      this.pendingContext =
      this.context =
      this.cancelPendingCommit =
        null),
    (this.callbackPriority = 0),
    (this.expirationTimes = $e(-1)),
    (this.entangledLanes =
      this.shellSuspendCounter =
      this.errorRecoveryDisabledLanes =
      this.expiredLanes =
      this.warmLanes =
      this.pingedLanes =
      this.suspendedLanes =
      this.pendingLanes =
        0),
    (this.entanglements = $e(0)),
    (this.hiddenUpdates = $e(null)),
    (this.identifierPrefix = r),
    (this.onUncaughtError = a),
    (this.onCaughtError = l),
    (this.onRecoverableError = o),
    (this.pooledCache = null),
    (this.pooledCacheLanes = 0),
    (this.formState = i),
    (this.incompleteTransitions = new Map());
}
function hf(e, t, n, r, a, l, o, i, u, s, c, d) {
  return (
    (e = new mf(e, t, n, o, i, u, s, d)),
    (t = 1),
    !0 === l && (t |= 24),
    (l = ea(3, null, null, t)),
    (e.current = l),
    (l.stateNode = e),
    (t = Ga()).refCount++,
    (e.pooledCache = t),
    t.refCount++,
    (l.memoizedState = { element: r, isDehydrated: n, cache: t }),
    kl(l),
    e
  );
}
function gf(e) {
  return e ? (e = Jr) : Jr;
}
function yf(e, t, n, r, a, l) {
  (a = gf(a)),
    null === r.context ? (r.context = a) : (r.pendingContext = a),
    ((r = Sl(t)).payload = { element: n }),
    null !== (l = void 0 === l ? null : l) && (r.callback = l),
    null !== (n = xl(e, r, t)) && (ec(n, 0, t), El(n, e, t));
}
function vf(e, t) {
  if (null !== (e = e.memoizedState) && null !== e.dehydrated) {
    var n = e.retryLane;
    e.retryLane = 0 !== n && n < t ? n : t;
  }
}
function bf(e, t) {
  vf(e, t), (e = e.alternate) && vf(e, t);
}
function kf(e) {
  if (13 === e.tag) {
    var t = Yr(e, 67108864);
    null !== t && ec(t, 0, 67108864), bf(e, 67108864);
  }
}
var wf = !0;
function Sf(e, t, n, r) {
  var a = J.T;
  J.T = null;
  var l = Z.p;
  try {
    (Z.p = 2), Ef(e, t, n, r);
  } finally {
    (Z.p = l), (J.T = a);
  }
}
function xf(e, t, n, r) {
  var a = J.T;
  J.T = null;
  var l = Z.p;
  try {
    (Z.p = 8), Ef(e, t, n, r);
  } finally {
    (Z.p = l), (J.T = a);
  }
}
function Ef(e, t, n, r) {
  if (wf) {
    var a = Cf(r);
    if (null === a) od(e, t, r, Pf, n), Mf(e, r);
    else if (
      (function (e, t, n, r, a) {
        switch (t) {
          case "focusin":
            return (Lf = If(Lf, e, t, n, r, a)), !0;
          case "dragenter":
            return (Tf = If(Tf, e, t, n, r, a)), !0;
          case "mouseover":
            return (Df = If(Df, e, t, n, r, a)), !0;
          case "pointerover":
            var l = a.pointerId;
            return Of.set(l, If(Of.get(l) || null, e, t, n, r, a)), !0;
          case "gotpointercapture":
            return (
              (l = a.pointerId),
              Af.set(l, If(Af.get(l) || null, e, t, n, r, a)),
              !0
            );
        }
        return !1;
      })(a, e, t, n, r)
    )
      r.stopPropagation();
    else if ((Mf(e, r), 4 & t && -1 < jf.indexOf(e))) {
      for (; null !== a; ) {
        var l = ot(a);
        if (null !== l)
          switch (l.tag) {
            case 3:
              if ((l = l.stateNode).current.memoizedState.isDehydrated) {
                var o = je(l.pendingLanes);
                if (0 !== o) {
                  var i = l;
                  for (i.pendingLanes |= 2, i.entangledLanes |= 2; o; ) {
                    var u = 1 << (31 - Te(o));
                    (i.entanglements[1] |= u), (o &= ~u);
                  }
                  Uc(l), !(6 & ks) && ((Us = be() + 500), Vc(0));
                }
              }
              break;
            case 13:
              null !== (i = Yr(l, 2)) && ec(i, 0, 2), lc(), bf(l, 2);
          }
        if ((null === (l = Cf(r)) && od(e, t, r, Pf, n), l === a)) break;
        a = l;
      }
      null !== a && r.stopPropagation();
    } else od(e, t, r, null, n);
  }
}
function Cf(e) {
  return Nf((e = Yt(e)));
}
var Pf = null;
function Nf(e) {
  if (((Pf = null), null !== (e = lt(e)))) {
    var t = P(e);
    if (null === t) e = null;
    else {
      var n = t.tag;
      if (13 === n) {
        if (null !== (e = N(t))) return e;
        e = null;
      } else if (3 === n) {
        if (t.stateNode.current.memoizedState.isDehydrated)
          return 3 === t.tag ? t.stateNode.containerInfo : null;
        e = null;
      } else t !== e && (e = null);
    }
  }
  return (Pf = e), null;
}
function zf(e) {
  switch (e) {
    case "beforetoggle":
    case "cancel":
    case "click":
    case "close":
    case "contextmenu":
    case "copy":
    case "cut":
    case "auxclick":
    case "dblclick":
    case "dragend":
    case "dragstart":
    case "drop":
    case "focusin":
    case "focusout":
    case "input":
    case "invalid":
    case "keydown":
    case "keypress":
    case "keyup":
    case "mousedown":
    case "mouseup":
    case "paste":
    case "pause":
    case "play":
    case "pointercancel":
    case "pointerdown":
    case "pointerup":
    case "ratechange":
    case "reset":
    case "resize":
    case "seeked":
    case "submit":
    case "toggle":
    case "touchcancel":
    case "touchend":
    case "touchstart":
    case "volumechange":
    case "change":
    case "selectionchange":
    case "textInput":
    case "compositionstart":
    case "compositionend":
    case "compositionupdate":
    case "beforeblur":
    case "afterblur":
    case "beforeinput":
    case "blur":
    case "fullscreenchange":
    case "focus":
    case "hashchange":
    case "popstate":
    case "select":
    case "selectstart":
      return 2;
    case "drag":
    case "dragenter":
    case "dragexit":
    case "dragleave":
    case "dragover":
    case "mousemove":
    case "mouseout":
    case "mouseover":
    case "pointermove":
    case "pointerout":
    case "pointerover":
    case "scroll":
    case "touchmove":
    case "wheel":
    case "mouseenter":
    case "mouseleave":
    case "pointerenter":
    case "pointerleave":
      return 8;
    case "message":
      switch (ke()) {
        case we:
          return 2;
        case Se:
          return 8;
        case xe:
        case Ee:
          return 32;
        case Ce:
          return 268435456;
        default:
          return 32;
      }
    default:
      return 32;
  }
}
var _f = !1,
  Lf = null,
  Tf = null,
  Df = null,
  Of = new Map(),
  Af = new Map(),
  Ff = [],
  jf =
    "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
      " "
    );
function Mf(e, t) {
  switch (e) {
    case "focusin":
    case "focusout":
      Lf = null;
      break;
    case "dragenter":
    case "dragleave":
      Tf = null;
      break;
    case "mouseover":
    case "mouseout":
      Df = null;
      break;
    case "pointerover":
    case "pointerout":
      Of.delete(t.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      Af.delete(t.pointerId);
  }
}
function If(e, t, n, r, a, l) {
  return null === e || e.nativeEvent !== l
    ? ((e = {
        blockedOn: t,
        domEventName: n,
        eventSystemFlags: r,
        nativeEvent: l,
        targetContainers: [a],
      }),
      null !== t && null !== (t = ot(t)) && kf(t),
      e)
    : ((e.eventSystemFlags |= r),
      (t = e.targetContainers),
      null !== a && -1 === t.indexOf(a) && t.push(a),
      e);
}
function Rf(e) {
  var t = lt(e.target);
  if (null !== t) {
    var n = P(t);
    if (null !== n)
      if (13 === (t = n.tag)) {
        if (null !== (t = N(n)))
          return (
            (e.blockedOn = t),
            void (function (e, t) {
              var n = Z.p;
              try {
                return (Z.p = e), t();
              } finally {
                Z.p = n;
              }
            })(e.priority, function () {
              if (13 === n.tag) {
                var e = Js();
                e = Qe(e);
                var t = Yr(n, e);
                null !== t && ec(t, 0, e), bf(n, e);
              }
            })
          );
      } else if (3 === t && n.stateNode.current.memoizedState.isDehydrated)
        return void (e.blockedOn =
          3 === n.tag ? n.stateNode.containerInfo : null);
  }
  e.blockedOn = null;
}
function Uf(e) {
  if (null !== e.blockedOn) return !1;
  for (var t = e.targetContainers; 0 < t.length; ) {
    var n = Cf(e.nativeEvent);
    if (null !== n) return null !== (t = ot(n)) && kf(t), (e.blockedOn = n), !1;
    var r = new (n = e.nativeEvent).constructor(n.type, n);
    (Xt = r), n.target.dispatchEvent(r), (Xt = null), t.shift();
  }
  return !0;
}
function Vf(e, t, n) {
  Uf(e) && n.delete(t);
}
function $f() {
  (_f = !1),
    null !== Lf && Uf(Lf) && (Lf = null),
    null !== Tf && Uf(Tf) && (Tf = null),
    null !== Df && Uf(Df) && (Df = null),
    Of.forEach(Vf),
    Af.forEach(Vf);
}
function Hf(e, t) {
  e.blockedOn === t &&
    ((e.blockedOn = null),
    _f ||
      ((_f = !0), w.unstable_scheduleCallback(w.unstable_NormalPriority, $f)));
}
var qf = null;
function Bf(e) {
  qf !== e &&
    ((qf = e),
    w.unstable_scheduleCallback(w.unstable_NormalPriority, function () {
      qf === e && (qf = null);
      for (var t = 0; t < e.length; t += 3) {
        var n = e[t],
          r = e[t + 1],
          a = e[t + 2];
        if ("function" != typeof r) {
          if (null === Nf(r || n)) continue;
          break;
        }
        var l = ot(n);
        null !== l &&
          (e.splice(t, 3),
          (t -= 3),
          Yo(l, { pending: !0, data: a, method: n.method, action: r }, r, a));
      }
    }));
}
function Qf(e) {
  function t(t) {
    return Hf(t, e);
  }
  null !== Lf && Hf(Lf, e),
    null !== Tf && Hf(Tf, e),
    null !== Df && Hf(Df, e),
    Of.forEach(t),
    Af.forEach(t);
  for (var n = 0; n < Ff.length; n++) {
    var r = Ff[n];
    r.blockedOn === e && (r.blockedOn = null);
  }
  for (; 0 < Ff.length && null === (n = Ff[0]).blockedOn; )
    Rf(n), null === n.blockedOn && Ff.shift();
  if (null != (n = (e.ownerDocument || e).$$reactFormReplay))
    for (r = 0; r < n.length; r += 3) {
      var a = n[r],
        l = n[r + 1],
        o = a[Ge] || null;
      if ("function" == typeof l) o || Bf(n);
      else if (o) {
        var i = null;
        if (l && l.hasAttribute("formAction")) {
          if (((a = l), (o = l[Ge] || null))) i = o.formAction;
          else if (null !== Nf(a)) continue;
        } else i = o.action;
        "function" == typeof i ? (n[r + 1] = i) : (n.splice(r, 3), (r -= 3)),
          Bf(n);
      }
    }
}
function Wf(e) {
  this._internalRoot = e;
}
function Xf(e) {
  this._internalRoot = e;
}
(Xf.prototype.render = Wf.prototype.render =
  function (e) {
    var t = this._internalRoot;
    if (null === t) throw Error(E(409));
    yf(t.current, Js(), e, t, null, null);
  }),
  (Xf.prototype.unmount = Wf.prototype.unmount =
    function () {
      var e = this._internalRoot;
      if (null !== e) {
        this._internalRoot = null;
        var t = e.containerInfo;
        yf(e.current, 2, null, e, null, null), lc(), (t[Je] = null);
      }
    }),
  (Xf.prototype.unstable_scheduleHydration = function (e) {
    if (e) {
      var t = Xe();
      e = { blockedOn: null, target: e, priority: t };
      for (var n = 0; n < Ff.length && 0 !== t && t < Ff[n].priority; n++);
      Ff.splice(n, 0, e), 0 === n && Rf(e);
    }
  });
var Yf = S.version;
if ("19.1.0" !== Yf) throw Error(E(527, Yf, "19.1.0"));
Z.findDOMNode = function (e) {
  var t = e._reactInternals;
  if (void 0 === t) {
    if ("function" == typeof e.render) throw Error(E(188));
    throw ((e = Object.keys(e).join(",")), Error(E(268, e)));
  }
  return (
    (e = (function (e) {
      var t = e.alternate;
      if (!t) {
        if (null === (t = P(e))) throw Error(E(188));
        return t !== e ? null : e;
      }
      for (var n = e, r = t; ; ) {
        var a = n.return;
        if (null === a) break;
        var l = a.alternate;
        if (null === l) {
          if (null !== (r = a.return)) {
            n = r;
            continue;
          }
          break;
        }
        if (a.child === l.child) {
          for (l = a.child; l; ) {
            if (l === n) return z(a), e;
            if (l === r) return z(a), t;
            l = l.sibling;
          }
          throw Error(E(188));
        }
        if (n.return !== r.return) (n = a), (r = l);
        else {
          for (var o = !1, i = a.child; i; ) {
            if (i === n) {
              (o = !0), (n = a), (r = l);
              break;
            }
            if (i === r) {
              (o = !0), (r = a), (n = l);
              break;
            }
            i = i.sibling;
          }
          if (!o) {
            for (i = l.child; i; ) {
              if (i === n) {
                (o = !0), (n = l), (r = a);
                break;
              }
              if (i === r) {
                (o = !0), (r = l), (n = a);
                break;
              }
              i = i.sibling;
            }
            if (!o) throw Error(E(189));
          }
        }
        if (n.alternate !== r) throw Error(E(190));
      }
      if (3 !== n.tag) throw Error(E(188));
      return n.stateNode.current === n ? e : t;
    })(t)),
    (e = null === (e = null !== e ? _(e) : null) ? null : e.stateNode)
  );
};
var Kf = {
  bundleType: 0,
  version: "19.1.0",
  rendererPackageName: "react-dom",
  currentDispatcherRef: J,
  reconcilerVersion: "19.1.0",
};
if ("undefined" != typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) {
  var Gf = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!Gf.isDisabled && Gf.supportsFiber)
    try {
      (ze = Gf.inject(Kf)), (_e = Gf);
    } catch (nm) {}
}
(v.createRoot = function (e, t) {
  if (!C(e)) throw Error(E(299));
  var n = !1,
    r = "",
    a = ji,
    l = Mi,
    o = Ii;
  return (
    null != t &&
      (!0 === t.unstable_strictMode && (n = !0),
      void 0 !== t.identifierPrefix && (r = t.identifierPrefix),
      void 0 !== t.onUncaughtError && (a = t.onUncaughtError),
      void 0 !== t.onCaughtError && (l = t.onCaughtError),
      void 0 !== t.onRecoverableError && (o = t.onRecoverableError),
      void 0 !== t.unstable_transitionCallbacks &&
        t.unstable_transitionCallbacks),
    (t = hf(e, 1, !1, null, 0, n, r, a, l, o, 0, null)),
    (e[Je] = t.current),
    ad(e),
    new Wf(t)
  );
}),
  (v.hydrateRoot = function (e, t, n) {
    if (!C(e)) throw Error(E(299));
    var r = !1,
      a = "",
      l = ji,
      o = Mi,
      i = Ii,
      u = null;
    return (
      null != n &&
        (!0 === n.unstable_strictMode && (r = !0),
        void 0 !== n.identifierPrefix && (a = n.identifierPrefix),
        void 0 !== n.onUncaughtError && (l = n.onUncaughtError),
        void 0 !== n.onCaughtError && (o = n.onCaughtError),
        void 0 !== n.onRecoverableError && (i = n.onRecoverableError),
        void 0 !== n.unstable_transitionCallbacks &&
          n.unstable_transitionCallbacks,
        void 0 !== n.formState && (u = n.formState)),
      ((t = hf(e, 1, !0, t, 0, r, a, l, o, i, 0, u)).context = gf(null)),
      (n = t.current),
      ((a = Sl((r = Qe((r = Js()))))).callback = null),
      xl(n, a, r),
      (n = r),
      (t.current.lanes = n),
      He(t, n),
      Uc(t),
      (e[Je] = t.current),
      ad(e),
      new Xf(t)
    );
  }),
  (v.version = "19.1.0"),
  (function e() {
    if (
      "undefined" != typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ &&
      "function" == typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e);
      } catch (nm) {}
  })(),
  (y.exports = v);
const Jf = o(y.exports),
  Zf = h(
    "https://hbnrwzumdonidkrakaqk.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhibnJ3enVtZG9uaWRrcmFrYXFrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU1MDY1NzEsImV4cCI6MjA2MTA4MjU3MX0.PZEP9QSovTcXQgUXL7iVHopZAoN9cPGwRHHhwltOqSE"
  ),
  ep = async (e, t, n) => {
    const { data: r, error: a } = await Zf.auth.signUp({
      email: e,
      password: t,
      options: { data: { full_name: n } },
    });
    return { data: r, error: a };
  },
  tp = async (e, t) => {
    const { data: n, error: r } = await Zf.auth.signInWithPassword({
      email: e,
      password: t,
    });
    return { data: n, error: r };
  },
  np = async () => {
    const { error: e } = await Zf.auth.signOut();
    return { error: e };
  },
  rp = async () => {
    const { data: e, error: t } = await Zf.auth.getUser();
    return { data: e, error: t };
  },
  ap = async () => {
    const { data: e, error: t } = await Zf.from("stands")
      .select("*")
      .eq("is_active", !0);
    return { data: e, error: t };
  },
  lp = async (e) => {
    const { data: t, error: n } = await Zf.from("stands")
      .select("*, products(*)")
      .eq("id", e)
      .single();
    return { data: t, error: n };
  },
  op = async (e) => {
    const { data: t, error: n } = await Zf.from("stands")
      .select("*")
      .eq("owner_id", e);
    return { data: t, error: n };
  },
  ip = async (e, t) => {
    const { data: n, error: r } = await Zf.from("stands")
      .update(t)
      .eq("id", e)
      .select();
    return { data: n, error: r };
  },
  up = async (e, t = 24) => {
    const { data: n, error: r } = await Zf.from("stands")
      .select("expiration_time")
      .eq("id", e)
      .single();
    if (r) return { error: r };
    let a;
    if (n.expiration_time) {
      const e = new Date(n.expiration_time),
        r = new Date();
      a =
        e < r
          ? new Date(r.getTime() + 60 * t * 60 * 1e3)
          : new Date(e.getTime() + 60 * t * 60 * 1e3);
    } else a = new Date(new Date().getTime() + 60 * t * 60 * 1e3);
    const { data: l, error: o } = await Zf.from("stands")
      .update({ expiration_time: a.toISOString(), is_active: !0 })
      .eq("id", e)
      .select();
    return { data: l, error: o };
  },
  sp = async (e) => {
    const { error: t } = await Zf.from("stands").delete().eq("id", e);
    return { error: t };
  },
  cp = async (e, t, n) => {
    const r = `${t}/${e}/${Date.now()}.${n.name.split(".").pop()}`,
      { data: a, error: l } = await Zf.storage
        .from("stand-images")
        .upload(r, n, { cacheControl: "3600", upsert: !0 });
    if (l) return { error: l };
    const { data: o } = Zf.storage.from("stand-images").getPublicUrl(r),
      { data: i, error: u } = await ip(e, { image_url: o.publicUrl });
    return { data: i, error: u };
  },
  dp = async (e) => {
    const { data: t, error: n } = await Zf.from("products")
      .select("*")
      .eq("stand_id", e)
      .eq("is_available", !0);
    return { data: t, error: n };
  },
  fp = async (e) => {
    const { data: t, error: n } = await Zf.from("products")
      .insert([e])
      .select();
    return { data: t, error: n };
  },
  pp = async (e, t) => {
    const { data: n, error: r } = await Zf.from("products")
      .update(t)
      .eq("id", e)
      .select();
    return { data: n, error: r };
  },
  mp = async (e) => {
    const { error: t } = await Zf.from("products").delete().eq("id", e);
    return { error: t };
  },
  hp = async (e, t, n, r) => {
    const a = `${n}/${t}/${e}/${Date.now()}.${r.name.split(".").pop()}`,
      { data: l, error: o } = await Zf.storage
        .from("product-images")
        .upload(a, r, { cacheControl: "3600", upsert: !0 });
    if (o) return { error: o };
    const { data: i } = Zf.storage.from("product-images").getPublicUrl(a),
      { data: u, error: s } = await pp(e, { image_url: i.publicUrl });
    return { data: u, error: s };
  },
  gp = (e) =>
    Zf.channel("public:stands")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "stands",
          filter: "is_active=eq.true",
        },
        (t) => {
          e(t);
        }
      )
      .subscribe(),
  yp = (e) => {
    Zf.removeChannel(e);
  },
  vp = a.createContext(null),
  bp = ({ children: t }) => {
    const [n, r] = a.useState(null),
      [l, o] = a.useState(null),
      [i, u] = a.useState(!0),
      [s, c] = a.useState(null);
    a.useEffect(() => {
      (async () => {
        try {
          const { data: e } = await (async () => {
            const { data: e, error: t } = await Zf.auth.getSession();
            return { data: e, error: t };
          })();
          if (
            (o((null == e ? void 0 : e.session) || null),
            null == e ? void 0 : e.session)
          ) {
            const { data: e } = await rp();
            r((null == e ? void 0 : e.user) || null);
          }
        } catch (nm) {
          c(nm.message);
        } finally {
          u(!1);
        }
      })();
      const { data: e } = Zf.auth.onAuthStateChange(async (e, t) => {
        if ((o(t), "SIGNED_IN" === e || "TOKEN_REFRESHED" === e)) {
          const { data: e } = await rp();
          r((null == e ? void 0 : e.user) || null);
        } else "SIGNED_OUT" === e && r(null);
      });
      return () => {
        e && e.subscription && e.subscription.unsubscribe();
      };
    }, []);
    const d = {
      user: n,
      session: l,
      loading: i,
      error: s,
      isAuthenticated: !!n,
    };
    return e.jsx(vp.Provider, { value: d, children: t });
  },
  kp = () => {
    const e = a.useContext(vp);
    if (null === e)
      throw new Error("useAuth must be used within an AuthProvider");
    return e;
  },
  wp = a.createContext(null),
  Sp = ({ children: t }) => {
    const [n, r] = a.useState([]),
      [l, o] = a.useState(!0),
      [i, u] = a.useState(null),
      [s, c] = a.useState(null);
    a.useEffect(() => {
      (async () => {
        try {
          o(!0);
          const { data: e, error: t } = await ap();
          if (t) throw new Error(t.message);
          r(e || []);
        } catch (nm) {
          u("Failed to load lemonade stands. Please try again later.");
        } finally {
          o(!1);
        }
      })();
      const e = gp((e) => {
        "INSERT" === e.eventType
          ? r((t) => [...t, e.new])
          : "UPDATE" === e.eventType
          ? (r((t) => t.map((t) => (t.id === e.new.id ? e.new : t))),
            s && s.id === e.new.id && c(e.new))
          : "DELETE" === e.eventType &&
            (r((t) => t.filter((t) => t.id !== e.old.id)),
            s && s.id === e.old.id && c(null));
      });
      return () => {
        yp(e);
      };
    }, [s]);
    const d = {
      stands: n,
      loading: l,
      error: i,
      selectedStand: s,
      setSelectedStand: c,
      setError: u,
    };
    return e.jsx(wp.Provider, { value: d, children: t });
  },
  xp = () => {
    const e = a.useContext(wp);
    if (null === e)
      throw new Error("useStands must be used within a StandProvider");
    return e;
  },
  Ep = async (e) => {
    try {
      const t = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          e
        )}&limit=1`,
        {
          headers: {
            Accept: "application/json",
            "User-Agent": "LemonadeStandApp/1.0",
          },
        }
      );
      if (!t.ok) throw new Error(`Geocoding failed with status: ${t.status}`);
      const n = await t.json();
      return n && n.length > 0
        ? { lat: parseFloat(n[0].lat), lng: parseFloat(n[0].lon) }
        : null;
    } catch (t) {
      throw t;
    }
  },
  Cp = (e, t, n, r = "miles") => {
    if (null == t || null == n) return e;
    const a = e.map((e) => {
      const a = ((e, t, n, r, a = "miles") => {
        if (null == e || null == t || null == n || null == r) return null;
        const l = (Math.PI * e) / 180,
          o = (Math.PI * t) / 180,
          i = (Math.PI * n) / 180,
          u = i - l,
          s = (Math.PI * r) / 180 - o,
          c =
            Math.sin(u / 2) * Math.sin(u / 2) +
            Math.cos(l) * Math.cos(i) * Math.sin(s / 2) * Math.sin(s / 2),
          d = 2 * Math.atan2(Math.sqrt(c), Math.sqrt(1 - c)) * 6371;
        return "miles" === a ? 0.621371 * d : d;
      })(t, n, e.location_lat, e.location_lng, r);
      return { ...e, distance: a };
    });
    return a.sort((e, t) =>
      null === e.distance && null === t.distance
        ? 0
        : null === e.distance
        ? 1
        : null === t.distance
        ? -1
        : e.distance - t.distance
    );
  },
  Pp = (e, t) =>
    null == t ? e : e.filter((e) => null !== e.distance && e.distance <= t),
  Np = (e) => {
    navigator.geolocation && e && navigator.geolocation.clearWatch(e);
  },
  zp = async (e) => {
    if (!e || !e.lat || !e.lng) throw new Error("Invalid location");
    return (async (e, t) => {
      try {
        const n = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${e}&lon=${t}`,
          {
            headers: {
              Accept: "application/json",
              "User-Agent": "LemonadeStandApp/1.0",
            },
          }
        );
        if (!n.ok)
          throw new Error(`Reverse geocoding failed with status: ${n.status}`);
        const r = await n.json();
        return r && r.display_name ? r.display_name : null;
      } catch (n) {
        throw n;
      }
    })(e.lat, e.lng);
  },
  _p = (e, t = "miles") =>
    null == e
      ? "Distance unknown"
      : e < 0.1
      ? `${(5280 * e).toFixed(0)} feet away`
      : e < 10
      ? `${e.toFixed(1)} ${t} away`
      : `${Math.round(e)} ${t} away`,
  Lp = (e) =>
    null == e
      ? "Distance unknown"
      : e < 0.1
      ? "Very close"
      : e < 0.5
      ? "Walking distance"
      : e < 1
      ? "Less than a mile away"
      : e < 5
      ? "A short drive away"
      : e < 20
      ? "Nearby"
      : "Far away",
  Tp = a.createContext(null),
  Dp = ({ children: t }) => {
    const [n, r] = a.useState(null),
      [l, o] = a.useState(null),
      [i, u] = a.useState(!1),
      [s, c] = a.useState(null),
      [d, f] = a.useState(null),
      [p, m] = a.useState("unknown");
    a.useEffect(
      () => (
        navigator.permissions && navigator.permissions.query
          ? navigator.permissions
              .query({ name: "geolocation" })
              .then((e) => {
                m(e.state),
                  (e.onchange = () => {
                    m(e.state);
                  }),
                  "granted" === e.state && h();
              })
              .catch((e) => {})
          : h(),
        () => {
          d && Np(d);
        }
      ),
      []
    ),
      a.useEffect(() => {
        n && g();
      }, [n]);
    const h = async () => {
        u(!0), c(null);
        try {
          const e = await new Promise((e, t) => {
            navigator.geolocation
              ? navigator.geolocation.getCurrentPosition(
                  (t) => {
                    e({
                      lat: t.coords.latitude,
                      lng: t.coords.longitude,
                      accuracy: t.coords.accuracy,
                    });
                  },
                  (e) => {
                    let n = "Unknown error occurred while getting location";
                    switch (e.code) {
                      case e.PERMISSION_DENIED:
                        n = "Location permission denied";
                        break;
                      case e.POSITION_UNAVAILABLE:
                        n = "Location information is unavailable";
                        break;
                      case e.TIMEOUT:
                        n = "Location request timed out";
                    }
                    t(new Error(n));
                  },
                  { enableHighAccuracy: !0, timeout: 1e4, maximumAge: 6e4 }
                )
              : t(new Error("Geolocation is not supported by your browser"));
          });
          r(e);
        } catch (nm) {
          c(nm.message),
            "Location permission denied" === nm.message && m("denied");
        } finally {
          u(!1);
        }
      },
      g = async () => {
        if (n)
          try {
            const e = await zp(n);
            o(e);
          } catch (nm) {}
      },
      y = {
        location: n,
        address: l,
        loading: i,
        error: s,
        permissionStatus: p,
        watchId: null !== d,
        getLocation: h,
        startWatchingLocation: () => {
          d && Np(d);
          try {
            const e = ((e) => {
              if (!navigator.geolocation)
                throw new Error("Geolocation is not supported by your browser");
              return navigator.geolocation.watchPosition(
                (t) => {
                  e({
                    lat: t.coords.latitude,
                    lng: t.coords.longitude,
                    accuracy: t.coords.accuracy,
                  });
                },
                (e) => {},
                { enableHighAccuracy: !0, timeout: 1e4, maximumAge: 3e4 }
              );
            })((e) => {
              r(e);
            });
            f(e);
          } catch (nm) {
            c(nm.message);
          }
        },
        stopWatchingLocation: () => {
          d && (Np(d), f(null));
        },
      };
    return e.jsx(Tp.Provider, { value: y, children: t });
  },
  Op = () => {
    const e = a.useContext(Tp);
    if (null === e)
      throw new Error(
        "useGeolocation must be used within a GeolocationProvider"
      );
    return e;
  },
  Ap = a.createContext(null),
  Fp = ({ children: t }) => {
    const { location: n } = Op(),
      { stands: r, loading: l } = xp(),
      [o, i] = a.useState([]),
      [u, s] = a.useState(null),
      [c, d] = a.useState(!1),
      [f, p] = a.useState(null);
    a.useEffect(() => {
      if (l) d(!0);
      else {
        if (!n) return i([]), void d(!1);
        try {
          d(!0);
          const e = ((e, t, n = null, r = "miles") => {
            if (!t || !e || !e.length) return [];
            const a = Cp([...e], t.lat, t.lng, r);
            return null !== n ? Pp(a, n) : a;
          })(r, n, u);
          i(e), p(null);
        } catch (nm) {
          p(nm.message);
        } finally {
          d(!1);
        }
      }
    }, [n, r, u, l]);
    const m = {
      nearbyStands: o,
      maxDistance: u,
      loading: c,
      error: f,
      setMaxDistanceFilter: (e) => {
        s("" === e ? null : parseFloat(e));
      },
      hasLocation: !!n,
    };
    return e.jsx(Ap.Provider, { value: m, children: t });
  },
  jp = () => {
    const e = a.useContext(Ap);
    if (null === e)
      throw new Error(
        "useNearbyStands must be used within a NearbyStandsProvider"
      );
    return e;
  },
  Mp = ({ redirectPath: t = "/login" }) => {
    const { isAuthenticated: n, loading: r } = kp();
    return r
      ? e.jsx("div", {
          className: "flex justify-center items-center h-screen",
          children: e.jsx("div", {
            "data-testid": "loading-spinner",
            className:
              "animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-lemonade-blue",
          }),
        })
      : n
      ? e.jsx(u, {})
      : e.jsx(i, { to: t, replace: !0 });
  },
  Ip = ({ mapComponent: t, sidebarComponent: r, className: l = "" }) => {
    const [o, i] = a.useState(!0);
    return e.jsxs("div", {
      className: `w-full ${l}`,
      children: [
        e.jsx("div", {
          className: "lg:hidden flex justify-center mb-4",
          children: e.jsxs("div", {
            className: "inline-flex rounded-md shadow-sm",
            children: [
              e.jsx(n, {
                variant: o ? "primary" : "outline",
                className: "rounded-r-none",
                onClick: () => i(!0),
                children: "Map",
              }),
              e.jsx(n, {
                variant: o ? "outline" : "primary",
                className: "rounded-l-none",
                onClick: () => i(!1),
                children: "List",
              }),
            ],
          }),
        }),
        e.jsxs("div", {
          className: "grid grid-cols-1 lg:grid-cols-3 gap-6",
          children: [
            e.jsx("div", {
              className: "lg:col-span-2 " + (o ? "" : "hidden lg:block"),
              children: t,
            }),
            e.jsx("div", {
              className: "" + (o ? "hidden lg:block" : ""),
              children: r,
            }),
          ],
        }),
      ],
    });
  };
Ip.propTypes = {
  mapComponent: t.node.isRequired,
  sidebarComponent: t.node.isRequired,
  className: t.string,
};
const Rp = ({ children: t }) => {
    var n;
    const { isAuthenticated: r, user: a } = kp(),
      l = s();
    return e.jsxs("div", {
      className: "min-h-screen flex flex-col bg-gray-100",
      children: [
        e.jsx("header", {
          className:
            "bg-lemonade-yellow shadow-playful py-4 md:py-6 sticky top-0 z-50",
          children: e.jsx("div", {
            className: "max-w-6xl mx-auto px-4",
            children: e.jsxs("div", {
              className: "flex items-center justify-between",
              children: [
                e.jsx(c, {
                  to: "/",
                  className: "flex items-center",
                  children: e.jsx("h1", {
                    className:
                      "text-2xl md:text-4xl font-display text-gray-800",
                    children: "Lemonade Stand",
                  }),
                }),
                e.jsxs("nav", {
                  className: "hidden md:flex items-center space-x-6",
                  children: [
                    e.jsx(c, {
                      to: "/",
                      className:
                        "text-gray-700 hover:text-lemonade-blue-dark transition",
                      children: "Home",
                    }),
                    r
                      ? e.jsxs(e.Fragment, {
                          children: [
                            e.jsx(c, {
                              to: "/seller/dashboard",
                              className:
                                "text-gray-700 hover:text-lemonade-blue-dark transition",
                              children: "Dashboard",
                            }),
                            e.jsxs("div", {
                              className: "relative group",
                              children: [
                                e.jsxs("button", {
                                  className:
                                    "flex items-center text-gray-700 hover:text-lemonade-blue-dark transition",
                                  children: [
                                    e.jsx("span", {
                                      className: "mr-1",
                                      children:
                                        (null ==
                                        (n =
                                          null == a ? void 0 : a.user_metadata)
                                          ? void 0
                                          : n.full_name) ||
                                        (null == a ? void 0 : a.email),
                                    }),
                                    e.jsx("svg", {
                                      xmlns: "http://www.w3.org/2000/svg",
                                      className: "h-4 w-4",
                                      fill: "none",
                                      viewBox: "0 0 24 24",
                                      stroke: "currentColor",
                                      children: e.jsx("path", {
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        strokeWidth: 2,
                                        d: "M19 9l-7 7-7-7",
                                      }),
                                    }),
                                  ],
                                }),
                                e.jsxs("div", {
                                  className:
                                    "absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block",
                                  children: [
                                    e.jsx(c, {
                                      to: "/profile",
                                      className:
                                        "block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100",
                                      children: "Profile",
                                    }),
                                    e.jsx("button", {
                                      onClick: async () => {
                                        try {
                                          await np(), l("/");
                                        } catch (e) {}
                                      },
                                      className:
                                        "block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100",
                                      children: "Sign Out",
                                    }),
                                  ],
                                }),
                              ],
                            }),
                          ],
                        })
                      : e.jsxs(e.Fragment, {
                          children: [
                            e.jsx(c, {
                              to: "/login",
                              className:
                                "text-gray-700 hover:text-lemonade-blue-dark transition",
                              children: "Log In",
                            }),
                            e.jsx(c, {
                              to: "/register",
                              className:
                                "px-4 py-2 bg-lemonade-blue text-white rounded-md hover:bg-lemonade-blue-dark transition",
                              children: "Register",
                            }),
                          ],
                        }),
                  ],
                }),
                e.jsx("div", {
                  className: "md:hidden",
                  children: e.jsx("button", {
                    className:
                      "text-gray-700 hover:text-lemonade-blue-dark transition",
                    children: e.jsx("svg", {
                      xmlns: "http://www.w3.org/2000/svg",
                      className: "h-6 w-6",
                      fill: "none",
                      viewBox: "0 0 24 24",
                      stroke: "currentColor",
                      children: e.jsx("path", {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: 2,
                        d: "M4 6h16M4 12h16M4 18h16",
                      }),
                    }),
                  }),
                }),
              ],
            }),
          }),
        }),
        e.jsx("main", { className: "flex-grow", children: t }),
        e.jsx("footer", {
          className: "bg-gray-800 text-white py-8",
          children: e.jsxs("div", {
            className: "max-w-6xl mx-auto px-4",
            children: [
              e.jsxs("div", {
                className:
                  "flex flex-col md:flex-row justify-between items-center",
                children: [
                  e.jsxs("div", {
                    className: "mb-4 md:mb-0",
                    children: [
                      e.jsx("h2", {
                        className: "text-xl font-display",
                        children: "Lemonade Stand",
                      }),
                      e.jsx("p", {
                        className: "text-gray-400",
                        children: "Find and manage lemonade stands",
                      }),
                    ],
                  }),
                  e.jsxs("div", {
                    className: "flex space-x-6",
                    children: [
                      e.jsx(c, {
                        to: "/",
                        className: "text-gray-400 hover:text-white transition",
                        children: "Home",
                      }),
                      e.jsx(c, {
                        to: "/about",
                        className: "text-gray-400 hover:text-white transition",
                        children: "About",
                      }),
                      e.jsx(c, {
                        to: "/contact",
                        className: "text-gray-400 hover:text-white transition",
                        children: "Contact",
                      }),
                    ],
                  }),
                ],
              }),
              e.jsx("div", {
                className:
                  "mt-8 pt-8 border-t border-gray-700 text-center text-gray-400",
                children: e.jsxs("p", {
                  children: [
                    "© ",
                    new Date().getFullYear(),
                    " Lemonade Stand. All rights reserved.",
                  ],
                }),
              }),
            ],
          }),
        }),
      ],
    });
  },
  Up = {
    BASE_URL: "/Lemonade-stand/",
    DEV: !1,
    MODE: "production",
    PROD: !0,
    SSR: !1,
    VITE_SUPABASE_ANON_KEY:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhibnJ3enVtZG9uaWRrcmFrYXFrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU1MDY1NzEsImV4cCI6MjA2MTA4MjU3MX0.PZEP9QSovTcXQgUXL7iVHopZAoN9cPGwRHHhwltOqSE",
    VITE_SUPABASE_URL: "https://hbnrwzumdonidkrakaqk.supabase.co",
  };
let Vp = "/";
try {
  void 0 !== import.meta && Up && (Vp = "/Lemonade-stand/");
} catch (tm) {
  Vp = "/";
}
const $p = a.lazy(() =>
    g(
      () => import("./HomePage-B3lL-twH.js"),
      __vite__mapDeps([0, 1, 2, 3, 4, 5])
    )
  ),
  Hp = a.lazy(() =>
    g(() => import("./LoginPage-RfQLUCI4.js"), __vite__mapDeps([6, 1, 2, 7, 4]))
  ),
  qp = a.lazy(() =>
    g(
      () => import("./RegisterPage-bxGe1Bgj.js"),
      __vite__mapDeps([8, 1, 2, 7, 4])
    )
  ),
  Bp = a.lazy(() =>
    g(
      () => import("./SellerDashboardPage-CwKrwNx2.js"),
      __vite__mapDeps([9, 1, 2, 4])
    )
  ),
  Qp = a.lazy(() =>
    g(
      () => import("./StandDetailPage-DG4_j9gE.js"),
      __vite__mapDeps([10, 1, 2, 4])
    )
  ),
  Wp = a.lazy(() =>
    g(
      () => import("./ProductDetailPage-CYIfGUt6.js"),
      __vite__mapDeps([11, 1, 2, 4])
    )
  ),
  Xp = a.lazy(() =>
    g(() => import("./NotFoundPage-A3nuzRUi.js"), __vite__mapDeps([12, 1, 2]))
  ),
  Yp = a.lazy(() =>
    g(
      () => import("./SellerRegistrationPage-jvfUM4E_.js"),
      __vite__mapDeps([13, 1, 2, 4])
    )
  ),
  Kp = a.lazy(() =>
    g(
      () => import("./ComponentShowcase-dVAFDBrC.js"),
      __vite__mapDeps([14, 1, 2])
    )
  ),
  Gp = a.lazy(() =>
    g(
      () => import("./SupabaseTest-DMRb0bvf.js"),
      __vite__mapDeps([15, 1, 2, 7, 4])
    )
  ),
  Jp = () =>
    e.jsx("div", {
      className: "flex items-center justify-center min-h-screen",
      children: e.jsx(r, {
        size: "lg",
        variant: "yellow",
        showLabel: !0,
        label: "Loading...",
      }),
    });
function Zp() {
  return e.jsx(d, {
    basename: Vp,
    children: e.jsx(bp, {
      children: e.jsx(Sp, {
        children: e.jsx(Dp, {
          children: e.jsx(Fp, {
            children: e.jsx(Rp, {
              children: e.jsx(a.Suspense, {
                fallback: e.jsx(Jp, {}),
                children: e.jsxs(f, {
                  children: [
                    e.jsx(p, { path: "/", element: e.jsx($p, {}) }),
                    e.jsx(p, { path: "/login", element: e.jsx(Hp, {}) }),
                    e.jsx(p, { path: "/register", element: e.jsx(qp, {}) }),
                    e.jsxs(p, {
                      path: "/seller",
                      element: e.jsx(Mp, {}),
                      children: [
                        e.jsx(p, { path: "dashboard", element: e.jsx(Bp, {}) }),
                        e.jsx(p, {
                          path: "stands/new",
                          element: e.jsx(Yp, {}),
                        }),
                        e.jsx(p, {
                          path: "stands/:id",
                          element: e.jsx(Qp, {}),
                        }),
                        e.jsx(p, {
                          path: "stands/:standId/products/new",
                          element: e.jsx(Wp, {}),
                        }),
                        e.jsx(p, {
                          path: "stands/:standId/products/:productId",
                          element: e.jsx(Wp, {}),
                        }),
                      ],
                    }),
                    e.jsx(p, { path: "/showcase", element: e.jsx(Kp, {}) }),
                    e.jsx(p, { path: "/test", element: e.jsx(Gp, {}) }),
                    e.jsx(p, { path: "/404", element: e.jsx(Xp, {}) }),
                    e.jsx(p, {
                      path: "*",
                      element: e.jsx(i, { to: "/404", replace: !0 }),
                    }),
                  ],
                }),
              }),
            }),
          }),
        }),
      }),
    }),
  });
}
(() => {
  const e = document.createElement("link");
  (e.rel = "preload"),
    (e.as = "style"),
    (e.href = "/styles/tailwind.css"),
    document.head.appendChild(e);
  ["/fonts/lemonade-display.woff2", "/fonts/lemonade-body.woff2"].forEach(
    (e) => {
      const t = document.createElement("link");
      (t.rel = "preload"),
        (t.as = "font"),
        (t.href = e),
        (t.type = "font/woff2"),
        (t.crossOrigin = "anonymous"),
        document.head.appendChild(t);
    }
  );
})();
var em;
Jf.createRoot(document.getElementById("root")).render(
  e.jsx(m.StrictMode, { children: e.jsx(Zp, {}) })
),
  (em = (e) => {}) &&
    em instanceof Function &&
    g(async () => {
      const {
        getCLS: e,
        getFID: t,
        getFCP: n,
        getLCP: r,
        getTTFB: a,
      } = await import("./web-vitals-li3l08Vc.js");
      return { getCLS: e, getFID: t, getFCP: n, getLCP: r, getTTFB: a };
    }, []).then(
      ({ getCLS: e, getFID: t, getFCP: n, getLCP: r, getTTFB: a }) => {
        e(em), t(em), n(em), r(em), a(em);
      }
    );
export {
  Ip as R,
  xp as a,
  jp as b,
  Pp as c,
  kp as d,
  op as e,
  _p as f,
  Lp as g,
  up as h,
  lp as i,
  dp as j,
  ip as k,
  cp as l,
  sp as m,
  fp as n,
  pp as o,
  hp as p,
  mp as q,
  Ep as r,
  gp as s,
  yp as t,
  Op as u,
  Zf as v,
  ap as w,
  np as x,
  tp as y,
  ep as z,
};
//# sourceMappingURL=index-BtuY4TKD.js.map
