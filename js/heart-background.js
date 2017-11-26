var canvas;
var interval;
var heart_hide = 0;

var HeartsBackground = {
    heartHeight: 60,
    heartWidth: 64,
    hearts: [],
    heartImage: 'images/ic-heart.png',
    maxHearts: 80,
    minScale: 0.4,
    draw: function () {
        this.setCanvasSize();
        this.ctx.clearRect(0, 0, this.w, this.h);
        for (var i = 0; i < this.hearts.length; i++) {
            var heart = this.hearts[i];
            heart.image = new Image();
            heart.image.style.height = heart.height;
            heart.image.src = this.heartImage;
            this.ctx.globalAlpha = heart.opacity;
            this.ctx.drawImage(heart.image, heart.x, heart.y, heart.width, heart.height);
        }
        this.move();
    },
    move: function () {
        for (var b = 0; b < this.hearts.length; b++) {
            var heart = this.hearts[b];
            heart.y += heart.ys;
            if (!heart.hidden && heart.y > this.h) {
                // heart.x = Math.random() * this.w;
                // heart.y = -1 * this.heartHeight;
                heart.hidden = true;
                heart_hide++;
            }
        }

        if (heart_hide >= this.hearts.length) {
            this.stop();
        }
    },
    stop: function () {
        clearInterval(interval);
        canvas.remove();
    },
    setCanvasSize: function () {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.w = this.canvas.width;
        this.h = this.canvas.height;
    },
    initialize: function () {
        heart_hide = 0;
        canvas = document.createElement('canvas');
        canvas.className += ' canvas';
        $('#canvas-container').append(canvas);

        this.canvas = canvas;

        if (!this.canvas.getContext)
            return;

        this.setCanvasSize();
        this.ctx = this.canvas.getContext('2d');

        this.hearts = [];
        for (var a = 0; a < this.maxHearts; a++) {
            var scale = (Math.random() * (1 - this.minScale)) + this.minScale;
            this.hearts.push({
                x: Math.random() * this.w,
                y: Math.random() * this.h * 0.4,
                ys: Math.random() + 5,
                height: scale * this.heartHeight,
                width: scale * this.heartWidth,
                opacity: scale,
                hidden: false
            });
        }

        interval = setInterval($.proxy(this.draw, this), 17);
        // setTimeout(function () {
        //     clearInterval(interval);
        //     canvas.remove();
        // }, 4500);
    }
};