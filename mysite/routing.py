## game/routing.py
from django.conf.urls import url
from mysite.consumers import mysite,snake,game_2048

websocket_urlpatterns = [
    url(r'^ws/play/(?P<room_code>\w+)/$', mysite.as_asgi()),
    url('test', snake.as_asgi()),
    url('game_2048', game_2048.as_asgi()),
]