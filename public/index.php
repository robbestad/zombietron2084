<!DOCTYPE html>
<html>
<head>
  <title>Zombietron 2084</title>
  <style type="text/css">
    html,body {
      background-color: #333;
      color: #fff;
      font-family: helvetica, arial, sans-serif;
      margin: 0;
      padding: 0;
      font-size: 12pt;
    }

    #canvas {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      margin: auto;
    }
  </style>
  <script type="text/javascript">
    var Zombotron={
      gameData:{
        gameStarted:false,
        level:0,
        points:0
      }
    }
  </script>

  <script type="text/javascript" src="game.min.js"></script>
</head>
<body>
<canvas id="canvas"></canvas>
</body>
</html>