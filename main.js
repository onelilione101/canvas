var canvas = document.getElementById('xxx');
var context = canvas.getContext('2d');

  autoSetCanvasSize(canvas)

  listenToUser(canvas)


  var eraserEnabled = false
  pen.onclick = function(){  //onclick事件在pc和触屏上都能用
    eraserEnabled = false
    pen.classList.add('active')
    eraser.classList.remove('active')
  }
  eraser.onclick = function(){  
    eraserEnabled = true
    eraser.classList.add('active')
    pen.classList.remove('active')
  }
  orange.onclick = function () {
      context.strokeStyle = 'orange'  //为啥不是fill 而是stroke
      orange.classList.add('active')
      skyblue.classList.remove('active')
      yellow.classList.remove('active')
  }
  skyblue.onclick = function () {
    context.strokeStyle = 'skyblue'  
    skyblue.classList.add('active')
    orange.classList.remove('active')
    yellow.classList.remove('active')
  }
  yellow.onclick = function () {
    context.strokeStyle = 'yellow' 
    yellow.classList.add('active')
    orange.classList.remove('active')
    skyblue.classList.remove('active') 
}


  /******/

  function autoSetCanvasSize(canvas) {
      setCanvasSize()

      window.onresize = function () {
          setCanvasSize()
      }

      function setCanvasSize() {
          var pageWidth = document.documentElement.clientWidth
          var pageHeight = document.documentElement.clientHeight

          canvas.width = pageWidth
          canvas.height = pageHeight
      }
  }

  function drawCircle(x, y, radius) {
      context.beginPath()
      
      context.arc(x, y, radius, 0, Math.PI * 2);
      context.fill()
  }

  function drawLine(x1, y1, x2, y2) {
      context.beginPath();
      
      context.moveTo(x1, y1) // 起点
      context.lineWidth = 5
      context.lineTo(x2, y2) // 终点
      context.stroke()
      context.closePath()
  }

  function listenToUser(canvas) {


      var using = false
      var lastPoint = {
          x: undefined,
          y: undefined
      }
      //特性检测 pc端的ontouchstart是undefined
      //触屏设备的ontouchstart是null

      if(document.body.ontouchstart !== undefined){
      //触屏设备
      canvas.ontouchstart = function (aaa) {
          var x = aaa.touches[0].clientX
          var y = aaa.touches[0].clientY
          using = true
          if (eraserEnabled) {
              context.clearRect(x - 5, y - 5, 10, 10)
          } else {
              lastPoint = {
                  "x": x,
                  "y": y
              }
            }
          }  
     canvas.ontouchmove = function(aaa){
          var x = aaa.touches[0].clientX
          var y = aaa.touches[0].clientY

          if (!using) { return }

          if (eraserEnabled) {
              context.clearRect(x - 5, y - 5, 10, 10)
          } else {
              var newPoint = {
                  "x": x,
                  "y": y
              }
              drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
              lastPoint = newPoint
          }

    }
    canvas.ontouchend = function(aaa){
      using = false
    }
  }else{ 
      // 非触屏设备
      canvas.onmousedown = function(aaa) {
      var x = aaa.clientX
      var y = aaa.clientY
      using = true
          if (eraserEnabled) {
          context.clearRect(x - 5, y - 5, 10, 10)
          } else {
          lastPoint = {
               "x": x,
               "y": y
           }
          }
       }
      canvas.onmousemove = function (aaa) {
          var x = aaa.clientX
          var y = aaa.clientY

          if (!using) { return }

          if (eraserEnabled) {
              context.clearRect(x - 5, y - 5, 10, 10)
          } else {
              var newPoint = {
                  "x": x,
                  "y": y
              }
              drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
              lastPoint = newPoint
          }

      }
      canvas.onmouseup = function (aaa) {
          using = false
      }
    }
  }