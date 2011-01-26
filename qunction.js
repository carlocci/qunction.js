(function (window, undefined) {

function Qunction(queue) {

  var q = queue = queue || []
    , s = 0
    , run = false
    , latency = 0

  function wrapper() {
    if (!run) return
    q[s++]()
    setTimeout(wrapper, latency)}

  this.getQueue = function() {return q}
  
  this.add      = function(func, position) {
                    if (position === undefined) q.push(func)
                    else                        q.splice(position, 0, func)}

  this.adds     = function(funcs, position) {
                    if (funcs instanceof Qunction) funcs = funcs.getQueue()
                    if (position === undefined)    position = q.length
                    Array.prototype.splice.apply(q, [position, 0].concat(funcs))}

  this.remove   = function(f, all) {
                    var i, l
                    if (+f === f) q.splice(f,1)
                    else for (i=0, l=q.length; i < l; --i) {
                      if (f === q[i]) {
                        q.splice(i, 1)
                        if (!all) break;}}}

  this.start    = function() {setTimeout(wrapper, latency)}
  this.pause    = function() {run = false}
  this.stop     = function() {run = false, s = 0}
}

window.Qunction = Qunction;

})(this);
