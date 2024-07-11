(function(){
    var core = {};
    window.core = core;
    core.genCanvas = genCanvas;
    core.genTrigon = genTrigon;
    core.genFace = genFace;
    function genCanvas (id) {
        const canvas = document.getElementById(id);
        if(canvas.getContext){
            let ctx = canvas.getContext('2d');
            return ctx
        }else{
            throw new TypeError(`Cannot read property 'getContext' of ${id}/r/nat `)
        }
    }
    function genTrigon (id) {
        let ctx = genCanvas(id);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(20, 0);
        ctx.lineTo(0, 20);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(60, 60);
        ctx.lineTo(40, 60);
        ctx.lineTo(60, 40);
        ctx.closePath();
        ctx.stroke();
    }
    function genFace (id) {
        let ctx = genCanvas(id);
        ctx.beginPath();
        // ctx.moveTo(100,100);
        ctx.arc(100, 75, 50, 0, 2 * Math.PI);
        ctx.moveTo(80, 50);
        ctx.arc(75, 50, 5, 0, 2 * Math.PI);
        ctx.moveTo(130, 50);
        ctx.arc(125, 50, 5, 0, 2 * Math.PI);
        ctx.moveTo(125, 75);
        ctx.arc(100, 75, 25, 0, Math.PI ,false);

        ctx.stroke();
        return ctx
        // ctx.fill();
    }
}())