ig.module('game.system').requires('impact.system').defines(function() {
  var anims, curCallback, current, next, onInterval;
  ig.System.inject({
    setDelegate: function(object) {
      if (typeof object.update !== 'function') {
        throw 'System.setDelegate: No update() function in object';
      } else if (typeof object.draw !== 'function') {
        throw 'System.setDelegate: No draw() function in object';
      } else {
        this.delegate = object;
        return this.startRunLoop();
      }
    },
    stopRunLoop: function() {
      if (this.updateId != null) {
        ig.clearUpdate(this.updateId);
      }
      if (this.drawId != null) {
        ig.clearDraw(this.drawId);
      }
      return this.running = false;
    },
    startRunLoop: function() {
      var _this = this;
      this.stopRunLoop();
      this.updateId = ig.queueUpdate(function() {
        return _this.doUpdate();
      });
      this.drawId = null;
      return this.running = true;
    },
    doUpdate: function() {
      var _base,
        _this = this;
      if (!this.running) {
        return;
      }
      ig.Timer.step();
      this.tick = this.clock.tick();
      if (typeof (_base = this.delegate).frameStart === "function") {
        _base.frameStart();
      }
      this.delegate.update();
      ig.input.clearPressed();
      this.updateId = null;
      return ig.queueDraw((function() {
        return _this.doDraw();
      }), this.canvas);
    },
    doDraw: function() {
      var _base,
        _this = this;
      if (!this.running) {
        return;
      }
      this.delegate.draw();
      if (typeof (_base = this.delegate).frameEnd === "function") {
        _base.frameEnd();
      }
      this.drawId = null;
      return ig.queueUpdate(function() {
        if (_this.newGameClass) {
          _this.setGameNow(_this.newGameClass);
          _this.newGameClass = null;
        }
        return _this.doUpdate();
      });
    },
    run: function() {}
  });
  ig.queueUpdate = function(callback) {
    return window.setTimeout(callback, 0);
  };
  ig.clearUpdate = function(id) {
    window.clearTimeout(id);
  };
  next = 1;
  anims = {};
  if (window.requestAnimationFrame) {
    ig.queueDraw = function(callback, element) {
      var animate, current;
      current = next++;
      if (next > 20) {
        next = 1;
      }
      anims[current] = true;
      animate = function() {
        if (!anims[current]) {
          return;
        }
        callback();
        return delete anims[current];
      };
      window.requestAnimationFrame(animate, element);
      return current;
    };
  } else {
    current = 0;
    curCallback = function() {};
    onInterval = function() {
      if (!anims[current]) {
        return;
      }
      curCallback();
      return delete anims[current];
    };
    ig.queueDraw = function(callback) {
      current = next++;
      if (next > 20) {
        next = 1;
      }
      anims[current] = true;
      curCallback = callback;
      return current;
    };
    window.setInterval(onInterval, 1000 / 60);
  }
  return ig.clearDraw = function(id) {
    return delete anims[id];
  };
});
