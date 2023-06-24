<!DOCTYPE html>
<html>
<head>
    <title>CancerCompanion.com</title>
    <style>
      body {
        background: white
      }
      .title {
        color: rebeccapurple;
        font-size: 40px;
        font-weight: bolder
      }
      button {
        background-color: rebeccapurple;
        padding: 3px 5px ;
        color: white;
        border-radius: 5px;
      }
    </style>
</head>
<body class="bg-main">
    <h1 class="title">Hello {{ $mailData['doctor']->gender === 'male' ? 'Mr.' : 'Ms.' }} {{ $mailData['doctor']->name }}</h1>
    <p>{{ $mailData['mailData']['user']['name'] }} has an urgent case. This is an explaination to his situation: </p>
    <p>"{{ $mailData['mailData']['body'] }}"</p>
    <a href="localhost:8000/chat/{{ $mailData['doctor']->id }}">Contact him from here</a>
</body>
</html>