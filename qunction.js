(function (window, undefined) {

function Qunction(queue, latency, loop, context) {

  var q = queue = queue || []
    , latency = latency || 0
    , context = context || window
    , loop = loop || false
    , run = false
    , s = 0

  function wrapper() {
    if (!run) return
    if (s === q.length)
      if (loop) s = 0
      else return
    q[s++].call(context)
    setTimeout(wrapper, latency)}

  this.getQueue   = function() {return q}
  this.add        = function(funcs, position) {
                      if (typeof funcs === 'function') funcs = [funcs]
                      if (funcs instanceof Qunction) funcs = funcs.getQueue()
                      if (position === undefined)    position = q.length
                      Array.prototype.splice.apply(q, [position, 0].concat(funcs))
                      if (run) setTimeout(wrapper, latency)
                      return this}
  this.remove     = function(f, all) {
                      var i, l
                      if (+f === f) q.splice(f,1)
                      else for (i=0, l=q.length; i < l; --i) 
                        if (f === q[i]) {
                          q.splice(i, 1)
                          if (!all) break}
                      return this}
  this.start      = function() {run = true; setTimeout(wrapper, latency); return this}
  this.pause      = function() {run = false; return this}
  this.stop       = function() {run = false, s = 0; return this}
  this.rewind     = function() {s = 0; return this}
  this.setLatency = function(l) {latency = l; return this}
  this.getLatency = function() {return latency}
  this.setContext = function(c) {context = c; return this}
  this.getContext = function() {return context}
  this.setLoop    = function(l) {loop = !!l; return this}
  this.getLoop    = function() {return loop}
}

window.Qunction = Qunction;

})(this);
